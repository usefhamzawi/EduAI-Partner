import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './LoginForm.css';
import client from './axiosConfig';

const LoginForm = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [currentUser, setCurrentUser] = useState();
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');

    try {
      const response = await client.post("/login/", {
        email: email,
        password: password
      });
      
      console.log('Login response:', response.data);
      setCurrentUser(true);

      navigate('/chatbox');
    } catch (error) {
      console.error("Login error:", error);
      setError(`Login failed: ${error.message}`);
    }
  };


  return (
    <div className="login-container">
      <div className="login-box">
        <h1 className="login-title">EduAI-Partner</h1>
        <h2 className="login-subtitle">Login to Your Account</h2>
        <form className="login-form" onSubmit={handleSubmit}>
          <label htmlFor="email">Email</label>
          <input type="email" id="email" value={email} onChange={(e) => setEmail(e.target.value)} placeholder="Enter your email" required />
          
          <label htmlFor="password">Password</label>
          <input type="password" id="password" value={password} onChange={(e) => setPassword(e.target.value)} placeholder="Enter your password" required />
          
          <button type="submit" className="login-button">Log In</button>
        </form>
      </div>
    </div>
  );
};

export default LoginForm;