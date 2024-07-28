import React from 'react';
import { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar';
import Home from './components/Home';
import LoginForm from './components/LoginForm';
import Signup from './components/Signup';
import ResetPassword from './components/ResetPassword';
import Features from './components/Features';
import SelectionPage from './components/SelectionPage';
import ChatBox from './components/ChatBox';
import PracticeTest from './components/PracticeTest';
import SelectionPageNavbar from './components/SelectionPageNavbar';
import './App.css';
import axios from 'axios';
import { getCookie } from './components/utils';

// Get the CSRF token
const csrfToken = getCookie('csrftoken');

// Configure Axios to use the CSRF token
axios.defaults.headers.common['X-CSRFToken'] = csrfToken;
axios.defaults.xsrfCookieName = 'csrftoken';
axios.defaults.xsrfHeaderName = 'X-CSRFToken';
axios.defaults.withCredentials = true;

const client = axios.create({
  baseURL: "http://127.0.0.1:8000/api"
});


function App() {
  const [currentUser, setCurrentUser] = useState();

  useEffect(() => {
    client.get("/user")
      .then(function(res) {
        setCurrentUser(true);
      })
      .catch(function(error) {
        setCurrentUser(false);
      });
  }, []);

  return (
    <Router>
      <div className="App">
        <Routes>
          <Route path="/" element={<Navbar />} />
          <Route path="/features" element={<Navbar />} />
          <Route path="/login" element={<Navbar />} />
          <Route path="/signup" element={<Navbar />} />
          <Route path="/reset-password" element={<Navbar />} />
        </Routes>
        <main>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/login" element={<LoginForm />} />
            <Route path="/signup" element={<Signup />} />
            <Route path="/reset-password" element={<ResetPassword />} />
            <Route path="/features" element={<Features />} />
            <Route path="/selection" element={<><SelectionPageNavbar /><SelectionPage /></>} />
            <Route path="/chatbox" element={<><SelectionPageNavbar /><ChatBox /></>} />
            <Route path="/practicetest" element={<><SelectionPageNavbar /><PracticeTest /></>} />
          </Routes>
        </main>
      </div>
    </Router>
  );
}

export default App;
