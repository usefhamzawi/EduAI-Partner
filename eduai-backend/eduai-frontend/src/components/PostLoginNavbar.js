import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import './PostLoginNavbar.css';

const PostLoginNavbar = () => {
  const navigate = useNavigate();

  const handleLogout = () => {
    navigate('/');
  };

  return (
    <nav className="post-login-navbar">
      <Link to="/chatbox" className="nav-item">Chat Box</Link>
      <button className="logout-button" onClick={handleLogout}>
        Log Out
      </button>
      <Link to="/practicetest" className="nav-item">Practice Test</Link>
    </nav>
  );
};

export default PostLoginNavbar;
