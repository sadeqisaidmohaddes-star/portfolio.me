# Decisions

Each decision below is one choice I made and the reason for it.

## Build and stack

- **Built on the existing `study/` folder, then mostly replaced it.** The first version had 24 questions and a basic quiz loop.
  It was kept as the starting point for the bilingual idea and the language switch. The engine and
  content were rewritten to cover the whole exam.
- **Plain HTML, CSS and JavaScript, with no framework and no build step.** It loads fast on a weak phone connection. There
  is nothing to install. Adding a question means copying one entry in a data file.
- **Content is in data files, one per chapter (`site/data/c3.js` … `c6.js`).** They are plain scripts, not JSON. That way
  they also work when the site is opened as a local file. Jokes and analogies are content, so they
  live there too.
- **Fonts are self-hosted: Fredoka for headings, Atkinson Hyperlegible for body text, and Vazirmatn for Dari.** All three use the
  SIL Open Font License. Atkinson Hyperlegible was designed for readability. Vazirmatn is the
  standard clean Persian-script font. Nothing loads from a CDN, so the site still works if a CDN is blocked.
- **Colours: demand is always blue and supply is always raspberry, with one warm orange accent.** The same two curve colours
  appear in every chart, toy and button. Curves also carry D and S labels, so colour is never the only signal.

## Language

- **Dari shipped in full, alongside English, from the first pass.** The interface, all 27 lessons, all 124 questions,
  all 11 short answers, the generated number problems and the toys are bilingual.
- **Every Dari term keeps the official English word on a small chip, written as `{{term}}` in the data.** The same chips show in
  English mode next to the plain phrase, for example "secret savings [consumer surplus]".
- **Chips are shown every time a term appears, not only the first time.** That is simpler and more reliable than tracking
  first appearances across shuffled questions. It also gives her more practice reading the official words.
- **In Dari mode, digits are Persian (۰–۹), and formulas and numbers are kept left-to-right.** Without that, formulas
  like `Q = (90 + 40) ÷ 2` get scrambled in right-to-left text.
- **The language can be switched by tapping EN | دری or by swiping sideways on the top bar.** Swiping is limited to the
  top bar so it never fights with dragging in the toys.

## How learning works

- **The scheduler is a small per-question state machine, not SM-2.**
  - The first session needs 3 correct answers on each new question.
  - Each later session needs 1 correct answer.
  - Due times: the same evening (18:00, or 4 hours later if it's already late), then +1 day, then +2 days, then exam eve (Mon 18:00).
  - A wrong answer comes back 3–5 questions later and drops the question one box.
  - A wrong answer given as "Sure" re-queues the question in the next two sessions.
- **Sessions end at 30 answers or 25 minutes, then offer "One more round?"** A new question costs about three answers on its first
  day. So a session takes at most about 10–12 new questions and fills the rest with review.
- **Mastery levels are worked out per topic (27 skills), not per question.** "Familiar" means at least 70% right over at
  least 3 practice answers. "Proficient" means the last 4 practice answers were all right. "Mastered" means Proficient,
  then right in a mixed quiz or mock on a later day. Practice can only raise a level. A miss in a
  mixed quiz or mock drops one level.
- **Which mode counts as what:** a chapter-only test is "practice", a mixed test is "quiz", and a mock is "mock".
  Lesson checks count as practice.
- **A question is a "leech" after 3 misses.** It then opens with a different analogy, a memory hook, and a simpler
  question she can reveal, instead of plain repetition.
- **Every lesson follows the same steps:** big idea + analogy → toy → worked example → faded example → 3-question check → explain it back.
  - For the step-based topics (midpoint, consumer-surplus triangle, deadweight-loss triangle, total revenue), the
    faded steps are generated with fresh numbers: last step hidden, then last two hidden, then a solo problem.
  - Double shifts use a hand-written faded example where she picks the missing last step.
- **Number problems are generated from small ranges (14 generators), so she can't memorise answers.** Elasticity answers
  accept "−2" and "2". Feedback always explains the sign.
- **Short answers are self-graded against a 3-point rubric.** Two or more ticks counts as right. In mocks, short answers
  are not scored automatically. They are shown with the model answer and rubric on the review screen.
  Grading free text by machine would be wrong too often.
- **The answer options are shuffled every time,** so she can't learn answer positions.

## Plan and motivation

- **"Today's plan" is computed, not a fixed list.** It looks at today's date and at which lessons are done.
  - Lessons from missed days are folded into today, with a calm note.
  - On a new day, if something was learned before, the first session is a mixed review.
  - Sunday and Monday add Mock 1 and Mock 2 once lessons are done.
  - From Tuesday on, it gives the "greatest hits": only questions she ever missed, capped at 15 minutes.
- **The streak counts sessions, not days.** There is one small celebration when a chapter reaches 100% Proficient, and no
  confetti on individual answers.

## Mocks

- **Each mock has 25 multiple-choice questions plus 3 graph or short-answer items, with 50 minutes and no feedback until the end.**
  - The multiple-choice questions follow the slide proportions per chapter: 7 from Ch 3, 5 from Ch 4, 7 from Ch 5 and 6 from Ch 6.
  - Each mock has 2 graph tasks and 1 short answer.
  - Mock 2 avoids Mock 1's multiple-choice questions.
  - The sets are fixed by a seed, so a mock is the same if she retakes it.
  - Every miss goes back into the scheduler, due now and flagged for re-testing.

## Content judgement calls

- **Demand shifters are taught as TRIBE (the professor's list), with TRIPE as the textbook variant. Supply shifters are taught as ROTTEN.** This follows the prompt.
- **Permits example:** the slides give $7,000 for equal cuts and $4,500 with trading. $4,500 = Firm X cleaning 3
  units and Firm Y cleaning 3. That only works if each firm can clean at most 3 units. Without a cap, X would clean all 6 for $3,000.
  So the toy and the questions state "each firm can clean up to 3". If the slides state a different
  limit, change `PERMIT_COST` / the toy cap in `site/js/toys.js`.
- **Asymmetric information is taught with Chapter 5,** because the exam outline puts it there.
- **One Coase question (a rancher's fence) goes slightly beyond the slides.** It uses the same logic as the slides' examples.

## Privacy, hosting and sync

- **Cloudflare Pages + Cloudflare Access (email one-time PIN) + a Pages Function + D1.** This is the recommended path. It
  is free for one learner, and the gate runs at Cloudflare before any file is served.
- **The function verifies the Access JWT. It does not just trust the email header.**
  - It checks the signature, issuer, audience and expiry, then checks an allowlist.
  - The header fallback exists only if you explicitly set `ALLOW_HEADER_FALLBACK=1`. It is off by default.
- **There is one extra `meta` table in D1 besides `progress` and `sessions_log`.** Mastery levels, lessons done and mocks
  belong to the person, not to any single question.
- **Merge rule: the newest `lastSeen` wins for each question. Lessons done are combined from both devices. Mastery comes from whichever device was updated most recently.**
- **No real email addresses are committed to the repo.** They go in the Pages settings, as placeholders in `wrangler.toml`.
- **Not deployed yet, because this session has no Cloudflare credentials.** `DEPLOY.md` lists the exact remaining clicks.

## Testing

- **Tests use Node's built-in `node:test` and `node:sqlite`, with no dependencies.**
  - The API is tested against the real `schema.sql` in SQLite, wrapped to behave like D1.
  - The test signs real RS256 tokens to check every way a request should be rejected.
- **Browser testing runs in headless Chromium at 375–390px wide,** in English light/dark and Dari light/dark. Screenshots are in `screenshots/`.
