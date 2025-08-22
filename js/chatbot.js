// ===== GLUCOBUDDY CHATBOT =====

// Chatbot knowledge base
const chatbotKnowledge = {
    // Features and functionality
    'ai food recognition': {
        response: "GlucoBuddy's AI food recognition uses advanced machine learning to identify food with 95% accuracy! Just snap a photo and get instant nutritional information including calories, carbs, and sugar content. It recognizes thousands of foods including McDonald's meals, local cuisines, and home-cooked dishes.",
        keywords: ['ai', 'food', 'recognition', 'photo', 'camera', 'identify', 'nutrition']
    },
    
    'bluetooth glucose meter': {
        response: "Yes! GlucoBuddy supports real Bluetooth connectivity with major glucose meter brands including Accu-Chek, OneTouch, FreeStyle Libre, Contour, and Dexcom. Your readings sync automatically, and you can access historical data from your meter.",
        keywords: ['bluetooth', 'glucose', 'meter', 'sync', 'connect', 'device', 'accu-chek', 'onetouch', 'freestyle', 'dexcom']
    },
    
    'bmi bmr calculator': {
        response: "Our BMI/BMR calculator uses medically-approved formulas to provide personalized health insights. It calculates your Body Mass Index and Basal Metabolic Rate, then gives you actionable advice for nutrition, exercise, and glucose management based on your specific data.",
        keywords: ['bmi', 'bmr', 'calculator', 'health', 'weight', 'metabolism', 'calories']
    },
    
    'data analysis': {
        response: "GlucoBuddy provides comprehensive data analysis including glucose pattern recognition, trend forecasting, variability assessment, and personalized health recommendations. Our analytics help you understand your diabetes patterns and make informed decisions.",
        keywords: ['analysis', 'data', 'patterns', 'trends', 'insights', 'analytics', 'reports']
    },
    
    // Pricing and plans
    'pricing': {
        response: "We offer three advertising plans for merchants: Basic, Premium, and Enterprise. Each plan is tailored to meet different business needs. Please refer to the Pricing section for detailed features and pricing.",
        keywords: ['price', 'cost', 'plan', 'subscription', 'free', 'pro', 'family', 'money', 'guarantee', 'advertising plans', 'merchant plans', 'pricing tiers']
    },
    
    'free trial': {
        response: "Our user rewards system allows you to earn points through engagement. As you accumulate points, you can level up and redeem benefits. Check the Pricing section for more details",
        keywords: ['trial', 'free', 'demo', 'test', 'try', 'user rewards', 'earn points', 'redeem benefits', 'user levels']
    },
    
    // Technical support
    'compatibility': {
        response: "GlucoBuddy works on iOS 12+ and Android 8+. For Bluetooth features, your device needs Bluetooth LE support. The app works with most modern smartphones and tablets. We also have a web dashboard for computer access.",
        keywords: ['compatible', 'ios', 'android', 'phone', 'tablet', 'requirements', 'system']
    },
    
    'data security': {
        response: "Your health data is completely secure! We use bank-level encryption, comply with HIPAA regulations, and never share your data without explicit consent. All data is encrypted both in transit and at rest. You have full control over your information.",
        keywords: ['security', 'privacy', 'safe', 'hipaa', 'encryption', 'data', 'protection']
    },
    
    // Health and diabetes
    'diabetes management': {
        response: "GlucoBuddy helps you manage diabetes through comprehensive tracking, AI-powered insights, and personalized recommendations. Track glucose, food, exercise, and medications while getting actionable advice for better health outcomes.",
        keywords: ['diabetes', 'management', 'tracking', 'health', 'glucose', 'blood sugar']
    },
    
    'accuracy': {
        response: "Our AI food recognition achieves 95% accuracy across thousands of food items. Glucose meter integration provides real-time, accurate readings directly from your device. Our health calculations use medically-approved formulas for reliable results.",
        keywords: ['accurate', 'accuracy', 'reliable', 'precise', 'correct']
    },
    
    // Getting started
    'how to start': {
        response: "Getting started is easy! 1) Download the app from App Store or Google Play, 2) Create your account and complete your health profile, 3) Connect your glucose meter via Bluetooth, 4) Start logging meals and glucose readings. You'll get personalized insights within days!",
        keywords: ['start', 'begin', 'setup', 'getting started', 'how to', 'download']
    },
    
    'support': {
        response: "We're here to help! Contact us at support@glucobuddy.com, call +1 (555) 123-4567 (Mon-Fri 9AM-6PM EST), or use this chat. We also have a comprehensive help center and active community forum.",
        keywords: ['help', 'support', 'contact', 'assistance', 'problem', 'issue']
    }
};

