# Srujana Sharma Portfolio

Responsive portfolio website based on Srujana Sharma's supplied resume.

## Project structure
- `client/` — React + Vite portfolio UI
- `server/` — Express API for contact form submissions
- `server/.env.example` — safe environment-variable template

## Run locally
1. Install Node.js (LTS recommended).
2. In the project root, run `npm run install:all`.
3. Configure `server/.env` using `server/.env.example`. Set `MONGODB_URI` and `CLIENT_URL` for your environment. Do not commit `.env`.
4. Start the frontend and API with `npm run dev`.
5. Open the Vite URL printed in the terminal (typically `http://localhost:5173`).

The contact form requires a running API and a configured MongoDB connection. The UI can be previewed without database setup, but contact submissions will not be stored until the backend is configured.

## Content notes
Portfolio content reflects the supplied resume. GitHub links to [Srujana Sharma's profile](https://github.com/Srujanasharma). Certification providers/titles are shown as listed; the resume did not provide specific certificate names.
