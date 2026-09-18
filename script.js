// Header scroll state
const header = document.querySelector("[data-header]");
const year = document.querySelector("[data-year]");
const faqItems = [...document.querySelectorAll(".faq-list details")];
const placeholderLinks = document.querySelectorAll("[data-store-link]");
const screenshotCards = document.querySelectorAll("[data-screenshot]");
const screenshotDialog = document.querySelector("[data-screenshot-dialog]");
const dialogImage = document.querySelector("[data-dialog-image]");
const dialogCaption = document.querySelector("[data-dialog-caption]");
const dialogClose = document.querySelector("[data-dialog-close]");
const guideSteps = [...document.querySelectorAll("[data-guide-step]")];
const guidePreviewImage = document.querySelector("[data-guide-preview-image]");
const guidePhone = guidePreviewImage?.closest(".guide-phone");
const guidePreviewTitle = document.querySelector("[data-guide-preview-title]");
const guideCount = document.querySelector("[data-guide-count]");
const langBtns = document.querySelectorAll("[data-lang-btn]");
const heroImage = document.querySelector("[data-hero-image]");
const navGuideLink = document.querySelector("#nav-guide-link");
const guideDownloadMain = document.querySelector("#guide-download-main");
const guideDownloadAlt = document.querySelector("#guide-download-alt");

const updateHeader = () => {
  header?.classList.toggle("is-scrolled", window.scrollY > 12);
};

updateHeader();
window.addEventListener("scroll", updateHeader, { passive: true });

if (year) {
  year.textContent = new Date().getFullYear();
}

faqItems.forEach((item) => {
  item.addEventListener("toggle", () => {
    if (!item.open) return;
    faqItems.forEach((otherItem) => {
      if (otherItem !== item) otherItem.open = false;
    });
  });
});

placeholderLinks.forEach((link) => {
  link.addEventListener("click", (event) => event.preventDefault());
});

screenshotCards.forEach((card) => {
  card.addEventListener("click", () => {
    if (!screenshotDialog || !dialogImage || !dialogCaption) return;
    dialogImage.src = card.dataset.screenshot;
    dialogImage.alt = card.dataset.caption || "DimFin Screen";
    dialogCaption.textContent = card.dataset.caption || "DimFin";
    screenshotDialog.showModal();
  });
});

dialogClose?.addEventListener("click", () => screenshotDialog?.close());
screenshotDialog?.addEventListener("click", (event) => {
  if (event.target === screenshotDialog) screenshotDialog.close();
});

const updateGuideStep = (step) => {
  guideSteps.forEach((item) => {
    const isCurrent = item === step;
    item.classList.toggle("is-active", isCurrent);
    item.setAttribute("aria-selected", String(isCurrent));
  });

  const currentLang = document.documentElement.lang || "uk";
  const imageKey = currentLang === "en" ? (step.dataset.guideImageEn || step.dataset.guideImage) : (step.dataset.guideImageUa || step.dataset.guideImage);

  if (guidePreviewImage) {
    guidePreviewImage.src = imageKey;
    guidePreviewImage.alt = step.dataset.guideTitle || "DimFin Screen";
    const isUnframed = imageKey?.endsWith("calendar.png") ||
                       imageKey?.endsWith("analytics.png") ||
                       imageKey?.endsWith("analytics-overview.png") ||
                       imageKey?.endsWith("voice-input.png") ||
                       imageKey?.endsWith("goals.png");
    guidePhone?.classList.toggle("is-framed-screenshot", !isUnframed);
  }
  if (guidePreviewTitle) guidePreviewTitle.textContent = step.dataset.guideTitle;
  if (guideCount) {
    guideCount.textContent = currentLang === "en" 
      ? `Step ${step.dataset.guideStep} of ${guideSteps.length}` 
      : `Крок ${step.dataset.guideStep} із ${guideSteps.length}`;
  }
};

guideSteps.forEach((step) => {
  step.addEventListener("click", () => updateGuideStep(step));
});

/* ==========================================================================
   Bilingual i18n Engine (Ukrainian & English)
   ========================================================================== */

