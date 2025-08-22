# Codentrix Website - OxaHost Deployment Guide

## Pre-deployment Checklist ✅

### Frontend (Client)
- ✅ React app built successfully (`npm run build`)
- ✅ Production build created in `client/dist/`
- ✅ All translations working (EN/FR)
- ✅ Accordion services page functional
- ✅ Professional homepage with metrics
- ✅ Email forms configured
- ✅ All assets (logo, portraits) included

### Backend (Server)
- ✅ Express server configured
- ✅ Email functionality with Nodemailer
- ✅ File upload handling (CV submissions)
- ✅ CORS and security headers
- ✅ Environment variables configured

## Deployment Steps for OxaHost

### 1. Upload Files
Upload these directories to your OxaHost hosting:
```
codentrix-site/
├── client/dist/          # Static files (HTML, CSS, JS)
├── server/               # Node.js backend
└── package.json          # Root package file
```

### 2. Domain Configuration
- Point your domain to the `client/dist/` folder for static files
- Configure backend on a subdomain or port (e.g., api.codentrix.io)

### 3. Environment Variables
Configure these on OxaHost:
```
# Email Configuration
CONTACT_TO=contact@codentrix.io
CAREERS_TO=career@codentrix.io
CONTACT_FROM=noreply@codentrix.io

# SMTP Settings (update with your provider)
SMTP_HOST=your-smtp-host
SMTP_PORT=587
SMTP_USER=your-smtp-username
SMTP_PASS=your-smtp-password
```

### 4. Backend Setup
- Install Node.js dependencies: `npm install`
- Start the server: `npm start`
- Server runs on port 4000 by default

### 5. Frontend Configuration
If backend is on different domain, update API calls in:
- `client/src/pages/Contact.jsx`
- `client/src/pages/Apply.jsx`

Change from `/api/` to `https://api.yourdomain.com/api/`

## Production Optimizations

### Remove TLS Bypass (Important!)
In `server/index.js`, remove the testing TLS bypass:
```javascript
// REMOVE THIS LINE:
tls: { rejectUnauthorized: false }
```

### Configure Proper SMTP
- Use a reliable SMTP provider (SendGrid, Mailgun, etc.)
- Set up SPF and DKIM records
- Add proper SSL certificates

### Security Enhancements
- Add rate limiting
- Implement reCAPTCHA
- Add virus scanning for file uploads
- Set up proper CORS origins

## Testing Checklist
- [ ] Homepage loads with correct metrics
- [ ] Services accordion functions properly
- [ ] About page shows leadership cards
- [ ] Contact form sends emails
- [ ] Career application with CV upload works
- [ ] Language toggle (EN/FR) functions
- [ ] All links and navigation work
- [ ] Mobile responsiveness verified

## Support
- Frontend: Static React app in `client/dist/`
- Backend: Node.js Express server
- Email: Nodemailer with SMTP
- Database: None required (stateless)

Ready for deployment! 🚀
