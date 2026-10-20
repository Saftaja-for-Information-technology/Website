(function() {
    var header = document.querySelector("[data-hero-header]");
    var button = document.querySelector(".hero-menu-button");
    var nav = document.querySelector(".hero-nav");
    if (!header || !button || !nav) return;
    function closeMenu() {
        header.classList.remove("is-menu-open");
        button.setAttribute("aria-expanded", "false");
        document.body.classList.remove("has-open-menu");
    }
    button.addEventListener("click", function() {
        var open = !header.classList.contains("is-menu-open");
        header.classList.toggle("is-menu-open", open);
        button.setAttribute("aria-expanded", String(open));
        document.body.classList.toggle("has-open-menu", open);
    });
    nav.addEventListener("click", function(event) {
        if (event.target.closest("a")) closeMenu();
    });
    document.addEventListener("keydown", function(event) {
        if (event.key === "Escape") closeMenu();
    });
    window.addEventListener("resize", function() {
        if (window.innerWidth >= 1100) closeMenu();
    });
})();
