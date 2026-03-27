const db = require('../client');

function saveRequest({ sessionId, method, path, query, headers, body, ip }) {
  const receivedAt = Date.now();
  const result = db.prepare(`
    INSERT INTO requests (session_id, method, path, query, headers, body, ip, received_at)
    VALUES (?, ?, ?, ?, ?, ?, ?, ?)
  `).run(
    sessionId,
    method,
    path,
    JSON.stringify(query),
    JSON.stringify(headers),
    typeof body === 'string' ? body : JSON.stringify(body),
    ip,
    receivedAt
  );

  return getRequest(result.lastInsertRowid);
}

function getRequest(id) {
  const row = db.prepare('SELECT * FROM requests WHERE id = ?').get(id);
  return parseRequest(row);
}

function getRequestsBySession(sessionId) {
  const rows = db.prepare(
    'SELECT * FROM requests WHERE session_id = ? ORDER BY received_at DESC'
  ).all(sessionId);
  return rows.map(parseRequest);
}

function parseRequest(row) {
  if (!row) return null;
  return {
    ...row,
    query: JSON.parse(row.query || '{}'),
    headers: JSON.parse(row.headers || '{}'),
  };
}

module.exports = { saveRequest, getRequest, getRequestsBySession };
