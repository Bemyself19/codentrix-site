Codentrix Client

This is a Vite + React client for the Codentrix marketing site.

To run locally (default dev port is 5174):

```bash
cd client
npm install
# run dev on the default port 5174
npm run dev
```

To override the dev port, set VITE_DEV_PORT before running dev:

```bash
VITE_DEV_PORT=3000 npm run dev
```

Build for production:

```bash
npm run build
```

The client expects an API at `/api` for the contact form. In development, the server can be proxied via a dev proxy or run separately on port 4000.

Brand logo

Place the provided Codentrix logo image at `client/public/logo.png`. The NavBar will load `/logo.png` automatically.

Add CSO photo

If you want to show the CSO profile (Ahmed Dammak) on the About page, place the extracted portrait image at `client/public/ahmed.jpg`. For example:

```bash
# from your machine where the PDF is located
pdfimages -j "/home/nader/Downloads/ahmed_dammak_cv_gb_2025.pdf" client/public/ahmed
# then rename the extracted jpeg as needed and ensure it's at client/public/ahmed.jpg
```
