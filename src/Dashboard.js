// src/components/Dashboard.js
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Filters from './Filters';

const Dashboard = () => {
  const [data, setData] = useState([]);
  const [filters, setFilters] = useState({ country: '', startDate: '', endDate: '' });

  useEffect(() => {
    axios.get(`https://api.covid19api.com/summary`)
      .then(response => setData(response.data.Countries))
      .catch(error => console.log(error));
  }, []);

  const handleFilterChange = (filterName, value) => {
    setFilters({ ...filters, [filterName]: value });
  };

  return (
    <div>
      <Filters onFilterChange={handleFilterChange} />
      <ul>
        {data.filter(item => item.Country.includes(filters.country)).map((item, index) => (
          <li key={index}>{item.Country}: {item.TotalConfirmed} cases</li>
        ))}
      </ul>
    </div>
  );
};

export default Dashboard;
