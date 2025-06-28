# 🚀 GlucoBuddy Website Deployment Guide

Complete guide to deploy your GlucoBuddy marketing website to GitHub Pages and other platforms.

## 📋 Pre-Deployment Checklist

### ✅ Content Review
- [ ] Update all placeholder content with real information
- [ ] Replace demo images with actual app screenshots
- [ ] Add real contact information and support details
- [ ] Update pricing plans with actual costs
- [ ] Review and update FAQ content
- [ ] Add real user testimonials (with permission)

### ✅ Technical Setup
- [ ] Test all interactive features (chatbot, forms, modals)
- [ ] Verify responsive design on all devices
- [ ] Check browser compatibility
- [ ] Optimize images and assets
- [ ] Test loading performance
- [ ] Validate HTML and CSS

### ✅ SEO & Analytics
- [ ] Add Google Analytics tracking code
- [ ] Update meta tags and descriptions
- [ ] Add structured data markup
- [ ] Create sitemap.xml
- [ ] Set up Google Search Console
- [ ] Configure social media meta tags

## 🌐 GitHub Pages Deployment

### Method 1: Automatic Deployment (Recommended)

1. **Create GitHub Repository**
   ```bash
   # Create new repository on GitHub
   # Name it: glucobuddy-website or your-username.github.io
   
   # Clone and setup
   git clone https://github.com/your-username/glucobuddy-website.git
   cd glucobuddy-website
   
   # Copy website files to repository
   cp -r website/* .
   ```

2. **Configure GitHub Pages**
   - Go to repository Settings
   - Scroll to "Pages" section
   - Source: "GitHub Actions"
   - The workflow file `.github/workflows/deploy.yml` will handle deployment

3. **Push and Deploy**
   ```bash
   git add .
   git commit -m "Initial website deployment"
   git push origin main
   ```

4. **Access Your Site**
   - Your site will be available at: `https://your-username.github.io/glucobuddy-website/`
   - Check the Actions tab for deployment status

### Method 2: Manual GitHub Pages

1. **Build the Website**
   ```bash
   cd website
   npm install
   npm run build
   ```

2. **Deploy to gh-pages Branch**
   ```bash
   npm run deploy
   ```

3. **Configure GitHub Pages**
   - Go to repository Settings → Pages
   - Source: "Deploy from a branch"
   - Branch: "gh-pages"
   - Folder: "/ (root)"

## 🔧 Custom Domain Setup

### 1. Purchase Domain
- Recommended registrars: Namecheap, Google Domains, Cloudflare

### 2. Configure DNS
Add these DNS records:
```
Type: CNAME
Name: www
Value: your-username.github.io

Type: A
Name: @
Value: 185.199.108.153
Value: 185.199.109.153
Value: 185.199.110.153
Value: 185.199.111.153
```

### 3. Add CNAME File
Create `CNAME` file in repository root:
```
www.glucobuddy.com
```

### 4. Enable HTTPS
- Go to repository Settings → Pages
- Check "Enforce HTTPS"

## 🌟 Alternative Hosting Platforms

### Netlify Deployment

