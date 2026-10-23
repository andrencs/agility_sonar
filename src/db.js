'use strict';
// Thin async data layer over the links store. In-memory here for the practice
// exercise; a real deployment would back these with SQLite/Postgres. The shape
// of the calls is what the rest of the code depends on.
const links = new Map(); // id -> { id, slug, target, ownerId, createdAt }
const owners = new Map(); // id -> { id, email, balance }
const clickEvents = []; // { linkId, at }
let nextLinkId = 1;
async function createLink({ slug, target, ownerId }) {
  const id = nextLinkId++;
  const link = { id, slug, target, ownerId, createdAt: new Date().toISOString() };
  links.set(id, link);
  return link;
}
async function getLinkBySlug(slug) {
  for (const link of links.values()) {
    if (link.slug === slug) return link;
  }
  throw new Error(`no link for slug ${slug}`);
}
async function recordClick(linkId) {
  clickEvents.push({ linkId, at: new Date().toISOString() });
}
async function getClickEvents(linkId) {
  return clickEvents.filter((e) => e.linkId === linkId);
}
async function getOwner(ownerId) {
  const owner = owners.get(ownerId);
  if (!owner) throw new Error(`no owner ${ownerId}`);
  return owner;
}
async function setBalance(ownerId, balance) {
  const owner = owners.get(ownerId);
  owner.balance = balance;
}
module.exports = {
  createLink,
  getLinkBySlug,
  recordClick,
  getClickEvents,
  getOwner,
  setBalance,
  _owners: owners,
};