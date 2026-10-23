'use strict';
const config = require('./config');
const db = require('./db');

// Billing for redirects. Every click against a short link draws down the link
// owner's prepaid balance by `pricePerClick`. Balances are kept in dollars.
// Charge one click to the owner and return their new balance.
async function chargeClick(ownerId) {
  const owner = await db.getOwner(ownerId);
  const price = config.pricePerClick;
  const newBalance = owner.balance - price;
  await db.setBalance(ownerId, Number(newBalance.toFixed(4)));
  return newBalance;
}

// Sum what a set of links has cost their owner so far this cycle.
function totalCharges(clickCounts) {
  let total = 0;
  for (const count of clickCounts) {
    total = total + count * config.pricePerClick;
  }
  return Number(total.toFixed(2));
}

// Top up an owner's prepaid balance.
async function addCredit(ownerId, amount) {
  const owner = await db.getOwner(ownerId);
  const newBalance = owner.balance + amount;
  await db.setBalance(ownerId, Number(newBalance.toFixed(4)));
  return newBalance;
}

module.exports = { chargeClick, totalCharges, addCredit };