const i18n = {
  uk: {
    metaTitle: "DimFin — домашній бюджет без зайвої складності",
    metaDesc: "DimFin — домашній бюджет без доступу до банківських рахунків. Доходи й витрати, місячні бюджети, кредити, скарбнички, календар, аналітика та 100% приватність.",
    nav: {
      features: "Можливості",
      guide: "Як користуватися",
      screens: "Екрани",
      faq: "FAQ",
      roadmap: "Плани",
      install: "Встановити"
    },
    hero: {
      eyebrow: "<span></span> Розумний домашній бюджет",
      title: "Гроші під контролем. <em>Життя — без таблиць.</em>",
      lead: "DimFin об’єднує доходи, швидкі витрати в один дотик, місячні бюджети, кредити та скарбнички цілей. Пульс бюджету розраховує безпечний щоденний ліміт, а календар та аналітика допомагають спокійно завершити місяць. 100% приватність: без банківських карт, локальні нагадування й збереження даних виключно на вашому телефоні.",
      cta: 'Встановити DimFin <svg viewBox="0 0 20 20" aria-hidden="true"><path d="m7 4 6 6-6 6" /></svg>',
      featuresLink: "Подивитися можливості <span>↓</span>",
      proof1: '<i aria-hidden="true">✓</i> Українською',
      proof2: '<i aria-hidden="true">✓</i> Чеки, QR та біометрія',
      proof3: '<i aria-hidden="true">✓</i> Без інтернету та банків',
      proof4: '<i aria-hidden="true">✓</i> Дані лише на телефоні',
      noteTop: "<small>Прогноз залишку</small><strong>+22 372 ₴</strong>",
      noteBottom: "<small>Денний ліміт</small><strong>117 ₴/день</strong>",
      noteSide: "<small>Поточний баланс</small><strong>25 522 ₴</strong>"
    },
    features: {
      eyebrow: "<span></span> Можливості v1.4",
      title: "Не просто цифри.<br />Зрозумілі наступні дії.",
      desc: "DimFin перетворює щоденні записи на просту картину бюджету — без фінансового жаргону та перевантажених звітів.",
      pulseTitle: "Пульс бюджету та радар",
      pulseDesc: "Оцінює темп витрат, залишок і зобов'язання в реальному часі. Розраховує безпечний денний ліміт і показує індекс ризику (1–10) замість складних формул.",
      pulseTag1: "Денний ліміт",
      pulseTag2: "Прогноз залишку",
      pulseTag3: "Рівень спокою",
      radarBadge: "Оновлений радар ризику 1–10",
      receiptTitle: "Чеки, OCR та QR-коди",
      receiptDesc: "Додавайте покупки в один дотик: фотографуйте чек камерою, скануйте фіскальний QR або розпізнавайте текст чека прямо на телефоні без інтернету.",
      receiptBullet1: "🔍 <strong>Зум чеків до 6x:</strong> детальний перегляд кожної позиції.",
      receiptBullet2: "🏪 <strong>Мережі та геопозиція:</strong> АТБ, Сільпо, Novus, Biedronka, Lidl та точні координати.",
      receiptTag1: "Офлайн OCR",
      receiptTag2: "QR фіскальний",
      receiptTag3: "Масштаб 6x",
      offlineTitle: "100% приватність і безпека",
      offlineDesc: "Жодних банківських логінів, паролів і сторонніх серверів. Усі дані живуть виключно у зашифрованій пам'яті вашого смартфона.",
      offlineP1: "🔒 <strong>Біометричний захист:</strong> вхід за відбитком пальця або Face Unlock.",
      offlineP2: "🤫 <strong>Режим Flip-to-Hide:</strong> переверніть телефон екраном донизу, щоб миттєво приховати суми від сторонніх очей.",
      offlineTag1: "Face/Touch ID",
      offlineTag2: "Flip-to-Hide",
      offlineTag3: "Повний JSON-бекап",
      notifTitle: "Локальні нагадування та підсумки",
      notifDesc: "Автономні сповіщення без відправки інформації на зовнішні сервери.",
      notif1Small: "DimFin · Безпека",
      notif1Title: "Біометричний захист активний",
      notif1Desc: "Відбиток пальця, Face Unlock та системний PIN",
      notif2Small: "DimFin · Місячний підсумок",
      notif2Title: "Підсумок за вересень",
      notif2Desc: "Доходи +25 872 ₴ · Баланс +25 522 ₴"
    },
    guide: {
      eyebrow: "<span></span> Покрокова інструкція",
      title: "Почніть користуватися<br />DimFin за <em>9 кроків.</em>",
      desc: "Натискайте на кроки — поруч з’являтиметься відповідний екран застосунку. Усі приклади показані на актуальній версії 1.4.",
      downloadMain: "Завантажити гайд (PDF, UA)",
      downloadAlt: "Download Guide (PDF, EN)"
    },
    screens: {
      eyebrow: "<span></span> Реальні екрани застосунку",
      title: "Справжній DimFin.<br /><em>Без макетів.</em>",
      desc: "Від огляду місяця й календаря до скарбничок, кредитів та аналітики — подивіться, як DimFin допомагає керувати грошима щодня.",
      badge: "<i>12</i> екранів",
      hint: "← Гортайте та натискайте, щоб збільшити →"
    },
    faq: {
      eyebrow: "<span></span> Поширені запитання",
      title: "Коротко про DimFin"
    },
    roadmap: {
      eyebrow: "<span></span> Плани та оновлення",
      title: "DimFin розвивається разом із вами",
      intro: "Відгуки користувачів формують кожну нову версію застосунку.",
      note: "Порядок і склад функцій можуть адаптуватися за результатами тестування."
    },
    install: {
      badge: "Сторінка в Google Play",
      title: "Почніть бачити бюджет ясніше.",
      desc: "DimFin допоможе перетворити щоденні витрати на спокійний і реалістичний план.",
      btnSub: "Завантажити з",
      btnMain: "Google Play",
      btnAction: "Встановити",
      note: "DimFin доступний для Android. Підтримка Android 10+ (до Android 15/16 включно)."
    },
    dev: {
      eyebrow: "<span></span> Зворотний зв’язок",
      title: "Допоможіть зробити<br />DimFin <em>кращим.</em>",
      desc: "Помітили неточність, маєте ідею або хочете запропонувати нову можливість? Напишіть безпосередньо розробнику.",
      status: "<i></i> На зв’язку",
      name: "Дмитро Стукалов",
      role: "Розробник DimFin (Aivengo)",
      mailSub: "Написати на пошту",
      note: "Кожен відгук допомагає визначити, що покращувати в наступних версіях."
    },
    footer: {
      tagline: "Домашній бюджет без зайвої складності.",
      policy: "Політика конфіденційності"
    }
  },
  en: {
    metaTitle: "DimFin — Personal Finance Without Complexity",
    metaDesc: "DimFin — Private personal finance manager without connecting to bank accounts. Income, expenses, monthly budgets, loans, goals, calendar, analytics, and 100% offline privacy.",
    nav: {
      features: "Features",
      guide: "How to use",
      screens: "Screens",
      faq: "FAQ",
      roadmap: "Roadmap",
      install: "Install"
    },
    hero: {
      eyebrow: "<span></span> Smart Personal Finance",
      title: "Money under control. <em>Life — without spreadsheets.</em>",
      lead: "DimFin combines income, instant 1-tap quick expenses, monthly budgets, debt management, and savings goals. The Budget Pulse calculates your safe daily spending limit, while the calendar and analytics help you confidently end every month in the green. 100% privacy: zero bank account access, private local reminders, and data stored exclusively on your device.",
      cta: 'Install DimFin <svg viewBox="0 0 20 20" aria-hidden="true"><path d="m7 4 6 6-6 6" /></svg>',
      featuresLink: "Explore features <span>↓</span>",
      proof1: '<i aria-hidden="true">✓</i> In English, UA & PL',
      proof2: '<i aria-hidden="true">✓</i> Receipts, QR & Biometrics',
      proof3: '<i aria-hidden="true">✓</i> 100% Offline & No Banks',
      proof4: '<i aria-hidden="true">✓</i> Data stays on phone',
      noteTop: "<small>Forecast balance</small><strong>+15 812,97 €</strong>",
      noteBottom: "<small>Daily limit</small><strong>958 €/day</strong>",
      noteSide: "<small>Current balance</small><strong>15 812,97 €</strong>"
    },
    features: {
      eyebrow: "<span></span> Features v1.4",
      title: "Not just numbers.<br />Clear actionable steps.",
      desc: "DimFin turns daily transactions into a crystal-clear financial overview — without confusing jargon or bloated accounting reports.",
      pulseTitle: "Budget Pulse & Risk Radar",
      pulseDesc: "Continuously tracks your spending velocity, remaining balance, and obligations. Calculates a safe daily limit and shows an intuitive risk scale (1–10) instead of complex formulas.",
      pulseTag1: "Daily Limit",
      pulseTag2: "Forecast Balance",
      pulseTag3: "Peace of Mind Index",
      radarBadge: "Updated 1–10 Risk Radar",
      receiptTitle: "Receipts, On-Device OCR & QR",
      receiptDesc: "Log expenses instantly: snap paper receipts, scan fiscal QR codes, or extract items with on-device offline OCR without sending data over the internet.",
      receiptBullet1: "🔍 <strong>Up to 6x Zoom:</strong> inspect receipts full-screen with pinch-to-zoom.",
      receiptBullet2: "🏪 <strong>Store Chains & Geolocation:</strong> Lidl, Biedronka, Carrefour, ALDI, Shell and precise GPS coordinates.",
      receiptTag1: "Offline OCR",
      receiptTag2: "Fiscal QR",
      receiptTag3: "6x Zoom",
      offlineTitle: "100% Privacy & Security",
      offlineDesc: "No bank logins, no passwords, no third-party servers. All financial data lives solely in your device's encrypted sandbox.",
      offlineP1: "🔒 <strong>Biometric Protection:</strong> unlock with Fingerprint or Face Unlock.",
      offlineP2: "🤫 <strong>Flip-to-Hide Mode:</strong> flip your phone face down to instantly mask all numbers into secure dots (••••).",
      offlineTag1: "Face / Fingerprint",
      offlineTag2: "Flip-to-Hide",
      offlineTag3: "Full JSON Backup",
      notifTitle: "Local Reminders & Monthly Recaps",
      notifDesc: "Autonomous background reminders without transmitting personal data to cloud servers.",
      notif1Small: "DimFin · Security",
      notif1Title: "Biometric Lock Active",
      notif1Desc: "Protected by Fingerprint, Face Unlock & Device PIN",
      notif2Small: "DimFin · Monthly Recap",
      notif2Title: "September Summary",
      notif2Desc: "Income +40 040 € · Balance +15 812,97 €"
    },
    guide: {
      eyebrow: "<span></span> Step-by-Step Guide",
      title: "Get started with<br />DimFin in <em>9 simple steps.</em>",
      desc: "Tap through the steps to see the corresponding app screen. All examples feature the latest v1.4 release.",
      downloadMain: "Download Guide (PDF, EN)",
      downloadAlt: "Завантажити гайд (PDF, UA)"
    },
    screens: {
      eyebrow: "<span></span> Actual App Screens",
      title: "The Real DimFin.<br /><em>No Mockups.</em>",
      desc: "From monthly overview and calendar to savings goals, debts, and analytics — see how DimFin guides your financial life every day.",
      badge: "<i>12</i> screens",
      hint: "← Scroll and tap any screen to enlarge →"
    },
    faq: {
      eyebrow: "<span></span> Frequently Asked Questions",
      title: "DimFin at a Glance"
    },
    roadmap: {
      eyebrow: "<span></span> Plans & Updates",
      title: "DimFin evolves with you",
      intro: "User feedback directly shapes each upcoming app version.",
      note: "Feature schedule may adjust based on feedback from the European release."
    },
    install: {
      badge: "Google Play Store",
      title: "Gain clarity over your finances today.",
      desc: "DimFin transforms daily spending into a realistic, stress-free plan.",
      btnSub: "Available on",
      btnMain: "Google Play",
      btnAction: "Install",
      note: "DimFin is available for Android 10+ (up to Android 15/16). Optimized for phones, tablets & foldables."
    },
    dev: {
      eyebrow: "<span></span> Direct Feedback",
      title: "Help us make<br />DimFin <em>even better.</em>",
      desc: "Spotted an issue, have a suggestion, or want to request a new feature? Contact the developer directly.",
      status: "<i></i> Online",
      name: "Dmytro Stukalov",
      role: "Creator & Developer of DimFin (Aivengo)",
      mailSub: "Send an email",
      note: "Every message directly influences the next release roadmap."
    },
    footer: {
      tagline: "Personal finance without complexity.",
      policy: "Privacy Policy"
    }
  }
};

