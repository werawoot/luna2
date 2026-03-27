module.exports = {
  PORT: process.env.PORT || 3000,
  BASE_URL: process.env.BASE_URL || 'http://localhost:3000',
  DB_PATH: process.env.DB_PATH || './data/hookview.db',
  SESSION_TTL_HOURS: 24,
};
