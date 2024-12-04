import React from 'react';
import { Button } from '@mui/material';
import { jsPDF } from 'jspdf';

function ReportGenerator() {
    const handleGenerateReport = () => {
        const doc = new jsPDF();

        // Set the document's font size and add the title
        doc.setFontSize(18);
        doc.text('COVID-19 Data Report', 20, 20);

        // Add text content to the PDF
        doc.setFontSize(12);
        doc.text('This is an example of a generated PDF report.', 20, 30);
        doc.text('Here you can add more data about COVID-19 cases or any other relevant information.', 20, 40);

        // Save the PDF document
        doc.save('covid19-report.pdf');
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
