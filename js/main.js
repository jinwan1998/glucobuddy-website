// ===== MAIN JAVASCRIPT FILE =====

// Global variables
let currentUser = null;
let chatbotOpen = false;

// ===== DOM CONTENT LOADED =====
document.addEventListener('DOMContentLoaded', function() {
    initializeWebsite();
    loadFeedback();
    setupEventListeners();
});

// ===== INITIALIZATION =====
function initializeWebsite() {
    // Check if user is logged in
    const savedUser = localStorage.getItem('glucobuddy_user');
    if (savedUser) {
        currentUser = JSON.parse(savedUser);
        updateUIForLoggedInUser();
    }
    
    // Initialize animations
    initializeAnimations();
    
    // Setup navbar scroll effect
    setupNavbarScroll();
    
    // Setup mobile menu
    setupMobileMenu();
}

// ===== EVENT LISTENERS =====
function setupEventListeners() {
    // Form submissions
    document.getElementById('registerForm').addEventListener('submit', handleRegistration);
    document.getElementById('loginForm').addEventListener('submit', handleLogin);
    document.getElementById('feedbackForm').addEventListener('submit', handleFeedbackSubmission);
    
    // Rating system
    setupRatingSystem();
    
    // Smooth scrolling for navigation links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            const target = document.querySelector(this.getAttribute('href'));
            if (target) {
                target.scrollIntoView({
                    behavior: 'smooth',
                    block: 'start'
                });
            }
        });
    });
}

// ===== NAVBAR FUNCTIONALITY =====
function setupNavbarScroll() {
    window.addEventListener('scroll', function() {
        const navbar = document.getElementById('navbar');
        if (window.scrollY > 50) {
            navbar.classList.add('scrolled');
        } else {
            navbar.classList.remove('scrolled');
        }
    });
}

function setupMobileMenu() {
    const hamburger = document.getElementById('hamburger');
    const navMenu = document.getElementById('nav-menu');
    
    hamburger.addEventListener('click', function() {
        navMenu.classList.toggle('active');
        hamburger.classList.toggle('active');
    });
}

// ===== MODAL FUNCTIONALITY =====
function openModal(modalId) {
    const modal = document.getElementById(modalId);
    if (modal) {
        modal.style.display = 'block';
        document.body.style.overflow = 'hidden';
        
        // Add animation
        setTimeout(() => {
            modal.classList.add('show');
        }, 10);
    }
}

function closeModal(modalId) {
    const modal = document.getElementById(modalId);
    if (modal) {
        modal.classList.remove('show');
        setTimeout(() => {
            modal.style.display = 'none';
            document.body.style.overflow = 'auto';
        }, 300);
    }
}

// Close modal when clicking outside
window.addEventListener('click', function(event) {
    if (event.target.classList.contains('modal')) {
        const modalId = event.target.id;
        closeModal(modalId);
    }
});

// ===== AUTHENTICATION =====
function handleRegistration(e) {
    e.preventDefault();
    
    const formData = {
        name: document.getElementById('regName').value,
        email: document.getElementById('regEmail').value,
        password: document.getElementById('regPassword').value,
        plan: document.getElementById('regPlan').value
    };
    
    // Simulate registration
    const user = {
        id: Date.now(),
        name: formData.name,
        email: formData.email,
        plan: formData.plan,
        registeredAt: new Date().toISOString()
    };
    
    // Save to localStorage (in real app, this would be sent to server)
    localStorage.setItem('glucobuddy_user', JSON.stringify(user));
    currentUser = user;
    
    // Update UI
    updateUIForLoggedInUser();
    closeModal('registerModal');
    
    // Show success message
    showNotification('Account created successfully! Welcome to GlucoBuddy!', 'success');
    
    // Track registration
    trackEvent('user_registered', { plan: formData.plan });
}

function handleLogin(e) {
    e.preventDefault();
    
    const email = document.getElementById('loginEmail').value;
    const password = document.getElementById('loginPassword').value;
    
    // Simulate login (in real app, this would validate with server)
    const user = {
        id: Date.now(),
        name: email.split('@')[0],
        email: email,
        plan: 'pro',
        registeredAt: new Date().toISOString()
    };
    
    localStorage.setItem('glucobuddy_user', JSON.stringify(user));
    currentUser = user;
    
    updateUIForLoggedInUser();
    closeModal('loginModal');
    
    showNotification('Welcome back!', 'success');
    trackEvent('user_logged_in');
}

