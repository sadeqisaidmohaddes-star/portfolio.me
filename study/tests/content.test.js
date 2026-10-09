// Validates every content file against CONTENT_SCHEMA.md. Run: node --test tests/
const test = require("node:test"), assert = require("node:assert");
const fs = require("fs"), path = require("path"), vm = require("vm");
const dir = path.join(__dirname, "..", "site", "data");
function loadAll() {
  const ctx = { window: {} }; vm.createContext(ctx);
  for (const f of fs.readdirSync(dir).filter(f => f.endsWith(".js")).sort())
    vm.runInContext(fs.readFileSync(path.join(dir, f), "utf8"), ctx, { filename: f });
  return ctx.window.STUDY || {};
}
const TOPICS = "c3-demand c3-supply c3-eq c3-shiftmove c3-dshift c3-sshift c3-single c3-double c4-cs c4-ps c4-eff c4-dwl c5-ext c5-fix c5-coase c5-permits c5-public c5-goods c5-info c6-ped c6-mid c6-det c6-line c6-tr c6-cross c6-income c6-supply".split(" ");
const bi = (o, where) => { assert.ok(o && typeof o.en === "string" && o.en.trim() && typeof o.fa === "string" && o.fa.trim(), "missing en/fa at " + where);
  assert.ok(/[؀-ۿ]/.test(o.fa), "fa is not Persian script at " + where); };

test("questions follow the schema", () => {
  const S = loadAll(), ids = new Set();
  for (const q of S.questions || []) {
    assert.ok(!ids.has(q.id), "duplicate id " + q.id); ids.add(q.id);
    assert.ok(TOPICS.includes(q.topic) && q.topic.startsWith(q.ch), "bad topic " + q.id);
    bi(q.q, q.id + ".q");
    assert.ok(q.opts.length >= 3 && q.opts.length <= 4, q.id + " needs 3–4 options");
    assert.strictEqual(q.opts.filter(o => o.ok).length, 1, q.id + " needs exactly one correct");
    q.opts.forEach((o, i) => { bi(o.t, q.id + ".opt" + i); bi(o.why, q.id + ".why" + i); });
    bi(q.alt, q.id + ".alt"); bi(q.hook, q.id + ".hook"); bi(q.sub.q, q.id + ".sub.q"); bi(q.sub.a, q.id + ".sub.a");
    if (q.trap !== undefined) assert.ok(q.trap >= 1 && q.trap <= 14, q.id + " trap 1–14");
  }
});
test("short answers and learn topics follow the schema", () => {
  const S = loadAll();
  for (const s of S.short || []) { bi(s.prompt, s.id); bi(s.model, s.id); assert.strictEqual(s.rubric.length, 3, s.id); s.rubric.forEach((r, i) => bi(r, s.id + ".r" + i)); }
  for (const l of S.learn || []) {
    assert.ok(TOPICS.includes(l.id), "bad learn id " + l.id);
    ["title", "big", "analogy"].forEach(k => bi(l[k], l.id + "." + k));
    l.body.forEach((b, i) => bi(b, l.id + ".body" + i));
    bi(l.worked.q, l.id + ".worked"); l.worked.steps.forEach((s, i) => bi(s, l.id + ".w" + i));
    bi(l.faded.q, l.id + ".faded"); bi(l.faded.blank, l.id + ".blank"); assert.strictEqual(l.faded.opts.filter(o => o.ok).length, 1, l.id + " faded opts");
    bi(l.explain.prompt, l.id + ".ex"); bi(l.explain.model, l.id + ".exm"); assert.strictEqual(l.explain.checks.length, 3, l.id);
  }
});
test("bank meets the size targets", { skip: !process.env.FULL }, () => {
  const S = loadAll(), by = c => S.questions.filter(q => q.ch === c).length;
  assert.ok(S.questions.length >= 120, "≥120 MCQ, have " + S.questions.length);
  assert.ok(by("c3") >= 33 && by("c4") >= 18 && by("c5") >= 33 && by("c6") >= 28, "chapter proportions");
  assert.ok(S.questions.filter(q => q.trap).length >= 30, "≥30 traps");
  for (let t = 1; t <= 14; t++) assert.ok(S.questions.some(q => q.trap === t), "trap " + t + " has no question");
  assert.ok((S.short || []).length >= 10, "≥10 short answers");
  for (const t of TOPICS) assert.ok(S.learn.some(l => l.id === t), "no learn topic " + t);
  for (const t of TOPICS) assert.ok(S.questions.some(q => q.topic === t), "no questions for " + t);
});
