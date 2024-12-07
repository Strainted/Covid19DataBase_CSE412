import React, { useState } from 'react';

const ChartSelector = ({ setChartType }) => {
  const [selectedChart, setSelectedChart] = useState('line'); // Default chart type is 'line'

  const handleChartTypeChange = (event) => {
    const selectedType = event.target.value;
    setSelectedChart(selectedType); // Update local selected type
    setChartType(selectedType); // Pass the selected type to the parent
  };

  return (
    <div>
      <label htmlFor="chart-selector">Choose a chart type: </label>
      <select id="chart-selector" onChange={handleChartTypeChange} value={selectedChart}>
        <option value="line">Line Chart</option>
        <option value="bar">Bar Chart</option>
        <option value="scatter">Scatter Chart</option>
      </select>
    </div>
  );
};

export default ChartSelector;
