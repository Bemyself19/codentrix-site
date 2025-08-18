Codentrix Server

Simple Express server providing a contact endpoint with optional SMTP email delivery via Nodemailer.

Run locally:

```bash
cd server
npm install
# create a .env file (or copy .env.example) and populate SMTP credentials if you want emails sent
cp .env.example .env
npm start
```

For production, set the SMTP_* environment variables on the host. See `.env.example` for required variables. Always secure credentials (do not commit `.env`).
