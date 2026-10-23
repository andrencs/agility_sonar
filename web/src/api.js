// Thin client for the Snipsnap API. The API key is read from local storage
// where the owner pasted it after signing in.
const BASE = import.meta.env.VITE_API_BASE || 'http://localhost:4000';
function authHeader() {
  const key = localStorage.getItem('snipsnap_key') || '';
  return { Authorization: `Bearer ${key}` };
}
export async function createLink(target) {
  const res = await fetch(`${BASE}/links`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json', ...authHeader() },
    body: JSON.stringify({ target }),
  });
  if (!res.ok) throw new Error(`create failed: ${res.status}`);
  return res.json();
}
export async function getStats(slug) {
  const res = await fetch(`${BASE}/links/${slug}/stats`);
  if (!res.ok) throw new Error(`stats failed: ${res.status}`);
  return res.json();
}
