const faqItems = [ ...document.querySelectorAll(".faq-item") ];

for (const item of faqItems) {
    const trigger = item.querySelector(".faq-q");
    if (!trigger) continue;
    trigger.addEventListener("click", () => {
        const willOpen = !item.classList.contains("is-open");
        for (const other of faqItems) {
            other.classList.remove("is-open");
            other.querySelector(".faq-q")?.setAttribute("aria-expanded", "false");
        }
        if (willOpen) {
            item.classList.add("is-open");
            trigger.setAttribute("aria-expanded", "true");
        }
    });
}
