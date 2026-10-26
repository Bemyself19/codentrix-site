# Codentrix Website - cPanel Deployment Guide

**Migration from Plesk to cPanel**

## Prerequisites
- ✅ cPanel hosting account with SSH access
- ✅ Git installed on hosting server (usually pre-installed)
- ✅ Node.js available (v16+ recommended)
- ✅ SSH key pair configured

---

## Step 1: Add SSH Key to cPanel

### 1.1 Generate SSH Key (if you don't have one)
```bash
ssh-keygen -t ed25519 -f ~/.ssh/cpanel_key -N ""
```

### 1.2 Add Public Key to cPanel
**Via cPanel UI:**
1. Log in to cPanel
2. Go to **Security** → **SSH Access**
3. Click **Manage SSH Keys**
4. Click **Import Key**
5. Paste your public key (`cat ~/.ssh/cpanel_key.pub`)
6. Set as **Default** key
7. Authorize the key

**Via Terminal (SSH):**
```bash
# SSH into your hosting with cPanel credentials first
ssh cpanel_user@your-host.com

# Create .ssh directory if needed
mkdir -p ~/.ssh
chmod 700 ~/.ssh

# Add your public key to authorized_keys
echo "your-public-key-content" >> ~/.ssh/authorized_keys
chmod 600 ~/.ssh/authorized_keys
```

### 1.3 Test SSH Connection
```bash
# Test with your key
ssh -i ~/.ssh/cpanel_key cpanel_user@your-host.com

# You should connect without entering a password
```

---

## Step 2: Clone Repository via SSH

### 2.1 Configure SSH Key for Git (if needed)
```bash
# Run this on your local machine to add key to SSH agent
ssh-add ~/.ssh/cpanel_key
```

### 2.2 Clone the Repository
**SSH into your cPanel account:**
```bash
ssh -i ~/.ssh/cpanel_key cpanel_user@your-host.com
```

**Then clone the repository:**
```bash
# Navigate to your home directory or public_html
cd ~/public_html

# Clone the repository (use HTTPS if SSH key not configured in GitHub)
git clone https://github.com/Bemyself19/codentrix-site.git

# Or if using SSH with GitHub:
# First, add your SSH key to GitHub (Settings → SSH and GPG keys)
# Then:
# git clone git@github.com:Bemyself19/codentrix-site.git

# Navigate to project
cd codentrix-site
```

---

## Step 3: Deploy Frontend (React/Vite)

### 3.1 Build the Frontend
```bash
# Navigate to client directory
cd client

# Install dependencies
npm install

# Build for production
npm run build

# Check that dist folder is created
ls -la dist/
```

### 3.2 Configure Domain in cPanel to Use `dist/` Folder

**Option A: Via cPanel File Manager**
1. Go to **File Manager**
2. Navigate to `/public_html/`
3. If deploying to primary domain: delete old files, copy `codentrix-site/client/dist/*` to `public_html/`
4. For subdomain: create subdomain pointing to `codentrix-site/client/dist/`

**Option B: Via Terminal**
```bash
# From codentrix-site directory
# For main domain:
cp -r client/dist/* ~/public_html/

# OR for subdomain (assuming subdomain points to ~/public_html/subdomain)
cp -r client/dist/* ~/public_html/subdomain/
```

### 3.3 Configure htaccess for React Router (Important!)
**Create `.htaccess` file in your dist directory:**
```apache
<IfModule mod_rewrite.c>
  RewriteEngine On
  RewriteBase /
  RewriteRule ^index\.html$ - [L]
  RewriteCond %{REQUEST_FILENAME} !-f
  RewriteCond %{REQUEST_FILENAME} !-d
  RewriteRule . /index.html [L]
</IfModule>
```

