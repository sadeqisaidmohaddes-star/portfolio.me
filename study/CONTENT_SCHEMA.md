# Content schema (how to add a question)

Every content file is a plain script that pushes into `window.STUDY`:

```js
(window.STUDY = window.STUDY || {}).questions = (window.STUDY.questions || []).concat([ ... ]);
```

Every visible string is bilingual: `{ en: "...", fa: "..." }`. `fa` is **Dari** (Afghan Persian):
بلی not بله, تکنالوژی, فابریکه, دالر, پوهنتون, موتر (car), تیل (gas/fuel). Write western digits;
the app converts them to Persian digits in Dari mode.

Inline markup (works in both languages):
- `{{consumer surplus}}` renders as a small chip showing the official English exam term.
  Use it right after the plain phrase the first time a term appears in a text:
  `"secret savings {{consumer surplus}}"`, `"مازاد مصرف‌کننده {{consumer surplus}}"`.
- `` `%ΔQ ÷ %ΔP` `` renders as a left-to-right formula (safe inside Dari text).

## Multiple-choice question
```js
{ id: "c3-017",            // unique, chapter prefix
  ch: "c3",                // c3 | c4 | c5 | c6
  topic: "c3-shiftmove",   // one of the topic ids below
  trap: 1,                 // optional: number 1–14 of the classic trap it drills
  q:   { en, fa },
  opts: [                  // 3 or 4 options, exactly one ok: true
    { t: { en, fa }, ok: true, why: { en, fa } },   // why it is right (1–2 sentences)
    { t: { en, fa },           why: { en, fa } },   // why NOT (one line, warm, funny, specific)
  ],
  alt:  { en, fa },        // leech help: a DIFFERENT analogy than the lesson uses
  hook: { en, fa },        // leech help: one-line memory hook
  sub:  { q: { en, fa }, a: { en, fa } }   // leech help: a simpler sub-question and its answer
}
```

## Short answer (rubric self-graded)
```js
{ id: "c5-sa1", ch: "c5", topic: "c5-goods",
  prompt: { en, fa }, model: { en, fa }, rubric: [ {en,fa}, {en,fa}, {en,fa} ] }
```
pushed into `STUDY.short`.

## Learn topic
```js
{ id: "c3-shiftmove", ch: "c3",
  title:   { en, fa },
  big:     { en, fa },          // the big idea, one sentence
  analogy: { en, fa },          // the ONE analogy; it must BE the concept
  body:    [ {en,fa}, ... ],    // 2–4 short lines, under one minute of reading total
  worked:  { q: {en,fa}, steps: [ {en,fa}, ... ] },   // one fully worked example
  faded:   { q: {en,fa}, steps: [ {en,fa}, ... ], blank: {en,fa}, opts: [ {t:{en,fa}, ok:true}, {t:{en,fa}} ] },
           // same kind of problem, last step hidden; she picks the missing last step from opts
  explain: { prompt: {en,fa}, model: {en,fa}, checks: [ {en,fa}, {en,fa}, {en,fa} ] },
  joke:    { en, fa }           // optional one-liner
}
```
pushed into `STUDY.learn`. Interactive toys are attached to topics in `js/toys.js`.

## Topic ids
c3: c3-demand c3-supply c3-eq c3-shiftmove c3-dshift c3-sshift c3-single c3-double
c4: c4-cs c4-ps c4-eff c4-dwl
c5: c5-ext c5-fix c5-coase c5-permits c5-public c5-goods c5-info
c6: c6-ped c6-mid c6-det c6-line c6-tr c6-cross c6-income c6-supply

## The 14 traps
1 lower price "increased demand" · 2 shifting the wrong curve · 3 own-price feedback-loop shift ·
4 double-shift "cannot tell" · 5 slope = elasticity · 6 elasticity signs · 7 TR test reversed / peak at unit ·
8 simple % instead of midpoint · 9 public good = government / Netflix / fish · 10 zero pollution ·
11 Coase rights decide efficiency / forget low bargaining cost · 12 adverse selection vs moral hazard ·
13 DWL goes to someone · 14 income up → shift right for inferior good
