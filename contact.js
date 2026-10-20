(function() {
    var isArabic = new URLSearchParams(location.search).get("lang") === "ar";
    var toggle = document.querySelector("[data-language-toggle]");
    if (toggle) {
        toggle.href = isArabic ? "contact.html" : "contact.html?lang=ar";
        toggle.textContent = isArabic ? "EN" : "عربي";
        toggle.lang = isArabic ? "en" : "ar";
        toggle.dir = isArabic ? "ltr" : "rtl";
    }
    var header = document.querySelector(".news-header");
    var menu = document.querySelector(".subpage-menu-button");
    if (header && menu) {
        function setMenuOpen(open) {
            header.classList.toggle("is-menu-open", open);
            menu.setAttribute("aria-expanded", String(open));
            menu.setAttribute("aria-label", isArabic ? open ? "إغلاق قائمة التنقل" : "فتح قائمة التنقل" : open ? "Close navigation" : "Open navigation");
        }
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
    document.title = "تواصل معنا — SVP";
    var description = document.querySelector('meta[name="description"]');
    if (description) description.content = "تواصل مع Smart Value Payments للاستفسارات والدعم في الرياض.";
    function set(selector, value) {
        document.querySelectorAll(selector).forEach(function(element) {
            var label = element.querySelector(".fintechx-button__label");
            (label || element).textContent = value;
        });
    }
    set(".skip-link", "انتقل إلى المحتوى");
    set("[data-nav-solutions]", "الحلول");
    set("[data-nav-solutions-overview]", "استكشف الحلول");
    set("[data-nav-products]", "المنتجات");
    set("[data-nav-places]", "مواقع عملك");
    set("[data-nav-security]", "الأمان");
    set("[data-nav-contact]", "تواصل معنا");
    set("[data-contact-support]", "راسل الدعم");
    set("[data-contact-kicker]", "تواصل معنا");
    set("[data-contact-title]", "نحن هنا للمساعدة.");
    set("[data-contact-intro]", "هل لديك سؤال عن حلولنا أو تحتاج إلى دعم؟ راسل فريقنا أو تفضل بزيارة مكتبنا في الرياض.");
    set("[data-contact-details-label]", "بيانات التواصل");
    set("[data-contact-details-title]", "تواصل بالطريقة التي تناسبك.");
    set("[data-contact-details-body]", "اختر وسيلة التواصل المناسبة لاستفسارك.");
    set("[data-support-label]", "الدعم");
    set("[data-general-label]", "الاستفسارات العامة");
    set("[data-office-label]", "زوروا مكتبنا");
    set("[data-contact-address]", "المملكة العربية السعودية، الرياض، حي الفلاح، شارع الميزان");
    set("[data-public-key]", "تنزيل المفتاح العام ↗");
    set("[data-form-label]", "أرسل رسالة");
    set("[data-form-title]", "أخبرنا كيف يمكننا مساعدتك.");
    set("[data-form-body]", "أخبرنا عن استفسارك لنوجّهه إلى الفريق المناسب.");
    set("[data-form-preview]", "معاينة للتصميم — إرسال النموذج غير متاح بعد.");
    set("[data-form-name-label]", "الاسم");
    set("[data-form-email-label]", "البريد الإلكتروني للعمل");
    set("[data-form-company-label]", "الشركة");
    set("[data-form-topic-label]", "نوع الاستفسار");
    set("[data-form-topic-default]", "اختر الموضوع");
    set("[data-form-topic-products]", "استفسار عن المنتجات");
    set("[data-form-topic-support]", "الدعم");
    set("[data-form-topic-other]", "أخرى");
    set("[data-form-message-label]", "الرسالة");
    set("[data-form-submit]", "إرسال الرسالة");
    set("[data-form-status]", "سيتم ربط إرسال الرسائل قبل إطلاق الموقع.");
    document.querySelector("[data-form-name-placeholder]").placeholder = "الاسم الكامل";
    document.querySelector("[data-form-email-placeholder]").placeholder = "name@company.com";
    document.querySelector("[data-form-company-placeholder]").placeholder = "اسم الشركة";
    document.querySelector("[data-form-message-placeholder]").placeholder = "كيف يمكننا مساعدتك؟";
    set("[data-form-security]", "لا تدرج بيانات البطاقات أو أرقام التعريف الشخصية أو رموز التحقق أو كلمات مرور الحسابات.");
    set("[data-form-fallback]", "راسل فريقنا عبر البريد الإلكتروني ↗");
    var details = document.querySelector(".contact-section");
    if (details) details.setAttribute("aria-label", "بيانات التواصل");
    document.querySelectorAll(".news-header [data-preserve-language]").forEach(function(link) {
        var url = new URL(link.getAttribute("href"), location.href);
        url.searchParams.set("lang", "ar");
        link.href = url.pathname + url.search + url.hash;
    });
})();
