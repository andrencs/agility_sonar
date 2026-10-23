import React, { useState } from 'react';
import { createLink, getStats } from './api';
// Owner dashboard: shorten a URL and check how many clicks a slug has had.
export default function Dashboard() {
  const [target, setTarget] = useState('');
  const [link, setLink] = useState(null);
  const [stats, setStats] = useState(null);
  const [error, setError] = useState(null);
  async function onCreate(e) {
    e.preventDefault();
    setError(null);
    try {
      setLink(await createLink(target));
    } catch (err) {
      setError(err.message);
    }
  }
  async function onCheck() {
    if (!link) return;
    setStats(await getStats(link.slug));
  }
  return (
    <div className="dashboard">
      <h1>Snipsnap</h1>
      <form onSubmit={onCreate}>
        <input
          value={target}
          onChange={(e) => setTarget(e.target.value)}
          placeholder="https://example.com/long/url"
        />
        <button type="submit">Shorten</button>
      </form>
      {error && <p className="error">{error}</p>}
      {link && (
        <div className="result">
          <a href={link.shortUrl}>{link.shortUrl}</a>
          <button onClick={onCheck}>Check stats</button>
          {stats && <span>{stats.clicks} clicks</span>}
        </div>
      )}
    </div>
  );
}