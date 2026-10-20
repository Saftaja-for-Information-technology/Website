(function() {
    var requestedLanguage = new URLSearchParams(window.location.search).get("lang");
    if (!requestedLanguage || requestedLanguage.toLowerCase() !== "ar") return;
    var root = document.documentElement;
    root.lang = "ar";
    root.dir = "rtl";
    root.classList.add("is-ar");
    function node(selector) {
        return document.querySelector(selector);
    }
    function text(selector, value) {
        var target = node(selector);
        if (target) target.textContent = value;
    }
    function html(selector, value) {
        var target = node(selector);
        if (target) target.innerHTML = value;
    }
    function attr(selector, name, value) {
        var target = node(selector);
        if (target) target.setAttribute(name, value);
    }
    function leadingText(selector, value) {
        var target = node(selector);
        if (!target) return;
        for (var i = 0; i < target.childNodes.length; i += 1) {
            var child = target.childNodes[i];
            if (child.nodeType === Node.TEXT_NODE && child.nodeValue.trim()) {
                child.nodeValue = "\n                " + value + "\n                ";
                return;
            }
        }
        target.insertBefore(document.createTextNode(value + " "), target.firstChild);
    }
    function setList(container, selector, values) {
        var items = container ? container.querySelectorAll(selector) : [];
        values.forEach(function(value, index) {
            if (items[index]) items[index].textContent = value;
        });
    }
    document.title = "SVP — النموذج العربي";
    attr('meta[name="description"]', "content", "نموذج سطح مكتب لحركة واجهة موقع SVP ولوحة التاجر.");
    text(".skip-link", "انتقل إلى النموذج");
    attr(".svp-logo", "aria-label", "الصفحة الرئيسية لشركة Smart Value Payments");
    attr(".hero-nav", "aria-label", "التنقل الرئيسي");
    text("[data-nav-solutions]", "الحلول");
    text("[data-nav-solutions-overview]", "استكشف الحلول");
    text("[data-nav-places]", "مواقع عملك");
    text("[data-nav-security]", "الأمان");
    text("[data-nav-contact]", "تواصل معنا");
    text("[data-nav-products]", "المنتجات");
    document.querySelectorAll(".nav-products:not(.nav-solutions) .nav-products__panel a").forEach(function(link) {
        link.href += "?lang=ar";
    });
    text(".hero-header-cta .fintechx-button__label", "تحدث مع فريقنا");
    var languageLink = node(".hero-language-link");
    if (languageLink) {
        languageLink.href = "index.html";
        languageLink.lang = "en";
        languageLink.dir = "ltr";
        languageLink.textContent = "EN";
        languageLink.setAttribute("aria-label", "عرض النسخة الإنجليزية");
    }
    text(".hero-menu-button .sr-only", "فتح قائمة التنقل");
    text(".hero-eyebrow .svp-eyebrow__label", "شركة سعودية لحلول الدفع الذكية");
    html("#hero-title", "حلول دفع ذكية <br><span>نمو مستدام!</span>");
    text(".hero-description", "من الرياض، تبني SVP حلول دفع ذكية وآمنة تدفع أعمالك إلى الأمام: قبول للمدفوعات، ومتابعة دقيقة لعملياتك المالية، وإدارة كاملة لأجهزتك — ضمن حلول تعمل معًا كمنظومة واحدة متكاملة.");
    text(".hero-primary-cta .fintechx-button__label", "استكشف الحلول");
    text(".hero-demo-button", "اطلب عرضًا تجريبيًا");
    attr(".dashboard-section", "aria-label", "لوحة مبيعات تجريبية للتاجر");
    attr(".side-nav", "aria-label", "التنقل في بوابة التاجر");
    setList(node(".side-nav"), "button span", [ "نظرة عامة", "المعاملات", "المبيعات", "المدفوعات", "التحليلات", "العملاء", "الإعدادات" ]);
    text(".ops-brand small", "بوابة التاجر");
    leadingText(".system-state span", "المدفوعات تعمل");
    text(".system-state strong", "جميع القنوات تعمل");
    text(".system-state small", "تم التحديث منذ لحظات");
    text(".workspace-name small", "مساحة العمل");
    text(".workspace-name strong", "لوحة التاجر");
    text(".ops-search .sr-only", "البحث في نشاط التاجر");
    attr(".ops-search input", "placeholder", "ابحث في المبيعات والمعاملات والعملاء…");
    attr(".topbar-actions .icon-button", "aria-label", "الإشعارات");
    leadingText(".profile-button strong", "تاجر تجريبي");
    text(".profile-button small", "مدير المتجر");
    text(".page-heading p", "تاجر تجريبي / اليوم");
    text(".page-heading h2", "نظرة عامة على المبيعات");
    text(".page-heading>div>span", "تابع المبيعات والمعاملات ومعدلات القبول وأحدث النشاط.");
    setList(node(".page-actions"), "button", [ "تنزيل التقرير", "عرض المعاملات" ]);
    attr(".kpi-grid", "aria-label", "نظرة عامة على أداء التاجر");
    text(".kpi-card-tinted .trend", "اليوم");
    text(".kpi-card-tinted p", "المعاملات");
    [ [ ".travel-card-active", "اليوم", "إجمالي المبيعات" ], [ ".travel-card-merchants", "مباشر", "معدل القبول" ], [ ".travel-card-overview", "اليوم", "متوسط قيمة المعاملة" ] ].forEach(function(item) {
        text(item[0] + " .trend", item[1]);
        text(item[0] + " p", item[2]);
    });
    text(".overview-mini--approval i", "متوسط");
    text(".performance-panel h3", "أداء المبيعات");
    text(".performance-panel header p", "حجم مبيعات تجريبي مقبول");
    attr(".period-switch", "aria-label", "الفترة الزمنية للرسم");
    setList(node(".period-switch"), "button", [ "يوم", "أسبوع", "شهر" ]);
    attr(".activity-chart", "aria-label", "حجم المبيعات التجريبي المقبول من سبتمبر إلى أغسطس");
    setList(node(".chart-x"), "span", [ "٩", "١٠", "١١", "١٢", "١", "٢", "٣", "٤", "٥", "٦", "٧", "٨" ]);
    text(".merchant-panel-head h3", "أحدث المعاملات");
    text(".merchant-panel-head p", "آخر نشاط تجريبي");
    text(".merchant-view-all", "عرض الكل");
    attr(".merchant-compact-list", "aria-label", "أحدث المعاملات التجريبية");
    document.querySelectorAll(".merchant-compact-row .is-approved").forEach(function(item) {
        item.textContent = "مقبولة";
    });
    document.querySelectorAll(".merchant-compact-row .is-refunded").forEach(function(item) {
        item.textContent = "مستردة";
    });
    attr(".payments-section", "aria-label", "قبول المدفوعات");
    attr(".payment-marquee", "aria-label", "وسائل الدفع المقبولة");
    text(".trust-badges-eyebrow .svp-eyebrow__label", "الثقة والامتثال");
    text("#trust-badges-title", "مصممة في المملكة، ومتوافقة مع معاييرها");
    var trustCards = document.querySelectorAll(".trust-badge");
    var trustCopy = [ [ "البنك المركزي السعودي", "منتجات القبول خاضعة لإجراءات الترخيص" ], [ "تصنيع محلي", "مذكرة تفاهم لتصنيع الأجهزة محليًا" ], [ "رؤية السعودية 2030", "دعم التحول الرقمي والشمول المالي" ] ];
    trustCopy.forEach(function(copy, index) {
        if (!trustCards[index]) return;
        var heading = trustCards[index].querySelector("h3");
        var paragraph = trustCards[index].querySelector("p");
        if (heading) heading.textContent = copy[0];
        if (paragraph) paragraph.textContent = copy[1];
    });
    text(".places-eyebrow .svp-eyebrow__label", "القسم المميز");
    text("#places-title", "حلول تتحرك مع أعمالك");
    text(".places-lede", "ثلاثة مواقع يتحرك فيها عملك كل يوم، ولكل موقع حل مصمم له.");
    attr(".places-list", "aria-label", "مواقع عملك");
    var placeItems = document.querySelectorAll(".places-item");
    var placeCopy = [ [ "في المحل", "عند الكاشير، جهاز Smart POS يقبل البطاقات والدفع اللاتلامسي بسرعة تناسب زحمة المحل." ], [ "خارج المحل", "في التوصيل والمعارض والمواقع المؤقتة، جوال مندوبك يقبل الدفع عبر تطبيق SVP SoftPOS دون أي جهاز إضافي." ], [ "في الإدارة المالية", "فريقك المالي يتابع حركة الحسابات والرسوم والضرائب، وتتم تسوية المعاملات آليًا عبر منصة SVP Dashboard." ] ];
    placeCopy.forEach(function(copy, index) {
        var item = placeItems[index];
        if (!item) return;
        var heading = item.querySelector("h3");
        var number = heading ? heading.querySelector("b") : null;
        if (heading) {
            heading.textContent = copy[0];
            if (number) heading.insertBefore(number, heading.firstChild);
        }
        var paragraph = item.querySelector(".places-reveal p");
        if (paragraph) paragraph.textContent = copy[1];
    });
    var placeImages = document.querySelectorAll(".places-slide img");
    var placeAlts = [ "عميل يمرر بطاقة لاتلامسية على جهاز دفع عند نقطة البيع", "موظف ميداني يحمل جهازًا متنقلًا في أحد شوارع الرياض", "لوحة منصة SVP Dashboard للعمليات المالية على حاسوب محمول" ];
    placeAlts.forEach(function(value, index) {
        if (placeImages[index]) placeImages[index].alt = value;
    });
    text(".solutions-head .svp-eyebrow__label", "أربعة حلول متكاملة");
    html("#solutions-title", "وين ما كنت في رحلتك،<br>عندنا اللي يناسبك");
    text(".solutions-head > p:last-child", "تبدأ من الصفر أو تدير مئات الأجهزة؟ لكل مرحلة في نمو تجارتك حلّ صُمم لها.");
    var solutionCards = document.querySelectorAll(".solution-card");
    var solutionCopy = [ {
        stage: "تبدأ الآن",
        title: "جوالك هو جهازك الأول",
        product: "SVP SoftPOS",
        description: "مشروعك صغير أو متنقل؟ لا تشترِ جهازًا بعد. حمّل تطبيق SVP SoftPOS على أي جوال أندرويد 10 فأحدث يدعم NFC، وابدأ قبول المدفوعات في دقائق — بلا أي عتاد إضافي.",
        bullets: [ "تفعيل فوري من الجوال مباشرة", "مثالي لأصحاب المشاريع الصغيرة والتجار المتنقلين", "مشمول بشهادة PCI MPoC لأمن المدفوعات" ],
        cta: "جرّب SoftPOS"
    }, {
        stage: "تنمو وتتوسع",
        title: "جهاز يواكب زحمة يومك",
        product: "Smart POS",
        description: "محل يزدحم؟ فروع تكبر؟ جهاز Smart POS بنظام أندرويد 13 صُمم ليتحمل ضغط البيع اليومي: شاشة لمس، اتصال 4G وWi-Fi، وقبول بطاقات ودفع لاسلكي بكل المعايير الدولية المعتمدة.",
        bullets: [ "أندرويد 13 ومعالج رباعي النواة", "NFC وبطاقات ذكية وقارئ باركود مدمج", "بطارية تكمل يومك واتصال لا ينقطع" ],
        cta: "اكتشف Smart POS"
    }, {
        stage: "تدير أرقامًا أكبر",
        title: "عملياتك المالية تحت السيطرة",
        product: "SVP Dashboard — منصة العمليات المالية",
        description: "حين تكبر الأرقام، تكبر التفاصيل. تجمع منصة SVP Dashboard مراقبة حساباتك لحظة بلحظة، وإدارة الرسوم والضرائب، وتسوية المعاملات آليًا — في مكان واحد، وبأخطاء أقل.",
        bullets: [ "مراقبة الحركة وتنبيهات فورية عن النشاط غير المعتاد", "احتساب الرسوم والضرائب بدقة تدعم الامتثال", "مطابقة آلية بين الحسابات وسجلات دقيقة" ],
        cta: "تعرّف على SVP Dashboard"
    }, {
        stage: "تشغّل أسطولًا من الأجهزة",
        title: "كل أجهزتك في نظرة واحدة",
        product: "TSM — إدارة مخزون الأجهزة",
        description: "لفرق العمليات التي تدير عشرات الأجهزة أو مئاتها: نظّم المتوفر منها، سجّل الكميات، وتابع حالة كل جهاز — من شاشة مركزية واحدة بدل جداول متفرقة.",
        bullets: [ "عرض مركزي موحد لكل الأجهزة", "تسجيل الكميات وتتبع التوفر", "متابعة حالة الأجهزة أولًا بأول" ],
        cta: "استكشف TSM"
    } ];
    solutionCopy.forEach(function(copy, index) {
        var card = solutionCards[index];
        if (!card) return;
        var stage = card.querySelector(".solution-card__stage");
        var titleNode = card.querySelector(".solution-card__title");
        var product = card.querySelector(".solution-card__product");
        var description = card.querySelector(".solution-card__detail > p");
        var cue = card.querySelector(".solution-card__cue");
        var cta = card.querySelector(".solution-card__cta");
        if (stage) stage.textContent = copy.stage;
        if (titleNode) titleNode.textContent = copy.title;
        if (product) product.textContent = copy.product;
        if (description) description.textContent = copy.description;
        if (cue) leadingText(".solution-card:nth-of-type(" + (index + 1) + ") .solution-card__cue", "التفاصيل");
        setList(card, ".solution-card__detail li", copy.bullets);
        if (cta) leadingText(".solution-card:nth-of-type(" + (index + 1) + ") .solution-card__cta", copy.cta);
    });
    [ "softpos", "smart-pos", "sutms", "tsm" ].forEach(function(slug, index) {
        var cta = solutionCards[index] && solutionCards[index].querySelector(".solution-card__cta");
        if (cta) cta.href = "products/" + slug + ".html?lang=ar";
    });
    text(".security-eyebrow .svp-eyebrow__label", "الأمان والامتثال");
    text("#security-title", "السرعة بلا أمان ليست تقدّمًا.");
    text(".security-lede", "لهذا يسبق الأمان كل ما نبنيه. كل عملية دفع تمر عبر معايير دولية، وكل منتج يمضي في مساره التنظيمي بوضوح كامل.");
    text(".security-link span", "اقرأ عن شهادة PCI MPoC");
    leadingText(".sec-stamp", "معتمد");
    text(".sec-tile__label", "الحماية");
    var securityCards = document.querySelectorAll(".sec-tile");
    var securityCopy = [ [ "شهادة PCI MPoC — محقّقة رسميًا", "المعيار العالمي لأمان قبول المدفوعات عبر الأجهزة الذكية، ويغطي حل SoftPOS لدينا — حماية للعملية وبيانات حاملها معًا." ], [ "تشفير وحماية بيانات في كل طبقة", "من لحظة تمرير البطاقة إلى اكتمال العملية، تُعامل بيانات عملائك بأعلى درجات الحماية." ], [ "مسار تنظيمي واضح", "نعمل بشفافية كاملة مع الجهات التنظيمية في المملكة، ونلتزم بمتطلباتها في كل مرحلة." ], [ "شفافية على مستوى كل منتج", "تطوّر SVP حلولها مع مراعاة معايير الأمان ومتطلبات قطاع المدفوعات، وتُعرض الحالة التنظيمية الخاصة بكل منتج بوضوح في صفحته." ] ];
    securityCopy.forEach(function(copy, index) {
        var card = securityCards[index];
        if (!card) return;
        var heading = card.querySelector("h3");
        var paragraphs = card.querySelectorAll("p:not(.sec-tile__label)");
        if (heading) heading.textContent = copy[0];
        if (paragraphs.length) paragraphs[paragraphs.length - 1].textContent = copy[1];
    });
    [ "تقديم البطاقة", "أثناء النقل", "أثناء التخزين", "اكتمال العملية" ].forEach(function(value, index) {
        leadingText(".sec-layer:nth-child(" + (index + 1) + ")", value);
    });
    html(".sec-ribbon p", "<strong>الحالة التنظيمية:</strong> منتجات القبول تخضع لإجراءات الترخيص لدى البنك المركزي السعودي (ساما).");
    text(".news-eyebrow .svp-eyebrow__label", "غرفة الأخبار");
    text("#news-title", "آخر مستجداتنا");
    text(".news-lede", "خطوات جديدة في أمن المدفوعات ودعم المحتوى المحلي.");
    text(".news-all span", "جميع الأخبار");
    var newsCards = document.querySelectorAll(".news-card");
    var newsCopy = [ [ "تصنيع محلي", "خطوة نحو تصنيع أجهزة نقاط البيع محليًا", "مذكرة تفاهم بالتعاون مع شركاء في القطاعين الصناعي والتقني، دعمًا للمحتوى المحلي ولتطوير منظومة المدفوعات الرقمية في المملكة." ], [ "أمن المدفوعات", "SVP تحصل رسميًا على شهادة PCI MPoC", "إنجاز يعكس التزام الشركة بأمان أنظمة الدفع وحماية بيانات العملاء وفق أعلى المعايير الدولية." ] ];
    newsCopy.forEach(function(copy, index) {
        var card = newsCards[index];
        if (!card) return;
        var chip = card.querySelector(".news-chip");
        var heading = card.querySelector(".news-card__link");
        var paragraph = card.querySelector(".news-card__body > p");
        var cue = card.querySelector(".news-card__cue");
        if (chip) chip.textContent = copy[0];
        if (heading) heading.textContent = copy[1];
        if (paragraph) paragraph.textContent = copy[2];
        if (cue) leadingText(".news-card:nth-child(" + (index + 1) + ") .news-card__cue", "اقرأ الخبر");
    });
    var newsImages = document.querySelectorAll(".news-card__image");
    if (newsImages[0]) newsImages[0].alt = "صفوف من أجهزة نقاط البيع على خط فحص إنتاجي";
    if (newsImages[1]) newsImages[1].alt = "عميل يقدّم بطاقة لاتلامسية إلى جوال التاجر عند الدفع";
    var newsAll = node(".news-all");
    if (newsAll) newsAll.href = "news/index.html?lang=ar";
    var newsLinks = document.querySelectorAll(".news-card__link");
    if (newsLinks[0]) newsLinks[0].href = "news/local-manufacturing.html?lang=ar";
    if (newsLinks[1]) newsLinks[1].href = "news/pci-mpoc-certification.html?lang=ar";
    var certificationLink = node(".security-link");
    if (certificationLink) certificationLink.href = "news/pci-mpoc-certification.html?lang=ar";
    text(".faq-eyebrow .svp-eyebrow__label", "الأسئلة الشائعة");
    text("#faq-title", "إجابات لأسئلتك الأكثر شيوعًا");
    text(".faq-face--you", "أنت");
    text(".faq-support__copy h3", "لديك أسئلة أخرى؟");
    text(".faq-support__copy p", "تواصل معنا، وسيرشدك فريقنا.");
    text(".faq-support__cta .fintechx-button__label", "تحدث مع فريقنا");
    var faqItems = document.querySelectorAll(".faq-item");
    var faqCopy = [ [ "ما الحلول التي تقدمها SVP؟", "جهاز نقاط بيع ذكي، وحل SoftPOS عبر تطبيق SVP SoftPOS، ومنصة SVP Dashboard للعمليات المالية، ونظام TSM لإدارة مخزون الأجهزة الطرفية." ], [ "هل يعمل SVP SoftPOS على أي جوال؟", "يتطلب الحل جهاز أندرويد يعمل بنظام Android 10 أو أحدث ويدعم تقنية NFC." ], [ "ماذا تغطي منصة SVP Dashboard؟", "مراقبة الحسابات مع تنبيهات فورية، وإدارة الرسوم والضرائب، وتسوية المعاملات آليًا. وهي منصة عمليات مالية، وليست منصة قبول دفع." ], [ "ما الحالة التنظيمية للمنتجات؟", "منتجات القبول تخضع لإجراءات الترخيص لدى البنك المركزي السعودي، وتُعرض حالة كل منتج بوضوح في صفحته." ], [ "هل يمكن البدء بحل واحد ثم التوسع لاحقًا؟", "نعم. تعمل الحلول منفردة وتتكامل عند الحاجة — ابدأ بما يناسب مرحلتك اليوم، ووسّع حين تتطور عملياتك." ] ];
    faqCopy.forEach(function(copy, index) {
        var item = faqItems[index];
        if (!item) return;
        var question = item.querySelector(".faq-q > span:first-child");
        var answer = item.querySelector(".faq-a__inner p");
        if (question) question.textContent = copy[0];
        if (answer) answer.textContent = copy[1];
    });
    text(".cta-eyebrow .svp-eyebrow__label", "ابدأ الآن");
    html("#contact-title", "السوق يتقدّم. <br>تقدّم معه.");
    text(".cta-lead", "شاركنا احتياجك وطريقة التشغيل الحالية، وسنساعدك على تحديد الحل الأقرب لفريقك.");
    text(".cta-primary .fintechx-button__label", "تحدث مع فريقنا");
    text(".cta-ghost", "استكشف الحلول");
    text(".cta-baseline__place", "المملكة العربية السعودية، الرياض، حي الفلاح، شارع الميزان");
    text("#footer-title", "تذييل الموقع");
    attr(".footer-totop", "aria-label", "العودة إلى الأعلى");
    attr(".footer-brand__logo", "aria-label", "الصفحة الرئيسية لشركة Smart Value Payments");
    text(".footer-brand p", "حلول دفع ذكية تدعم وضوح التشغيل واستدامة النمو.");
    var footerPanels = document.querySelectorAll(".footer-panel");
    if (footerPanels[0]) {
        text(".footer-panel:nth-child(1) .footer-panel__title", "الشركة");
        setList(footerPanels[0], ".footer-links a", [ "الرئيسية", "الحلول", "مواقع عملك", "الأمان", "الأخبار", "الأسئلة", "تواصل معنا" ]);
        var footerNews = footerPanels[0].querySelector('a[href="news/index.html"]');
        if (footerNews) footerNews.href = "news/index.html?lang=ar";
    }
    if (footerPanels[1]) {
        text(".footer-panel:nth-child(2) .footer-panel__title", "الحلول");
        setList(footerPanels[1], ".footer-links a", [ "Smart POS", "SVP SoftPOS", "SVP Dashboard", "TSM", "تحدث مع فريقنا", "اطلب عرضًا تجريبيًا", "info@saftaja.com.sa" ]);
        var footerProductLinks = footerPanels[1].querySelectorAll(".footer-links ul:first-child a");
        [ "smart-pos", "softpos", "sutms", "tsm" ].forEach(function(slug, index) {
            if (footerProductLinks[index]) footerProductLinks[index].href = "products/" + slug + ".html?lang=ar";
        });
    }
    html(".footer-regulatory", '<svg viewBox="0 0 24 24" aria-hidden="true"><path d="M12 3 4 6.5v5.9c0 5.3 3.4 8.6 8 9.6 4.6-1 8-4.3 8-9.6V6.5L12 3Z"/><path d="m8.6 12.2 2.3 2.3 4.7-4.7"/></svg>منتجات القبول تخضع لإجراءات الترخيص لدى البنك المركزي السعودي.');
    text(".footer-baseline__start", "المملكة العربية السعودية، الرياض، حي الفلاح، شارع الميزان");
    text(".footer-baseline__center", "© 2026 SVP. جميع الحقوق محفوظة.");
    document.querySelectorAll('a[href="contact.html"]').forEach(function(link) {
        link.href = "contact.html?lang=ar";
    });
})();
