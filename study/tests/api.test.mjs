// Pages Function tests against real SQLite (node:sqlite) wrapped to look like D1, with a locally signed Access JWT.
import test from "node:test"; import assert from "node:assert";
import { DatabaseSync } from "node:sqlite"; import fs from "node:fs"; import { webcrypto as crypto } from "node:crypto";
import { handle } from "../functions/api/progress.js"; import { _resetKeyCache } from "../functions/_lib/access.js";
import Sync from "../site/js/sync.js";

function d1() {
  const db = new DatabaseSync(":memory:"); db.exec(fs.readFileSync(new URL("../schema.sql", import.meta.url), "utf8"));
  const stmt = (sql, args = []) => ({ bind: (...a) => stmt(sql, a), all: async () => ({ results: db.prepare(sql).all(...args) }), first: async () => db.prepare(sql).get(...args) ?? null, run: async () => db.prepare(sql).run(...args) });
  return { prepare: sql => stmt(sql), batch: async ss => { db.exec("BEGIN"); for (const s of ss) await s.run(); db.exec("COMMIT"); }, raw: db };
}
const TEAM = "https://team.cloudflareaccess.com", AUD = "aud123";
const kp = await crypto.subtle.generateKey({ name: "RSASSA-PKCS1-v1_5", modulusLength: 2048, publicExponent: new Uint8Array([1, 0, 1]), hash: "SHA-256" }, true, ["sign", "verify"]);
const jwk = { ...(await crypto.subtle.exportKey("jwk", kp.publicKey)), kid: "k1" };
const fetcher = async () => new Response(JSON.stringify({ keys: [jwk] }));
const b64 = o => Buffer.from(typeof o === "string" ? o : JSON.stringify(o)).toString("base64url");
async function jwt(payload, key = kp.privateKey) {
  const h = b64({ alg: "RS256", kid: "k1" }), p = b64(payload);
  const sig = await crypto.subtle.sign("RSASSA-PKCS1-v1_5", key, new TextEncoder().encode(h + "." + p));
  return h + "." + p + "." + Buffer.from(sig).toString("base64url");
}
const good = () => ({ email: "Basira@example.com", aud: [AUD], iss: TEAM, exp: Math.floor(Date.now() / 1000) + 600 });
const req = (method, token, body, extra = {}) => new Request("https://study.sadeqi.me/api/progress", { method, headers: { ...(token ? { "Cf-Access-Jwt-Assertion": token } : {}), ...extra }, body: body ? JSON.stringify(body) : undefined });
const envOf = db => ({ DB: db, ACCESS_TEAM_DOMAIN: TEAM, ACCESS_AUD: AUD, ALLOWED_EMAILS: "basira@example.com, me@example.com" });

test("valid Access JWT: PUT then GET round-trips; older writes never overwrite newer", async () => {
  _resetKeyCache(); const db = d1(), env = envOf(db), tok = await jwt(good());
  let r = await handle(req("PUT", tok, { items: { "c3-001": { box: 2, r: 3, w: 1, lastSeen: 200, lastConf: "sure" } }, meta: { updated: 5, learned: { "c3-demand": 1 }, log: [{ start: 1, end: 2, n: 9, kind: "quiz" }] } }), env, fetcher);
  assert.strictEqual(r.status, 200);
  r = await handle(req("PUT", tok, { items: { "c3-001": { box: 1, lastSeen: 100 } }, meta: { updated: 4 } }), env, fetcher);
  const got = await (await handle(req("GET", tok), env, fetcher)).json();
  assert.strictEqual(got.items["c3-001"].box, 2); assert.deepStrictEqual(got.meta.learned, { "c3-demand": 1 });
  assert.strictEqual(db.raw.prepare("SELECT count(*) n FROM sessions_log").get().n, 1);
  assert.strictEqual(db.raw.prepare("SELECT user_email FROM progress").get().user_email, "basira@example.com");
});
test("rejects: no token, wrong audience, expired, forged signature, email not on the list, header-only spoof", async () => {
  _resetKeyCache(); const env = envOf(d1());
  const other = await crypto.subtle.generateKey({ name: "RSASSA-PKCS1-v1_5", modulusLength: 2048, publicExponent: new Uint8Array([1, 0, 1]), hash: "SHA-256" }, true, ["sign", "verify"]);
  const cases = [null, await jwt({ ...good(), aud: ["nope"] }), await jwt({ ...good(), exp: 1 }), await jwt(good(), other.privateKey), await jwt({ ...good(), email: "stranger@example.com" }), await jwt({ ...good(), iss: "https://evil.cloudflareaccess.com" })];
  for (const tok of cases) assert.strictEqual((await handle(req("GET", tok), env, fetcher)).status, 401);
  assert.strictEqual((await handle(req("GET", null, null, { "Cf-Access-Authenticated-User-Email": "basira@example.com" }), env, fetcher)).status, 401, "header alone is ignored when JWT checking is configured");
});
test("header fallback only when explicitly enabled and still allowlisted", async () => {
  const db = d1(), env = { DB: db, ALLOWED_EMAILS: "basira@example.com" };
  const h = { "Cf-Access-Authenticated-User-Email": "basira@example.com" };
  assert.strictEqual((await handle(req("GET", null, null, h), env)).status, 401);
  env.ALLOW_HEADER_FALLBACK = "1";
  assert.strictEqual((await handle(req("GET", null, null, h), env)).status, 200);
  assert.strictEqual((await handle(req("GET", null, null, { "Cf-Access-Authenticated-User-Email": "x@y.z" }), env)).status, 401);
});
test("client merge: newer lastSeen wins per item, lessons are unioned", () => {
  const local = { items: { a: { lastSeen: 5, box: 1 }, b: { lastSeen: 9, box: 3 } }, learned: { x: 1 }, skills: { t: { lvl: 1 } }, updated: 10 };
  const remote = { items: { a: { lastSeen: 7, box: 2 }, b: { lastSeen: 1, box: 0 }, c: { lastSeen: 3, box: 1 } }, meta: { learned: { y: 1 }, skills: { t: { lvl: 3 } }, updated: 20 } };
  const m = Sync.merge(local, remote);
  assert.deepStrictEqual([m.items.a.box, m.items.b.box, m.items.c.box], [2, 3, 1]);
  assert.deepStrictEqual(m.learned, { x: 1, y: 1 }); assert.strictEqual(m.skills.t.lvl, 3);
});
