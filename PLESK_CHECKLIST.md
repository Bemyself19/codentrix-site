# ✅ PLESK VERIFICATION CHECKLIST

## Quick Access
📘 **Full Guide**: See `PLESK_VERIFICATION_GUIDE.md`  
🚀 **Deployment Guide**: See `DEPLOYMENT_GUIDE_OXAHOST.md`  
📊 **Implementation Details**: See `TELEHEALTH_LAUNCH.md`

---

## 🎯 IMMEDIATE ACTION REQUIRED

### Step 1: Login to Plesk
Access your OxaHost Plesk panel:
- URL: Usually `https://your-server:8443` or through OxaHost client area
- Login with your credentials

### Step 2: Check Git Configuration
Navigate to: **Your Domain → Git**

**Look for these settings:**

| Setting | Expected Value | ✓ |
|---------|---------------|---|
| Repository URL | `https://github.com/Bemyself19/codentrix-site.git` | [ ] |
| Branch | `main` | [ ] |
| Status | Connected/Active | [ ] |
| Post-deploy script | `sh scripts/plesk-post-deploy.sh` | [ ] |
| Deploy on push | Enabled (optional) | [ ] |

---

## 🔄 THREE DEPLOYMENT OPTIONS

### OPTION A: Automatic (Preferred)
**If Git is configured in Plesk:**
- ✅ Already done! Changes pushed to GitHub
- Plesk should auto-deploy when detecting push
- Or manually click **"Deploy"** button in Plesk Git section

### OPTION B: Manual Trigger
**If Git is configured but not auto-deploying:**
1. Go to Plesk → Your Domain → Git
2. Click **"Deploy"** or **"Pull Changes"** button
3. Wait for deployment to complete
4. Check deployment log for errors

### OPTION C: FTP Upload
**If Git is NOT configured:**
1. Build locally: `cd client && npm run build`
2. Connect via FTP to your server
3. Upload `client/dist/*` to `httpdocs/`
4. Ensure `.htaccess` is in place

---

## 🧪 QUICK TESTS

### Test 1: Build Locally (Optional)
```bash
cd "/home/nader/Codentrix website/codentrix-site"
sh scripts/test-build.sh
```
This verifies the build works before deployment.

### Test 2: Check Live Site
Visit your production URL and verify:
```
✓ Homepage loads
✓ Announcement banner appears  
✓ "Products" link in navigation
✓ /products page works (no 404)
✓ About page shows expansion section
✓ Language toggle EN ↔ FR works
✓ Mobile responsive
```

### Test 3: Browser Console
Open DevTools (F12) on your live site:
```
✓ No console errors
✓ Assets loading correctly
✓ No 404 errors for JS/CSS
```

---

## ⚠️ COMMON ISSUES & FIXES

### Issue: "Git section not found in Plesk"
**Fix:** Git extension may not be installed
- Contact OxaHost support: "Please enable Git extension for my domain"
- Or use FTP deployment instead

### Issue: "/products gives 404 error"
**Fix:** React Router needs .htaccess file
```apache
# Create .htaccess in httpdocs/ with:
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

### Issue: "Build fails with npm not found"
**Fix:** Node.js may not be installed
- Plesk → Tools & Settings → Updates → Components
- Install Node.js component
- Set version to 16.x or higher

### Issue: "Site shows old version"
**Fix:** 
1. Clear browser cache (Ctrl+Shift+R)
2. Check if files in httpdocs are new (timestamps)
3. Verify deployment actually ran

---

## 📞 SUPPORT CONTACTS

### OxaHost Support
- Open ticket in client area
- Ask: "Help configure Git deployment for domain [your-domain]"
- Mention: "Need to deploy React app with build process"

### Check Repository
- GitHub: https://github.com/Bemyself19/codentrix-site
- Latest commit: d071110
- Branch: main

---

## ✅ VERIFICATION STEPS

Complete this checklist:

### Pre-Deployment:
- [x] Changes committed to Git (d071110)
- [x] Changes pushed to GitHub
- [x] Deploy script exists and is executable
- [ ] Plesk Git configured
- [ ] Test build runs successfully

### During Deployment:
- [ ] Login to Plesk
- [ ] Navigate to Git section
- [ ] Click Deploy button
- [ ] Watch deployment log
- [ ] No errors in log

### Post-Deployment:
- [ ] Visit production URL
- [ ] Homepage loads correctly
- [ ] Announcement banner shows
- [ ] Products page accessible
- [ ] Navigation works
- [ ] Language toggle works
- [ ] Mobile view responsive
- [ ] No console errors

---

## 🎯 SUCCESS CRITERIA

Your deployment is successful when:
1. ✅ Live site shows announcement banner
2. ✅ "Products" link in navigation
3. ✅ `/products` page loads without 404
4. ✅ About page has expansion section
5. ✅ Both languages work (EN/FR)
6. ✅ No errors in browser console

---

## 📊 CURRENT STATUS

| Item | Status | Notes |
|------|--------|-------|
| Code Changes | ✅ Complete | 8 files updated |
| Git Commit | ✅ Done | Commit d071110 |
| GitHub Push | ✅ Pushed | To main branch |
| Local Build | ⏳ Test | Run test-build.sh |
| Plesk Config | ❓ Verify | Check in Plesk panel |
| Live Deploy | ⏳ Pending | Waiting for Plesk |
| Live Site Test | ⏳ After deploy | Test checklist above |

---

## 🚀 NEXT IMMEDIATE STEPS

**RIGHT NOW:**
1. **Open Plesk panel** in your browser
2. **Navigate to Git** section under your domain
3. **Check if configured** (see table above)
4. **If configured**: Click "Deploy" button
5. **If not configured**: Follow setup in PLESK_VERIFICATION_GUIDE.md
6. **After deploy**: Test your live site

**ESTIMATED TIME:** 5-10 minutes

---

## 📱 ANNOUNCEMENT READY

Once deployed and verified, you can announce:
- ✓ Update LinkedIn company page
- ✓ Post from leadership profiles
- ✓ Email clients (template in TELEHEALTH_LAUNCH.md)
- ✓ Update company directories

---

**Everything is ready! Just need to trigger the Plesk deployment.** 🎉

Check PLESK_VERIFICATION_GUIDE.md for detailed step-by-step instructions.

