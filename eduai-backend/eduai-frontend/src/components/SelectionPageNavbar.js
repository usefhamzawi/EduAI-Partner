import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import './SelectionPageNavbar.css';
import client from './axiosConfig';

const SelectionPageNavbar = () => {
  const navigate = useNavigate();
  const [currentUser, setCurrentUser] = useState();

  const handleLogout = async () => {
    try {
      console.log('Attempting to logout...');
      const response = await client.post('/logout/');
      console.log('Logout response:', response.data);
      localStorage.removeItem('user');
      setCurrentUser(false);
      navigate('/');
    } catch (error) {
      console.error('Logout failed:', error.response ? error.response.data : error.message);
    }
  };

  return (
    <nav className="navbar">
      <div className="nav-title">EduAI-Partner</div>
      <button onClick={handleLogout} className="nav-button">Logout</button>
    </nav>
  );
};

export default SelectionPageNavbar;