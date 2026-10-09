// Chapter 6: Elasticity. Schema: study/CONTENT_SCHEMA.md
(function () {
  var S = (window.STUDY = window.STUDY || {});
  function T(en, fa) { return { en: en, fa: fa }; }
  function O(en, fa, wen, wfa, ok) { if (!/[؀-ۿ]/.test(fa)) fa = "عدد " + fa; var o = { t: T(en, fa), why: T(wen, wfa) }; if (ok) o.ok = true; return o; }
  function Q(id, topic, trap, q, opts, alt, hook, sub) {
    var r = { id: id, ch: "c6", topic: topic, q: q, opts: opts, alt: alt, hook: hook, sub: { q: sub[0], a: sub[1] } };
    if (trap) r.trap = trap; return r;
  }

  S.learn = (S.learn || []).concat([
  { id: "c6-ped", ch: "c6",
    title: T("How jumpy are buyers?", "خریداران چقدر حساس هستند؟"),
    big: T("How jumpy buyers are {{price elasticity of demand}} is `%ΔQ ÷ %ΔP`: how much they buy changes when the price changes.",
           "کشش قیمتی تقاضا {{price elasticity of demand}} برابر است با `%ΔQ ÷ %ΔP`: وقتی قیمت تغییر می‌کند، مقدار خرید چقدر تغییر می‌کند."),
    analogy: T("Elastic demand is a rubber band: pull the price a little and the amount bought stretches a lot. Inelastic demand is a rope: pull hard and it barely moves.",
               "تقاضای باکشش مثل رابر است: قیمت را کمی بکشی، مقدار خرید زیاد کش می‌آید. تقاضای بی‌کشش مثل ریسمان است: هر قدر بکشی، تقریباً تکان نمی‌خورد."),
    body: [
      T("We use percents, not slope. So we can compare apples in kilos with cars in units.", "ما از فیصدی استفاده می‌کنیم، نه شیب. پس می‌شود سیب به کیلو را با موتر به دانه مقایسه کرد."),
      T("The number is negative, because price and quantity move opposite ways. Everyone compares the absolute value (drop the minus).", "عدد منفی است، چون قیمت و مقدار برعکس هم حرکت می‌کنند. همه قدر مطلق را مقایسه می‌کنند (منفی را کنار بگذار)."),
      T("|E| > 1 elastic {{elastic}}. |E| < 1 inelastic {{inelastic}}. |E| = 1 unit elastic {{unit elastic}}.", "|E| > 1 باکشش {{elastic}}. |E| < 1 بی‌کشش {{inelastic}}. |E| = 1 کشش واحد {{unit elastic}}."),
      T("Perfectly inelastic = vertical line, E = 0. Perfectly elastic = horizontal line.", "کاملاً بی‌کشش = خط عمودی، E = 0. کاملاً باکشش = خط افقی.")
    ],
    worked: { q: T("Price rises 10%. Quantity bought falls 30%. What is the elasticity? Elastic or inelastic?", "قیمت 10% بالا می‌رود. مقدار خرید 30% پایین می‌آید. کشش چند است؟ باکشش یا بی‌کشش؟"),
      steps: [ T("Formula: `%ΔQ ÷ %ΔP`.", "فورمول: `%ΔQ ÷ %ΔP`."),
               T("`-30% ÷ 10% = -3`.", "حساب: `-30% ÷ 10% = -3`."),
               T("Drop the minus: |E| = 3.", "منفی را کنار بگذار: |E| = 3."),
               T("3 > 1, so demand is elastic. Rubber band!", "3 بزرگتر از 1 است، پس تقاضا باکشش است. رابر!") ] },
    faded: { q: T("Price rises 20%. Quantity falls 5%. Classify demand.", "قیمت 20% بالا می‌رود. مقدار 5% پایین می‌آید. تقاضا را دسته‌بندی کن."),
      steps: [ T("`-5% ÷ 20% = -0.25`.", "حساب: `-5% ÷ 20% = -0.25`."), T("|E| = 0.25.", "حساب: |E| = 0.25.") ],
      blank: T("Last step: what kind of demand?", "قدم آخر: چه نوع تقاضا؟"),
      opts: [ { t: T("0.25 < 1, so inelastic (rope).", "0.25 کمتر از 1 است، پس بی‌کشش (ریسمان)."), ok: true },
              { t: T("It is negative, so elastic.", "منفی است، پس باکشش.") },
              { t: T("0.25 > 0, so unit elastic.", "0.25 بزرگتر از 0 است، پس کشش واحد.") } ] },
    explain: { prompt: T("Explain elasticity to a friend in two sentences.", "کشش را در دو جمله برای یک دوست توضیح بده."),
      model: T("Elasticity tells how much buyers change what they buy when price changes, in percents. Above 1 they react a lot (elastic); below 1 they barely react (inelastic).", "کشش می‌گوید وقتی قیمت تغییر می‌کند، خریداران به فیصدی چقدر خرید خود را تغییر می‌دهند. بالای 1 زیاد واکنش نشان می‌دهند (باکشش)؛ زیر 1 کم (بی‌کشش)."),
      checks: [ T("Says percent change in Q over percent change in P.", "گفته که فیصدی تغییر Q تقسیم بر فیصدی تغییر P است."), T("Uses absolute value and the 1 cutoff.", "از قدر مطلق و مرز 1 استفاده کرده."), T("Names elastic vs inelastic correctly.", "باکشش و بی‌کشش را درست نام برده.") ] },
    joke: T("Elastic buyers are drama queens. Inelastic buyers just sigh and pay.", "خریداران باکشش پر از ناز و ادا هستند. خریداران بی‌کشش فقط آه می‌کشند و پول می‌دهند.") },

  { id: "c6-mid", ch: "c6",
    title: T("The midpoint formula", "فورمول نقطه میانی"),
    big: T("The midpoint formula {{midpoint formula}} divides each change by the average of the two numbers, so up or down gives the same answer.", "فورمول نقطه میانی {{midpoint formula}} هر تغییر را بر اوسط دو عدد تقسیم می‌کند، پس بالا یا پایین رفتن یک جواب می‌دهد."),
    analogy: T("It is like measuring a walk between two houses from the middle of the road. It does not matter which house you start from; the distance is fair both ways.", "مثل این است که فاصلهٔ دو خانه را از وسط سرک اندازه کنی. فرق نمی‌کند از کدام خانه شروع کنی؛ فاصله از هر دو طرف عادلانه است."),
    body: [
      T("Formula: `(ΔQ ÷ average Q) ÷ (ΔP ÷ average P)`.", "فورمول: `(ΔQ ÷ average Q) ÷ (ΔP ÷ average P)`."),
      T("Average = (first + second) ÷ 2.", "اوسط = (اول + دوم) ÷ 2."),
      T("Simple percent: $4 to $5 is +25%, but $5 to $4 is -20%. Not fair! Midpoint fixes that.", "فیصدی ساده: از 4 دالر به 5 دالر +25% است، ولی از 5 به 4 -20%. عادلانه نیست! نقطه میانی این را درست می‌کند."),
      T("If MyLab says midpoint and you skip it, it is marked wrong.", "اگر MyLab بگوید نقطه میانی و تو استفاده نکنی، غلط حساب می‌شود.")
    ],
    worked: { q: T("Price goes from $10 to $12. Quantity goes from 50 to 40. Use the midpoint formula.", "قیمت از 10 دالر به 12 دالر می‌رود. مقدار از 50 به 40 می‌رسد. از فورمول نقطه میانی استفاده کن."),
      steps: [ T("Averages: Q = (50+40)÷2 = 45. P = (10+12)÷2 = 11.", "اوسط‌ها: Q = (50+40)÷2 = 45. P = (10+12)÷2 = 11."),
               T("Changes: ΔQ = 40 − 50 = −10. ΔP = 12 − 10 = 2.", "تغییرات: ΔQ = 40 − 50 = −10. ΔP = 12 − 10 = 2."),
               T("Percents: %ΔQ = −10 ÷ 45 = −22.2%. %ΔP = 2 ÷ 11 = 18.2%.", "فیصدی‌ها: %ΔQ = −10 ÷ 45 = −22.2%. %ΔP = 2 ÷ 11 = 18.2%."),
               T("Divide: −22.2% ÷ 18.2% = −1.22.", "تقسیم: −22.2% ÷ 18.2% = −1.22."),
               T("|E| = 1.22 > 1, so demand is elastic.", "|E| = 1.22 بزرگتر از 1، پس تقاضا باکشش است.") ] },
    faded: { q: T("Price goes from $2 to $3. Quantity goes from 100 to 90. Midpoint formula.", "قیمت از 2 دالر به 3 دالر می‌رود. مقدار از 100 به 90. فورمول نقطه میانی."),
      steps: [ T("Averages: Q = 95, P = 2.5.", "اوسط‌ها: Q = 95، P = 2.5."),
               T("Changes: ΔQ = −10, ΔP = 1.", "تغییرات: ΔQ = −10، ΔP = 1."),
               T("Percents: −10 ÷ 95 = −10.5%. 1 ÷ 2.5 = 40%.", "فیصدی‌ها: −10 ÷ 95 = −10.5%. 1 ÷ 2.5 = 40%.") ],
      blank: T("Last step: divide and classify.", "قدم آخر: تقسیم کن و دسته‌بندی کن."),
      opts: [ { t: T("−10.5% ÷ 40% = −0.26 → inelastic", "−10.5% ÷ 40% = −0.26 → بی‌کشش"), ok: true },
              { t: T("40% ÷ −10.5% = −3.8 → elastic", "40% ÷ −10.5% = −3.8 → باکشش") },
              { t: T("−10.5% ÷ 40% = −0.26 → elastic", "−10.5% ÷ 40% = −0.26 → باکشش") } ] },
    explain: { prompt: T("Why do we use the midpoint formula?", "چرا از فورمول نقطه میانی استفاده می‌کنیم؟"),
      model: T("Because a simple percent gives a different answer going up than going down. Using the averages gives the same answer both ways.", "چون فیصدی ساده در بالا رفتن و پایین آمدن جواب‌های مختلف می‌دهد. با اوسط‌ها، هر دو طرف یک جواب می‌دهد."),
      checks: [ T("Mentions the average of the two values.", "از اوسط دو عدد یاد کرده."), T("Says up and down give the same answer.", "گفته بالا و پایین یک جواب می‌دهد."), T("Q change on top, P change on bottom.", "تغییر Q بالا، تغییر P پایین.") ] },
    joke: T("The midpoint formula is the fair referee. No favorites.", "فورمول نقطه میانی داور عادل است. طرفداری ندارد.") },

  { id: "c6-det", ch: "c6",
    title: T("What makes buyers jumpy?", "چه چیزی خریداران را حساس می‌کند؟"),
    big: T("Demand is more elastic when there are close substitutes, more time, a luxury, a narrow market, or a big share of the budget.", "تقاضا باکشش‌تر است وقتی جانشین نزدیک باشد، وقت بیشتر باشد، کالا لوکس باشد، بازار تنگ تعریف شده باشد، یا سهم بزرگی از بودجه باشد."),
    analogy: T("One brand of cereal is a rubber band: raise its price and people grab the box next to it. Insulin and gas are ropes: people need them, so they keep buying.", "یک برند سیریل مثل رابر است: قیمتش را بالا ببری، مردم قطی پهلویش را می‌گیرند. انسولین و تیل مثل ریسمان هستند: مردم به آن‌ها ضرورت دارند، پس باز هم می‌خرند."),
    body: [
      T("Close substitutes {{availability of close substitutes}}: the most important one.", "جانشین‌های نزدیک {{availability of close substitutes}}: مهم‌ترین عامل."),
      T("Time: in the long run {{long run}} people find other options, so demand gets more elastic.", "وقت: در درازمدت {{long run}} مردم راه دیگری پیدا می‌کنند، پس تقاضا باکشش‌تر می‌شود."),
      T("Luxury vs necessity {{luxury}} {{necessity}}. Narrow market: Coke is elastic, 'drinks' is not.", "لوکس در برابر ضروری {{luxury}} {{necessity}}. بازار تنگ: کوکا باکشش است، «نوشیدنی» نیست."),
      T("Share of budget: a big part of your money makes you more jumpy.", "سهم از بودجه {{share of budget}}: اگر بخش بزرگ پولت باشد، حساس‌تر می‌شوی.")
    ],
    worked: { q: T("Which is more elastic: demand for Toyota cars, or demand for cars in general?", "کدام باکشش‌تر است: تقاضا برای موتر تویوتا، یا تقاضا برای موتر به طور کلی؟"),
      steps: [ T("Toyota has close substitutes: Honda, Ford.", "تویوتا جانشین نزدیک دارد: هوندا، فورد."),
               T("'Cars in general' has few substitutes.", "«موتر به طور کلی» جانشین کم دارد."),
               T("Narrow market = more substitutes = more elastic. Toyota wins.", "بازار تنگ = جانشین بیشتر = باکشش‌تر. تویوتا.") ] },
    faded: { q: T("Gas price jumps. Compare demand next week vs in 5 years.", "قیمت تیل بالا می‌رود. تقاضا در هفتهٔ بعد را با 5 سال بعد مقایسه کن."),
      steps: [ T("Next week: people still drive to work. Little change.", "هفتهٔ بعد: مردم هنوز با موتر به کار می‌روند. تغییر کم."), T("In 5 years: people can buy small cars or move closer.", "در 5 سال: مردم می‌توانند موتر کوچک بخرند یا نزدیکتر خانه بگیرند.") ],
      blank: T("Last step: the conclusion.", "قدم آخر: نتیجه."),
      opts: [ { t: T("Demand is more elastic in the long run.", "تقاضا در درازمدت باکشش‌تر است."), ok: true }, { t: T("Demand is more elastic next week.", "تقاضا در هفتهٔ بعد باکشش‌تر است.") }, { t: T("Time does not matter.", "وقت مهم نیست.") } ] },
    explain: { prompt: T("Name the most important determinant and explain it.", "مهم‌ترین عامل را نام ببر و توضیح بده."),
      model: T("Close substitutes. If there is something just as good, buyers switch when the price rises, so demand is elastic.", "جانشین‌های نزدیک. اگر چیزی به همان خوبی باشد، وقتی قیمت بالا رود خریداران عوض می‌کنند، پس تقاضا باکشش است."),
      checks: [ T("Names close substitutes.", "جانشین‌های نزدیک را نام برده."), T("Says buyers can switch.", "گفته خریداران می‌توانند عوض کنند."), T("Links it to more elastic demand.", "آن را به تقاضای باکشش‌تر ربط داده.") ] } },

  { id: "c6-line", ch: "c6",
    title: T("Elasticity along a straight line", "کشش در طول یک خط مستقیم"),
    big: T("On a straight demand line the slope is the same everywhere, but elasticity changes: elastic at the top, inelastic at the bottom.", "روی خط مستقیم تقاضا شیب همه‌جا یکسان است، ولی کشش تغییر می‌کند: بالا باکشش، پایین بی‌کشش."),
    analogy: T("Losing $1 from a $2 coffee hurts a lot (50%). Losing $1 from a $100 bill barely matters (1%). Same dollar, different percent. That is why elasticity changes along the line.", "1 دالر کم شدن از چای 2 دالری خیلی زیاد است (50%). 1 دالر از 100 دالر تقریباً هیچ است (1%). همان دالر، فیصدی متفاوت. برای همین کشش در طول خط تغییر می‌کند."),
    body: [
      T("Slope {{slope}} is not elasticity. Slope uses units; elasticity uses percents.", "شیب {{slope}} کشش نیست. شیب با واحد است؛ کشش با فیصدی."),
      T("Top-left (high price, low quantity): elastic.", "بالا-چپ (قیمت بلند، مقدار کم): باکشش."),
      T("Bottom-right (low price, high quantity): inelastic.", "پایین-راست (قیمت پایین، مقدار زیاد): بی‌کشش."),
      T("The middle is unit elastic. Total revenue is highest there.", "وسط کشش واحد دارد. عاید کل همان‌جا بیشترین است.")
    ],
    worked: { q: T("Demand line goes from P = $10 (Q = 0) to Q = 100 (P = $0). At P = $8, elastic or inelastic?", "خط تقاضا از P = 10 دالر (Q = 0) تا Q = 100 (P = 0) است. در P = 8 دالر، باکشش یا بی‌کشش؟"),
      steps: [ T("The middle of the line is P = $5.", "وسط خط P = 5 دالر است."), T("$8 is above the middle (top-left part).", "8 دالر بالای وسط است (بخش بالا-چپ)."), T("Top part = elastic.", "بخش بالا = باکشش.") ] },
    faded: { q: T("Same line. At P = $2?", "همان خط. در P = 2 دالر؟"),
      steps: [ T("Middle is $5.", "وسط 5 دالر است."), T("$2 is below the middle.", "2 دالر پایین وسط است.") ],
      blank: T("Last step: classify.", "قدم آخر: دسته‌بندی کن."),
      opts: [ { t: T("Inelastic", "بی‌کشش"), ok: true }, { t: T("Elastic", "باکشش") }, { t: T("Same as at $8, because slope is the same", "مثل 8 دالر، چون شیب یکی است") } ] },
    explain: { prompt: T("Why is elasticity not the same as slope?", "چرا کشش همان شیب نیست؟"),
      model: T("Slope measures changes in units, which stay the same on a straight line. Elasticity measures changes in percents, and the same change is a big percent where numbers are small and a small percent where numbers are big.", "شیب تغییر را به واحد اندازه می‌کند که روی خط مستقیم ثابت است. کشش به فیصدی اندازه می‌کند، و همان تغییر جایی که عدد کوچک است فیصدی بزرگ و جایی که عدد بزرگ است فیصدی کوچک است."),
      checks: [ T("Slope = units, elasticity = percents.", "شیب = واحد، کشش = فیصدی."), T("Top elastic, bottom inelastic.", "بالا باکشش، پایین بی‌کشش."), T("Middle is unit elastic.", "وسط کشش واحد.") ] } },

  { id: "c6-tr", ch: "c6",
    title: T("The total revenue test", "آزمون عاید کل"),
    big: T("Total revenue {{total revenue}} is `TR = P × Q`. If price and TR move together, demand is inelastic. If they move opposite, it is elastic.", "عاید کل {{total revenue}} برابر `TR = P × Q` است. اگر قیمت و TR با هم حرکت کنند، تقاضا بی‌کشش است. اگر برعکس، باکشش."),
    analogy: T("Inelastic is In step: price and revenue march together like soldiers. Elastic Escapes: raise the price and the buyers run away, so revenue falls.", "Inelastic is In step: قیمت و عاید مثل عسکرها با هم قدم می‌زنند. Elastic Escapes: قیمت را بالا ببری، خریداران فرار می‌کنند و عاید پایین می‌آید."),
    body: [
      T("Inelastic: price up → TR up. Price down → TR down.", "بی‌کشش: قیمت بالا ← TR بالا. قیمت پایین ← TR پایین."),
      T("Elastic: price up → TR down. Price down → TR up.", "باکشش: قیمت بالا ← TR پایین. قیمت پایین ← TR بالا."),
      T("Unit elastic: TR does not change.", "کشش واحد: TR تغییر نمی‌کند."),
      T("No profit-maximizing firm prices in the inelastic range. Raising price there brings more revenue AND fewer units to make (lower cost).", "هیچ شرکت حداکثرکنندهٔ مفاد در بخش بی‌کشش قیمت نمی‌گذارد. آنجا بالا بردن قیمت عاید بیشتر و تولید کمتر (مصرف کمتر) می‌آورد.")
    ],
    worked: { q: T("A café raises a sandwich from $4 to $5. Sales fall from 100 to 70. What happens to TR? Classify demand.", "یک کافه قیمت ساندویچ را از 4 دالر به 5 دالر بالا می‌برد. فروش از 100 به 70 می‌رسد. TR چه می‌شود؟ تقاضا را دسته‌بندی کن."),
      steps: [ T("Before: TR = $4 × 100 = $400.", "قبل: TR = 4 × 100 = 400 دالر."), T("After: TR = $5 × 70 = $350.", "بعد: TR = 5 × 70 = 350 دالر."), T("Price went up, TR went down. Opposite directions.", "قیمت بالا رفت، TR پایین آمد. جهت مخالف."), T("Opposite = elastic. The buyers escaped!", "مخالف = باکشش. خریداران فرار کردند!") ] },
    faded: { q: T("Bus fare goes from $2 to $3. Riders fall from 50 to 45.", "کرایهٔ بس از 2 دالر به 3 دالر می‌رود. مسافران از 50 به 45 می‌رسند."),
      steps: [ T("Before: $2 × 50 = $100.", "قبل: 2 × 50 = 100 دالر."), T("After: $3 × 45 = $135.", "بعد: 3 × 45 = 135 دالر."), T("Price up, TR up: same direction.", "قیمت بالا، TR بالا: یک جهت.") ],
      blank: T("Last step: classify.", "قدم آخر: دسته‌بندی کن."),
      opts: [ { t: T("Inelastic (in step)", "بی‌کشش (هم‌قدم)"), ok: true }, { t: T("Elastic", "باکشش") }, { t: T("Unit elastic", "کشش واحد") } ] },
    explain: { prompt: T("Explain the total revenue test.", "آزمون عاید کل را توضیح بده."),
      model: T("Watch price and TR. If they move the same way, demand is inelastic. If they move opposite ways, it is elastic. If TR stays the same, it is unit elastic.", "قیمت و TR را ببین. اگر یک‌طرف حرکت کنند، بی‌کشش. اگر برعکس، باکشش. اگر TR ثابت بماند، کشش واحد."),
      checks: [ T("TR = P × Q.", "حساب: TR = P × Q."), T("Same direction = inelastic; opposite = elastic.", "یک جهت = بی‌کشش؛ مخالف = باکشش."), T("Unit elastic = TR unchanged.", "کشش واحد = TR بدون تغییر.") ] },
    joke: T("Inelastic is In step, Elastic Escapes. Say it twice before the exam.", "Inelastic is In step، Elastic Escapes. پیش از امتحان دو بار بگو.") },

  { id: "c6-cross", ch: "c6",
    title: T("Cross-price elasticity", "کشش متقاطع قیمت"),
    big: T("Cross-price elasticity {{cross-price elasticity of demand}} = %ΔQ of good A ÷ %ΔP of good B. The sign tells how the goods are related.", "کشش متقاطع قیمت {{cross-price elasticity of demand}} = %ΔQ کالای A ÷ %ΔP کالای B. علامت می‌گوید کالاها چه رابطه دارند."),
    analogy: T("Coke and Pepsi are rivals: when Coke gets pricey, Pepsi gets busy (plus). Tea and sugar are partners: when tea gets pricey, sugar gets lonely (minus).", "کوکا و پپسی رقیب هستند: وقتی کوکا گران شود، پپسی پرمشتری می‌شود (مثبت). چای و بوره شریک هستند: وقتی چای گران شود، بوره تنها می‌ماند (منفی)."),
    body: [
      T("Positive (+): substitutes {{substitutes}}.", "مثبت (+): جانشین‌ها {{substitutes}}."),
      T("Negative (−): complements {{complements}}.", "منفی (−): مکمل‌ها {{complements}}."),
      T("About zero: unrelated goods.", "نزدیک صفر: کالاهای بی‌ربط."),
      T("Here the sign matters! Do not drop it.", "اینجا علامت مهم است! آن را کنار نگذار.")
    ],
    worked: { q: T("Coke price rises 10%. Pepsi quantity rises 5%. Find the cross-price elasticity.", "قیمت کوکا 10% بالا می‌رود. مقدار پپسی 5% بالا می‌رود. کشش متقاطع را پیدا کن."),
      steps: [ T("`5% ÷ 10% = +0.5`.", "حساب: `5% ÷ 10% = +0.5`."), T("Positive.", "مثبت."), T("Positive = substitutes.", "مثبت = جانشین.") ] },
    faded: { q: T("Printer price rises 20%. Ink quantity falls 10%.", "قیمت پرنتر 20% بالا می‌رود. مقدار رنگ 10% پایین می‌آید."),
      steps: [ T("`-10% ÷ 20% = -0.5`.", "حساب: `-10% ÷ 20% = -0.5`.") ],
      blank: T("Last step: what is the relationship?", "قدم آخر: رابطه چیست؟"),
      opts: [ { t: T("Negative → complements", "منفی ← مکمل"), ok: true }, { t: T("Negative → substitutes", "منفی ← جانشین") }, { t: T("Negative → inferior good", "منفی ← کالای پست") } ] },
    explain: { prompt: T("How does the sign of cross-price elasticity help you?", "علامت کشش متقاطع چه کمکی می‌کند؟"),
      model: T("A plus sign means substitutes, a minus sign means complements, and near zero means the goods are unrelated.", "علامت مثبت یعنی جانشین، منفی یعنی مکمل، و نزدیک صفر یعنی بی‌ربط."),
      checks: [ T("+ = substitutes.", "+ = جانشین."), T("− = complements.", "− = مکمل."), T("~0 = unrelated.", "~0 = بی‌ربط.") ] } },

  { id: "c6-income", ch: "c6",
    title: T("Income elasticity", "کشش درآمدی"),
    big: T("Income elasticity {{income elasticity of demand}} = %ΔQ ÷ %Δ income. Positive = normal good, negative = inferior good.", "کشش درآمدی {{income elasticity of demand}} = %ΔQ ÷ %Δ درآمد. مثبت = کالای عادی، منفی = کالای پست."),
    analogy: T("Get a raise: you buy more restaurant meals (normal), many more vacations (luxury), and fewer instant noodles (inferior). The noodles get dumped like an old phone.", "معاشت زیاد شود: بیشتر رستورانت می‌روی (عادی)، خیلی بیشتر سفر می‌کنی (لوکس)، و کمتر نودل فوری می‌خوری (پست). نودل مثل یک موبایل کهنه کنار گذاشته می‌شود."),
    body: [
      T("Positive: normal good {{normal good}}.", "مثبت: کالای عادی {{normal good}}."),
      T("Between 0 and 1: necessity {{necessity}}. Above 1: luxury {{luxury}}.", "بین 0 و 1: ضروری {{necessity}}. بالای 1: لوکس {{luxury}}."),
      T("Negative: inferior good {{inferior good}}.", "منفی: کالای پست {{inferior good}}.")
    ],
    worked: { q: T("Income rises 20%. Quantity of cruises rises 30%. Classify.", "درآمد 20% بالا می‌رود. مقدار سفرهای کشتی 30% بالا می‌رود. دسته‌بندی کن."),
      steps: [ T("`30% ÷ 20% = 1.5`.", "حساب: `30% ÷ 20% = 1.5`."), T("Positive → normal.", "مثبت ← عادی."), T("Above 1 → luxury.", "بالای 1 ← لوکس.") ] },
    faded: { q: T("Income rises 10%. Bus rides fall 4%.", "درآمد 10% بالا می‌رود. سفر با بس 4% پایین می‌آید."),
      steps: [ T("`-4% ÷ 10% = -0.4`.", "حساب: `-4% ÷ 10% = -0.4`.") ],
      blank: T("Last step: classify.", "قدم آخر: دسته‌بندی کن."),
      opts: [ { t: T("Negative → inferior good", "منفی ← کالای پست"), ok: true }, { t: T("Negative → complement", "منفی ← مکمل") }, { t: T("Below 1 → necessity", "زیر 1 ← ضروری") } ] },
    explain: { prompt: T("How do you tell a luxury, a necessity, and an inferior good apart?", "چطور کالای لوکس، ضروری و پست را از هم جدا می‌کنی؟"),
      model: T("Look at income elasticity. Above 1 is a luxury. Between 0 and 1 is a necessity. Below 0 is an inferior good.", "به کشش درآمدی نگاه کن. بالای 1 لوکس. بین 0 و 1 ضروری. زیر 0 پست."),
      checks: [ T(">1 luxury.", ">1 لوکس."), T("0 to 1 necessity.", "0 تا 1 ضروری."), T("<0 inferior.", "<0 پست.") ] } },

  { id: "c6-supply", ch: "c6",
    title: T("Price elasticity of supply", "کشش قیمتی عرضه"),
    big: T("Price elasticity of supply {{price elasticity of supply}} = %ΔQs ÷ %ΔP. It is positive, and it is mostly about time.", "کشش قیمتی عرضه {{price elasticity of supply}} = %ΔQs ÷ %ΔP. مثبت است و بیشتر به وقت ربط دارد."),
    analogy: T("Bread price jumps: the bakery bakes more tomorrow (elastic supply). Apple price jumps: the orchard cannot grow more apples this season (inelastic supply).", "قیمت نان بالا می‌رود: نانوایی فردا بیشتر می‌پزد (عرضهٔ باکشش). قیمت سیب بالا می‌رود: باغ این فصل نمی‌تواند سیب بیشتر بار بیاورد (عرضهٔ بی‌کشش)."),
    body: [
      T("Positive: higher price → sellers offer more.", "مثبت: قیمت بلندتر ← فروشندگان بیشتر عرضه می‌کنند."),
      T("More time → more elastic supply.", "وقت بیشتر ← عرضهٔ باکشش‌تر."),
      T("Easy to make more (extra workers, spare machines) → more elastic.", "آسان تولید بیشتر (کارگر اضافی، ماشین آزاد) ← باکشش‌تر.")
    ],
    worked: { q: T("Price of bread rises 10%. Bakeries supply 20% more. Find the elasticity.", "قیمت نان 10% بالا می‌رود. نانوایی‌ها 20% بیشتر عرضه می‌کنند. کشش را پیدا کن."),
      steps: [ T("`20% ÷ 10% = 2`.", "حساب: `20% ÷ 10% = 2`."), T("2 > 1 → elastic supply.", "2 بزرگتر از 1 ← عرضهٔ باکشش.") ] },
    faded: { q: T("Price of apples rises 20%. Orchards supply 4% more this season.", "قیمت سیب 20% بالا می‌رود. باغ‌ها این فصل 4% بیشتر عرضه می‌کنند."),
      steps: [ T("`4% ÷ 20% = 0.2`.", "حساب: `4% ÷ 20% = 0.2`.") ],
      blank: T("Last step: classify.", "قدم آخر: دسته‌بندی کن."),
      opts: [ { t: T("0.2 < 1 → inelastic supply", "0.2 کمتر از 1 ← عرضهٔ بی‌کشش"), ok: true }, { t: T("0.2 > 0 → elastic supply", "0.2 بزرگتر از 0 ← عرضهٔ باکشش") }, { t: T("Positive → inferior", "مثبت ← پست") } ] },
    explain: { prompt: T("Why is supply more elastic in the long run?", "چرا عرضه در درازمدت باکشش‌تر است؟"),
      model: T("With more time, firms can hire workers, build machines, and plant more. So they can raise output a lot when price rises.", "با وقت بیشتر، شرکت‌ها می‌توانند کارگر بگیرند، ماشین بسازند و بیشتر بکارند. پس وقتی قیمت بالا رود، تولید را زیاد بالا می‌برند."),
      checks: [ T("Mentions time.", "از وقت یاد کرده."), T("Says firms can expand production.", "گفته شرکت‌ها تولید را زیاد می‌کنند."), T("Links to bigger response to price.", "به واکنش بزرگتر به قیمت ربط داده.") ] } }
  ]);

  S.questions = (S.questions || []).concat([
  Q("c6-001", "c6-ped", 0, T("What does price elasticity of demand measure?", "کشش قیمتی تقاضا چه چیزی را اندازه می‌کند؟"), [
    O("The slope of the demand curve", "شیب منحنی تقاضا", "Slope uses units. Elasticity uses percents. Close cousins, different people.", "شیب با واحد است. کشش با فیصدی. خویشاوند نزدیک، ولی دو آدم جدا."),
    O("How much quantity demanded responds to a price change, in percents", "مقدار تقاضا به فیصدی چقدر به تغییر قیمت واکنش نشان می‌دهد", "Yes: `%ΔQ ÷ %ΔP`. How jumpy buyers are.", "بلی: `%ΔQ ÷ %ΔP`. خریداران چقدر حساس هستند.", true),
    O("How much the demand curve shifts when income changes", "منحنی تقاضا با تغییر درآمد چقدر جابجا می‌شود", "That is income elasticity's job. Wrong office!", "این کار کشش درآمدی است. دفتر اشتباه!"),
    O("How much sellers change output when price changes", "فروشندگان با تغییر قیمت چقدر تولید را تغییر می‌دهند", "That is supply elasticity. The bakery, not the shopper.", "این کشش عرضه است. نانوایی، نه خریدار.")],
    T("Like a smoke alarm's sensitivity: how loud it beeps for a little smoke.", "مثل حساسیت آلارم دود: برای کمی دود چقدر صدا می‌کند."),
    T("Elasticity = % reaction to % poke.", "کشش = فیصدی واکنش به فیصدی تکان."),
    [T("Is elasticity measured in percents or in units?", "کشش با فیصدی اندازه می‌شود یا با واحد؟"), T("Percents.", "فیصدی.")]),

  Q("c6-002", "c6-ped", 6, T("Price elasticity of demand for movie tickets is −2.5. Demand is:", "کشش قیمتی تقاضا برای تکت سینما −2.5 است. تقاضا:"), [
    O("Inelastic, because the number is negative", "بی‌کشش، چون عدد منفی است", "The minus is just the law of demand saying hi. Drop it: 2.5.", "منفی فقط قانون تقاضاست که سلام می‌کند. کنارش بگذار: 2.5."),
    O("Unit elastic", "کشش واحد", "Unit means exactly 1. This is 2.5, way more dramatic.", "واحد یعنی دقیقاً 1. این 2.5 است، خیلی پر ادا تر."),
    O("Elastic, because |−2.5| = 2.5 > 1", "باکشش، چون |−2.5| = 2.5 > 1", "Right. Compare the absolute value with 1.", "درست. قدر مطلق را با 1 مقایسه کن.", true)],
    T("A thermometer reading −30 is colder than −5: the size tells the story, not the minus.", "دماسنج −30 سردتر از −5 است: اندازه داستان را می‌گوید، نه منفی."),
    T("Drop the minus, then compare with 1.", "منفی را بینداز، بعد با 1 مقایسه کن."),
    [T("What is |−2.5|?", "|−2.5| چند است؟"), T("2.5", "جواب: 2.5")]),

  Q("c6-003", "c6-ped", 6, T("Good A has elasticity −0.3. Good B has −2. Which demand is more elastic?", "کالای A کشش −0.3 دارد. کالای B −2. کدام تقاضا باکشش‌تر است؟"), [
    O("Good B", "کالای B", "Yes: |−2| = 2 is bigger than 0.3. B's buyers are the drama queens.", "بلی: |−2| = 2 از 0.3 بزرگتر است. خریداران B پر ادا هستند.", true),
    O("Good A, because −0.3 is the bigger number", "کالای A، چون −0.3 عدد بزرگتر است", "On a number line, yes. In elasticity land we use the size. Nice try!", "روی خط اعداد، بلی. ولی در کشش اندازه را می‌بینیم. خوب کوشش کردی!"),
    O("They are the same; both are negative", "هر دو یکی هستند؛ هر دو منفی‌اند", "All demand elasticities are negative. That does not make them twins.", "همهٔ کشش‌های تقاضا منفی‌اند. این آن‌ها را دوگانگی نمی‌سازد.")],
    T("Two dogs: one barks at a 2 out of 10, one at 0.3. The 2 dog is jumpier.", "دو سگ: یکی با شدت 2 عو می‌کند، یکی با 0.3. سگ 2 حساس‌تر است."),
    T("Bigger size, more jumpy.", "اندازهٔ بزرگتر، حساس‌تر."),
    [T("Which is bigger: 0.3 or 2?", "کدام بزرگتر است: 0.3 یا 2؟"), T("2", "جواب: 2")]),

  Q("c6-004", "c6-ped", 0, T("A perfectly inelastic demand curve looks like:", "منحنی تقاضای کاملاً بی‌کشش چه شکلی است؟"), [
    O("A horizontal line", "یک خط افقی", "Flat is perfectly elastic: the total opposite. Rubber band on max stretch.", "افقی کاملاً باکشش است: درست برعکس. رابر در نهایت کشش."),
    O("A vertical line (E = 0)", "یک خط عمودی (E = 0)", "Yes. Price changes, quantity stays put. A rope of steel.", "بلی. قیمت تغییر می‌کند، مقدار ثابت می‌ماند. ریسمان فولادی.", true),
    O("A straight line sloping down", "یک خط مستقیم رو به پایین", "That is a normal demand line. Its elasticity changes along it.", "این خط عادی تقاضاست. کشش آن در طولش تغییر می‌کند."),
    O("An upward-sloping line", "یک خط رو به بالا", "Upward is a supply look. Demand does not climb hills.", "رو به بالا شکل عرضه است. تقاضا از کوه بالا نمی‌رود.")],
    T("A wall that does not move no matter how hard you push.", "دیواری که هر قدر فشار بدهی تکان نمی‌خورد."),
    T("Vertical = Very stuck.", "عمودی = کاملاً گیر."),
    [T("If quantity never changes, what is %ΔQ?", "اگر مقدار هیچ تغییر نکند، %ΔQ چند است؟"), T("0, so E = 0.", "0، پس E = 0.")]),

  Q("c6-005", "c6-ped", 0, T("Price rises 8% and quantity demanded falls 8%. Demand is:", "قیمت 8% بالا می‌رود و مقدار تقاضا 8% پایین می‌آید. تقاضا:"), [
    O("Elastic", "باکشش", "Elastic needs more than 1. Here it is exactly 1.", "باکشش باید بیشتر از 1 باشد. اینجا دقیقاً 1 است."),
    O("Inelastic", "بی‌کشش", "Inelastic needs less than 1. Here it is exactly 1.", "بی‌کشش باید کمتر از 1 باشد. اینجا دقیقاً 1 است."),
    O("Unit elastic", "کشش واحد", "Yes: `-8% ÷ 8% = -1`, so |E| = 1.", "بلی: `-8% ÷ 8% = -1`، پس |E| = 1.", true)],
    T("A perfectly balanced seesaw.", "یک الاکلنگ کاملاً متوازن."),
    T("Same percent both ways = 1.", "یک فیصدی در هر دو طرف = 1."),
    [T("What is 8 ÷ 8?", "8 ÷ 8 چند است؟"), T("1", "جواب: 1")]),

  Q("c6-006", "c6-mid", 8, T("Price rises from $4 to $6. Quantity falls from 120 to 80. Using the midpoint formula, |E| =", "قیمت از 4 دالر به 6 دالر بالا می‌رود. مقدار از 120 به 80 پایین می‌آید. با فورمول نقطه میانی، |E| ="), [
    O("0.67", "0.67", "That is the simple-percent answer (33% ÷ 50%). MyLab will mark it wrong.", "این جواب فیصدی ساده است (33% ÷ 50%). MyLab غلط حساب می‌کند."),
    O("1.0", "1.0", "Yes. ΔQ = −40, avg Q = 100 → −40%. ΔP = 2, avg P = 5 → 40%. 40 ÷ 40 = 1.", "بلی. ΔQ = −40، اوسط Q = 100 ← −40%. ΔP = 2، اوسط P = 5 ← 40%. 40 ÷ 40 = 1.", true),
    O("1.5", "1.5", "You flipped it (simple percents: 50% ÷ 33%) and skipped the midpoint. Q goes on top.", "سرچپه تقسیم کردی (فیصدی ساده: 50% ÷ 33%) و از نقطهٔ وسط استفاده نکردی. Q بالا می‌رود."),
    O("20", "20", "That is ΔQ ÷ ΔP in units (40 ÷ 2). Slope stuff, not percents.", "این ΔQ ÷ ΔP به واحد است (40 ÷ 2). کار شیب، نه فیصدی.")],
    T("Like splitting a taxi fare: you use the middle point so nobody pays extra.", "مثل تقسیم کرایهٔ تکسی: نقطهٔ وسط را می‌گیری تا کسی اضافه نپردازد."),
    T("Midpoint: divide by the AVERAGE, not the start.", "نقطه میانی: بر اوسط تقسیم کن، نه بر شروع."),
    [T("What is the average of 120 and 80?", "اوسط 120 و 80 چند است؟"), T("100", "جواب: 100")]),

  Q("c6-007", "c6-mid", 8, T("Price goes from $9 to $11. Quantity goes from 50 to 30. Midpoint elasticity (absolute value)?", "قیمت از 9 دالر به 11 دالر می‌رود. مقدار از 50 به 30. کشش نقطه میانی (قدر مطلق)؟"), [
    O("1.8", "1.8", "Simple percents (40% ÷ 22.2%). Close, but MyLab is strict.", "فیصدی ساده (40% ÷ 22.2%). نزدیک، ولی MyLab سخت‌گیر است."),
    O("0.4", "0.4", "You flipped it: price on top. Quantity always goes on top.", "سرچپه کردی: قیمت بالا. مقدار همیشه بالا است."),
    O("2.5", "2.5", "Yes. −20 ÷ 40 = −50%. 2 ÷ 10 = 20%. 50 ÷ 20 = 2.5. Elastic!", "بلی. −20 ÷ 40 = −50%. 2 ÷ 10 = 20%. 50 ÷ 20 = 2.5. باکشش!", true)],
    T("Measuring a rope from its middle knot, not from one end.", "اندازه کردن ریسمان از گره وسطش، نه از یک سر."),
    T("Average Q, average P, then divide.", "اوسط Q، اوسط P، بعد تقسیم."),
    [T("Average of $9 and $11?", "اوسط 9 و 11 دالر؟"), T("$10", "10 دالر")]),

  Q("c6-008", "c6-mid", 0, T("Price goes from $1 to $3. Quantity goes from 100 to 90. Midpoint elasticity is about 0.11. Demand is:", "قیمت از 1 دالر به 3 دالر می‌رود. مقدار از 100 به 90. کشش نقطه میانی حدود 0.11 است. تقاضا:"), [
    O("Inelastic", "بی‌کشش", "Yes: 10 ÷ 95 = 10.5%; 2 ÷ 2 = 100%; 0.105 < 1. A rope.", "بلی: 10 ÷ 95 = 10.5%؛ 2 ÷ 2 = 100%؛ 0.105 < 1. ریسمان.", true),
    O("Elastic", "باکشش", "Price tripled and buyers barely blinked. Not a rubber band.", "قیمت سه برابر شد و خریداران تقریباً پلک هم نزدند. رابر نیست."),
    O("Perfectly elastic", "کاملاً باکشش", "Perfectly elastic is a flat line. Here buyers barely care.", "کاملاً باکشش خط افقی است. اینجا خریداران زیاد پروا ندارند.")],
    T("Like salt: triple the price and you still buy about the same.", "مثل نمک: قیمت را سه برابر کنی، باز تقریباً همان‌قدر می‌خری."),
    T("Under 1 = rope.", "زیر 1 = ریسمان."),
    [T("Is 0.11 bigger or smaller than 1?", "0.11 بزرگتر است یا کوچکتر از 1؟"), T("Smaller.", "کوچکتر.")]),

  Q("c6-009", "c6-mid", 8, T("Price rises from $10 to $12. Using the midpoint method, the percent change in price is:", "قیمت از 10 دالر به 12 دالر می‌رود. با روش نقطه میانی، فیصدی تغییر قیمت چند است؟"), [
    O("20%", "20%", "That divides by the starting price. Midpoint divides by the average, 11.", "این بر قیمت شروع تقسیم می‌کند. نقطه میانی بر اوسط، 11، تقسیم می‌کند."),
    O("16.7%", "16.7%", "That divides by the end price, 12. The midpoint sits in the middle.", "این بر قیمت آخر، 12، تقسیم می‌کند. نقطه میانی در وسط است."),
    O("18.2%", "18.2%", "Yes: 2 ÷ 11 = 18.2%.", "بلی: 2 ÷ 11 = 18.2%.", true),
    O("2%", "2%", "That is $2, not 2%. Dollars dressed up as percents.", "این 2 دالر است، نه 2%. دالر که لباس فیصدی پوشیده.")],
    T("Like finding the middle seat between two friends before measuring the distance.", "مثل پیدا کردن چوکی وسط بین دو دوست پیش از اندازه کردن فاصله."),
    T("Change ÷ average.", "تغییر ÷ اوسط."),
    [T("Average of 10 and 12?", "اوسط 10 و 12؟"), T("11", "جواب: 11")]),

  Q("c6-010", "c6-mid", 0, T("Why use the midpoint formula?", "چرا از فورمول نقطه میانی استفاده می‌کنیم؟"), [
    O("It always gives a bigger number", "همیشه عدد بزرگتر می‌دهد", "It is not trying to win a contest. It is trying to be fair.", "دنبال برنده شدن در مسابقه نیست. دنبال عادلانه بودن است."),
    O("It gives the same answer whether price rises or falls", "چه قیمت بالا رود چه پایین، یک جواب می‌دهد", "Yes. Same two points, same answer, either direction.", "بلی. همان دو نقطه، همان جواب، از هر طرف.", true),
    O("It makes elasticity positive", "کشش را مثبت می‌کند", "No, the minus is still there. We drop it ourselves.", "نه، منفی هنوز هست. خودمان آن را کنار می‌گذاریم."),
    O("It measures the slope", "شیب را اندازه می‌کند", "Still percents, not slope. Slope is the other kid.", "هنوز فیصدی است، نه شیب. شیب بچهٔ دیگر است.")],
    T("A round trip from Kabul to Mazar is the same distance both ways. Midpoint makes elasticity behave the same way.", "سفر از کابل به مزار از هر دو طرف یک فاصله است. نقطه میانی کشش را همین‌طور می‌سازد."),
    T("Midpoint = same answer up or down.", "نقطه میانی = بالا یا پایین یک جواب."),
    [T("$4 → $5 simple % is 25%. $5 → $4 simple % is?", "4 ← 5 دالر فیصدی ساده 25% است. 5 ← 4 چند است؟"), T("20%. Different! That is the problem.", "20%. فرق دارد! مشکل همین است.")]),

  Q("c6-011", "c6-det", 0, T("Which is the MOST important determinant of price elasticity of demand?", "مهم‌ترین عامل کشش قیمتی تقاضا کدام است؟"), [
    O("The color of the product", "رنگ محصول", "Pretty, but buyers do not run away over color.", "زیباست، ولی خریداران به خاطر رنگ فرار نمی‌کنند."),
    O("Availability of close substitutes", "موجودیت جانشین‌های نزدیک", "Yes. If there is something just as good next door, buyers switch.", "بلی. اگر چیزی به همان خوبی پهلویش باشد، خریداران عوض می‌کنند.", true),
    O("The number of sellers' employees", "تعداد کارمندان فروشنده", "Buyers do not count staff before shopping.", "خریداران پیش از خرید کارمندان را نمی‌شمارند.")],
    T("If your bus is late but a taxi waits right there, you switch fast. No taxi? You wait.", "اگر بس دیر کند و تکسی همان‌جا باشد، زود عوض می‌کنی. تکسی نباشد؟ صبر می‌کنی."),
    T("More substitutes, more jumpy.", "جانشین بیشتر، حساس‌تر."),
    [T("Pepsi is a substitute for which drink?", "پپسی جانشین کدام نوشیدنی است؟"), T("Coke.", "کوکا.")]),

  Q("c6-012", "c6-det", 0, T("Which has the MORE elastic demand?", "تقاضای کدام باکشش‌تر است؟"), [
    O("Drinks in general", "نوشیدنی به طور کلی", "There is no substitute for 'all drinks', except thirst. Rope.", "برای «همهٔ نوشیدنی‌ها» جانشین نیست، به جز تشنگی. ریسمان."),
    O("Coke", "کوکا", "Yes. A narrow market has many substitutes (Pepsi, juice).", "بلی. بازار تنگ جانشین زیاد دارد (پپسی، جوس).", true),
    O("They are equally elastic", "هر دو یکسان باکشش‌اند", "How narrowly you define the market changes everything.", "تنگ یا فراخ تعریف کردن بازار همه چیز را تغییر می‌دهد.")],
    T("Leaving one restaurant is easy; leaving food is impossible.", "ترک یک رستورانت آسان است؛ ترک غذا ناممکن."),
    T("Narrow market = rubber band.", "بازار تنگ = رابر."),
    [T("Is 'Coke' a narrow or broad market?", "«کوکا» بازار تنگ است یا فراخ؟"), T("Narrow.", "تنگ.")]),

  Q("c6-013", "c6-det", 0, T("Gasoline prices rise and stay high. Demand for gas is:", "قیمت تیل بالا می‌رود و بالا می‌ماند. تقاضا برای تیل:"), [
    O("More elastic in the long run than in the short run", "در درازمدت باکشش‌تر از کوتاه‌مدت است", "Yes. With time, people buy smaller cars or move closer to work.", "بلی. با وقت، مردم موتر کوچکتر می‌خرند یا نزدیک کار خانه می‌گیرند.", true),
    O("More elastic in the short run", "در کوتاه‌مدت باکشش‌تر است", "Tomorrow you still need to drive to work. Short run is the rope.", "فردا هنوز باید با موتر به کار بروی. کوتاه‌مدت ریسمان است."),
    O("The same in the short and long run", "در کوتاه‌مدت و درازمدت یکسان است", "Time is a determinant. It always gets a vote.", "وقت یک عامل است. همیشه رأی دارد.")],
    T("New shoes feel stiff at first and loosen with time. Demand does too.", "بوت نو اول سخت است و با وقت نرم می‌شود. تقاضا هم همین‌طور."),
    T("More time, more stretch.", "وقت بیشتر، کشش بیشتر."),
    [T("Can you buy a new car by tomorrow morning?", "آیا تا فردا صبح موتر نو می‌خری؟"), T("Usually not. That takes time.", "معمولاً نه. وقت می‌گیرد.")]),

  Q("c6-014", "c6-det", 0, T("Which good most likely has inelastic demand?", "کدام کالا به احتمال زیاد تقاضای بی‌کشش دارد؟"), [
    O("One brand of breakfast cereal", "یک برند سیریل صبحانه", "So many boxes on the shelf! That is a rubber band.", "این همه قطی در قفسه! این رابر است."),
    O("A luxury cruise", "یک سفر لوکس با کشتی", "Luxuries are easy to skip. Elastic.", "از لوکس‌ها آسان می‌شود گذشت. باکشش."),
    O("Insulin", "انسولین", "Yes. A necessity with no close substitute. Rope.", "بلی. ضروری و بدون جانشین نزدیک. ریسمان.", true),
    O("A red sweater from one store", "یک جاکت سرخ از یک دکان", "Other stores, other sweaters. Very stretchy.", "دکان‌های دیگر، جاکت‌های دیگر. خیلی باکشش.")],
    T("Like water in the desert: you pay whatever it costs.", "مثل آب در دشت: هر قیمتی باشد می‌پردازی."),
    T("Need it + no substitute = rope.", "ضرورت + بدون جانشین = ریسمان."),
    [T("Is insulin a luxury or a necessity?", "انسولین لوکس است یا ضروری؟"), T("A necessity.", "ضروری.")]),

  Q("c6-015", "c6-det", 0, T("Salt is a tiny share of a family's budget. So demand for salt is likely:", "نمک سهم خیلی کوچک بودجهٔ خانواده است. پس تقاضا برای نمک احتمالاً:"), [
    O("Elastic", "باکشش", "Nobody redoes the family budget over a 10-cent salt rise.", "هیچ‌کس برای 10 سنت گرانی نمک بودجهٔ خانه را دوباره حساب نمی‌کند."),
    O("Inelastic", "بی‌کشش", "Yes. A small share of the budget means people barely notice.", "بلی. سهم کوچک بودجه یعنی مردم تقریباً متوجه نمی‌شوند.", true),
    O("Perfectly elastic", "کاملاً باکشش", "That would mean any price rise kills all sales. Salt is not that fragile.", "یعنی هر گرانی همهٔ فروش را می‌کشد. نمک این‌قدر نازک نیست.")],
    T("A mosquito bite vs a broken leg: small costs you ignore, big ones you react to.", "نیش پشه در برابر پای شکسته: هزینهٔ کوچک را نادیده می‌گیری، بزرگ را نه."),
    T("Tiny share, tiny reaction.", "سهم کوچک، واکنش کوچک."),
    [T("Rent or salt: which takes more of your budget?", "کرایهٔ خانه یا نمک: کدام بیشتر بودجه را می‌گیرد؟"), T("Rent.", "کرایهٔ خانه.")]),

  Q("c6-016", "c6-line", 5, T("A demand curve is a straight line. Which is true?", "منحنی تقاضا یک خط مستقیم است. کدام درست است؟"), [
    O("Elasticity is the same everywhere because the slope is the same", "کشش همه‌جا یکسان است چون شیب یکسان است", "Classic trap! Slope stays, percents change. Elasticity is not slope.", "دام معروف! شیب ثابت می‌ماند، فیصدی‌ها تغییر می‌کنند. کشش شیب نیست."),
    O("Slope is constant, but elasticity changes along the line", "شیب ثابت است، ولی کشش در طول خط تغییر می‌کند", "Yes. Same step size, different percents.", "بلی. همان اندازهٔ قدم، فیصدی‌های متفاوت.", true),
    O("Both slope and elasticity change along the line", "هم شیب و هم کشش در طول خط تغییر می‌کنند", "A straight line has one slope. That is what straight means.", "خط مستقیم یک شیب دارد. معنای مستقیم همین است.")],
    T("A $1 raise means a lot to a kid with $2 and little to a boss with $1000.", "1 دالر اضافه برای طفلی که 2 دالر دارد زیاد است و برای رئیسی که 1000 دارد کم."),
    T("Slope ≠ elasticity.", "شیب ≠ کشش."),
    [T("Does a straight line have one slope or many?", "خط مستقیم یک شیب دارد یا چند؟"), T("One.", "یک.")]),

  Q("c6-017", "c6-line", 5, T("On a straight-line demand curve, where is demand elastic?", "روی منحنی تقاضای خط مستقیم، تقاضا کجا باکشش است؟"), [
    O("At the bottom-right (low price, high quantity)", "پایین-راست (قیمت پایین، مقدار زیاد)", "Down there buyers are already happy. That part is the rope.", "آنجا خریداران خوش هستند. آن بخش ریسمان است."),
    O("Nowhere; the slope is too steep", "هیچ‌جا؛ شیب خیلی تند است", "Steepness alone does not decide elasticity. Percents do.", "تندی تنها کشش را تعیین نمی‌کند. فیصدی‌ها تعیین می‌کنند."),
    O("At the top-left (high price, low quantity)", "بالا-چپ (قیمت بلند، مقدار کم)", "Yes. Small Q means each change is a big percent.", "بلی. Q کوچک یعنی هر تغییر فیصدی بزرگ است.", true)],
    T("When you only have a few apples, losing one is a big deal.", "وقتی فقط چند سیب داری، از دست دادن یکی مهم است."),
    T("High price, high drama.", "قیمت بلند، ادای بلند."),
    [T("At the top of the line, is Q small or big?", "در بالای خط، Q کوچک است یا بزرگ؟"), T("Small.", "کوچک.")]),

  Q("c6-018", "c6-line", 7, T("On a straight-line demand curve, total revenue is at its maximum where demand is:", "روی منحنی تقاضای خط مستقیم، عاید کل در کجا بیشترین است؟"), [
    O("Unit elastic (the middle)", "کشش واحد (وسط)", "Yes. At the middle, TR peaks.", "بلی. در وسط، TR به اوج می‌رسد.", true),
    O("Perfectly elastic (the top)", "کاملاً باکشش (بالا)", "At the very top Q is zero, so TR is zero. Empty shop!", "در بالاترین نقطه Q صفر است، پس TR صفر است. دکان خالی!"),
    O("Most inelastic (the bottom)", "بیشترین بی‌کشش (پایین)", "At the bottom price is near zero, so TR is near zero. Giving it away!", "در پایین قیمت نزدیک صفر است، پس TR نزدیک صفر. مفت می‌دهی!")],
    T("Like a hill path: you climb, reach the top, then walk down. The top is the middle.", "مثل راه کوه: بالا می‌روی، به قله می‌رسی، بعد پایین. قله در وسط است."),
    T("Revenue peaks at unit.", "عاید در کشش واحد به اوج می‌رسد."),
    [T("If Q = 0, what is TR?", "اگر Q = 0 باشد، TR چند است؟"), T("0", "جواب: 0")]),

  Q("c6-019", "c6-line", 5, T("A demand line runs from P = $10 (Q = 0) to Q = 100 (P = $0). At P = $8, demand is:", "خط تقاضا از P = 10 دالر (Q = 0) تا Q = 100 (P = 0) است. در P = 8 دالر، تقاضا:"), [
    O("Inelastic, because the line is the same everywhere", "بی‌کشش، چون خط همه‌جا یکسان است", "Same slope, yes. Same elasticity, no. Sneaky trap!", "شیب یکسان، بلی. کشش یکسان، نه. دام زیرکانه!"),
    O("Elastic, because $8 is above the midpoint of $5", "باکشش، چون 8 دالر بالای وسط (5 دالر) است", "Yes. Above the middle = elastic. (Exact value: |E| = 4.)", "بلی. بالای وسط = باکشش. (عدد دقیق: |E| = 4.)", true),
    O("Unit elastic", "کشش واحد", "Unit is at the middle, $5. We are at $8.", "کشش واحد در وسط است، 5 دالر. ما در 8 هستیم.")],
    T("A ladder: the top rungs are the scary, jumpy part.", "مثل زینه: پله‌های بالا ترسناک و حساس هستند."),
    T("Above middle = elastic.", "بالای وسط = باکشش."),
    [T("What is the middle price between $10 and $0?", "قیمت وسط بین 10 و 0 دالر چند است؟"), T("$5", "5 دالر")]),

  Q("c6-020", "c6-tr", 7, T("A store cuts price from $10 to $8. Sales rise from 20 to 30. Total revenue ___ and demand is ___.", "یک دکان قیمت را از 10 به 8 دالر کم می‌کند. فروش از 20 به 30 بالا می‌رود. عاید کل ___ و تقاضا ___ است."), [
    O("falls; inelastic", "پایین می‌آید؛ بی‌کشش", "Check the math: $200 → $240. It went up!", "حساب را ببین: 200 ← 240 دالر. بالا رفت!"),
    O("rises; elastic", "بالا می‌رود؛ باکشش", "Yes. $10×20 = $200 → $8×30 = $240. Price down, TR up: opposite = elastic.", "بلی. 10×20 = 200 ← 8×30 = 240. قیمت پایین، TR بالا: مخالف = باکشش.", true),
    O("rises; inelastic", "بالا می‌رود؛ بی‌کشش", "Right TR, wrong label. Opposite directions mean Elastic Escapes.", "TR درست، نام غلط. جهت مخالف یعنی Elastic Escapes."),
    O("stays the same; unit elastic", "ثابت می‌ماند؛ کشش واحد", "$200 and $240 are not twins.", "200 و 240 دالر دوگانگی نیستند.")],
    T("A sale at the bazaar: lower prices, crowds rush in, the shopkeeper earns more.", "تخفیف در بازار: قیمت پایین، مردم هجوم می‌آورند، دکاندار بیشتر کمائی می‌کند."),
    T("Opposite = Elastic Escapes.", "مخالف = Elastic Escapes."),
    [T("What is $8 × 30?", "8 × 30 چند است؟"), T("$240", "240 دالر")]),

  Q("c6-021", "c6-tr", 0, T("A gym raises its fee from $6 to $8. Members fall from 100 to 90. What happens to total revenue?", "یک جمنازیوم فیس را از 6 به 8 دالر بالا می‌برد. اعضا از 100 به 90 می‌رسند. عاید کل چه می‌شود؟"), [
    O("Falls from $600 to $540", "از 600 به 540 دالر پایین می‌آید", "$540 is $6 × 90. Use the new price, $8.", "540 دالر یعنی 6 × 90. قیمت نو، 8 دالر را استفاده کن."),
    O("Stays at $600", "در 600 دالر ثابت می‌ماند", "Price and members both changed. TR moved.", "قیمت و اعضا هر دو تغییر کردند. TR حرکت کرد."),
    O("Rises from $600 to $720 (inelastic)", "از 600 به 720 دالر بالا می‌رود (بی‌کشش)", "Yes. $8 × 90 = $720. Price up, TR up: In step.", "بلی. 8 × 90 = 720. قیمت بالا، TR بالا: هم‌قدم.", true)],
    T("Loyal fans of a team: ticket price goes up, most still come.", "هواداران وفادار یک تیم: تکت گران شود، بیشترشان باز می‌آیند."),
    T("TR = P × Q, new P times new Q.", "TR = P × Q، P نو ضرب Q نو."),
    [T("What is $8 × 90?", "8 × 90 چند است؟"), T("$720", "720 دالر")]),

  Q("c6-022", "c6-tr", 0, T("Price falls from $5 to $4. Quantity rises from 80 to 100. Demand is:", "قیمت از 5 به 4 دالر پایین می‌آید. مقدار از 80 به 100 بالا می‌رود. تقاضا:"), [
    O("Elastic", "باکشش", "TR did not move at all, so no escape happened.", "TR اصلاً تکان نخورد، پس فراری رخ نداد."),
    O("Unit elastic", "کشش واحد", "Yes. $5×80 = $400 and $4×100 = $400. TR unchanged.", "بلی. 5×80 = 400 و 4×100 = 400. TR بدون تغییر.", true),
    O("Inelastic", "بی‌کشش", "In step would need TR to fall with the price. It stayed flat.", "هم‌قدم یعنی TR با قیمت پایین بیاید. ثابت ماند."),
    O("Perfectly inelastic", "کاملاً بی‌کشش", "Quantity changed from 80 to 100, so it is not frozen.", "مقدار از 80 به 100 تغییر کرد، پس یخ نزده است.")],
    T("Trading two $5 bills for ten $1 bills: different look, same money.", "عوض کردن دو نوت 5 دالری با ده نوت 1 دالری: شکل فرق دارد، پول یکی است."),
    T("TR flat = unit.", "TR ثابت = واحد."),
    [T("What is $4 × 100?", "4 × 100 چند است؟"), T("$400", "400 دالر")]),

  Q("c6-023", "c6-tr", 7, T("Demand for a product is inelastic. If the firm raises its price, total revenue will:", "تقاضا برای یک محصول بی‌کشش است. اگر شرکت قیمت را بالا ببرد، عاید کل:"), [
    O("Increase", "بالا می‌رود", "Yes. Inelastic is In step: price up, TR up.", "بلی. بی‌کشش هم‌قدم است: قیمت بالا، TR بالا.", true),
    O("Decrease", "پایین می‌آید", "That is the elastic story. You flipped the test!", "این داستان باکشش است. آزمون را سرچپه کردی!"),
    O("Stay the same", "ثابت می‌ماند", "Only unit elastic keeps TR still.", "فقط کشش واحد TR را ثابت نگه می‌دارد.")],
    T("Selling umbrellas in a storm: raise the price, people still buy, you earn more.", "فروش چتری در طوفان: قیمت را بالا ببری، مردم باز می‌خرند، بیشتر کمائی می‌کنی."),
    T("Inelastic is In step.", "بی‌کشش هم‌قدم است: Inelastic is In step."),
    [T("Inelastic: do buyers react a lot or a little?", "بی‌کشش: خریداران زیاد واکنش نشان می‌دهند یا کم؟"), T("A little.", "کم.")]),

  Q("c6-024", "c6-tr", 7, T("Why does no profit-maximizing firm set its price in the inelastic part of demand?", "چرا هیچ شرکت حداکثرکنندهٔ مفاد قیمت را در بخش بی‌کشش تقاضا نمی‌گذارد؟"), [
    O("Because lowering the price there would raise revenue", "چون کم کردن قیمت آنجا عاید را بالا می‌برد", "Backwards! In the inelastic part, lowering price LOWERS revenue.", "سرچپه! در بخش بی‌کشش، کم کردن قیمت عاید را پایین می‌آورد."),
    O("Because raising the price there would raise revenue and lower costs (fewer units)", "چون بالا بردن قیمت آنجا عاید را بالا و خرچ را پایین می‌آورد (تولید کمتر)", "Yes. More money in, fewer units to make. Easy win, so they keep raising.", "بلی. پول بیشتر، تولید کمتر. برد آسان، پس قیمت را بالا می‌برند.", true),
    O("Because the government does not allow it", "چون حکومت اجازه نمی‌دهد", "No law here. Just smart math.", "قانونی نیست. فقط حساب زیرکانه."),
    O("Because demand is vertical there", "چون تقاضا آنجا عمودی است", "Inelastic does not mean perfectly vertical. It just means |E| < 1.", "بی‌کشش یعنی کاملاً عمودی نیست. فقط |E| < 1.")],
    T("If you could earn more by working fewer hours, would you stop there? No, you would keep going.", "اگر با کار کمتر بیشتر کمائی کنی، آنجا می‌ایستی؟ نه، ادامه می‌دهی."),
    T("Inelastic range = free money left on the table.", "بخش بی‌کشش = پول مفت روی میز."),
    [T("Inelastic: price up means TR goes which way?", "بی‌کشش: قیمت بالا یعنی TR به کدام طرف؟"), T("Up.", "بالا.")]),

  Q("c6-025", "c6-tr", 0, T("A great harvest makes wheat prices fall. Demand for wheat is inelastic. Farmers' total revenue will:", "یک حاصل خوب قیمت گندم را پایین می‌آورد. تقاضا برای گندم بی‌کشش است. عاید کل دهقانان:"), [
    O("Rise", "بالا می‌رود", "Only if demand were elastic. Wheat is a rope.", "فقط اگر تقاضا باکشش بود. گندم ریسمان است."),
    O("Stay the same", "ثابت می‌ماند", "That needs unit elastic. Wheat is inelastic.", "این کشش واحد می‌خواهد. گندم بی‌کشش است."),
    O("Fall", "پایین می‌آید", "Yes. Inelastic is In step: price down, TR down. A sad bumper crop.", "بلی. بی‌کشش هم‌قدم است: قیمت پایین، TR پایین. حاصل زیاد ولی غمگین.", true)],
    T("People do not eat twice as much bread just because it is cheap.", "مردم فقط چون نان ارزان است دو برابر نان نمی‌خورند."),
    T("Inelastic: P and TR go together.", "بی‌کشش: P و TR با هم می‌روند."),
    [T("Did the price go up or down?", "قیمت بالا رفت یا پایین؟"), T("Down.", "پایین.")]),

  Q("c6-026", "c6-cross", 6, T("Coke's price rises 10%, and the quantity of Pepsi demanded rises 5%. Cross-price elasticity is +0.5. The goods are:", "قیمت کوکا 10% بالا می‌رود و مقدار تقاضای پپسی 5% بالا می‌رود. کشش متقاطع +0.5 است. این کالاها:"), [
    O("Complements", "مکمل", "Complements have a minus sign. This one is plus.", "مکمل‌ها علامت منفی دارند. این مثبت است."),
    O("Substitutes", "جانشین", "Yes. Plus sign: one gets pricey, people switch to the other.", "بلی. علامت مثبت: یکی گران شود، مردم به دیگری می‌روند.", true),
    O("Inelastic, so unrelated", "بی‌کشش، پس بی‌ربط", "Here we read the sign, not the size. Plus means substitutes.", "اینجا علامت را می‌خوانیم، نه اندازه. مثبت یعنی جانشین."),
    O("Inferior goods", "کالاهای پست", "Inferior is about income, not another good's price.", "پست به درآمد ربط دارد، نه به قیمت کالای دیگر.")],
    T("Two buses on the same route: one raises fare, the other fills up.", "دو بس در یک مسیر: یکی کرایه را بالا ببرد، دیگری پر می‌شود."),
    T("Plus = Pick the other one.", "مثبت = دیگری را انتخاب کن."),
    [T("Is +0.5 positive or negative?", "+0.5 مثبت است یا منفی؟"), T("Positive.", "مثبت.")]),

  Q("c6-027", "c6-cross", 6, T("Cross-price elasticity between hot dogs and hot dog buns is −0.8. They are:", "کشش متقاطع بین هات‌داگ و نان هات‌داگ −0.8 است. آن‌ها:"), [
    O("Complements", "مکمل", "Yes. Minus: they are used together, so they rise and fall together.", "بلی. منفی: با هم استفاده می‌شوند، پس با هم بالا و پایین می‌روند.", true),
    O("Substitutes", "جانشین", "Nobody eats a bun instead of a hot dog. Well, almost nobody.", "هیچ‌کس نان را به جای هات‌داگ نمی‌خورد. خوب، تقریباً هیچ‌کس."),
    O("Unrelated, because 0.8 < 1", "بی‌ربط، چون 0.8 < 1", "The 1 cutoff is for own-price elasticity. Here the sign is the boss.", "مرز 1 برای کشش قیمتی خودی است. اینجا علامت رئیس است.")],
    T("Shoes and laces: if shoes get expensive, laces sell less too.", "بوت و بند بوت: اگر بوت گران شود، بند بوت هم کمتر فروش می‌شود."),
    T("Minus = they go together.", "منفی = با هم می‌روند."),
    [T("Is −0.8 positive or negative?", "−0.8 مثبت است یا منفی؟"), T("Negative.", "منفی.")]),

  Q("c6-028", "c6-supply", 0, T("Price of a good rises 10%. Quantity supplied rises 20%. Price elasticity of supply is:", "قیمت یک کالا 10% بالا می‌رود. مقدار عرضه 20% بالا می‌رود. کشش قیمتی عرضه:"), [
    O("0.5, inelastic", "0.5، بی‌کشش", "Upside down. Quantity goes on top: 20 ÷ 10.", "سرچپه. مقدار بالا می‌رود: 20 ÷ 10."),
    O("−2, elastic", "−2، باکشش", "Supply elasticity is positive. Sellers like higher prices!", "کشش عرضه مثبت است. فروشندگان قیمت بلند را دوست دارند!"),
    O("2, elastic", "2، باکشش", "Yes. `20% ÷ 10% = 2` > 1.", "بلی. `20% ÷ 10% = 2` > 1.", true)],
    T("A tailor with spare sewing machines: more orders, more shirts, fast.", "خیاطی که ماشین اضافی دارد: فرمایش بیشتر، پیراهن بیشتر، زود."),
    T("Supply elasticity: positive, Qs on top.", "کشش عرضه: مثبت، Qs بالا."),
    [T("What is 20 ÷ 10?", "20 ÷ 10 چند است؟"), T("2", "جواب: 2")]),

  Q("c6-029", "c6-income", 6, T("Income rises 10%. Quantity of instant noodles bought falls 4%. Income elasticity is −0.4. Noodles are:", "درآمد 10% بالا می‌رود. مقدار خرید نودل فوری 4% پایین می‌آید. کشش درآمدی −0.4 است. نودل:"), [
    O("A necessity, because 0.4 is between 0 and 1", "ضروری، چون 0.4 بین 0 و 1 است", "For income elasticity the sign matters. This is −0.4, below zero.", "در کشش درآمدی علامت مهم است. این −0.4 است، زیر صفر."),
    O("An inferior good", "کالای پست", "Yes. Negative income elasticity = inferior.", "بلی. کشش درآمدی منفی = کالای پست.", true),
    O("A luxury", "لوکس", "A luxury is above 1. Nobody brags about noodles.", "لوکس بالای 1 است. هیچ‌کس به نودل فخر نمی‌کند."),
    O("A complement", "مکمل", "Complements come from cross-price elasticity, not income.", "مکمل از کشش متقاطع می‌آید، نه از درآمد.")],
    T("When you get a car, you ride the bus less. The bus is inferior for you.", "وقتی موتر می‌خری، کمتر بس سوار می‌شوی. بس برای تو کالای پست است."),
    T("Richer, buy less = inferior.", "پولدارتر، خرید کمتر = پست."),
    [T("Income went up. Did noodle buying go up or down?", "درآمد بالا رفت. خرید نودل بالا رفت یا پایین؟"), T("Down.", "پایین.")]),

  Q("c6-030", "c6-income", 0, T("Income rises 20%. Quantity of cruises demanded rises 30%. Cruises are:", "درآمد 20% بالا می‌رود. مقدار تقاضای سفر کشتی 30% بالا می‌رود. سفر کشتی:"), [
    O("A luxury (income elasticity 1.5)", "لوکس (کشش درآمدی 1.5)", "Yes. `30% ÷ 20% = 1.5` > 1.", "بلی. `30% ÷ 20% = 1.5` > 1.", true),
    O("A necessity (income elasticity 0.67)", "ضروری (کشش درآمدی 0.67)", "You flipped it: income goes on the bottom. 30 ÷ 20, not 20 ÷ 30.", "سرچپه کردی: درآمد پایین می‌رود. 30 ÷ 20، نه 20 ÷ 30."),
    O("An inferior good", "کالای پست", "People bought MORE as they got richer. Not inferior at all.", "مردم با پولدار شدن بیشتر خریدند. اصلاً پست نیست.")],
    T("Get a raise and your vacation budget jumps more than your rice budget.", "معاشت زیاد شود، بودجهٔ سفرت بیشتر از بودجهٔ برنج بالا می‌رود."),
    T("Above 1 = luxury.", "بالای 1 = لوکس."),
    [T("What is 30 ÷ 20?", "30 ÷ 20 چند است؟"), T("1.5", "جواب: 1.5")]),

  Q("c6-031", "c6-supply", 0, T("Which supply is likely MOST elastic?", "عرضهٔ کدام احتمالاً باکشش‌تر است؟"), [
    O("Apples from an orchard this season", "سیب یک باغ در همین فصل", "Trees take years. The orchard cannot rush apples.", "درخت سال‌ها وقت می‌گیرد. باغ نمی‌تواند سیب را عجله بدهد."),
    O("Bread from a bakery next week", "نان یک نانوایی در هفتهٔ بعد", "Yes. More flour, more hours, more bread. Easy to grow fast.", "بلی. آرد بیشتر، ساعت بیشتر، نان بیشتر. زود زیاد می‌شود.", true),
    O("Paintings by a famous dead artist", "نقاشی‌های یک نقاش مشهور مرده", "He is not painting any more. Supply is a vertical line.", "او دیگر نقاشی نمی‌کند. عرضه خط عمودی است.")],
    T("A phone charger factory can add a shift tonight; a gold mine cannot dig a new mountain.", "فابریکهٔ چارجر امشب یک نوبت اضافه می‌کند؛ معدن طلا کوه نو نمی‌سازد."),
    T("Easy to make more + time = elastic supply.", "تولید آسان + وقت = عرضهٔ باکشش."),
    [T("Can a bakery bake more bread tomorrow?", "آیا نانوایی فردا نان بیشتر می‌پزد؟"), T("Yes.", "بلی.")])
  ]);

  S.short = (S.short || []).concat([
  { id: "c6-sa1", ch: "c6", topic: "c6-mid",
    prompt: T("Price rises from $20 to $30. Quantity falls from 60 to 40. Use the midpoint formula to find elasticity and classify demand.", "قیمت از 20 به 30 دالر بالا می‌رود. مقدار از 60 به 40 پایین می‌آید. با فورمول نقطه میانی کشش را پیدا کن و تقاضا را دسته‌بندی کن."),
    model: T("Average Q = 50, average P = 25. %ΔQ = −20 ÷ 50 = −40%. %ΔP = 10 ÷ 25 = 40%. E = −40% ÷ 40% = −1. |E| = 1, so demand is unit elastic.", "اوسط Q = 50، اوسط P = 25. %ΔQ = −20 ÷ 50 = −40%. %ΔP = 10 ÷ 25 = 40%. E = −40% ÷ 40% = −1. |E| = 1، پس تقاضا کشش واحد دارد."),
    rubric: [ T("Uses the averages (50 and 25).", "از اوسط‌ها (50 و 25) استفاده کرده."), T("Gets −40% and 40%, E = −1.", "−40% و 40% و E = −1 را یافته."), T("Classifies as unit elastic.", "کشش واحد دسته‌بندی کرده.") ] },
  { id: "c6-sa2", ch: "c6", topic: "c6-tr",
    prompt: T("A concert raises ticket prices and total revenue falls. Is demand elastic or inelastic? Explain with the total revenue test.", "یک کنسرت قیمت تکت را بالا می‌برد و عاید کل پایین می‌آید. تقاضا باکشش است یا بی‌کشش؟ با آزمون عاید کل توضیح بده."),
    model: T("Elastic. Price went up and total revenue went down: opposite directions. Buyers cut back by a bigger percent than the price rose, so they escaped.", "باکشش. قیمت بالا رفت و عاید کل پایین آمد: جهت مخالف. خریداران به فیصدی بیشتر از بالا رفتن قیمت خرید را کم کردند، پس فرار کردند."),
    rubric: [ T("Answers elastic.", "جواب باکشش داده."), T("Notes price and TR moved opposite ways.", "گفته قیمت و TR برعکس حرکت کردند."), T("Explains %ΔQ is bigger than %ΔP.", "توضیح داده %ΔQ از %ΔP بزرگتر است.") ] },
  { id: "c6-sa3", ch: "c6", topic: "c6-det",
    prompt: T("Explain why demand for one brand of cereal is more elastic than demand for insulin. Use two determinants.", "توضیح بده چرا تقاضا برای یک برند سیریل از تقاضا برای انسولین باکشش‌تر است. از دو عامل استفاده کن."),
    model: T("Cereal has many close substitutes, so buyers switch brands when price rises. Insulin is a necessity with no close substitute, so people keep buying it. So cereal is elastic and insulin is inelastic.", "سیریل جانشین‌های نزدیک زیاد دارد، پس با گرانی خریداران برند را عوض می‌کنند. انسولین ضروری است و جانشین نزدیک ندارد، پس مردم باز می‌خرند. پس سیریل باکشش و انسولین بی‌کشش است."),
    rubric: [ T("Mentions close substitutes.", "از جانشین‌های نزدیک یاد کرده."), T("Mentions necessity vs luxury (or narrow market).", "از ضروری در برابر لوکس (یا بازار تنگ) یاد کرده."), T("Concludes cereal elastic, insulin inelastic.", "نتیجه: سیریل باکشش، انسولین بی‌کشش.") ] }
  ]);
})();
