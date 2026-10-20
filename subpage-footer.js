(function() {
    var footer = document.querySelector(".site-footer");
    if (!footer) return;
    var isArabic = new URLSearchParams(location.search).get("lang") === "ar";
    footer.querySelectorAll("[data-footer-route]").forEach(function(link) {
        if (!isArabic) return;
        var url = new URL(link.getAttribute("href"), location.href);
        url.searchParams.set("lang", "ar");
        link.href = url.pathname + url.search + url.hash;
    });
    if (!isArabic) return;
    function set(selector, value) {
        var element = footer.querySelector(selector);
        if (element) element.textContent = value;
    }
    set("#footer-title", "تذييل الموقع");
    footer.querySelector(".footer-totop").setAttribute("aria-label", "العودة إلى الأعلى");
    footer.querySelector(".footer-brand__logo").setAttribute("aria-label", "الصفحة الرئيسية لشركة Smart Value Payments");
    set(".footer-brand p", "حلول دفع ذكية تدعم وضوح التشغيل واستدامة النمو.");
    var panels = footer.querySelectorAll(".footer-panel");
    if (panels[0]) {
        panels[0].querySelector(".footer-panel__title").textContent = "الشركة";
        [ "الرئيسية", "الحلول", "مواقع عملك", "الأمان", "الأخبار", "الأسئلة", "تواصل معنا" ].forEach(function(label, index) {
            var link = panels[0].querySelectorAll(".footer-links a")[index];
            if (link) link.textContent = label;
        });
    }
    if (panels[1]) {
        panels[1].querySelector(".footer-panel__title").textContent = "الحلول";
        [ "Smart POS", "SVP SoftPOS", "SVP Dashboard", "TSM", "تحدث مع فريقنا", "اطلب عرضًا تجريبيًا", "info@saftaja.com.sa" ].forEach(function(label, index) {
            var link = panels[1].querySelectorAll(".footer-links a")[index];
            if (link) link.textContent = label;
        });
    }
    var regulatory = footer.querySelector(".footer-regulatory");
    if (regulatory) {
        regulatory.lastChild.textContent = "منتجات القبول تخضع لإجراءات الترخيص لدى البنك المركزي السعودي.";
    }
    set(".footer-baseline__start", "المملكة العربية السعودية، الرياض، حي الفلاح، شارع الميزان");
    set(".footer-baseline__center", "© 2026 SVP. جميع الحقوق محفوظة.");
})();
