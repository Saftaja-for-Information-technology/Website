(function() {
    var params = new URLSearchParams(window.location.search);
    var isArabic = params.get("lang") === "ar";
    var page = document.body.dataset.newsPage;
    var toggles = document.querySelectorAll("[data-language-toggle]");
    var localName = window.location.pathname.split("/").pop() || "index.html";
    toggles.forEach(function(toggle) {
        toggle.href = isArabic ? localName : localName + "?lang=ar";
        toggle.textContent = isArabic ? "EN" : "عربي";
        toggle.lang = isArabic ? "en" : "ar";
        toggle.dir = isArabic ? "ltr" : "rtl";
    });
    var header = document.querySelector(".news-header");
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
    var copy = {
        common: {
            skip: "انتقل إلى المحتوى",
            home: "الرئيسية",
            solutions: "الحلول",
            places: "مواقع عملك",
            security: "الأمان",
            news: "الأخبار",
            faq: "الأسئلة",
            navContact: "تواصل معنا",
            talk: "تحدث مع فريقنا",
            newsroom: "غرفة الأخبار",
            read: "اقرأ الخبر",
            back: "العودة إلى غرفة الأخبار",
            contact: "تحدث مع فريقنا",
            address: "المملكة العربية السعودية، الرياض، حي الفلاح، شارع الميزان",
            rights: "© Smart Value Payments 2026. جميع الحقوق محفوظة."
        },
        index: {
            title: "آخر مستجداتنا",
            lede: "خطوات جديدة في أمن المدفوعات ودعم المحتوى المحلي.",
            section: "أخبار SVP"
        },
        manufacturing: {
            chip: "تصنيع محلي",
            title: "خطوة نحو تصنيع أجهزة نقاط البيع محليًا",
            summary: "مذكرة تفاهم بالتعاون مع شركاء في القطاعين الصناعي والتقني، دعمًا للمحتوى المحلي ولتطوير منظومة المدفوعات الرقمية في المملكة."
        },
        certification: {
            chip: "أمن المدفوعات",
            title: "SVP تحصل رسميًا على شهادة PCI MPoC",
            summary: "إنجاز يعكس التزام الشركة بأمان أنظمة الدفع وحماية بيانات العملاء وفق أعلى المعايير الدولية."
        }
    };
    var set = function(selector, value) {
        document.querySelectorAll(selector).forEach(function(el) {
            var label = el.querySelector(".fintechx-button__label");
            (label || el).textContent = value;
        });
    };
    set(".skip-link", copy.common.skip);
    set("[data-nav-solutions]", copy.common.solutions);
    set("[data-nav-solutions-overview]", "استكشف الحلول");
    set("[data-nav-products]", "المنتجات");
    set("[data-nav-places]", copy.common.places);
    set("[data-nav-security]", copy.common.security);
    set("[data-nav-contact]", copy.common.navContact);
    set("[data-talk]", copy.common.talk);
    set("[data-address]", copy.common.address);
    set("[data-rights]", copy.common.rights);
    document.querySelectorAll("[data-preserve-language]").forEach(function(link) {
        var href = link.getAttribute("href");
        if (!href || href.indexOf("mailto:") === 0 || href.indexOf("?lang=ar") !== -1) return;
        var parts = href.split("#");
        link.href = parts[0] + (parts[0].indexOf("?") === -1 ? "?lang=ar" : "&lang=ar") + (parts[1] ? "#" + parts[1] : "");
    });
    if (page === "index") {
        document.title = copy.index.title + " — SVP";
        set("[data-newsroom]", copy.common.newsroom);
        set("[data-page-title]", copy.index.title);
        set("[data-page-lede]", copy.index.lede);
        set("[data-section-title]", copy.index.section);
        set("[data-read]", copy.common.read);
    }
    var story = page === "manufacturing" ? copy.manufacturing : page === "certification" ? copy.certification : null;
    if (story) {
        document.title = story.title + " — SVP";
        set("[data-story-chip]", story.chip);
        set("[data-story-title]", story.title);
        set("[data-story-summary]", story.summary);
        set("[data-back]", copy.common.back);
        set("[data-contact]", copy.common.contact);
    }
    if (page === "404") {
        document.title = "الصفحة غير موجودة — SVP";
        set("[data-not-found-title]", "هذه الصفحة غير موجودة.");
        set("[data-not-found-body]", "قد يكون الرابط قد تغيّر. عُد إلى الصفحة الرئيسية أو استعرض آخر أخبار SVP.");
        set("[data-not-found-home]", "العودة إلى SVP");
        set("[data-not-found-news]", "عرض الأخبار");
    }
    var cards = document.querySelectorAll("[data-story-card]");
    if (cards[0]) {
        cards[0].querySelector("[data-card-chip]").textContent = copy.manufacturing.chip;
        cards[0].querySelector("[data-card-title]").textContent = copy.manufacturing.title;
        cards[0].querySelector("[data-card-summary]").textContent = copy.manufacturing.summary;
    }
    if (cards[1]) {
        cards[1].querySelector("[data-card-chip]").textContent = copy.certification.chip;
        cards[1].querySelector("[data-card-title]").textContent = copy.certification.title;
        cards[1].querySelector("[data-card-summary]").textContent = copy.certification.summary;
    }
})();
