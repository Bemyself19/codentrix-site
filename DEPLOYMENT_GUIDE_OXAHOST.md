# 🚀 DEPLOYMENT GUIDE - OxaHost (Plesk)

## Current Status
✅ **Git Repository**: Connected to `https://github.com/Bemyself19/codentrix-site.git`  
✅ **Changes Ready**: 9 files modified/created for Telehealth Platform launch  
✅ **Plesk Integration**: Post-deploy script exists at `scripts/plesk-post-deploy.sh`

---

## 📋 PRE-DEPLOYMENT CHECKLIST

### 1. **Review Changes**
All changes are currently **unstaged** in your local repository:
- ✓ 6 modified files (NavBar, App, Home, About, i18n, styles)
- ✓ 3 new files (Products page, launch doc, deploy script)

### 2. **Test Locally** (RECOMMENDED)
Currently running on: `http://localhost:5174/`

**Test these pages:**
- [ ] Homepage - Check announcement banner
- [ ] Products page (`/products`) - Full functionality
- [ ] About page - Portfolio expansion section
- [ ] Navigation - Products link works
- [ ] Language toggle - English/French translation
- [ ] Mobile responsive - Test on different screen sizes

---

## 🔄 DEPLOYMENT PROCESS

### **OPTION A: Automatic Deployment via Plesk Git (Recommended)**

If OxaHost Plesk is configured with Git integration:

#### Step 1: Commit & Push Changes
```bash
cd "/home/nader/Codentrix website/codentrix-site"

# Stage all changes
git add client/src/App.jsx
git add client/src/components/NavBar.jsx
git add client/src/i18n.js
git add client/src/pages/About.jsx
git add client/src/pages/Home.jsx
git add client/src/pages/Products.jsx
git add client/src/styles.css
git add TELEHEALTH_LAUNCH.md

# Optional: stage deploy script if needed
git add scripts/plesk-post-deploy.sh

# Commit with descriptive message
git commit -m "Launch Telehealth Platform - Add Products page and homepage announcement

- Add new Products navigation and /products page
- Create comprehensive Telehealth Platform product page
- Add announcement banner to homepage
- Update About page with portfolio expansion section
- Update tagline to 'Technology Solutions for Regulated Industries'
- Full bilingual support (EN/FR)
- Add professional styling for healthcare sections"

# Push to GitHub
git push origin main
```

#### Step 2: Plesk Auto-Deploy
If Plesk Git integration is enabled:
1. Plesk will detect the GitHub push
2. Automatically run `scripts/plesk-post-deploy.sh`
3. Build the client (`npm run build`)
4. Copy `client/dist/*` to `httpdocs/`
5. Install server dependencies

#### Step 3: Verify Deployment
- Visit your production URL (e.g., `https://codentrix.io`)
- Check homepage announcement banner
- Navigate to Products page
- Test language toggle
- Verify mobile responsiveness

---

### **OPTION B: Manual Deployment via FTP/SFTP**

If automatic Git deployment is not configured:

#### Step 1: Build Locally
```bash
cd "/home/nader/Codentrix website/codentrix-site/client"
npm run build
```

This creates `client/dist/` folder with production files.

#### Step 2: Upload via FTP
Connect to OxaHost via FTP/SFTP and upload:
- Upload contents of `client/dist/` → to `httpdocs/` or `public_html/`
- Ensure `index.html` is at root of httpdocs
- Upload assets folder

#### Files to upload from `client/dist/`:
```
httpdocs/
├── index.html
├── assets/
│   ├── [css files]
│   └── [js files]
└── [other static files]
```

---

### **OPTION C: Manual via SSH (If you have SSH access)**

```bash
# SSH into your server
ssh your-username@your-server.oxahost.com

# Navigate to your repository
cd /path/to/codentrix-site

# Pull latest changes
git pull origin main

# Build client
cd client
npm install
npm run build

# Copy to httpdocs
cp -r dist/* ../httpdocs/
```

---

## ⚙️ PLESK CONFIGURATION CHECK

### Verify Git Integration in Plesk

1. **Log into Plesk Panel** (OxaHost)
2. Go to **Git** section
3. Check if repository is connected to:
   - `https://github.com/Bemyself19/codentrix-site.git`
4. Verify **Post-deployment actions**:
   - Should run: `sh scripts/plesk-post-deploy.sh`
5. Check **Deployment path**: Should be your domain's root

### If Git Integration is NOT Configured:

