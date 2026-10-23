'use strict';
const express = require('express');
const config = require('./config');
const linksRoutes = require('./routes/links');
const statsRoutes = require('./routes/stats');
const app = express();
app.use(express.json());
// Health check for the platform.
app.get('/healthz', (req, res) => res.json({ ok: true }));
// Link management + public redirects live under the root; stats under /links.
app.use('/links', statsRoutes);
app.use('/', linksRoutes);
if (require.main === module) {
  app.listen(config.port, () => {
    // eslint-disable-next-line no-console
    console.log(`Snipsnap listening on ${config.publicBaseUrl}`);
  });
}
module.exports = app;