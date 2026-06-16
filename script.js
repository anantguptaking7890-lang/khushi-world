/**
 * KHUSHI'S PREMIUM FRIENDSHIP WEBSITE
 * Interactive JavaScript for smooth animations and functionality
 */

// ========== PAGE TRANSITIONS ==========

/**
 * Smooth page transition helper
 */
function smoothTransition(destination, outAnimation = 'fade-out-up') {
    const body = document.body;
    body.style.animation = `${outAnimation} 0.6s ease forwards`;
    
    setTimeout(() => {
        window.location.href = destination;
    }, 600);
}

/**
 * Add entrance animation
 */
function addEntranceAnimation() {
    const elements = document.querySelectorAll('[data-entrance]');
    elements.forEach(el => {
        el.style.animation = `${el.dataset.entrance} 0.8s ease forwards`;
    });
}

// ========== INTERSECTION OBSERVER FOR SCROLL ANIMATIONS ==========

/**
 * Scroll reveal animation observer
 */
function initScrollAnimations() {
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '50px 0px'
    };

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const element = entry.target;
                element.style.opacity = '1';
                element.style.transform = 'translateY(0)';
                observer.unobserve(element);
            }
        });
    }, observerOptions);

    document.querySelectorAll('.scroll-reveal').forEach(el => {
        observer.observe(el);
    });
}

// ========== PARALLAX EFFECT ==========

/**
 * Add parallax effect to background elements
 */
function initParallax() {
    const parallaxElements = document.querySelectorAll('.parallax');
    
    window.addEventListener('mousemove', (e) => {
        const x = e.clientX / window.innerWidth;
        const y = e.clientY / window.innerHeight;

        parallaxElements.forEach((element, index) => {
            const offsetX = (x - 0.5) * (index + 1) * 20;
            const offsetY = (y - 0.5) * (index + 1) * 20;
            
            element.style.transform = `translate(${offsetX}px, ${offsetY}px)`;
        });
    });
}

// ========== SMOOTH SCROLL ==========

/**
 * Smooth scroll to sections
 */
function initSmoothScroll() {
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            const href = this.getAttribute('href');
            if (href === '#') return;
            
            e.preventDefault();
            
            const target = document.querySelector(href);
            if (!target) return;
            
            target.scrollIntoView({
                behavior: 'smooth',
                block: 'start'
            });
        });
    });
}

// ========== BUTTON RIPPLE EFFECT ==========

/**
 * Add ripple effect to interactive elements
 */
function initRippleEffects() {
    const clickableElements = document.querySelectorAll(
        '.glow-button, .nav-btn, .music-btn, .name-button'
    );

    clickableElements.forEach(element => {
        element.addEventListener('click', function(e) {
            const ripple = document.createElement('span');
            const rect = this.getBoundingClientRect();
            const size = Math.max(rect.width, rect.height);
            const x = e.clientX - rect.left - size / 2;
            const y = e.clientY - rect.top - size / 2;

            ripple.style.width = ripple.style.height = size + 'px';
            ripple.style.left = x + 'px';
            ripple.style.top = y + 'px';
            ripple.classList.add('ripple');

            this.appendChild(ripple);

            setTimeout(() => ripple.remove(), 600);
        });
    });
}

// ========== HOVER EFFECTS ==========

/**
 * Add 3D tilt effect to cards
 */
function initCardTiltEffect() {
    const cards = document.querySelectorAll('.country-card, .quality-card');

    cards.forEach(card => {
        card.addEventListener('mousemove', (e) => {
            const rect = card.getBoundingClientRect();
            const x = e.clientX - rect.left;
            const y = e.clientY - rect.top;

            const centerX = rect.width / 2;
            const centerY = rect.height / 2;

            const rotateX = (y - centerY) / 10;
            const rotateY = (centerX - x) / 10;

            card.style.transform = `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg)`;
        });

        card.addEventListener('mouseleave', () => {
            card.style.transform = 'perspective(1000px) rotateX(0) rotateY(0)';
        });
    });
}

// ========== KEYBOARD SHORTCUTS ==========

/**
 * Handle keyboard shortcuts
 */
function initKeyboardShortcuts() {
    document.addEventListener('keydown', (e) => {
        // Escape key
        if (e.key === 'Escape') {
            const modal = document.querySelector('.modal.active');
            if (modal) {
                modal.classList.remove('active');
            }
        }

        // Enter key for button
        if (e.key === 'Enter') {
            const focusedButton = document.querySelector('.glow-button:focus');
            if (focusedButton) {
                focusedButton.click();
            }
        }
    });
}

// ========== LAZY LOADING ==========

/**
 * Lazy load images
 */
function initLazyLoading() {
    const images = document.querySelectorAll('img[loading="lazy"]');

    if ('IntersectionObserver' in window) {
        const imageObserver = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    const img = entry.target;
                    img.src = img.src || img.dataset.src;
                    img.classList.add('loaded');
                    imageObserver.unobserve(img);
                }
            });
        });

        images.forEach(img => imageObserver.observe(img));
    } else {
        images.forEach(img => {
            img.src = img.src || img.dataset.src;
        });
    }
}

