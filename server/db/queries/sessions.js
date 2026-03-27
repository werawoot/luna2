const db = require('../client');
const config = require('../../config');

function createSession(id) {
  const now = Date.now();
  const expiresAt = now + config.SESSION_TTL_HOURS * 60 * 60 * 1000;
  db.prepare(
    'INSERT INTO sessions (id, created_at, expires_at) VALUES (?, ?, ?)'
  ).run(id, now, expiresAt);
  return db.prepare('SELECT * FROM sessions WHERE id = ?').get(id);
}

function getSession(id) {
  return db.prepare('SELECT * FROM sessions WHERE id = ?').get(id);
}

module.exports = { createSession, getSession };
