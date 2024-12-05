import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';  
import './Login.css';
import { createClient } from '@supabase/supabase-js'

const REACT_APP_SUPABASE_URL='https://pyacfznwimzhdwtrrvvx.supabase.co'
const REACT_APP_SUPABASE_ANON_KEY='eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InB5YWNmem53aW16aGR3dHJydnZ4Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3MzI3MzkwNzQsImV4cCI6MjA0ODMxNTA3NH0.h87uieiV0ds6g1SK9d_95gFAJ0xmoWxenrhRn5dq9ds'

const supabase = createClient(REACT_APP_SUPABASE_URL, REACT_APP_SUPABASE_ANON_KEY)
        

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

    console.log("username: " + userName)
    console.log("password: " + password)

    try {
      const { data, error } = await supabase
        .from('Account')
        .select('password')
        .eq('username', userName) 
        .single()
        
      

      if (error) {
        setError('Login failed: ' + error.message);
        return;
      }

      if (data && data === password) {
        setError('');
        navigate('/'); // Navigate to home after login
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
        .insert([{ username: userName, password: password }]);
  
      if (error) {
        setError('Sign-up failed: ' + error.message);
      } else {
        setError('');
        navigate('/'); // Navigate to home after sign up
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
