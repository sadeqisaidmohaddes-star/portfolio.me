// Identify the user from Cloudflare Access. The browser never tells us who it is.
// Preferred: verify the Cf-Access-Jwt-Assertion JWT (RS256) against the team's public keys,
// checking issuer, audience (the Access application's AUD tag) and expiry.
// Fallback (only if ACCESS_AUD is unset AND ALLOW_HEADER_FALLBACK = "1"): trust the
// Cf-Access-Authenticated-User-Email header, which Access sets on the same gated origin.
// In every case the email must also be in ALLOWED_EMAILS (defense in depth).
let keyCache = { at: 0, keys: [] };

function b64url(s) { s = s.replace(/-/g, "+").replace(/_/g, "/"); while (s.length % 4) s += "="; return Uint8Array.from(atob(s), c => c.charCodeAt(0)); }
function json(bytes) { return JSON.parse(new TextDecoder().decode(bytes)); }

async function teamKeys(team, fetcher) {
  if (Date.now() - keyCache.at < 10 * 60e3 && keyCache.team === team) return keyCache.keys;
  const r = await fetcher(team + "/cdn-cgi/access/certs");
  if (!r.ok) throw new Error("certs " + r.status);
  const keys = (await r.json()).keys || [];
  keyCache = { at: Date.now(), team, keys };
  return keys;
}

export async function verifyAccessJwt(token, env, fetcher = fetch) {
  const parts = (token || "").split(".");
  if (parts.length !== 3) return null;
  const header = json(b64url(parts[0])), payload = json(b64url(parts[1]));
  if (header.alg !== "RS256") return null;
  const team = String(env.ACCESS_TEAM_DOMAIN || "").replace(/\/$/, "");
  const jwk = (await teamKeys(team, fetcher)).find(k => k.kid === header.kid);
  if (!jwk) return null;
  const key = await crypto.subtle.importKey("jwk", jwk, { name: "RSASSA-PKCS1-v1_5", hash: "SHA-256" }, false, ["verify"]);
  const ok = await crypto.subtle.verify("RSASSA-PKCS1-v1_5", key, b64url(parts[2]), new TextEncoder().encode(parts[0] + "." + parts[1]));
  if (!ok) return null;
  const aud = Array.isArray(payload.aud) ? payload.aud : [payload.aud];
  if (!aud.includes(env.ACCESS_AUD)) return null;
  if (payload.iss !== team) return null;
  if (!payload.exp || payload.exp * 1000 < Date.now()) return null;
  return payload.email ? String(payload.email).toLowerCase() : null;
}

export async function userEmail(request, env, fetcher) {
  let email = null;
  if (env.ACCESS_AUD && env.ACCESS_TEAM_DOMAIN) {
    email = await verifyAccessJwt(request.headers.get("Cf-Access-Jwt-Assertion"), env, fetcher).catch(() => null);
  } else if (env.ALLOW_HEADER_FALLBACK === "1") {
    email = (request.headers.get("Cf-Access-Authenticated-User-Email") || "").toLowerCase() || null;
  }
  const allowed = String(env.ALLOWED_EMAILS || "").toLowerCase().split(/[,\s]+/).filter(Boolean);
  if (!email || !allowed.includes(email)) return null;
  return email;
}
export function _resetKeyCache() { keyCache = { at: 0, keys: [] }; }
