import React, { useRef } from 'react';
import { Button } from '@mui/material';
import { jsPDF } from 'jspdf';
import html2canvas from 'html2canvas';

function ReportGenerator({ chartRef, startDate, endDate, data, country }) {
    const handleGenerateReport = async () => {
        setTimeout(async () => {
            const doc = new jsPDF();
        
            // Add the report title
            doc.setFontSize(18);
            doc.text('COVID-19 Data Report', 20, 20);
        
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
                doc.text(`- ${metric}`, 25, 80 + (index * 10));
              });
            }
        
            // Capture the chart as an image
            try {
              const canvas = await html2canvas(chartRef.current);
              const imgData = canvas.toDataURL('image/png');
              doc.addImage(imgData, 'PNG', 20, 100, 170, 90); // Position and scale the image
            } catch (error) {
              console.error('Error capturing chart:', error);
            }
        
            // Save the generated PDF
            doc.save('covid19-report.pdf');
          }, 1000); // Delay for 500ms before capturing the chart
        };
  
    return (
      <div>
        <Button variant="contained" color="primary" onClick={handleGenerateReport}>
          Generate Report
        </Button>
      </div>
    );
  }
  
export default ReportGenerator;


