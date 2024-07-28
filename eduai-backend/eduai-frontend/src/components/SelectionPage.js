// src/components/SelectionPage.js
import React from 'react';
import { Link } from 'react-router-dom';
import './SelectionPage.css';
import chatIcon from '../assets/chat-icon.png';
import testIcon from '../assets/test-icon.png'; 

const SelectionPage = () => {
  return (
    <div className="selection-container">
      <h1 className="selection-title">Dashboard</h1>
      <div className="selection-options">
        <Link to="/chatbox" className="selection-card">
          <img src={chatIcon} alt="Chat Box" />
          <h3>Chat Bot</h3>
          <p>Interact with our AI chat interface</p>
        </Link>
        <Link to="/practicetest" className="selection-card">
          <img src={testIcon} alt="Practice Test" />
          <h3>Practice Test</h3>
          <p>Test your knowledge with practice tests</p>
        </Link>
      </div>
    </div>
  );
};

export default SelectionPage;
