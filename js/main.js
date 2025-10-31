// Danana's Burger Bar - Main JavaScript Module Orchestrator
import { initCursor } from './modules/cursor.js';
import { initNavigation } from './modules/navigation.js';
import { initVinylPlayer } from './modules/vinyl-player.js';
import { initAnimations } from './modules/animations.js';
import { initLightbox } from './modules/lightbox.js';
import { initMenuDownload } from './modules/menu-download.js';
// import { loadMenu } from './modules/menu-loader.js'; // Not needed - using static HTML

// Loading Screen
window.addEventListener("load", function () {
    console.log("Page loaded, hiding loading screen...");
    setTimeout(() => {
        const loadingScreen = document.getElementById("loadingScreen");
        if (loadingScreen) {
            loadingScreen.classList.add("hidden");
            console.log("Loading screen hidden");
        }
    }, 500); // Reduced to 500ms for faster testing
});

// Initialize all modules when DOM is ready
document.addEventListener('DOMContentLoaded', function() {
    console.log("DOM loaded, initializing modules...");
    try {
        initCursor();
        initNavigation();
        initVinylPlayer();
        initAnimations();
        initLightbox();
        initMenuDownload();
        // loadMenu(); // Menu now uses static HTML in index.html
        initSlideshows();
        initNewsletterSubscription();
        console.log("All modules initialized successfully");
    } catch (error) {
        console.error("Error initializing modules:", error);
    }
});

// Slideshow functionality
function initSlideshows() {
    let currentSlide = 0;
    const slides = document.querySelectorAll(".polaroid-slide");
    const indicators = document.querySelectorAll(".slide-indicator");
    const track = document.getElementById("polaroidTrack");

    if (!track || slides.length === 0) return;

    function updateSlideshow() {
        track.style.transform = `translateX(-${currentSlide * 100}%)`;
        
        indicators.forEach((indicator, index) => {
            if (index === currentSlide) {
                indicator.classList.add("active");
            } else {
                indicator.classList.remove("active");
            }
        });
    }

    window.nextSlide = function() {
        currentSlide = (currentSlide + 1) % slides.length;
        updateSlideshow();
    };

    window.prevSlide = function() {
        currentSlide = (currentSlide - 1 + slides.length) % slides.length;
        updateSlideshow();
    };

    window.goToSlide = function(index) {
        currentSlide = index;
        updateSlideshow();
    };

    // Initialize slideshow
    updateSlideshow();

    // Auto-advance slideshow
    setInterval(() => {
        window.nextSlide();
    }, 4000);
}

// Newsletter subscription functionality
function initNewsletterSubscription() {
    const emailInput = document.querySelector('input[type="email"]');
    const subscribeBtn = document.querySelector('button[onclick*="subscribe"]');

    if (emailInput) {
        emailInput.addEventListener("keypress", function (e) {
            if (e.key === "Enter") {
                handleSubscription(this.value);
                this.value = "";
            }
        });
    }

    if (subscribeBtn) {
        subscribeBtn.addEventListener("click", function () {
            if (emailInput && emailInput.value) {
                handleSubscription(emailInput.value);
                emailInput.value = "";
            } else {
                alert("Please enter your email address.");
            }
        });
    }
}

function handleSubscription(email) {
    if (email && email.includes("@")) {
        alert("Thanks for subscribing! We'll keep you updated on our grand opening and pop-up events. 🍔");
    } else {
        alert("Please enter a valid email address.");
    }
}

// Map pin interactions (if needed)
document.addEventListener('DOMContentLoaded', function() {
    document.querySelectorAll(".map-pin").forEach((pin) => {
        pin.addEventListener("click", function () {
            const location = this.getAttribute("data-location");
            const date = this.getAttribute("data-date");
            const special = this.getAttribute("data-special");
            alert(`📍 ${location}\n📅 ${date}\n🍔 Special: ${special}`);
        });
    });
});
