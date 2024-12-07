import React, { useEffect, useState, forwardRef } from 'react';
import { Line, Bar, Scatter, Bubble } from 'react-chartjs-2';
import { 
  Chart, 
  CategoryScale, 
  LinearScale, 
  PointElement, 
  LineElement, 
  BarElement, 
  Title, 
  Tooltip, 
  Legend, 
  BubbleController, 
  ScatterController,
  TimeScale // Import TimeScale for date handling in scatter charts
} from 'chart.js';
import 'chartjs-adapter-date-fns'; // For date parsing and formatting
import { supabase } from '../supabaseClient'; // Import Supabase client
import { format } from 'date-fns';

// Register components for all chart types
Chart.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  BarElement,
  Title,
  Tooltip,
  Legend,
  BubbleController,
  ScatterController,
  TimeScale // Register TimeScale
);

const LineChart = forwardRef(({ country, startDate, endDate, type }, ref) => {
  const [chartData, setChartData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      setError('');

      try {
        const formatStartDate = format(new Date(startDate), 'yyyy-MM-dd');
        const formatEndDate = format(new Date(endDate), 'yyyy-MM-dd');

        const { data, error } = await supabase
          .from('Country')
          .select('date, num_cases')
          .eq('name', country)
          .gte('date', formatStartDate)
          .lte('date', formatEndDate);

        if (error) {
          setError('Error fetching data: ' + error.message);
          return;
        }

        if (!data || data.length === 0) {
          setError('No data available for the selected date range.');
          return;
        }

        if (type === 'scatter') {
          // Prepare data for scatter chart
          const scatterData = data.map((entry) => ({
            x: new Date(entry.date), // Date as x-axis value
            y: entry.num_cases, // Cases as y-axis value
          }));

          setChartData({
            datasets: [
              {
                label: `COVID-19 Cases in ${country}`,
                data: scatterData,
                backgroundColor: 'rgba(75, 192, 192, 1)',
              },
            ],
          });
        } else {
          // Prepare data for other chart types
          const labels = data.map((entry) =>
            new Date(entry.date).toLocaleDateString('en-US')
          );
          const cases = data.map((entry) => entry.num_cases);

          setChartData({
            labels,
            datasets: [
              {
                label: `COVID-19 Cases in ${country}`,
                data: cases,
                fill: false,
                borderColor: 'rgb(75, 192, 192)',
                tension: 0.1,
              },
            ],
          });
        }
      } catch (err) {
        setError('An unexpected error occurred.');
        console.error(err);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [country, startDate, endDate, type]);

  if (loading) return <p>Loading...</p>;
  if (error) return <p>{error}</p>;

  const scatterOptions = {
    responsive: true,
    plugins: {
      legend: {
        position: 'top',
      },
      title: {
        display: true,
        text: 'Scatter Chart Example',
      },
    },
    scales: {
      x: {
        type: 'time', // Use time scale for x-axis
        time: {
          unit: 'day', // Display unit
        },
        title: {
          display: true,
          text: 'Date',
        },
      },
      y: {
        beginAtZero: true,
        title: {
          display: true,
          text: 'Number of Cases',
        },
      },
    },
  };

  return (
    <>
      {type === 'line' && <Line ref={ref} data={chartData} />}
      {type === 'bar' && <Bar ref={ref} data={chartData} />}
      {type === 'scatter' && <Scatter ref={ref} data={chartData} options={scatterOptions} />}
      
    </>
  );
});

export default LineChart;
