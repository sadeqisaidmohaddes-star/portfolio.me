(function () {
  var D = window.STUDY, $ = function (s) { return document.querySelector(s); };
  var KEY = "econ206.v1";
  var S = load();
  var lang = S.lang || "en";
  var view = null; // re-render function for the current screen

  function load() { try { return JSON.parse(localStorage.getItem(KEY)) || {}; } catch (e) { return {}; } }
  function save() { try { localStorage.setItem(KEY, JSON.stringify(S)); } catch (e) {} }
  S.items = S.items || {}; S.sessions = S.sessions || 0;

  function t(o) { return o[lang] || o.en; }
  function u(k) { return t(D.ui[k]); }
  function esc(s) { return String(s).replace(/[&<>"]/g, function (c) { return { "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;" }[c]; }); }
  function num(n) { return lang === "fa" ? String(n).replace(/\d/g, function (d) { return "۰۱۲۳۴۵۶۷۸۹"[d]; }) : String(n); }
  function today() { var d = new Date(); return d.getFullYear() + "-" + String(d.getMonth() + 1).padStart(2, "0") + "-" + String(d.getDate()).padStart(2, "0"); }
  function item(id) { return S.items[id] || (S.items[id] = { right: 0, wrong: 0, misses: 0, lastDay: "", hiWrong: 0, mixedOk: false }); }

  // ---- language: toggle buttons + horizontal swipe anywhere ----
  function setLang(l, dir) {
    if (l === lang) return;
    lang = l; S.lang = l; save(); applyLang(dir);
  }
  function applyLang(dir) {
    var h = document.documentElement;
    h.lang = lang === "fa" ? "fa-AF" : "en"; h.dir = lang === "fa" ? "rtl" : "ltr";
    document.title = u("title");
    document.querySelectorAll("#langswitch button").forEach(function (b) { b.setAttribute("aria-pressed", b.dataset.lang === lang); });
    $("#home").textContent = u("title");
    $("#hint").textContent = u("swipeHint");
    var m = $("#app"); m.classList.remove("slide"); void m.offsetWidth;
    m.style.setProperty("--from", (dir || 1) * 24 + "px"); m.classList.add("slide");
    if (view) view();
  }
  document.querySelectorAll("#langswitch button").forEach(function (b) { b.onclick = function () { setLang(b.dataset.lang, b.dataset.lang === "fa" ? -1 : 1); }; });
  var x0 = null, y0 = null;
  document.addEventListener("touchstart", function (e) { x0 = e.touches[0].clientX; y0 = e.touches[0].clientY; }, { passive: true });
  document.addEventListener("touchend", function (e) {
    if (x0 === null) return;
    var dx = e.changedTouches[0].clientX - x0, dy = e.changedTouches[0].clientY - y0; x0 = null;
    if (Math.abs(dx) > 70 && Math.abs(dx) > 2 * Math.abs(dy)) setLang(lang === "en" ? "fa" : "en", dx < 0 ? 1 : -1);
  }, { passive: true });
  $("#home").onclick = home;

  // ---- home ----
  function daysLeft() { return Math.max(0, Math.ceil((new Date("2026-10-13T09:00:00") - new Date()) / 864e5)); }
  function mastery(ch) {
    var qs = D.questions.filter(function (q) { return q.ch === ch; });
    var p = qs.filter(function (q) { var i = S.items[q.id]; return i && i.right >= 1 && i.lastWasRight; }).length;
    return Math.round(100 * p / qs.length);
  }
  function todaysPlan() { var d = today(); return D.plan.find(function (p) { return p.date === d; }) || D.plan[d < D.plan[0].date ? 0 : 4]; }
  function home() {
    view = home;
    var p = todaysPlan();
    var h = '<div class="card"><div class="big">' + num(daysLeft()) + '</div><div class="muted">' + u("daysLeft") + " · " + num(S.sessions) + " " + u("sessions") + '</div></div>';
    h += '<div class="card"><p>' + esc(t(p.note)) + '</p><button class="primary" id="go">' + u("plan") + '</button></div>';
    h += '<div class="card"><div class="row"><button id="mix">' + u("mixed") + '</button><button id="trap">' + u("traps") + '</button></div><p class="muted">' + u("mixedWarn") + '</p></div>';
    D.chapters.forEach(function (c) {
      var m = mastery(c.id);
      h += '<div class="card"><strong>' + esc(t(c.name)) + '</strong><p class="muted">' + u("mastery") + ' ' + num(m) + '%</p><div class="bar"><i style="width:' + m + '%"></i></div><div class="row" style="margin-top:10px"><button data-l="' + c.id + '">' + u("learn") + '</button><button data-t="' + c.id + '">' + u("test") + " · " + u("chapterOnly") + '</button></div></div>';
    });
    h += '<div class="row"><button id="exp">' + u("export") + '</button><button id="imp">' + u("import") + '</button></div>';
    $("#app").innerHTML = h;
    $("#go").onclick = function () { start(p.ch[0] === "missed" ? pool("missed") : pool(p.ch)); };
    $("#mix").onclick = function () { start(pool(["c3", "c4", "c5", "c6"]), true); };
    $("#trap").onclick = function () { start(D.questions.filter(function (q) { return q.trap; })); };
    document.querySelectorAll("[data-l]").forEach(function (b) { b.onclick = function () { learn(b.dataset.l); }; });
    document.querySelectorAll("[data-t]").forEach(function (b) { b.onclick = function () { start(pool([b.dataset.t])); }; });
    $("#exp").onclick = function () { var a = document.createElement("a"); a.href = URL.createObjectURL(new Blob([JSON.stringify(S)], { type: "application/json" })); a.download = "econ206-progress.json"; a.click(); };
    $("#imp").onclick = function () { var i = document.createElement("input"); i.type = "file"; i.accept = "application/json"; i.onchange = function () { i.files[0].text().then(function (x) { S = JSON.parse(x); S.lang = lang; save(); home(); }); }; i.click(); };
  }

  // ---- learn: big idea → analogy → points → always ends in retrieval ----
  function learn(ch) {
    view = function () { learn(ch); };
    var L = D.learn.find(function (l) { return l.ch === ch; });
    var h = '<div class="card"><h2>' + esc(t(L.big)) + '</h2><p>' + esc(t(L.analogy)) + '</p><ul>';
    L.points.forEach(function (p) { h += "<li>" + esc(t(p)) + "</li>"; });
    h += '</ul></div><button class="primary" id="chk">' + u("checkUnderstanding") + "</button>";
    $("#app").innerHTML = h;
    $("#chk").onclick = function () { start(shuffle(D.questions.filter(function (q) { return q.ch === ch; })).slice(0, 3)); };
  }

  // ---- scheduler: successive relearning, compressed ----
  function pool(chs) {
    var qs = chs === "missed"
      ? D.questions.filter(function (q) { return (S.items[q.id] || {}).wrong > 0; })
      : D.questions.filter(function (q) { return chs.indexOf(q.ch) >= 0; });
    var d = today();
    var due = qs.filter(function (q) { var i = S.items[q.id]; return i && i.lastDay !== d; });
    var fresh = qs.filter(function (q) { return !S.items[q.id]; }).slice(0, 12);
    var hi = due.filter(function (q) { return S.items[q.id].hiWrong > 0; });
    return shuffle(hi.concat(due.filter(function (q) { return hi.indexOf(q) < 0; }), fresh)).slice(0, 30);
  }
  function shuffle(a) { a = a.slice(); for (var i = a.length - 1; i > 0; i--) { var j = Math.floor(Math.random() * (i + 1)); var x = a[i]; a[i] = a[j]; a[j] = x; } return a; }

  function start(list, mixed) {
    if (!list.length) list = shuffle(D.questions).slice(0, 10);
    var queue = list.map(function (q) { return { q: q, need: S.items[q.id] ? 1 : 3 }; });
    var done = 0, t0 = Date.now();
    var order = list.map(function (q) { return shuffle(q.opts); });
    function step() {
      if (!queue.length || done >= 30 || Date.now() - t0 > 25 * 60e3) return finish();
      var cur = queue[0], q = cur.q, conf = null, picked = null, n = done + 1;
      var opts = order[list.indexOf(q)] || shuffle(q.opts);
      function draw() {
        view = draw;
        var i = item(q.id);
        var h = '<div class="card"><p class="muted">' + u("q") + " " + num(n) + (q.trap ? ' <span class="tag">' + u("trapTag") + "</span>" : "") + "</p><h2>" + esc(t(q.q)) + "</h2>";
        if (i.misses >= 3 && q.alt) h += '<p class="muted">' + u("leech") + " " + esc(t(q.alt)) + "</p>";
        if (!conf) {
          h += "<p>" + u("howSure") + '</p><div class="row">' + ["sure", "think", "guess"].map(function (c) { return '<button data-c="' + c + '">' + u(c) + "</button>"; }).join("") + "</div>";
          opts.forEach(function (o) { h += '<button class="opt" disabled>' + esc(t(o.t)) + "</button>"; });
        } else {
          opts.forEach(function (o, k) {
            var cls = picked === null ? "" : o.ok ? " ok" : picked === k ? " bad" : "";
            h += '<button class="opt' + cls + '" data-k="' + k + '"' + (picked !== null ? " disabled" : "") + ">" + esc(t(o.t));
            if (picked !== null) h += "<small>" + (o.ok ? u("why") : u("whyNot")) + ": " + esc(t(o.why)) + "</small>";
            h += "</button>";
          });
          if (picked !== null) h += '<p><strong>' + (opts[picked].ok ? u("correct") : u("wrong")) + '</strong></p><button class="primary" id="nx">' + u("next") + "</button>";
        }
        $("#app").innerHTML = h + "</div>";
        document.querySelectorAll("[data-c]").forEach(function (b) { b.onclick = function () { conf = b.dataset.c; draw(); }; });
        document.querySelectorAll("[data-k]").forEach(function (b) { b.onclick = function () { picked = +b.dataset.k; grade(); draw(); }; });
        var nx = $("#nx"); if (nx) { nx.onclick = step; nx.focus(); }
      }
      function grade() {
        var i = item(q.id), ok = opts[picked].ok;
        queue.shift(); done++;
        i.lastWasRight = ok;
        if (ok) { i.right++; if (mixed) i.mixedOk = true; if (--cur.need > 0) queue.splice(Math.min(3, queue.length), 0, cur); else i.lastDay = today(); }
        else {
          i.wrong++; i.misses++; if (conf === "sure") i.hiWrong = 2;
          cur.need = Math.max(cur.need, 1); queue.splice(Math.min(3 + Math.floor(Math.random() * 3), queue.length), 0, cur);
        }
        if (ok && i.hiWrong > 0 && cur.need <= 0) i.hiWrong--;
        save();
      }
      draw();
    }
    function finish() {
      S.sessions++; save(); summary();
    }
    function summary() {
      view = summary;
      $("#app").innerHTML = '<div class="card"><h2>' + u("done") + '</h2><div class="row"><button class="primary" id="ag">' + u("again") + '</button><button id="hm">' + u("home") + "</button></div></div>";
      $("#ag").onclick = function () { start(pool(["c3", "c4", "c5", "c6"]), true); };
      $("#hm").onclick = home;
    }
    step();
  }

  applyLang(1); home();
})();
