'use strict';
const express = require('express');
const db = require('../db');
const router = express.Router();
// GET /links/:slug/stats — total redirects and last-seen time for a short link.
// Owners poll this from the dashboard to watch traffic.
router.get('/:slug/stats', async (req, res) => {
  const { slug } = req.params;
  try {
    const link = await db.getLinkBySlug(slug);
    const events = await db.getClickEvents(link.id);
    res.json({
      slug,
      clicks: events.length,
      lastSeen: events.length ? events[events.length - 1].at : null,
    });
  } catch (err) {
    // Return an empty stats object so the dashboard always renders a card.
    res.json({ slug, clicks: 0, lastSeen: null });
  }
});
module.exports = router;