**Set it up:**
1. In Plesk, go to **Git** 
2. Click **"Add Repository"**
3. Enter Repository URL: `https://github.com/Bemyself19/codentrix-site.git`
4. Branch: `main`
5. Deployment path: Your domain's document root
6. Post-deployment actions: `sh scripts/plesk-post-deploy.sh`
7. Save

---

## 🔍 TROUBLESHOOTING

### Issue: Changes not appearing after push

**Solution:**
```bash
# SSH into server and manually trigger deploy
cd /path/to/codentrix-site
sh scripts/plesk-post-deploy.sh
```

### Issue: Build fails

**Check:**
- Node.js version (should be 16+)
- `npm install` runs without errors
- Environment variables are set

**Manual build:**
```bash
cd client
rm -rf node_modules
npm install
npm run build
```

### Issue: 404 on /products page

**Cause:** React Router needs server configuration

**Solution:** Add `.htaccess` to `httpdocs/`:
```apache
<IfModule mod_rewrite.c>
  RewriteEngine On
  RewriteBase /
  RewriteRule ^index\.html$ - [L]
  RewriteCond %{REQUEST_FILENAME} !-f
  RewriteCond %{REQUEST_FILENAME} !-d
  RewriteCond %{REQUEST_FILENAME} !-l
  RewriteRule . /index.html [L]
</IfModule>
```

---

## 📊 POST-DEPLOYMENT VERIFICATION

### ✅ Checklist after deployment:

- [ ] Homepage loads correctly
- [ ] Announcement banner appears
- [ ] Banner is dismissible
- [ ] "Products" link in navigation
- [ ] `/products` page loads fully
- [ ] All 6 features display
- [ ] Benefits section shows
- [ ] About page shows expansion section
- [ ] Language toggle works (EN ↔ FR)
- [ ] All translations display correctly
- [ ] Mobile view is responsive
- [ ] All CTAs link to /contact
- [ ] No console errors
- [ ] Images load (logo, portraits)

### Testing URLs:
- Homepage: `https://your-domain.com/`
- Products: `https://your-domain.com/products`
- About: `https://your-domain.com/about`

---

## 🎯 RECOMMENDED DEPLOYMENT STEPS

### **NOW: Deploy to Production**

```bash
# 1. Commit all changes
cd "/home/nader/Codentrix website/codentrix-site"
git add -A
git commit -m "Launch Telehealth Platform - Add Products page"

# 2. Push to GitHub
git push origin main

# 3. Monitor Plesk (if Git integration enabled)
# - Check deployment logs in Plesk
# - Or manually SSH and run: sh scripts/plesk-post-deploy.sh

# 4. Verify production site
# Visit your-domain.com and test all pages
```

### **AFTER: Monitor & Track**

- Set up Google Analytics for `/products` page
- Monitor contact form submissions
- Track banner dismissal (optional analytics)
- Collect feedback from visitors

---

## 📞 SUPPORT CONTACTS

**OxaHost Support:**
- Check your OxaHost panel for support options
- Usually: support@oxahost.com or via ticket system

**GitHub Repository:**
- https://github.com/Bemyself19/codentrix-site

**Current Branch:** main  
**Last Commit:** (before deployment)  
**Files Changed:** 9 files (6 modified, 3 new)

---

## 🔐 SECURITY NOTES

Before deployment:
- [ ] Ensure `.env` files are NOT committed
- [ ] Email credentials in server config are secure
- [ ] SMTP settings properly configured
- [ ] Remove any test/debug code
- [ ] TLS bypass removed from production (check `server/index.js`)

---

## 📝 DEPLOYMENT LOG TEMPLATE

```
Date: October 15, 2025
Deployment: Telehealth Platform Launch
Commit: [commit hash after push]
Branch: main
Deployed by: [Your name]
Status: ✅ Success / ⚠️ Issues / ❌ Failed
Notes: 
```

---

## QUICK DEPLOYMENT COMMAND

Copy and run this:

```bash
cd "/home/nader/Codentrix website/codentrix-site" && \
git add client/src/App.jsx client/src/components/NavBar.jsx client/src/i18n.js client/src/pages/About.jsx client/src/pages/Home.jsx client/src/pages/Products.jsx client/src/styles.css TELEHEALTH_LAUNCH.md && \
git commit -m "Launch Telehealth Platform

- Add Products page showcasing telehealth platform
- Add announcement banner to homepage  
- Update navigation with Products link
- Add portfolio expansion section to About page
- Full bilingual support (EN/FR)
- Professional healthcare-themed styling" && \
git push origin main && \
echo "✅ Pushed to GitHub! Check Plesk for auto-deployment or manually trigger the build script."
```

---

**Need help?** All implementation details are in `TELEHEALTH_LAUNCH.md` 📄

