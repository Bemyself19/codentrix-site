# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

Bilingual (English/French) marketing website for Codentrix SARL — an AI automation and digital health company targeting MENA/EU markets. Monorepo with two separate npm packages:

- `client/` — React 18 + Vite 5 SPA
- `server/` — Express 4 API (contact form + careers application emails via Nodemailer)

## Development Commands

Install all dependencies from repo root:
```bash
npm run install-all
```

**Client** (`cd client`):
```bash
npm run dev      # dev server on :5174 (override with VITE_DEV_PORT)
npm run build    # production build → client/dist/
npm run preview  # preview production build
```

**Server** (`cd server`):
```bash
node index.js    # or: npm start
```

**Both together** (from repo root):
```bash
npm start        # starts server in background, client dev in foreground
npm stop         # kills background server
```

## Architecture

### Client
- **Router**: React Router v6, routes defined in `client/src/App.jsx`
- **i18n**: All UI strings live in `client/src/i18n.js` — a single flat object with `en` and `fr` translation keys. No external translation files. Use `useTranslation()` from react-i18next in components.
- **Pages**: `Home`, `About`, `Services`, `Products`, `Careers`, `Contact`, `Apply` — each a standalone page component under `client/src/pages/`
- **Shared components**: `NavBar`, `Footer`, `LanguageToggle` under `client/src/components/`
- **API proxy**: Vite dev server proxies `/api/*` → `http://localhost:4000`

### Server
- Entry point: `server/index.js` (CommonJS, no `src/` indirection)
- **Port**: `process.env.PORT` defaulting to `4000`
- **Static serving**: Serves static files from `../httpdocs` relative to the server directory (for cPanel/Plesk hosting; update the path literal when hosting differs)
- **API endpoints**:
  - `POST /api/contact` — contact form; fields: `name`, `email`, `message`
  - `POST /api/careers/apply` — job application; fields: `name`, `email`, `phone`, `education`, `experience` + optional `cv` file upload (max 10 MB)
- **Email**: Nodemailer. Requires env vars: `SMTP_HOST`, `SMTP_PORT`, `SMTP_SECURE`, `SMTP_USER`, `SMTP_PASS`, `CONTACT_TO`, `CAREERS_TO`. Optional: `SMTP_TLS_SERVERNAME`, `CONTACT_FROM`. If SMTP is not configured the endpoints still return `{ status: 'ok' }` and log to console.

## Deployment Notes
- Frontend production build goes to `client/dist/` — upload contents to the host's web root (`public_html` for cPanel, `httpdocs` for Plesk)
- The static file path in `server/index.js` (`'../httpdocs'`) must match the hosting provider's web root — update it when switching hosts
- SSH key for server access: `id_ed25519_codentrix` (do not commit changes to this key)
- Deployment guides for OxaHost/cPanel: `CPANEL_DEPLOYMENT_GUIDE.md` and `DEPLOYMENT_GUIDE_OXAHOST.md`
