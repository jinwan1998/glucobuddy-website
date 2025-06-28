# 📁 Assets Directory

This directory contains all static assets for the GlucoBuddy website.

## 📂 Directory Structure

```
assets/
├── images/
│   ├── logo.png                    # Main GlucoBuddy logo
│   ├── favicon.png                 # Website favicon
│   ├── og-image.jpg                # Open Graph image for social sharing
│   ├── hero-pattern.svg            # Background pattern for hero section
│   ├── app-screenshot-1.png        # Main app screenshot
│   ├── app-screenshot-2.png        # Additional app screenshots
│   ├── app-screenshot-3.png        # More app screenshots
│   ├── phone-mockup.png            # Phone mockup for hero section
│   ├── app-store-badge.png         # App Store download badge
│   ├── google-play-badge.png       # Google Play download badge
│   └── testimonials/               # User testimonial photos
│       ├── user-1.jpg
│       ├── user-2.jpg
│       └── ...
├── icons/
│   ├── favicon.ico                 # Browser favicon
│   ├── apple-touch-icon.png        # iOS home screen icon
│   ├── android-chrome-192x192.png  # Android icon (192x192)
│   ├── android-chrome-512x512.png  # Android icon (512x512)
│   └── manifest-icons/             # PWA manifest icons
└── videos/
    ├── demo-video.mp4              # Main demo video
    ├── feature-showcase.mp4        # Feature demonstration
    └── testimonial-video.mp4       # User testimonial video
```

## 🖼️ Image Requirements

### Logo Files
- **logo.png**: 200x60px, transparent background, PNG format
- **favicon.png**: 32x32px, PNG format
- **apple-touch-icon.png**: 180x180px, PNG format

### App Screenshots
- **Resolution**: 1080x1920px (mobile screenshots)
- **Format**: PNG for UI screenshots, JPG for photos
- **Optimization**: Compress for web (use tools like TinyPNG)

### Social Media
- **og-image.jpg**: 1200x630px, JPG format, under 1MB
- **Twitter card**: 1200x600px, JPG format

### User Photos
- **testimonials**: 150x150px, circular crop, JPG format
- **team photos**: 300x300px, square format, JPG

## 🎥 Video Requirements

### Demo Video
- **Format**: MP4 (H.264 codec)
- **Resolution**: 1920x1080px (Full HD)
- **Duration**: 60-90 seconds
- **Size**: Under 10MB
- **Audio**: Optional background music, clear narration

### Feature Videos
- **Format**: MP4 or WebM
- **Resolution**: 1280x720px minimum
- **Duration**: 30-60 seconds each
- **Size**: Under 5MB each

## 🔧 Optimization Guidelines

### Image Optimization
```bash
# Install optimization tools
npm install -g imagemin-cli imagemin-webp imagemin-mozjpeg imagemin-pngquant

# Optimize images
imagemin assets/images/*.jpg --out-dir=assets/images/optimized --plugin=mozjpeg
imagemin assets/images/*.png --out-dir=assets/images/optimized --plugin=pngquant

# Create WebP versions
imagemin assets/images/*.{jpg,png} --out-dir=assets/images/webp --plugin=webp
```

### Video Optimization
```bash
# Install FFmpeg
# Optimize video for web
ffmpeg -i input-video.mov -c:v libx264 -crf 23 -preset medium -c:a aac -b:a 128k output-video.mp4

# Create multiple formats
ffmpeg -i demo-video.mp4 -c:v libvpx-vp9 -crf 30 -b:v 0 demo-video.webm
```

## 📱 Responsive Images

### Implementation Example
```html
<!-- Responsive image with WebP support -->
<picture>
  <source srcset="assets/images/webp/hero-image.webp" type="image/webp">
  <source srcset="assets/images/hero-image.jpg" type="image/jpeg">
  <img src="assets/images/hero-image.jpg" alt="GlucoBuddy App" loading="lazy">
</picture>

<!-- Responsive app screenshots -->
<img 
  src="assets/images/app-screenshot-1.png" 
  srcset="assets/images/app-screenshot-1.png 1x, 
          assets/images/app-screenshot-1@2x.png 2x"
  alt="GlucoBuddy Dashboard"
  loading="lazy"
>
```

## 🎨 Design Guidelines

### Color Palette
- **Primary**: #007aff (iOS Blue)
- **Secondary**: #34c759 (Success Green)
- **Accent**: #ff9500 (Warning Orange)
- **Error**: #ff3b30 (Error Red)

### Typography
- **Primary Font**: Inter (Google Fonts)
- **Fallback**: -apple-system, BlinkMacSystemFont, sans-serif

### Icon Style
- **Style**: Outline/Line icons
- **Weight**: Medium (2px stroke)
- **Size**: 24px base size
- **Source**: Font Awesome 6

## 📋 Asset Checklist

### Required Images
- [ ] Logo (PNG, transparent)
- [ ] Favicon (ICO, PNG)
- [ ] App screenshots (3-5 images)
- [ ] Hero background/pattern
- [ ] Open Graph image
- [ ] App store badges
- [ ] User testimonial photos

### Optional Images
- [ ] Team photos
- [ ] Office/company photos
- [ ] Infographic elements
- [ ] Icon illustrations
- [ ] Background textures

### Required Videos
- [ ] Main demo video (60-90 seconds)
- [ ] Feature showcase videos
- [ ] User testimonial videos (optional)

## 🔄 Asset Management

### Version Control
- Keep original high-resolution files
- Version optimized files separately
- Use descriptive filenames
- Maintain consistent naming convention

### Naming Convention
```
# Images
logo-primary.png
logo-white.png
app-screenshot-dashboard.png
app-screenshot-ai-recognition.png
user-testimonial-sarah-chen.jpg

# Videos
demo-main-features.mp4
feature-ai-food-recognition.mp4
testimonial-user-success-story.mp4
```

### File Organization
```
assets/
├── originals/          # High-res original files
├── optimized/          # Web-optimized versions
├── webp/              # WebP format versions
└── thumbnails/        # Thumbnail versions
```

## 🚀 Performance Tips

1. **Lazy Loading**: Implement for all images below the fold
2. **WebP Format**: Use with fallbacks for better compression
3. **Responsive Images**: Serve appropriate sizes for different devices
4. **CDN**: Consider using a CDN for faster global delivery
5. **Compression**: Always optimize images before deployment

## 📞 Asset Support

Need help with assets?
- **Design Team**: design@glucobuddy.com
- **Technical**: dev@glucobuddy.com
- **Stock Photos**: Unsplash, Pexels (with proper attribution)
- **Icons**: Font Awesome, Heroicons, Feather Icons

---

📝 **Note**: Replace all placeholder assets with actual GlucoBuddy branding and content before deployment.
