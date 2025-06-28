// ===== ANIMATION SYSTEM =====

// Animation configuration
const animationConfig = {
    duration: 600,
    easing: 'ease-out',
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
};

// Animation classes
const animations = {
    fadeIn: 'animate-fade-in',
    slideUp: 'animate-slide-up',
    slideDown: 'animate-slide-down',
    slideLeft: 'animate-slide-left',
    slideRight: 'animate-slide-right',
    scaleIn: 'animate-scale-in',
    rotateIn: 'animate-rotate-in'
};

// ===== INTERSECTION OBSERVER =====
let animationObserver;

function initializeAnimations() {
    // Create intersection observer
    animationObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const element = entry.target;
                const animationType = element.dataset.animation || 'fadeIn';
                const delay = parseInt(element.dataset.delay) || 0;
                
                setTimeout(() => {
                    element.classList.add(animations[animationType] || animations.fadeIn);
                    element.classList.add('animated');
                }, delay);
                
                // Stop observing once animated
                animationObserver.unobserve(element);
            }
        });
    }, {
        threshold: animationConfig.threshold,
        rootMargin: animationConfig.rootMargin
    });
    
    // Observe all elements with animation data attributes
    observeAnimationElements();
}

function observeAnimationElements() {
    const elementsToAnimate = document.querySelectorAll('[data-animation]');
    elementsToAnimate.forEach(element => {
        animationObserver.observe(element);
    });
    
    // Auto-detect elements that should be animated
    const autoAnimateSelectors = [
        '.feature-card',
        '.pricing-card',
        '.step',
        '.faq-item',
        '.feedback-card',
        '.contact-item'
    ];
    
    autoAnimateSelectors.forEach(selector => {
        const elements = document.querySelectorAll(selector);
        elements.forEach((element, index) => {
            if (!element.dataset.animation) {
                element.dataset.animation = 'slideUp';
                element.dataset.delay = index * 100; // Stagger animation
                animationObserver.observe(element);
            }
        });
    });
}

// ===== SCROLL ANIMATIONS =====
function initializeScrollAnimations() {
    // Parallax effect for hero section
    const heroSection = document.querySelector('.hero');
    if (heroSection) {
        window.addEventListener('scroll', () => {
            const scrolled = window.pageYOffset;
            const rate = scrolled * -0.5;
            heroSection.style.transform = `translateY(${rate}px)`;
        });
    }
    
    // Navbar background change on scroll
    const navbar = document.getElementById('navbar');
    if (navbar) {
        window.addEventListener('scroll', () => {
            if (window.scrollY > 50) {
                navbar.classList.add('scrolled');
            } else {
                navbar.classList.remove('scrolled');
            }
        });
    }
    
    // Progress indicator
    createScrollProgressIndicator();
}

function createScrollProgressIndicator() {
    const progressBar = document.createElement('div');
    progressBar.className = 'scroll-progress';
    progressBar.innerHTML = '<div class="scroll-progress-bar"></div>';
    document.body.appendChild(progressBar);
    
    const progressBarFill = progressBar.querySelector('.scroll-progress-bar');
    
    window.addEventListener('scroll', () => {
        const scrollTop = window.pageYOffset;
        const docHeight = document.documentElement.scrollHeight - window.innerHeight;
        const scrollPercent = (scrollTop / docHeight) * 100;
        
        progressBarFill.style.width = `${scrollPercent}%`;
    });
}

// ===== FLOATING ELEMENTS ANIMATION =====
function animateFloatingElements() {
    const floatingElements = document.querySelectorAll('.floating-card');
    
    floatingElements.forEach((element, index) => {
        // Different animation delays and directions
        const delay = index * 1000;
        const duration = 3000 + (index * 500);
        
        element.style.animationDelay = `${delay}ms`;
        element.style.animationDuration = `${duration}ms`;
        
        // Add random movement
        setInterval(() => {
            const randomX = (Math.random() - 0.5) * 20;
            const randomY = (Math.random() - 0.5) * 20;
            
            element.style.transform = `translate(${randomX}px, ${randomY}px)`;
        }, 2000 + (index * 500));
    });
}

