# 🚨 FIXING PLESK GIT CONFIGURATION ERROR

## The Problem

Your Plesk Git is configured for a **wrong/missing repository**:
```
Error: Failed to change directory to 
/var/www/vhosts/codentrix.io/git/sehatynet-connect-care-tunisia
```

This prevents the Git configuration screen from opening. We need to fix this manually.

---

## 🔧 SOLUTION: MANUAL FTP/FILE MANAGER DEPLOYMENT

Since Git UI is broken and SSH is forbidden, we'll deploy using Plesk File Manager.

---

## 📋 STEP-BY-STEP DEPLOYMENT PROCESS

### STEP 1: Build Locally on Your Computer

Open terminal on your computer and run:

```bash
cd "/home/nader/Codentrix website/codentrix-site/client"
npm install
npm run build
```

This creates `client/dist/` folder with these files:
- `index.html`
- `assets/` folder (with CSS and JS files)
- Other static files

**Verify it worked:**
```bash
ls -la dist/
```

You should see the built files.

---

### STEP 2: Access Plesk File Manager

1. In your Plesk panel (where you are now)
2. Go to the **"Files"** button (in "Files & Databases" section)
3. Click on **Files** to open File Manager

---

### STEP 3: Navigate to httpdocs

In File Manager:
1. You should see folder structure
2. Look for **`httpdocs`** or **`public_html`** folder
3. Click on it to open

This is where your website files go.

---

### STEP 4: Backup Current Files (Optional but Recommended)

Before replacing files:
1. Select all files in `httpdocs`
2. Look for a "Compress" or "Archive" button
3. Create a backup archive named `backup-old-site.zip`
4. Download it to your computer (just in case)

---

### STEP 5: Clear Old Files

In `httpdocs` folder:
1. **Select all files** (except `.htaccess` if it exists - keep that one!)
2. Click **Delete** button
3. Confirm deletion

**IMPORTANT:** 
- Keep `.htaccess` if it exists
- Keep `.well-known` folder if it exists (for SSL)
- Delete everything else

---

### STEP 6: Upload New Files

Now upload your built files:

1. Click **Upload** button in Plesk File Manager
2. Select all files from your local `client/dist/` folder:
   - Select `index.html`
   - Select `assets` folder
   - Select any other files/folders in `dist/`
3. Upload them to `httpdocs/`

**File structure should be:**
```
httpdocs/
├── index.html
├── assets/
│   ├── index-[hash].js
│   ├── index-[hash].css
│   └── [other asset files]
├── logo.png
├── ceo.jpg
├── fethi.jpg
├── ahmed.jpg
└── .htaccess (if exists)
```

---

### STEP 7: Create/Verify .htaccess File

