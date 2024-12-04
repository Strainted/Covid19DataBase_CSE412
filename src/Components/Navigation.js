//import React from 'react';
import { AppBar, Toolbar, Typography } from '@mui/material';

function Navigation() {
  return (
    <AppBar position="static">
      <Toolbar>
        <Typography variant="h6" color="inherit" noWrap>
          COVID-19 Data Visualizer
        </Typography>
      </Toolbar>
    </AppBar>
  );
}

export default Navigation;
