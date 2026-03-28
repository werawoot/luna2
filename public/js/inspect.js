const sessionId = new URLSearchParams(location.search).get('id');
if (!sessionId) location.href = '/';

// DOM refs — header
const endpointUrl  = document.getElementById('endpointUrl');
const copyBtn      = document.getElementById('copyBtn');
const exportBtn    = document.getElementById('exportBtn');
const wsStatus     = document.getElementById('wsStatus');

// DOM refs — sidebar
const sidebarTitle = document.getElementById('sidebarTitle');
const searchInput  = document.getElementById('searchInput');
const searchCount  = document.getElementById('searchCount');
const filterBar    = document.getElementById('filterBar');
const requestList  = document.getElementById('requestList');

// DOM refs — detail
const detail = document.getElementById('detail');

// DOM refs — replay modal
const replayModal     = document.getElementById('replayModal');
const replayTargetUrl = document.getElementById('replayTargetUrl');
const replaySendBtn   = document.getElementById('replaySendBtn');
const replayCancelBtn = document.getElementById('replayCancelBtn');
const replayResult    = document.getElementById('replayResult');
const replayResultMeta= document.getElementById('replayResultMeta');
const replayResultBody= document.getElementById('replayResultBody');

// ---- State ----
const hookUrl = `${location.origin}/hook/${sessionId}`;
endpointUrl.value = hookUrl;
document.title = `HookView — ${sessionId}`;

let requests  = [];    // all captured requests (newest first)
let activeId  = null;
let activeFilter = 'ALL';
let searchQuery  = '';
let replayRequestId = null;

// ---- Helpers ----
function methodClass(method) {
  const known = ['GET', 'POST', 'PUT', 'DELETE', 'PATCH'];
  return known.includes(method) ? `method-${method}` : 'method-OTHER';
}

function relativeTime(ts) {
  const diffMs = Date.now() - ts;
  const s = Math.floor(diffMs / 1000);
  if (s < 5)  return 'just now';
  if (s < 60) return `${s}s ago`;
  const m = Math.floor(s / 60);
  if (m < 60) return `${m}m ago`;
  const h = Math.floor(m / 60);
  if (h < 24) return `${h}h ago`;
  return new Date(ts).toLocaleDateString();
}

function prettyJson(val) {
  try {
    const obj = typeof val === 'string' ? JSON.parse(val) : val;
    return JSON.stringify(obj, null, 2);
  } catch {
    return String(val ?? '');
  }
}

function objectToQuery(obj) {
  if (!obj || Object.keys(obj).length === 0) return '';
  return '?' + new URLSearchParams(obj).toString();
}

function escapeHtml(str) {
  return String(str)
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;');
}

// ---- Filtering ----
function getFilteredRequests() {
  let list = requests;

  // Method filter
  if (activeFilter !== 'ALL') {
    list = list.filter(r => r.method === activeFilter);
  }

  // Search filter
  if (searchQuery) {
    const q = searchQuery.toLowerCase();
    list = list.filter(r => {
      const bodyStr = typeof r.body === 'string' ? r.body : JSON.stringify(r.body || '');
      const queryStr = typeof r.query === 'string' ? r.query : JSON.stringify(r.query || '');
      return (
        (r.path || '').toLowerCase().includes(q) ||
        (r.method || '').toLowerCase().includes(q) ||
        bodyStr.toLowerCase().includes(q) ||
        queryStr.toLowerCase().includes(q)
      );
    });
  }

  return list;
}

// ---- Count badges ----
function updateBadges() {
  const methods = ['ALL', 'GET', 'POST', 'PUT', 'PATCH', 'DELETE'];
  methods.forEach(m => {
    const badge = document.querySelector(`[data-badge="${m}"]`);
    if (!badge) return;
    if (m === 'ALL') {
      badge.textContent = requests.length;
    } else {
      badge.textContent = requests.filter(r => r.method === m).length;
    }
  });
  sidebarTitle.textContent = `Requests (${requests.length})`;
}

