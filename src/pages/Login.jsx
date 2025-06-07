import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { saveToStorage } from '../utils/storage';
import '../style/Login.css';

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();

  const handleLogin = () => {
    const users = JSON.parse(localStorage.getItem('users')) || [];
    const user = users.find(u => u.email === email && u.password === btoa(password));
    if (user) {
      saveToStorage('session', { email, role: user.role, timestamp: Date.now() });
      navigate(user.role === 'admin' ? '/admin' : '/search');
    } else {
      alert('Invalid credentials');
    }
  };

  const goToSignUp = () => {
    navigate('/signup');
  };

  return (
    <div className="login-container">
      <div className="login-box">
        <h2>Login</h2>
        <input
          type="email"
          placeholder="Email"
          value={email}
          onChange={e => setEmail(e.target.value)}
          className="login-input"
        />
        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={e => setPassword(e.target.value)}
          className="login-input"
        />
        <button onClick={handleLogin} className="login-button">Login</button>
        <p className="signup-text">
          Don’t have an account? <span onClick={goToSignUp} className="signup-link">Sign Up</span>
        </p>
      </div>
    </div>
  );
};

export default Login;
