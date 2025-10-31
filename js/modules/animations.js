// Animations Module - Scroll observers and reveal effects
export function initAnimations() {
    // Intersection Observer for scroll animations
    const observerOptions = {
        threshold: 0.1,
        rootMargin: "0px 0px -100px 0px",
    };

    const observer = new IntersectionObserver(function (entries) {
        entries.forEach((entry) => {
            if (entry.isIntersecting) {
                entry.target.classList.add("opacity-100", "translate-y-0");
                entry.target.classList.remove("opacity-0", "translate-y-10");
            }
        });
    }, observerOptions);

    // Observe only story section for animations (menu and home sections are always visible)
    document.querySelectorAll("section#story").forEach((el) => {
        el.classList.add("opacity-0", "translate-y-10", "transition-all", "duration-1000");
        observer.observe(el);
    });

    // Observe individual menu items for staggered animation
    document.querySelectorAll(".menu-item").forEach((el, index) => {
        el.classList.add("opacity-0", "translate-y-10", "transition-all", "duration-700");
        el.style.transitionDelay = `${index * 0.1}s`;
        observer.observe(el);
    });

    // Text reveal animation
    const textElements = document.querySelectorAll(".reveal-text");
    textElements.forEach((el) => {
        el.style.opacity = "0";
        el.style.transform = "translateY(20px)";
    });

    const textObserver = new IntersectionObserver(
        function (entries) {
            entries.forEach((entry) => {
                if (entry.isIntersecting) {
                    entry.target.style.transition = "all 0.8s ease-out";
                    entry.target.style.opacity = "1";
                    entry.target.style.transform = "translateY(0)";
                }
            });
        },
        { threshold: 0.5 }
    );

    textElements.forEach((el) => textObserver.observe(el));
}
