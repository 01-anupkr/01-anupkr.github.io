# Analytics & Visitor Counter Setup

This portfolio now includes a comprehensive visitor tracking and analytics system. Here's how to set it up and use it.

## Features

### ✅ Visitor Counter
- **Unique Daily Visitors**: Tracks visitors using localStorage
- **Animated Display**: Smooth number animation when counter loads
- **Visual Badge**: Eye-catching badge in the footer with emoji

### ✅ Google Analytics Integration
- **Page Views**: Automatically tracked
- **User Events**: Detailed event tracking for all interactions
- **Custom Events**: Easy to track custom user actions

---

## Setup Instructions

### 1. **Set Up Google Analytics**

1. Go to [Google Analytics](https://analytics.google.com/)
2. Create a new property for your portfolio
3. Copy your **Google Analytics Measurement ID** (format: `G-XXXXXXXXXX`)
4. Replace `G-XXXXXXXXXX` in `index.html` (line ~31 and ~32):

```html
<!-- Google Analytics -->
<script async src="https://www.googletagmanager.com/gtag/js?id=G-YOUR_ID_HERE"></script>
<script>
    window.dataLayer = window.dataLayer || [];
    function gtag(){dataLayer.push(arguments);}
    gtag('js', new Date());
    gtag('config', 'G-YOUR_ID_HERE'); // Replace with your Google Analytics ID
</script>
```

### 2. **Visitor Counter**
The visitor counter works automatically:
- Tracks unique visitors per day in localStorage
- Displays in the footer as a beautiful animated badge
- Works **offline** if Google Analytics is not set up

---

## Tracked Events

### 🔵 Automatic Page Events
- **Page Views**: Every page load
- **Section Views**: When user scrolls to each section
  - hero, about, skills, projects, services, contact, testimonials

### 🔵 User Interaction Events

#### Navigation
- CTA Button Clicks (Get Started, Contact Me, etc.)
- Social Media Link Clicks

#### Content Engagement
- Project Card Clicks / Views
- Service Card Hover
- Skill Category Selection
- Theme Toggle (Dark/Light Mode)

#### Contact
- Contact Form Submission

---

## Viewing Analytics

### In Google Analytics Dashboard:
1. Go to your **Google Analytics property**
2. **Real-time** → See live visitors
3. **Reports** → **Engagement** → View detailed event data
4. **Reports** → **Pages and screens** → See which sections get viewed

### In Browser Console:
Open Developer Tools (F12) and check the Console tab. You'll see:
```
📊 Event tracked: Button clicked - Get Started
📊 Event tracked: Section viewed - hero
👥 Total Visitors: 42
```

---

## Custom Events

To track custom events anywhere in your code:

```javascript
// Example: Track when user downloads resume
trackEvent('download', {
    'event_category': 'engagement',
    'event_label': 'resume_download',
    'value': 1
});
```

The `trackEvent()` function is available globally in your JavaScript.

---

## Data & Privacy

### 📊 What We Track:
- Page views and section visits
- User interactions (clicks, form submissions)
- Time spent on page
- Device and browser information
- Geographic location (based on IP)

### 🔒 Privacy Measures:
- Everything respects user privacy
- No personal data is collected without consent
- Google Analytics is configured with analytics.google.com's default privacy settings
- Visitor counter uses browser localStorage only (not sent anywhere)

---

## Analytics Tips

### 🎯 Key Metrics to Monitor:
1. **Total Users**: How many people visit
2. **Session Duration**: How long they stay
3. **Engagement Rate**: How many interact with content
4. **Top Pages**: Which sections people spend time on
5. **Top Events**: Most common user actions

### 💡 Optimization Ideas:
- If "projects" section has low views → improve visibility
- If "contact form" submissions are low → simplify the form
- If bounce rate is high → improve hero section copy
- Track which projects get most clicks → highlight similar work

---

## Troubleshooting

### ❌ Visitor counter not showing?
1. Check if JavaScript is enabled
2. Clear browser cache (Ctrl+Shift+Delete)
3. Check browser console for errors (F12)

### ❌ Google Analytics not tracking?
1. Verify Measurement ID is correct
2. Wait 24-48 hours for initial data to appear
3. Use Google Analytics Debugger extension to diagnose
4. Check that you're viewing the correct property

### ❌ Events not showing up?
1. Check console (F12) for "Event tracked:" messages
2. Verify Google Analytics ID is set correctly
3. Wait a few minutes for real-time updates

---

## File Locations

- **Analytics Code**: `js/main.js` (lines ~394-600)
- **HTML Integration**: `index.html` (lines ~30-35, ~900-905)
- **Visitor Counter Styles**: `css/style.css` (lines ~1580-1620)

---

## Questions?

Refer to:
- [Google Analytics Documentation](https://support.google.com/analytics)
- [gtag.js Reference](https://developers.google.com/analytics/devguides/collection/gtagjs)
- Code comments in `js/main.js`

**Happy tracking! 📊**