const screensData = {
  uk: [
    { src: "assets/overview.png", thumb: "assets/overview.png", title: "Огляд місяця", sub: "Баланс, ліміт і швидкі витрати", num: "01", framed: true },
    { src: "assets/smart-action.png", thumb: "assets/smart-action.png", title: "Розумний Радар", sub: "Денний ліміт і дія в 1 дотик", num: "02", framed: true },
    { src: "assets/receipt-options.png", thumb: "assets/receipt-options.png", title: "Додати з чека", sub: "QR-код, камера чи галерея", num: "03", framed: true },
    { src: "assets/receipt-dialog.png", thumb: "assets/receipt-dialog.png", title: "Збереження чека", sub: "Фото, мережа (АТБ) та час", num: "04", framed: true },
    { src: "assets/transactions.png", thumb: "assets/transactions.png", title: "Історія транзакцій", sub: "Пошук, фільтри та деталі", num: "05", framed: true },
    { src: "assets/calendar.png", thumb: "assets/calendar.png", title: "Календар витрат", sub: "Суми за днями й операції", num: "06", framed: false },
    { src: "assets/analytics-overview.png", thumb: "assets/analytics-overview.png", title: "Аналітика витрат", sub: "Графік динаміки та тренди", num: "07", framed: false },
    { src: "assets/goals.png", thumb: "assets/goals.png", title: "Скарбнички та Цілі", sub: "Накопичення на мрії у v1.4", num: "08", framed: true },
    { src: "assets/credits.png", thumb: "assets/credits.png", title: "Зобов'язання", sub: "Кредити, розстрочки та платіж", num: "09", framed: true },
    { src: "assets/analytics.png", thumb: "assets/analytics.png", title: "Місячні бюджети", sub: "Прогрес виконання категорій", num: "10", framed: false },
    { src: "assets/settings.png", thumb: "assets/settings.png", title: "Налаштування", sub: "Валюти UAH/EUR/USD/PLN, 3 мови", num: "11", framed: true },
    { src: "assets/settings-security.png", thumb: "assets/settings-security.png", title: "Безпека та Приватність", sub: "Face/Touch ID та Flip-to-Hide", num: "12", framed: true }
  ],
  en: [
    { src: "assets/en/overview.png", thumb: "assets/en/overview.png", title: "Monthly Overview", sub: "Balance, daily limit & quick expenses", num: "01", framed: true },
    { src: "assets/en/smart-action.png", thumb: "assets/en/smart-action.png", title: "Smart Radar", sub: "Daily allowance & 1-tap action", num: "02", framed: true },
    { src: "assets/receipt-options.png", thumb: "assets/receipt-options.png", title: "Add from Receipt", sub: "QR scanner, camera or gallery", num: "03", framed: true },
    { src: "assets/receipt-dialog.png", thumb: "assets/receipt-dialog.png", title: "Receipt Inspector", sub: "OCR text, store tag & timestamp", num: "04", framed: true },
    { src: "assets/en/transactions.png", thumb: "assets/en/transactions.png", title: "Transaction History", sub: "Search, filters & category breakdown", num: "05", framed: true },
    { src: "assets/en/calendar.png", thumb: "assets/en/calendar.png", title: "Expense Calendar", sub: "Day-by-day intensity & receipts", num: "06", framed: false },
    { src: "assets/en/analytics-overview.png", thumb: "assets/en/analytics-overview.png", title: "Analytics & Trends", sub: "6-month trends & spending curve", num: "07", framed: false },
    { src: "assets/en/goals.png", thumb: "assets/en/goals.png", title: "Goals & Jars", sub: "Target savings & progress tracking", num: "08", framed: true },
    { src: "assets/en/credits.png", thumb: "assets/en/credits.png", title: "Obligations & Loans", sub: "Scheduled payments & due dates", num: "09", framed: true },
    { src: "assets/en/analytics.png", thumb: "assets/en/analytics.png", title: "Budget Execution", sub: "Active categories & remaining allowances", num: "10", framed: false },
    { src: "assets/en/settings.png", thumb: "assets/en/settings.png", title: "Settings & Currencies", sub: "EUR/USD/UAH/PLN, 3 languages", num: "11", framed: true },
    { src: "assets/en/settings-security.png", thumb: "assets/en/settings-security.png", title: "Security & Privacy", sub: "Biometric lock & Flip-to-Hide mode", num: "12", framed: true }
  ]
};

