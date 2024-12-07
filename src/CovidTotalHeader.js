import React, { useState } from 'react';
import "./CovidTotalHeader.css"
//total_cases INT,
//total_deaths INT,
//total_recoveries INT,
//total_active_cases INT,
//total_new_cases INT
const CovidTotalHeader = () => {
    const [deathTotal, setDeathTotal] = useState('');
    const [casesTotal, setCaseTotal] = useState('');
    const [recoveryTotal, setrecoveryTotal] = useState('');
    const [activeCaseTotal, setActiveCaseTotal] = useState('');
    const [newCasesTotal, setNewCasesTotal] = useState('');

    const handleUpdate = (e) => {
        //update Totals when recieved from database
        return true
    }

    return (
        <div className='totals-container'>
            <div id="death" className='total-box'>1M Deaths</div>
            <div id="cases" className='total-box'>500 Cases</div>
            <div id="recovery" className='total-box'>3000 Recoveries</div>
            <div id="activeCases" className='total-box'>5.5m Active Cases</div>
            <div id="newCases" className='total-box'>30,000 New Cases</div>
        </div>
    );

};


export default CovidTotalHeader;