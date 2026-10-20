(function() {
    var params = new URLSearchParams(window.location.search);
    var isArabic = params.get("lang") === "ar";
    var toggles = document.querySelectorAll("[data-language-toggle]");
    var homeLinks = document.querySelectorAll("[data-home-link], .product-list a");
    toggles.forEach(function(toggle) {
        toggle.href = isArabic ? window.location.pathname.split("/").pop() : window.location.pathname.split("/").pop() + "?lang=ar";
        toggle.textContent = isArabic ? "EN" : "عربي";
        toggle.lang = isArabic ? "en" : "ar";
        toggle.dir = isArabic ? "ltr" : "rtl";
    });
    var header = document.querySelector(".product-header");
    var menu = document.querySelector(".subpage-menu-button");
    if (header && menu) {
        var setMenuOpen = function(open) {
            header.classList.toggle("is-menu-open", open);
            menu.setAttribute("aria-expanded", String(open));
            menu.setAttribute("aria-label", isArabic ? open ? "إغلاق قائمة التنقل" : "فتح قائمة التنقل" : open ? "Close navigation" : "Open navigation");
        };
        setMenuOpen(false);
        menu.addEventListener("click", function() {
            setMenuOpen(!header.classList.contains("is-menu-open"));
        });
        document.addEventListener("keydown", function(event) {
            if (event.key === "Escape") setMenuOpen(false);
        });
    }
    if (!isArabic) return;
    document.documentElement.lang = "ar";
    document.documentElement.dir = "rtl";
    homeLinks.forEach(function(link) {
        var href = link.getAttribute("href");
        if (!href || href.indexOf("mailto:") === 0) return;
        var parts = href.split("#");
        link.setAttribute("href", parts[0] + (parts[0].indexOf("?") === -1 ? "?lang=ar" : "&lang=ar") + (parts[1] ? "#" + parts[1] : ""));
    });
    var common = {
        skip: "انتقل إلى المحتوى",
        solutions: "الحلول",
        places: "مواقع عملك",
        security: "الأمان",
        news: "الأخبار",
        faq: "الأسئلة",
        contact: "تواصل معنا",
        talk: "تحدث مع فريقنا",
        statusLabel: "الحالة التنظيمية",
        overview: "نظرة عامة",
        benefits: "ما يقدمه الحل",
        related: "حلول SVP الأخرى",
        relatedBody: "استكشف حلولًا أخرى مصممة لمراحل وبيئات تشغيل مختلفة.",
        ctaTitle: "اختر الحل الذي يناسب طريقة عملك.",
        ctaBody: "شاركنا احتياجك وطريقة التشغيل الحالية، وسنساعدك على تحديد الحل الأقرب لفريقك.",
        email: "راسل فريقنا",
        back: "العودة إلى الحلول",
        address: "المملكة العربية السعودية، الرياض، حي الفلاح، شارع الميزان",
        rights: "© Smart Value Payments 2026. جميع الحقوق محفوظة."
    };
    var products = {
        "smart-pos": {
            title: "جهاز يواكب زحمة يومك",
            name: "Smart POS",
            stage: "تنمو وتتوسع",
            description: "محل يزدحم؟ فروع تكبر؟ جهاز Smart POS بنظام أندرويد 13 صُمم ليتحمل ضغط البيع اليومي: شاشة لمس، اتصال 4G وWi-Fi، وقبول بطاقات ودفع لاسلكي بكل المعايير الدولية المعتمدة.",
            benefits: [ "أندرويد 13 ومعالج رباعي النواة", "NFC وبطاقات ذكية وقارئ باركود مدمج", "بطارية تكمل يومك واتصال لا ينقطع" ],
            status: "منتجات القبول تخضع لإجراءات الترخيص لدى البنك المركزي السعودي (ساما).",
            state: "منتج قبول"
        },
        softpos: {
            title: "جوالك هو جهازك الأول",
            name: "SVP SoftPOS",
            stage: "تبدأ الآن",
            description: "مشروعك صغير أو متنقل؟ لا تشترِ جهازًا بعد. حمّل تطبيق SVP SoftPOS على أي جوال أندرويد 10 فأحدث يدعم NFC، وابدأ قبول المدفوعات في دقائق — بلا أي عتاد إضافي.",
            benefits: [ "تفعيل فوري من الجوال مباشرة", "مثالي لأصحاب المشاريع الصغيرة والتجار المتنقلين", "مشمول بشهادة PCI MPoC لأمن المدفوعات" ],
            status: "منتجات القبول تخضع لإجراءات الترخيص لدى البنك المركزي السعودي (ساما).",
            state: "منتج قبول"
        },
        sutms: {
            title: "عملياتك المالية تحت السيطرة",
            name: "SVP Dashboard — منصة العمليات المالية",
            stage: "تدير أرقامًا أكبر",
            description: "حين تكبر الأرقام، تكبر التفاصيل. تجمع منصة SVP Dashboard مراقبة حساباتك لحظة بلحظة، وإدارة الرسوم والضرائب، وتسوية المعاملات آليًا — في مكان واحد، وبأخطاء أقل.",
            benefits: [ "مراقبة الحركة وتنبيهات فورية عن النشاط غير المعتاد", "احتساب الرسوم والضرائب بدقة تدعم الامتثال", "مطابقة آلية بين الحسابات وسجلات دقيقة" ],
            status: "SVP Dashboard منصة عمليات مالية، وليست منتج قبول دفع.",
            state: "منصة عمليات مالية"
        },
        tsm: {
            title: "كل أجهزتك في نظرة واحدة",
            name: "TSM — إدارة مخزون الأجهزة",
            stage: "تشغّل أسطولًا من الأجهزة",
            description: "لفرق العمليات التي تدير عشرات الأجهزة أو مئاتها: نظّم المتوفر منها، سجّل الكميات، وتابع حالة كل جهاز — من شاشة مركزية واحدة بدل جداول متفرقة.",
            benefits: [ "عرض مركزي موحد لكل الأجهزة", "تسجيل الكميات وتتبع التوفر", "متابعة حالة الأجهزة أولًا بأول" ],
            statusLabel: "تصنيف المنتج",
            status: "TSM نظام لإدارة مخزون الأجهزة الطرفية.",
            state: "إدارة مخزون الأجهزة"
        }
    };
    var product = products[document.body.dataset.product];
    if (!product) return;
    document.title = product.name + " — SVP";
    var set = function(selector, value) {
        document.querySelectorAll(selector).forEach(function(el) {
            var label = el.querySelector(".fintechx-button__label");
            (label || el).textContent = value;
        });
    };
    set(".skip-link", common.skip);
    set("[data-nav-solutions]", common.solutions);
    set("[data-nav-solutions-overview]", "استكشف الحلول");
    set("[data-nav-products]", "المنتجات");
    set("[data-nav-places]", common.places);
    set("[data-nav-security]", common.security);
    set("[data-nav-contact]", common.contact);
    set("[data-talk]", common.talk);
    set("[data-product-stage]", product.stage);
    set("[data-product-title]", product.title);
    set("[data-product-name]", product.name);
    set("[data-product-description]", product.description);
    set("[data-status-label]", product.statusLabel || common.statusLabel);
    set("[data-product-status]", product.status);
    set("[data-product-state]", product.state);
    set("[data-overview-label]", common.overview);
    set("[data-benefits-title]", common.benefits);
    set("[data-related-title]", common.related);
    set("[data-related-body]", common.relatedBody);
    set("[data-cta-title]", common.ctaTitle);
    set("[data-cta-body]", common.ctaBody);
    set("[data-email]", common.email);
    set("[data-back]", common.back);
    set("[data-address]", common.address);
    set("[data-rights]", common.rights);
    document.querySelectorAll("[data-benefit]").forEach(function(item, index) {
        if (product.benefits[index]) item.textContent = product.benefits[index];
    });
})();
