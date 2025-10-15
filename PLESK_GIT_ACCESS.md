# 🔍 ACCESSING GIT IN YOUR PLESK PANEL

## What I Can See in Your Screenshot

✅ **Plesk Version**: You're running Plesk Obsidian (modern version)  
✅ **Git Available**: Git icon is visible in the "Dev Tools" section  
✅ **Last Commit**: 5223288 (older commit - before our telehealth launch)  
✅ **Node.js Installed**: I can see Node.js is available  

---

## 🎯 HOW TO ACCESS GIT PROPERLY

### Method 1: Through Websites & Domains (Recommended)

1. **Click on "Websites & Domains"** in the left sidebar (it's already visible in your screenshot)

2. Once in Websites & Domains, look for your domain name

3. You should see a list of tools/icons for that domain, including:
   - File Manager
   - **Git** (this is what you need to click)
   - Databases
   - Logs
   - etc.

4. Click on the **Git** icon/button for your specific domain

---

### Method 2: Direct URL Access

Based on your Plesk URL structure, try accessing Git directly:

**Try this URL in your browser:**
```
https://plesk1.tn.oxa.host:8443/smb/git/list/domain-id/459/site-id/459
```

Or more generally:
```
https://plesk1.tn.oxa.host:8443/modules/git/index.php/domain/repositories?dom_id=459&site_id=459
```

---

### Method 3: Check Git Extension

The Git tool might need to be fully enabled. Here's how to check:

1. **Go to**: Tools & Settings (gear icon at top)
2. **Click**: Updates and Upgrades (or Extensions)
3. **Look for**: Git extension
4. **Ensure**: It's installed and enabled

---

## 🔍 WHAT TO LOOK FOR IN GIT SECTION

Once you successfully open Git, you should see:

### If Repository is Connected:
```
Repository: https://github.com/Bemyself19/codentrix-site.git
Branch: main (or other)
Last Deployment: [timestamp]
Status: [Active/Connected]

[Deploy] [Pull] [Configure] buttons
```

### If No Repository Connected:
```
No repository connected

[+ Add Repository] button
```

---

## 📊 CHECKING YOUR CURRENT GIT STATUS

I can see in your screenshot tooltip:
```
Date: Sun, 03 Aug 2025 22:59:20 +0000
Author: Bemyself19
<nader.ben.ammar@gmail.com>
Add scripts for clean shutdown, port management, and certificate trust
```

**This is from August 3** - which is BEFORE our October 15 telehealth launch!

This means:
- ⚠️ **The latest changes (commit d071110) are NOT deployed yet**
- ⚠️ **You need to trigger a Git pull/deploy to get the new telehealth platform**

---

## 🚨 IMMEDIATE ACTION NEEDED

### Step 1: Access Git Section Properly

**Try these in order:**

**A. Click on your domain first:**
1. Click "Websites & Domains" in left sidebar
2. Find "codentrix.tn" or your domain name
3. Look for Git icon in the tools section
4. Click it

**B. Or use the search:**
1. Use the search box at the top (where it says "Search...")
2. Type: "Git"
3. Click on the Git result

**C. Or from the homepage:**
- Scroll down on your current view
- Look for "Git" card/widget
- Click on it

---

## 🔄 WHAT YOU NEED TO DO AFTER ACCESSING GIT

Once you're in the Git section:

### Scenario A: Repository Already Connected
1. You'll see the repository details
2. Look for **"Pull Changes"** or **"Deploy"** button
3. Click it to pull the latest changes (commit d071110)
4. Wait for deployment to complete
5. Check deployment log for errors

### Scenario B: No Repository Connected
1. Click **"Add Repository"** or **"Configure"**
2. Enter:
   - Repository URL: `https://github.com/Bemyself19/codentrix-site.git`
   - Branch: `main`
   - Directory: (leave default or set to your domain path)
3. Set post-deployment actions:
   - Command: `sh scripts/plesk-post-deploy.sh`
4. Save and then click **"Deploy"**

---

## 🖼️ WHAT THE GIT SCREEN SHOULD LOOK LIKE

You should see a screen similar to this layout:

```
┌─────────────────────────────────────────────┐
│ Git                                         │
├─────────────────────────────────────────────┤
│                                             │
│ Repository Information                      │
│ URL: https://github.com/Bemyself19/...     │
│ Branch: main                                │
│ Status: ✓ Connected                         │
│                                             │
│ Last Deployment: Aug 03, 2025 22:59:20     │
│ Commit: 5223288                             │
│                                             │
│ [Deploy] [Pull Changes] [Manage]           │
│                                             │
│ Deployment History                          │
│ [List of previous deployments]             │
│                                             │
│ Actions After Deploy                        │
│ ☑ Run: sh scripts/plesk-post-deploy.sh    │
│                                             │
└─────────────────────────────────────────────┘
```

---

## 🐛 TROUBLESHOOTING CLICKS NOT WORKING

### If Git Icon Clicks But Nothing Happens:

**Option 1: Try Right-Click**
- Right-click on the Git icon
- Select "Open in new tab"

**Option 2: Check Browser Console**
- Press F12 to open Developer Tools
- Go to Console tab
- Click Git icon again
- Check for any JavaScript errors
- Share the error if you see one

**Option 3: Try Different Browser**
- Sometimes Plesk works better in Chrome/Firefox
- Clear browser cache: Ctrl+Shift+Delete

**Option 4: Check Popup Blockers**
- Git management might open in popup
- Disable popup blocker for Plesk URL
- Look for popup notification in address bar

---

## 📸 WHAT TO SEND ME

To help you better, can you:

1. **Click "Websites & Domains"** in the left sidebar
2. **Take a screenshot** of the domain tools page
3. **Show me** what options you see there

Or:

1. **Try the direct URL** I mentioned above
2. **Take a screenshot** of what appears
3. **Share any error messages**

---

## ✅ VERIFICATION CHECKLIST

Once you access Git properly, verify:
- [ ] Can see repository URL
- [ ] Can see current branch (main)
- [ ] Can see last deployment date
- [ ] Can see Deploy or Pull button
- [ ] Can see commit history

---

## 🎯 YOUR CURRENT SITUATION

**What you have:**
- ✅ Plesk access
- ✅ Git visible in interface
- ✅ Code pushed to GitHub (commit d071110)
- ⚠️ Git window not opening properly

**What you need:**
- 🎯 Access Git management interface
- 🎯 Pull latest changes from GitHub
- 🎯 Deploy commit d071110 (Telehealth Platform)

**Current deployed version:** August 3, 2025 (commit 5223288)  
**Target version:** October 15, 2025 (commit d071110)

---

## 🚀 ALTERNATIVE: QUICK SSH DEPLOY

If you can't access Git UI, you can deploy via SSH:

```bash
# SSH into your server
ssh your-username@plesk1.tn.oxa.host

# Navigate to repository
cd /var/www/vhosts/your-domain.com/

# Pull latest changes
git pull origin main

# Run build script
sh scripts/plesk-post-deploy.sh
```

---

**TIP:** The most common location for Git in Plesk is:  
**Websites & Domains → [Your Domain] → Git**

Try clicking through that path and let me know what you see!

