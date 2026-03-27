const btn = document.getElementById('createBtn');
const status = document.getElementById('status');

btn.addEventListener('click', async () => {
  btn.disabled = true;
  status.textContent = 'Creating endpoint…';

  try {
    const res = await fetch('/api/sessions', { method: 'POST' });
    const data = await res.json();
    window.location.href = `/inspect.html?id=${data.id}`;
  } catch (err) {
    status.textContent = 'Failed to create endpoint. Is the server running?';
    btn.disabled = false;
  }
});
