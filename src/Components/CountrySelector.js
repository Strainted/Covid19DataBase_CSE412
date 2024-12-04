// src/components/CountrySelector.js
import React, { useState } from 'react';
import { FormControl, InputLabel, Select, MenuItem } from '@mui/material';

function CountrySelector({ onCountryChange }) {
  const [country, setCountry] = useState('');
  const countries = ['USA', 'India', 'Brazil', 'Italy']; // Example countries

  const handleChange = (event) => {
    setCountry(event.target.value);
    onCountryChange(event.target.value);
  };

  return (
    <FormControl fullWidth>
      <InputLabel id="country-select-label">Country</InputLabel>
      <Select
        labelId="country-select-label"
        id="country-select"
        value={country}
        label="Country"
        onChange={handleChange}
      >
        {countries.map((country) => (
          <MenuItem key={country} value={country}>
            {country}
          </MenuItem>
        ))}
      </Select>
    </FormControl>
  );
}

export default CountrySelector;
