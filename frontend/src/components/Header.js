// src/components/Header.js
import React from 'react';
import { Link } from 'react-router-dom';

const linkStyle = { color: 'white', marginRight: '10px' }; // ✅ Define it here

const Header = () => {
  return (
    <header style={{ padding: '1rem', backgroundColor: '#004080', color: 'white' }}>
      <h1>Customer Payments Portal</h1>
      <nav>
        {/* Customer Links */}
        <Link to="/" style={linkStyle}>Home</Link>
        <Link to="/register" style={linkStyle}>Register</Link>
        <Link to="/login" style={linkStyle}>Login</Link>
        <Link to="/payments" style={linkStyle}>Payments</Link>

        <span style={{ margin: '0 10px', color: '#ccc' }}>|</span>

        {/* Employee Links */}
        <Link to="/employee-login" style={linkStyle}>Employee Login</Link>
        <Link to="/employee-dashboard" style={linkStyle}>Dashboard</Link>
        <Link to="/employee-payments" style={linkStyle}>Payee Payments</Link>
      </nav>
    </header>
  );
};

export default Header;
