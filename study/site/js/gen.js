/* Numeric problems with generated numbers. Each generator returns a fresh problem:
   { q:{en,fa}, answer:Number, tol, steps:[{en,fa}] }. Units are written into the question. */
(function (root) {
  "use strict";
  var C = root.Core || require("./core.js");
  function ri(r, a, b) { return a + Math.floor(r() * (b - a + 1)); }
  function pick(r, arr) { return arr[Math.floor(r() * arr.length)]; }
  function f(x) { return String(C.round(x, 2)); }
  var GOODS = [["tacos", "تاکو"], ["movie tickets", "تکت سینما"], ["bubble tea", "چای حبابی"], ["phone cases", "قاب موبایل"], ["pizza slices", "قطعه پیتزا"]];

  var G = [
    { id: "gen-mid", ch: "c6", topic: "c6-mid", make: function (r) {
      var g = pick(r, GOODS), p1 = ri(r, 2, 6), p2 = p1 + ri(r, 1, 3), q1 = ri(r, 8, 14) * 10, q2 = q1 - ri(r, 2, 6) * 10;
      var aq = (q1 + q2) / 2, ap = (p1 + p2) / 2, e = C.midpointE(q1, q2, p1, p2);
      return { answer: e, tol: 0.015, abs: true,
        q: { en: "The price of " + g[0] + " rises from $" + p1 + " to $" + p2 + ". People buy " + q2 + " instead of " + q1 + ". Use the midpoint formula. What is the price elasticity of demand? (2 decimals)",
             fa: "قیمت " + g[1] + " از " + p1 + " دالر به " + p2 + " دالر بالا می‌رود. مردم به جای " + q1 + "، " + q2 + " دانه می‌خرند. با فورمول نقطهٔ میانی {{midpoint formula}} کشش قیمتی تقاضا را حساب کنید (دو رقم اعشار)." },
        steps: [
          { en: "Average Q = (" + q1 + " + " + q2 + ") ÷ 2 = " + aq + ". Average P = (" + p1 + " + " + p2 + ") ÷ 2 = " + ap + ".", fa: "میانگین Q = (" + q1 + " + " + q2 + ") ÷ 2 = " + aq + ". میانگین P = (" + p1 + " + " + p2 + ") ÷ 2 = " + ap + "." },
          { en: "%ΔQ = " + (q2 - q1) + " ÷ " + aq + " = " + f((q2 - q1) / aq) + ". %ΔP = " + (p2 - p1) + " ÷ " + ap + " = " + f((p2 - p1) / ap) + ".", fa: "‎%ΔQ = " + (q2 - q1) + " ÷ " + aq + " = " + f((q2 - q1) / aq) + "‎ و ‎%ΔP = " + (p2 - p1) + " ÷ " + ap + " = " + f((p2 - p1) / ap) + "‎." },
          { en: "E = " + f((q2 - q1) / aq) + " ÷ " + f((p2 - p1) / ap) + " = " + f(e) + ". It's negative because price and quantity move opposite ways. |E| = " + f(Math.abs(e)) + ", so demand is " + C.classify(e) + ".",
            fa: "E = " + f(e) + ". منفی است چون قیمت و مقدار خلاف هم حرکت می‌کنند. قدر مطلق آن " + f(Math.abs(e)) + " است؛ پس تقاضا " + FA_CLASS[C.classify(e)] + " است." }
        ] }; } },
    { id: "gen-midq", ch: "c6", topic: "c6-mid", make: function (r) {
      var q1 = ri(r, 4, 9) * 10, q2 = q1 + ri(r, 1, 4) * 10, a = (q1 + q2) / 2, ans = (q2 - q1) / a * 100;
      return { answer: ans, tol: 0.15,
        q: { en: "Quantity goes from " + q1 + " to " + q2 + ". Using the midpoint method, what is the percent change in quantity? (in %, 1 decimal)", fa: "مقدار از " + q1 + " به " + q2 + " می‌رود. با روش نقطهٔ میانی، درصد تغییر مقدار چند است؟ (به درصد، یک رقم اعشار)" },
        steps: [{ en: "Change = " + (q2 - q1) + ". Average = " + a + ".", fa: "تغییر = " + (q2 - q1) + ". میانگین = " + a + "." },
                { en: (q2 - q1) + " ÷ " + a + " × 100 = " + C.round(ans, 1) + "%. (The simple way, ÷ " + q1 + ", would give " + C.round((q2 - q1) / q1 * 100, 1) + "% — MyLab marks that wrong.)", fa: (q2 - q1) + " ÷ " + a + " × 100 = " + C.round(ans, 1) + "٪. (راه ساده، تقسیم بر " + q1 + "، " + C.round((q2 - q1) / q1 * 100, 1) + "٪ می‌دهد — MyLab آن را غلط حساب می‌کند.)" }] }; } },
    { id: "gen-tr", ch: "c6", topic: "c6-tr", make: function (r) {
      var p1 = ri(r, 3, 8), p2 = p1 + ri(r, 1, 2), q1 = ri(r, 10, 20) * 10, q2 = q1 - ri(r, 1, 6) * 10, d = p2 * q2 - p1 * q1;
      return { answer: d,
        q: { en: "A café raises the price of a muffin from $" + p1 + " to $" + p2 + ". Sales fall from " + q1 + " to " + q2 + " a day. By how many dollars does total revenue change? (use − for a fall)", fa: "یک کافه قیمت کیک کوچک را از " + p1 + " به " + p2 + " دالر بالا می‌برد. فروش روزانه از " + q1 + " به " + q2 + " می‌رسد. درآمد کل {{total revenue}} چند دالر تغییر می‌کند؟ (برای کاهش علامت − بگذارید)" },
        steps: [{ en: "Before: " + p1 + " × " + q1 + " = $" + p1 * q1 + ". After: " + p2 + " × " + q2 + " = $" + p2 * q2 + ".", fa: "پیش: " + p1 + " × " + q1 + " = " + p1 * q1 + " دالر. پس: " + p2 + " × " + q2 + " = " + p2 * q2 + " دالر." },
                { en: "Change = " + d + ". Price went up and revenue went " + (d > 0 ? "up: in step, so demand is inelastic here." : d < 0 ? "down: they escaped, so demand is elastic here." : "nowhere: unit elastic."), fa: "تغییر = " + d + ". " + (d > 0 ? "قیمت و درآمد هم‌جهت رفتند: تقاضا کم‌کشش است." : d < 0 ? "قیمت بالا و درآمد پایین: تقاضا باکشش است." : "درآمد تغییر نکرد: کشش واحد.") }] }; } },
    { id: "gen-trnew", ch: "c6", topic: "c6-tr", make: function (r) {
      var p = ri(r, 4, 12), q = ri(r, 5, 15) * 10;
      return { answer: p * q, q: { en: "Concert tickets cost $" + p + " and " + q + " are sold. What is total revenue in dollars?", fa: "تکت کنسرت " + p + " دالر است و " + q + " تکت فروخته می‌شود. درآمد کل چند دالر است؟" },
        steps: [{ en: "TR = P × Q = " + p + " × " + q + " = $" + p * q + ".", fa: "TR = P × Q = " + p + " × " + q + " = " + p * q + " دالر." }] }; } },
    { id: "gen-cs1", ch: "c4", topic: "c4-cs", make: function (r) {
      var w = ri(r, 6, 15), p = ri(r, 2, w - 1);
      return { answer: w - p, q: { en: "You would pay up to $" + w + " for a burrito. It costs $" + p + ". What is your consumer surplus in dollars?", fa: "شما حاضرید تا " + w + " دالر برای یک بوریتو بدهید. قیمتش " + p + " دالر است. مازاد مصرف‌کنندهٔ {{consumer surplus}} شما چند دالر است؟" },
        steps: [{ en: "Willing to pay − actually paid = " + w + " − " + p + " = $" + (w - p) + ". That's your secret savings.", fa: "آمادگی پرداخت − پرداخت واقعی = " + w + " − " + p + " = " + (w - p) + " دالر. این پس‌انداز پنهان شماست." }] }; } },
    { id: "gen-csl", ch: "c4", topic: "c4-cs", make: function (r) {
      var p = ri(r, 4, 7), ws = [p + ri(r, 3, 6), p + ri(r, 1, 3), p, p - ri(r, 1, 2)], cs = ws.reduce(function (s, w) { return s + Math.max(0, w - p); }, 0);
      return { answer: cs, q: { en: "Four friends would pay $" + ws.join(", $") + " for a phone charger. The price is $" + p + ". Total consumer surplus in dollars?", fa: "چهار دوست حاضرند به ترتیب " + ws.join("، ") + " دالر برای یک چارجر بدهند. قیمت " + p + " دالر است. مجموع مازاد مصرف‌کننده چند دالر است؟" },
        steps: [{ en: "Only people whose value is at least the price buy. Their surplus: " + ws.map(function (w) { return Math.max(0, w - p); }).join(" + ") + " = $" + cs + ". The friend at $" + ws[3] + " doesn't buy, so adds 0.", fa: "فقط کسانی می‌خرند که ارزششان دست‌کم برابر قیمت است: " + ws.map(function (w) { return Math.max(0, w - p); }).join(" + ") + " = " + cs + " دالر. دوستی که " + ws[3] + " دالر می‌دهد نمی‌خرد، پس صفر." }] }; } },
    { id: "gen-psl", ch: "c4", topic: "c4-ps", make: function (r) {
      var p = ri(r, 6, 9), ms = [p - ri(r, 3, 5), p - ri(r, 1, 2), p + ri(r, 1, 2)], ps = ms.reduce(function (s, m) { return s + Math.max(0, p - m); }, 0);
      return { answer: ps, q: { en: "Three lemonade stands would sell a cup for at least $" + ms.join(", $") + ". The market price is $" + p + ". Total producer surplus in dollars (one cup each)?", fa: "سه دکهٔ لیموناد دست‌کم " + ms.join("، ") + " دالر برای یک گیلاس می‌خواهند. قیمت بازار " + p + " دالر است. مجموع مازاد تولیدکننده {{producer surplus}} چند دالر است (هر کدام یک گیلاس)؟" },
        steps: [{ en: "Price − lowest acceptable price, for each seller who sells: " + ms.map(function (m) { return Math.max(0, p - m); }).join(" + ") + " = $" + ps + ".", fa: "قیمت − کمترین قیمت قبول، برای هر فروشنده‌ای که می‌فروشد: " + ms.map(function (m) { return Math.max(0, p - m); }).join(" + ") + " = " + ps + " دالر." }] }; } },
    { id: "gen-cstri", ch: "c4", topic: "c4-cs", make: function (r) {
      var a = ri(r, 8, 14) * 2, p = ri(r, 2, a / 2 - 1), q = ri(r, 2, 8) * 10, cs = C.triangle(q, a - p);
      return { answer: cs, q: { en: "Demand hits the price axis at $" + a + ". The market price is $" + p + " and " + q + " units are sold. What is consumer surplus in dollars?", fa: "منحنی تقاضا محور قیمت را در " + a + " دالر قطع می‌کند. قیمت بازار " + p + " دالر است و " + q + " واحد فروخته می‌شود. مازاد مصرف‌کننده چند دالر است؟" },
        steps: [{ en: "It's the triangle below demand and above the price. Base = quantity = " + q + ". Height = " + a + " − " + p + " = " + (a - p) + ".", fa: "مثلث زیر تقاضا و بالای قیمت است. قاعده = مقدار = " + q + ". ارتفاع = " + a + " − " + p + " = " + (a - p) + "." },
                { en: "½ × " + q + " × " + (a - p) + " = $" + cs + ".", fa: "½ × " + q + " × " + (a - p) + " = " + cs + " دالر." }] }; } },
    { id: "gen-dwl", ch: "c4", topic: "c4-dwl", make: function (r) {
      var q1 = ri(r, 8, 15) * 10, q2 = q1 - ri(r, 1, 5) * 10, t = ri(r, 2, 8), d = C.triangle(q1 - q2, t);
      return { answer: d, q: { en: "A $" + t + " tax per unit cuts sales from " + q1 + " to " + q2 + ". What is the deadweight loss in dollars?", fa: "مالیات " + t + " دالری بر هر واحد، فروش را از " + q1 + " به " + q2 + " می‌رساند. زیان رفاهی {{deadweight loss}} چند دالر است؟" },
        steps: [{ en: "Base = lost trades = " + q1 + " − " + q2 + " = " + (q1 - q2) + ". Height = the tax wedge = " + t + ".", fa: "قاعده = معامله‌های ازدست‌رفته = " + (q1 - q2) + ". ارتفاع = فاصلهٔ مالیات = " + t + "." },
                { en: "½ × " + (q1 - q2) + " × " + t + " = $" + d + ". Nobody gets this money. It just vanishes.", fa: "½ × " + (q1 - q2) + " × " + t + " = " + d + " دالر. این پول به هیچ‌کس نمی‌رسد؛ فقط گم می‌شود." }] }; } },
    { id: "gen-cross", ch: "c6", topic: "c6-cross", make: function (r) {
      var dp = ri(r, 2, 5) * 5, dq = ri(r, 1, 6) * 5 * (r() < 0.5 ? 1 : -1), e = dq / dp;
      return { answer: e, tol: 0.015, q: { en: "The price of coffee rises " + dp + "%. Sales of " + (dq > 0 ? "tea" : "coffee filters") + " change by " + dq + "%. What is the cross-price elasticity? (2 decimals, keep the sign)", fa: "قیمت قهوه " + dp + "٪ بالا می‌رود. فروش " + (dq > 0 ? "چای" : "فلتر قهوه") + " " + dq + "٪ تغییر می‌کند. کشش متقاطع قیمت {{cross-price elasticity}} چند است؟ (دو رقم اعشار، با علامت)" },
        steps: [{ en: dq + " ÷ " + dp + " = " + f(e) + ". " + (e > 0 ? "Positive → substitutes." : "Negative → complements."), fa: dq + " ÷ " + dp + " = " + f(e) + ". " + (e > 0 ? "مثبت ← جانشین {{substitutes}}." : "منفی ← مکمل {{complements}}.") }] }; } },
    { id: "gen-income", ch: "c6", topic: "c6-income", make: function (r) {
      var di = ri(r, 2, 5) * 5, dq = ri(r, 1, 8) * 5 * (r() < 0.35 ? -1 : 1), e = dq / di;
      return { answer: e, tol: 0.015, q: { en: "Incomes rise " + di + "%. Purchases of a good change by " + dq + "%. What is the income elasticity? (2 decimals, keep the sign)", fa: "درآمدها " + di + "٪ بالا می‌رود. خرید یک کالا " + dq + "٪ تغییر می‌کند. کشش درآمدی {{income elasticity}} چند است؟ (دو رقم اعشار، با علامت)" },
        steps: [{ en: dq + " ÷ " + di + " = " + f(e) + ". " + (e < 0 ? "Negative → inferior good." : e > 1 ? "Above 1 → normal good, a luxury." : "Between 0 and 1 → normal good, a necessity."), fa: dq + " ÷ " + di + " = " + f(e) + ". " + (e < 0 ? "منفی ← کالای پست {{inferior good}}." : e > 1 ? "بالاتر از ۱ ← کالای عادی، تجملی {{luxury}}." : "بین ۰ و ۱ ← کالای عادی، ضروری {{necessity}}.") }] }; } },
    { id: "gen-eqtable", ch: "c3", topic: "c3-eq", make: function (r) {
      var ps = [2, 3, 4, 5, 6], k = ri(r, 1, 3), base = ri(r, 4, 8) * 10, s = ri(r, 1, 2) * 10, d = ri(r, 1, 2) * 10;
      var qd = ps.map(function (p, i) { return base + d * (k - i); }), qs = ps.map(function (p, i) { return base + s * (i - k); });
      var rows = ps.map(function (p, i) { return "$" + p + " | " + qd[i] + " | " + qs[i]; }).join(" · ");
      return { answer: ps[k], q: { en: "Price | Quantity demanded | Quantity supplied: " + rows + ". What is the equilibrium price in dollars?", fa: "قیمت | مقدار تقاضا | مقدار عرضه: " + rows.replace(/\$/g, "") + ". قیمت تعادلی {{equilibrium price}} چند دالر است؟" },
        steps: [{ en: "Find the row where quantity demanded equals quantity supplied: $" + ps[k] + " (both " + base + ").", fa: "سطری را پیدا کنید که مقدار تقاضا با مقدار عرضه برابر است: " + ps[k] + " دالر (هر دو " + base + ")." }] }; } },
    { id: "gen-shortage", ch: "c3", topic: "c3-eq", make: function (r) {
      var a = ri(r, 10, 14) * 10, b = ri(r, 1, 2) * 10, c = ri(r, 1, 3) * 10, peq = (a - c) / (b + 0), pc = ri(r, 1, 3);
      // Qd = a − b·P, Qs = c + b·P → equilibrium where a − bP = c + bP
      var pe = (a - c) / (2 * b), cap = Math.max(1, Math.floor(pe) - pc), qd = a - b * cap, qs = c + b * cap;
      return { answer: qd - qs, q: { en: "Demand: Qd = " + a + " − " + b + "P. Supply: Qs = " + c + " + " + b + "P. The city sets a price ceiling of $" + cap + ". How big is the shortage (units)?", fa: "تقاضا: ‎Qd = " + a + " − " + b + "P‎. عرضه: ‎Qs = " + c + " + " + b + "P‎. شهر سقف قیمت {{price ceiling}} " + cap + " دالر می‌گذارد. کمبود {{shortage}} چند واحد است؟" },
        steps: [{ en: "At $" + cap + ": Qd = " + a + " − " + b * cap + " = " + qd + ". Qs = " + c + " + " + b * cap + " = " + qs + ".", fa: "در " + cap + " دالر: ‎Qd = " + qd + "‎ و ‎Qs = " + qs + "‎." },
                { en: "Shortage = " + qd + " − " + qs + " = " + (qd - qs) + ". The price is below equilibrium, so buyers want more than sellers offer.", fa: "کمبود = " + qd + " − " + qs + " = " + (qd - qs) + ". قیمت پایین‌تر از تعادل است، پس خریداران بیشتر از عرضه می‌خواهند." }] }; } },
    { id: "gen-permit", ch: "c5", topic: "c5-permits", make: function (r) {
      var x = ri(r, 0, 3), y = ri(r, 0, Math.min(3, 6 - x)), z = 6 - x - y; if (z > 3) { y += z - 3; z = 3; }
      var cost = C.permitCost({ X: x, Y: y, Z: z });
      return { answer: cost, q: { en: "Three firms must cut 6 units of pollution in total. Cleaning costs: X $500, Y $1,000, Z $2,000 per unit. Plan: X cuts " + x + ", Y cuts " + y + ", Z cuts " + z + ". Total cost in dollars?", fa: "سه فابریکه باید روی هم ۶ واحد آلودگی کم کنند. هزینهٔ پاک‌کاری هر واحد: X ۵۰۰، Y ۱۰۰۰، Z ۲۰۰۰ دالر. پلان: X " + x + "، Y " + y + "، Z " + z + " واحد. هزینهٔ کل چند دالر است؟" },
        steps: [{ en: x + "×500 + " + y + "×1,000 + " + z + "×2,000 = $" + cost + ". The cheapest plan (X 3, Y 3, Z 0) costs $4,500.", fa: x + "×500 + " + y + "×1000 + " + z + "×2000 = " + cost + " دالر. ارزان‌ترین پلان (X ۳، Y ۳، Z ۰) ۴۵۰۰ دالر است." }] }; } }
  ];
  var FA_CLASS = { "elastic": "باکشش {{elastic}}", "inelastic": "کم‌کشش {{inelastic}}", "unit elastic": "دارای کشش واحد {{unit elastic}}" };
  G.forEach(function (g) { g.type = "num"; });
  var Gen = { list: G, byId: function (id) { return G.filter(function (g) { return g.id === id; })[0]; } };
  if (typeof module !== "undefined" && module.exports) module.exports = Gen; else root.Gen = Gen;
})(this);