// Common responses
const commonResponses = {
    greeting: [
        "Hi! I'm here to help you learn about GlucoBuddy. What would you like to know?",
        "Hello! Ask me anything about GlucoBuddy's features, pricing, or diabetes management!",
        "Welcome! I can help you understand how GlucoBuddy can transform your diabetes care. What interests you most?"
    ],
    
    fallback: [
        "I'm not sure about that specific question, but I'd love to help! You can ask me about GlucoBuddy's features, pricing, compatibility, or diabetes management. Or contact our support team at support@glucobuddy.com for detailed assistance.",
        "That's a great question! While I don't have specific information about that, I can tell you about our AI food recognition, Bluetooth glucose meter integration, health analytics, or pricing. What would you like to explore?",
        "I want to make sure I give you the best answer! Could you rephrase your question or ask about our key features like AI food recognition, Bluetooth connectivity, health insights, or pricing plans?"
    ],
    
    thanks: [
        "You're welcome! Is there anything else about GlucoBuddy you'd like to know?",
        "Happy to help! Feel free to ask about any other features or questions you have.",
        "Glad I could help! Let me know if you need information about anything else."
    ]
};

// Chatbot state
let chatbotState = {
    isOpen: false,
    conversationHistory: [],
    currentContext: null
};

// ===== CHATBOT FUNCTIONALITY =====

function toggleChatbot() {
    const chatbot = document.getElementById('chatbot');
    const chatbotBody = document.getElementById('chatbot-body');
    const toggleIcon = document.getElementById('chatbot-toggle');
    
    chatbotState.isOpen = !chatbotState.isOpen;
    
    if (chatbotState.isOpen) {
        chatbot.classList.add('open');
        chatbotBody.style.display = 'block';
        toggleIcon.style.transform = 'rotate(180deg)';
        
        // Focus on input
        setTimeout(() => {
            document.getElementById('chatbot-input').focus();
        }, 300);
        
        // Track chatbot open
        if (window.GlucoBuddyWebsite) {
            window.GlucoBuddyWebsite.trackEvent('chatbot_opened');
        }
    } else {
        chatbot.classList.remove('open');
        chatbotBody.style.display = 'none';
        toggleIcon.style.transform = 'rotate(0deg)';
    }
}

function sendMessage() {
    const input = document.getElementById('chatbot-input');
    const message = input.value.trim();
    
    if (!message) return;
    
    // Add user message
    addMessage(message, 'user');
    
    // Clear input
    input.value = '';
    
    // Show typing indicator
    showTypingIndicator();
    
    // Process message and respond
    setTimeout(() => {
        const response = processMessage(message);
        hideTypingIndicator();
        addMessage(response, 'bot');
        
        // Track message
        if (window.GlucoBuddyWebsite) {
            window.GlucoBuddyWebsite.trackEvent('chatbot_message_sent', { message_length: message.length });
        }
    }, 1000 + Math.random() * 1000); // Simulate thinking time
}

function processMessage(message) {
    const lowerMessage = message.toLowerCase();
    
    // Check for greetings
    if (isGreeting(lowerMessage)) {
        return getRandomResponse(commonResponses.greeting);
    }
    
    // Check for thanks
    if (isThanks(lowerMessage)) {
        return getRandomResponse(commonResponses.thanks);
    }
    
    // Search knowledge base
    const bestMatch = findBestMatch(lowerMessage);
    
    if (bestMatch) {
        chatbotState.currentContext = bestMatch.key;
        return bestMatch.response;
    }
    
    // Fallback response
    return getRandomResponse(commonResponses.fallback);
}

function findBestMatch(message) {
    let bestMatch = null;
    let highestScore = 0;
    
    for (const [key, data] of Object.entries(chatbotKnowledge)) {
        const score = calculateMatchScore(message, data.keywords);
        
        if (score > highestScore && score > 0.3) { // Minimum threshold
            highestScore = score;
            bestMatch = { key, response: data.response, score };
        }
    }
    
    return bestMatch;
}

