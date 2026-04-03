import React from 'react';
import { NavLink, useNavigate } from 'react-router-dom';

export default function Navbar() {
  const navigate = useNavigate();
  return (
    <nav className="navbar">
      <div className="navbar-brand" onClick={() => navigate('/')} style={{ cursor: 'pointer' }}>
        <span className="logo-icon">🛡️</span>
        Gig<span>Shield</span>
      </div>

      <div className="navbar-links">
        <NavLink to="/"          className={({ isActive }) => `nav-link${isActive ? ' active' : ''}`}>Home</NavLink>
        <NavLink to="/dashboard" className={({ isActive }) => `nav-link${isActive ? ' active' : ''}`}>Dashboard</NavLink>
        <NavLink to="/admin"     className={({ isActive }) => `nav-link${isActive ? ' active' : ''}`}>Admin</NavLink>
        <NavLink to="/register">
          <button className="nav-btn" style={{ marginLeft: '0.5rem' }}>Get Protected</button>
        </NavLink>
      </div>
    </nav>
  );
}
