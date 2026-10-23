Snipsnap
A tiny URL shortener with prepaid, per-click billing.

Owners authenticate with an API key and create short links.
Each visit to a short link redirects to its target and draws down the owner's prepaid balance by a fixed per-click price.
A small dashboard (React) lets owners shorten URLs and watch click counts.
Layout
Where	What
src/	The Express API — routing, billing, and the data layer
web/	The owner dashboard (React + Vite) that consumes the API
Dockerfile	How the API ships
Running
npm install
npm start          # API on :4000
cd web && npm run dev   # dashboard on :5173