const guideData = {
  uk: [
    { num: "01", image: "assets/settings.png", title: "Профіль, біометрія та налаштування", strong: "Налаштуйте DimFin під себе", small: "Відкрийте ⚙️ «Налаштування». Увімкніть біометричний захист, вкажіть ім'я, оберіть валюту (₴, €, $, zł) та мову (Українська, English, Polski)." },
    { num: "02", image: "assets/receipt-options.png", title: "Чеки, QR-коди, шаблони та голос", strong: "Додавайте чеки та витрати в один клік", small: "Тисніть «Додати з чека», щоб сфотографувати чек чи зчитати QR. Або використовуйте картки швидких витрат та диктуйте суму голосом 🎙️." },
    { num: "03", image: "assets/receipt-dialog.png", title: "Збереження чека з фото та мережею", strong: "Зберігайте чеки з масштабом до 6x", small: "Вибирайте улюблену мережу (АТБ, Сільпо, Lidl), зберігайте точний час і координати. Чеки можна наближати двома пальцями." },
    { num: "04", image: "assets/smart-action.png", title: "Фінансовий Радар та денний ліміт", strong: "Слідкуйте за Пульсом бюджету", small: "Радар аналізує темп витрат і показує індекс ризику (1–10) та безпечний денний ліміт із кнопкою «Застосувати ліміт» у 1 дотик." },
    { num: "05", image: "assets/goals.png", title: "Скарбнички та накопичення (v1.4)", strong: "Збирайте гроші на цілі у Скарбничках", small: "Створюйте фінансові цілі (відпустка, авто, резерв), відстежуйте прогрес у % та здійснюйте швидкі поповнення й зняття коштів." },
    { num: "06", image: "assets/analytics.png", title: "Місячні бюджети за категоріями", strong: "Контролюйте ліміти витрат", small: "У розділі «Аналітика» наочні смужки прогресу показують, скільки вже витрачено і скільки ще можна витратити по кожній категорії." },
    { num: "07", image: "assets/calendar.png", title: "Календар щоденних витрат", strong: "Оцінюйте витрати в календарі", small: "Колірна інтенсивність днів (зелений, жовтий, червоний) миттєво показує стан бюджету, а тап на день відкриває чеки за цю дату." },
    { num: "08", image: "assets/credits.png", title: "Зобов'язання, кредити та розстрочки", strong: "Керуйте зобов'язаннями без стресу", small: "Розділ зобов'язань збирає кредити, розстрочки й регулярні платежі з нагадуваннями за 3 дні та кнопкою «Позначити як сплачено»." },
    { num: "09", image: "assets/settings-security.png", title: "Flip-to-Hide та повний бекап", strong: "100% приватність і безпека", small: "Покладіть телефон екраном донизу (Flip-to-Hide), щоб замаскувати суми. Зберігайте повні резервні копії JSON або виписку в CSV." }
  ],
  en: [
    { num: "01", image: "assets/en/settings.png", title: "Profile, biometrics & preferences", strong: "Personalize DimFin to your needs", small: "Open ⚙️ 'Settings'. Enable biometric protection, enter your name, select currency (€, $, ₴, zł) and interface language (English, Ukrainian, Polish)." },
    { num: "02", image: "assets/receipt-options.png", title: "Receipts, QR codes & 1-tap templates", strong: "Log expenses in a single tap", small: "Tap 'Add from receipt' to scan fiscal QR codes or snap paper receipts. Or use pre-configured quick expense tiles and speech recognition 🎙️." },
    { num: "03", image: "assets/receipt-dialog.png", title: "Receipt inspector with up to 6x zoom", strong: "Inspect receipts with pinch-to-zoom", small: "Tag popular store chains (Lidl, Biedronka, Carrefour), capture exact timestamps, and inspect high-resolution receipts with up to 6x zoom." },
    { num: "04", image: "assets/en/smart-action.png", title: "Budget Pulse & smart risk radar", strong: "Stay ahead with Budget Pulse", small: "The Radar tracks your spending speed, calculates a safe daily allowance, and recommends a 1-tap actionable plan with a clear 1–10 risk rating." },
    { num: "05", image: "assets/en/goals.png", title: "Goals & Jars savings module (v1.4)", strong: "Save towards your dreams with Jars", small: "Set up targeted goals (vacation, car, emergency reserve), track completion percentages, and execute quick deposit or withdrawal operations." },
    { num: "06", image: "assets/en/analytics.png", title: "Category budget execution", strong: "Keep spending within limits", small: "Visual progress bars in Analytics show exactly how much you've spent and how much remains for each active category." },
    { num: "07", image: "assets/en/calendar.png", title: "Daily expense calendar", strong: "Inspect spending patterns in Calendar", small: "Color-coded daily indicators (green, yellow, red) reflect spending intensity, while tapping any day reveals all transactions from that date." },
    { num: "08", image: "assets/en/credits.png", title: "Loans, subscriptions & commitments", strong: "Manage debt & subscriptions stress-free", small: "Track monthly payments, total debt, receive private reminders 3 days ahead, and tap 'Mark as paid' to record your progress." },
    { num: "09", image: "assets/en/settings-security.png", title: "Flip-to-Hide mode & full backup", strong: "100% offline privacy & security", small: "Flip your phone face down to instantly mask all numbers (Flip-to-Hide). Export your full records into a secure JSON backup or CSV spreadsheet anytime." }
  ]
};

