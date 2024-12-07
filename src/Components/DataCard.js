import React from 'react';
import { Card, CardContent, CardHeader, Typography } from '@mui/material';

function DataCard({ title, data }) {
  return (
    <Card>
      <CardHeader title={title} />
      <CardContent>
        <Typography variant="body2">
          {data}
        </Typography>
      </CardContent>
    </Card>
  );
}

export default DataCard;
