(function() {
    var root = document.querySelector("[data-places]");
    if (!root) return;
    var tabs = Array.prototype.slice.call(root.querySelectorAll(".places-item"));
    var slides = Array.prototype.slice.call(root.querySelectorAll(".places-slide"));
    if (!tabs.length || tabs.length !== slides.length) return;
    var timer = null;
    var taken = false;
    var still = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    var cycleMs = 4500;
    root.style.setProperty("--places-cycle", cycleMs + "ms");
    var open = 0;
    var arrived = true;
    function show(i) {
        open = i;
        tabs.forEach(function(t, n) {
            t.classList.toggle("is-open", n === i);
            t.setAttribute("aria-selected", String(n === i));
            t.tabIndex = n === i ? 0 : -1;
        });
        slides.forEach(function(s, n) {
            s.classList.toggle("is-on", n === i);
        });
    }
    function current() {
        return open;
    }
    function start() {
        if (taken || still || timer || !arrived) return;
        root.classList.add("is-autoplaying");
        timer = setInterval(function() {
            show((current() + 1) % tabs.length);
        }, cycleMs);
    }
    function stop() {
        clearInterval(timer);
        timer = null;
        root.classList.remove("is-autoplaying");
    }
    tabs.forEach(function(tab, i) {
        tab.tabIndex = i === 0 ? 0 : -1;
        tab.addEventListener("click", function() {
            taken = true;
            stop();
            show(i);
        });
        tab.addEventListener("keydown", function(e) {
            var step = e.key === "ArrowDown" || e.key === "ArrowRight" ? 1 : e.key === "ArrowUp" || e.key === "ArrowLeft" ? -1 : 0;
            if (!step) return;
            e.preventDefault();
            taken = true;
            stop();
            var n = (i + step + tabs.length) % tabs.length;
            show(n);
            tabs[n].focus();
        });
    });
    var inView = false;
    if ("IntersectionObserver" in window) {
        new IntersectionObserver(function(entries) {
            entries.forEach(function(en) {
                inView = en.isIntersecting;
                inView ? start() : stop();
            });
        }, {
            threshold: .35
        }).observe(root);
    } else {
        inView = true;
        start();
    }
    var runway = document.querySelector("[data-places-runway]");
    var pin = document.querySelector("[data-places-pin]");
    var col = root.querySelector("[data-places-col]");
    var stage = root.querySelector("[data-places-stage]");
    var shell = pin && pin.querySelector(".places-shell");
    if (!runway || !pin || !col || !stage || !shell) return;
    var wide = window.matchMedia("(min-width: 1101px)");
    var frame = false;
    var isOpen = false;
    function pinned() {
        return wide.matches && !still;
    }
    var OPEN_AT = 34;
    var CLOSE_AT = 8;
    function desktopScale() {
        var value = parseFloat(getComputedStyle(document.documentElement).zoom);
        return isFinite(value) && value > 0 ? value : 1;
    }
    function measure() {
        if (!pinned()) {
            root.style.removeProperty("--places-dx");
            return;
        }
        var wasOpen = root.classList.contains("is-open");
        root.classList.add("is-measuring", "is-open");
        var dx = shell.offsetLeft + shell.clientWidth / 2 - (stage.offsetLeft + stage.offsetWidth / 2);
        root.classList.toggle("is-open", wasOpen);
        root.style.setProperty("--places-dx", dx.toFixed(2) + "px");
        void root.offsetWidth;
        root.classList.remove("is-measuring");
    }
    function apply(open) {
        if (open === isOpen) return;
        isOpen = open;
        root.classList.toggle("is-open", open);
        arrived = open;
        if (open && inView) start(); else if (!open) stop();
    }
    function render() {
        if (!pinned()) {
            root.classList.remove("is-armed", "is-open");
            isOpen = true;
            if (!arrived) {
                arrived = true;
                if (inView) start();
            }
            return;
        }
        root.classList.add("is-armed");
        var passed = -runway.getBoundingClientRect().top / desktopScale();
        apply(isOpen ? passed > CLOSE_AT : passed > OPEN_AT);
    }
    function onScroll() {
        if (frame) return;
        frame = true;
        window.requestAnimationFrame(function() {
            frame = false;
            render();
        });
    }
    arrived = !pinned();
    window.addEventListener("scroll", onScroll, {
        passive: true
    });
    window.addEventListener("resize", function() {
        measure();
        render();
    });
    window.addEventListener("load", function() {
        measure();
        render();
    });
    if (document.fonts && document.fonts.ready) {
        document.fonts.ready.then(function() {
            measure();
            render();
        });
    }
    measure();
    render();
})();
