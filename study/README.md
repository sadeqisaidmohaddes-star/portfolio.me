# study/ — ECON 206 cram site (English ⇄ Dari)

Static, no build step. Open `index.html` or deploy the folder to Cloudflare Pages
behind Cloudflare Access (email one-time PIN, allowlist only — protect the
`*.pages.dev` preview hostname too).

- **Languages:** English and Dari (Afghan Persian, `lang="fa-AF"`, right-to-left).
  Switch with the toggle in the top bar or by swiping sideways anywhere. The choice
  is remembered. Dari keeps the English exam term in parentheses, since the exam is in English.
- **Content:** `data.js`, where every string is `{ en, fa }`. Add a question by copying one.
- **Method:** confidence before reveal, a "why"/"why not" line for every option,
  new items must be right 3× in the first session and 1× in each later session,
  wrong answers come back 3–5 items later, high-confidence errors get re-queued,
  and after 3 misses an alternative explanation appears.
- **Progress:** localStorage plus JSON export/import. D1 sync is not built yet.
