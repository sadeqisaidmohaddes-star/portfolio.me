# Deploying study.sadeqi.me

**Status:** this session had no Cloudflare login or API token, so nothing is deployed yet.
Everything that doesn't need your login is done. The steps below are the remaining clicks, about
30–45 minutes. Until then, the site works fully when opened locally (`npm run serve`). Progress
is saved in the browser and can be exported and imported as a file.

## How privacy works

1. **Cloudflare Access** sits in front of the whole site, including `/api/*`. Nobody gets a single
   byte until they type an email that is on the list and enter the one-time PIN that Cloudflare
   emails to them. The site has no password in JavaScript.
2. **The API double-checks who the user is.** Access attaches a signed token
   (`Cf-Access-Jwt-Assertion`) to each request. The function in `functions/_lib/access.js`
   verifies three things:
   - the token's RS256 signature, against your team's public keys;
   - the issuer and the audience (your Access application's AUD tag);
   - that the token hasn't expired.

   Then it checks the email against `ALLOWED_EMAILS`. The browser never says who it is.
3. **Progress goes in D1**, keyed by that verified email. The database is reachable only through
   the function's `DB` binding, and the page holds no secrets.

## How sync works

- Every answer is saved right away in the browser (localStorage), so the site works offline.
- The browser sends changes to `/api/progress` every 10 answers, at the end of every session, and
  when the tab is hidden or the phone locks.
- On opening, the site downloads your saved progress and merges it with what's on the device. For
  each question, the most recently seen copy wins. Lessons marked done on either device stay done.
  Mastery levels come from whichever device was used most recently.
- **Tables:**
  - `progress`: one row per user and question.
  - `meta`: mastery levels, lessons done, mocks and streak.
  - `sessions_log`: one row per session.

## Remaining steps (plain words)

You need: a Cloudflare account with `sadeqi.me` on Cloudflare DNS, and Node 18 or newer on your laptop.

1. **Create the database.**
   ```bash
   cd study
   npx wrangler login
   npx wrangler d1 create econ206          # copy the database_id it prints
   ```
   Paste the id into `wrangler.toml` as `database_id`.
   ```bash
   npx wrangler d1 execute econ206 --remote --file=schema.sql
   ```

2. **Create the Pages project.**
   - Option A, connected to Git: Cloudflare dashboard → Workers & Pages → Create → Pages → Connect
     to Git → pick `portfolio.me`. Set the **root directory** to `study`, leave the **build command**
     empty, and set the **output directory** to `site`.
   - Option B, upload directly:
     ```bash
     npx wrangler pages deploy site --project-name study-sadeqi-me
     ```
     Run it from `study/` so the `functions/` folder goes along with the upload.

   Then, in the project: Settings → Bindings → add **D1 database**, variable name `DB`, database `econ206`.

3. **Add the custom domain.** In the project: Custom domains → Set up a custom domain →
   `study.sadeqi.me`. Cloudflare creates the DNS record.

4. **Turn on the email PIN login.** Go to Zero Trust (one.dash.cloudflare.com) → Settings →
   Authentication (newer dashboards: Integrations → Identity providers) → Add new → **One-time PIN**.

5. **Lock the site.** Zero Trust → Access → Applications → Add an application → **Self-hosted**.
   - Name: `Econ Rescue`. Session duration: **1 week**, so Basira logs in once per device.
   - Public hostnames: add `study.sadeqi.me`. Then add a second one: `study-sadeqi-me.pages.dev`.
     Add a third: `*.study-sadeqi-me.pages.dev`, which covers preview URLs. Without these, someone
     could get around the gate through the pages.dev address.
   - Policy: name `Basira and me`, action **Allow**, rule **Include → Emails →** your email and
     Basira's email. **Don't** add a rule like "Login Methods: One-time PIN" as the include rule.
     That would let any email in.
   - Identity providers: One-time PIN only.
   - Save. Open the application again and copy its **Application Audience (AUD) Tag**.

6. **Tell the function about Access.** In the Pages project, go to Settings → Variables and Secrets
   (Production and Preview). Set:
   - `ACCESS_TEAM_DOMAIN` = `https://<your-team-name>.cloudflareaccess.com`. Your team name is
     shown under Zero Trust → Settings → Custom pages.
   - `ACCESS_AUD` = the AUD tag from step 5.
   - `ALLOWED_EMAILS` = `you@example.com,basira@example.com`, the same two emails as the policy.

   (Or put them in `wrangler.toml` instead of the placeholders.) Redeploy.

7. **Check it.**
   - In a private window, open https://study.sadeqi.me. You should see the Cloudflare login page,
     not the site.
   - Try an email that's not on the list. You should not receive a PIN.
   - Log in with your own email, answer a few questions, and open the site on your phone. Your
     progress should be there.
   - Visit `https://study-sadeqi-me.pages.dev`. It must also ask for a login.
   - Visit `https://study.sadeqi.me/api/progress` while logged in. You should see JSON. In a
     logged-out window it should redirect to the login page.

Tip for Basira: if a PIN email says "already used", an email scanner may have opened it first.
Request a new PIN. Adding `noreply@notify.cloudflare.com` to her contacts helps.

## Adding a user

Add the email in **two** places: the Access policy (step 5) and `ALLOWED_EMAILS` (step 6). Then
redeploy. Access is free for up to 50 users.

## Changing the schedule

The five-day plan is `PLAN` in `site/js/core.js`. Each day lists:
- the lesson groups to learn (`GROUPS`);
- the chapters for review;
- which mock exam belongs to that day.

The exam time is `EXAM`, and the "exam eve" review time is `EXAM_EVE`. Run `npm test` after changing them.

## Rollback

Cloudflare Pages keeps every deployment. To roll back: Pages project → Deployments → pick an
older one → "Rollback to this deployment". The D1 data is not affected.
