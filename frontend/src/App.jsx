import React, { useEffect, useState } from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar';
import Landing from './pages/Landing';
import Register from './pages/Register';
import Dashboard from './pages/Dashboard';
import Admin from './pages/Admin';

const ADMIN_SESSION_STORAGE_KEY = 'raksharide_admin_unlocked';
const ADMIN_ACCESS_KEY = (import.meta.env.VITE_ADMIN_ACCESS_KEY || '').trim();

function AdminProtectedRoute() {
  const [enteredAccessKey, setEnteredAccessKey] = useState('');
  const [accessError, setAccessError] = useState('');
  const [isUnlocked, setIsUnlocked] = useState(false);

  useEffect(() => {
    if (!ADMIN_ACCESS_KEY) {
      setIsUnlocked(true);
      return;
    }

    const storedAccessKey = window.sessionStorage.getItem(ADMIN_SESSION_STORAGE_KEY);
    if (storedAccessKey === ADMIN_ACCESS_KEY) {
      setIsUnlocked(true);
    }
  }, []);

  const handleUnlockAdmin = () => {
    if (!ADMIN_ACCESS_KEY) {
      setIsUnlocked(true);
      return;
    }

    if (enteredAccessKey.trim() !== ADMIN_ACCESS_KEY) {
      setAccessError('Invalid admin access key.');
      return;
    }

    window.sessionStorage.setItem(ADMIN_SESSION_STORAGE_KEY, ADMIN_ACCESS_KEY);
    setAccessError('');
    setIsUnlocked(true);
  };

  if (isUnlocked) {
    return <Admin />;
  }

  return (
    <div className="page" style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', padding: '5rem 1rem' }}>
      <div className="card" style={{ maxWidth: 460, width: '100%' }}>
        <div style={{ fontWeight: 800, fontSize: '1.2rem', marginBottom: '0.5rem' }}>Admin Access Required</div>
        <div style={{ color: 'var(--text-secondary)', fontSize: '0.88rem', marginBottom: '1rem' }}>
          Enter the admin access key to continue.
        </div>

        {accessError && <div className="alert alert-error" style={{ marginBottom: '0.75rem' }}>{accessError}</div>}

        <div className="form-group">
          <label className="form-label">Access Key</label>
          <input
            className="form-input"
            type="password"
            value={enteredAccessKey}
            onChange={(event) => setEnteredAccessKey(event.target.value)}
            onKeyDown={(event) => event.key === 'Enter' && handleUnlockAdmin()}
            placeholder="Enter admin key"
          />
        </div>

        <button className="btn btn-primary" style={{ marginTop: '0.75rem', width: '100%' }} onClick={handleUnlockAdmin}>
          Unlock Admin
        </button>
      </div>
    </div>
  );
}

export default function App() {
  return (
    <BrowserRouter>
      <Navbar />
      <Routes>
        <Route path="/"          element={<Landing />} />
        <Route path="/register"  element={<Register />} />
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/admin"     element={<AdminProtectedRoute />} />
      </Routes>
    </BrowserRouter>
  );
}

