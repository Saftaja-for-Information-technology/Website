const flow = document.querySelector("[data-flow]");

const designCanvas = document.querySelector("[data-design-canvas]");

const heroBg = document.querySelector("[data-hero-bg-layer]");

const heroHeader = document.querySelector("[data-hero-header]");

const heroLogoMark = document.querySelector(".svp-logo__mark");

const heroNav = document.querySelector(".hero-nav");

const heroHeaderCta = document.querySelector(".hero-header-cta");

const heroProduct = document.querySelector(".hero-product");

const dashboardSection = document.querySelector("[data-dashboard-section]");

const dashboardStage = document.querySelector("[data-dashboard-stage]");

const phoneAssemblyTargets = [ {
    name: "topbar",
    selector: ".ops-topbar",
    x: -15,
    y: -27,
    scale: 1,
    rotate: -2,
    rotateX: 2,
    rotateY: -3,
    perspective: 1200
}, {
    name: "heading",
    selector: ".page-heading",
    x: 20,
    y: -36,
    scale: 1.02,
    rotate: 3,
    rotateX: 0,
    rotateY: 4,
    perspective: 1200
}, {
    name: "gross-sales",
    selector: "[data-slot-active]",
    x: -31,
    y: -45,
    scale: 1.06,
    rotate: -7,
    rotateX: 2,
    rotateY: -4,
    perspective: 1200
}, {
    name: "transactions",
    selector: ".kpi-card-tinted",
    x: 33,
    y: -42,
    scale: .95,
    rotate: 6,
    rotateX: 1,
    rotateY: 5,
    perspective: 1200
}, {
    name: "income",
    selector: ".performance-panel",
    x: -40,
    y: -16,
    scale: 1,
    rotate: -3,
    rotateX: 0,
    rotateY: 0,
    perspective: 1200
}, {
    name: "liquidity",
    selector: "[data-slot-merchants]",
    x: -17,
    y: -69,
    scale: .9,
    rotate: -10,
    rotateX: 5,
    rotateY: -8,
    perspective: 2342
}, {
    name: "reduction",
    selector: "[data-slot-overview]",
    x: 17,
    y: -57,
    scale: 1.1,
    rotate: 10,
    rotateX: 1,
    rotateY: 10,
    perspective: 1200
}, {
    name: "sources",
    selector: ".merchant-recent",
    x: 36,
    y: -24,
    scale: 1.1,
    rotate: 3,
    rotateX: 0,
    rotateY: 0,
    perspective: 1200
} ];

let phoneAssembly = null;

let phoneAssemblyLayout = "";

const chartWrap = document.querySelector(".chart-wrap");

const cards = [ ...document.querySelectorAll("[data-travel-card]") ];

const cardAnchors = new Map;

cards.forEach(card => {
    if (!card.parentNode) return;
    const anchor = document.createComment(`travel-card-${card.dataset.target}`);
    card.parentNode.insertBefore(anchor, card);
    cardAnchors.set(card, anchor);
});

const cardRank = function() {
    const order = cards.slice().sort((a, b) => Number(a.dataset.startX) - Number(b.dataset.startX));
    return new Map(order.map((card, i) => [ card, i ]));
}();

const startFractions = cards.map(c => Number(c.dataset.startX)).sort((a, b) => a - b);

const HAND_NUDGE = .045;

const opsShell = document.querySelector(".ops-shell");

const reveals = [ ...document.querySelectorAll("[data-reveal]") ];

const ctaMotion = document.querySelector("[data-cta-motion]");

const footerMotion = document.querySelector("[data-footer-motion]");

const footerWordmark = footerMotion?.querySelector(".site-footer__wordmark");

const footerAura = footerMotion?.querySelector(".site-footer__aura");

const footerSheet = footerMotion?.querySelector(".footer-sheet--top");

const footerPanels = footerMotion?.querySelector(".footer-panels");

const footerBaseline = footerMotion?.querySelector(".footer-baseline");

const reducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

const mobileLayout = window.matchMedia("(max-width: 1099px)");

const previewScroll = Number(new URLSearchParams(window.location.search).get("previewScroll"));

