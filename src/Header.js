import React from 'react';
import { Link } from 'react-router-dom';

const Header = () => {
  return (
    <header>
      <h1>COVID-19 Data Visualizer</h1>
      <nav>
        <Link to="/">Home</Link>
        <Link to="/report">Report</Link>
        <Link to="/login">Login</Link>
      </nav>
    </header>
  );
};

export default Header;