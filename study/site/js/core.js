/* Pure logic: scheduler, mastery ladder, econ math, plan. No DOM. Tested in tests/core.test.js. */
(function (root) {
  "use strict";
  var DAY = 864e5, HOUR = 36e5;
  var EXAM = new Date(2026, 9, 13, 9, 0);        // Tue Oct 13, 09:00 local
  var EXAM_EVE = new Date(2026, 9, 12, 18, 0);    // Mon Oct 12, 18:00 local

  function dayKey(t) { var d = new Date(t); return d.getFullYear() + "-" + String(d.getMonth() + 1).padStart(2, "0") + "-" + String(d.getDate()).padStart(2, "0"); }
  function rng(seed) { var s = seed >>> 0 || 1; return function () { s ^= s << 13; s ^= s >>> 17; s ^= s << 5; return ((s >>> 0) % 1e9) / 1e9; }; }
  function shuffle(a, r) { r = r || Math.random; a = a.slice(); for (var i = a.length - 1; i > 0; i--) { var j = Math.floor(r() * (i + 1)), x = a[i]; a[i] = a[j]; a[j] = x; } return a; }

  /* ---------- per-item state machine (compressed successive relearning) ----------
     box 0 = new. First session: 3 correct answers (spread out) → box 1, due same evening.
     Each later session needs 1 correct: box 1 → 2 (due +1 day), 2 → 3 (due +2 days), 3 → 4 (due exam eve), 4 stays.
     A wrong answer in a later session drops one box (never below 1) and must be fixed in that session.
     A wrong answer given with "sure" sets hi = 2: the item is pulled into the next two sessions. */
  function newItem() { return { box: 0, r: 0, w: 0, lapses: 0, hi: 0, lastSeen: 0, lastConf: "", due: 0, firstDay: "" }; }
  function sameEvening(now) {
    var d = new Date(now), eve = new Date(d.getFullYear(), d.getMonth(), d.getDate(), 18, 0).getTime();
    return eve - now >= 3 * HOUR ? eve : now + 4 * HOUR;
  }
  function nextDue(box, now) {
    if (box === 1) return sameEvening(now);
    if (box === 2) return now + DAY;
    if (box === 3) return Math.min(now + 2 * DAY, Math.max(EXAM_EVE.getTime(), now + HOUR));
    return Math.max(EXAM_EVE.getTime(), now + DAY);
  }
  function needFor(item) { return item.box === 0 ? 3 : 1; }

  /* Session queue: answer() returns whether the item is finished for this session. */
  function Session(ids, items, r) {
    this.r = r || Math.random;
    this.queue = ids.map(function (id) { return { id: id, need: needFor(items[id] || newItem()), wrongHere: false }; });
    this.items = items; this.answered = 0; this.log = [];
  }
  Session.prototype.current = function () { return this.queue[0] || null; };
  Session.prototype.answer = function (ok, conf, now) {
    var cur = this.queue.shift(), it = this.items[cur.id] || (this.items[cur.id] = newItem());
    this.answered++; this.log.push({ id: cur.id, ok: ok, conf: conf });
    it.lastSeen = now; it.lastConf = conf; if (!it.firstDay) it.firstDay = dayKey(now);
    if (ok) {
      it.r++; cur.need--;
      if (cur.need > 0) { this.queue.splice(Math.min(3 + Math.floor(this.r() * 3), this.queue.length), 0, cur); return false; }
      if (it.box === 0) it.box = 1;
      else if (!cur.wrongHere) it.box = Math.min(4, it.box + 1);
      if (it.hi > 0 && !cur.wrongHere) it.hi--;
      it.due = nextDue(it.box, now);
      return true;
    }
    it.w++; it.lapses++;
    if (conf === "sure") it.hi = 2;
    if (it.box > 1 && !cur.wrongHere) it.box--;
    cur.wrongHere = true; cur.need = Math.max(cur.need, 1);
    this.queue.splice(Math.min(3 + Math.floor(this.r() * 3), this.queue.length), 0, cur);
    return false;
  };
  Session.prototype.done = function () { return this.queue.length === 0; };

  /* Pick a session: high-confidence errors, then due items, then ≤ maxNew new items, then the weakest reviews. */
  function buildSession(bank, items, o) {
    o = o || {}; var now = o.now || Date.now(), size = o.size || 30, maxNew = o.maxNew === undefined ? 12 : o.maxNew, r = o.rng || Math.random;
    var pool = bank.filter(function (q) { return (!o.chapters || o.chapters.indexOf(q.ch) >= 0) && (!o.filter || o.filter(q, items[q.id])); });
    var seen = pool.filter(function (q) { return items[q.id] && items[q.id].box > 0; });
    var hi = seen.filter(function (q) { return items[q.id].hi > 0; });
    var due = seen.filter(function (q) { return items[q.id].hi === 0 && items[q.id].due <= now; }).sort(function (a, b) { return items[a.id].due - items[b.id].due; });
    var fresh = pool.filter(function (q) { return !items[q.id] || items[q.id].box === 0; }).slice(0, maxNew);
    var pick = hi.concat(due).slice(0, size);
    // First-exposure items cost ~3 answers each; keep total answers near the session size.
    var budget = size - pick.length;
    for (var i = 0; i < fresh.length && budget >= 3; i++) { pick.push(fresh[i]); budget -= 3; }
    if (pick.length < Math.min(10, pool.length)) {
      var rest = seen.filter(function (q) { return pick.indexOf(q) < 0; }).sort(function (a, b) { return items[a.id].box - items[b.id].box || items[b.id].lapses - items[a.id].lapses; });
      pick = pick.concat(rest.slice(0, Math.min(10, pool.length) - pick.length));
    }
    return shuffle(pick, r).map(function (q) { return q.id; });
  }
  function isLeech(it) { return !!it && it.lapses >= 3; }

  /* ---------- mastery ladder per skill (topic) ----------
     0 Not started · 1 Attempted · 2 Familiar (≥70% over ≥3 practice answers) · 3 Proficient (last 4 practice answers right)
     4 Mastered (proficient, then right in a mixed quiz or mock on a later day). Practice never lowers a level;
     a wrong answer in a mixed quiz or mock drops one level (not below Attempted). */
  var LEVELS = ["Not started", "Attempted", "Familiar", "Proficient", "Mastered"];
  function newSkill() { return { lvl: 0, hist: [], profDay: "" }; }
  function recordSkill(s, ok, mode, now) {
    s = s || newSkill(); var day = dayKey(now);
    s.hist.push(ok ? 1 : 0); if (s.hist.length > 10) s.hist.shift();
    var n = s.hist.length, acc = s.hist.reduce(function (a, b) { return a + b; }, 0) / n;
    var last4 = n >= 4 && s.hist.slice(-4).every(function (x) { return x; });
    var earned = last4 ? 3 : n >= 3 && acc >= 0.7 ? 2 : 1;
    if (mode === "practice") { s.lvl = Math.max(s.lvl, earned); }
    else if (ok) {
      s.lvl = Math.max(s.lvl, earned);
      if (s.lvl >= 3 && s.profDay && s.profDay < day) s.lvl = 4;
    } else { s.lvl = Math.max(1, s.lvl - 1); }
    if (s.lvl >= 3 && !s.profDay) s.profDay = day;
    if (s.lvl < 3) s.profDay = "";
    return s;
  }
  function chapterMastery(topics, skills) {
    if (!topics.length) return 0;
    return Math.round(100 * topics.filter(function (t) { return skills[t] && skills[t].lvl >= 3; }).length / topics.length);
  }

  /* ---------- econ math ---------- */
  function pct(from, to) { return (to - from) / from; }
  function midPct(a, b) { return (b - a) / ((a + b) / 2); }
  function midpointE(q1, q2, p1, p2) { return midPct(q1, q2) / midPct(p1, p2); }
  function simpleE(q1, q2, p1, p2) { return pct(q1, q2) / pct(p1, p2); }
  function classify(e) { var a = Math.abs(e); return a === Infinity ? "perfectly elastic" : a === 0 ? "perfectly inelastic" : Math.abs(a - 1) < 1e-9 ? "unit elastic" : a > 1 ? "elastic" : "inelastic"; }
  function triangle(base, height) { return 0.5 * base * height; }
  function revenue(p, q) { return p * q; }
  // Linear demand P = a − b·Q: elasticity at quantity Q.
  function linearE(a, b, Q) { var P = a - b * Q; return Q <= 0 ? -Infinity : -(P / Q) / b; }
  // Professor's permits example: cost of a plan {X: units, Y: units, Z: units}.
  var PERMIT_COST = { X: 500, Y: 1000, Z: 2000 };
  function permitCost(plan) { return Object.keys(PERMIT_COST).reduce(function (s, k) { return s + (plan[k] || 0) * PERMIT_COST[k]; }, 0); }
  function round(x, d) { var m = Math.pow(10, d === undefined ? 2 : d); return Math.round(x * m) / m; }
  // Answer check for elasticity: accepts −2 and 2, compared by absolute value.
  function elasticityMatches(input, truth, tol) {
    var v = parseFloat(String(input).replace(/[−–]/g, "-").replace(/[۰-۹]/g, function (d) { return "۰۱۲۳۴۵۶۷۸۹".indexOf(d); }).replace(/[٫,]/g, "."));
    return !isNaN(v) && Math.abs(Math.abs(v) - Math.abs(truth)) <= (tol || 0.015);
  }

  /* ---------- five-day plan ---------- */
  var PLAN = [
    { day: "2026-10-08", learn: ["c3"], review: ["c3"] },
    { day: "2026-10-09", learn: ["c4", "c6a"], review: ["c3", "c4", "c6"] },
    { day: "2026-10-10", learn: ["c5", "c6b"], review: ["c3", "c4", "c5", "c6"] },
    { day: "2026-10-11", learn: [], review: ["c3", "c4", "c5", "c6"], mock: 1 },
    { day: "2026-10-12", learn: [], review: ["c3", "c4", "c5", "c6"], mock: 2 },
    { day: "2026-10-13", hits: true }
  ];
  var GROUPS = {
    c3: ["c3-demand", "c3-supply", "c3-eq", "c3-shiftmove", "c3-dshift", "c3-sshift", "c3-single", "c3-double"],
    c4: ["c4-cs", "c4-ps", "c4-eff", "c4-dwl"],
    c5: ["c5-ext", "c5-fix", "c5-coase", "c5-permits", "c5-public", "c5-goods", "c5-info"],
    c6a: ["c6-ped", "c6-mid", "c6-det", "c6-line", "c6-tr"],
    c6b: ["c6-cross", "c6-income", "c6-supply"]
  };
  GROUPS.c6 = GROUPS.c6a.concat(GROUPS.c6b);
  /* What should she do next? Missed days fold into today (compressed), never shamed. */
  function todaysPlan(state, now) {
    var key = dayKey(now), learned = state.learned || {}, mocks = state.mocks || {};
    if (key >= "2026-10-13") return { type: "hits", day: PLAN[5] };
    var idx = 0; PLAN.forEach(function (p, i) { if (p.day <= key) idx = i; });
    var today = PLAN[idx], behind = [];
    for (var i = 0; i <= idx; i++) (PLAN[i].learn || []).forEach(function (g) { GROUPS[g].forEach(function (t) { if (!learned[t]) behind.push(t); }); });
    var caughtUp = idx > 0 && behind.some(function (t) { return PLAN[idx].learn.every(function (g) { return GROUPS[g].indexOf(t) < 0; }); });
    var dueReview = (state.sessionsToday || 0) === 0 && idx > 0 && Object.keys(learned).length > 0;
    if (dueReview) return { type: "session", chapters: today.review, mixed: true, day: today, compressed: caughtUp };
    if (behind.length) return { type: "learn", topic: behind[0], left: behind.length, day: today, compressed: caughtUp };
    if (today.mock && !mocks[today.mock]) return { type: "mock", n: today.mock, day: today };
    return { type: "session", chapters: today.review, mixed: today.review.length > 1, day: today };
  }
  function daysLeft(now) { return Math.max(0, Math.ceil((EXAM - now) / DAY)); }

  var Core = { DAY: DAY, EXAM: EXAM, EXAM_EVE: EXAM_EVE, dayKey: dayKey, rng: rng, shuffle: shuffle,
    newItem: newItem, nextDue: nextDue, needFor: needFor, Session: Session, buildSession: buildSession, isLeech: isLeech,
    LEVELS: LEVELS, newSkill: newSkill, recordSkill: recordSkill, chapterMastery: chapterMastery,
    pct: pct, midPct: midPct, midpointE: midpointE, simpleE: simpleE, classify: classify, triangle: triangle, revenue: revenue,
    linearE: linearE, PERMIT_COST: PERMIT_COST, permitCost: permitCost, round: round, elasticityMatches: elasticityMatches,
    PLAN: PLAN, GROUPS: GROUPS, todaysPlan: todaysPlan, daysLeft: daysLeft };
  if (typeof module !== "undefined" && module.exports) module.exports = Core; else root.Core = Core;
})(this);