Or create via terminal:
```bash
# Navigate to your dist folder (where frontend files are)
cd ~/public_html  # or wherever your dist files are

cat > .htaccess << 'EOF'
<IfModule mod_rewrite.c>
  RewriteEngine On
  RewriteBase /
  RewriteRule ^index\.html$ - [L]
  RewriteCond %{REQUEST_FILENAME} !-f
  RewriteCond %{REQUEST_FILENAME} !-d
  RewriteRule . /index.html [L]
</IfModule>
EOF
```

---

## Step 4: Deploy Backend (Node.js Express)

### 4.1 Choose Your Node.js Deployment Method

**Option A: Using cPanel's Application Manager (Recommended for ease)**
- cPanel often includes **CloudLinux** which supports Node.js apps
- Go to **Software** → **Application Manager** (or **Node.js Selector**)
- Create or manage Node.js app

**Option B: Manual Setup with PM2 (Recommended for control)**
1. Install PM2 globally on server:
```bash
ssh -i ~/.ssh/cpanel_key cpanel_user@your-host.com
npm install -g pm2
pm2 startup
pm2 save
```

2. Navigate to backend and install dependencies:
```bash
cd ~/codentrix-site/server
npm install
```

3. Create `.env` file with configuration:
```bash
cat > .env << 'EOF'
# Email Configuration
CONTACT_TO=contact@codentrix.io
CAREERS_TO=career@codentrix.io
CONTACT_FROM=noreply@codentrix.io

# SMTP Settings (configure with your email provider)
SMTP_HOST=smtp.your-provider.com
SMTP_PORT=587
SMTP_USER=your-email@your-domain.com
SMTP_PASS=your-smtp-password

# Server Configuration
PORT=4000
NODE_ENV=production
EOF

chmod 600 .env  # Secure permissions
```

4. Start backend with PM2:
```bash
pm2 start index.js --name "codentrix-api"
pm2 save
pm2 startup
```

### 4.2 Configure Reverse Proxy for Backend Access

**If backend needs to be accessible at `api.yourdomain.com`:**

You'll need to:
1. Create an addon domain or subdomain in cPanel for `api.yourdomain.com`
2. Point it to a different port (e.g., 4000)
3. Configure a reverse proxy

**Using cPanel's EasyApache (if available):**
- Go to **Software** → **EasyApache** → Configure
- Enable mod_proxy if not already enabled

**Or use `.htaccess` for reverse proxy:**
```apache
<IfModule mod_proxy.c>
  ProxyPreserveHost On
  ProxyPass / http://127.0.0.1:4000/
  ProxyPassReverse / http://127.0.0.1:4000/
</IfModule>
```

### 4.3 Configure Frontend to Call Backend API

**If backend is on different subdomain, update:**
- `client/src/pages/Contact.jsx`
- `client/src/pages/Apply.jsx`

Change API calls from:
```javascript
// Old (local)
const response = await axios.post('/api/send-email', data);

// New (separate backend domain)
const response = await axios.post('https://api.yourdomain.com/api/send-email', data);
```

Then rebuild frontend:
```bash
cd client
npm run build
```

---

## Step 5: Configure SMTP for Email Functionality

### 5.1 Get SMTP Credentials
**Option: Use cPanel's Email Accounts with SMTP**
1. In cPanel, go to **Email** → **Email Accounts**
2. Create an email account (e.g., `noreply@yourdomain.com`)
3. Get SMTP details from your hosting provider
4. Typical settings:
   - **SMTP Host**: mail.yourdomain.com or smtp.your-provider.com
   - **SMTP Port**: 587 (TLS) or 465 (SSL)
   - **Username**: full email address
   - **Password**: email password

### 5.2 Update .env File
```bash
SMTP_HOST=mail.yourdomain.com
SMTP_PORT=587
SMTP_USER=noreply@yourdomain.com
SMTP_PASS="your-email-password"
CONTACT_FROM=noreply@yourdomain.com
```

### 5.3 Important: Remove TLS Bypass
**Edit `server/index.js` and remove this line:**
```javascript
// DELETE THIS LINE:
tls: { rejectUnauthorized: false }
```

---

## Step 6: Verify Deployment

