# 🌐 GlucoBuddy Marketing Website

A modern, responsive marketing website for the GlucoBuddy diabetes management mobile app. Built with vanilla HTML, CSS, and JavaScript for optimal performance and SEO.

## ✨ Features

### 🎯 Core Pages
- **Landing Page** - Hero section with app showcase and key features
- **Features** - Detailed feature explanations with interactive elements
- **Pricing** - Three-tier pricing plans with comparison
- **FAQ** - Comprehensive frequently asked questions
- **Reviews/Feedback** - User testimonials and review submission system
- **Contact** - Multiple contact methods and support information

### 🤖 Interactive Elements
- **AI Chatbot** - Intelligent chatbot answering app-related questions
- **User Registration** - Account creation with plan selection
- **Feedback System** - User review collection and display
- **Video Demo** - Marketing video modal
- **Mobile Responsive** - Optimized for all device sizes

### 🔧 Technical Features
- **Performance Optimized** - Fast loading with lazy loading and optimization
- **SEO Friendly** - Meta tags, structured data, and semantic HTML
- **Accessibility** - WCAG compliant with keyboard navigation
- **Analytics Ready** - Google Analytics integration
- **Progressive Enhancement** - Works without JavaScript

## 🚀 Quick Start

### Prerequisites
- Node.js 16+ and npm 8+
- Git

### Installation
```bash
# Clone the repository
git clone https://github.com/your-username/glucobuddy-website.git
cd glucobuddy-website/website

# Install dependencies
npm install

# Start development server
npm run dev
```

### Development
```bash
# Start development server with hot reload
npm run dev

# Build for production
npm run build

# Preview production build
npm run preview

# Serve static files (alternative)
npm run serve
```

## 📁 Project Structure

```
website/
├── index.html              # Main landing page
├── css/
│   ├── style.css           # Main styles
│   └── animations.css      # Animation styles
├── js/
│   ├── main.js            # Core functionality
│   ├── chatbot.js         # Chatbot system
│   ├── feedback.js        # Feedback system
│   └── animations.js      # Animation controls
├── assets/
│   ├── images/            # Images and graphics
│   ├── icons/             # Icon files
│   └── videos/            # Video assets
├── .github/
│   └── workflows/
│       └── deploy.yml     # GitHub Actions deployment
├── package.json           # Dependencies and scripts
├── vite.config.js         # Build configuration
└── README.md             # This file
```

## 🎨 Customization

### Colors and Branding
Edit CSS variables in `css/style.css`:
```css
:root {
  --primary-color: #007aff;
  --secondary-color: #34c759;
  --accent-color: #ff9500;
  /* ... more variables */
}
```

### Content Updates
- **Hero Section**: Edit `index.html` hero content
- **Features**: Update feature cards in the features section
- **Pricing**: Modify pricing plans and features
- **FAQ**: Add/edit questions in the FAQ section

### Chatbot Knowledge
Update chatbot responses in `js/chatbot.js`:
```javascript
const chatbotKnowledge = {
  'your-topic': {
    response: "Your custom response",
    keywords: ['keyword1', 'keyword2']
  }
};
```

## 🚀 Deployment

### GitHub Pages (Recommended)

1. **Fork/Clone this repository**
2. **Enable GitHub Pages**:
   - Go to repository Settings
   - Scroll to Pages section
   - Select "GitHub Actions" as source

3. **Configure deployment**:
   - The `.github/workflows/deploy.yml` file handles automatic deployment
   - Push to main branch triggers deployment

4. **Custom Domain** (Optional):
   - Add `CNAME` file with your domain
   - Configure DNS settings

### Manual Deployment

```bash
# Build the project
npm run build

# Deploy to GitHub Pages
npm run deploy

# Or upload dist/ folder to any web server
```

### Other Hosting Options

- **Netlify**: Connect GitHub repo for automatic deployment
- **Vercel**: Import project and deploy
- **AWS S3**: Upload dist/ folder to S3 bucket
- **Firebase Hosting**: Use Firebase CLI to deploy

