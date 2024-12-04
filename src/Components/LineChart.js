// src/components/LineChart.js
import React from 'react';
import { Line } from 'react-chartjs-2';
import { Chart, CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend } from 'chart.js';

Chart.register(CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend);

function LineChart({ startDate, endDate }) {
  const allData = [
    { date: '2024-01-01', cases: 300 },
    { date: '2024-02-01', cases: 600 },
    { date: '2024-03-01', cases: 260 },
    { date: '2024-04-01', cases: 400 },
  ];

  // Filter data based on the selected date range
  const filteredData = allData.filter((data) => {
    const dataDate = new Date(data.date);
    return (!startDate || dataDate >= startDate) && (!endDate || dataDate <= endDate);
  });

  const labels = filteredData.map((data) => new Date(data.date).toLocaleDateString());
  const cases = filteredData.map((data) => data.cases);

  const chartData = {
    labels,
    datasets: [
      {
        label: 'COVID-19 Cases',
        data: cases,
        fill: false,
        borderColor: 'rgb(75, 192, 192)',
        tension: 0.1,
      },
    ],
  };

  return <Line data={chartData} />;
}

export default LineChart;
