import React from 'react';
import { Link } from 'react-router-dom';
import './PostLoginPage.css'; // Import the CSS file

const PostLoginPage = () => {
  return (
    <div className="post-login-container">
      <div className="post-login-content">
        <h1 className="post-login-title">Welcome Back!</h1>
        <div className="post-login-options">
          <Link to="/chat-box" className="post-login-button">Chat Box</Link>
          <Link to="/practice-test" className="post-login-button">Practice Test</Link>
        </div>
      </div>
    </div>
  );
};

export default PostLoginPage;