function syncDashboardCardsForViewport() {
    cards.forEach(card => {
        const slot = document.querySelector(`[data-slot-${card.dataset.target}]`);
        const anchor = cardAnchors.get(card);
        if (!slot || !anchor) return;
        if (mobileLayout.matches) {
            if (card.parentNode !== slot) slot.appendChild(card);
            slot.removeAttribute("aria-hidden");
            card.classList.add("is-docked");
            card.classList.remove("is-lifted");
            card.style.transform = "none";
        } else {
            if (card.parentNode !== anchor.parentNode) {
                anchor.parentNode.insertBefore(card, anchor.nextSibling);
            }
            slot.setAttribute("aria-hidden", "true");
            card.style.removeProperty("transform");
        }
    });
}

const dashboardMotion = document.documentElement.dataset.dashboardMotion !== "off";

const clamp = (value, min = 0, max = 1) => Math.min(max, Math.max(min, value));

const map = (value, fromStart, fromEnd, toStart = 0, toEnd = 1) => {
    const progress = clamp((value - fromStart) / (fromEnd - fromStart));
    return toStart + (toEnd - toStart) * progress;
};

const smooth = value => value * value * (3 - 2 * value);

function offsetWithin(node, ancestor) {
    let x = 0;
    let y = 0;
    while (node && node !== ancestor) {
        x += node.offsetLeft;
        y += node.offsetTop;
        node = node.offsetParent;
    }
    return node === ancestor ? {
        x: x,
        y: y
    } : null;
}

function ensurePhoneAssembly() {
    if (!dashboardStage || window.innerWidth > 600 || reducedMotion) return;
    if (!phoneAssembly) {
        const layer = document.createElement("div");
        layer.className = "phone-assembly";
        layer.setAttribute("aria-hidden", "true");
        layer.inert = true;
        const pieces = phoneAssemblyTargets.map(spec => {
            const target = dashboardStage.querySelector(spec.selector);
            if (!target) return null;
            const piece = document.createElement("div");
            piece.className = `phone-assembly__piece phone-assembly__piece--${spec.name}`;
            const clone = target.cloneNode(true);
            clone.removeAttribute("aria-label");
            clone.querySelectorAll("[data-travel-card],[data-target],[data-slot-active],[data-slot-merchants],[data-slot-overview]").forEach(node => {
                node.removeAttribute("data-travel-card");
                node.removeAttribute("data-target");
                node.removeAttribute("data-slot-active");
                node.removeAttribute("data-slot-merchants");
                node.removeAttribute("data-slot-overview");
            });
            clone.removeAttribute("data-slot-active");
            clone.removeAttribute("data-slot-merchants");
            clone.removeAttribute("data-slot-overview");
            clone.querySelectorAll("[id]").forEach(node => {
                const oldId = node.id;
                const newId = `phone-assembly-${spec.name}-${oldId}`;
                clone.querySelectorAll(`[fill="url(#${oldId})"]`).forEach(ref => ref.setAttribute("fill", `url(#${newId})`));
                node.id = newId;
            });
            clone.querySelectorAll("a,button,input,select,textarea").forEach(node => {
                node.tabIndex = -1;
            });
            piece.appendChild(clone);
            layer.appendChild(piece);
            return {
                spec: spec,
                target: target,
                piece: piece
            };
        }).filter(Boolean);
        dashboardStage.appendChild(layer);
        phoneAssembly = pieces;
    }
    const layoutKey = `${window.innerWidth}:${window.innerHeight}`;
    if (layoutKey === phoneAssemblyLayout) return;
    phoneAssembly.forEach(({target: target, piece: piece}) => {
        const offset = offsetWithin(target, dashboardStage);
        if (!offset) return;
        piece.style.left = `${offset.x}px`;
        piece.style.top = `${offset.y}px`;
        piece.style.width = `${target.offsetWidth}px`;
        piece.style.height = `${target.offsetHeight}px`;
    });
    phoneAssemblyLayout = layoutKey;
}

