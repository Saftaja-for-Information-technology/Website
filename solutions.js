(function() {
    var section = document.querySelector("[data-solutions]");
    if (!section) return;
    var stage = section.querySelector("[data-solutions-stage]");
    var viewport = section.querySelector("[data-solutions-viewport]");
    var track = section.querySelector("[data-solutions-track]");
    var cards = [].slice.call(section.querySelectorAll("[data-solution-card]"));
    var marks = [].slice.call(section.querySelectorAll("[data-watermark-word]"));
    var bars = [].slice.call(section.querySelectorAll("[data-progress-seg]"));
    if (!stage || !viewport || !track || !cards.length) return;
    var runway = section.querySelector("[data-solutions-runway]");
    var reducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches || window.matchMedia("(max-width: 1099px)").matches;
    var openCard = null;
    var ticking = false;
    var naturalShift = 0;
    function desktopScale() {
        var value = parseFloat(getComputedStyle(document.documentElement).zoom);
        return isFinite(value) && value > 0 ? value : 1;
    }
    function sectionScale() {
        var value = parseFloat(getComputedStyle(section).zoom);
        return isFinite(value) && value > 0 ? value : 1;
    }
    function rtl() {
        return getComputedStyle(document.documentElement).direction === "rtl";
    }
    function clamp(value, min, max) {
        if (min === undefined) min = 0;
        if (max === undefined) max = 1;
        return Math.min(max, Math.max(min, value));
    }
    function maxShift() {
        return Math.max(0, track.scrollWidth - viewport.clientWidth);
    }
    function measure() {
        if (reducedMotion || !runway) return;
        if (!openCard) naturalShift = maxShift();
        var travel = Math.max(240, naturalShift * 1.35);
        var effectiveScale = desktopScale() * sectionScale();
        runway.style.height = Math.round(window.innerHeight / effectiveScale + travel) + "px";
    }
    function focusCorrection(baseX) {
        if (!openCard) return 0;
        var overflow = maxShift();
        var pad = overflow > 0 ? parseFloat(getComputedStyle(track).paddingInlineStart) || 0 : 0;
        var cardLeft = openCard.offsetLeft - (rtl() ? overflow : 0);
        var cardRight = cardLeft + openCard.offsetWidth;
        var visibleLeft = -baseX;
        var visibleRight = visibleLeft + viewport.clientWidth;
        if (cardRight + pad > visibleRight) return -(cardRight + pad - visibleRight);
        if (cardLeft - pad < visibleLeft) return visibleLeft - (cardLeft - pad);
        return 0;
    }
    function render() {
        if (reducedMotion) return;
        var stageEl = runway || section;
        var bounds = stageEl.getBoundingClientRect();
        var travelRange = Math.max(1, bounds.height - window.innerHeight);
        var progress = clamp(-bounds.top / travelRange);
        var shift = maxShift();
        var baseX = (rtl() ? 1 : -1) * shift * progress;
        var trackX = baseX + focusCorrection(baseX);
        track.style.setProperty("--track-x", trackX.toFixed(2) + "px");
        var count = cards.length;
        var active = openCard ? cards.indexOf(openCard) : Math.round(clamp(progress * count - .5, 0, count - 1));
        cards.forEach(function(card, i) {
            card.classList.toggle("is-current", i === active);
        });
        marks.forEach(function(mark, i) {
            mark.classList.toggle("is-current", i === active);
        });
        bars.forEach(function(bar, i) {
            bar.style.setProperty("--fill", clamp(progress * count - i).toFixed(3));
        });
    }
    function onScroll() {
        if (ticking) return;
        ticking = true;
        window.requestAnimationFrame(function() {
            ticking = false;
            render();
        });
    }
    function toggle(card) {
        var isOpening = openCard !== card;
        if (openCard) {
            openCard.classList.remove("is-open");
            openCard.querySelector("[data-solution-summary]").setAttribute("aria-expanded", "false");
        }
        openCard = isOpening ? card : null;
        if (openCard) {
            openCard.classList.add("is-open");
            openCard.querySelector("[data-solution-summary]").setAttribute("aria-expanded", "true");
        }
        var until = performance.now() + 760;
        (function step(now) {
            render();
            if (now < until) window.requestAnimationFrame(step); else {
                if (!openCard) measure();
                render();
            }
        })(performance.now());
    }
    cards.forEach(function(card) {
        var summary = card.querySelector("[data-solution-summary]");
        if (summary) summary.addEventListener("click", function() {
            toggle(card);
        });
    });
    section.addEventListener("keydown", function(event) {
        if (event.key === "Escape" && openCard) toggle(openCard);
    });
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
