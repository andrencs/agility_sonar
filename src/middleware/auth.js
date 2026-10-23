'use strict';
// API-key auth for link-management routes. Clients send `Authorization: Bearer
// <key>`; the key maps to an owner id used to scope writes and billing. Public
// redirects (GET /:slug) do not pass through here.
const keys = new Map([
  // demo owner keys -> owner id
  ['key_alice', 'owner_alice'],
  ['key_bob', 'owner_bob'],
]);
function requireOwner(req, res, next) {
  const header = req.get('authorization') || '';
  const match = header.match(/^Bearer (.+)$/);
  if (!match) {
    return res.status(401).json({ error: 'missing bearer token' });
  }
  const ownerId = keys.get(match[1]);
  if (!ownerId) {
    return res.status(401).json({ error: 'invalid token' });
  }
  req.ownerId = ownerId;
  next();
}
module.exports = { requireOwner };
