const test = require("node:test"), assert = require("node:assert");
const C = require("../site/js/core.js"), Gen = require("../site/js/gen.js");
test("every generator makes a sane problem for many seeds", () => {
  for (const g of Gen.list) for (let s = 1; s < 300; s++) {
    const p = g.make(C.rng(s));
    assert.ok(Number.isFinite(p.answer), g.id + " answer " + p.answer);
    assert.ok(p.q.en && /[؀-ۿ]/.test(p.q.fa), g.id + " text");
    assert.ok(p.steps.length && p.steps.every(x => x.en && x.fa), g.id + " steps");
    assert.ok(!/NaN|undefined/.test(JSON.stringify(p)), g.id + " has NaN/undefined");
  }
  assert.ok(Gen.list.length >= 12);
});
test("shortage generator gives a real shortage and permit plans total 6", () => {
  for (let s = 1; s < 300; s++) {
    assert.ok(Gen.byId("gen-shortage").make(C.rng(s)).answer > 0);
    const q = Gen.byId("gen-permit").make(C.rng(s)).q.en.match(/X cuts (\d), Y cuts (\d), Z cuts (\d)/).slice(1).map(Number);
    assert.strictEqual(q[0] + q[1] + q[2], 6); assert.ok(q.every(v => v <= 3));
  }
});
test("midpoint generator agrees with the formula", () => {
  const p = Gen.byId("gen-mid").make(C.rng(7)), n = p.q.en.match(/\d+/g).map(Number);
  assert.strictEqual(p.answer, C.midpointE(n[3], n[2], n[0], n[1]));
});