const faqData = {
  uk: [
    { q: "Що таке DimFin?", a: "Це автономний мобільний застосунок для домашнього бюджету, який допомагає записувати доходи й витрати, контролювати місячні бюджети, кредити, скарбнички цілей, аналізувати фінансові звички й спокійно планувати залишок коштів до кінця місяця." },
    { q: "Що можна вести в застосунку?", a: "Транзакції (з фотографіями чеків, магазинами й часом), шаблони швидких витрат, місячні бюджети, скарбнички фінансових цілей, кредити, розстрочки й регулярні підписки. Календар показує щоденну інтенсивність, а аналітика — тренди та найбільші категорії." },
    { q: "Як працює розрахунок безпечного денного ліміту?", a: "Пульс бюджету співвідносить ваш доступний залишок із кількістю днів до кінця місяця та темпом попередніх витрат. Він підказує суму (наприклад, 958 €/день), яка гарантує успішне завершення місяця без дефіциту." },
    { q: "Як працюють «Скарбнички та Цілі» (v1.4)?", a: "У новому розділі ви можете створювати цілі накопичень (наприклад, «Відпустка», «Резервний фонд»), задавати цільову суму, поповнювати або знімати кошти в один дотик та наочно бачити відсоток досягнення мети." },
    { q: "Як працює додавання та розпізнавання чеків?", a: "Ви можете сканувати фіскальні QR-коди, фотографувати чек камерою або вибирати зображення з галереї. На пристрої працює офлайн-розпізнавання тексту (Google ML Kit), прив'язка магазину та масштабування чека до 6x." },
    { q: "Чи захищений вхід у застосунок?", a: "Так, DimFin підтримує біометричний вхід: відбиток пальця, Face Unlock або PIN-код пристрою. Також є функція «Flip-to-Hide»: переверніть телефон екраном донизу, і всі суми на екрані миттєво сховаються крапками." },
    { q: "Чи можна підключити банківські картки?", a: "Ні, і це принципова позиція безпеки. DimFin не має доступу до ваших банківських рахунків, не вимагає реєстрації та не передає жодного байту на зовнішні сервери." },
    { q: "Чи підтримуються планшети та великі екрани?", a: "Так! Версія 1.4 отримала повну підтримку великих екранів, вільне обертання (Landscape/Portrait) на планшетах та підтримку розділеного екрана (Split-Screen)." },
    { q: "Як перенести дані на новий телефон?", a: "У налаштуваннях натисніть «Зберегти резервну копію». Створиться безпечний JSON-файл з усіма записами, чеками та бюджетами. На новому пристрої просто натисніть «Відновити з резервної копії»." },
    { q: "Де завантажити DimFin?", a: "Застосунок доступний у Google Play за прямим посиланням на цьому сайті. Реліз v1.4 відкрито для України та країн Європейського Союзу." }
  ],
  en: [
    { q: "What is DimFin?", a: "DimFin is an offline personal finance application that helps you track income and expenses, manage monthly budgets, loans, financial goals, understand spending habits, and comfortably plan your month-end balance." },
    { q: "What can I manage inside the app?", a: "Transactions (with receipt photos, store chains, and timestamps), 1-tap quick expense tiles, monthly category budgets, savings goals & jars, loans, installment plans, and recurring subscriptions. The calendar visualizes daily spending pace, while analytics displays trends and top spending categories." },
    { q: "How does the safe daily spending limit work?", a: "The Budget Pulse compares your remaining liquid funds against the days left in the month and your current spending speed. It computes a daily allowance (e.g. 958 €/day) that ensures you comfortably finish the month without a deficit." },
    { q: "How does 'Goals & Jars' work in v1.4?", a: "In this new module, you can establish dedicated savings targets (such as 'Vacation', 'Emergency Fund'), set target amounts, log quick deposits or withdrawals in one tap, and visually monitor your percentage completion." },
    { q: "How does receipt scanning and OCR work?", a: "You can scan fiscal QR codes, take receipt photos with your camera, or pick images from your gallery. On-device OCR (Google ML Kit) extracts details completely offline, with store tagging and up to 6x pinch-to-zoom inspection." },
    { q: "Is the app protected against unauthorized access?", a: "Yes. DimFin supports biometric authentication via Fingerprint, Face Unlock, or device PIN. It also features 'Flip-to-Hide': simply turn your phone face down to instantly mask all financial figures with dots." },
    { q: "Can I connect my bank accounts?", a: "No, and that is our core privacy philosophy. DimFin never requests banking credentials, requires no user account, and transmits zero data to external cloud servers." },
    { q: "Does DimFin support tablets and foldables?", a: "Yes! Version 1.4 includes full optimization for large screens, free orientation rotation on tablets, and multi-window Split-Screen support." },
    { q: "How do I transfer data to a new phone?", a: "Go to Settings and tap 'Export Backup'. A secure JSON file will be created with all your transactions, attached receipts, and budgets. On your new phone, just tap 'Import Backup'." },
    { q: "Where can I download DimFin?", a: "DimFin is available on the Google Play Store via the direct link on this website. Version 1.4 is rolled out for Ukraine and European Union countries." }
  ]
};

