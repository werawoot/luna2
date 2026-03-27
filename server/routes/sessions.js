const express = require('express');
const router = express.Router();
const crypto = require('crypto');
const config = require('../config');
const { createSession, getSession } = require('../db/queries/sessions');

// POST /api/sessions — create a new session
router.post('/', (req, res) => {
  const id = crypto.randomBytes(6).toString('hex'); // 12-char hex
  const session = createSession(id);
  res.json({
    id: session.id,
    url: `${config.BASE_URL}/hook/${session.id}`,
    expiresAt: session.expires_at,
  });
});

// GET /api/sessions/:id
router.get('/:id', (req, res) => {
  const session = getSession(req.params.id);
  if (!session) return res.status(404).json({ error: 'Session not found' });
  res.json({
    id: session.id,
    url: `${config.BASE_URL}/hook/${session.id}`,
    createdAt: session.created_at,
    expiresAt: session.expires_at,
  });
});

module.exports = router;