function updateUIForLoggedInUser() {
    // Update navigation buttons
    const navActions = document.querySelector('.nav-actions');
    if (currentUser) {
        navActions.innerHTML = `
            <span class="user-greeting">Hi, ${currentUser.name}!</span>
            <button class="btn-secondary" onclick="logout()">Logout</button>
        `;
    }
}

function logout() {
    localStorage.removeItem('glucobuddy_user');
    currentUser = null;
    location.reload();
}

// ===== FAQ FUNCTIONALITY =====
function toggleFAQ(element) {
    const faqItem = element.parentElement;
    const answer = faqItem.querySelector('.faq-answer');
    const icon = element.querySelector('i');
    
    // Close other open FAQs
    document.querySelectorAll('.faq-item').forEach(item => {
        if (item !== faqItem) {
            item.classList.remove('active');
            item.querySelector('.faq-answer').style.maxHeight = '0';
            item.querySelector('.faq-question i').style.transform = 'rotate(0deg)';
        }
    });
    
    // Toggle current FAQ
    faqItem.classList.toggle('active');
    
    if (faqItem.classList.contains('active')) {
        answer.style.maxHeight = answer.scrollHeight + 'px';
        icon.style.transform = 'rotate(180deg)';
    } else {
        answer.style.maxHeight = '0';
        icon.style.transform = 'rotate(0deg)';
    }
}

// ===== RATING SYSTEM =====
function setupRatingSystem() {
    const stars = document.querySelectorAll('.rating-input .star');
    let selectedRating = 0;
    
    stars.forEach(star => {
        star.addEventListener('click', function() {
            selectedRating = parseInt(this.dataset.rating);
            updateStarDisplay(selectedRating);
        });
        
        star.addEventListener('mouseover', function() {
            const hoverRating = parseInt(this.dataset.rating);
            updateStarDisplay(hoverRating);
        });
    });
    
    document.querySelector('.rating-input').addEventListener('mouseleave', function() {
        updateStarDisplay(selectedRating);
    });
    
    function updateStarDisplay(rating) {
        stars.forEach((star, index) => {
            if (index < rating) {
                star.classList.add('active');
            } else {
                star.classList.remove('active');
            }
        });
    }
}

// ===== VIDEO FUNCTIONALITY =====
function playVideo() {
    const videoModal = document.getElementById('videoModal');
    const iframe = document.getElementById('demoVideo');
    
    // Set video URL (replace with actual demo video)
    iframe.src = 'https://www.youtube.com/embed/dQw4w9WgXcQ?autoplay=1';
    
    openModal('videoModal');
    trackEvent('demo_video_played');
}

// ===== UTILITY FUNCTIONS =====
function showNotification(message, type = 'info') {
    const notification = document.createElement('div');
    notification.className = `notification notification-${type}`;
    notification.innerHTML = `
        <div class="notification-content">
            <span>${message}</span>
            <button onclick="this.parentElement.parentElement.remove()">×</button>
        </div>
    `;
    
    document.body.appendChild(notification);
    
    // Auto remove after 5 seconds
    setTimeout(() => {
        if (notification.parentElement) {
            notification.remove();
        }
    }, 5000);
}

function trackEvent(eventName, properties = {}) {
    // Analytics tracking (replace with actual analytics service)
    console.log('Event tracked:', eventName, properties);
    
    // Example: Google Analytics
    if (typeof gtag !== 'undefined') {
        gtag('event', eventName, properties);
    }
}

// ===== ANIMATIONS =====
function initializeAnimations() {
    // Intersection Observer for scroll animations
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };
    
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('animate-in');
            }
        });
    }, observerOptions);
    
    // Observe elements for animation
    document.querySelectorAll('.feature-card, .pricing-card, .step, .faq-item').forEach(el => {
        observer.observe(el);
    });
}

// ===== PERFORMANCE OPTIMIZATION =====
// Lazy load images
function lazyLoadImages() {
    const images = document.querySelectorAll('img[data-src]');
    const imageObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const img = entry.target;
                img.src = img.dataset.src;
                img.removeAttribute('data-src');
                imageObserver.unobserve(img);
            }
        });
    });
    
    images.forEach(img => imageObserver.observe(img));
}

// Initialize lazy loading
document.addEventListener('DOMContentLoaded', lazyLoadImages);

// ===== ERROR HANDLING =====
window.addEventListener('error', function(e) {
    console.error('JavaScript error:', e.error);
    trackEvent('javascript_error', {
        message: e.message,
        filename: e.filename,
        lineno: e.lineno
    });
});

// ===== EXPORT FOR OTHER MODULES =====
window.GlucoBuddyWebsite = {
    openModal,
    closeModal,
    showNotification,
    trackEvent,
    currentUser
};