const roadmapData = {
  uk: [
    { num: "01", done: true, title: "Режим приватності Flip-to-Hide", desc: "Миттєве маскування сум балансу й витрат переворотом телефону екраном донизу. (✓ Реалізовано у v1.4)" },
    { num: "02", done: true, title: "Біометричний захист", desc: "Вхід за відбитком пальця або Face Unlock для максимальної конфіденційності. (✓ Реалізовано у v1.4)" },
    { num: "03", done: true, title: "Скарбнички та фінансові цілі", desc: "Наочне накопичення на мрії з прогресом і швидким поповненням/зняттям. (✓ Реалізовано у v1.4)" },
    { num: "04", done: true, title: "Підписки та регулярні зобов'язання", desc: "Контроль кредитів, розстрочок і щомісячних сервісів із локальними нагадуваннями. (✓ Реалізовано у v1.4)" },
    { num: "05", done: true, title: "Мультивалютність та тримовність", desc: "Підтримка UAH, EUR, USD, PLN та локалізація українською, англійською й польською мовами. (✓ Реалізовано у v1.4)" },
    { num: "06", done: false, title: "Вбудований калькулятор", desc: "Швидкі обчислення та додавання кількох сум прямо в полі введення без переходу в сторонні програми." },
    { num: "07", done: false, title: "Теги для операцій", desc: "Гнучкий контекст до категорій (#відпустка, #ремонт, #подарунок) для точної аналітики подій." },
    { num: "08", done: false, title: "Дні без витрат", desc: "Мотиваційні страйки усвідомленого споживання та відмітки дисциплінованих днів у календарі." },
    { num: "09", done: false, title: "Спільний сімейний бюджет", desc: "Синхронізація між смартфонами сім’ї: прозорий облік спільних витрат і збереження особистої приватності." }
  ],
  en: [
    { num: "01", done: true, title: "Flip-to-Hide Privacy Mode", desc: "Instantly mask all balances and expenses by flipping the phone face down. (✓ Implemented in v1.4)" },
    { num: "02", done: true, title: "Biometric Protection", desc: "Fingerprint & Face Unlock protection every time you open the app. (✓ Implemented in v1.4)" },
    { num: "03", done: true, title: "Goals & Jars Savings Module", desc: "Visual savings goals with progress tracking and quick deposits/withdrawals. (✓ Implemented in v1.4)" },
    { num: "04", done: true, title: "Subscriptions & Commitments", desc: "Track loans, installments, and recurring commitments with private local alerts. (✓ Implemented in v1.4)" },
    { num: "05", done: true, title: "Multi-Currency & 3 Languages", desc: "Support for EUR, USD, UAH, PLN with full English, Ukrainian, and Polish localization. (✓ Implemented in v1.4)" },
    { num: "06", done: false, title: "In-line Calculator", desc: "Quick math and summing multiple figures directly inside amount input fields." },
    { num: "07", done: false, title: "Transaction Tags", desc: "Flexible tags (#vacation, #home-renovation, #gift) for detailed project analytics." },
    { num: "08", done: false, title: "No-Spend Days", desc: "Mindful spending streaks and disciplined no-spend day markers in the calendar." },
    { num: "09", done: false, title: "Shared Household Budget", desc: "Private multi-device sync for family budgeting without compromising personal privacy." }
  ]
};

