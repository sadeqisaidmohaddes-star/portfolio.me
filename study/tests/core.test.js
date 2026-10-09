const test = require("node:test"), assert = require("node:assert");
const C = require("../site/js/core.js");
const T0 = new Date(2026, 9, 8, 10, 0).getTime(); // Thu Oct 8, 10:00
const bank = Array.from({ length: 40 }, (_, i) => ({ id: "q" + i, ch: i < 20 ? "c3" : "c4", topic: "t" }));
const fixed = () => 0; // always reinsert 3 items later

test("first exposure needs 3 correct answers, spaced by other items", () => {
  const items = {}, s = new C.Session(["a", "b", "c", "d", "e"], items, fixed);
  assert.strictEqual(s.current().id, "a");
  assert.strictEqual(s.answer(true, "sure", T0), false);
  assert.deepStrictEqual(s.queue.map(x => x.id), ["b", "c", "d", "a", "e"]);
  // answer everything right until done; 5 items × 3 = 15 answers
  while (!s.done()) s.answer(true, "sure", T0);
  assert.strictEqual(s.answered, 15);
  for (const id of "abcde") { assert.strictEqual(items[id].box, 1); assert.strictEqual(items[id].r, 3); }
});
test("wrong answer comes back 3–5 items later and drops a box", () => {
  const items = { a: Object.assign(C.newItem(), { box: 3 }) };
  const s = new C.Session(["a", "b", "c", "d", "e", "f"], items, () => 0.99);
  s.answer(false, "think", T0);
  assert.strictEqual(s.queue.findIndex(x => x.id === "a"), 5);
  assert.strictEqual(items.a.box, 2); assert.strictEqual(items.a.lapses, 1);
});
test("later session: one correct is enough and the box climbs", () => {
  const items = { a: Object.assign(C.newItem(), { box: 1 }) };
  const s = new C.Session(["a"], items, fixed);
  assert.strictEqual(s.answer(true, "sure", T0), true);
  assert.strictEqual(items.a.box, 2);
  assert.strictEqual(items.a.due, T0 + C.DAY);
});
test("due times: same evening, +1 day, +2 days, exam eve", () => {
  assert.strictEqual(C.nextDue(1, T0), new Date(2026, 9, 8, 18).getTime());
  const late = new Date(2026, 9, 8, 21).getTime();
  assert.strictEqual(C.nextDue(1, late), late + 4 * 36e5);
  assert.strictEqual(C.nextDue(2, T0), T0 + C.DAY);
  assert.strictEqual(C.nextDue(3, T0), T0 + 2 * C.DAY);
  assert.strictEqual(C.nextDue(4, T0), C.EXAM_EVE.getTime());
});
test("high-confidence errors are pulled into the next two sessions", () => {
  const items = { a: Object.assign(C.newItem(), { box: 2, due: T0 + 9 * C.DAY }) };
  const s = new C.Session(["a"], items, fixed);
  s.answer(false, "sure", T0); assert.strictEqual(items.a.hi, 2);
  s.answer(true, "sure", T0);
  assert.strictEqual(items.a.hi, 2, "a fix in the same session does not count");
  items.a.due = T0 + 9 * C.DAY;
  assert.ok(C.buildSession(bank.concat([{ id: "a", ch: "c3" }]), items, { now: T0 }).includes("a"));
  new C.Session(["a"], items, fixed).answer(true, "sure", T0 + C.DAY); assert.strictEqual(items.a.hi, 1);
  new C.Session(["a"], items, fixed).answer(true, "sure", T0 + 2 * C.DAY); assert.strictEqual(items.a.hi, 0);
});
test("buildSession caps new items and respects chapters", () => {
  const ids = C.buildSession(bank, {}, { now: T0, chapters: ["c3"], rng: fixed });
  assert.ok(ids.length <= 12 && ids.length >= 8, "got " + ids.length);
  assert.ok(ids.every(id => +id.slice(1) < 20));
});
test("leech after 3 misses", () => {
  assert.strictEqual(C.isLeech({ lapses: 2 }), false);
  assert.strictEqual(C.isLeech({ lapses: 3 }), true);
});