// ========== ACCESSIBILITY FEATURES ==========

/**
 * Add focus management for keyboard navigation
 */
function initAccessibility() {
    // Tab index management
    document.querySelectorAll('button, a[href], input').forEach(element => {
        if (!element.hasAttribute('tabindex')) {
            element.setAttribute('tabindex', '0');
        }
    });

    // Skip to main content
    const skipLink = document.createElement('a');
    skipLink.href = '#main';
    skipLink.className = 'skip-link';
    skipLink.textContent = 'Skip to main content';
    document.body.insertBefore(skipLink, document.body.firstChild);
}

// ========== RESPONSIVE HANDLING ==========

/**
 * Handle responsive design changes
 */
function initResponsiveHandling() {
    const mediaQuery = window.matchMedia('(max-width: 768px)');

    function handleMediaChange(e) {
        if (e.matches) {
            // Mobile view
            document.body.classList.add('mobile-view');
        } else {
            // Desktop view
            document.body.classList.remove('mobile-view');
        }
    }

    mediaQuery.addListener(handleMediaChange);
    handleMediaChange(mediaQuery);
}

// ========== PERFORMANCE OPTIMIZATION ==========

/**
 * Debounce function
 */
function debounce(func, delay) {
    let timeoutId;
    return function(...args) {
        clearTimeout(timeoutId);
        timeoutId = setTimeout(() => func(...args), delay);
    };
}

/**
 * Throttle function
 */
function throttle(func, delay) {
    let lastCalled = 0;
    return function(...args) {
        const now = Date.now();
        if (now - lastCalled >= delay) {
            func(...args);
            lastCalled = now;
        }
    };
}

// ========== MEMORY OPTIMIZATION ==========

/**
 * Cleanup on page unload
 */
function initCleanup() {
    window.addEventListener('beforeunload', () => {
        // Pause animations
        document.querySelectorAll('[style*="animation"]').forEach(el => {
            el.style.animationPlayState = 'paused';
        });
    });
}

// ========== ERROR HANDLING ==========

/**
 * Global error handler
 */
window.addEventListener('error', (event) => {
    console.error('Script error:', event.error);
});

// ========== INITIALIZATION ==========

/**
 * Main initialization function
 */
function initializeWebsite() {
    // Wait for DOM to be fully loaded
    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', init);
    } else {
        init();
    }

    function init() {
        // Disable animations during print
        if (window.matchMedia('print').matches) {
            document.body.style.animation = 'none';
        }

        // Initialize all features
        initScrollAnimations();
        initParallax();
        initSmoothScroll();
        initRippleEffects();
        initCardTiltEffect();
        initKeyboardShortcuts();
        initLazyLoading();
        initAccessibility();
        initResponsiveHandling();
        initCleanup();

        // Log initialization
        console.log('🎀 Khushi\'s Website Initialized Successfully!');
    }
}

// ========== PAGE LOAD TRANSITION ==========

/**
 * Show page with fade-in animation
 */
function fadeInPage() {
    document.body.style.animation = 'fade-in 0.8s ease forwards';
}

// ========== START INITIALIZATION ==========
initializeWebsite();

// Fade in on page load
window.addEventListener('load', fadeInPage);

// ========== UTILITY FUNCTIONS ==========

/**
 * Check if element is in viewport
 */
function isInViewport(element) {
    const rect = element.getBoundingClientRect();
    return (
        rect.top >= 0 &&
        rect.left >= 0 &&
        rect.bottom <= (window.innerHeight || document.documentElement.clientHeight) &&
        rect.right <= (window.innerWidth || document.documentElement.clientWidth)
    );
}

/**
 * Get scroll percentage
 */
function getScrollPercentage() {
    const windowHeight = document.documentElement.scrollHeight - window.innerHeight;
    return (window.scrollY / windowHeight) * 100;
}

/**
 * Animate number counter
 */
function animateCounter(element, target, duration = 2000) {
    const start = 0;
    const startTime = Date.now();

    function updateCounter() {
        const elapsed = Date.now() - startTime;
        const progress = Math.min(elapsed / duration, 1);
        const current = Math.floor(start + (target - start) * progress);

        element.textContent = current;

        if (progress < 1) {
            requestAnimationFrame(updateCounter);
        }
    }

    requestAnimationFrame(updateCounter);
}

/**
 * Preload images
 */
function preloadImages(urls) {
    urls.forEach(url => {
        const img = new Image();
        img.src = url;
    });
}

/**
 * Request animation frame polyfill
 */
if (!window.requestAnimationFrame) {
    window.requestAnimationFrame = (callback) => {
        return setTimeout(callback, 1000 / 60);
    };
}

if (!window.cancelAnimationFrame) {
    window.cancelAnimationFrame = (id) => {
        clearTimeout(id);
    };
}

/**
 * Smooth scroll polyfill for older browsers
 */
if (!Element.prototype.scrollIntoView) {
    Element.prototype.scrollIntoView = function() {
        window.scrollTo(0, this.offsetTop);
    };
}
