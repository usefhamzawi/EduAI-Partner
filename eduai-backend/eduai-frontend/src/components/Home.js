// src/components/Home.js
import React from 'react';
import { useNavigate } from 'react-router-dom';
import './Home.css';

const Home = () => {
  const navigate = useNavigate(); // Hook to navigate programmatically

  const handleSignupClick = () => {
    navigate('/signup'); // Redirect to signup page
  };

  return (
    <div className="home">
      <div className="hero">
        <h1 className="hero-title">WELCOME TO EduAI-Partner</h1>
        <p className="hero-text">Learn more efficiently with AI.</p>
        <p className="hero-text">Your own personal tutor in just a few clicks.</p>
        <div className="signup-section">
          <button className="email-signup" onClick={handleSignupClick}>Sign up with email</button>
          <p className="signup-info">Sign up to get started. Completely FREE.</p>
        </div>
      </div>
      <div className="features-section">
        <h2 className="main-header">Artificial Intelligence Made Easy</h2>
        <p className="main-description">With easy-to-use and intuitive UI, AI tutor welcomes users of all proficiency levels.</p>
        <div className="feature-container">
          <div className="feature-item" data-number="1">
            <h2>Simply Ask</h2>
            <p>Select one of many personalities and models. Then, ask questions, with possibilities to search real-time data.</p>
          </div>
          <div className="feature-item" data-number="2">
            <h2>Get the Response</h2>
            <p>AI Tutor responds faster than anything else on the market and provides comprehensive answers.</p>
          </div>
          <div className="feature-item" data-number="3">
            <h2>Follow Up</h2>
            <p>Continue your conversation as the AI learns from all the follow-up questions and responses.</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Home;
