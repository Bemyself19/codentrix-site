# 🔍 PLESK DEPLOYMENT CONFIGURATION VERIFICATION

## Current Status
✅ **Committed**: Changes pushed to GitHub (commit d071110)  
✅ **Script Ready**: `scripts/plesk-post-deploy.sh` exists  
⏳ **Verification Needed**: Plesk Git integration

---

## 📋 STEP-BY-STEP VERIFICATION GUIDE

### **STEP 1: Access Plesk Panel**

1. Open your OxaHost Plesk panel in browser
   - Usually: `https://your-server-hostname:8443`
   - Or through OxaHost client area

2. Log in with your credentials

---

### **STEP 2: Check Git Integration**

#### Navigate to Git Settings:
1. In Plesk, select your **domain/website** (codentrix)
2. Look for **"Git"** in the left sidebar or under **"Developer Tools"**
3. Click on **Git**

#### What to Check:

**A. Repository Connection:**
- [ ] Repository URL is: `https://github.com/Bemyself19/codentrix-site.git`
- [ ] Branch is set to: `main`
- [ ] Status shows: "Connected" or "Active"

**B. Deployment Path:**
- [ ] Check where files are deployed
- [ ] Should be your domain's document root (usually `httpdocs/` or `public_html/`)

**C. Post-Deployment Actions:**
- [ ] Look for "Actions" or "Additional Actions" section
- [ ] Should have: `sh scripts/plesk-post-deploy.sh`
- [ ] Or: `bash scripts/plesk-post-deploy.sh`

**D. Deployment Mode:**
- [ ] Check if "Deploy on Push" is enabled
- [ ] Or "Manual Deploy" button is available

---

### **STEP 3: Test Manual Deployment**

If Git is configured, you should see:
- **"Deploy"** button or **"Pull and Deploy"** button

**To test:**
1. Click the **Deploy** button
2. Watch the deployment log/output
3. Look for these messages:
   ```
   --- Building client ---
   --- Deploying build to httpdocs ---
   --- Installing server dependencies ---
   Post-deploy finished
   ```

**Common Output:**
```bash
Cloning into '/var/www/vhosts/your-domain.com/repository'...
Building client...
> npm run build
vite build
✓ built in 2.5s
Copying to httpdocs/
Deployment successful
```

---

### **STEP 4: Configure Git (If Not Already Set Up)**

#### If Git section is NOT configured:

1. **Add Repository:**
   - Click **"Add Repository"** or **"Connect Repository"**
   
2. **Fill in Details:**
   ```
   Repository URL: https://github.com/Bemyself19/codentrix-site.git
   Repository Name: codentrix-site (or any name)
   Branch: main
   ```

3. **Authentication:**
   - If public repo: No authentication needed
   - If private: Add GitHub Personal Access Token
     - Go to GitHub > Settings > Developer Settings > Personal Access Tokens
     - Generate token with `repo` scope
     - Paste in Plesk

4. **Deployment Path:**
   - Set to: `/httpdocs/` or your domain's document root
   - Or leave empty to deploy to repository folder

5. **Post-Deployment Actions:**
   - Add: `sh scripts/plesk-post-deploy.sh`
   - Or: `bash scripts/plesk-post-deploy.sh`

6. **Save Configuration**

---

### **STEP 5: Verify File Structure**

After deployment, check file structure in Plesk **File Manager**:

**Expected structure:**
```
your-domain.com/
├── httpdocs/                    ← Frontend files here
│   ├── index.html
│   ├── assets/
│   │   ├── index-[hash].js
│   │   └── index-[hash].css
│   └── logo.png
├── repository/                  ← Git repo clone (optional)
│   ├── client/
│   ├── server/
│   └── scripts/
└── ...
```

---

### **STEP 6: Check React Router Configuration**

For SPA routing to work, need `.htaccess` in `httpdocs/`:

**Check if exists:**
- Go to Plesk **File Manager** > `httpdocs/`
- Look for `.htaccess` file

**If NOT exists, create one:**

Go to File Manager > httpdocs/ > Create File > `.htaccess`

**Content:**
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

This ensures `/products` route works without 404 errors.

---

### **STEP 7: Verify Node.js Configuration (For Backend)**

If you have a backend server:

1. **Check Node.js Application:**
   - In Plesk, go to **"Node.js"** section
   - Verify application is configured
   
2. **Settings:**
   ```
   Application Root: /server
   Application Startup File: index.js
   Node.js version: 16.x or higher
   Application Mode: Production
   ```

3. **Environment Variables:**
   - Add email and SMTP settings here

4. **Restart App** after deployment

---

## 🧪 VERIFICATION TESTS

### Test 1: Manual Deploy
```bash
# In Plesk Git section:
1. Click "Deploy" or "Pull Changes"
2. Watch for success message
3. Check logs for errors
```

