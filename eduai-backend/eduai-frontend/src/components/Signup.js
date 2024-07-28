import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import './Signup.css';
import client from './axiosConfig';

const Signup = () => {
  const [email, setEmail] = useState('');
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();

  useEffect(() => {
    client.get('/csrf-token/').then(response => {
      console.log('CSRF token fetched');
    }).catch(error => {
      console.error('Error fetching CSRF token:', error);
    });
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await client.post("/register/", {
        email: email,
        username: username,
        password: password
      });
      console.log('Registration successful:', response.data);
      navigate('/login');
    } catch (error) {
      console.error("Registration failed:", error.response ? error.response.data : error.message);
    }
  };

  return (
    <div className="signup-container">
      <div className="signup-form-container">
        <div className="header-box">
          <h1 className="brand-name">EduAI-Partner</h1>
          <h2 className="signup-title">Sign up as a Student</h2>
        </div>
        <div className="signup-form">
          <form onSubmit={handleSubmit}>
            <input
              type="email"
              name="email"
              placeholder="Email"
              className="signup-input"
              value={email}
              onChange={e => setEmail(e.target.value)}
              required
            />
            <input
              type="text"
              name="username"
              placeholder="Username"
              className="signup-input"
              value={username}
              onChange={e => setUsername(e.target.value)}
              required
            />
            <input
              type="password"
              name="password"
              placeholder="Password"
              className="signup-input"
              value={password}
              onChange={e => setPassword(e.target.value)}
              required
            />
            <button type="submit" className="signup-button">Sign Up</button>
          </form>
          <div className="link-container">
            <Link to="/login" className="link">Already have an account? Log in</Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Signup;