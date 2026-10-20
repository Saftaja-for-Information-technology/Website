(function() {
    var root = document.documentElement;
    var trigger = null;
    var frame = 0;
    var isDark = false;
    var reducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)");
    var fallbackCommitTimer = 0;
    var fallbackClearTimer = 0;
    function runFallback(commit, nextDark) {
        window.clearTimeout(fallbackCommitTimer);
        window.clearTimeout(fallbackClearTimer);
        root.classList.remove("theme-to-dark", "theme-to-light");
        void root.offsetWidth;
        root.classList.add(nextDark ? "theme-to-dark" : "theme-to-light");
        fallbackCommitTimer = window.setTimeout(function() {
            commit();
            fallbackClearTimer = window.setTimeout(function() {
                root.classList.remove("theme-to-dark", "theme-to-light");
            }, 40);
        }, 220);
    }
    function setTheme(nextDark, animate) {
        if (nextDark === isDark) return;
        isDark = nextDark;
        function commit() {
            if (nextDark) {
                root.setAttribute("data-theme", "dark");
            } else {
                root.removeAttribute("data-theme");
            }
        }
        if (!animate || reducedMotion.matches) {
            commit();
            return;
        }
        if (document.startViewTransition) {
            document.startViewTransition(commit);
        } else {
            runFallback(commit, nextDark);
        }
    }
    function render(animate) {
        frame = 0;
        if (!trigger) return;
        if (window.matchMedia("(max-width: 600px)").matches) {
            isDark = false;
            root.removeAttribute("data-theme");
            root.classList.remove("theme-to-dark", "theme-to-light");
            window.clearTimeout(fallbackCommitTimer);
            window.clearTimeout(fallbackClearTimer);
            return;
        }
        var handoffLine = window.innerHeight * .68;
        setTheme(trigger.getBoundingClientRect().top <= handoffLine, animate);
    }
    function requestRender() {
        if (frame) return;
        frame = window.requestAnimationFrame(function() {
            render(true);
        });
    }
    function wire() {
        trigger = document.getElementById("solutions-title");
        if (!trigger) return;
        render(false);
        window.addEventListener("scroll", requestRender, {
            passive: true
        });
        window.addEventListener("resize", requestRender);
        window.addEventListener("load", function() {
            render(false);
        }, {
            once: true
        });
    }
    if (document.readyState === "loading") {
        document.addEventListener("DOMContentLoaded", wire, {
            once: true
        });
    } else {
        wire();
    }
})();
