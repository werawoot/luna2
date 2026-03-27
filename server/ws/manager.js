const { WebSocketServer } = require('ws');

// Map of sessionId -> Set of WebSocket clients
const rooms = new Map();

function attach(server) {
  const wss = new WebSocketServer({ server, path: '/ws' });

  wss.on('connection', (ws) => {
    let subscribedSession = null;

    ws.on('message', (raw) => {
      let msg;
      try { msg = JSON.parse(raw); } catch { return; }

      if (msg.type === 'subscribe' && msg.sessionId) {
        subscribedSession = msg.sessionId;
        if (!rooms.has(subscribedSession)) {
          rooms.set(subscribedSession, new Set());
        }
        rooms.get(subscribedSession).add(ws);
        ws.send(JSON.stringify({ type: 'subscribed', sessionId: subscribedSession }));
      }
    });

    ws.on('close', () => {
      if (subscribedSession && rooms.has(subscribedSession)) {
        rooms.get(subscribedSession).delete(ws);
        if (rooms.get(subscribedSession).size === 0) {
          rooms.delete(subscribedSession);
        }
      }
    });
  });
}

function broadcast(sessionId, payload) {
  const clients = rooms.get(sessionId);
  if (!clients) return;
  const msg = JSON.stringify(payload);
  for (const ws of clients) {
    if (ws.readyState === 1 /* OPEN */) {
      ws.send(msg);
    }
  }
}

module.exports = { attach, broadcast };
