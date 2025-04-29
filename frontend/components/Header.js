// src/components/Header.js
import React from 'react';
import { Link } from 'react-router-dom';

const Header = () => {
  return (
    <header style={{ padding: '1rem', backgroundColor: '#004080', color: 'white' }}>
      <h1>Customer Payments Portal</h1>
      <nav>
        <Link to="/" style={{ color: 'white', marginRight: '10px' }}>Home</Link>
        <Link to="/register" style={{ color: 'white', marginRight: '10px' }}>Register</Link>
        <Link to="/login" style={{ color: 'white', marginRight: '10px' }}>Login</Link>
        <Link to="/payments" style={{ color: 'white' }}>Payments</Link>
        
      </nav>
    </header>
  );
};

export default Header;