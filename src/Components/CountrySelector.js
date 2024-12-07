// src/components/CountrySelector.js
import React, { useState } from 'react';
import { FormControl, InputLabel, Select, MenuItem } from '@mui/material';

function CountrySelector({ onCountryChange }) {
  const [country, setCountry] = useState('');
  const countries = ['Bolivia', 'Ethiopia', 'Trinidad And Tobago', 'Niger', 'Panama',
    'Yemen', 'South Sudan', 'Western Sahara', 'Lithuania', 'Bulgaria', 'Croatia',
    'Tunisia', 'Sudan', 'Aruba', 'Mali', 'Swaziland', 'Morocco', 'Moldova', 'Myanmar',
    'Nicaragua', 'Mexico', 'Tonga', 'Nepal', 'Guyana', 'Tanzania', 'Poland', 'Saint Martin',
    'Lebanon', 'Greenland', 'French Guiana', 'Costa Rica', 'Haiti', 'Gibraltar', 'Samoa',
    'Equatorial Guinea', 'Somalia', 'Andorra', 'Indonesia', 'Bangladesh', 'Venezuela', 'Mayotte',
    'Brunei Darussalam', 'Kiribati', 'Cameroon', 'Luxembourg', 'Czech Republic', 'Sweden', 
    'Viet Nam', 'Uganda', 'Montenegro', 'Jordan', 'Dominican Republic', 'Saint Helena', 'Ireland',
    'Cambodia', 'Macedonia', 'Singapore', 'Papua New Guinea', 'Sri Lanka', 'San Marino', 'Laos',
    'Uzbekistan', 'Bosnia And Herzegovina','Portugal', 'Finland', 'Malta', 'Colombia','Albania', 
    'Ukraine', 'Saudi Arabia','Grenada', 'Cayman Islands', 'Cuba', 'Latvia', 'Cote D Ivoire', 
    'Kyrgyzstan', 'Algeria','France', 'Slovakia', 'Maldives', 'Israel', 'Djibouti', 'Syria', 
    'Sao Tome And Principe','Nauru', 'Senegal', 'Malaysia', 'Kenya', 'Ghana', 'Zambia' ,'Iceland', 
    'Madagascar', 'Kuwait','China Macao Sar' ,'Sierra Leone' ,'Liberia' ,'Philippines' ,'Benin',
    'Cabo Verde', 'Guinea'
  ];
   // Example countries

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
