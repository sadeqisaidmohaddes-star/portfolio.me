-- Cloudflare D1 schema for study.sadeqi.me. Apply with:
--   npx wrangler d1 execute econ206 --remote --file=schema.sql
CREATE TABLE IF NOT EXISTS progress (
  user_email TEXT NOT NULL,
  item_id    TEXT NOT NULL,
  box        INTEGER NOT NULL DEFAULT 0,
  correct    INTEGER NOT NULL DEFAULT 0,
  wrong      INTEGER NOT NULL DEFAULT 0,
  last_seen  INTEGER NOT NULL DEFAULT 0,
  confidence TEXT,
  data       TEXT NOT NULL,            -- full item state as JSON (due, lapses, hi, firstDay…)
  PRIMARY KEY (user_email, item_id)
);
CREATE TABLE IF NOT EXISTS meta (       -- mastery levels, lessons done, mocks, streak
  user_email TEXT PRIMARY KEY,
  data       TEXT NOT NULL,
  updated    INTEGER NOT NULL
);
CREATE TABLE IF NOT EXISTS sessions_log (
  user_email TEXT NOT NULL,
  started    INTEGER NOT NULL,
  ended      INTEGER,
  answered   INTEGER,
  kind       TEXT,
  PRIMARY KEY (user_email, started)
);
