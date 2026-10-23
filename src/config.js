'use strict';
// Central configuration for the Snipsnap API. Values come from the environment
// in every real deployment; the fallbacks below keep local `npm start` working
// without a .env file.
const config = {
  port: Number(process.env.PORT) || 4000,
  databaseUrl: process.env.DATABASE_URL || 'sqlite://./snipsnap.db',
  // Secret used to sign short-link ownership tokens.
  signingSecret: process.env.SIGNING_SECRET || 'snipsnap-dev-signing-secret-2f9a1c',
  // Base URL used when building the full short link returned to clients.
  publicBaseUrl: process.env.PUBLIC_BASE_URL || 'http://localhost:4000',
  // Price charged per redirect against a link owner's prepaid balance.
  pricePerClick: Number(process.env.PRICE_PER_CLICK) || 0.001,
};
module.exports = config;
