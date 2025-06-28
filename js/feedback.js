// ===== FEEDBACK SYSTEM =====

// Sample feedback data (in real app, this would come from a database)
let feedbackData = [
    {
        id: 1,
        name: "Sarah Chen",
        rating: 5,
        message: "GlucoBuddy has completely transformed how I manage my diabetes. The AI food recognition is incredibly accurate - it even recognized my homemade Malaysian curry! The Bluetooth sync with my Accu-Chek meter saves so much time.",
        date: "2024-01-15",
        verified: true,
        plan: "pro",
        avatar: "https://images.unsplash.com/photo-1494790108755-2616b612b786?w=150&h=150&fit=crop&crop=face"
    },
    {
        id: 2,
        name: "Michael Rodriguez",
        rating: 5,
        message: "As a Type 1 diabetic for 15 years, I've tried every app out there. GlucoBuddy's analytics and personalized recommendations are game-changing. The BMI/BMR calculator with glucose correlation insights helped me optimize my diet.",
        date: "2024-01-12",
        verified: true,
        plan: "family",
        avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&h=150&fit=crop&crop=face"
    },
    {
        id: 3,
        name: "Jennifer Park",
        rating: 4,
        message: "Love the app! The food photo recognition works great for restaurant meals. My only wish is for more Asian food options in the database, but the team is constantly improving it. Customer support is excellent too.",
        date: "2024-01-10",
        verified: true,
        plan: "pro",
        avatar: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=150&h=150&fit=crop&crop=face"
    },
    {
        id: 4,
        name: "David Thompson",
        rating: 5,
        message: "The Bluetooth integration with my FreeStyle Libre is seamless. No more manual logging! The trend analysis helped me identify patterns I never noticed before. Worth every penny of the Pro subscription.",
        date: "2024-01-08",
        verified: true,
        plan: "pro",
        avatar: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=150&h=150&fit=crop&crop=face"
    },
    {
        id: 5,
        name: "Lisa Wang",
        rating: 5,
        message: "Managing diabetes for my whole family (3 diabetics) was overwhelming until we found GlucoBuddy. The Family plan lets us share insights and support each other. The AI recognition even works for my kids' school lunches!",
        date: "2024-01-05",
        verified: true,
        plan: "family",
        avatar: "https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=150&h=150&fit=crop&crop=face"
    },
    {
        id: 6,
        name: "Robert Johnson",
        rating: 4,
        message: "Great app for diabetes management. The glucose meter sync works perfectly with my OneTouch Verio. The health recommendations are practical and easy to follow. Looking forward to more features!",
        date: "2024-01-03",
        verified: true,
        plan: "pro",
        avatar: "https://images.unsplash.com/photo-1560250097-0b93528c311a?w=150&h=150&fit=crop&crop=face"
    }
];

let selectedRating = 0;

// ===== FEEDBACK DISPLAY =====
function loadFeedback() {
    const feedbackGrid = document.getElementById('feedbackGrid');
    if (!feedbackGrid) return;
    
    // Sort feedback by date (newest first)
    const sortedFeedback = feedbackData.sort((a, b) => new Date(b.date) - new Date(a.date));
    
    feedbackGrid.innerHTML = sortedFeedback.map(feedback => createFeedbackCard(feedback)).join('');
    
    // Add animation
    setTimeout(() => {
        document.querySelectorAll('.feedback-card').forEach((card, index) => {
            setTimeout(() => {
                card.classList.add('show');
            }, index * 100);
        });
    }, 100);
}

