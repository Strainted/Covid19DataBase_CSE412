// src/components/Filters.js
import React from 'react';

const Filters = ({ onFilterChange }) => {
  return (
    <div>
      <label>
        Country:
        <input type="text" onChange={e => onFilterChange('country', e.target.value)} />
      </label>
      <label>
        Date Range:
        <input type="date" onChange={e => onFilterChange('startDate', e.target.value)} />
        to
        <input type="date" onChange={e => onFilterChange('endDate', e.target.value)} />
      </label>
    </div>
  );
};

export default Filters;