// ---- Render request list ----
function renderList() {
  const filtered = getFilteredRequests();

  // Search match count
  if (searchQuery) {
    searchCount.textContent = filtered.length > 0 ? filtered.length : '0';
  } else {
    searchCount.textContent = '';
  }

  if (filtered.length === 0) {
    if (requests.length === 0) {
      requestList.innerHTML = `
        <div class="empty">
          <span class="empty-icon">&#128279;</span>
          Waiting for requests…<br>
          <span style="font-size:0.75rem;color:#374151">Send a request to your endpoint</span>
        </div>`;
    } else {
      requestList.innerHTML = `<div class="empty"><span class="empty-icon">&#128270;</span>No matching requests</div>`;
    }
    return;
  }

  requestList.innerHTML = filtered.map(r => `
    <div class="req-item ${r.id === activeId ? 'active' : ''}" data-id="${r.id}">
      <span class="method ${methodClass(r.method)}">${escapeHtml(r.method)}</span>
      <div class="path">${escapeHtml(r.path)}</div>
      <div class="time" data-ts="${r.received_at}">${relativeTime(r.received_at)}</div>
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

// ---- Render detail ----
function renderDetail(req) {
  if (!req) {
    detail.innerHTML = `
      <div class="placeholder">
        <span class="ph-icon">&#128270;</span>
        Select a request to inspect
      </div>`;
    return;
  }

  const headersStr = prettyJson(req.headers);
  const queryStr   = prettyJson(req.query);
  const bodyStr    = prettyJson(req.body) || '(empty)';
  const overviewStr= `${req.method} ${req.path}${objectToQuery(req.query)}\nIP: ${req.ip}\nTime: ${new Date(req.received_at).toISOString()}`;

  detail.innerHTML = `
    <div class="detail-actions">
      <button class="action-btn" id="btnReplay">&#9654; Replay</button>
      <button class="action-btn" id="btnCopyCurl">Copy as cURL</button>
    </div>
    <div class="section">
      <div class="section-header"><h3>Overview</h3></div>
      <pre>${escapeHtml(overviewStr)}</pre>
    </div>
    <div class="section">
      <div class="section-header"><h3>Headers</h3></div>
      <pre>${escapeHtml(headersStr)}</pre>
    </div>
    <div class="section">
      <div class="section-header"><h3>Query Params</h3></div>
      <pre>${escapeHtml(queryStr)}</pre>
    </div>
    <div class="section">
      <div class="section-header"><h3>Body</h3></div>
      <pre>${escapeHtml(bodyStr)}</pre>
    </div>
  `;

  document.getElementById('btnReplay').addEventListener('click', () => openReplay(req.id));
  document.getElementById('btnCopyCurl').addEventListener('click', () => copyCurl(req));
}

// ---- Copy URL ----
copyBtn.addEventListener('click', () => {
  navigator.clipboard.writeText(hookUrl);
  copyBtn.textContent = 'Copied!';
  setTimeout(() => (copyBtn.textContent = 'Copy URL'), 1500);
});

// ---- Export JSON ----
exportBtn.addEventListener('click', () => {
  if (requests.length === 0) {
    alert('No requests to export.');
    return;
  }
  const date = new Date().toISOString().slice(0, 10);
  const filename = `hookview-${sessionId}-${date}.json`;
  const blob = new Blob([JSON.stringify(requests, null, 2)], { type: 'application/json' });
  const url = URL.createObjectURL(blob);
  const a = document.createElement('a');
  a.href = url;
  a.download = filename;
  a.click();
  URL.revokeObjectURL(url);
});

// ---- Copy as cURL ----
function copyCurl(req) {
  const headers = typeof req.headers === 'object' ? req.headers : {};
  const SKIP = new Set(['host', 'content-length', 'transfer-encoding']);

  let cmd = `curl -X ${req.method} '${location.origin}/hook/${sessionId}${req.path}${objectToQuery(req.query)}'`;

  for (const [k, v] of Object.entries(headers)) {
    if (SKIP.has(k.toLowerCase())) continue;
    cmd += ` \\\n  -H '${k}: ${String(v).replace(/'/g, "\\'")}'`;
  }

  if (req.body && !['GET', 'HEAD'].includes(req.method)) {
    const bodyStr = typeof req.body === 'string' ? req.body : JSON.stringify(req.body);
    cmd += ` \\\n  --data '${bodyStr.replace(/'/g, "\\'")}'`;
  }

  navigator.clipboard.writeText(cmd).then(() => {
    const btn = document.getElementById('btnCopyCurl');
    if (btn) {
      btn.textContent = 'Copied!';
      btn.classList.add('success');
      setTimeout(() => {
        btn.textContent = 'Copy as cURL';
        btn.classList.remove('success');
      }, 1800);
    }
  });
}