function createFeedbackCard(feedback) {
    const stars = '★'.repeat(feedback.rating) + '☆'.repeat(5 - feedback.rating);
    const planBadge = feedback.plan === 'family' ? 'Family' : feedback.plan === 'pro' ? 'Pro' : 'Free';
    const verifiedBadge = feedback.verified ? '<i class="fas fa-check-circle verified-badge" title="Verified User"></i>' : '';
    
    return `
        <div class="feedback-card" data-rating="${feedback.rating}">
            <div class="feedback-header">
                <div class="feedback-user">
                    <img src="${feedback.avatar}" alt="${feedback.name}" class="user-avatar" loading="lazy">
                    <div class="user-info">
                        <h4 class="user-name">${feedback.name} ${verifiedBadge}</h4>
                        <span class="user-plan">${planBadge} User</span>
                    </div>
                </div>
                <div class="feedback-rating">
                    <span class="stars">${stars}</span>
                    <span class="rating-number">${feedback.rating}/5</span>
                </div>
            </div>
            <div class="feedback-content">
                <p class="feedback-message">${feedback.message}</p>
                <div class="feedback-date">${formatDate(feedback.date)}</div>
            </div>
        </div>
    `;
}

function formatDate(dateString) {
    const date = new Date(dateString);
    const now = new Date();
    const diffTime = Math.abs(now - date);
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
    
    if (diffDays === 1) return 'Yesterday';
    if (diffDays < 7) return `${diffDays} days ago`;
    if (diffDays < 30) return `${Math.ceil(diffDays / 7)} weeks ago`;
    
    return date.toLocaleDateString('en-US', { 
        year: 'numeric', 
        month: 'long', 
        day: 'numeric' 
    });
}

// ===== FEEDBACK SUBMISSION =====
function handleFeedbackSubmission(e) {
    e.preventDefault();
    
    const name = document.getElementById('feedbackName').value;
    const email = document.getElementById('feedbackEmail').value;
    const message = document.getElementById('feedbackMessage').value;
    
    if (!selectedRating) {
        showNotification('Please select a rating before submitting.', 'warning');
        return;
    }
    
    if (!name || !message) {
        showNotification('Please fill in all required fields.', 'warning');
        return;
    }
    
    // Create new feedback object
    const newFeedback = {
        id: Date.now(),
        name: name,
        rating: selectedRating,
        message: message,
        date: new Date().toISOString().split('T')[0],
        verified: false, // New feedback starts unverified
        plan: window.GlucoBuddyWebsite?.currentUser?.plan || 'free',
        avatar: generateAvatar(name)
    };
    
    // Add to feedback data
    feedbackData.unshift(newFeedback);
    
    // Save to localStorage (in real app, this would be sent to server)
    localStorage.setItem('glucobuddy_feedback', JSON.stringify(feedbackData));
    
    // Reload feedback display
    loadFeedback();
    
    // Reset form
    document.getElementById('feedbackForm').reset();
    selectedRating = 0;
    updateStarDisplay(0);
    
    // Show success message
    showNotification('Thank you for your feedback! Your review has been submitted.', 'success');
    
    // Track feedback submission
    if (window.GlucoBuddyWebsite) {
        window.GlucoBuddyWebsite.trackEvent('feedback_submitted', {
            rating: selectedRating,
            has_email: !!email,
            message_length: message.length
        });
    }
    
    // Scroll to feedback section to show new review
    setTimeout(() => {
        document.getElementById('feedback').scrollIntoView({ behavior: 'smooth' });
    }, 500);
}

function generateAvatar(name) {
    // Generate a placeholder avatar URL based on name
    const initials = name.split(' ').map(n => n[0]).join('').toUpperCase();
    return `https://ui-avatars.com/api/?name=${encodeURIComponent(name)}&background=007aff&color=fff&size=150`;
}

// ===== RATING SYSTEM =====
function setupRatingSystem() {
    const stars = document.querySelectorAll('.rating-input .star');
    
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
}

function updateStarDisplay(rating) {
    const stars = document.querySelectorAll('.rating-input .star');
    stars.forEach((star, index) => {
        if (index < rating) {
            star.classList.add('active');
        } else {
            star.classList.remove('active');
        }
    });
}

// ===== FEEDBACK FILTERING =====
function filterFeedback(rating = 'all') {
    const feedbackCards = document.querySelectorAll('.feedback-card');
    
    feedbackCards.forEach(card => {
        const cardRating = parseInt(card.dataset.rating);
        
        if (rating === 'all' || cardRating === rating) {
            card.style.display = 'block';
            setTimeout(() => card.classList.add('show'), 10);
        } else {
            card.classList.remove('show');
            setTimeout(() => card.style.display = 'none', 300);
        }
    });
}

