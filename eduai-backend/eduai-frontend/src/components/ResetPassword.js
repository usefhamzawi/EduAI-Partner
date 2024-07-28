import React, { useState } from 'react';
import './Auth.css'; // Import the CSS file

const ResetPassword = () => {
  const [email, setEmail] = useState('');

  const handleReset = (e) => {
    e.preventDefault();
    // Handle password reset logic here
  };

  return (
    <div className="auth-page">
      <div className="auth-container">
        <h1 className="auth-title">Reset Password</h1>
        <form onSubmit={handleReset}>
          <input
            type="email"
            placeholder="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
          <button type="submit" className="auth-button">Send Reset Link</button>
        </form>
        <p className="auth-link">
          Remembered your password? <a href="/login">Log in here</a>
        </p>
      </div>
    </div>
  );
};

export default ResetPassword;
