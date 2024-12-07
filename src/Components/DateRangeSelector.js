// src/components/DateRangeSelector.js
import React, { useState } from 'react';
import { LocalizationProvider, DateRangePicker, DateRange } from '@mui/lab';
import AdapterDateFns from '@mui/lab/AdapterDateFns';
import { TextField } from '@mui/material';

function DateRangeSelector({ onDateChange }) {
  const [dateRange, setDateRange] = useState([null, null]);

  return (
    <LocalizationProvider dateAdapter={AdapterDateFns}>
      <DateRangePicker
        startText="Start Date"
        endText="End Date"
        value={dateRange}
        onChange={(newValue) => {
          setDateRange(newValue);
          onDateChange(newValue);
        }}
        renderInput={(startProps, endProps) => (
          <React.Fragment>
            <TextField {...startProps} />
            <TextField {...endProps} />
          </React.Fragment>
        )}
      />
    </LocalizationProvider>
  );
}

export default DateRangeSelector;