// ---- Replay modal ----
function openReplay(reqId) {
  replayRequestId = reqId;
  replayResult.classList.remove('visible');
  replayResultMeta.innerHTML = '';
  replayResultBody.textContent = '';
  replayModal.classList.add('open');
  replayTargetUrl.focus();
}

replayCancelBtn.addEventListener('click', () => {
  replayModal.classList.remove('open');
});

replayModal.addEventListener('click', (e) => {
  if (e.target === replayModal) replayModal.classList.remove('open');
});

replaySendBtn.addEventListener('click', async () => {
  const targetUrl = replayTargetUrl.value.trim();
  if (!targetUrl) { replayTargetUrl.focus(); return; }

  replaySendBtn.disabled = true;
  replaySendBtn.textContent = 'Sending…';
  replayResult.classList.remove('visible');

  try {
    const res = await fetch(`/api/requests/${replayRequestId}/replay`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ targetUrl }),
    });
    const data = await res.json();

    if (!res.ok && data.error) {
      replayResultMeta.innerHTML = `<span class="status-err">Error: ${escapeHtml(data.error)}</span>`;
      replayResultBody.textContent = '';
    } else {
      const statusClass = data.status >= 200 && data.status < 300 ? 'status-ok' : 'status-err';
      replayResultMeta.innerHTML =
        `<span class="${statusClass}">${data.status} ${escapeHtml(data.statusText)}</span>` +
        ` &nbsp;&#9201; ${data.durationMs}ms`;
      replayResultBody.textContent = data.responseBody || '(empty)';
    }
    replayResult.classList.add('visible');
  } catch (err) {
    replayResultMeta.innerHTML = `<span class="status-err">Network error: ${escapeHtml(err.message)}</span>`;
    replayResult.classList.add('visible');
  } finally {
    replaySendBtn.disabled = false;
    replaySendBtn.textContent = 'Send';
  }
});

// ---- Filter buttons ----
filterBar.querySelectorAll('.filter-btn').forEach(btn => {
  btn.addEventListener('click', () => {
    activeFilter = btn.dataset.method;
    filterBar.querySelectorAll('.filter-btn').forEach(b => {
      b.className = 'filter-btn';
    });
    btn.classList.add(`active-${activeFilter}`);
    renderList();
  });
});

// ---- Search (debounced 200ms) ----
let searchDebounce = null;
searchInput.addEventListener('input', () => {
  clearTimeout(searchDebounce);
  searchDebounce = setTimeout(() => {
    searchQuery = searchInput.value.trim();
    renderList();
  }, 200);
});

// Keyboard shortcut: / to focus search
document.addEventListener('keydown', (e) => {
  if (e.key === '/' && document.activeElement !== searchInput) {
    e.preventDefault();
    searchInput.focus();
    searchInput.select();
  }
  if (e.key === 'Escape') {
    if (replayModal.classList.contains('open')) {
      replayModal.classList.remove('open');
    } else if (document.activeElement === searchInput) {
      searchInput.blur();
    }
  }
});

// ---- Relative time updater (every 10s) ----
setInterval(() => {
  requestList.querySelectorAll('.time[data-ts]').forEach(el => {
    el.textContent = relativeTime(Number(el.dataset.ts));
  });
}, 10000);

// ---- Load existing requests ----
async function loadRequests() {
  try {
    const res = await fetch(`/hook/${sessionId}/requests`);
    requests = await res.json();
    updateBadges();
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
      updateBadges();
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
    setTimeout(connectWs, 3000);
  };
}

loadRequests();
connectWs();
