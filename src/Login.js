import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';  // Import useNavigate hook
import './Login.css';

const Login = () => {
  const [userName, setUserName] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate();  // Initialize useNavigate

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!userName || !password) {
      setError('Please fill in all fields.');
      return;
    }

    // Here you can add your real authentication logic
    console.log('Username:', userName);
    console.log('Password:', password);

    // Reset error if inputs are valid
    setError('');

    // Mock success (replace with actual login logic)
    alert('Login successful!');

    // Navigate to the dashboard after successful login
    navigate('/dashboard');
  };

  return (
    <div>
    <div className='title'><h1>COVID-19 Data Visualizer</h1></div>
    <div className="login-container">
      <h2>Login</h2>
      {error && <p className="error-message">{error}</p>}
      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label htmlFor="userName">Username:</label>
          <input
            type="text"
            id="userName"
            value={userName}
            onChange={(e) => setUserName(e.target.value)}
            required
          />
        </div>
        <div className="form-group">
          <label htmlFor="password">Password:</label>
          <input
            type="password"
            id="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
        </div>
        <div className='button-container'>
            <button className="entry-buttons" type="submit">Login</button>
            <button className="entry-buttons" type="submit">Sign Up</button>
        </div>
        
      </form>
    </div>
    </div>
  );
};

export default Login;
