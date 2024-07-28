// src/components/Navbar.js
import React from 'react';
import { Link } from 'react-router-dom';
import './Navbar.css';

const Navbar = () => {
  return (
    <nav className="navbar">
      <div className="nav-logo">EduAI-Partner</div>
      <div className="nav-links">
        <Link to="/" className="nav-link">Home</Link>
        <Link to="/features" className="nav-link">Features</Link>
      </div>
      <div className="nav-buttons">
        <Link to="/login" className="nav-button">Login</Link>
        <Link to="/signup" className="nav-button">Sign Up</Link>
      </div>
    </nav>
  );
};

export default Navbar;
