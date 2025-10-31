// Custom Cursor Module
export function initCursor() {
    const cursor = document.getElementById("customCursor");
    let mouseX = 0, mouseY = 0;
    let cursorX = 0, cursorY = 0;

    document.addEventListener("mousemove", function (e) {
        mouseX = e.clientX;
        mouseY = e.clientY;
    });

    function animateCursor() {
        cursorX += (mouseX - cursorX) * 0.1;
        cursorY += (mouseY - cursorY) * 0.1;

        cursor.style.left = cursorX + "px";
        cursor.style.top = cursorY + "px";

        requestAnimationFrame(animateCursor);
    }
    animateCursor();

    // Cursor hover effects
    document.querySelectorAll(
        "button, .polaroid, .menu-item, .nav-link, .product-card, .map-pin"
    ).forEach((element) => {
        element.addEventListener("mouseenter", () =>
            cursor.classList.add("hover")
        );
        element.addEventListener("mouseleave", () =>
            cursor.classList.remove("hover")
        );
    });
}
