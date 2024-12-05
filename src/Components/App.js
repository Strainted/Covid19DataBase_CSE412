import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { ThemeProvider } from '@mui/material/styles';
import theme from '../theme/theme';
import Layout from './Layout';
import Dashboard from './Dashboard';
import Login from './Login';


function App() {
  return (
    <ThemeProvider theme={theme}>
      <Router>
        <Layout>
          <Routes>
            <Route path="/" element={<Dashboard />} />
            <Route path="/login" element={<Login />} />
            {/* Other routes can be added here */}
          </Routes>
        </Layout>
      </Router>
    </ThemeProvider>
  );
}

export default App;
