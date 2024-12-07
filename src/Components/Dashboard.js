import React, { useEffect, useState, useRef } from 'react';
import LineChart from './LineChart';
import CountrySelector from './CountrySelector';
import SummaryCard from './SummaryCard';
import { Button } from '@mui/material';
import { jsPDF } from 'jspdf';
import html2canvas from 'html2canvas';
import styles from './Dashboard.module.css';
import { TextField } from '@mui/material';
import { LocalizationProvider, DatePicker } from '@mui/x-date-pickers';
import { AdapterDateFns } from '@mui/x-date-pickers/AdapterDateFns';
import { format } from 'date-fns';
import { supabase } from '../supabaseClient';
import { Line } from 'react-chartjs-2';
import { Chart, CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend } from 'chart.js';
import ChartSelector from './ChartSelector';
import SavedGraphs from './SavedGraphs';
import { useLocation } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';


function Dashboard() {
  const [startDate, setStartDate] = useState(null);
  const [endDate, setEndDate] = useState(null);
  const [country, setCountry] = useState(null);
  const [data, setData] = useState([]);
  const [chartType, setChartType] = useState('line');
  const chartRef = useRef(); // Reference for the chart
  const [chartLoaded, setChartLoaded] = useState(false); // State to track if chart is rendered
  const navigate = useNavigate();
  const location = useLocation();
  const usernameState = location.state?.userName || 'Guest';
  
  const handleGenerateReport = async () => {
    if (!chartRef.current) {
      console.error('Chart element not found!');
      return;
    }
  
    
  
    // Get the chart's base64 image
    const chartBase64Image = chartRef.current.toBase64Image();
  
    // Create a new jsPDF instance
    const doc = new jsPDF();
  
    // Add the report title
    doc.setFontSize(18);
    doc.text('COVID-19 Data Report - ' + country, 20, 20);

  
    // Add text content: Country, Date Range, and Data Summary
    doc.setFontSize(12);
    doc.text(`Country: ${country}`, 20, 40);
    doc.text(`Start Date: ${startDate}`, 20, 50);
    doc.text(`End Date: ${endDate}`, 20, 60);
  
    // If the data exists, show the summary in bullet points
    if (data) {
      const metrics = [
        `Total Cases: ${data['total_cases'] || 'N/A'}`,
        `Deaths: ${data['total_deaths'] || 'N/A'}`,
        `Active Cases: ${data['last_active_cases'] || 'N/A'}`,
      ];
  
      doc.text('Summary:', 20, 70);
      metrics.forEach((metric, index) => {
        doc.text(`- ${metric}\n`, 25, 80 + (index * 10));
      });
    }

    doc.text('', 20, 100);
  
    // Add the chart image to the PDF
    try {
      doc.addImage(chartBase64Image, 'PNG', 20, 100, 170, 90); // Position and scale the image
    } catch (error) {
      console.error('Error adding chart image to PDF:', error);
    }
  
    // Save the generated PDF
    doc.save('covid19-report.pdf');
  };
  

  useEffect(() => {
    fetchData();
  }, [startDate, endDate, country]);
  console.log(chartType)

  const fetchData = async () => {
    console.log("Fetching Data...");

    const startdate = format(new Date(startDate), 'yyyy-MM-dd');
    const enddate = format(new Date(endDate), 'yyyy-MM-dd'); 
    const countryname = country;

    let { data, error } = await supabase
      .rpc('get_stats', {
        countryname, 
        enddate, 
        startdate
      });

    if (error) {
      console.error('Error fetching data:', error.message);
    } else {
      console.log(data)
      setData(data);
    }

    console.log(data);
  };

  const handleClick = async () => {
    console.log('')
    //make insert query to graph

    const formattedStartdate = format(new Date(startDate), 'yyyy-MM-dd');
    const formattedEnddate = format(new Date(endDate), 'yyyy-MM-dd'); 

    const { insert, error } = await supabase
    .from('Graph')
    .insert([
      { username: usernameState, 
        start_date: formattedStartdate,
        end_date: formattedEnddate,
        country_name: country
      },
    ])
    .select()

    if(error) {
      console.error(error.message)
    } else {
      console.log('Data inserted to table.')
    } 
  }

  const handleCountryChange = (country) => {
    setCountry(country);
  };

  const handleStartDateChange = (date) => {
    setStartDate(date);
  };

  const handleEndDateChange = (date) => {
    setEndDate(date);
  };

  const handleChartLoad = () => {
    // Set chartLoaded to true once chart is fully rendered
    setChartLoaded(true);
  };

  const handleLoginClick = () => {
    navigate('/login');
  };

  const handleGraphSelect = (selectedGraph) => {
    setCountry(selectedGraph.country);
    setStartDate(format(new Date(selectedGraph.startdate), 'yyyy-MM-dd'));
    setEndDate(format(new Date(selectedGraph.enddate), 'yyyy-MM-dd'));
    console.log('Selected Graph:', selectedGraph);
  };

  return (
    <div className={styles.dashboardContainer}>
    <nav className={styles.navbar}>
      <div className={styles.logo}>COVID-19 Data Visualizer</div>
      <ul className={styles.navLinks}>
        <li><a href="#dashboard">Dashboard</a></li>
        <li><a href="#login" onClick={handleLoginClick}>Login</a></li>
      </ul>
    </nav>

      <div className={styles.countrySelector}>
        <SavedGraphs userID={usernameState} onGraphSelect={handleGraphSelect}></SavedGraphs>
      </div>

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
        <SummaryCard title="Total Cases" value={data['total_cases']} />
        <SummaryCard title="Deaths" value={data['total_deaths']} />
        <SummaryCard title="Active Cases" value={data['last_active_cases']} />
      </div>

      <div className={styles.chartSelector}>
          <ChartSelector setChartType={setChartType}/>
      </div>

      <div className={styles.chartContainer}>
        <h2>COVID-19 Trends</h2>
        <LineChart 
          type={chartType}
          ref={chartRef} 
          country={country} 
          startDate={startDate} 
          endDate={endDate} 
          onLoad={handleChartLoad} // Ensure this function is called after the chart is fully rendered
        />
      </div>

      <Button variant="contained" color="primary" onClick={handleGenerateReport}>
        Generate Report
      </Button>

      <button onClick={handleClick}>Save Graph Configurtion</button>

      <footer className={styles.footer}>
        <div>© 2024 COVID-19 Data Visualizer</div>
      </footer>
    </div>
  );
}

export default Dashboard;