This is **CRITICAL** for React Router to work (so `/products` page doesn't give 404).

**Check if `.htaccess` exists:**
- Look in `httpdocs/` folder
- You may need to click "Show hidden files" option

**If it DOESN'T exist, create it:**

1. In File Manager, while in `httpdocs/` folder
2. Click **"+ New File"** or **"Create File"**
3. Name it: `.htaccess` (with the dot at the beginning!)
4. Click to edit the file
5. Paste this content:

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

# Security headers
<IfModule mod_headers.c>
  Header set X-Content-Type-Options "nosniff"
  Header set X-Frame-Options "SAMEORIGIN"
  Header set X-XSS-Protection "1; mode=block"
</IfModule>

# Enable compression
<IfModule mod_deflate.c>
  AddOutputFilterByType DEFLATE text/html text/plain text/xml text/css text/javascript application/javascript application/json
</IfModule>

# Browser caching
<IfModule mod_expires.c>
  ExpiresActive On
  ExpiresByType image/jpg "access plus 1 year"
  ExpiresByType image/jpeg "access plus 1 year"
  ExpiresByType image/gif "access plus 1 year"
  ExpiresByType image/png "access plus 1 year"
  ExpiresByType text/css "access plus 1 month"
  ExpiresByType application/javascript "access plus 1 month"
</IfModule>
```

6. Save the file

---

### STEP 8: Verify Upload

Check that files are there:
1. In `httpdocs/` you should see `index.html`
2. Click on `assets` folder - should have JS and CSS files
3. Check file sizes are reasonable (not 0 bytes)

---

### STEP 9: Test Your Website

1. Open your website: `https://codentrix.io`
2. **Force refresh**: Press `Ctrl + Shift + R` (clears cache)
3. Check:
   - [ ] Homepage loads
   - [ ] Announcement banner appears
   - [ ] "Products" link in navigation
   - [ ] Click Products - page should load (no 404)
   - [ ] About page shows expansion section
   - [ ] Language toggle works

---

## 🔍 TROUBLESHOOTING

### Issue: "Forbidden" or "403 Error"

**Fix:** Check file permissions in Plesk
1. Select all files in `httpdocs`
2. Right-click → Properties → Permissions
3. Set to: `644` for files, `755` for folders
4. Apply to all files

---

### Issue: Page shows but looks broken (no styling)

**Fix:** Assets not loading properly
1. Check browser console (F12) for errors
2. Verify `assets` folder uploaded correctly
3. Check paths in browser Network tab
4. Make sure `.htaccess` is in place

---

### Issue: Homepage works but `/products` gives 404

**Fix:** `.htaccess` missing or not working
1. Verify `.htaccess` file exists in `httpdocs/`
2. Check content matches the template above
3. Verify Apache mod_rewrite is enabled (ask OxaHost support if needed)

---

### Issue: Old version still showing

**Fix:** Browser cache
1. Hard refresh: `Ctrl + Shift + R`
2. Or clear browser cache completely
3. Try incognito/private window
4. Check file timestamps in Plesk - should be recent

---

## 📦 ALTERNATIVE: Use FTP Client

If File Manager is slow or problematic:

### Option 1: FileZilla (Recommended)

1. **Download FileZilla** (free FTP client)
2. **Get FTP credentials from Plesk:**
   - Go to "Connection Info" in Plesk
   - Get: FTP hostname, username, password
3. **Connect via FileZilla**
4. **Navigate to** `httpdocs/` on server side
5. **Drag and drop** files from `client/dist/` to `httpdocs/`

### Option 2: Use Plesk Upload Feature

Some Plesk versions allow ZIP upload:
1. Compress your `client/dist/` contents into `deploy.zip`
2. Upload `deploy.zip` to `httpdocs/` via File Manager
3. Extract it in File Manager
4. Delete the zip file

---

## ✅ DEPLOYMENT CHECKLIST

- [ ] Built project locally (`npm run build`)
- [ ] Verified `dist/` folder has files
- [ ] Accessed Plesk File Manager
- [ ] Backed up old files (optional)
- [ ] Cleared old files from `httpdocs/`
- [ ] Uploaded all files from `dist/` to `httpdocs/`
- [ ] Created/verified `.htaccess` file
- [ ] Checked file permissions (644/755)
- [ ] Tested live site - homepage loads
- [ ] Tested `/products` page - no 404
- [ ] Tested language toggle
- [ ] Tested mobile view
- [ ] No console errors

---

## 🔧 FIXING THE GIT CONFIGURATION (Optional - For Future)

To fix the Git error for future use, you'd need to:

### Contact OxaHost Support:
**Send them this message:**

```
Hello,

My Git integration in Plesk is misconfigured and giving this error:
"Failed to change directory to /var/www/vhosts/codentrix.io/git/sehatynet-connect-care-tunisia"

This old repository path doesn't exist anymore. I need to:
1. Reset/remove the current Git configuration
2. Connect to my correct repository: https://github.com/Bemyself19/codentrix-site.git

Can you please:
- Remove the old Git configuration for codentrix.io
- Or provide SSH access so I can fix it manually
- Or reset the Git integration to default state

Thank you!
```

---

## 📊 CURRENT DEPLOYMENT SUMMARY

| Method | Status | Notes |
|--------|--------|-------|
| Git Auto-Deploy | ❌ Broken | Misconfigured repository |
| SSH Deploy | ❌ Forbidden | No access |
| **File Manager Deploy** | ✅ **USE THIS** | Manual but works |
| FTP Deploy | ✅ Alternative | If File Manager slow |

---

## 🎯 YOUR ACTION PLAN

**RIGHT NOW:**
1. Build locally: `cd client && npm run build`
2. Open Plesk File Manager (Files button)
3. Go to `httpdocs/` folder
4. Upload all files from `dist/`
5. Create `.htaccess` file
6. Test: `https://codentrix.io`

**ESTIMATED TIME:** 10-15 minutes

---

**Once files are uploaded, your Telehealth Platform will be live!** 🚀

Let me know when you start the build process and I'll guide you through each step!