### 6.1 Check Frontend
1. Visit `https://yourdomain.com` in browser
2. Should load your React site
3. Test language toggle (EN/FR)
4. Test accordion on Services page

### 6.2 Check Backend
```bash
# SSH into server
ssh -i ~/.ssh/cpanel_key cpanel_user@your-host.com

# Check if Node process is running
ps aux | grep "node\|pm2"

# Or with PM2:
pm2 list

# View logs:
pm2 logs
```

### 6.3 Test API Endpoints
```bash
# From local machine, test backend
curl https://api.yourdomain.com/health
# Or if on same port:
curl https://yourdomain.com/api/health
```

### 6.4 Test Email Functionality
1. Go to your Contact page
2. Fill out the form
3. Submit
4. Check that email arrives at configured destination

---

## Step 7: SSL Certificates

### 7.1 Auto-enable HTTPS with AutoSSL
1. In cPanel, go to **Security** → **AutoSSL**
2. Should be automatically enabled
3. Verify your domain is listed
4. Certificate should renew automatically

### 7.2 Verify SSL
```bash
# From local machine
curl -I https://yourdomain.com
# Should show "HTTP/1.1 200 OK"
```

---

## Updating Deployment

### Pull Latest Changes
```bash
ssh -i ~/.ssh/cpanel_key cpanel_user@your-host.com
cd ~/codentrix-site
git pull origin main
```

### Rebuild Frontend
```bash
cd client
npm install  # if dependencies changed
npm run build
cp -r dist/* ~/public_html/
```

### Restart Backend
```bash
cd ../server
npm install  # if dependencies changed
pm2 restart codentrix-api
pm2 logs  # verify it started
```

---

## Troubleshooting

### 502 Bad Gateway (Backend Connection Failed)
- Verify Node.js process is running: `pm2 list`
- Check firewall isn't blocking port 4000
- Verify reverse proxy is configured correctly
- Check backend logs: `pm2 logs codentrix-api`

### 404 on Frontend Routes
- Verify `.htaccess` is in your website root
- Check that `mod_rewrite` is enabled in cPanel

### CORS Errors
- Backend should already have CORS configured
- Verify `Access-Control-Allow-Origin` headers in backend responses
- Check `server/index.js` for CORS configuration

### Email Not Sending
- Verify SMTP credentials in `.env`
- Check server logs: `pm2 logs codentrix-api`
- Verify firewall allows SMTP ports (587, 465)
- Test SMTP connection: `telnet mail.yourdomain.com 587`

### SSH Key Not Working
- Verify key permissions: `chmod 600 ~/.ssh/authorized_keys`
- Ensure public key is correctly pasted in cPanel
- Try with password first, then troubleshoot key issue

---

## Pre-Launch Checklist ✅

- [ ] SSH key configured and tested
- [ ] Repository cloned successfully
- [ ] Frontend built (`npm run build` completed)
- [ ] Frontend deployed to public_html
- [ ] `.htaccess` configured for React Router
- [ ] Backend dependencies installed
- [ ] `.env` file configured with SMTP credentials
- [ ] Backend running (check `pm2 list`)
- [ ] Frontend loads at `https://yourdomain.com`
- [ ] Backend API responds at `https://yourdomain.com/api/`
- [ ] Contact form submits successfully
- [ ] Email received for form submissions
- [ ] HTTPS/SSL working
- [ ] Languages toggle working (EN/FR)
- [ ] Services accordion working

---

## Need Help?

**Check these files for more details:**
- [client/README.md](./client/README.md) - Frontend setup
- [server/README.md](./server/README.md) - Backend setup
- [DEPLOYMENT.md](./DEPLOYMENT.md) - General deployment info

**Common references:**
- cPanel Documentation: https://docs.cpanel.net/
- Node.js on cPanel: https://docs.cpanel.net/guides/nodejs/
- Let's Encrypt AutoSSL: https://docs.cpanel.net/guides/autossssl/
