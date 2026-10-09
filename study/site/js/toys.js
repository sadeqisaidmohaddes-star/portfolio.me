/* Interactive toys and graph tasks. Every chart is labelled on the picture itself.
   Demand is always .d (blue), supply always .s (raspberry), everywhere on the site. */
(function (root) {
  "use strict";
  var C = root.Core;
  var X = function (q) { return 40 + q * 24; }, Y = function (p) { return 214 - p * 19; };
  function L(o) { return root.App.t(o); }
  function n(x) { return root.App.num(x); }
  function svg(inner, label) {
    return '<svg class="chart" viewBox="0 0 300 236" role="img" aria-label="' + label + '" dir="ltr">' +
      '<line class="axis" x1="40" y1="12" x2="40" y2="214"/><line class="axis" x1="40" y1="214" x2="292" y2="214"/>' +
      '<text class="ax" x="30" y="20">P</text><text class="ax" x="284" y="230">Q</text>' + inner + "</svg>";
  }
  function seg(cls, q1, p1, q2, p2, extra) { return '<line class="' + cls + '" x1="' + X(q1) + '" y1="' + Y(p1) + '" x2="' + X(q2) + '" y2="' + Y(p2) + '"' + (extra || "") + "/>"; }
  function txt(cls, q, p, s, anchor) { return '<text class="' + cls + '" x="' + X(q) + '" y="' + Y(p) + '"' + (anchor ? ' text-anchor="' + anchor + '"' : "") + ">" + s + "</text>"; }
  function poly(cls, pts, extra) { return '<polygon class="' + cls + '" points="' + pts.map(function (p) { return X(p[0]) + "," + Y(p[1]); }).join(" ") + '"' + (extra || "") + "/>"; }
  function dot(cls, q, p, r) { return '<circle class="' + cls + '" cx="' + X(q) + '" cy="' + Y(p) + '" r="' + (r || 5) + '"/>'; }
  // Demand P = 10 − Q + dD, supply P = Q − dS (positive dS = supply shifts right).
  function eq(dD, dS) { var q = (10 + dD + dS) / 2; return { q: q, p: q - dS }; }
  function dLine(dD, cls, lab) { return seg("d " + (cls || ""), Math.max(0, dD), 10, Math.min(10, 10 + dD), Math.max(0, dD)) .replace(/x1="[^"]+" y1="[^"]+"/, function () { var q0 = Math.max(0, dD); return 'x1="' + X(q0) + '" y1="' + Y(10 - q0 + dD) + '"'; }) + txt("lab d", Math.min(9.6, 9.2 + dD), Math.max(0.6, 0.8 + dD - 0.0), lab || "D"); }
  function sLine(dS, cls, lab) { var q0 = Math.max(0, dS), q1 = Math.min(10, 10 + dS); return seg("s " + (cls || ""), q0, q0 - dS, q1, q1 - dS) + txt("lab s", Math.min(9.6, q1 - 0.4), Math.min(9.8, q1 - dS - 0.2), lab || "S"); }
  function arrow(v) { return v > 0.01 ? "▲" : v < -0.01 ? "▼" : "＝"; }
  function word(v) { return v > 0.01 ? { en: "up", fa: "بالا" } : v < -0.01 ? { en: "down", fa: "پایین" } : { en: "no change", fa: "بدون تغییر" }; }

  var Toys = {};

  /* 1. Shift-the-curve playground */
  Toys.shift = function (el) {
    var st = { d: 0, s: 0 };
    var scen = [
      { t: { en: "Everyone loves it", fa: "همه عاشقش شدند" }, d: 2, s: 0 },
      { t: { en: "Factory flooded", fa: "فابریکه را سیلاب برد" }, d: 0, s: -2 },
      { t: { en: "New robot tech", fa: "تکنالوژی تازهٔ روبات" }, d: 0, s: 2 },
      { t: { en: "Substitute got cheaper", fa: "جانشینش ارزان شد" }, d: -2, s: 0 }];
    function draw() {
      var e0 = eq(0, 0), e1 = eq(st.d, st.s);
      el.innerHTML = svg(dLine(0, "ghost", "D₁") + sLine(0, "ghost", "S₁") + dLine(st.d, "", st.d ? "D₂" : "D") + sLine(st.s, "", st.s ? "S₂" : "S") +
          dot("e0", e0.q, e0.p, 4) + dot("e1", e1.q, e1.p) + txt("lab", e1.q + 0.3, e1.p + 0.4, "E"), L({ en: "Supply and demand graph", fa: "گراف عرضه و تقاضا" })) +
        '<div class="ctrl"><label>' + L({ en: "Demand", fa: "تقاضا" }) + ' <input type="range" min="-3" max="3" step="0.5" value="' + st.d + '" data-k="d" aria-label="demand shift"></label>' +
        '<label>' + L({ en: "Supply", fa: "عرضه" }) + ' <input type="range" min="-3" max="3" step="0.5" value="' + st.s + '" data-k="s" aria-label="supply shift"></label></div>' +
        '<div class="chips">' + scen.map(function (s, i) { return '<button type="button" data-sc="' + i + '">' + L(s.t) + "</button>"; }).join("") + '<button type="button" data-sc="r">↺</button></div>' +
        '<p class="readout" aria-live="polite">' + L({ en: "Price", fa: "قیمت" }) + " " + arrow(e1.p - e0.p) + " " + L(word(e1.p - e0.p)) + " · " + L({ en: "Quantity", fa: "مقدار" }) + " " + arrow(e1.q - e0.q) + " " + L(word(e1.q - e0.q)) + "</p>";
      el.querySelectorAll("input").forEach(function (i) { i.oninput = function () { st[i.dataset.k] = +i.value; draw(); el.querySelector('[data-k="' + i.dataset.k + '"]').focus(); }; });
      el.querySelectorAll("[data-sc]").forEach(function (b) { b.onclick = function () { var s = scen[b.dataset.sc]; st = s ? { d: s.d, s: s.s } : { d: 0, s: 0 }; draw(); }; });
    }
    draw();
  };

  /* 2. Double-shift 2×2 grid */
  Toys.double = function (el) {
    var cell = null, bigger = "d";
    var cells = [{ d: 1, s: 1 }, { d: -1, s: -1 }, { d: 1, s: -1 }, { d: -1, s: 1 }];
    function draw() {
      var html = '<div class="grid2">' + cells.map(function (c, i) {
        return '<button type="button" class="cellbtn' + (cell === i ? " on" : "") + '" data-i="' + i + '"><span class="d">D' + (c.d > 0 ? "↑" : "↓") + '</span> + <span class="s">S' + (c.s > 0 ? "↑" : "↓") + "</span></button>"; }).join("") + "</div>";
      if (cell !== null) {
        var c = cells[cell], mD = bigger === "d" ? 2 : 1, mS = bigger === "s" ? 2 : 1, e0 = eq(0, 0), e1 = eq(c.d * mD, c.s * mS);
        var same = c.d === c.s;
        html += svg(dLine(0, "ghost", "D₁") + sLine(0, "ghost", "S₁") + dLine(c.d * mD, "", "D₂") + sLine(c.s * mS, "", "S₂") + dot("e0", e0.q, e0.p, 4) + dot("e1", e1.q, e1.p), "double shift");
        html += '<div class="chips"><button type="button" data-b="d"' + (bigger === "d" ? ' aria-pressed="true"' : "") + ">" + L({ en: "Demand shift bigger", fa: "جابه‌جایی تقاضا بزرگ‌تر" }) + '</button><button type="button" data-b="s"' + (bigger === "s" ? ' aria-pressed="true"' : "") + ">" + L({ en: "Supply shift bigger", fa: "جابه‌جایی عرضه بزرگ‌تر" }) + "</button></div>";
        html += '<p class="readout" aria-live="polite">' + (same
          ? L({ en: "Quantity is CERTAIN: " + L(word(c.d)) + ". Price is UNCLEAR — flip the toggle and watch it change.", fa: "مقدار قطعی است: " + L(word(c.d)) + ". قیمت نامعلوم است — دکمه را عوض کنید و تغییرش را ببینید." })
          : L({ en: "Price is CERTAIN: " + L(word(c.d)) + ". Quantity is UNCLEAR — it depends on which shift is bigger.", fa: "قیمت قطعی است: " + L(word(c.d)) + ". مقدار نامعلوم است — به بزرگی جابه‌جایی‌ها بستگی دارد." })) +
          " (" + L({ en: "this picture: P ", fa: "این تصویر: P " }) + arrow(e1.p - e0.p) + ", Q " + arrow(e1.q - e0.q) + ")</p>";
      } else html += '<p class="muted">' + L({ en: "Tap a box. Same direction → quantity is sure. Opposite → price is sure.", fa: "یک خانه را بزنید. هم‌جهت ← مقدار قطعی. خلاف جهت ← قیمت قطعی." }) + "</p>";
      el.innerHTML = html;
      el.querySelectorAll("[data-i]").forEach(function (b) { b.onclick = function () { cell = +b.dataset.i; draw(); }; });
      el.querySelectorAll("[data-b]").forEach(function (b) { b.onclick = function () { bigger = b.dataset.b; draw(); }; });
    }
    draw();
  };

  /* 3. Surplus painter. Region shapes in (Q, P) units; $1 per P unit, 10 units per Q unit. */
  var SCENES = {
    free: { label: { en: "Free market", fa: "بازار آزاد" }, extra: function () { return ""; },
      regions: { A: [[0, 10], [0, 5], [5, 5]], B: [[0, 5], [0, 0], [5, 5]] }, truth: { CS: ["A"], PS: ["B"], DWL: [] } },
    ceiling: { label: { en: "Price ceiling at $3", fa: "سقف قیمت ۳ دالر" }, extra: function () { return seg("cap", 0, 3, 10, 3) + txt("lab cap", 7.6, 3.3, "ceiling $3"); },
      regions: { A: [[0, 10], [0, 7], [3, 7]], B: [[0, 7], [3, 7], [3, 5], [0, 5]], C: [[0, 5], [3, 5], [3, 3], [0, 3]], D: [[3, 7], [5, 5], [3, 5]], E: [[3, 5], [5, 5], [3, 3]], F: [[0, 3], [3, 3], [0, 0]] },
      truth: { CS: ["A", "B", "C"], PS: ["F"], DWL: ["D", "E"] } }
  };
  function area(pts) { var a = 0; for (var i = 0; i < pts.length; i++) { var j = (i + 1) % pts.length; a += pts[i][0] * pts[j][1] - pts[j][0] * pts[i][1]; } return Math.abs(a) / 2 * 10; }
  function painter(el, sceneKey, onCheck, onlyBrush) {
    var sc = SCENES[sceneKey], paint = {}, brush = onlyBrush || "CS";
    function draw() {
      var inner = "";
      Object.keys(sc.regions).forEach(function (k) { var r = sc.regions[k], c = r.reduce(function (a, p) { return [a[0] + p[0] / r.length, a[1] + p[1] / r.length]; }, [0, 0]);
        inner += poly("rg " + (paint[k] ? "p-" + paint[k] : ""), r, ' data-r="' + k + '" tabindex="0" role="button" aria-label="region ' + k + (paint[k] ? " " + paint[k] : "") + '"') + txt("rl", c[0], c[1] - 0.3, k + (paint[k] ? " " + paint[k] : ""), "middle"); });
      inner += dLine(0) + sLine(0) + sc.extra() + dot("e1", 5, 5, 3);
      var sums = { CS: 0, PS: 0, DWL: 0 }; Object.keys(paint).forEach(function (k) { if (paint[k]) sums[paint[k]] += area(sc.regions[k]); });
      el.innerHTML = '<p class="muted">' + L(sc.label) + "</p>" + svg(inner, "surplus painter") +
        (onlyBrush ? "" : '<div class="chips">' + ["CS", "PS", "DWL"].map(function (b) { return '<button type="button" class="br-' + b + '" data-br="' + b + '"' + (brush === b ? ' aria-pressed="true"' : "") + ">" + b + "</button>"; }).join("") + "</div>") +
        '<p class="readout" aria-live="polite">CS $' + n(sums.CS) + " · PS $" + n(sums.PS) + " · DWL $" + n(sums.DWL) + "</p>" +
        '<button type="button" class="primary" data-chk>' + L({ en: "Check", fa: "بررسی" }) + "</button>";
      el.querySelectorAll("[data-r]").forEach(function (p) {
        var go = function () { var k = p.dataset.r; paint[k] = paint[k] === brush ? "" : brush; draw(); var a = el.querySelector('[data-r="' + k + '"]'); if (a) a.focus(); };
        p.addEventListener("click", go); p.addEventListener("keydown", function (e) { if (e.key === "Enter" || e.key === " ") { e.preventDefault(); go(); } }); });
      el.querySelectorAll("[data-br]").forEach(function (b) { b.onclick = function () { brush = b.dataset.br; draw(); }; });
      el.querySelector("[data-chk]").onclick = function () {
        var kinds = onlyBrush ? [onlyBrush] : ["CS", "PS", "DWL"];
        var ok = kinds.every(function (b) { var want = sc.truth[b].slice().sort().join(), got = Object.keys(paint).filter(function (k) { return paint[k] === b; }).sort().join(); return want === got; });
        onCheck(ok, kinds.map(function (b) { return b + " = " + (sc.truth[b].join(" + ") || "—"); }).join(" · "));
      };
    }
    draw();
  }
  Toys.painter = function (el) {
    var host = document.createElement("div"), pick = document.createElement("div");
    pick.className = "chips"; el.innerHTML = ""; el.appendChild(pick); el.appendChild(host);
    function load(k) {
      pick.innerHTML = Object.keys(SCENES).map(function (s) { return '<button type="button" data-s="' + s + '"' + (s === k ? ' aria-pressed="true"' : "") + ">" + L(SCENES[s].label) + "</button>"; }).join("");
      pick.querySelectorAll("[data-s]").forEach(function (b) { b.onclick = function () { load(b.dataset.s); }; });
      painter(host, k, function (ok, ans) { var p = document.createElement("p"); p.className = "readout " + (ok ? "good" : "bad"); p.setAttribute("role", "status"); p.textContent = (ok ? "✓ " : "✗ ") + ans; host.appendChild(p); });
    }
    load("ceiling");
  };

  /* 4. Permits game: the professor's numbers. Drag a cleaning token, or tap a token then tap a firm. */
  Toys.permits = function (el) {
    var plan = { X: 2, Y: 2, Z: 2 }, sel = null;
    function draw() {
      var cost = C.permitCost(plan);
      el.innerHTML = '<p class="muted">' + L({ en: "6 units of cleaning must happen. Each firm can clean up to 3. Move the 🧽 tokens to the cheapest cleaners.", fa: "باید ۶ واحد پاک‌کاری شود. هر فابریکه تا ۳ واحد پاک می‌کند. 🧽 ها را به ارزان‌ترین پاک‌کننده‌ها ببرید." }) + "</p>" +
        '<div class="firms">' + ["X", "Y", "Z"].map(function (f) {
          var tokens = ""; for (var i = 0; i < plan[f]; i++) tokens += '<button type="button" class="tok' + (sel === f ? " sel" : "") + '" draggable="true" data-from="' + f + '" aria-label="cleaning unit at firm ' + f + '">🧽</button>';
          return '<div class="firm" data-to="' + f + '" role="button" tabindex="0" aria-label="firm ' + f + '"><strong>' + L({ en: "Firm ", fa: "فابریکه " }) + f + '</strong><span class="muted">$' + n(C.PERMIT_COST[f]) + L({ en: "/unit", fa: "/واحد" }) + '</span><div class="toks">' + tokens + "</div><span>" + n(plan[f]) + " × $" + n(C.PERMIT_COST[f]) + "</span></div>"; }).join("") + "</div>" +
        '<div class="bar big"><i style="width:' + (cost / 7000 * 100) + '%"></i></div>' +
        '<p class="readout" aria-live="polite">' + L({ en: "Total cost", fa: "هزینهٔ کل" }) + ": $" + n(cost) + " · " + L({ en: "equal cuts cost $7,000", fa: "کاهش برابر ۷۰۰۰ دالر" }) + (cost < 7000 ? " · " + L({ en: "you save", fa: "صرفه‌جویی" }) + " $" + n(7000 - cost) : "") + (cost === 4500 ? " 🎉 " + L({ en: "Cheapest possible! Same clean air.", fa: "ارزان‌ترین ممکن! همان هوای پاک." }) : "") + "</p>";
      el.querySelectorAll("[data-from]").forEach(function (t) {
        t.onclick = function (e) { e.stopPropagation(); sel = sel === t.dataset.from ? null : t.dataset.from; draw(); };
        t.ondragstart = function (e) { e.dataTransfer.setData("text/plain", t.dataset.from); };
        t.addEventListener("pointerdown", function (e) { if (e.pointerType !== "mouse") { sel = t.dataset.from; } });
      });
      el.querySelectorAll("[data-to]").forEach(function (f) {
        var move = function (from) { var to = f.dataset.to; if (from && from !== to && plan[from] > 0 && plan[to] < 3) { plan[from]--; plan[to]++; } sel = null; draw(); };
        f.onclick = function () { move(sel); };
        f.onkeydown = function (e) { if (e.key === "Enter" || e.key === " ") { e.preventDefault(); move(sel); } };
        f.ondragover = function (e) { e.preventDefault(); };
        f.ondrop = function (e) { e.preventDefault(); move(e.dataTransfer.getData("text/plain")); };
        f.addEventListener("pointerup", function (e) { if (e.pointerType !== "mouse" && sel && sel !== f.dataset.to) { var s = sel; setTimeout(function () { move(s); }); } });
      });
    }
    draw();
  };

  /* 5. Goods sorting grid */
  var GOODS = [
    { t: { en: "Sandwich", fa: "ساندویچ" }, c: "private" }, { t: { en: "Pizza slice", fa: "قطعه پیتزا" }, c: "private" },
    { t: { en: "Lighthouse", fa: "چراغ دریایی" }, c: "public" }, { t: { en: "National defense", fa: "دفاع ملی" }, c: "public" }, { t: { en: "Fireworks show", fa: "آتش‌بازی" }, c: "public" },
    { t: { en: "Netflix", fa: "نتفلیکس" }, c: "club" }, { t: { en: "Uncrowded toll road", fa: "سرک پولی خلوت" }, c: "club" },
    { t: { en: "Ocean fish", fa: "ماهی دریا" }, c: "common" }, { t: { en: "Grass in a free park", fa: "چمن پارک رایگان" }, c: "common" }];
  var CELLS = [
    { c: "private", t: { en: "Private: rival + excludable", fa: "خصوصی: رقابتی + قابل‌انحصار" } },
    { c: "club", t: { en: "Club: non-rival + excludable", fa: "باشگاهی: غیررقابتی + قابل‌انحصار" } },
    { c: "common", t: { en: "Common resource: rival + non-excludable", fa: "منبع مشترک: رقابتی + غیرقابل‌انحصار" } },
    { c: "public", t: { en: "Public: non-rival + non-excludable", fa: "عمومی: غیررقابتی + غیرقابل‌انحصار" } }];
  Toys.sort = function (el) {
    var place = {}, sel = null, checked = false;
    function draw() {
      var tray = GOODS.map(function (g, i) { return place[i] ? "" : '<button type="button" class="card-g' + (sel === i ? " sel" : "") + '" draggable="true" data-g="' + i + '">' + L(g.t) + "</button>"; }).join("");
      el.innerHTML = '<p class="muted">' + L({ en: "Tap a good, then tap its box (or drag it).", fa: "یک کالا را بزنید، بعد خانه‌اش را (یا بکشید)." }) + '</p><div class="tray">' + (tray || "✓") + '</div><div class="grid2">' +
        CELLS.map(function (c) { return '<div class="drop" data-c="' + c.c + '" role="button" tabindex="0"><strong>' + L(c.t) + "</strong>" +
          GOODS.map(function (g, i) { if (place[i] !== c.c) return ""; var bad = checked && g.c !== c.c; return '<button type="button" class="card-g in' + (bad ? " wrong" : checked ? " right" : "") + '" data-g="' + i + '">' + (bad ? "✗ " : checked ? "✓ " : "") + L(g.t) + "</button>"; }).join("") + "</div>"; }).join("") + "</div>" +
        '<button type="button" class="primary" data-chk>' + L({ en: "Check", fa: "بررسی" }) + '</button><p class="readout" aria-live="polite">' + (checked ? L({ en: "Correct: ", fa: "درست: " }) + n(GOODS.filter(function (g, i) { return place[i] === g.c; }).length) + " / " + n(GOODS.length) + " · " + L({ en: "Public school? Rival seats, so NOT a public good.", fa: "مکتب دولتی؟ چوکی‌ها رقابتی‌اند، پس کالای عمومی نیست." }) : "") + "</p>";
      el.querySelectorAll("[data-g]").forEach(function (b) {
        b.onclick = function (e) { e.stopPropagation(); var i = +b.dataset.g; if (place[i]) { delete place[i]; checked = false; } else sel = sel === i ? null : i; draw(); };
        b.ondragstart = function (e) { e.dataTransfer.setData("text/plain", b.dataset.g); };
      });
      el.querySelectorAll("[data-c]").forEach(function (d) {
        var drop = function (i) { if (i !== null && i !== undefined && !isNaN(i)) { place[i] = d.dataset.c; sel = null; checked = false; draw(); } };
        d.onclick = function () { drop(sel); };
        d.onkeydown = function (e) { if (e.key === "Enter" || e.key === " ") { e.preventDefault(); drop(sel); } };
        d.ondragover = function (e) { e.preventDefault(); }; d.ondrop = function (e) { e.preventDefault(); drop(+e.dataTransfer.getData("text/plain")); };
      });
      el.querySelector("[data-chk]").onclick = function () { checked = true; draw(); };
    }
    draw();
  };

  /* 6. Elasticity calculator (midpoint) */
  Toys.calc = function (el) {
    var v = { p1: 4, p2: 6, q1: 120, q2: 80 };
    function draw() {
      var aq = (v.q1 + v.q2) / 2, ap = (v.p1 + v.p2) / 2, pq = (v.q2 - v.q1) / aq, pp = (v.p2 - v.p1) / ap, e = pq / pp, ok = isFinite(e);
      el.innerHTML = '<div class="inputs">' + [["p1", "P₁"], ["p2", "P₂"], ["q1", "Q₁"], ["q2", "Q₂"]].map(function (k) { return '<label>' + k[1] + ' <input inputmode="decimal" data-k="' + k[0] + '" value="' + v[k[0]] + '"></label>'; }).join("") + "</div>" +
        '<ol class="steps" dir="ltr"><li>avg Q = (' + v.q1 + " + " + v.q2 + ") ÷ 2 = " + C.round(aq) + "</li><li>avg P = (" + v.p1 + " + " + v.p2 + ") ÷ 2 = " + C.round(ap) + "</li><li>%ΔQ = " + C.round(v.q2 - v.q1) + " ÷ " + C.round(aq) + " = " + C.round(pq * 100, 1) + "%</li><li>%ΔP = " + C.round(v.p2 - v.p1) + " ÷ " + C.round(ap) + " = " + C.round(pp * 100, 1) + "%</li><li><strong>E = " + (ok ? C.round(e) : "—") + "</strong></li></ol>" +
        '<p class="readout" aria-live="polite">' + (ok ? "|E| = " + n(C.round(Math.abs(e))) + " → " + L(CLASS[C.classify(e)] || CLASS.elastic) + ". " + L({ en: "Simple % (not midpoint) would say ", fa: "درصد ساده (نه نقطهٔ میانی) می‌گفت " }) + n(C.round(C.simpleE(v.q1, v.q2, v.p1, v.p2))) + L({ en: ". On the exam, midpoint wins.", fa: ". در امتحان، نقطهٔ میانی برنده است." }) : "") + "</p>";
      el.querySelectorAll("input").forEach(function (i) { i.onchange = function () { var x = parseFloat(i.value); if (!isNaN(x)) v[i.dataset.k] = x; draw(); }; });
    }
    draw();
  };
  var CLASS = { "elastic": { en: "elastic (rubber band)", fa: "باکشش (کش لاستیکی)" }, "inelastic": { en: "inelastic (rope)", fa: "کم‌کشش (ریسمان)" }, "unit elastic": { en: "unit elastic", fa: "کشش واحد" }, "perfectly inelastic": { en: "perfectly inelastic", fa: "کاملاً بی‌کشش" }, "perfectly elastic": { en: "perfectly elastic", fa: "کاملاً باکشش" } };

  /* 7. Slide along a straight demand line: P = 10 − Q, with $ = P and units = 10·Q */
  Toys.line = function (el) {
    var q = 2;
    function draw() {
      var p = 10 - q, e = C.linearE(10, 1, q), tr = p * q * 10, pts = [];
      for (var k = 0; k <= 10; k += 0.5) pts.push(X(k) + "," + (214 - (10 - k) * k * 10 / 250 * 190 / 1));
      el.innerHTML = svg(dLine(0) + poly("trbox", [[0, 0], [0, p], [q, p], [q, 0]]) + dot("e1", q, p, 7) +
          txt("lab", 2.5, 9.2, "elastic", "middle") + txt("lab", 8.3, 3.6, "inelastic", "middle") + txt("lab", 5.2, 5.7, "unit", "start"), "demand line") +
        '<label class="wide">' + L({ en: "Slide along the line", fa: "روی خط حرکت کنید" }) + ' <input type="range" min="0.5" max="9.5" step="0.5" value="' + q + '" aria-label="quantity"></label>' +
        '<p class="readout" aria-live="polite">P $' + n(p) + " · Q " + n(q * 10) + " · |E| = " + n(C.round(Math.abs(e))) + " (" + L(CLASS[C.classify(e)]) + ") · TR = $" + n(tr) + (Math.abs(q - 5) < 0.01 ? " ← " + L({ en: "the biggest revenue!", fa: "بیشترین درآمد!" }) : "") + "</p>" +
        '<p class="muted">' + L({ en: "The slope never changes. The elasticity does. The shaded box is total revenue.", fa: "شیب هیچ‌وقت عوض نمی‌شود. کشش عوض می‌شود. مستطیل سایه‌دار درآمد کل است." }) + "</p>";
      var r = el.querySelector("input"); r.oninput = function () { q = +r.value; draw(); el.querySelector("input").focus(); };
    }
    draw();
  };

  /* 8. Total revenue test toggle */
  Toys.tr = function (el) {
    var kind = "inelastic", dir = 1;
    function draw() {
      var p0 = 5, q0 = 5, p1 = p0 + dir, e = kind === "inelastic" ? 0.4 : 2.5;
      var q1 = q0 * (1 - e * dir / p0); var tr0 = p0 * q0 * 10, tr1 = C.round(p1 * q1 * 10, 0);
      var steep = kind === "inelastic" ? 2.5 : 0.4; // slope dP/dQ for drawing
      var line = seg("d", Math.max(0, q0 - 4 / steep), Math.min(10, p0 + 4), Math.min(10, q0 + 4 / steep), Math.max(0, p0 - 4)) + txt("lab d", Math.min(9.4, q0 + 4 / steep), Math.max(0.6, p0 - 4), "D");
      el.innerHTML = '<div class="chips"><button type="button" data-k="inelastic"' + (kind === "inelastic" ? ' aria-pressed="true"' : "") + ">" + L(CLASS.inelastic) + '</button><button type="button" data-k="elastic"' + (kind === "elastic" ? ' aria-pressed="true"' : "") + ">" + L(CLASS.elastic) + '</button></div><div class="chips"><button type="button" data-d="1"' + (dir > 0 ? ' aria-pressed="true"' : "") + ">" + L({ en: "Raise price", fa: "قیمت بالا" }) + '</button><button type="button" data-d="-1"' + (dir < 0 ? ' aria-pressed="true"' : "") + ">" + L({ en: "Lower price", fa: "قیمت پایین" }) + "</button></div>" +
        svg(poly("trbox old", [[0, 0], [0, p0], [q0, p0], [q0, 0]]) + poly("trbox", [[0, 0], [0, p1], [q1, p1], [q1, 0]]) + line + dot("e0", q0, p0, 4) + dot("e1", q1, p1), "total revenue") +
        '<p class="readout" aria-live="polite">TR: $' + n(tr0) + " → $" + n(tr1) + " " + (tr1 > tr0 ? "▲" : "▼") + " · " + (kind === "inelastic" ? L({ en: "Inelastic: price and revenue move IN STEP.", fa: "کم‌کشش: قیمت و درآمد هم‌قدم حرکت می‌کنند." }) : L({ en: "Elastic: revenue ESCAPES the other way.", fa: "باکشش: درآمد به طرف مخالف فرار می‌کند." })) + "</p>";
      el.querySelectorAll("[data-k]").forEach(function (b) { b.onclick = function () { kind = b.dataset.k; draw(); }; });
      el.querySelectorAll("[data-d]").forEach(function (b) { b.onclick = function () { dir = +b.dataset.d; draw(); }; });
    }
    draw();
  };

  /* Which toy belongs to which lesson */
  var TOPIC_TOY = { "c3-demand": "shift", "c3-supply": "shift", "c3-eq": "shift", "c3-shiftmove": "shift", "c3-dshift": "shift", "c3-sshift": "shift", "c3-single": "shift", "c3-double": "double",
    "c4-cs": "painter", "c4-ps": "painter", "c4-eff": "painter", "c4-dwl": "painter", "c5-permits": "permits", "c5-goods": "sort", "c5-public": "sort",
    "c6-ped": "calc", "c6-mid": "calc", "c6-line": "line", "c6-tr": "tr" };

  /* ---------- graph tasks (test mode) ---------- */
  function shiftTask(id, ch, topic, q, want, why) {
    return { id: id, ch: ch, topic: topic, type: "graph", q: q, render: function (el, done) {
      var st = { d: 0, s: 0 };
      function draw() {
        var e = eq(st.d * 2, st.s * 2);
        el.innerHTML = svg(dLine(0, "ghost", "D₁") + sLine(0, "ghost", "S₁") + dLine(st.d * 2, "", "D") + sLine(st.s * 2, "", "S") + dot("e1", e.q, e.p), "graph task") +
          ["d", "s"].map(function (k) { return '<div class="chips"><strong class="' + k + '">' + L(k === "d" ? { en: "Demand", fa: "تقاضا" } : { en: "Supply", fa: "عرضه" }) + '</strong><button type="button" data-k="' + k + '" data-v="-1"' + (st[k] < 0 ? ' aria-pressed="true"' : "") + '>◀</button><button type="button" data-k="' + k + '" data-v="0"' + (st[k] === 0 ? ' aria-pressed="true"' : "") + '>＝</button><button type="button" data-k="' + k + '" data-v="1"' + (st[k] > 0 ? ' aria-pressed="true"' : "") + ">▶</button></div>"; }).join("") +
          '<button type="button" class="primary" data-chk>' + L({ en: "Check", fa: "بررسی" }) + "</button>";
        el.querySelectorAll("[data-k]").forEach(function (b) { b.onclick = function () { st[b.dataset.k] = +b.dataset.v; draw(); }; });
        el.querySelector("[data-chk]").onclick = function () { done(st.d === want.d && st.s === want.s, why); };
      }
      draw();
    } };
  }
  function eqTask(id, q, shift, correct, why) {
    return { id: id, ch: "c3", topic: "c3-single", type: "graph", q: q, render: function (el, done) {
      var e0 = eq(0, 0), cands = { A: eq(shift.d, shift.s), B: eq(-shift.d || shift.s, -shift.s || shift.d), C: { q: e0.q + 1.6, p: e0.p + 1.6 }, D: e0 };
      var pick = null;
      function draw() {
        el.innerHTML = svg(dLine(0, "ghost", "D₁") + sLine(0, "ghost", "S₁") + (shift.d ? dLine(shift.d, "", "D₂") : "") + (shift.s ? sLine(shift.s, "", "S₂") : "") +
          Object.keys(cands).map(function (k) { var c = cands[k]; return '<g class="pt' + (pick === k ? " on" : "") + '" data-p="' + k + '" tabindex="0" role="button" aria-label="point ' + k + '"><circle cx="' + X(c.q) + '" cy="' + Y(c.p) + '" r="14" class="hit"/><circle cx="' + X(c.q) + '" cy="' + Y(c.p) + '" r="5"/><text x="' + (X(c.q) + 9) + '" y="' + (Y(c.p) - 8) + '">' + k + "</text></g>"; }).join(""), "click the new equilibrium") +
          '<button type="button" class="primary" data-chk' + (pick ? "" : " disabled") + ">" + L({ en: "Check", fa: "بررسی" }) + "</button>";
        el.querySelectorAll("[data-p]").forEach(function (g) { var go = function () { pick = g.dataset.p; draw(); }; g.addEventListener("click", go); g.addEventListener("keydown", function (e) { if (e.key === "Enter" || e.key === " ") { e.preventDefault(); go(); } }); });
        el.querySelector("[data-chk]").onclick = function () { done(pick === correct, why); };
      }
      draw();
    } };
  }
  function shadeTask(id, topic, q, scene, brush, why) {
    return { id: id, ch: "c4", topic: topic, type: "graph", q: q, render: function (el, done) { painter(el, scene, function (ok) { done(ok, why); }, brush); } };
  }
  var GRAPHS = [
    shiftTask("g-tacos", "c3", "c3-dshift", { en: "A viral video makes everyone crave tacos. Move the right curve.", fa: "یک ویدیوی وایرال همه را هوس تاکو می‌اندازد. منحنی درست را جابه‌جا کنید." }, { d: 1, s: 0 },
      { en: "Tastes changed, so demand shifts right. Supply stays put. P and Q both rise.", fa: "سلیقه {{tastes}} تغییر کرد، پس تقاضا به راست می‌رود. عرضه سر جایش است. قیمت و مقدار هر دو بالا می‌روند." }),
    shiftTask("g-flood", "c3", "c3-sshift", { en: "A flood wrecks half the coffee farms. Move the right curve.", fa: "سیلاب نیمی از مزرعه‌های قهوه را خراب می‌کند. منحنی درست را جابه‌جا کنید." }, { d: 0, s: -1 },
      { en: "Fewer sellers can produce, so supply shifts left. Price up, quantity down.", fa: "تولید کم‌تر ممکن است، پس عرضه به چپ می‌رود. قیمت بالا، مقدار پایین." }),
    shiftTask("g-solar", "c3", "c3-double", { en: "New tech makes solar panels cheaper to make AND incomes rise (normal good). Move both curves.", fa: "تکنالوژی تازه ساختن پنل آفتابی را ارزان می‌کند و درآمدها هم بالا می‌رود (کالای عادی). هر دو منحنی را جابه‌جا کنید." }, { d: 1, s: 1 },
      { en: "Technology → supply right. Income up for a normal good → demand right. Quantity surely rises; price could go either way.", fa: "تکنالوژی ← عرضه به راست. درآمد بیشتر برای کالای عادی ← تقاضا به راست. مقدار حتماً بالا می‌رود؛ قیمت معلوم نیست." }),
    shiftTask("g-noodle", "c3", "c3-dshift", { en: "Incomes rise. Instant noodles are an inferior good. Move the right curve.", fa: "درآمدها بالا می‌رود. نودل فوری کالای پست {{inferior good}} است. منحنی درست را جابه‌جا کنید." }, { d: -1, s: 0 },
      { en: "Inferior good: richer people buy fewer noodles. Demand shifts LEFT. (Trap 14!)", fa: "کالای پست: مردم پولدارتر نودل کم‌تر می‌خرند. تقاضا به چپ می‌رود. (دام ۱۴!)" }),
    shiftTask("g-ownprice", "c3", "c3-shiftmove", { en: "The price of avocados falls because of a sale. What happens to the avocado curves?", fa: "قیمت آواکادو به خاطر تخفیف پایین می‌آید. منحنی‌های آواکادو چه می‌شوند؟" }, { d: 0, s: 0 },
      { en: "Nothing shifts! Its own price changed, so we slide along the curves. (Trap 1 and 3.)", fa: "هیچ منحنی‌ای جابه‌جا نمی‌شود! قیمت خودِ کالا تغییر کرد، پس روی منحنی حرکت می‌کنیم. (دام ۱ و ۳.)" }),
    eqTask("g-eq1", { en: "Demand has shifted right (D₂). Tap the new equilibrium.", fa: "تقاضا به راست رفته (D₂). تعادل تازه را بزنید." }, { d: 2, s: 0 }, "A",
      { en: "New equilibrium = where D₂ crosses S. Higher price, higher quantity.", fa: "تعادل تازه = جایی که D₂ با S قطع می‌شود. قیمت و مقدار بیشتر." }),
    eqTask("g-eq2", { en: "Supply has shifted left (S₂). Tap the new equilibrium.", fa: "عرضه به چپ رفته (S₂). تعادل تازه را بزنید." }, { d: 0, s: -2 }, "A",
      { en: "Where S₂ crosses D: price up, quantity down.", fa: "جایی که S₂ با D قطع می‌شود: قیمت بالا، مقدار پایین." }),
    shadeTask("g-cs", "c4-cs", { en: "Free market. Paint the consumer surplus.", fa: "بازار آزاد. مازاد مصرف‌کننده {{consumer surplus}} را رنگ کنید." }, "free", "CS",
      { en: "Below demand, above the price: triangle A.", fa: "زیر تقاضا، بالای قیمت: مثلث A." }),
    shadeTask("g-dwl", "c4-dwl", { en: "A price ceiling of $3. Paint the deadweight loss.", fa: "سقف قیمت ۳ دالر. زیان رفاهی {{deadweight loss}} را رنگ کنید." }, "ceiling", "DWL",
      { en: "D + E: the trades between Q = 30 and Q = 50 that never happen. Nobody gets this.", fa: "D + E: معامله‌های بین ۳۰ و ۵۰ که هرگز انجام نمی‌شوند. به هیچ‌کس نمی‌رسد." }),
    shadeTask("g-csceil", "c4-cs", { en: "A price ceiling of $3. Paint the consumer surplus now.", fa: "سقف قیمت ۳ دالر. حالا مازاد مصرف‌کننده را رنگ کنید." }, "ceiling", "CS",
      { en: "A + B + C: under demand, above the $3 price, but only for the 30 units actually sold.", fa: "A + B + C: زیر تقاضا و بالای قیمت ۳ دالر، فقط برای ۳۰ واحدی که واقعاً فروخته می‌شود." })
  ];

  root.Toys = { run: function (name, el) { Toys[name](el); }, names: Object.keys(Toys), forTopic: function (t) { return TOPIC_TOY[t]; }, graphs: GRAPHS, eq: eq, area: area, SCENES: SCENES };
})(this);
