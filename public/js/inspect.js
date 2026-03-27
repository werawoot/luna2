const sessionId = new URLSearchParams(location.search).get('id');
if (!sessionId) location.href = '/';

const endpointUrl = document.getElementById('endpointUrl');
const copyBtn = document.getElementById('copyBtn');
const wsStatus = document.getElementById('wsStatus');
const requestList = document.getElementById('requestList');
const detail = document.getElementById('detail');

const hookUrl = `${location.origin}/hook/${sessionId}`;
endpointUrl.value = hookUrl;
document.title = `HookView — ${sessionId}`;

copyBtn.addEventListener('click', () => {
  navigator.clipboard.writeText(hookUrl);
  copyBtn.textContent = 'Copied!';
  setTimeout(() => (copyBtn.textContent = 'Copy URL'), 1500);
});

// ---- Request list ----
let requests = [];
let activeId = null;

function methodClass(method) {
  const known = ['GET', 'POST', 'PUT', 'DELETE', 'PATCH'];
  return known.includes(method) ? `method-${method}` : 'method-OTHER';
}

function formatTime(ts) {
  return new Date(ts).toLocaleTimeString();
}

function renderList() {
  if (requests.length === 0) {
    requestList.innerHTML = '<div class="empty">Waiting for requests…</div>';
    return;
  }
  requestList.innerHTML = requests.map(r => `
    <div class="req-item ${r.id === activeId ? 'active' : ''}" data-id="${r.id}">
      <span class="method ${methodClass(r.method)}">${r.method}</span>
      <div class="path">${r.path}</div>
      <div class="time">${formatTime(r.received_at)}</div>
    </div>
  `).join('');

  requestList.querySelectorAll('.req-item').forEach(el => {
    el.addEventListener('click', () => {
      activeId = Number(el.dataset.id);
      const req = requests.find(r => r.id === activeId);
      renderDetail(req);
      renderList();
    });
  });
}

function prettyJson(val) {
  try {
    const obj = typeof val === 'string' ? JSON.parse(val) : val;
    return JSON.stringify(obj, null, 2);
  } catch {
    return String(val ?? '');
  }
}

function renderDetail(req) {
  if (!req) {
    detail.innerHTML = '<div class="placeholder">Select a request to inspect</div>';
    return;
  }
  detail.innerHTML = `
    <div class="section">
      <h3>Overview</h3>
      <pre>${req.method} ${req.path}${objectToQuery(req.query)}
IP: ${req.ip}
Time: ${new Date(req.received_at).toISOString()}</pre>
    </div>
    <div class="section">
      <h3>Headers</h3>
      <pre>${prettyJson(req.headers)}</pre>
    </div>
    <div class="section">
      <h3>Query Params</h3>
      <pre>${prettyJson(req.query)}</pre>
    </div>
    <div class="section">
      <h3>Body</h3>
      <pre>${prettyJson(req.body) || '(empty)'}</pre>
    </div>
  `;
}

function objectToQuery(obj) {
  if (!obj || Object.keys(obj).length === 0) return '';
  return '?' + new URLSearchParams(obj).toString();
}

// ---- Load existing requests ----
async function loadRequests() {
  try {
    const res = await fetch(`/hook/${sessionId}/requests`);
    requests = await res.json();
    renderList();
    if (requests.length > 0) {
      activeId = requests[0].id;
      renderDetail(requests[0]);
      renderList();
    }
  } catch (err) {
    console.error('Failed to load requests', err);
  }
}

// ---- WebSocket ----
function connectWs() {
  const proto = location.protocol === 'https:' ? 'wss' : 'ws';
  const ws = new WebSocket(`${proto}://${location.host}/ws`);

  ws.onopen = () => {
    ws.send(JSON.stringify({ type: 'subscribe', sessionId }));
    wsStatus.textContent = 'Live';
    wsStatus.className = 'connected';
  };

  ws.onmessage = (e) => {
    const msg = JSON.parse(e.data);
    if (msg.type === 'new_request') {
      requests.unshift(msg.request);
      // Auto-select first if nothing selected
      if (activeId === null) {
        activeId = msg.request.id;
        renderDetail(msg.request);
      }
      renderList();
    }
  };

  ws.onclose = () => {
    wsStatus.textContent = 'Disconnected';
    wsStatus.className = '';
    setTimeout(connectWs, 3000); // auto-reconnect
  };
}

loadRequests();
connectWs();