function calculateMatchScore(message, keywords) {
    const messageWords = message.split(/\s+/);
    let matches = 0;
    
    keywords.forEach(keyword => {
        if (message.includes(keyword)) {
            matches += keyword.split(' ').length; // Multi-word keywords get higher scores
        }
    });
    
    return matches / messageWords.length;
}

function isGreeting(message) {
    const greetings = ['hi', 'hello', 'hey', 'good morning', 'good afternoon', 'good evening',
  {
    keywords: ["advertising plans", "merchant plans", "pricing tiers"],
    response: "We offer three advertising plans for merchants: Basic, Premium, and Enterprise. Each plan is tailored to meet different business needs. Please refer to the Pricing section for detailed features and pricing."
  },
  {
    keywords: ["user rewards", "earn points", "redeem benefits", "user levels"],
    response: "Our user rewards system allows you to earn points through engagement. As you accumulate points, you can level up and redeem benefits. Check the Pricing section for more details."
  }
];
    return greetings.some(greeting => message.includes(greeting));
}

function isThanks(message) {
    const thanks = ['thank', 'thanks', 'appreciate', 'helpful'];
    return thanks.some(thank => message.includes(thank));
}

function getRandomResponse(responses) {
    return responses[Math.floor(Math.random() * responses.length)];
}

function addMessage(message, sender) {
    const messagesContainer = document.getElementById('chatbot-messages');
    const messageElement = document.createElement('div');
    messageElement.className = `message ${sender}-message`;
    
    messageElement.innerHTML = `
        <div class="message-content">
            ${message}
        </div>
        <div class="message-time">
            ${new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
        </div>
    `;
    
    messagesContainer.appendChild(messageElement);
    
    // Scroll to bottom
    messagesContainer.scrollTop = messagesContainer.scrollHeight;
    
    // Add to conversation history
    chatbotState.conversationHistory.push({ message, sender, timestamp: Date.now() });
    
    // Animate message in
    setTimeout(() => {
        messageElement.classList.add('show');
    }, 10);
}

function showTypingIndicator() {
    const messagesContainer = document.getElementById('chatbot-messages');
    const typingElement = document.createElement('div');
    typingElement.className = 'message bot-message typing-indicator';
    typingElement.id = 'typing-indicator';
    
    typingElement.innerHTML = `
        <div class="message-content">
            <div class="typing-dots">
                <span></span>
                <span></span>
                <span></span>
            </div>
        </div>
    `;
    
    messagesContainer.appendChild(typingElement);
    messagesContainer.scrollTop = messagesContainer.scrollHeight;
}

function hideTypingIndicator() {
    const typingIndicator = document.getElementById('typing-indicator');
    if (typingIndicator) {
        typingIndicator.remove();
    }
}

// ===== EVENT LISTENERS =====
document.addEventListener('DOMContentLoaded', function() {
    // Enter key to send message
    const chatbotInput = document.getElementById('chatbot-input');
    if (chatbotInput) {
        chatbotInput.addEventListener('keypress', function(e) {
            if (e.key === 'Enter') {
                sendMessage();
            }
        });
    }
    
    // Initialize chatbot with welcome message
    setTimeout(() => {
        addMessage(getRandomResponse(commonResponses.greeting), 'bot');
    }, 1000);
});

// ===== QUICK ACTIONS =====
function addQuickActions() {
    const quickActions = [
        { text: "Tell me about AI food recognition", action: () => sendQuickMessage("Tell me about AI food recognition") },
        { text: "What are the pricing plans?", action: () => sendQuickMessage("What are the pricing plans?") },
        { text: "How do I get started?", action: () => sendQuickMessage("How do I get started?") },
        { text: "Is my data secure?", action: () => sendQuickMessage("Is my data secure?") }
    ];
    
    // Add quick action buttons (can be implemented in UI)
    return quickActions;
}

function sendQuickMessage(message) {
    document.getElementById('chatbot-input').value = message;
    sendMessage();
}

// ===== EXPORT FUNCTIONS =====
window.ChatbotFunctions = {
    toggleChatbot,
    sendMessage,
    addMessage,
    processMessage
};