test("midpoint elasticity matches hand calculation and is symmetric", () => {
  // P 4→6, Q 120→80: %ΔQ = −40/100, %ΔP = 2/5 → −1
  assert.strictEqual(C.round(C.midpointE(120, 80, 4, 6)), -1);
  assert.strictEqual(C.round(C.midpointE(80, 120, 6, 4)), -1);
  assert.strictEqual(C.round(C.simpleE(120, 80, 4, 6), 3), -0.667);
  assert.strictEqual(C.round(C.midpointE(10, 8, 2, 3), 3), -0.556);
});
test("classification and sign handling", () => {
  assert.strictEqual(C.classify(-2), "elastic");
  assert.strictEqual(C.classify(-0.4), "inelastic");
  assert.strictEqual(C.classify(-1), "unit elastic");
  assert.strictEqual(C.classify(0), "perfectly inelastic");
  assert.strictEqual(C.classify(-Infinity), "perfectly elastic");
  assert.ok(C.elasticityMatches("-2", -2) && C.elasticityMatches("2", -2) && C.elasticityMatches("۲٫۰", -2));
  assert.ok(!C.elasticityMatches("1.5", -2));
});
test("linear demand: elastic on top, unit in the middle, inelastic below", () => {
  // P = 100 − Q
  assert.ok(Math.abs(C.linearE(100, 1, 20)) > 1);
  assert.strictEqual(C.linearE(100, 1, 50), -1);
  assert.ok(Math.abs(C.linearE(100, 1, 80)) < 1);
  const tr = q => C.revenue(100 - q, q);
  assert.ok(tr(50) > tr(49) && tr(50) > tr(51), "TR peaks at unit elasticity");
});
test("triangle areas and the permits example", () => {
  assert.strictEqual(C.triangle(20, 10), 100);
  assert.strictEqual(C.triangle(6, 4), 12);
  assert.strictEqual(C.permitCost({ X: 2, Y: 2, Z: 2 }), 7000);
  assert.strictEqual(C.permitCost({ X: 3, Y: 3, Z: 0 }), 4500);
});

test("mastery ladder climbs in practice and never drops there", () => {
  let s = C.newSkill();
  s = C.recordSkill(s, false, "practice", T0); assert.strictEqual(s.lvl, 1);
  s = C.recordSkill(s, true, "practice", T0); s = C.recordSkill(s, true, "practice", T0);
  assert.strictEqual(s.lvl, 1, "2/3 = 67% is not Familiar");
  s = C.recordSkill(s, true, "practice", T0); assert.strictEqual(s.lvl, 2, "3/4 = 75%");
  s = C.recordSkill(s, true, "practice", T0); assert.strictEqual(s.lvl, 3, "last 4 right");
  s = C.recordSkill(s, false, "practice", T0); assert.strictEqual(s.lvl, 3, "practice never lowers");
  s = C.recordSkill(s, true, "quiz", T0); assert.strictEqual(s.lvl, 3, "same day mixed does not master");
  s = C.recordSkill(s, true, "quiz", T0 + C.DAY); assert.strictEqual(s.lvl, 4, "later-day mixed quiz masters");
  s = C.recordSkill(s, false, "mock", T0 + C.DAY); assert.strictEqual(s.lvl, 3, "mock miss drops one");
});
test("chapter mastery counts skills at Proficient or above", () => {
  assert.strictEqual(C.chapterMastery(["a", "b", "c", "d"], { a: { lvl: 3 }, b: { lvl: 4 }, c: { lvl: 2 } }), 50);
});

test("today's plan follows the schedule and folds in missed days", () => {
  const d = (m, h) => new Date(2026, 9, m, h || 10).getTime();
  assert.deepStrictEqual(C.todaysPlan({}, d(8)).type, "learn");
  assert.strictEqual(C.todaysPlan({}, d(8)).topic, "c3-demand");
  const allC3 = Object.fromEntries(C.GROUPS.c3.map(t => [t, 1]));
  const eve = C.todaysPlan({ learned: allC3, sessionsToday: 2 }, d(8, 19));
  assert.strictEqual(eve.type, "session"); assert.deepStrictEqual(eve.chapters, ["c3"]);
  // Skipped Thursday entirely: Saturday's plan still starts with Chapter 3 lessons, flagged as compressed.
  const sat = C.todaysPlan({ sessionsToday: 1 }, d(10));
  assert.strictEqual(sat.topic, "c3-demand"); assert.strictEqual(sat.compressed, true);
  const all = Object.fromEntries(Object.values(C.GROUPS).flat().map(t => [t, 1]));
  assert.deepStrictEqual(C.todaysPlan({ learned: all, sessionsToday: 1 }, d(11)), { type: "mock", n: 1, day: C.PLAN[3] });
  assert.strictEqual(C.todaysPlan({}, d(13, 7)).type, "hits");
  assert.strictEqual(C.daysLeft(d(8)), 5);
});
test("a new day starts with a mixed review only if something was learned before", () => {
  const fri = new Date(2026, 9, 9, 10).getTime();
  assert.strictEqual(C.todaysPlan({}, fri).type, "learn");
  assert.strictEqual(C.todaysPlan({ learned: { "c3-demand": 1 } }, fri).type, "session");
});
