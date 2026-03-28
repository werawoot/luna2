const express = require('express');
const router = express.Router();
const { getRequest } = require('../db/queries/requests');

// POST /api/requests/:id/replay
router.post('/:id/replay', async (req, res) => {
  const reqRecord = getRequest(req.params.id);
  if (!reqRecord) return res.status(404).json({ error: 'Request not found' });

  const { targetUrl } = req.body && typeof req.body === 'object' ? req.body : {};
  if (!targetUrl) return res.status(400).json({ error: 'targetUrl is required' });

  // Validate targetUrl
  let parsedUrl;
  try {
    parsedUrl = new URL(targetUrl);
  } catch {
    return res.status(400).json({ error: 'Invalid targetUrl' });
  }

  // Build headers — omit host, content-length, transfer-encoding
  const SKIP_HEADERS = new Set(['host', 'content-length', 'transfer-encoding']);
  const forwardHeaders = {};
  const srcHeaders = typeof reqRecord.headers === 'object' ? reqRecord.headers : {};
  for (const [key, value] of Object.entries(srcHeaders)) {
    if (!SKIP_HEADERS.has(key.toLowerCase())) {
      forwardHeaders[key] = value;
    }
  }

  const method = reqRecord.method.toUpperCase();
  const hasBody = !['GET', 'HEAD'].includes(method) && reqRecord.body;

  const fetchOptions = {
    method,
    headers: forwardHeaders,
  };

  if (hasBody) {
    fetchOptions.body = typeof reqRecord.body === 'string'
      ? reqRecord.body
      : JSON.stringify(reqRecord.body);
  }

  const start = Date.now();
  try {
    const response = await fetch(parsedUrl.toString(), fetchOptions);
    const durationMs = Date.now() - start;
    let responseBody;
    try {
      responseBody = await response.text();
    } catch {
      responseBody = '';
    }
    res.json({
      status: response.status,
      statusText: response.statusText,
      responseBody,
      durationMs,
    });
  } catch (err) {
    res.status(502).json({ error: `Replay failed: ${err.message}` });
  }
});

module.exports = router;