1. **Connect Repository**
   - Go to [Netlify](https://netlify.com)
   - "New site from Git"
   - Connect GitHub repository

2. **Build Settings**
   ```
   Build command: npm run build
   Publish directory: dist
   ```

3. **Environment Variables**
   ```
   NODE_VERSION=18
   ```

### Vercel Deployment

1. **Import Project**
   - Go to [Vercel](https://vercel.com)
   - "Import Git Repository"
   - Select your repository

2. **Configure Build**
   ```
   Framework Preset: Other
   Build Command: npm run build
   Output Directory: dist
   ```

### Firebase Hosting

1. **Install Firebase CLI**
   ```bash
   npm install -g firebase-tools
   firebase login
   ```

2. **Initialize Project**
   ```bash
   firebase init hosting
   # Select existing project or create new one
   # Public directory: dist
   # Single-page app: No
   ```

3. **Deploy**
   ```bash
   npm run build
   firebase deploy
   ```

## 📊 Analytics & Monitoring Setup

### Google Analytics 4

1. **Create GA4 Property**
   - Go to [Google Analytics](https://analytics.google.com)
   - Create new property
   - Get Measurement ID (G-XXXXXXXXXX)

2. **Add Tracking Code**
   Add to `index.html` before `</head>`:
   ```html
   <!-- Google Analytics -->
   <script async src="https://www.googletagmanager.com/gtag/js?id=G-XXXXXXXXXX"></script>
   <script>
     window.dataLayer = window.dataLayer || [];
     function gtag(){dataLayer.push(arguments);}
     gtag('js', new Date());
     gtag('config', 'G-XXXXXXXXXX');
   </script>
   ```

### Google Search Console

1. **Add Property**
   - Go to [Search Console](https://search.google.com/search-console)
   - Add property with your domain
   - Verify ownership

2. **Submit Sitemap**
   - Create `sitemap.xml`
   - Submit to Search Console

### Performance Monitoring

1. **Google PageSpeed Insights**
   - Test: https://pagespeed.web.dev/
   - Optimize based on recommendations

2. **GTmetrix**
   - Test: https://gtmetrix.com/
   - Monitor performance regularly

## 🔒 Security & Best Practices

### Content Security Policy
Add to `index.html`:
```html
<meta http-equiv="Content-Security-Policy" content="default-src 'self'; script-src 'self' 'unsafe-inline' https://www.googletagmanager.com; style-src 'self' 'unsafe-inline' https://fonts.googleapis.com; font-src 'self' https://fonts.gstatic.com; img-src 'self' data: https:;">
```

### Security Headers
For Netlify, create `_headers` file:
```
/*
  X-Frame-Options: DENY
  X-Content-Type-Options: nosniff
  X-XSS-Protection: 1; mode=block
  Referrer-Policy: strict-origin-when-cross-origin
```

### HTTPS Redirect
For Netlify, create `_redirects` file:
```
# Redirect HTTP to HTTPS
http://glucobuddy.com/* https://glucobuddy.com/:splat 301!
http://www.glucobuddy.com/* https://www.glucobuddy.com/:splat 301!
```

## 📱 Mobile App Integration

### Deep Links Setup

1. **iOS Universal Links**
   Create `apple-app-site-association` file:
   ```json
   {
     "applinks": {
       "apps": [],
       "details": [{
         "appID": "TEAMID.com.glucobuddy.app",
         "paths": ["/app/*"]
       }]
     }
   }
   ```

2. **Android App Links**
   Create `.well-known/assetlinks.json`:
   ```json
   [{
     "relation": ["delegate_permission/common.handle_all_urls"],
     "target": {
       "namespace": "android_app",
       "package_name": "com.glucobuddy.app",
       "sha256_cert_fingerprints": ["YOUR_CERT_FINGERPRINT"]
     }
   }]
   ```

## 🔄 Continuous Deployment

### GitHub Actions Workflow
The included `.github/workflows/deploy.yml` provides:
- Automatic deployment on push to main
- Build optimization
- Error handling
- Deployment notifications

### Webhook Integration
Set up webhooks for:
- Slack notifications
- Email alerts
- Discord updates

## 📈 Post-Deployment Tasks

### 1. Test Everything
- [ ] All pages load correctly
- [ ] Forms submit properly
- [ ] Chatbot responds accurately
- [ ] Mobile responsiveness
- [ ] Cross-browser compatibility

### 2. SEO Submission
- [ ] Submit to Google Search Console
- [ ] Submit to Bing Webmaster Tools
- [ ] Create and submit sitemap
- [ ] Set up Google My Business (if applicable)

### 3. Social Media
- [ ] Share on company social media
- [ ] Update app store listings with website link
- [ ] Add website to email signatures

### 4. Monitoring Setup
- [ ] Set up uptime monitoring
- [ ] Configure error tracking
- [ ] Set up performance alerts
- [ ] Monitor user feedback

## 🆘 Troubleshooting

### Common Issues

1. **404 Errors**
   - Check file paths and case sensitivity
   - Verify build output directory
   - Check routing configuration

2. **Slow Loading**
   - Optimize images (WebP format)
   - Enable compression
   - Use CDN for assets
   - Minimize JavaScript/CSS

3. **Mobile Issues**
   - Test on real devices
   - Check viewport meta tag
   - Verify touch interactions

4. **Form Submissions**
   - Set up form handling service (Netlify Forms, Formspree)
   - Add proper validation
   - Configure email notifications

### Getting Help
- Check GitHub Issues
- Review deployment logs
- Contact hosting support
- Community forums

## 📞 Support

For deployment assistance:
- **Email**: support@glucobuddy.com
- **Documentation**: Check README.md
- **Issues**: Create GitHub issue
- **Community**: Join our Discord

---

🎉 **Congratulations!** Your GlucoBuddy website is now live and ready to help users discover your amazing diabetes management app!
