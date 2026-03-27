const express = require('express');
const http = require('http');
const path = require('path');
const config = require('./config');
const { migrate } = require('./db/migrate');
const wsManager = require('./ws/manager');

// Run migrations
migrate();

const app = express();

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
app.use('/api/sessions', require('./routes/sessions'));

// Hook capture - must come after /api routes
app.use('/hook', require('./routes/hook'));

const server = http.createServer(app);

// Attach WebSocket
wsManager.attach(server);

server.listen(config.PORT, () => {
  console.log(`HookView running at ${config.BASE_URL}`);
});