function renderPhoneAssembly(progress) {
    if (!phoneAssembly) return;
    const zoom = (window.innerWidth - (window.innerWidth <= 360 ? 28 : 36)) / 1100;
    const widthRatio = window.innerWidth / 390;
    const remainder = 1 - progress;
    const scatter = remainder * .4;
    const translation = remainder * .2;
    const handoff = smooth(map(progress, .96, 1));
    phoneAssembly.forEach(({spec: spec, target: target, piece: piece}) => {
        const x = spec.x * widthRatio * translation / zoom;
        const y = spec.y * widthRatio * translation / zoom;
        const scale = 1 + (spec.scale - 1) * scatter;
        target.style.opacity = handoff.toFixed(4);
        piece.style.opacity = (1 - handoff).toFixed(4);
        piece.style.transform = `perspective(${Math.round(spec.perspective / zoom)}px) translate3d(${x.toFixed(2)}px,${y.toFixed(2)}px,0) scale(${scale.toFixed(4)}) rotate(${(spec.rotate * scatter).toFixed(3)}deg) rotateX(${(spec.rotateX * scatter).toFixed(3)}deg) rotateY(${(spec.rotateY * scatter).toFixed(3)}deg)`;
    });
}

function desktopScale() {
    const value = Number.parseFloat(getComputedStyle(document.documentElement).zoom);
    return Number.isFinite(value) && value > 0 ? value : 1;
}

let ticking = false;

let lenis = null;

function renderReveals() {
    if (!reveals.length) return;
    const trigger = window.innerHeight * .9;
    for (let index = reveals.length - 1; index >= 0; index -= 1) {
        const target = reveals[index];
        if (target.getBoundingClientRect().top > trigger) continue;
        target.classList.add("is-revealed");
        reveals.splice(index, 1);
    }
}

function renderClosingMotion() {
    const viewportHeight = window.innerHeight;
    if (ctaMotion) {
        const bounds = ctaMotion.getBoundingClientRect();
        const entrance = reducedMotion ? 1 : smooth(map(bounds.top, viewportHeight * .96, viewportHeight * .2));
        const copyIn = smooth(map(entrance, .14, .72));
        const actionsIn = smooth(map(entrance, .3, .84));
        const baselineIn = smooth(map(entrance, .46, .96));
        const tileIn = smooth(map(entrance, .08, .62));
        ctaMotion.style.setProperty("--cta-opacity", clamp(entrance * 1.45).toFixed(4));
        ctaMotion.style.setProperty("--cta-y", `${((1 - entrance) * 78).toFixed(2)}px`);
        ctaMotion.style.setProperty("--cta-scale", (.974 + entrance * .026).toFixed(4));
        ctaMotion.style.setProperty("--cta-plate-y", `${((1 - entrance) * 38).toFixed(2)}px`);
        ctaMotion.style.setProperty("--cta-copy-in", copyIn.toFixed(4));
        ctaMotion.style.setProperty("--cta-copy-y", `${((1 - copyIn) * 30).toFixed(2)}px`);
        ctaMotion.style.setProperty("--cta-actions-in", actionsIn.toFixed(4));
        ctaMotion.style.setProperty("--cta-actions-y", `${((1 - actionsIn) * 22).toFixed(2)}px`);
        ctaMotion.style.setProperty("--cta-baseline-in", baselineIn.toFixed(4));
        ctaMotion.style.setProperty("--cta-baseline-y", `${((1 - baselineIn) * 18).toFixed(2)}px`);
        ctaMotion.style.setProperty("--cta-tile-opacity", tileIn.toFixed(4));
        ctaMotion.style.setProperty("--cta-tile-y", `${((1 - tileIn) * 64).toFixed(2)}px`);
    }
    if (footerMotion) {
        const bounds = footerMotion.getBoundingClientRect();
        const maxScroll = Math.max(0, document.documentElement.scrollHeight - viewportHeight);
        const scale = desktopScale();
        const layerProgress = layer => {
            if (!layer || reducedMotion) return 1;
            let offset = 0;
            let node = layer;
            while (node && node !== footerMotion) {
                offset += node.offsetTop;
                node = node.offsetParent;
            }
            const layoutTop = bounds.top + offset * scale;
            const pageTop = window.scrollY + layoutTop;
            const finalViewportTop = pageTop - maxScroll;
            const start = viewportHeight * 1.04;
            const end = Math.min(start - 1, finalViewportTop + 12);
            return smooth(map(layoutTop, start, end));
        };
        const wordmarkIn = layerProgress(footerWordmark);
        const auraIn = layerProgress(footerAura);
        const sheetIn = layerProgress(footerSheet);
        const panelsIn = layerProgress(footerPanels);
        const baselineIn = layerProgress(footerBaseline);
        footerMotion.style.setProperty("--footer-wordmark-opacity", wordmarkIn.toFixed(4));
        footerMotion.style.setProperty("--footer-wordmark-y", `${((1 - wordmarkIn) * 126).toFixed(2)}px`);
        footerMotion.style.setProperty("--footer-wordmark-scale", (.955 + wordmarkIn * .045).toFixed(4));
        footerMotion.style.setProperty("--footer-aura-opacity", auraIn.toFixed(4));
        footerMotion.style.setProperty("--footer-aura-y", `${((1 - auraIn) * 172).toFixed(2)}px`);
        footerMotion.style.setProperty("--footer-aura-scale", (.82 + auraIn * .18).toFixed(4));
        footerMotion.style.setProperty("--footer-sheet-opacity", sheetIn.toFixed(4));
        footerMotion.style.setProperty("--footer-sheet-y", `${((1 - sheetIn) * 92).toFixed(2)}px`);
        footerMotion.style.setProperty("--footer-sheet-scale", (.976 + sheetIn * .024).toFixed(4));
        footerMotion.style.setProperty("--footer-panels-opacity", panelsIn.toFixed(4));
        footerMotion.style.setProperty("--footer-panels-y", `${((1 - panelsIn) * 72).toFixed(2)}px`);
        footerMotion.style.setProperty("--footer-baseline-opacity", baselineIn.toFixed(4));
        footerMotion.style.setProperty("--footer-baseline-y", `${((1 - baselineIn) * 54).toFixed(2)}px`);
    }
}

