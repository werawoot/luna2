const express = require('express');
const http = require('http');
const path = require('path');
const rateLimit = require('express-rate-limit');
const config = require('./config');
const { migrate } = require('./db/migrate');
const wsManager = require('./ws/manager');
const { deleteExpiredSessions, deleteOrphanedRequests } = require('./db/queries/sessions');

// Run migrations
migrate();

const app = express();

// Rate limiters
const sessionCreateLimiter = rateLimit({
  windowMs: 60 * 60 * 1000, // 1 hour
  max: 20,
  standardHeaders: true,
  legacyHeaders: false,
  message: { error: 'Too many sessions created from this IP, please try again later.' },
});

const hookLimiter = rateLimit({
  windowMs: 60 * 1000, // 1 minute
  max: 100,
  standardHeaders: true,
  legacyHeaders: false,
  message: { error: 'Too many requests to hook endpoint, please slow down.' },
});

// Parse JSON and raw bodies
app.use((req, res, next) => {
  let data = '';
  req.setEncoding('utf8');
  req.on('data', chunk => { data += chunk; });
  req.on('end', () => {
    req.rawBody = data;
    try {
      req.body = data ? JSON.parse(data) : {};
    } catch {
      req.body = data;
    }
    next();
  });
});

app.use(express.urlencoded({ extended: true }));

// Serve static frontend
app.use(express.static(path.join(__dirname, '../public')));

// API routes
app.use('/api/sessions', sessionCreateLimiter, require('./routes/sessions'));
app.use('/api/requests', require('./routes/requests'));

// Hook capture — rate limited, must come after /api routes
app.use('/hook', hookLimiter, require('./routes/hook'));

const server = http.createServer(app);

// Attach WebSocket
wsManager.attach(server);

// Auto-cleanup expired sessions and orphaned requests every hour
setInterval(() => {
  try {
    const deletedSessions = deleteExpiredSessions();
    const deletedRequests = deleteOrphanedRequests();
    if (deletedSessions > 0 || deletedRequests > 0) {
      console.log(`Cleanup: removed ${deletedSessions} expired sessions, ${deletedRequests} orphaned requests`);
    }
  } catch (err) {
    console.error('Cleanup error:', err.message);
  }
}, 60 * 60 * 1000);

server.listen(config.PORT, () => {
  console.log(`HookView running at ${config.BASE_URL}`);
});