// ===== TYPING ANIMATION =====
function createTypingAnimation(element, text, speed = 50) {
    let i = 0;
    element.innerHTML = '';
    
    function typeWriter() {
        if (i < text.length) {
            element.innerHTML += text.charAt(i);
            i++;
            setTimeout(typeWriter, speed);
        }
    }
    
    typeWriter();
}

// ===== COUNTER ANIMATION =====
function animateCounters() {
    const counters = document.querySelectorAll('.stat-number');
    
    counters.forEach(counter => {
        const target = parseInt(counter.textContent.replace(/[^\d]/g, ''));
        const duration = 2000;
        const increment = target / (duration / 16);
        let current = 0;
        
        const updateCounter = () => {
            current += increment;
            if (current < target) {
                counter.textContent = Math.floor(current).toLocaleString();
                requestAnimationFrame(updateCounter);
            } else {
                counter.textContent = target.toLocaleString();
            }
        };
        
        // Start animation when element is visible
        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    updateCounter();
                    observer.unobserve(entry.target);
                }
            });
        });
        
        observer.observe(counter);
    });
}

// ===== SMOOTH SCROLLING =====
function initializeSmoothScrolling() {
    // Smooth scroll for anchor links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            const target = document.querySelector(this.getAttribute('href'));
            
            if (target) {
                const offsetTop = target.offsetTop - 70; // Account for fixed navbar
                
                window.scrollTo({
                    top: offsetTop,
                    behavior: 'smooth'
                });
            }
        });
    });
}

// ===== MOUSE TRAIL EFFECT =====
function createMouseTrail() {
    const trail = [];
    const trailLength = 10;
    
    // Create trail elements
    for (let i = 0; i < trailLength; i++) {
        const dot = document.createElement('div');
        dot.className = 'mouse-trail-dot';
        dot.style.cssText = `
            position: fixed;
            width: 4px;
            height: 4px;
            background: var(--primary-color);
            border-radius: 50%;
            pointer-events: none;
            z-index: 9999;
            opacity: ${1 - (i / trailLength)};
            transition: all 0.1s ease;
        `;
        document.body.appendChild(dot);
        trail.push(dot);
    }
    
    // Update trail position
    document.addEventListener('mousemove', (e) => {
        trail.forEach((dot, index) => {
            setTimeout(() => {
                dot.style.left = e.clientX + 'px';
                dot.style.top = e.clientY + 'px';
            }, index * 10);
        });
    });
}

// ===== LOADING ANIMATION =====
function createLoadingAnimation() {
    const loader = document.createElement('div');
    loader.className = 'page-loader';
    loader.innerHTML = `
        <div class="loader-content">
            <div class="loader-logo">
                <img src="./assets/logo.png" alt="GlucoBuddy">
            </div>
            <div class="loader-spinner"></div>
            <div class="loader-text">Loading GlucoBuddy...</div>
        </div>
    `;
    
    document.body.appendChild(loader);
    
    // Remove loader when page is loaded
    window.addEventListener('load', () => {
        setTimeout(() => {
            loader.classList.add('fade-out');
            setTimeout(() => {
                loader.remove();
            }, 500);
        }, 1000);
    });
}

// ===== INITIALIZATION =====
document.addEventListener('DOMContentLoaded', function() {
    // Initialize all animations
    initializeAnimations();
    initializeScrollAnimations();
    initializeSmoothScrolling();
    animateFloatingElements();
    animateCounters();
    
    // Optional effects (can be disabled for performance)
    if (window.innerWidth > 768) { // Only on desktop
        createMouseTrail();
    }
    
    // Show loading animation
    createLoadingAnimation();
});

// ===== PERFORMANCE OPTIMIZATION =====
// Throttle scroll events
function throttle(func, limit) {
    let inThrottle;
    return function() {
        const args = arguments;
        const context = this;
        if (!inThrottle) {
            func.apply(context, args);
            inThrottle = true;
            setTimeout(() => inThrottle = false, limit);
        }
    }
}

// Debounce resize events
function debounce(func, wait) {
    let timeout;
    return function executedFunction(...args) {
        const later = () => {
            clearTimeout(timeout);
            func(...args);
        };
        clearTimeout(timeout);
        timeout = setTimeout(later, wait);
    };
}

// ===== EXPORT FOR OTHER MODULES =====
window.AnimationSystem = {
    initializeAnimations,
    animateCounters,
    createTypingAnimation,
    throttle,
    debounce
};