function render() {
    renderReveals();
    renderClosingMotion();
    if (!flow || !designCanvas || !dashboardSection || !dashboardStage) {
        ticking = false;
        return;
    }
    syncDashboardCardsForViewport();
    if (mobileLayout.matches) {
        dashboardStage.style.opacity = "1";
        dashboardStage.style.transform = "none";
        dashboardStage.style.setProperty("--dashboard-offset", "0");
        if (window.innerWidth <= 600) {
            const motion = reducedMotion ? 0 : map(window.scrollY, window.innerHeight * (120 / 844), window.innerHeight * (420 / 844));
            ensurePhoneAssembly();
            renderPhoneAssembly(motion);
            dashboardStage.style.setProperty("--phone-dashboard-tilt", `${(10 * (1 - motion)).toFixed(3)}deg`);
            const phoneDashboardWidth = window.innerWidth - (window.innerWidth <= 360 ? 28 : 36);
            dashboardStage.style.setProperty("--phone-dashboard-perspective", `${Math.round(1200 * 1100 / phoneDashboardWidth)}px`);
            heroBg?.style.setProperty("--phone-plate-opacity", (1 - motion).toFixed(4));
            heroBg?.style.setProperty("--phone-plate-y", `${(139 * motion).toFixed(2)}px`);
            const baseStart = [ 6, 20, 46 ];
            const baseEnd = [ 219, 231, 243 ];
            designCanvas.style.setProperty("--phone-hero-base", `rgb(${baseStart.map((start, index) => Math.round(start + (baseEnd[index] - start) * motion)).join(",")})`);
        } else {
            phoneAssembly?.forEach(({target: target}) => target.style.removeProperty("opacity"));
            dashboardStage.style.removeProperty("--phone-dashboard-tilt");
            dashboardStage.style.removeProperty("--phone-dashboard-perspective");
            heroBg?.style.removeProperty("--phone-plate-opacity");
            heroBg?.style.removeProperty("--phone-plate-y");
            designCanvas.style.removeProperty("--phone-hero-base");
        }
        dashboardStage.classList.add("is-visible");
        if (heroHeader) {
            heroHeader.classList.remove("is-island", "is-light-surface");
            if (window.innerWidth <= 600) {
                const headerY = heroHeader.getBoundingClientRect().top + heroHeader.offsetHeight / 2;
                const overLight = [ ".dashboard-section", ".payments-section", ".trust-badges-section", ".places-section" ].some(selector => {
                    const section = document.querySelector(selector);
                    if (!section) return false;
                    const bounds = section.getBoundingClientRect();
                    return bounds.top <= headerY && bounds.bottom > headerY;
                });
                const heroBounds = designCanvas.getBoundingClientRect();
                const overHero = heroBounds.top <= headerY && heroBounds.bottom > headerY;
                const plateFaded = Number.parseFloat(heroBg?.style.getPropertyValue("--phone-plate-opacity")) < .35;
                heroHeader.classList.toggle("is-on-light", overLight || overHero && plateFaded);
            } else {
                heroHeader.classList.remove("is-on-light");
            }
        }
        ticking = false;
        return;
    }
    heroHeader?.classList.remove("is-on-light");
    const pageZoom = desktopScale();
    const flowBounds = flow.getBoundingClientRect();
    const layoutViewportHeight = window.innerHeight / pageZoom;
    const runway = Math.max(1, dashboardSection.offsetTop + dashboardStage.offsetTop + layoutViewportHeight * .08);
    const progress = clamp(-flowBounds.top / pageZoom / runway);
    const dashboardIn = smooth(map(progress, .04, .64));
    const supportingIn = reducedMotion ? 1 : smooth(map(progress, .36, .82));
    if (heroHeader) {
        const viewportWidth = document.documentElement.clientWidth / pageZoom;
        const canvasWidth = Math.min(viewportWidth, 1536);
        const islandFlank = 60;
        const islandChrome = 2 + 18 * 2;
        const markWidth = heroLogoMark ? heroLogoMark.offsetWidth : 0;
        const navWidth = heroNav ? heroNav.offsetWidth : 0;
        const ctaWidth = heroHeaderCta ? heroHeaderCta.offsetWidth : 0;
        const islandWidth = Math.min(islandChrome + markWidth + navWidth + ctaWidth + islandFlank * 2, viewportWidth - 48);
        const navShift = (ctaWidth - markWidth) / 2;
        const headerProgress = smooth(map(-flowBounds.top / pageZoom, 8, Math.min(270, layoutViewportHeight * .38)));
        const headerWidth = canvasWidth + (islandWidth - canvasWidth) * headerProgress;
        const headerLeft = (viewportWidth - headerWidth) / 2;
        const headerHeight = 126 + (76 - 126) * headerProgress;
        const headerTop = 0 + 18 * headerProgress;
        const desktopPadding = Math.max(88, Math.min(116, canvasWidth * .075));
        const headerPadding = desktopPadding + (18 - desktopPadding) * headerProgress;
        const logoSlotWidth = 190 + (54 - 190) * headerProgress;
        heroHeader.style.setProperty("--header-progress", headerProgress.toFixed(4));
        heroHeader.style.setProperty("--header-width", `${headerWidth.toFixed(2)}px`);
        heroHeader.style.setProperty("--header-left", `${headerLeft.toFixed(2)}px`);
        heroHeader.style.setProperty("--header-height", `${headerHeight.toFixed(2)}px`);
        heroHeader.style.setProperty("--header-top", `${headerTop.toFixed(2)}px`);
        heroHeader.style.setProperty("--header-pad", `${headerPadding.toFixed(2)}px`);
        heroHeader.style.setProperty("--logo-slot-width", `${logoSlotWidth.toFixed(2)}px`);
        heroHeader.style.setProperty("--nav-shift", `${navShift.toFixed(2)}px`);
        heroHeader.classList.toggle("is-island", headerProgress > .92);
        heroHeader.classList.toggle("is-light-surface", headerProgress >= .42);
    }
    if (dashboardMotion) {
        dashboardStage.style.opacity = `${.58 + dashboardIn * .42}`;
        dashboardStage.style.transform = `perspective(1500px) translate3d(0, ${(1 - dashboardIn) * 126}px, 0) rotateX(${(1 - dashboardIn) * 12}deg) scale(${.93 + dashboardIn * .07})`;
        dashboardStage.style.setProperty("--dashboard-offset", (1 - supportingIn).toFixed(4));
    }
    const canvasRect = designCanvas.getBoundingClientRect();
    const canvasBounds = {
        left: canvasRect.left / pageZoom,
        top: canvasRect.top / pageZoom,
        right: canvasRect.right / pageZoom,
        bottom: canvasRect.bottom / pageZoom,
        width: canvasRect.width / pageZoom,
        height: canvasRect.height / pageZoom
    };
    if (heroHeader) {
        const headerBottom = heroHeader.getBoundingClientRect().bottom;
        document.documentElement.classList.toggle("is-header-over-hero", canvasRect.bottom > headerBottom);
    }
    const productFade = smooth(map(canvasRect.bottom, window.innerHeight * .1, window.innerHeight * .5));
    if (heroProduct) {
        heroProduct.style.setProperty("--product-fade", productFade.toFixed(4));
    }
    const travel = smooth(map(progress, .035, .82));
    const flowLeft = flowBounds.left / pageZoom;
    const flowTop = flowBounds.top / pageZoom;
    const shellRect = opsShell ? opsShell.getBoundingClientRect() : null;
    const shellBounds = shellRect ? {
        left: shellRect.left / pageZoom,
        top: shellRect.top / pageZoom,
        right: shellRect.right / pageZoom,
        bottom: shellRect.bottom / pageZoom
    } : null;
    const isRtl = getComputedStyle(document.documentElement).direction === "rtl";
    const centeredHero = document.documentElement.dataset.heroLayout === "dex-option-2";
    const mirrored = isRtl && !centeredHero;
    const centeredRtlCardDrop = isRtl && centeredHero ? clamp((1100 - layoutViewportHeight) / 1250, 0, .16) : 0;
    cards.forEach(card => {
        const slot = document.querySelector(`[data-slot-${card.dataset.target}]`);
        if (!slot) return;
        const slotRect = slot.getBoundingClientRect();
        const slotBounds = {
            left: slotRect.left / pageZoom,
            top: slotRect.top / pageZoom,
            width: slotRect.width / pageZoom
        };
        const startScale = clamp(canvasBounds.width / 1920, .8, .92);
        const rank = cardRank.get(card);
        const startFraction = mirrored ? startFractions[startFractions.length - 1 - rank] : startFractions[rank];
        const strandedInTheGap = mirrored && rank === cards.length - 1;
        const startOffset = mirrored ? canvasBounds.width * (1 - startFraction - (strandedInTheGap ? HAND_NUDGE : 0)) - card.offsetWidth * startScale : canvasBounds.width * startFraction;
        const startX = canvasBounds.left - flowLeft + startOffset;
        const startY = canvasBounds.top - flowTop + canvasBounds.height * (Number(card.dataset.startY) + centeredRtlCardDrop);
        const targetX = slotBounds.left - flowLeft;
        const targetY = slotBounds.top - flowTop;
        const targetScale = slotBounds.width / card.offsetWidth;
        const x = startX + (targetX - startX) * travel;
        const y = startY + (targetY - startY) * travel;
        const scale = startScale + (targetScale - startScale) * travel;
        const initialRotation = (card.classList.contains("travel-card-merchants") ? 7.5 : -6.5) * (mirrored ? -1 : 1);
        const rotation = initialRotation * (1 - travel);
        card.style.transform = `translate3d(${x}px, ${y}px, 0) rotate(${rotation}deg) scale(${scale})`;
        card.classList.toggle("is-docked", travel > .9995);
        const cardLeft = flowLeft + x;
        const cardTop = flowTop + y;
        const cardRight = cardLeft + card.offsetWidth * scale;
        const cardBottom = cardTop + card.offsetHeight * scale;
        const meetsShell = !!shellBounds && cardRight > shellBounds.left && cardLeft < shellBounds.right && cardBottom > shellBounds.top && cardTop < shellBounds.bottom;
        card.classList.toggle("is-lifted", meetsShell);
    });
    ticking = false;
}

