/* App shell: routing, rendering, sessions, lessons, mocks, progress. Content lives in data/*.js. */
(function () {
  "use strict";
  var D = window.STUDY, C = window.Core, G = window.Gen, $ = function (s, el) { return (el || document).querySelector(s); };
  var KEY = "econ206.v2";
  var S = load(), view = null, main = $("#app");
  var MCQ = {}; D.questions.forEach(function (q) { q.type = "mcq"; MCQ[q.id] = q; });
  var SHORT = {}; (D.short || []).forEach(function (s) { s.type = "short"; SHORT[s.id] = s; });
  var GRAPH = {}; window.Toys.graphs.forEach(function (g) { GRAPH[g.id] = g; });
  var GEN = {}; G.list.forEach(function (g) { GEN[g.id] = g; });
  var LEARN = {}; D.learn.forEach(function (l) { LEARN[l.id] = l; });
  var BANK = D.questions.concat(G.list, window.Toys.graphs, D.short || []);
  function byId(id) { return MCQ[id] || GEN[id] || GRAPH[id] || SHORT[id]; }

  /* ---------- state ---------- */
  function fresh() { return { v: 2, lang: "en", theme: "", items: {}, skills: {}, learned: {}, mocks: {}, sessions: 0, byDay: {}, celebrated: {}, seenNote: false, log: [], updated: 0 }; }
  function load() { try { var s = JSON.parse(localStorage.getItem(KEY)); if (s && s.v === 2) return Object.assign(fresh(), s); } catch (e) {} return fresh(); }
  function save(dirtyIds) { S.updated = Date.now(); try { localStorage.setItem(KEY, JSON.stringify(S)); } catch (e) {} if (window.Sync) window.Sync.mark(dirtyIds || []); }
  window.App = { state: function () { return S; }, setState: function (s) { S = s; save(); route(); }, save: save, t: t, num: num, KEY: KEY };

  /* ---------- text ---------- */
  function L() { return S.lang === "fa" ? "fa" : "en"; }
  function t(o) { return o ? (o[L()] || o.en || "") : ""; }
  function u(k) { return t(D.ui[k]); }
  function esc(s) { return String(s).replace(/[&<>"']/g, function (c) { return { "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" }[c]; }); }
  function num(x) { var s = String(x); return L() === "fa" ? s.replace(/\d/g, function (d) { return "۰۱۲۳۴۵۶۷۸۹"[d]; }).replace(/(\d|[۰-۹])\.(?=[۰-۹])/g, "$1٫") : s; }
  // {{term}} → chip with the English exam word; `formula` → left-to-right island.
  function rich(o) {
    var s = esc(t(o));
    if (L() === "fa") s = s.replace(/\{\{[^}]*\}\}|`[^`]*`|[^{`]+/g, function (m) {
      if (m.charAt(0) === "{") return m;
      if (m.charAt(0) !== "`") m = m.replace(MATH, function (x) { return /[=÷×]/.test(x) ? "`" + x + "`" : x; });
      return num(m); });
    return s.replace(/\{\{([^}]+)\}\}/g, '<span class="term" lang="en" dir="ltr">$1</span>').replace(/`([^`]+)`/g, '<bdi class="f" dir="ltr">$1</bdi>');
  }
  // A run of Latin/digits/operators that contains = ÷ or × is a formula: keep it left-to-right inside Dari text.
  var MATH = /[0-9A-Za-z$%Δ(|½\u2212-][0-9A-Za-z$%Δ()|½+\u2212×÷=.,\s\u200e-]*[0-9A-Za-z)%$]/g;
  function nb(x) { return '<bdi dir="ltr">' + num(x) + "</bdi>"; }
  function h(tag, attrs, inner) { return "<" + tag + (attrs ? " " + attrs : "") + ">" + (inner || "") + "</" + tag + ">"; }
  function btn(label, attrs, cls) { attrs = attrs || ""; return "<button " + (/\btype=/.test(attrs) ? "" : 'type="button" ') + 'class="' + (cls || "") + '" ' + attrs + ">" + label + "</button>"; }
  function render(html, fn) { main.innerHTML = html; view = fn; var f = main.querySelector("h1,h2"); if (f) { f.setAttribute("tabindex", "-1"); f.focus({ preventScroll: true }); } window.scrollTo(0, 0); }
  function now() { return Date.now(); }

  /* ---------- language, theme, swipe ---------- */
  function applyChrome() {
    var html = document.documentElement;
    html.lang = L() === "fa" ? "fa-AF" : "en"; html.dir = L() === "fa" ? "rtl" : "ltr";
    if (S.theme) html.setAttribute("data-theme", S.theme); else html.removeAttribute("data-theme");
    document.title = u("title");
    $("#brand").innerHTML = "<span>" + esc(u("title")) + '</span><small>' + esc(u("sub")) + "</small>";
    document.querySelectorAll("[data-lang]").forEach(function (b) { b.setAttribute("aria-pressed", String(b.dataset.lang === L())); });
    var th = $("#theme"); th.textContent = (S.theme || matchMedia("(prefers-color-scheme: dark)").matches && "dark") === "dark" ? "☀" : "☾"; th.setAttribute("aria-label", u("theme"));
    document.querySelectorAll("[data-nav]").forEach(function (a) { a.textContent = u(a.dataset.nav); });
  }
  function setLang(l) { if (l === S.lang) return; S.lang = l; save(); applyChrome(); main.classList.remove("swap"); void main.offsetWidth; main.classList.add("swap"); if (view) view(); }
  document.querySelectorAll("[data-lang]").forEach(function (b) { b.onclick = function () { setLang(b.dataset.lang); }; });
  $("#theme").onclick = function () { var dark = document.documentElement.getAttribute("data-theme") === "dark" || (!S.theme && matchMedia("(prefers-color-scheme: dark)").matches); S.theme = dark ? "light" : "dark"; save(); applyChrome(); };
  (function () { var x0 = null, y0 = 0, bar = $("#bar");
    bar.addEventListener("touchstart", function (e) { x0 = e.touches[0].clientX; y0 = e.touches[0].clientY; }, { passive: true });
    bar.addEventListener("touchend", function (e) { if (x0 === null) return; var dx = e.changedTouches[0].clientX - x0, dy = e.changedTouches[0].clientY - y0; x0 = null;
      if (Math.abs(dx) > 60 && Math.abs(dx) > 2 * Math.abs(dy)) setLang(L() === "en" ? "fa" : "en"); }, { passive: true }); })();

  /* ---------- routing ---------- */
  function go(hash) { if (location.hash === hash) route(); else location.hash = hash; }
  window.addEventListener("hashchange", route);
  function route() {
    var p = (location.hash || "#/").slice(2).split("/");
    if (p[0] === "learn" && LEARN[p[1]]) return lesson(p[1], +(p[2] || 0));
    if (p[0] === "mock") return mockIntro(+p[1] || 1);
    if (p[0] === "progress") return progress();
    if (p[0] === "toys") return toys(p[1]);
    if (p[0] === "chapter") return chapter(p[1]);
    return home();
  }

  /* ---------- home ---------- */
  function topicsOf(ch) { return C.GROUPS[ch] || []; }
  function planLabel(p) {
    if (p.type === "learn") return u("planLearn") + ": " + t(LEARN[p.topic] && LEARN[p.topic].title) + " · " + num(p.left) + " " + u("lessonsLeft");
    if (p.type === "mock") return u("planMock") + " " + num(p.n);
    if (p.type === "hits") return u("planHits");
    return u("planReview") + " · " + p.chapters.map(function (c) { return c.replace("c", t({ en: "Ch ", fa: "فصل " })); }).join(", ").replace(/\d/g, function (d) { return num(d); });
  }
  function planState() { return { learned: S.learned, mocks: S.mocks, sessionsToday: S.byDay[C.dayKey(now())] || 0 }; }
  function runPlan() {
    var p = C.todaysPlan(planState(), now());
    if (p.type === "learn") return go("#/learn/" + p.topic);
    if (p.type === "mock") return go("#/mock/" + p.n);
    if (p.type === "hits") return startSession({ filter: function (q, it) { return it && it.w > 0; }, mode: "quiz", maxNew: 0, minutes: 15, label: u("planHits") });
    startSession({ chapters: p.chapters, mode: p.mixed ? "quiz" : "practice" });
  }
  function home() {
    var d = C.daysLeft(now()), p = C.todaysPlan(planState(), now());
    var html = '<section class="hero">' + (d > 0 ? '<div class="count"><b>' + num(d) + "</b><span>" + esc(u("daysLeft")) + "</span></div>" : '<div class="count"><span>' + esc(u("today")) + "</span></div>") +
      '<div class="streak">🔥 ' + num(S.sessions) + " " + esc(u("streak")) + "</div>" +
      h("h1", 'class="sr"', esc(u("title"))) +
      btn("▶ " + esc(u("plan")) + "<small>" + esc(planLabel(p)) + "</small>", 'id="go"', "primary huge") +
      (p.compressed ? '<p class="note">' + esc(u("compressed")) + "</p>" : "") + "</section>";
    html += '<div class="cards">' + D.chapters.map(function (c) {
      var m = C.chapterMastery(topicsOf(c.id), S.skills);
      return '<a class="chap" href="#/chapter/' + c.id + '"><strong>' + esc(t(c.name)) + "</strong><span>" + rich(c.joke) + '</span><div class="bar" role="img" aria-label="' + m + '%"><i style="width:' + m + '%"></i></div><small>' + num(m) + "% " + esc(u("mastery")) + "</small></a>"; }).join("") + "</div>";
    html += '<div class="row">' + btn(esc(u("mixed")), 'id="mix"') + btn("⚠ " + esc(u("traps")), 'id="trap"') + btn(esc(u("missed")), 'id="miss"') + "</div>";
    html += '<div class="row">' + btn("📝 " + esc(u("mock")) + " 1", 'data-mock="1"') + btn("📝 " + esc(u("mock")) + " 2", 'data-mock="2"') + "</div>";
    html += '<details class="how"><summary>' + esc(u("how")) + "</summary><p>" + esc(u("howText")) + '</p><p class="muted">' + esc(u("swipe")) + "</p></details>";
    render(html, home);
    $("#go").onclick = runPlan;
    $("#mix").onclick = function () { startSession({ mode: "quiz" }); };
    $("#trap").onclick = function () { startSession({ filter: function (q) { return !!q.trap; }, mode: "quiz", maxNew: 30, label: u("traps") }); };
    $("#miss").onclick = function () { startSession({ filter: function (q, it) { return it && it.w > 0; }, mode: "quiz", maxNew: 0, label: u("missed") }); };
    main.querySelectorAll("[data-mock]").forEach(function (b) { b.onclick = function () { go("#/mock/" + b.dataset.mock); }; });
  }
  function chapter(ch) {
    var c = D.chapters.filter(function (x) { return x.id === ch; })[0]; if (!c) return home();
    var html = h("h1", "", esc(t(c.name))) + "<p>" + rich(c.joke) + "</p><ol class=\"topics\">" + topicsOf(ch).map(function (tp) {
      var lv = (S.skills[tp] || {}).lvl || 0;
      return '<li><a href="#/learn/' + tp + '">' + esc(t(LEARN[tp].title)) + '</a> <span class="lvl l' + lv + '">' + (S.learned[tp] ? "✓ " : "") + esc(t(D.ui.levels[lv])) + "</span></li>"; }).join("") + "</ol>" +
      '<div class="row">' + btn(esc(u("test")) + " · " + esc(u("chapterOnly")), 'id="t1"', "primary") + "</div>";
    render(html, function () { chapter(ch); });
    $("#t1").onclick = function () { startSession({ chapters: [ch], mode: "practice" }); };
  }

  /* ---------- sessions ---------- */
  var cur = null; // { sess, opts, first:{id:ok}, started }
  function startSession(o) {
    o = o || {};
    if (o.mode === "quiz" && !S.seenNote) { S.seenNote = true; save();
      return render('<div class="card">' + h("h2", "", "🧠") + "<p>" + esc(u("mixedNote")) + "</p>" + btn(esc(u("gotIt")), 'id="ok"', "primary") + "</div>", null), $("#ok").onclick = function () { startSession(o); }; }
    var ids = o.ids || C.buildSession(BANK, S.items, { now: now(), chapters: o.chapters, filter: o.filter, maxNew: o.maxNew });
    if (!ids.length) ids = C.shuffle(BANK.filter(function (q) { return !o.chapters || o.chapters.indexOf(q.ch) >= 0; })).slice(0, 10).map(function (q) { return q.id; });
    cur = { sess: new C.Session(ids, S.items), opts: o, first: {}, started: now(), sinceSave: 0 };
    ask();
  }
  function endSession() {
    var day = C.dayKey(now()); S.sessions++; S.byDay[day] = (S.byDay[day] || 0) + 1;
    var firsts = Object.keys(cur.first), right = firsts.filter(function (k) { return cur.first[k]; }).length;
    S.log.push({ start: cur.started, end: now(), n: cur.sess.answered, kind: cur.opts.mode || "practice" }); if (S.log.length > 200) S.log.shift();
    save(); if (window.Sync) window.Sync.flush();
    var o = cur.opts, back = o.onDone; cur = null;
    if (back) return back();
    var cel = celebrate();
    render('<div class="card center">' + h("h2", "", esc(u("done"))) + '<p class="big">' + num(right) + " / " + num(firsts.length) + "</p><p>" + esc(u("score")) + "</p>" + cel +
      '<div class="row">' + btn(esc(u("again")), 'id="ag"', "primary") + btn(esc(u("home")), 'id="hm"') + "</div></div>", null);
    $("#ag").onclick = runPlan; $("#hm").onclick = function () { go("#/"); };
  }
  function celebrate() {
    var out = "";
    D.chapters.forEach(function (c) { if (!S.celebrated[c.id] && C.chapterMastery(topicsOf(c.id), S.skills) === 100) { S.celebrated[c.id] = true; out += '<p class="party" role="status">🎉 ' + esc(t(c.name)) + " — " + esc(u("celebrate")) + "</p>"; } });
    if (out) save(); return out;
  }
  function ask() {
    var o = cur.opts, limitMin = o.minutes || 25;
    if (cur.sess.done() || cur.sess.answered >= 30 || now() - cur.started > limitMin * 6e4) return endSession();
    var id = cur.sess.current().id, q = byId(id);
    if (!q) { cur.sess.queue.shift(); return ask(); }
    var it = S.items[id], leech = C.isLeech(it) && q.alt;
    var st = { conf: null, answered: false, gen: q.type === "num" ? q.make(C.rng((now() & 0xffff) + cur.sess.answered * 7919)) : null, order: q.opts ? C.shuffle(q.opts) : null };
    var n = cur.sess.answered + 1;
    function draw() {
      var html = '<div class="qhead"><span>' + esc(u("q")) + " " + num(n) + '</span><span class="muted">' + esc(typeLabel(q)) + "</span>" + '<button type="button" class="ghost sm" id="quit">✕</button></div>';
      html += '<div class="card">';
      if (leech && !st.answered) html += '<div class="leech" role="note"><strong>' + esc(u("leech")) + "</strong><p>" + rich(q.alt) + "</p><p><b>" + esc(u("hook")) + ":</b> " + rich(q.hook) + "</p>" +
        '<details><summary>' + esc(u("simpler")) + "</summary><p>" + rich(q.sub.q) + "</p><details><summary>" + esc(u("reveal")) + "</summary><p>" + rich(q.sub.a) + "</p></details></details></div>";
      html += h("h2", 'class="qtext"', rich(q.q || q.prompt || st.gen.q));
      if (q.type === "short") html += shortUI(q, st);
      else if (!st.conf) html += "<p>" + esc(u("howSure")) + '</p><div class="row conf">' + ["sure", "think", "guess"].map(function (c) { return btn(esc(u(c)), 'data-c="' + c + '"'); }).join("") + "</div>" + (q.type === "mcq" ? st.order.map(function (op) { return '<div class="opt ghosted" aria-hidden="true">' + rich(op.t) + "</div>"; }).join("") : "");
      else if (q.type === "mcq") html += mcqUI(q, st);
      else if (q.type === "num") html += numUI(st);
      else if (q.type === "graph") html += '<div id="gt" class="toy"></div><div id="gfb" aria-live="polite"></div>';
      html += "</div>";
      render(html, draw);
      $("#quit").onclick = function () { cur.sess.queue = []; endSession(); };
      main.querySelectorAll("[data-c]").forEach(function (b) { b.onclick = function () { st.conf = b.dataset.c; draw(); var f = main.querySelector(".opt:not([disabled]), input, #gt button"); if (f) f.focus(); }; });
      wire(q, st, draw);
    }
    draw();
  }
  function typeLabel(q) { return q.type === "graph" ? u("graphTask") : q.type === "short" ? u("shortAns") : q.type === "num" ? u("numeric") : ""; }
  function grade(q, ok, conf) {
    var id = q.id; if (!(id in cur.first)) cur.first[id] = ok;
    var mode = cur.opts.mode || "practice";
    cur.sess.answer(ok, conf, now());
    S.skills[q.topic] = C.recordSkill(S.skills[q.topic], ok, mode, now());
    cur.sinceSave++; save([id]); if (cur.sinceSave >= 10 && window.Sync) { cur.sinceSave = 0; window.Sync.flush(); }
  }
  function feedback(ok, extra, q, noNext) {
    return '<div class="fb ' + (ok ? "good" : "bad") + '" role="status" aria-live="polite"><strong>' + (ok ? "✓ " : "✗ ") + esc(u(ok ? "correct" : "wrong")) + "</strong>" +
      (q && q.trap ? ' <span class="tag">⚠ ' + esc(u("trap")) + " #" + num(q.trap) + "</span>" : "") + (extra || "") + "</div>" + (noNext ? "" : btn(esc(u("next")) + " →", 'id="nx"', "primary"));
  }
  function mcqUI(q, st) {
    var html = st.answered ? feedback(st.order[st.pick].ok, "", q, true) : "";
    st.order.forEach(function (op, k) {
      if (!st.answered) { html += btn(rich(op.t), 'data-k="' + k + '"', "opt"); return; }
      var cls = op.ok ? "opt right" : st.pick === k ? "opt wrong" : "opt";
      html += '<div class="' + cls + '">' + (op.ok ? "✓ " : st.pick === k ? "✗ " : "") + rich(op.t) + "<small><b>" + esc(u(op.ok ? "why" : "whyNot")) + ":</b> " + rich(op.why) + "</small></div>";
    });
    if (st.answered) html += btn(esc(u("next")) + " →", 'id="nx"', "primary");
    return html;
  }
  function numUI(st) {
    if (!st.answered) return '<form id="nf" class="row"><label class="sr" for="na">' + esc(u("yourAnswer")) + '</label><input id="na" inputmode="decimal" autocomplete="off" placeholder="' + esc(u("typeNum")) + '" required>' + btn(esc(u("check")), 'type="submit"', "primary") + "</form>";
    var g = st.gen;
    return '<p>' + esc(u("yourAnswer")) + ": <b>" + nb(esc(st.input)) + "</b> · " + esc(u("answerWas")) + " <b>" + nb(C.round(g.answer)) + "</b></p><ol class=\"steps\">" + g.steps.map(function (s) { return "<li>" + rich(s) + "</li>"; }).join("") + "</ol>" + feedback(st.ok);
  }
  function parseNum(s) { return parseFloat(String(s).replace(/[۰-۹]/g, function (d) { return "۰۱۲۳۴۵۶۷۸۹".indexOf(d); }).replace(/[−–]/g, "-").replace(/[٫,]/g, ".").replace(/[$%\s]/g, "")); }
  function shortUI(q, st) {
    if (!st.shown) return '<label class="sr" for="sa">' + esc(u("yourAnswer")) + '</label><textarea id="sa" rows="5" placeholder="' + esc(u("explainPh")) + '">' + esc(st.text || "") + "</textarea>" + btn(esc(u("model")), 'id="show"', "primary");
    var html = '<div class="model"><b>' + esc(u("model")) + ":</b> " + rich(q.model) + "</div><p>" + esc(u("tick")) + "</p>" +
      q.rubric.map(function (r, i) { return '<label class="tickrow"><input type="checkbox" data-r="' + i + '"' + (st.ticks && st.ticks[i] ? " checked" : "") + (st.answered ? " disabled" : "") + "> " + rich(r) + "</label>"; }).join("") + '<p class="muted">' + esc(u("rubricOk")) + "</p>";
    return html + (st.answered ? feedback(st.ok) : btn(esc(u("check")), 'id="rub"', "primary"));
  }
  function wire(q, st, draw) {
    main.querySelectorAll("[data-k]").forEach(function (b) { b.onclick = function () { st.pick = +b.dataset.k; st.answered = true; grade(q, st.order[st.pick].ok, st.conf); draw(); }; });
    var nf = $("#nf"); if (nf) nf.onsubmit = function (e) { e.preventDefault(); st.input = $("#na").value; var v = parseNum(st.input);
      st.ok = st.gen.abs ? C.elasticityMatches(st.input, st.gen.answer, st.gen.tol) : !isNaN(v) && Math.abs(v - st.gen.answer) <= (st.gen.tol || 0.5); st.answered = true; grade(q, st.ok, st.conf); draw(); };
    var gt = $("#gt"); if (gt && !st.answered) q.render(gt, function (ok, why) { st.answered = true; st.ok = ok; grade(q, ok, st.conf); $("#gfb").innerHTML = feedback(ok, "<p>" + rich(why) + "</p>", q); main.querySelectorAll("#gt button").forEach(function (b) { b.disabled = true; }); $("#nx").onclick = ask; $("#nx").focus(); });
    var show = $("#show"); if (show) show.onclick = function () { st.text = $("#sa").value; st.shown = true; st.ticks = []; draw(); };
    main.querySelectorAll("[data-r]").forEach(function (c) { c.onchange = function () { st.ticks[+c.dataset.r] = c.checked; }; });
    var rub = $("#rub"); if (rub) rub.onclick = function () { st.ok = st.ticks.filter(Boolean).length >= 2; st.answered = true; grade(q, st.ok, "think"); draw(); };
    var nx = $("#nx"); if (nx) { nx.onclick = ask; nx.focus({ preventScroll: true }); }
  }

  /* ---------- lessons: big idea → toy → worked → faded → 3-question check → explain back ---------- */
  var FADE = { "c6-mid": "gen-mid", "c4-dwl": "gen-dwl", "c4-cs": "gen-cstri", "c6-tr": "gen-tr" };
  function lesson(id, step) {
    var l = LEARN[id], toy = window.Toys.forTopic(id), steps = ["big"].concat(toy ? ["toy"] : [], ["worked", "faded"], FADE[id] ? ["fade2", "solo"] : [], ["check", "explain"]);
    step = Math.min(step, steps.length - 1); var kind = steps[step];
    var dots = '<div class="dots" aria-label="' + num(step + 1) + " / " + num(steps.length) + '">' + steps.map(function (s, i) { return '<i class="' + (i <= step ? "on" : "") + '"></i>'; }).join("") + "</div>";
    var head = dots + '<p class="muted">' + esc(t(l.title)) + "</p>";
    var nextHash = "#/learn/" + id + "/" + (step + 1);
    var gen = FADE[id] && GEN[FADE[id]];
    if (kind === "big") {
      render(head + '<div class="card">' + h("h1", "", rich(l.big)) + '<p class="analogy">💡 ' + rich(l.analogy) + "</p><ul>" + l.body.map(function (b) { return "<li>" + rich(b) + "</li>"; }).join("") + "</ul>" + (l.joke ? '<p class="joke">😄 ' + rich(l.joke) + "</p>" : "") + "</div>" + btn(esc(u("cont")) + " →", 'id="nx"', "primary"), function () { lesson(id, step); });
      $("#nx").onclick = function () { go(nextHash); };
    } else if (kind === "toy") {
      render(head + h("h2", "", esc(u("tryToy"))) + '<div class="card toy" id="toy"></div>' + btn(esc(u("cont")) + " →", 'id="nx"', "primary"), function () { lesson(id, step); });
      window.Toys.run(toy, $("#toy")); $("#nx").onclick = function () { go(nextHash); };
    } else if (kind === "worked") {
      var w = gen ? gen.make(C.rng(11)) : null;
      render(head + h("h2", "", esc(u("worked"))) + '<div class="card"><p class="qtext">' + rich(w ? w.q : l.worked.q) + '</p><ol class="steps">' + (w ? w.steps : l.worked.steps).map(function (s) { return "<li>" + rich(s) + "</li>"; }).join("") + (w ? "<li><b>" + nb(C.round(w.answer)) + "</b></li>" : "") + "</ol></div>" + btn(esc(u("cont")) + " →", 'id="nx"', "primary"), function () { lesson(id, step); });
      $("#nx").onclick = function () { go(nextHash); };
    } else if (kind === "faded" && !gen) {
      var f = l.faded, st = { pick: null }, order = C.shuffle(f.opts);
      var draw = function () {
        render(head + h("h2", "", esc(u("faded"))) + '<div class="card"><p class="qtext">' + rich(f.q) + '</p><ol class="steps">' + f.steps.map(function (s) { return "<li>" + rich(s) + "</li>"; }).join("") + '<li class="blank">' + rich(f.blank) + "</li></ol><p>" + esc(u("missingStep")) + "</p>" +
          order.map(function (o, k) { return st.pick === null ? btn(rich(o.t), 'data-k="' + k + '"', "opt") : '<div class="opt ' + (o.ok ? "right" : st.pick === k ? "wrong" : "") + '">' + (o.ok ? "✓ " : st.pick === k ? "✗ " : "") + rich(o.t) + "</div>"; }).join("") +
          (st.pick !== null ? feedback(order[st.pick].ok) : "") + "</div>", draw);
        main.querySelectorAll("[data-k]").forEach(function (b) { b.onclick = function () { st.pick = +b.dataset.k; draw(); }; });
        var nx = $("#nx"); if (nx) nx.onclick = function () { go(nextHash); };
      };
      draw();
    } else if (kind === "faded" || kind === "fade2" || kind === "solo") {
      var hide = kind === "faded" ? 1 : kind === "fade2" ? 2 : 99, p = gen.make(C.rng(31 + step * 17 + (now() & 0xff))), s2 = { done: false };
      var shown = Math.max(0, p.steps.length - hide);
      var drawF = function () {
        render(head + h("h2", "", esc(kind === "solo" ? u("solo") : u("faded"))) + '<div class="card"><p class="qtext">' + rich(p.q) + '</p><ol class="steps">' + p.steps.map(function (s, i) { return i < shown || s2.done ? "<li>" + rich(s) + "</li>" : '<li class="blank">？</li>'; }).join("") + "</ol>" +
          (s2.done ? feedback(s2.ok, "<p>" + esc(u("answerWas")) + " <b>" + nb(C.round(p.answer)) + "</b></p>") : '<form id="ff" class="row"><label class="sr" for="fa">' + esc(u("yourAnswer")) + '</label><input id="fa" inputmode="decimal" autocomplete="off" placeholder="' + esc(u("typeNum")) + '" required>' + btn(esc(u("check")), 'type="submit"', "primary") + "</form>") + "</div>", drawF);
        var ff = $("#ff"); if (ff) ff.onsubmit = function (e) { e.preventDefault(); var v = $("#fa").value; s2.ok = p.abs ? C.elasticityMatches(v, p.answer, p.tol) : Math.abs(parseNum(v) - p.answer) <= (p.tol || 0.5); s2.done = true;
          S.skills[id] = C.recordSkill(S.skills[id], s2.ok, "practice", now()); save(); drawF(); };
        var nx = $("#nx"); if (nx) nx.onclick = function () { go(nextHash); };
      };
      drawF();
    } else if (kind === "check") {
      var pool = BANK.filter(function (q) { return q.topic === id && q.type === "mcq"; });
      var ids = C.shuffle(pool).slice(0, 3).map(function (q) { return q.id; });
      render(head + h("h2", "", esc(u("checkSelf"))) + btn(esc(u("start")) + " →", 'id="nx"', "primary"), function () { lesson(id, step); });
      $("#nx").onclick = function () { startSession({ ids: ids, mode: "practice", onDone: function () { go(nextHash); } }); };
    } else {
      var ex = l.explain, s3 = { shown: false, ticks: [] };
      var drawE = function () {
        render(head + h("h2", "", esc(u("explain"))) + '<div class="card"><p class="qtext">' + rich(ex.prompt) + "</p>" +
          (!s3.shown ? '<label class="sr" for="ea">' + esc(u("yourAnswer")) + '</label><textarea id="ea" rows="5" placeholder="' + esc(u("explainPh")) + '">' + esc(s3.text || "") + "</textarea>" + btn(esc(u("model")), 'id="show"', "primary")
            : '<div class="model"><b>' + esc(u("model")) + ":</b> " + rich(ex.model) + "</div><p>" + esc(u("tick")) + "</p>" + ex.checks.map(function (c, i) { return '<label class="tickrow"><input type="checkbox" data-r="' + i + '"' + (s3.ticks[i] ? " checked" : "") + "> " + rich(c) + "</label>"; }).join("") + btn(esc(u("finishLesson")) + " ✓", 'id="fin"', "primary")) + "</div>", drawE);
        var sh = $("#show"); if (sh) sh.onclick = function () { s3.text = $("#ea").value; s3.shown = true; drawE(); };
        main.querySelectorAll("[data-r]").forEach(function (c) { c.onchange = function () { s3.ticks[+c.dataset.r] = c.checked; }; });
        var fin = $("#fin"); if (fin) fin.onclick = function () { S.learned[id] = now(); save(); render('<div class="card center">' + h("h2", "", "✓ " + esc(u("lessonDone"))) + celebrate() + btn("▶ " + esc(u("plan")), 'id="go"', "primary") + btn(esc(u("home")), 'id="hm"') + "</div>", null); $("#go").onclick = runPlan; $("#hm").onclick = function () { go("#/"); }; };
      };
      drawE();
    }
  }

  /* ---------- mock exams ---------- */
  function mockSet(n) {
    var r = C.rng(n * 7717), per = { c3: 7, c4: 5, c5: 7, c6: 6 };
    // Mock 2 avoids Mock 1's questions where it can.
    var avoid = n === 2 ? mockSet(1).ids : [];
    var ids = [];
    Object.keys(per).forEach(function (ch) { var pool = C.shuffle(D.questions.filter(function (q) { return q.ch === ch && avoid.indexOf(q.id) < 0; }), r); ids = ids.concat(pool.slice(0, per[ch]).map(function (q) { return q.id; })); });
    var gs = C.shuffle(window.Toys.graphs, r).slice(0, 2).map(function (g) { return g.id; }), sh = C.shuffle(D.short || [], r).slice(0, 1).map(function (s) { return s.id; });
    return { ids: C.shuffle(ids, r).concat(gs, sh) };
  }
  function mockIntro(n) {
    var m = S.mocks[n];
    render(h("h1", "", esc(u("mock")) + " " + num(n)) + '<div class="card"><p>' + esc(u("mockIntro")) + "</p>" + (m ? '<p class="muted">' + num(m.score) + " / " + num(m.total) + "</p>" : "") + btn(esc(u("start")), 'id="st"', "primary") + "</div>", function () { mockIntro(n); });
    $("#st").onclick = function () { runMock(n); };
  }
  function runMock(n) {
    var ids = mockSet(n).ids, ans = {}, i = 0, end = now() + 50 * 6e4, timer;
    function finish() {
      clearInterval(timer);
      // Short answers are self-checked against the rubric on the review screen, so they are not scored here.
      var res = ids.filter(function (id) { return !SHORT[id]; }).map(function (id) { return { id: id, ok: !!(ans[id] && ans[id].ok), a: ans[id] }; });
      var shorts = ids.filter(function (id) { return SHORT[id]; });
      res.forEach(function (r) { var q = byId(r.id), it = S.items[r.id] || (S.items[r.id] = C.newItem());
        it.lastSeen = now(); if (r.ok) it.r++; else { it.w++; it.lapses++; it.box = Math.max(1, it.box - 1); it.due = now(); it.hi = Math.max(it.hi, 1); }
        S.skills[q.topic] = C.recordSkill(S.skills[q.topic], r.ok, "mock", now()); });
      var score = res.filter(function (r) { return r.ok; }).length; S.mocks[n] = { score: score, total: res.length, at: now() }; save(ids); if (window.Sync) window.Sync.flush();
      res.sort(function (a, b) { return a.ok - b.ok; });
      render(h("h1", "", esc(u("mockDone"))) + '<p class="big">' + num(score) + " / " + num(res.length) + "</p><p>" + esc(u("pushed")) + "</p>" + h("h2", "", esc(u("review"))) +
        res.map(function (r) { var q = byId(r.id); return '<div class="card ' + (r.ok ? "" : "missed") + '"><p>' + (r.ok ? "✓ " : "✗ ") + rich(q.q || q.prompt || { en: typeLabel(q), fa: typeLabel(q) }) + "</p>" +
          (q.type === "mcq" ? q.opts.map(function (op) { return '<div class="opt ' + (op.ok ? "right" : r.a && r.a.op === op ? "wrong" : "") + '">' + rich(op.t) + "<small><b>" + esc(u(op.ok ? "why" : "whyNot")) + ":</b> " + rich(op.why) + "</small></div>"; }).join("") : q.type === "short" ? '<div class="model">' + rich(q.model) + "</div>" : r.a && r.a.why ? "<p>" + rich(r.a.why) + "</p>" : "") + "</div>"; }).join("") +
        shorts.map(function (id) { var q = SHORT[id]; return '<div class="card"><p>' + rich(q.prompt) + '</p><p class="muted">' + esc((ans[id] && ans[id].text) || "—") + '</p><div class="model"><b>' + esc(u("model")) + ":</b> " + rich(q.model) + "</div><p>" + esc(u("tick")) + "</p>" + q.rubric.map(function (r) { return '<label class="tickrow"><input type="checkbox"> ' + rich(r) + "</label>"; }).join("") + "</div>"; }).join("") +
        btn(esc(u("home")), 'id="hm"', "primary"), null);
      $("#hm").onclick = function () { go("#/"); };
    }
    function draw() {
      if (i >= ids.length) return finish();
      var q = byId(ids[i]), left = Math.max(0, end - now()), mm = Math.floor(left / 6e4), ss = Math.floor(left / 1000) % 60;
      var html = '<div class="qhead"><span>' + num(i + 1) + " " + esc(u("of")) + " " + num(ids.length) + '</span><span id="clock" class="clock">⏱ ' + num(mm) + ":" + num(String(ss).padStart(2, "0")) + " " + esc(u("timeLeft")) + "</span></div><div class=\"card\">" + h("h2", 'class="qtext"', rich(q.q || q.prompt));
      if (q.type === "mcq") html += C.shuffle(q.opts, C.rng(n * 31 + i)).map(function (op) { return btn(rich(op.t), 'data-o="' + q.opts.indexOf(op) + '"', "opt"); }).join("");
      else if (q.type === "graph") html += '<div id="gt" class="toy"></div>';
      else html += '<textarea id="sa" rows="5" placeholder="' + esc(u("explainPh")) + '"></textarea>' + btn(esc(u("next")), 'id="nx"', "primary");
      html += "</div>" + btn(esc(u("finish")), 'id="fin"', "ghost");
      render(html, draw);
      main.querySelectorAll("[data-o]").forEach(function (b) { b.onclick = function () { var op = q.opts[+b.dataset.o]; ans[q.id] = { ok: !!op.ok, op: op }; i++; draw(); }; });
      var gt = $("#gt"); if (gt) q.render(gt, function (ok, why) { ans[q.id] = { ok: ok, why: why }; i++; draw(); });
      var nx = $("#nx"); if (nx) nx.onclick = function () { // short answer: self-grade at the end against the rubric; counted as attempted
        ans[q.id] = { self: true, text: $("#sa").value }; i++; draw(); };
      $("#fin").onclick = finish;
    }
    timer = setInterval(function () { var c = $("#clock"); if (!c) return clearInterval(timer); if (now() > end) return finish(); var left = end - now(); c.textContent = "⏱ " + num(Math.floor(left / 6e4)) + ":" + num(String(Math.floor(left / 1000) % 60).padStart(2, "0")) + " " + u("timeLeft"); }, 1000);
    draw();
  }

  /* ---------- progress ---------- */
  function progress() {
    var html = h("h1", "", esc(u("progress"))) + '<p class="muted" id="syncst">' + esc(window.Sync && window.Sync.online ? u("synced") : u("localOnly")) + "</p>";
    D.chapters.forEach(function (c) { var m = C.chapterMastery(topicsOf(c.id), S.skills);
      html += '<div class="card"><strong>' + esc(t(c.name)) + '</strong><div class="bar"><i style="width:' + m + '%"></i></div><ul class="skills">' + topicsOf(c.id).map(function (tp) { var lv = (S.skills[tp] || {}).lvl || 0;
        return '<li><span>' + esc(t(LEARN[tp].title)) + '</span><span class="lvl l' + lv + '">' + esc(t(D.ui.levels[lv])) + "</span></li>"; }).join("") + "</ul></div>"; });
    var le = Object.keys(S.items).filter(function (k) { return C.isLeech(S.items[k]) && byId(k); }), hi = Object.keys(S.items).filter(function (k) { return S.items[k].hi > 0 && byId(k); });
    var list = function (ks) { return ks.length ? "<ul>" + ks.map(function (k) { var q = byId(k); return "<li>" + rich(q.q || q.prompt || { en: k, fa: k }) + "</li>"; }).join("") + "</ul>" : "<p>" + esc(u("none")) + "</p>"; };
    html += '<div class="card"><h2>' + esc(u("leeches")) + "</h2>" + list(le) + "</div><div class=\"card\"><h2>" + esc(u("hiErrors")) + "</h2>" + list(hi) + "</div>";
    html += '<div class="row">' + btn(esc(u("exportP")), 'id="exp"') + btn(esc(u("importP")), 'id="imp"') + "</div>";
    render(html, progress);
    $("#exp").onclick = function () { var a = document.createElement("a"); a.href = URL.createObjectURL(new Blob([JSON.stringify(S, null, 1)], { type: "application/json" })); a.download = "econ206-progress-" + C.dayKey(now()) + ".json"; a.click(); };
    $("#imp").onclick = function () { var i = document.createElement("input"); i.type = "file"; i.accept = "application/json,.json"; i.onchange = function () { i.files[0].text().then(function (x) { var s = JSON.parse(x); if (s.v !== 2) throw 0; S = Object.assign(fresh(), s); save(Object.keys(S.items)); applyChrome(); progress(); }).catch(function () { alert("?"); }); }; i.click(); };
  }
  function toys(name) {
    var names = window.Toys.names, nm = names.indexOf(name) >= 0 ? name : names[0];
    var labels = { shift: { en: "Shift the curves", fa: "جابه‌جایی منحنی‌ها" }, double: { en: "Double shifts", fa: "جابه‌جایی دوگانه" }, painter: { en: "Surplus painter", fa: "رنگ‌کردن مازاد" }, permits: { en: "Permits game", fa: "بازی جواز" }, sort: { en: "Sort the goods", fa: "دسته‌بندی کالاها" }, calc: { en: "Elasticity calculator", fa: "ماشین‌حساب کشش" }, line: { en: "Slide the demand line", fa: "حرکت روی خط تقاضا" }, tr: { en: "Total revenue test", fa: "آزمون درآمد کل" } };
    render(h("h1", "", esc(u("toys"))) + '<div class="chips wrap">' + names.map(function (k) { return '<a class="chip" href="#/toys/' + k + '"' + (k === nm ? ' aria-current="page"' : "") + ">" + esc(t(labels[k])) + "</a>"; }).join("") + '</div><div class="card toy" id="toy"></div>', function () { toys(nm); });
    window.Toys.run(nm, $("#toy"));
  }

  window.App.refresh = function () { applyChrome(); route(); };
  applyChrome(); route();
  if (window.Sync) window.Sync.start();
})();
