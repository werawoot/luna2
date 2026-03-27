const express = require('express');
const router = express.Router();
const { getSession } = require('../db/queries/sessions');
const { saveRequest, getRequestsBySession } = require('../db/queries/requests');
const wsManager = require('../ws/manager');

// GET /hook/:id/requests — list captured requests (for initial page load)
router.get('/:id/requests', (req, res) => {
  const session = getSession(req.params.id);
  if (!session) return res.status(404).json({ error: 'Session not found' });
  res.json(getRequestsBySession(req.params.id));
});

// Capture any method on /hook/:id and /hook/:id/*
router.all('/:id', capture);
router.all('/:id/*', capture);

function capture(req, res) {
  const sessionId = req.params.id;
  const session = getSession(sessionId);
  if (!session) return res.status(404).json({ error: 'Session not found' });

  const captured = saveRequest({
    sessionId,
    method: req.method,
    path: req.path,
    query: req.query,
    headers: req.headers,
    body: req.rawBody || req.body,
    ip: req.ip || req.connection.remoteAddress,
  });

  // Broadcast to WebSocket subscribers
  wsManager.broadcast(sessionId, { type: 'new_request', request: captured });

  res.status(200).json({ received: true });
}

module.exports = router;