function requestRender() {
    if (ticking) return;
    ticking = true;
    requestAnimationFrame(render);
}

const SNAP_SETTLE_MS = 150;

let snapTimer = null;

let snapArmed = true;

function dashboardSnapTarget() {
    let node = dashboardStage;
    let layoutTop = 0;
    while (node) {
        layoutTop += node.offsetTop;
        node = node.offsetParent;
    }
    const scale = desktopScale();
    return Math.max(0, layoutTop * scale + (dashboardStage.offsetHeight * scale - window.innerHeight) / 2);
}

function settleDashboardSnap() {
    if (mobileLayout.matches) return;
    const target = dashboardSnapTarget();
    const distance = window.scrollY - target;
    if (Math.abs(distance) > window.innerHeight * .18) {
        snapArmed = true;
        return;
    }
    if (!snapArmed || Math.abs(distance) < 2) return;
    snapArmed = false;
    lenis.scrollTo(target, {
        duration: .55,
        easing: time => 1 - Math.pow(1 - time, 3)
    });
}

function scheduleDashboardSnap() {
    if (!dashboardStage || !dashboardMotion) return;
    window.clearTimeout(snapTimer);
    snapTimer = window.setTimeout(settleDashboardSnap, SNAP_SETTLE_MS);
}

function initializeSmoothScroll() {
    if (!window.Lenis || reducedMotion || mobileLayout.matches || Number.isFinite(previewScroll) && previewScroll > 0) {
        window.addEventListener("scroll", requestRender, {
            passive: true
        });
        return;
    }
    lenis = new window.Lenis({
        duration: 1.65,
        easing: time => Math.min(1, 1.001 - Math.pow(2, -10 * time)),
        smoothWheel: true,
        syncTouch: false,
        wheelMultiplier: .68,
        touchMultiplier: 1.05,
        anchors: true
    });
    window.lenis = lenis;
    lenis.on("scroll", () => {
        requestRender();
        scheduleDashboardSnap();
    });
    const raf = time => {
        lenis.raf(time);
        requestAnimationFrame(raf);
    };
    requestAnimationFrame(raf);
}

