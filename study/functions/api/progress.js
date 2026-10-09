// GET  /api/progress → { items: {id: state}, meta: {...} } for the Access-verified user.
// PUT  /api/progress   { items: {id: state}, meta: {...} } → upsert; newer last_seen / updated wins.
import { userEmail } from "../_lib/access.js";

const ID = /^[A-Za-z0-9_-]{1,48}$/;
const reply = (status, body) => new Response(JSON.stringify(body), { status, headers: { "content-type": "application/json", "cache-control": "no-store" } });

export async function handle(request, env, fetcher) {
  const email = await userEmail(request, env, fetcher);
  if (!email) return reply(401, { error: "not allowed" });
  const db = env.DB;
  if (request.method === "GET") {
    const rows = (await db.prepare("SELECT item_id, data FROM progress WHERE user_email = ?").bind(email).all()).results || [];
    const m = await db.prepare("SELECT data FROM meta WHERE user_email = ?").bind(email).first();
    const items = {}; for (const r of rows) items[r.item_id] = JSON.parse(r.data);
    return reply(200, { items, meta: m ? JSON.parse(m.data) : {} });
  }
  if (request.method === "PUT" || request.method === "POST") {
    const text = await request.text();
    if (text.length > 512 * 1024) return reply(413, { error: "too big" });
    let body; try { body = JSON.parse(text); } catch { return reply(400, { error: "bad json" }); }
    const items = body && typeof body.items === "object" && body.items ? body.items : {};
    const ids = Object.keys(items).filter(id => ID.test(id)).slice(0, 1000);
    const stmts = ids.map(id => {
      const it = items[id] || {};
      return db.prepare(
        `INSERT INTO progress (user_email, item_id, box, correct, wrong, last_seen, confidence, data) VALUES (?, ?, ?, ?, ?, ?, ?, ?)
         ON CONFLICT(user_email, item_id) DO UPDATE SET box = excluded.box, correct = excluded.correct, wrong = excluded.wrong,
           last_seen = excluded.last_seen, confidence = excluded.confidence, data = excluded.data
         WHERE excluded.last_seen >= progress.last_seen`
      ).bind(email, id, +it.box || 0, +it.r || 0, +it.w || 0, +it.lastSeen || 0, String(it.lastConf || "").slice(0, 8), JSON.stringify(it));
    });
    const meta = body.meta && typeof body.meta === "object" ? body.meta : null;
    if (meta) {
      stmts.push(db.prepare(
        `INSERT INTO meta (user_email, data, updated) VALUES (?, ?, ?)
         ON CONFLICT(user_email) DO UPDATE SET data = excluded.data, updated = excluded.updated WHERE excluded.updated >= meta.updated`
      ).bind(email, JSON.stringify(meta), +meta.updated || 0));
      for (const s of (Array.isArray(meta.log) ? meta.log : []).slice(-50)) {
        if (!s || !s.start) continue;
        stmts.push(db.prepare("INSERT OR IGNORE INTO sessions_log (user_email, started, ended, answered, kind) VALUES (?, ?, ?, ?, ?)")
          .bind(email, +s.start, +s.end || null, +s.n || 0, String(s.kind || "").slice(0, 16)));
      }
    }
    if (stmts.length) await db.batch(stmts);
    return reply(200, { ok: true, saved: ids.length });
  }
  return reply(405, { error: "method" });
}
export const onRequest = ctx => handle(ctx.request, ctx.env);
