import React from 'react';
import Dashboard from './Dashboard';
// App shell. The owner pastes their API key once; it is kept in local storage
// and sent as a bearer token by the API client.
export default function App() {
  function saveKey(e) {
    localStorage.setItem('snipsnap_key', e.target.value.trim());
  }
  return (
    <div className="app">
      <header>
        <label>
          API key
          <input type="password" onBlur={saveKey} placeholder="key_..." />
        </label>
      </header>
      <Dashboard />
    </div>
  );
}
