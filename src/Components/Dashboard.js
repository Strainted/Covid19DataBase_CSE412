import React, { useState } from 'react';
import LineChart from './LineChart';
import CountrySelector from './CountrySelector';
import SummaryCard from './SummaryCard';
import ReportGenerator from './ReportGenerator';
import styles from './Dashboard.module.css';
import { TextField } from '@mui/material';
import { LocalizationProvider, DatePicker } from '@mui/x-date-pickers';
import { AdapterDateFns } from '@mui/x-date-pickers/AdapterDateFns';

function Dashboard() {
  const [startDate, setStartDate] = useState(null);
  const [endDate, setEndDate] = useState(null);

  const handleCountryChange = (country) => {
    console.log('Country selected:', country);
  };

  const handleStartDateChange = (date) => {
    setStartDate(date);
    console.log('Start Date:', date);
  };

  const handleEndDateChange = (date) => {
    setEndDate(date);
    console.log('End Date:', date);
  };

  return (
    <div className={styles.dashboardContainer}>
      <nav className={styles.navbar}>
        <div className={styles.logo}>COVID-19 Data Visualizer</div>
        <ul className={styles.navLinks}>
          <li><a href="#dashboard">Dashboard</a></li>
          <li><a href="#about">About</a></li>
          <li><a href="#contact">Contact</a></li>
        </ul>
      </nav>

      <div className={styles.countrySelector}>
        <CountrySelector onCountryChange={handleCountryChange} />
      </div>

      <div className={styles.datePickers}>
        <LocalizationProvider dateAdapter={AdapterDateFns}>
          <DatePicker
            label="Start Date"
            value={startDate}
            onChange={handleStartDateChange}
            renderInput={(params) => <TextField {...params} />}
          />
          <DatePicker
            label="End Date"
            value={endDate}
            onChange={handleEndDateChange}
            renderInput={(params) => <TextField {...params} />}
          />
        </LocalizationProvider>
      </div>

      <div className={styles.metrics}>
        <SummaryCard title="Total Cases" value="1M" />
        <SummaryCard title="Deaths" value="50K" />
        <SummaryCard title="Recoveries" value="950K" />
        <SummaryCard title="Active Cases" value="5K" />
      </div>

      <div className={styles.chartContainer}>
        <h2>COVID-19 Trends</h2>
        <LineChart startDate={startDate} endDate={endDate} />
      </div>

      <div className={styles.reportGenerator}>
        <ReportGenerator startDate={startDate} endDate={endDate} />
      </div>

      <footer className={styles.footer}>
        <div>© 2024 COVID-19 Data Visualizer</div>
        <div className={styles.footerLinks}>
          <a href="#privacy">Privacy Policy</a>
          <a href="#terms">Terms of Service</a>
          <a href="#help">Help</a>
        </div>
      </footer>
    </div>
  );
}

export default Dashboard;
