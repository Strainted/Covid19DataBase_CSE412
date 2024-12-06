import React from 'react';
import { Container } from '@mui/material';

function Layout({ children }) {
  return (
    <>
      <Container component="main" maxWidth="lg">
        {children}
      </Container>
    </>
  );
}

export default Layout;
