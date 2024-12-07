import React from 'react';
import { Link } from 'react-router-dom';
import "./Header.css"

const Header = () => {
  return (
    <header>
      <div className='title'> 
      <h1>COVID-19 Data Visualizer</h1>
      </div>
      <nav className='link-container'>
        <Link className="link" to="/Dashboard">Home</Link>
        <Link className="link" to="/report">Report</Link>
        <Link className="link" to="/login">Login</Link>
      </nav>
    </header>
  );
};

export default Header;