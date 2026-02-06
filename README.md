# SubHub - Free Subdomain Management

A modern, fully functional website for managing free subdomains, inspired by FreeDNS. Built with vanilla HTML, CSS, and JavaScript - no frameworks required.

## 🚀 Features

- **Search & Claim**: Check subdomain availability instantly
- **5 Subdomain Limit**: Users can claim up to 5 free subdomains
- **Multiple Domains**: Choose from 6+ different domain options
- **Alternative Suggestions**: Get smart suggestions when your preferred subdomain is taken
- **Local Storage**: All data persists in browser localStorage
- **Contribute Domains**: Form for users to submit their own domains
- **Modern UI**: Beautiful, responsive design with smooth animations
- **Fully Functional**: Complete working prototype ready to deploy

## 🎨 Design Features

- Vibrant gradient effects and animations
- Dark theme with floating blob backgrounds
- Smooth transitions and micro-interactions
- Responsive design for all screen sizes
- Custom typography (Syne + DM Sans)

## 🌐 Hosting on GitHub Pages

### Option 1: Simple Upload

1. Create a new GitHub repository
2. Upload these three files:
   - `index.html`
   - `styles.css`
   - `script.js`
3. Go to Settings → Pages
4. Select "Deploy from a branch"
5. Choose "main" branch and "/ (root)"
6. Click Save

Your site will be live at: `https://yourusername.github.io/repository-name`

### Option 2: Using Git

```bash
# Initialize git repository
git init

# Add files
git add index.html styles.css script.js README.md

# Commit
git commit -m "Initial commit: SubHub free subdomain manager"

# Add remote (replace with your repo URL)
git remote add origin https://github.com/yourusername/subhub.git

# Push to GitHub
git branch -M main
git push -u origin main
```

Then enable GitHub Pages in repository settings.

## 📁 File Structure

```
subhub/
├── index.html      # Main HTML structure
├── styles.css      # All styling and animations
├── script.js       # Functionality and interactivity
└── README.md       # Documentation
```

## 💻 Local Development

Simply open `index.html` in your browser. No build process or server required!

For a better development experience with live reload:

```bash
# Using Python
python -m http.server 8000

# Using Node.js
npx serve

# Using PHP
php -S localhost:8000
```

## 🔧 How It Works

### Data Storage
- Uses browser `localStorage` to persist user data
- Each claimed subdomain is stored with:
  - Full domain name
  - Target URL
  - Record type (CNAME/A/URL)
  - Creation timestamp

### Main Features

**1. Subdomain Search**
- Real-time validation of subdomain names
- Checks against existing claimed subdomains
- Shows availability status instantly

**2. Alternative Suggestions**
- Generates 6 alternative subdomain options
- Uses prefixes, suffixes, and numbers
- All alternatives are clickable to claim

**3. Domain Browsing**
- Filter by All, Popular, or New
- Shows availability statistics
- Quick selection from cards

**4. My Subdomains**
- View all claimed subdomains
- Edit target URLs
- Delete subdomains
- Visual count (X/5 used)

**5. Contribute Domain**
- Form to submit new domains
- Collects domain info and DNS provider
- Ready for backend integration

## 🎯 Future Enhancements

To make this production-ready, consider adding:

- **Backend Integration**: Replace localStorage with a real database
- **Authentication**: User accounts and login system
- **DNS Integration**: Actual DNS record management via APIs
- **Email Verification**: Confirm user email addresses
- **Rate Limiting**: Prevent abuse
- **Admin Panel**: Manage domains and users
- **Analytics**: Track usage statistics
- **API**: RESTful API for subdomain management

## 🔌 Backend Integration Points

The code is structured to easily integrate with a backend:

```javascript
// Replace these functions with API calls:
- checkAvailability() → GET /api/check?subdomain=xxx&domain=yyy
- handleClaimSubmit() → POST /api/claim
- handleContributeSubmit() → POST /api/contribute
- renderUserSubdomains() → GET /api/user/subdomains
```

## 🛠️ Customization

### Change Colors
Edit CSS variables in `styles.css`:
```css
:root {
    --primary: #6366f1;
    --secondary: #8b5cf6;
    --accent: #ec4899;
    /* ... */
}
```

### Add More Domains
Edit the `availableDomains` array in `script.js`:
```javascript
const availableDomains = [
    {
        name: 'yourdomain.com',
        description: 'Description here',
        available: 900,
        total: 1000,
        badge: 'new',
        provider: 'Cloudflare'
    },
    // ...
];
```

### Change Subdomain Limit
In `script.js`, update:
```javascript
if (userSubdomains.length >= 5) {  // Change 5 to your limit
```

## 📱 Browser Compatibility

- Chrome/Edge: ✅ Fully supported
- Firefox: ✅ Fully supported
- Safari: ✅ Fully supported
- Opera: ✅ Fully supported
- IE: ❌ Not supported (modern CSS features used)

## 📄 License

This project is open source and free to use. Feel free to modify and distribute.

## 🤝 Contributing

Contributions are welcome! Feel free to:
- Report bugs
- Suggest features
- Submit pull requests
- Improve documentation

## 📞 Support

For issues or questions, please open a GitHub issue.

---

Built with ❤️ using vanilla HTML, CSS, and JavaScript