function renderScreens(lang) {
  const rail = document.querySelector(".screen-rail");
  if (!rail) return;
  const items = screensData[lang] || screensData.uk;
  rail.innerHTML = items.map((item) => `
    <button class="screen-shot-card" type="button" data-screenshot="${item.src}" data-caption="${item.title}">
      <span class="screen-device ${item.framed ? 'screen-device-framed' : ''}"><img src="${item.thumb}" alt="${item.title}" loading="lazy" decoding="async" /></span>
      <span class="screen-caption"><i>${item.num}</i><span><strong>${item.title}</strong><small>${item.sub}</small></span></span>
    </button>
  `).join("");

  // Re-bind click handlers for modal
  rail.querySelectorAll(".screen-shot-card").forEach((card) => {
    card.addEventListener("click", () => {
      if (!screenshotDialog || !dialogImage || !dialogCaption) return;
      dialogImage.src = card.dataset.screenshot;
      dialogImage.alt = card.dataset.caption || "DimFin Screen";
      dialogCaption.textContent = card.dataset.caption || "DimFin";
      screenshotDialog.showModal();
    });
  });
}

function renderGuideSteps(lang) {
  const stepsContainer = document.querySelector(".guide-steps");
  if (!stepsContainer) return;
  const steps = guideData[lang] || guideData.uk;
  stepsContainer.innerHTML = steps.map((s, idx) => `
    <button
      class="guide-step ${idx === 0 ? 'is-active' : ''}"
      type="button"
      role="tab"
      aria-selected="${idx === 0 ? 'true' : 'false'}"
      data-guide-step="${idx + 1}"
      data-guide-image="${s.image}"
      data-guide-title="${s.title}"
    >
      <span class="guide-step-number">${s.num}</span>
      <span class="guide-step-copy">
        <strong>${s.strong}</strong>
        <small>${s.small}</small>
      </span>
      <span class="guide-step-arrow" aria-hidden="true">→</span>
    </button>
  `).join("");

  const newSteps = [...stepsContainer.querySelectorAll("[data-guide-step]")];
  newSteps.forEach((step) => {
    step.addEventListener("click", () => {
      newSteps.forEach((item) => {
        const isCurrent = item === step;
        item.classList.toggle("is-active", isCurrent);
        item.setAttribute("aria-selected", String(isCurrent));
      });

      if (guidePreviewImage) {
        guidePreviewImage.src = step.dataset.guideImage;
        guidePreviewImage.alt = step.dataset.guideTitle || "DimFin Screen";
        const isUnframed = step.dataset.guideImage?.endsWith("calendar.png") ||
                           step.dataset.guideImage?.endsWith("analytics.png") ||
                           step.dataset.guideImage?.endsWith("analytics-overview.png") ||
                           step.dataset.guideImage?.endsWith("voice-input.png") ||
                           step.dataset.guideImage?.endsWith("goals.png");
        guidePhone?.classList.toggle("is-framed-screenshot", !isUnframed);
      }
      if (guidePreviewTitle) guidePreviewTitle.textContent = step.dataset.guideTitle;
      if (guideCount) {
        guideCount.textContent = lang === "en" 
          ? `Step ${step.dataset.guideStep} of ${newSteps.length}` 
          : `Крок ${step.dataset.guideStep} із ${newSteps.length}`;
      }
    });
  });

  // Reset preview to step 1
  if (steps.length > 0 && guidePreviewImage && guidePreviewTitle) {
    guidePreviewImage.src = steps[0].image;
    guidePreviewTitle.textContent = steps[0].title;
    guidePreviewImage.alt = steps[0].title;
    if (guideCount) {
      guideCount.textContent = lang === "en" ? `Step 1 of ${steps.length}` : `Крок 1 із ${steps.length}`;
    }
  }
}

