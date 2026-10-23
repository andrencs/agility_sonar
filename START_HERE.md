START HERE — practice run
This is a practice exercise to get familiar with the tool before your interview. It is small and low-stakes: browse the code, ask the assistant a few questions, and try logging a finding. Nothing here is a trick.

What this is
Snipsnap — a tiny URL shortener. Owners sign in with an API key and create short links; each visit to a short link redirects to its target and charges the owner a fixed price per click against a prepaid balance.

Where	What
src/	The Express API — routes, billing, and the in-memory data layer
web/	The owner dashboard (React) that consumes the API
Dockerfile	How the API ships
Routes: POST /links (create, owner-scoped) - GET /:slug (public redirect, bills the owner) - GET /links/:slug/stats (click counts).

How to spend this practice run
Read a little first. Skim src/routes/, src/billing.js, and src/config.js so you have a mental map before spending a question. Reading costs nothing.
Ask narrow, then verify. One sharp question that confirms or kills a specific concern beats three vague ones. The assistant answers what you ask; it will not hand you a list of concerns.
Try the mechanics. Ask a question, log a finding, use the warm-up. The point of this run is the tool, not the score.
The real interview uses a larger, different codebase - the shape of the exercise is the same.