function initializeChartReveal() {
    const trigger = chartWrap || dashboardStage;
    if (!dashboardStage || !trigger || !("IntersectionObserver" in window)) {
        dashboardStage?.classList.add("is-visible");
        return;
    }
    const observer = new IntersectionObserver(entries => {
        entries.forEach(entry => dashboardStage.classList.toggle("is-visible", entry.isIntersecting));
    }, {
        threshold: .55
    });
    observer.observe(trigger);
}

function initializePaymentMarquees() {
    document.querySelectorAll("[data-payment-marquee]").forEach(marquee => {
        if (marquee.dataset.initialized === "true") return;
        const track = marquee.querySelector(".payment-marquee__track");
        const sourceGroup = track?.querySelector(".payment-marquee__group");
        if (!track || !sourceGroup) return;
        marquee.dataset.initialized = "true";
        sourceGroup.querySelectorAll(".payment-marquee__item").forEach((item, index) => {
            item.style.setProperty("--item-index", index);
        });
        for (let copy = 0; copy < 2; copy += 1) {
            const clone = sourceGroup.cloneNode(true);
            clone.setAttribute("aria-hidden", "true");
            clone.removeAttribute("role");
            clone.querySelectorAll('[role="listitem"]').forEach(item => item.removeAttribute("role"));
            track.appendChild(clone);
        }
        const reveal = () => requestAnimationFrame(() => requestAnimationFrame(() => marquee.classList.add("is-inview")));
        if (!("IntersectionObserver" in window)) {
            reveal();
            return;
        }
        const observer = new IntersectionObserver(entries => {
            if (!entries.some(entry => entry.isIntersecting)) return;
            reveal();
            observer.disconnect();
        }, {
            threshold: .25
        });
        observer.observe(marquee);
    });
}

function initializeReveals() {
    if (!reveals.length) return;
    if (reducedMotion) {
        reveals.forEach(target => target.classList.add("is-revealed"));
        reveals.length = 0;
        return;
    }
    renderReveals();
}

function applyPreviewScroll() {
    if (!Number.isFinite(previewScroll) || previewScroll <= 0) return;
    requestAnimationFrame(() => {
        if (lenis) {
            lenis.scrollTo(previewScroll, {
                immediate: true
            });
            lenis.raf(performance.now());
        } else {
            window.scrollTo(0, previewScroll);
        }
        render();
    });
}

window.addEventListener("resize", requestRender);

window.addEventListener("load", () => {
    requestRender();
    applyPreviewScroll();
});

document.fonts?.ready.then(() => {
    phoneAssemblyLayout = "";
    requestRender();
});

initializeSmoothScroll();

initializeChartReveal();

initializePaymentMarquees();

initializeReveals();

render();