## 🔧 Configuration

### Environment Variables
Create `.env` file for configuration:
```env
VITE_ANALYTICS_ID=your-google-analytics-id
VITE_API_BASE_URL=https://api.glucobuddy.com
VITE_CONTACT_EMAIL=support@glucobuddy.com
```

### Analytics Setup
Add Google Analytics to `index.html`:
```html
<!-- Google Analytics -->
<script async src="https://www.googletagmanager.com/gtag/js?id=GA_MEASUREMENT_ID"></script>
<script>
  window.dataLayer = window.dataLayer || [];
  function gtag(){dataLayer.push(arguments);}
  gtag('js', new Date());
  gtag('config', 'GA_MEASUREMENT_ID');
</script>
```

## 📱 Mobile App Integration

### Deep Links
Configure deep links to mobile app:
```javascript
// In main.js
function openMobileApp() {
  const isIOS = /iPad|iPhone|iPod/.test(navigator.userAgent);
  const isAndroid = /Android/.test(navigator.userAgent);
  
  if (isIOS) {
    window.location = 'glucobuddy://open';
    setTimeout(() => {
      window.location = 'https://apps.apple.com/app/glucobuddy';
    }, 1000);
  } else if (isAndroid) {
    window.location = 'intent://open#Intent;scheme=glucobuddy;package=com.glucobuddy.app;S.browser_fallback_url=https://play.google.com/store/apps/details?id=com.glucobuddy.app;end';
  }
}
```

### App Store Badges
Update download links in `index.html`:
```html
<a href="https://apps.apple.com/app/glucobuddy" class="badge-link">
  <img src="./assets/app-store-badge.png" alt="Download on App Store">
</a>
<a href="https://play.google.com/store/apps/details?id=com.glucobuddy.app" class="badge-link">
  <img src="./assets/google-play-badge.png" alt="Get it on Google Play">
</a>
```

## 🔍 SEO Optimization

### Meta Tags
Update meta tags in `index.html`:
```html
<meta name="description" content="Your app description">
<meta name="keywords" content="diabetes, glucose monitoring, AI food recognition">
<meta property="og:title" content="GlucoBuddy - Smart Diabetes Management">
<meta property="og:description" content="Your app description">
<meta property="og:image" content="./assets/og-image.jpg">
```

### Structured Data
Add JSON-LD structured data for better SEO:
```html
<script type="application/ld+json">
{
  "@context": "https://schema.org",
  "@type": "MobileApplication",
  "name": "GlucoBuddy",
  "description": "Smart diabetes management app",
  "applicationCategory": "HealthApplication",
  "operatingSystem": "iOS, Android"
}
</script>
```

## 🛠️ Development Tips

### Performance Optimization
- Use WebP images with fallbacks
- Implement lazy loading for images
- Minify CSS and JavaScript
- Enable gzip compression
- Use CDN for static assets

### Accessibility
- Add alt text to all images
- Use semantic HTML elements
- Ensure keyboard navigation
- Test with screen readers
- Maintain color contrast ratios

### Browser Support
- Modern browsers (Chrome, Firefox, Safari, Edge)
- Mobile browsers (iOS Safari, Chrome Mobile)
- Progressive enhancement for older browsers

## 📞 Support

### Getting Help
- **Documentation**: Check this README and code comments
- **Issues**: Create GitHub issues for bugs or feature requests
- **Discussions**: Use GitHub Discussions for questions
- **Email**: contact@glucobuddy.com

### Contributing
1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Test thoroughly
5. Submit a pull request

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 🙏 Acknowledgments

- **Design Inspiration**: Modern healthcare and app landing pages
- **Icons**: Font Awesome and custom icons
- **Images**: Unsplash and custom photography
- **Fonts**: Inter font family from Google Fonts

---

Built with ❤️ for the diabetes community by the GlucoBuddy team.