function addFilterButtons() {
    const feedbackSection = document.getElementById('feedback');
    const filterContainer = document.createElement('div');
    filterContainer.className = 'feedback-filters';
    filterContainer.innerHTML = `
        <div class="filter-buttons">
            <button class="filter-btn active" onclick="filterFeedback('all')">All Reviews</button>
            <button class="filter-btn" onclick="filterFeedback(5)">5 Stars</button>
            <button class="filter-btn" onclick="filterFeedback(4)">4 Stars</button>
            <button class="filter-btn" onclick="filterFeedback(3)">3 Stars</button>
        </div>
    `;
    
    // Insert after section header
    const sectionHeader = feedbackSection.querySelector('.section-header');
    sectionHeader.insertAdjacentElement('afterend', filterContainer);
    
    // Add click handlers for filter buttons
    document.querySelectorAll('.filter-btn').forEach(btn => {
        btn.addEventListener('click', function() {
            document.querySelectorAll('.filter-btn').forEach(b => b.classList.remove('active'));
            this.classList.add('active');
        });
    });
}

// ===== FEEDBACK STATISTICS =====
function calculateFeedbackStats() {
    const totalReviews = feedbackData.length;
    const averageRating = feedbackData.reduce((sum, feedback) => sum + feedback.rating, 0) / totalReviews;
    
    const ratingDistribution = {
        5: feedbackData.filter(f => f.rating === 5).length,
        4: feedbackData.filter(f => f.rating === 4).length,
        3: feedbackData.filter(f => f.rating === 3).length,
        2: feedbackData.filter(f => f.rating === 2).length,
        1: feedbackData.filter(f => f.rating === 1).length
    };
    
    return {
        totalReviews,
        averageRating: Math.round(averageRating * 10) / 10,
        ratingDistribution
    };
}

function displayFeedbackStats() {
    const stats = calculateFeedbackStats();
    const statsContainer = document.createElement('div');
    statsContainer.className = 'feedback-stats';
    statsContainer.innerHTML = `
        <div class="stats-overview">
            <div class="stat-item">
                <span class="stat-number">${stats.averageRating}</span>
                <span class="stat-label">Average Rating</span>
                <div class="stat-stars">${'★'.repeat(Math.floor(stats.averageRating))}${'☆'.repeat(5 - Math.floor(stats.averageRating))}</div>
            </div>
            <div class="stat-item">
                <span class="stat-number">${stats.totalReviews}</span>
                <span class="stat-label">Total Reviews</span>
            </div>
        </div>
    `;
    
    // Insert before feedback grid
    const feedbackGrid = document.getElementById('feedbackGrid');
    feedbackGrid.parentNode.insertBefore(statsContainer, feedbackGrid);
}

// ===== INITIALIZATION =====
document.addEventListener('DOMContentLoaded', function() {
    // Load saved feedback from localStorage
    const savedFeedback = localStorage.getItem('glucobuddy_feedback');
    if (savedFeedback) {
        feedbackData = JSON.parse(savedFeedback);
    }
    
    // Setup feedback system
    setupRatingSystem();
    loadFeedback();
    displayFeedbackStats();
    addFilterButtons();
    
    // Setup form submission
    const feedbackForm = document.getElementById('feedbackForm');
    if (feedbackForm) {
        feedbackForm.addEventListener('submit', handleFeedbackSubmission);
    }
});

// ===== UTILITY FUNCTIONS =====
function showNotification(message, type = 'info') {
    if (window.GlucoBuddyWebsite && window.GlucoBuddyWebsite.showNotification) {
        window.GlucoBuddyWebsite.showNotification(message, type);
    } else {
        alert(message); // Fallback
    }
}

// ===== EXPORT FUNCTIONS =====
window.FeedbackSystem = {
    loadFeedback,
    handleFeedbackSubmission,
    filterFeedback,
    calculateFeedbackStats
};
