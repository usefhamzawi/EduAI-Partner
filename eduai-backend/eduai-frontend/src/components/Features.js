// src/components/Features.js
import React from 'react';
import './Features.css';

const Features = () => {
  return (
    <div className="features-container">
      <div className="features-content">
        <h1 className="features-title">Our Features</h1>
        <p className="features-description">
          Explore the exceptional features offered by EduAI-Partner. Our platform is designed to make learning engaging and effective.
        </p>
        <div className="features-grid">
          <div className="feature-card">
            <div className="feature-icon">
              <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4M21 3v4a2 2 0 0 1-2 2H3a2 2 0 0 1-2-2V3M3 10h18M7 16h10" /></svg>
            </div>
            <h2 className="feature-title">AI Chat Bot</h2>
            <p className="feature-description">
              Interact with our AI chat bot for instant answers and support on a variety of topics. It's like having a knowledgeable assistant at your fingertips.
            </p>
          </div>
          <div className="feature-card">
            <div className="feature-icon">
              <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M3 19.5a2.5 2.5 0 0 0 2.5 2.5H16a2.5 2.5 0 0 0 2.5-2.5V7a2.5 2.5 0 0 0-2.5-2.5H5.5A2.5 2.5 0 0 0 3 7v12.5z" /></svg>
            </div>
            <h2 className="feature-title">Fast response</h2>
            <p className="feature-description">
              With our AI model, you can get answers to your questions in seconds.
            </p>
          </div>
          <div className="feature-card">
            <div className="feature-icon">
              <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M20 21v-6.5a2.5 2.5 0 0 0-2.5-2.5H6.5A2.5 2.5 0 0 0 4 14.5V21" /><path d="M3 7.5V14a2.5 2.5 0 0 0 2.5 2.5H19a2.5 2.5 0 0 0 2.5-2.5V7.5" /><path d="M3 3v4.5a2.5 2.5 0 0 0 2.5 2.5H15a2.5 2.5 0 0 0 2.5-2.5V3" /></svg>
            </div>
            <h2 className="feature-title">AI Tutor</h2>
            <p className="feature-description">
              Receive personalized tutoring across Math, English, Social Studies, and Science. Our AI tutor adapts to your learning needs.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Features;
