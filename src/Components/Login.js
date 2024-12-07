import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';  
import './Login.css';
import {supabase} from '../supabaseClient.js'
        

const Login = () => {
  const [userName, setUserName] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
    if (!userName || !password) {
      setError('Please fill in all fields.');
      return;
    }

    try {
      const { data, error } = await supabase
        .from('Account')
        .select('*')
        .eq('username', userName.trim())
        .single()
        

      if (error) {
        setError('Login failed: ' + error.message);
        return;
      }
      console.log("data password: " + data.password)
      console.log("Password: " + password)

      if (data.password === password) {
        setError('');
        navigate('/', {state: {userName}}); // Navigate to home after login
      } else {
        setError('Invalid username or password.');
      }
    } catch (err) {
      setError('An error occurred during login.');
      console.error(err);
    }
  };

  const handleSignup = async (e) => {
    e.preventDefault();
    if (!userName || !password) {
      setError('Please fill in all fields.');
      return;
    }
  
    try {
      const { error } = await supabase
        .from('Account')
        .insert([{ username: userName.trim(), password: password.trim() }]);
  
      if (error) {
        setError('Sign-up failed: ' + error.message);
      } else {
        setError('');
        navigate('/', {state: {userName}}); // Navigate to home after sign up
      }
    } catch (err) {
      setError('An error occurred during sign-up.');
      console.error(err);
    }
  };
  

  return (
    <div>
      <div className="title"><h1>COVID-19 Data Visualizer</h1></div>
      <div className="main-container">
        <div className="login-container">
          <h2>Login</h2>
          {error && <p className="error-message">{error}</p>}
          <form onSubmit={handleLogin}>
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
            <div className="button-container">
              <button className="entry-buttons" type="submit">Login</button>
              <button className="entry-buttons" type="button" onClick={handleSignup}>Sign Up</button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Login;
