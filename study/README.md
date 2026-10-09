# study.sadeqi.me: Econ Rescue (ECON 206, Exam 2)

A private study site in English and Dari (دری) for ECON 206 Exam 2 on Tuesday, October 13, 2026.
It covers Chapter 3, Chapter 4.1–4.2, Chapter 5 and Chapter 6. Most of the site is quizzes, with
short lessons attached. It also has a scheduler that brings questions back over the days,
interactive graph toys, two timed mock exams, and progress that syncs between phone and laptop.

## For Basira: how to use this in five days

**English.** Open the site and tap the big **Today's plan** button. That's it. It picks your next
step: a short lesson, a quiz, or a mock exam. Before each answer, tap how sure you are. After each
answer, read the "why" and "why not" lines. That is where the learning happens. Mixed quizzes feel
harder than chapter quizzes. That is normal, and it means they are working. Do two or three short
sessions a day, not one long one. Anything you get wrong comes back later by itself. On Tuesday
morning, Today's plan gives you a 15-minute review of only the things you once missed. Switch to
Dari any time with the **دری** button, or swipe sideways on the top bar.

**دری.** سایت را باز کنید و دکمهٔ بزرگ **پلان امروز** را بزنید. همین. سایت خودش کار بعدی را
انتخاب می‌کند: یک درس کوتاه، یک آزمون، یا یک امتحان آزمایشی. پیش از هر جواب بزنید که چقدر مطمئن
هستید. بعد از هر جواب، «چرا» و «چرا نه» را بخوانید، چون یادگیری همان‌جا اتفاق می‌افتد.
آزمون‌های مختلط سخت‌تر به نظر می‌رسند؛ این عادی است و یعنی کار می‌کند. روزی دو یا سه جلسهٔ
کوتاه بهتر از یک جلسهٔ دراز است. چیزهایی که اشتباه می‌کنید خودشان بعداً دوباره می‌آیند. صبح
سه‌شنبه، پلان امروز یک مرور ۱۵ دقیقه‌ای فقط از اشتباه‌های قبلی به شما می‌دهد. هر وقت خواستید با
دکمهٔ **EN** به انگلیسی بروید، یا روی نوار بالا به چپ و راست بکشید. اصطلاحات امتحان همیشه به
انگلیسی کنار کلمه‌ها نوشته شده‌اند، چون امتحان به انگلیسی است.

## For the maintainer

- **Run locally:** `npm run serve`, then open http://localhost:8788. There is no build step and there are no dependencies.
- **Tests:** `npm test` covers the scheduler, mastery ladder, econ math, generators, content schema, API and merge. `npm run test:full` also checks the question bank meets its size targets.
- **Add a question:** copy one entry in `site/data/c3.js` … `c6.js`. The format is in
  [`CONTENT_SCHEMA.md`](./CONTENT_SCHEMA.md). Jokes and analogies live in the data files, not in the code.
- **Change the five-day plan:** edit `PLAN` and `GROUPS` in `site/js/core.js`.
- **Privacy, sync and deployment:** see [`DEPLOY.md`](./DEPLOY.md). Design choices are in [`DECISIONS.md`](./DECISIONS.md).
- **Screenshots:** [`screenshots/`](./screenshots) has phone-width screenshots in both languages and both themes.

| Path | What |
|---|---|
| `site/` | The static site (the Pages output directory) |
| `site/data/` | All content: interface text, lessons, 124 questions, 11 short answers |
| `site/js/core.js` | Scheduler, mastery ladder, econ math and the plan (pure functions, tested) |
| `site/js/gen.js` | 14 number-problem generators |
| `site/js/toys.js` | 8 interactive toys and 10 graph tasks |
| `site/js/app.js` | Screens: home, lessons, sessions, mocks, progress |
| `site/js/sync.js` | Syncs browser storage (localStorage) with the D1 database |
| `functions/` | The Pages Function `/api/progress`, with the Access token check |
| `schema.sql`, `wrangler.toml` | D1 database schema and Pages config |