function renderFAQ(lang) {
  const faqList = document.querySelector(".faq-list");
  if (!faqList) return;
  const items = faqData[lang] || faqData.uk;
  faqList.innerHTML = items.map((item, idx) => `
    <details ${idx === 0 ? 'open' : ''}>
      <summary>${item.q}<span aria-hidden="true">＋</span></summary>
      <p>${item.a}</p>
    </details>
  `).join("");

  // Re-bind accordion exclusive toggle
  const newDetails = [...faqList.querySelectorAll("details")];
  newDetails.forEach((item) => {
    item.addEventListener("toggle", () => {
      if (!item.open) return;
      newDetails.forEach((other) => {
        if (other !== item) other.open = false;
      });
    });
  });
}

function renderRoadmap(lang) {
  const roadmapList = document.querySelector(".roadmap-list");
  if (!roadmapList) return;
  const items = roadmapData[lang] || roadmapData.uk;
  roadmapList.innerHTML = items.map((item) => `
    <article class="roadmap-item ${item.done ? 'roadmap-item-done' : ''}">
      <span class="roadmap-icon" aria-hidden="true" style="${item.done ? 'background: var(--green); color: var(--ink); font-weight: 800;' : ''}">${item.done ? '✓' : item.num}</span>
      <div>
        <strong>${item.title}</strong>
        <p>${item.desc}</p>
      </div>
    </article>
  `).join("");
}

function setLanguage(lang) {
  const t = i18n[lang] || i18n.uk;
  document.documentElement.lang = lang;

  // Update Lang Buttons
  langBtns.forEach((btn) => {
    btn.classList.toggle("is-active", btn.dataset.langBtn === lang);
  });

  // Update Page Title
  document.title = t.metaTitle;
  const metaDesc = document.querySelector('meta[name="description"]');
  if (metaDesc) metaDesc.content = t.metaDesc;

  // Simple text/html replacements via data-i18n
  document.querySelectorAll("[data-i18n]").forEach((el) => {
    const key = el.dataset.i18n;
    const parts = key.split(".");
    let val = t;
    for (const p of parts) {
      if (val) val = val[p];
    }
    if (val !== undefined) {
      el.innerHTML = val;
    }
  });

  // Hero Image
  if (heroImage) {
    heroImage.src = lang === "en" ? "assets/en/overview.png" : "assets/overview.png";
  }

  // PDF Guide Links
  const uaPdf = "assets/dimfin-guide-for-beginners-ua.pdf";
  const enPdf = "assets/dimfin-guide-for-beginners-en.pdf";

  if (navGuideLink) {
    navGuideLink.href = lang === "en" ? enPdf : uaPdf;
    navGuideLink.textContent = t.nav.guide;
  }
  if (guideDownloadMain) {
    guideDownloadMain.href = lang === "en" ? enPdf : uaPdf;
    const label = guideDownloadMain.querySelector("[data-i18n]");
    if (label) label.textContent = t.guide.downloadMain;
  }
  if (guideDownloadAlt) {
    guideDownloadAlt.href = lang === "en" ? uaPdf : enPdf;
    const label = guideDownloadAlt.querySelector("[data-i18n]");
    if (label) label.textContent = t.guide.downloadAlt;
  }

  // Render dynamic sections
  renderScreens(lang);
  renderGuideSteps(lang);
  renderFAQ(lang);
  renderRoadmap(lang);

  localStorage.setItem("dimfin_lang", lang);
}

// Language switch handlers
langBtns.forEach((btn) => {
  btn.addEventListener("click", () => {
    setLanguage(btn.dataset.langBtn);
  });
});

// Initial Language setup
const savedLang = localStorage.getItem("dimfin_lang") || "uk";
setLanguage(savedLang);
