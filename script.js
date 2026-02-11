/* ============================================
   MOEFLAVOR MONTHLY RECAP - JANUARY 2026
   Scroll-Based Storytelling Script
   ============================================ */

// ---- SCROLL REVEAL ----
function initScrollReveal() {
    const reveals = document.querySelectorAll('.reveal');

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');

                // Animate comparison bars when they become visible
                const bars = entry.target.querySelectorAll('.bar-fill');
                bars.forEach((bar, i) => {
                    setTimeout(() => {
                        bar.style.width = bar.dataset.width;
                    }, 200 + (i * 200));
                });

                observer.unobserve(entry.target);
            }
        });
    }, {
        threshold: 0.15,
        rootMargin: '0px 0px -60px 0px'
    });

    reveals.forEach(el => observer.observe(el));
}

// ---- PARALLAX DECORATIONS ----
function initParallax() {
    const decos = document.querySelectorAll('.deco');

    window.addEventListener('scroll', () => {
        const scrollY = window.pageYOffset;

        decos.forEach((deco, i) => {
            const speed = 0.015 + (i * 0.006);
            const yOffset = scrollY * speed;
            deco.style.transform = `translateY(${yOffset}px)`;
        });
    }, { passive: true });
}

// ---- IMAGE PLACEHOLDER HANDLING ----
function initImagePlaceholders() {
    const winImages = document.querySelectorAll('.win-image img');
    winImages.forEach(img => {
        img.addEventListener('load', function() {
            this.closest('.win-image').classList.add('has-image');
        });
        // If already loaded (cached)
        if (img.complete && img.naturalHeight > 0) {
            img.closest('.win-image').classList.add('has-image');
        }
    });

    // Handle video containers
    const videoContainers = document.querySelectorAll('.win-video-container');
    videoContainers.forEach(container => {
        const video = container.querySelector('.win-video');
        if (video) {
            video.addEventListener('loadeddata', function() {
                container.classList.add('has-video');
            });
            // If video fails, fall back to image
            video.addEventListener('error', function() {
                this.style.display = 'none';
            });
            // Check if already loaded
            if (video.readyState >= 2) {
                container.classList.add('has-video');
            }
        }
    });
}

// ---- INIT ----
document.addEventListener('DOMContentLoaded', function() {
    initScrollReveal();
    initParallax();
    initImagePlaceholders();
});
