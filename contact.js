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
    var zohoFrame = document.querySelector("[data-zoho-form]");
    if (zohoFrame) {
        var zohoWrap = zohoFrame.parentNode;
        zohoFrame.addEventListener("load", function() {
            zohoWrap.classList.add("is-loaded");
        });
        // Zoho posts "perma|height" (or "perma|height|scroll") when zf_rszfm=1 is set.
        window.addEventListener("message", function(event) {
            if (event.origin !== "https://forms.zohopublic.sa" || typeof event.data !== "string") return;
            var parts = event.data.split("|");
            if (parts.length < 2 || zohoFrame.src.indexOf(parts[0]) === -1) return;
            var height = parseInt(parts[1], 10);
            if (height > 0) zohoFrame.style.height = (height + 15) + "px";
            zohoWrap.classList.add("is-loaded");
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
    set("[data-form-loading]", "جارٍ تحميل النموذج…");
    if (zohoFrame) {
        zohoFrame.title = "نموذج التواصل";
        zohoFrame.setAttribute("aria-label", "نموذج التواصل");
    }
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
