// Bilingual content. Every string is {en, fa}; fa is Dari (Afghan Persian).
// Dari keeps the English exam term in parentheses, because the exam is in English.
window.STUDY = {
  ui: {
    title: { en: "ECON 206 Cram", fa: "آمادگی امتحان ECON 206" },
    plan: { en: "Today's plan", fa: "پلان امروز" },
    learn: { en: "Learn", fa: "آموختن" },
    test: { en: "Test", fa: "آزمون" },
    traps: { en: "Traps only", fa: "فقط دام‌ها" },
    mixed: { en: "Mixed (all chapters)", fa: "مختلط (همه فصل‌ها)" },
    chapterOnly: { en: "This chapter only", fa: "فقط همین فصل" },
    daysLeft: { en: "days to the exam (Oct 13)", fa: "روز تا امتحان (۱۳ اکتوبر)" },
    sessions: { en: "sessions done", fa: "جلسه تمام شد" },
    howSure: { en: "How sure are you?", fa: "چقدر مطمئن هستید؟" },
    sure: { en: "Sure", fa: "مطمئنم" },
    think: { en: "Think so", fa: "فکر می‌کنم" },
    guess: { en: "Guess", fa: "حدس" },
    correct: { en: "Correct", fa: "درست است" },
    wrong: { en: "Not quite", fa: "درست نیست" },
    why: { en: "Why", fa: "چرا" },
    whyNot: { en: "Why not", fa: "چرا نه" },
    next: { en: "Next", fa: "بعدی" },
    done: { en: "Session done", fa: "جلسه تمام شد" },
    again: { en: "One more round?", fa: "یک دور دیگر؟" },
    home: { en: "Home", fa: "خانه" },
    mixedWarn: { en: "Mixed quizzes feel harder. That is the point: harder now, better on Tuesday.", fa: "آزمون‌های مختلط سخت‌تر به نظر می‌رسند. هدف همین است: امروز سخت‌تر، سه‌شنبه بهتر." },
    leech: { en: "You've missed this 3 times. Try it another way:", fa: "این را سه بار اشتباه کردید. از راه دیگری ببینید:" },
    swipeHint: { en: "Swipe sideways or tap to switch: English ⇄ دری", fa: "برای تغییر زبان به چپ یا راست بکشید یا بزنید: دری ⇄ English" },
    mastery: { en: "Mastery", fa: "تسلط" },
    checkUnderstanding: { en: "Check yourself", fa: "خود را بیازمایید" },
    export: { en: "Export progress", fa: "خروجی پیشرفت" },
    import: { en: "Import progress", fa: "ورودی پیشرفت" },
    q: { en: "Question", fa: "سؤال" },
    trapTag: { en: "TRAP", fa: "دام" }
  },
  chapters: [
    { id: "c3", name: { en: "Ch 3 · Demand & supply", fa: "فصل ۳ · تقاضا و عرضه" } },
    { id: "c4", name: { en: "Ch 4 · Surplus & efficiency", fa: "فصل ۴ · مازاد و کارایی" } },
    { id: "c5", name: { en: "Ch 5 · Market failure", fa: "فصل ۵ · ناکامی بازار" } },
    { id: "c6", name: { en: "Ch 6 · Elasticity", fa: "فصل ۶ · کشش" } }
  ],
  // 5-day plan: date → chapters to draw from
  plan: [
    { date: "2026-10-08", ch: ["c3"], note: { en: "Ch 3. Evening: relearn Ch 3.", fa: "فصل ۳. شام: تکرار فصل ۳." } },
    { date: "2026-10-09", ch: ["c3", "c4", "c6"], note: { en: "Ch 4.1–4.2 + first half of Ch 6, mixed with Ch 3.", fa: "فصل ۴.۱–۴.۲ و نیمهٔ اول فصل ۶، همراه با تکرار فصل ۳." } },
    { date: "2026-10-10", ch: ["c3", "c4", "c5", "c6"], note: { en: "Ch 5 + rest of Ch 6. Mixed review of everything.", fa: "فصل ۵ و باقی فصل ۶. مرور مختلط همه." } },
    { date: "2026-10-11", ch: ["c3", "c4", "c5", "c6"], note: { en: "Interleaved test on all chapters + fix your weak cards.", fa: "آزمون مختلط همه فصل‌ها و ترمیم کارت‌های ضعیف." } },
    { date: "2026-10-12", ch: ["c3", "c4", "c5", "c6"], note: { en: "Mock exam + review high-confidence errors.", fa: "امتحان آزمایشی و مرور اشتباه‌های با اطمینان بالا." } },
    { date: "2026-10-13", ch: ["missed"], note: { en: "15 minutes: only items you missed before. No new material.", fa: "۱۵ دقیقه: فقط سؤال‌هایی که قبلاً اشتباه کردید. مطلب تازه نه." } }
  ],
  learn: [
    { ch: "c3",
      big: { en: "Own price changes → move ALONG the curve. Anything else → the whole curve SHIFTS.", fa: "تغییر قیمتِ خودِ کالا ← حرکت روی منحنی. هر چیز دیگر ← کل منحنی جابه‌جا می‌شود (shift)." },
      analogy: { en: "The demand curve is your price menu. A movement is picking another line on the same menu; a shift is being handed a new menu.", fa: "منحنی تقاضا مثل مینوی قیمت شماست. حرکت یعنی انتخاب سطر دیگری از همان مینو؛ جابه‌جایی یعنی مینوی تازه به دست شما بدهند." },
      points: [
        { en: "Demand shifters (TRIPE): Tastes, Related goods' prices, Income, Population, Expected future prices.", fa: "عوامل جابه‌جایی تقاضا (TRIPE): سلیقه، قیمت کالاهای وابسته، درآمد، جمعیت، قیمت مورد انتظار آینده." },
        { en: "Supply shifters (TRINE): Technology, Related goods in production, Input prices, Number of firms, Expected future prices.", fa: "عوامل جابه‌جایی عرضه (TRINE): تکنالوژی، کالاهای وابسته در تولید، قیمت نهاده‌ها، تعداد شرکت‌ها، قیمت مورد انتظار آینده." },
        { en: "Same-direction shifts → quantity is certain. Opposite-direction shifts → price is certain.", fa: "جابه‌جایی هم‌جهت ← مقدار (Q) معلوم است. جابه‌جایی مخالف ← قیمت (P) معلوم است." }
      ] },
    { ch: "c4",
      big: { en: "Consumer surplus = what you'd pay minus what you paid. Deadweight loss = good trades that never happen.", fa: "مازاد مصرف‌کننده (consumer surplus) = آنچه حاضر بودید بپردازید منهای آنچه پرداختید. زیان رفاهی (deadweight loss) = معامله‌های خوبی که هرگز انجام نشدند." },
      analogy: { en: "You'd pay $10 for ice cream, it costs $4: you walk away $6 happier.", fa: "حاضر بودید ۱۰ دالر برای آیس‌کریم بدهید، قیمتش ۴ دالر است: ۶ دالر خوش‌تر برمی‌گردید." },
      points: [
        { en: "CS: area below demand, above price. PS: area above supply, below price.", fa: "مازاد مصرف‌کننده: مساحت زیر تقاضا و بالای قیمت. مازاد تولیدکننده: مساحت بالای عرضه و زیر قیمت." },
        { en: "Triangle = ½ × base (quantity gap) × height (price gap).", fa: "مثلث = ½ × قاعده (فاصلهٔ مقدار) × ارتفاع (فاصلهٔ قیمت)." },
        { en: "DWL goes to nobody. It is not a transfer.", fa: "زیان رفاهی به هیچ‌کس نمی‌رسد. انتقال پول نیست." }
      ] },
    { ch: "c5",
      big: { en: "Market failure: the price misses a cost or benefit, or the good can't be priced at all.", fa: "ناکامی بازار: قیمت، یک هزینه یا فایده را نمی‌بیند، یا اصلاً نمی‌شود برای کالا قیمت گذاشت." },
      analogy: { en: "The free-rider roommate enjoys the Wi-Fi but never chips in.", fa: "هم‌اتاقی «سواری مجانی» (free rider) از وای‌فای استفاده می‌کند ولی هیچ‌وقت سهمش را نمی‌دهد." },
      points: [
        { en: "Negative externality → overproduced; positive → underproduced. Pigovian tax = external cost.", fa: "اثر خارجی منفی ← تولید بیش از حد؛ مثبت ← تولید کم‌تر از حد. مالیات پیگویی = هزینهٔ خارجی." },
        { en: "Public good = non-rival AND non-excludable — not 'whatever government provides'.", fa: "کالای عمومی = غیررقابتی و غیرقابل‌انحصار؛ نه «هر چیزی که دولت می‌دهد»." },
        { en: "Adverse selection = before the deal (Sign-up). Moral hazard = after (Happens after).", fa: "انتخاب نامطلوب (adverse selection) = پیش از قرارداد. خطر اخلاقی (moral hazard) = پس از قرارداد." }
      ] },
    { ch: "c6",
      big: { en: "Elasticity = %ΔQ ÷ %ΔP. How sensitive quantity is to price, in percentages.", fa: "کشش (elasticity) = ‎%ΔQ ÷ %ΔP‎. حساسیت مقدار نسبت به قیمت، به درصد." },
      analogy: { en: "Rubber band (elastic: one cereal brand) vs rope (inelastic: insulin).", fa: "کش لاستیکی (باکشش: یک برند خاص سیریال) در برابر ریسمان (کم‌کشش: انسولین)." },
      points: [
        { en: "Inelastic: P and TR move In step. Elastic: they Escape (opposite).", fa: "کم‌کشش: قیمت و درآمد کل (TR) هم‌جهت حرکت می‌کنند. باکشش: خلاف جهت." },
        { en: "Slope ≠ elasticity. A straight demand line is elastic at the top, inelastic at the bottom.", fa: "شیب ≠ کشش. خط مستقیم تقاضا در بالا باکشش و در پایین کم‌کشش است." },
        { en: "Cross-price: + substitutes, − complements. Income: + normal, − inferior.", fa: "کشش متقاطع: مثبت = جانشین، منفی = مکمل. کشش درآمدی: مثبت = کالای عادی، منفی = کالای پست." }
      ] }
  ],
  questions: [
    { id: "q1", ch: "c3", trap: true,
      q: { en: "The price of pizza falls. What happens to the demand for pizza?", fa: "قیمت پیتزا پایین می‌آید. تقاضا (demand) برای پیتزا چه می‌شود؟" },
      opts: [
        { t: { en: "Demand doesn't change; quantity demanded rises", fa: "تقاضا تغییر نمی‌کند؛ مقدار تقاضا (quantity demanded) بالا می‌رود" }, ok: true,
          why: { en: "Own price is on the axis, so you slide along the same curve.", fa: "قیمت خودِ کالا روی محور است، پس روی همان منحنی حرکت می‌کنید." } },
        { t: { en: "Demand increases (shifts right)", fa: "تقاضا زیاد می‌شود (به راست جابه‌جا می‌شود)" },
          why: { en: "The signature error: a price change is a movement, not a shift.", fa: "اشتباه معروف: تغییر قیمت، حرکت است نه جابه‌جایی." } },
        { t: { en: "Demand decreases (shifts left)", fa: "تقاضا کم می‌شود (به چپ جابه‌جا می‌شود)" },
          why: { en: "Neither a shift nor in this direction: cheaper pizza means more slices bought.", fa: "نه جابه‌جایی است و نه این جهت: پیتزای ارزان‌تر یعنی خرید بیشتر." } },
        { t: { en: "Supply increases", fa: "عرضه زیاد می‌شود" },
          why: { en: "The question says nothing about producers' costs or technology.", fa: "سؤال دربارهٔ هزینه یا تکنالوژی تولیدکننده چیزی نمی‌گوید." } }
      ],
      alt: { en: "Ask one question: did the good's OWN price change? Yes → movement. Anything else → shift.", fa: "فقط یک سؤال بپرسید: آیا قیمتِ خودِ کالا تغییر کرد؟ بلی ← حرکت. هر چیز دیگر ← جابه‌جایی." } },
    { id: "q2", ch: "c3",
      q: { en: "Incomes rise. Instant noodles are an inferior good. Demand for instant noodles…", fa: "درآمدها بالا می‌رود. نودل فوری کالای پست (inferior good) است. تقاضا برای نودل فوری…" },
      opts: [
        { t: { en: "shifts left", fa: "به چپ جابه‌جا می‌شود" }, ok: true,
          why: { en: "Inferior good: more income → people buy less of it at every price.", fa: "کالای پست: درآمد بیشتر ← در هر قیمت کم‌تر می‌خرند." } },
        { t: { en: "shifts right", fa: "به راست جابه‌جا می‌شود" },
          why: { en: "That's true for normal goods. Don't shift right by reflex.", fa: "این برای کالای عادی درست است. بی‌فکر به راست نبرید." } },
        { t: { en: "doesn't change; quantity demanded falls", fa: "تغییر نمی‌کند؛ مقدار تقاضا کم می‌شود" },
          why: { en: "Income isn't the good's own price, so it shifts the curve.", fa: "درآمد قیمتِ خودِ کالا نیست، پس منحنی جابه‌جا می‌شود." } }
      ] },
    { id: "q3", ch: "c3",
      q: { en: "People expect phone prices to rise next month. Today's demand for phones…", fa: "مردم انتظار دارند قیمت موبایل ماه آینده بالا برود. تقاضای امروز برای موبایل…" },
      opts: [
        { t: { en: "increases", fa: "زیاد می‌شود" }, ok: true, why: { en: "Buy now before it gets pricier.", fa: "حالا می‌خرند پیش از آنکه گران شود." } },
        { t: { en: "decreases", fa: "کم می‌شود" }, why: { en: "That's the supply side: sellers hold stock to sell later.", fa: "این طرف عرضه است: فروشنده‌ها جنس را برای بعد نگه می‌دارند." } },
        { t: { en: "is unchanged", fa: "تغییر نمی‌کند" }, why: { en: "Expected future price is one of the five demand shifters.", fa: "قیمت مورد انتظار آینده یکی از پنج عامل جابه‌جایی تقاضاست." } }
      ] },
    { id: "q4", ch: "c3", trap: true,
      q: { en: "Demand increases AND supply increases. What do we know for certain?", fa: "تقاضا زیاد می‌شود و عرضه هم زیاد می‌شود. چه چیزی را با اطمینان می‌دانیم؟" },
      opts: [
        { t: { en: "Quantity rises; price is ambiguous", fa: "مقدار بالا می‌رود؛ قیمت نامعلوم است" }, ok: true,
          why: { en: "Same-direction shifts → quantity is certain. Price depends on which shift is bigger.", fa: "جابه‌جایی هم‌جهت ← مقدار معلوم است. قیمت به بزرگی هر جابه‌جایی بستگی دارد." } },
        { t: { en: "Price rises; quantity is ambiguous", fa: "قیمت بالا می‌رود؛ مقدار نامعلوم است" },
          why: { en: "That's D↑ with S↓ (opposite directions).", fa: "این حالت تقاضا↑ و عرضه↓ است (خلاف جهت)." } },
        { t: { en: "Both price and quantity rise", fa: "هم قیمت و هم مقدار بالا می‌رود" },
          why: { en: "Supply rising pushes price down, demand pushes it up — can't be sure.", fa: "افزایش عرضه قیمت را پایین می‌برد و تقاضا بالا — مطمئن نمی‌شود گفت." } }
      ] },
    { id: "q5", ch: "c3",
      q: { en: "The price is set above equilibrium. The result is…", fa: "قیمت بالاتر از تعادل (equilibrium) تعیین شده. نتیجه…" },
      opts: [
        { t: { en: "a surplus (Qs > Qd), so price tends to fall", fa: "مازاد (Qs > Qd)، پس قیمت پایین می‌آید" }, ok: true, why: { en: "Unsold concert tickets get discounted.", fa: "تکت‌های فروش‌نرفتهٔ کنسرت ارزان می‌شوند." } },
        { t: { en: "a shortage (Qd > Qs)", fa: "کمبود (Qd > Qs)" }, why: { en: "Shortages happen below equilibrium.", fa: "کمبود زیر قیمت تعادل رخ می‌دهد." } },
        { t: { en: "consumer surplus", fa: "مازاد مصرف‌کننده" }, why: { en: "Different 'surplus': Ch 4's consumer surplus is a gain, not excess supply.", fa: "«مازاد» دیگری است: مازاد مصرف‌کننده در فصل ۴ یک فایده است، نه عرضهٔ اضافی." } }
      ] },
    { id: "q6", ch: "c3", trap: true,
      q: { en: "\"Coffee prices rose, so the supply of coffee increased.\" This statement is…", fa: "«قیمت قهوه بالا رفت، پس عرضهٔ قهوه زیاد شد.» این جمله…" },
      opts: [
        { t: { en: "wrong: higher price raises quantity supplied (a movement)", fa: "غلط است: قیمت بالاتر، مقدار عرضه (quantity supplied) را زیاد می‌کند (حرکت)" }, ok: true, why: { en: "Own price → along the supply curve.", fa: "قیمت خودِ کالا ← حرکت روی منحنی عرضه." } },
        { t: { en: "right: supply shifts right", fa: "درست است: عرضه به راست می‌رود" }, why: { en: "Price is on the axis; it can't shift its own curve.", fa: "قیمت روی محور است؛ نمی‌تواند منحنی خودش را جابه‌جا کند." } }
      ] },
    { id: "q7", ch: "c4",
      q: { en: "You'd pay $10 for a ticket and it costs $4. Your consumer surplus is…", fa: "حاضرید ۱۰ دالر برای یک تکت بدهید و قیمتش ۴ دالر است. مازاد مصرف‌کنندهٔ شما…" },
      opts: [
        { t: { en: "$6", fa: "۶ دالر" }, ok: true, why: { en: "Willingness to pay − price = 10 − 4.", fa: "آمادگی پرداخت − قیمت = ۱۰ − ۴." } },
        { t: { en: "$4", fa: "۴ دالر" }, why: { en: "That's the price paid, not the surplus.", fa: "این قیمت پرداخت‌شده است، نه مازاد." } },
        { t: { en: "$14", fa: "۱۴ دالر" }, why: { en: "Subtract, don't add.", fa: "تفریق کنید، جمع نه." } }
      ] },
    { id: "q8", ch: "c4",
      q: { en: "A tax cuts trade from 100 to 80 units; the gap between demand and supply prices at 80 is $10. Deadweight loss?", fa: "یک مالیات معامله را از ۱۰۰ به ۸۰ واحد کم می‌کند؛ فاصلهٔ قیمت تقاضا و عرضه در ۸۰ واحد ۱۰ دالر است. زیان رفاهی؟" },
      opts: [
        { t: { en: "$100", fa: "۱۰۰ دالر" }, ok: true, why: { en: "½ × base 20 × height 10 = 100.", fa: "‎½ × 20 × 10 = 100‎ (قاعده ۲۰، ارتفاع ۱۰)." } },
        { t: { en: "$200", fa: "۲۰۰ دالر" }, why: { en: "You forgot the ½ — it's a triangle.", fa: "½ را فراموش کردید — مثلث است." } },
        { t: { en: "$800", fa: "۸۰۰ دالر" }, why: { en: "That's tax revenue (10 × 80), a transfer, not DWL.", fa: "این درآمد مالیاتی است (۱۰ × ۸۰)، انتقال است نه زیان رفاهی." } }
      ] },
    { id: "q9", ch: "c4", trap: true,
      q: { en: "Deadweight loss from a tax goes to…", fa: "زیان رفاهی ناشی از مالیات به کی می‌رسد؟" },
      opts: [
        { t: { en: "nobody — it disappears", fa: "به هیچ‌کس — از بین می‌رود" }, ok: true, why: { en: "It's the value of trades that no longer happen.", fa: "ارزش معامله‌هایی است که دیگر انجام نمی‌شوند." } },
        { t: { en: "the government", fa: "دولت" }, why: { en: "The government gets tax revenue, which is a separate rectangle.", fa: "دولت درآمد مالیاتی می‌گیرد که مستطیل جداگانه‌ای است." } },
        { t: { en: "producers", fa: "تولیدکننده‌ها" }, why: { en: "Producers lose surplus too; DWL is not a transfer.", fa: "تولیدکننده‌ها هم مازاد از دست می‌دهند؛ زیان رفاهی انتقال نیست." } }
      ] },
    { id: "q10", ch: "c4",
      q: { en: "Which price ceiling is binding?", fa: "کدام سقف قیمت (price ceiling) مؤثر (binding) است؟" },
      opts: [
        { t: { en: "One set below equilibrium", fa: "سقفی که پایین‌تر از تعادل باشد" }, ok: true, why: { en: "Only then does it stop the market reaching equilibrium.", fa: "فقط آن وقت بازار را از رسیدن به تعادل باز می‌دارد." } },
        { t: { en: "One set above equilibrium", fa: "سقفی که بالاتر از تعادل باشد" }, why: { en: "The market price is already lower, so the ceiling does nothing.", fa: "قیمت بازار از قبل پایین‌تر است، پس سقف اثری ندارد." } }
      ] },
    { id: "q11", ch: "c5", trap: true,
      q: { en: "What is the efficient amount of pollution?", fa: "مقدار کارآمد آلودگی چقدر است؟" },
      opts: [
        { t: { en: "Where marginal benefit of cutting it = marginal cost of cutting it", fa: "جایی که فایدهٔ نهایی کاهش آن = هزینهٔ نهایی کاهش آن" }, ok: true, why: { en: "Cut until the next cut costs more than it's worth.", fa: "تا جایی کاهش دهید که کاهش بعدی بیش از ارزشش هزینه داشته باشد." } },
        { t: { en: "Zero", fa: "صفر" }, why: { en: "Zero usually costs far more than the harm it prevents.", fa: "صفر معمولاً خیلی بیشتر از زیانی که جلوگیری می‌کند هزینه دارد." } }
      ] },
    { id: "q12", ch: "c5",
      q: { en: "A factory's smoke harms neighbours. Without policy, the market…", fa: "دود یک فابریکه به همسایه‌ها زیان می‌رساند. بدون سیاست، بازار…" },
      opts: [
        { t: { en: "overproduces", fa: "بیش از حد تولید می‌کند" }, ok: true, why: { en: "Social cost > private cost, but the firm only sees private cost.", fa: "هزینهٔ اجتماعی > هزینهٔ خصوصی، ولی شرکت فقط هزینهٔ خصوصی را می‌بیند." } },
        { t: { en: "underproduces", fa: "کم‌تر از حد تولید می‌کند" }, why: { en: "That's a positive externality (flu shot, garden).", fa: "این اثر خارجی مثبت است (واکسین، باغچه)." } }
      ] },
    { id: "q13", ch: "c5", trap: true,
      q: { en: "Coase theorem: with clear rights and low transaction costs, who holds the right decides…", fa: "قضیهٔ کوز (Coase): با حقوق روشن و هزینهٔ معاملهٔ کم، صاحب حق تعیین می‌کند…" },
      opts: [
        { t: { en: "only who pays whom — the outcome is efficient either way", fa: "فقط کی به کی پول می‌دهد — نتیجه در هر حال کارآمد است" }, ok: true, why: { en: "Bargaining reaches the efficient result; rights only change distribution.", fa: "چانه‌زنی به نتیجهٔ کارآمد می‌رسد؛ حقوق فقط تقسیم را تغییر می‌دهد." } },
        { t: { en: "whether the outcome is efficient", fa: "اینکه نتیجه کارآمد باشد یا نه" }, why: { en: "That's the classic Coase trap.", fa: "این دام معروف کوز است." } }
      ] },
    { id: "q14", ch: "c5", trap: true,
      q: { en: "Netflix is best classified as a…", fa: "نتفلیکس بهتر است چه نوع کالایی دانسته شود؟" },
      opts: [
        { t: { en: "club (quasi-public) good", fa: "کالای باشگاهی (نیمه‌عمومی)" }, ok: true, why: { en: "Non-rival (your stream doesn't use mine up) but excludable (password).", fa: "غیررقابتی (پخش شما مال مرا کم نمی‌کند) ولی قابل‌انحصار (پسورد)." } },
        { t: { en: "public good", fa: "کالای عمومی" }, why: { en: "Public goods are non-excludable. Netflix can lock you out.", fa: "کالای عمومی غیرقابل‌انحصار است. نتفلیکس می‌تواند شما را بیرون کند." } },
        { t: { en: "common resource", fa: "منبع مشترک" }, why: { en: "Common resources are rival (ocean fish).", fa: "منابع مشترک رقابتی‌اند (ماهی دریا)." } }
      ] },
    { id: "q15", ch: "c5", trap: true,
      q: { en: "Public schools are public goods because the government provides them.", fa: "مکاتب دولتی کالای عمومی‌اند چون دولت آن‌ها را فراهم می‌کند." },
      opts: [
        { t: { en: "False", fa: "غلط" }, ok: true, why: { en: "Public goods are defined by non-rivalry + non-excludability, not by who supplies them. Seats are rival.", fa: "کالای عمومی با غیررقابتی و غیرقابل‌انحصار بودن تعریف می‌شود، نه با اینکه کی آن را می‌دهد. چوکی صنف رقابتی است." } },
        { t: { en: "True", fa: "درست" }, why: { en: "Government provision doesn't make a good public.", fa: "فراهم‌کردن توسط دولت کالا را عمومی نمی‌سازد." } }
      ] },
    { id: "q16", ch: "c5", trap: true,
      q: { en: "After buying insurance, a driver becomes more careless. This is…", fa: "پس از خرید بیمه، یک راننده بی‌احتیاط‌تر می‌شود. این…" },
      opts: [
        { t: { en: "moral hazard", fa: "خطر اخلاقی (moral hazard)" }, ok: true, why: { en: "Hidden action, after the deal.", fa: "عمل پنهان، پس از قرارداد." } },
        { t: { en: "adverse selection", fa: "انتخاب نامطلوب (adverse selection)" }, why: { en: "That's hidden type, before the deal (the sickest sign up first).", fa: "آن نوع پنهان است، پیش از قرارداد (بیمارترها اول ثبت‌نام می‌کنند)." } }
      ] },
    { id: "q17", ch: "c5",
      q: { en: "Why can tradable permits cut pollution more cheaply than 'every firm cuts 20%'?", fa: "چرا جواز قابل‌معامله (tradable permits) آلودگی را ارزان‌تر از «هر شرکت ۲۰٪ کم کند» کاهش می‌دهد؟" },
      opts: [
        { t: { en: "Firms that cut cheaply cut more and sell permits", fa: "شرکت‌هایی که ارزان کاهش می‌دهند بیشتر کم می‌کنند و جواز می‌فروشند" }, ok: true, why: { en: "Same total, done by the lowest-cost cutters.", fa: "همان مجموع کاهش، ولی توسط کم‌هزینه‌ترین‌ها." } },
        { t: { en: "Permits allow more total pollution", fa: "جوازها آلودگی کل بیشتری اجازه می‌دهند" }, why: { en: "The cap fixes the total.", fa: "سقف (cap) مجموع را ثابت نگه می‌دارد." } }
      ] },
    { id: "q18", ch: "c6",
      q: { en: "Price rises from $4 to $6; quantity falls from 120 to 80. Midpoint elasticity (absolute value)?", fa: "قیمت از ۴ به ۶ دالر بالا می‌رود؛ مقدار از ۱۲۰ به ۸۰ پایین می‌آید. کشش به روش نقطهٔ میانی (midpoint)، قدر مطلق؟" },
      opts: [
        { t: { en: "1.0 (unit elastic)", fa: "۱٫۰ (کشش واحد)" }, ok: true, why: { en: "%ΔQ = −40/100 = −40%; %ΔP = 2/5 = 40%; |−40/40| = 1.", fa: "‎%ΔQ = −40/100 = −40%‎؛ ‎%ΔP = 2/5 = 40%‎؛ ‎|−40/40| = 1‎." } },
        { t: { en: "0.67", fa: "۰٫۶۷" }, why: { en: "You used simple % change from the start point. Use averages.", fa: "درصد ساده از نقطهٔ شروع گرفتید. از میانگین‌ها استفاده کنید." } },
        { t: { en: "20", fa: "۲۰" }, why: { en: "That's ΔQ/ΔP (slope-like), not percentages.", fa: "این ΔQ/ΔP است (شبیه شیب)، نه درصد." } }
      ] },
    { id: "q19", ch: "c6", trap: true,
      q: { en: "Demand is inelastic. A firm raises its price. Total revenue…", fa: "تقاضا کم‌کشش (inelastic) است. شرکت قیمت را بالا می‌برد. درآمد کل (TR)…" },
      opts: [
        { t: { en: "rises", fa: "بالا می‌رود" }, ok: true, why: { en: "Inelastic = In step: P and TR move together.", fa: "کم‌کشش: قیمت و درآمد کل هم‌جهت حرکت می‌کنند." } },
        { t: { en: "falls", fa: "پایین می‌آید" }, why: { en: "That's the elastic case.", fa: "این حالت باکشش است." } },
        { t: { en: "stays the same", fa: "ثابت می‌ماند" }, why: { en: "Only when unit elastic.", fa: "فقط در کشش واحد." } }
      ] },
    { id: "q20", ch: "c6", trap: true,
      q: { en: "Along a straight-line demand curve, elasticity is…", fa: "روی یک منحنی تقاضای خط مستقیم، کشش…" },
      opts: [
        { t: { en: "elastic at the top, inelastic at the bottom", fa: "در بالا باکشش و در پایین کم‌کشش است" }, ok: true, why: { en: "Slope is constant but percentages change. Midpoint is unit elastic; TR peaks there.", fa: "شیب ثابت است ولی درصدها تغییر می‌کنند. وسط خط کشش واحد دارد و TR آنجا بیشینه است." } },
        { t: { en: "the same everywhere, because the slope is constant", fa: "همه‌جا یکسان است چون شیب ثابت است" }, why: { en: "Slope ≠ elasticity.", fa: "شیب ≠ کشش." } }
      ] },
    { id: "q21", ch: "c6", trap: true,
      q: { en: "Cross-price elasticity between printers and ink is −0.8. They are…", fa: "کشش متقاطع بین پرینتر و رنگ (ink) ‎−0.8‎ است. این دو…" },
      opts: [
        { t: { en: "complements", fa: "مکمل (complements) هستند" }, ok: true, why: { en: "Negative cross elasticity → used together.", fa: "کشش متقاطع منفی ← با هم مصرف می‌شوند." } },
        { t: { en: "substitutes", fa: "جانشین (substitutes) هستند" }, why: { en: "Substitutes have a positive cross elasticity (Coke/Pepsi).", fa: "جانشین‌ها کشش متقاطع مثبت دارند (کوکا/پپسی)." } },
        { t: { en: "inferior goods", fa: "کالای پست هستند" }, why: { en: "Inferior is about income elasticity, not cross-price.", fa: "کالای پست به کشش درآمدی مربوط است، نه متقاطع." } }
      ] },
    { id: "q22", ch: "c6",
      q: { en: "Income elasticity of a good is 1.8. It is a…", fa: "کشش درآمدی یک کالا ۱٫۸ است. این کالا…" },
      opts: [
        { t: { en: "normal good, a luxury", fa: "کالای عادی، از نوع تجملی" }, ok: true, why: { en: "Positive → normal; above 1 → luxury.", fa: "مثبت ← عادی؛ بالاتر از ۱ ← تجملی." } },
        { t: { en: "normal good, a necessity", fa: "کالای عادی، از نوع ضروری" }, why: { en: "Necessities are between 0 and 1.", fa: "کالای ضروری بین ۰ و ۱ است." } },
        { t: { en: "inferior good", fa: "کالای پست" }, why: { en: "Inferior goods have negative income elasticity.", fa: "کالای پست کشش درآمدی منفی دارد." } }
      ] },
    { id: "q23", ch: "c6",
      q: { en: "Which makes demand MORE elastic?", fa: "کدام تقاضا را باکشش‌تر می‌سازد؟" },
      opts: [
        { t: { en: "Many close substitutes", fa: "جانشین‌های نزدیک زیاد" }, ok: true, why: { en: "The most important determinant: easy to switch.", fa: "مهم‌ترین عامل: عوض‌کردن آسان است." } },
        { t: { en: "A very short time to adjust", fa: "زمان خیلی کوتاه برای تطبیق" }, why: { en: "Demand is more elastic in the LONG run.", fa: "تقاضا در دراز‌مدت باکشش‌تر است." } },
        { t: { en: "The good is a necessity", fa: "کالا ضروری باشد" }, why: { en: "Necessities are inelastic (insulin).", fa: "کالاهای ضروری کم‌کشش‌اند (انسولین)." } }
      ] },
    { id: "q24", ch: "c6",
      q: { en: "Price elasticity of supply is usually higher…", fa: "کشش قیمتی عرضه معمولاً بیشتر است…" },
      opts: [
        { t: { en: "in the long run", fa: "در دراز‌مدت" }, ok: true, why: { en: "A bakery can bake more tomorrow; given time, any firm can expand.", fa: "نانوایی فردا بیشتر می‌پزد؛ با زمان، هر شرکتی می‌تواند گسترش یابد." } },
        { t: { en: "in the very short run", fa: "در کوتاه‌مدت بسیار" }, why: { en: "An orchard can't grow more apples after this season's harvest.", fa: "باغ سیب پس از حاصل امسال نمی‌تواند سیب بیشتری بدهد." } }
      ] }
  ]
};