### Test 2: SSH Verification (If you have SSH access)
```bash
# SSH into server
ssh your-username@your-server.com

# Check if repository exists
ls -la /var/www/vhosts/your-domain.com/

# Check httpdocs
ls -la /var/www/vhosts/your-domain.com/httpdocs/

# Manually run deploy script
cd /var/www/vhosts/your-domain.com/repository
sh scripts/plesk-post-deploy.sh
```

### Test 3: Live Site Verification
```
Visit: https://your-domain.com
Check: 
- [ ] Homepage loads
- [ ] Announcement banner shows
- [ ] Products link in navigation
- [ ] /products page works (no 404)
- [ ] About page shows expansion
- [ ] Language toggle works
```

---

## 🚨 TROUBLESHOOTING

### Issue 1: "Git not available" in Plesk

**Solution:**
- Git extension may not be installed
- Contact OxaHost support to enable Git
- Or use Manual FTP deployment instead

---

### Issue 2: Deployment fails with "npm not found"

**Solution:**
1. Check Node.js is installed in Plesk
2. Go to **Tools & Settings** > **Updates** > **Components**
3. Install Node.js if missing
4. Set correct Node.js version in script

---

### Issue 3: Build succeeds but site shows old version

**Solution:**
```bash
# Clear browser cache
# Or check if files actually copied to httpdocs
# SSH and verify:
ls -la /var/www/vhosts/your-domain.com/httpdocs/

# Check timestamps (should be recent)
```

---

### Issue 4: 404 on /products page

**Solution:**
- Add `.htaccess` file (see Step 6 above)
- Ensure mod_rewrite is enabled in Apache
- Check Plesk > Apache & nginx Settings

---

### Issue 5: Permission denied errors

**Solution:**
```bash
# SSH and fix permissions
cd /var/www/vhosts/your-domain.com
chmod +x scripts/plesk-post-deploy.sh
chown -R username:psacln httpdocs/
```

---

## 📝 CONFIGURATION CHECKLIST

Use this checklist to verify your setup:

### Git Configuration:
- [ ] Repository connected to GitHub
- [ ] Branch set to `main`
- [ ] Authentication configured (if private repo)
- [ ] Deployment path set correctly

### Post-Deployment:
- [ ] Script path: `sh scripts/plesk-post-deploy.sh`
- [ ] Script is executable
- [ ] Deploy on push enabled (optional)

### File Structure:
- [ ] `httpdocs/` contains built files
- [ ] `index.html` at root of httpdocs
- [ ] `assets/` folder with JS/CSS
- [ ] `.htaccess` for React Router

### Frontend:
- [ ] Build process completes successfully
- [ ] All pages load (/, /about, /services, /products)
- [ ] Navigation works
- [ ] Language toggle works
- [ ] Images load

### Backend (if applicable):
- [ ] Node.js app configured
- [ ] Environment variables set
- [ ] Server restarts after deployment
- [ ] API endpoints work

---

## 🔄 ALTERNATIVE: MANUAL FTP DEPLOYMENT

If Git integration is not available or not working:

### Build Locally:
```bash
cd "/home/nader/Codentrix website/codentrix-site/client"
npm run build
```

### Upload via FTP:
1. Connect to OxaHost via FTP/SFTP
2. Navigate to `httpdocs/` or `public_html/`
3. Upload all files from `client/dist/`:
   - `index.html`
   - `assets/` folder
   - All other files

### Add .htaccess:
Upload the `.htaccess` file for React Router support

---

## 📞 NEED HELP?

### OxaHost Support:
- Login to your OxaHost client area
- Open a support ticket
- Ask: "Please help configure Git deployment for Plesk"

### Quick Test:
After configuration, push a small change:
```bash
# Make a small edit
echo "# Test" >> README.md
git add README.md
git commit -m "Test deployment"
git push origin main

# Watch Plesk for auto-deployment
```

---

## ✅ SUCCESS INDICATORS

Your deployment is working if:
- ✅ Push to GitHub triggers automatic build
- ✅ Plesk shows "Deployment successful" 
- ✅ Files appear in `httpdocs/` with recent timestamps
- ✅ Live site shows the new changes
- ✅ All pages load without errors
- ✅ Console shows no errors

---

## 📊 CURRENT STATUS SUMMARY

**Repository:** https://github.com/Bemyself19/codentrix-site  
**Latest Commit:** d071110 (Telehealth Platform Launch)  
**Branch:** main  
**Deploy Script:** ✅ Ready at `scripts/plesk-post-deploy.sh`  

**Next Action:** Log into Plesk and verify Git configuration following steps above.

---

**QUICK START:** Go to Plesk > Your Domain > Git > Check if repository is connected. If yes, click "Deploy". If no, follow "STEP 4" to configure.

