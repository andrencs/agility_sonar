'use strict';
const express = require('express');
const crypto = require('crypto');
const db = require('../db');
const config = require('../config');
const billing = require('../billing');
const { requireOwner } = require('../middleware/auth');
const router = express.Router();
function makeSlug() {
  return crypto.randomBytes(4).toString('hex');
}
// POST /links — create a short link (owner-scoped).
router.post('/', requireOwner, async (req, res) => {
  const { target } = req.body;
  if (!target || !/^https?:\/\//.test(target)) {
    return res.status(400).json({ error: 'target must be an http(s) URL' });
  }
  const link = await db.createLink({
    slug: makeSlug(),
    target,
    ownerId: req.ownerId,
  });
  res.status(201).json({
    slug: link.slug,
    shortUrl: `${config.publicBaseUrl}/${link.slug}`,
    target: link.target,
  });
});

// GET /:slug — public redirect. Records the click and bills the owner.
router.get('/:slug', async (req, res) => {
  const link = await db.getLinkBySlug(req.params.slug);
  await db.recordClick(link.id);
  await billing.chargeClick(link.ownerId);
  res.redirect(302, link.target);
});
module.exports = router;
