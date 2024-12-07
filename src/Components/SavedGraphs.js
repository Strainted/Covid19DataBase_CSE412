import React, { useState, useEffect } from 'react';
import { supabase } from '../supabaseClient';

const DropdownMenu = ({ userID, onGraphSelect }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [options, setOptions] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [selectedOption, setSelectedOption] = useState(null);

  // Toggle dropdown visibility
  const toggleDropdown = () => {
    setIsOpen(!isOpen);
  };

  // Handle selecting an option
  const handleSelectOption = (option) => {
    setSelectedOption(option);
    setIsOpen(false); // Close dropdown after selecting
    // Pass the selected option (object with country, startDate, and endDate) to the parent
    onGraphSelect(option);
  };

  // Fetch graph options from the database
  const fetchOptions = async () => {
    setLoading(true);
    setError(null);
    try {
      const { data, error } = await supabase
        .from('Graph')
        .select('*')
        .eq('username', userID);

      if (error) {
        setError('Failed to fetch options.');
        return;
      }

      // Map the data to an array of objects with country, startdate, and enddate
      const mappedOptions = data.map(option => ({
        country: option.country_name,
        startdate: option.start_date,
        enddate: option.end_date,
      }));

      setOptions(mappedOptions);
    } catch (error) {
      setError('Failed to fetch options.');
    } finally {
      setLoading(false);
    }
  };

  // Fetch options when dropdown opens or when userID changes
  useEffect(() => {
    if (isOpen) {
      fetchOptions();
    }
  }, [isOpen, userID]);

  return (
    <div style={{ width: '300px', margin: '20px auto' }}>
      <button
        onClick={toggleDropdown}
        style={{
          padding: '10px 20px',
          fontSize: '16px',
          cursor: 'pointer',
          backgroundColor: '#007bff',
          color: 'white',
          border: 'none',
          borderRadius: '5px',
        }}
      >
        {selectedOption ? `${selectedOption.country} - ${selectedOption.startdate}` : 'Select Option'}
      </button>

      {isOpen && (
        <div
          style={{
            border: '1px solid #ddd',
            borderRadius: '5px',
            marginTop: '10px',
            overflow: 'hidden',
            maxHeight: '200px',
            overflowY: 'auto',
          }}
        >
          {loading ? (
            <p style={{ textAlign: 'center', padding: '10px' }}>Loading...</p>
          ) : error ? (
            <p style={{ color: 'red', textAlign: 'center', padding: '10px' }}>
              {error}
            </p>
          ) : (
            <ul style={{ listStyleType: 'none', padding: '0' }}>
              {options.map((option, index) => (
                <li
                  key={index}
                  onClick={() => handleSelectOption(option)}
                  style={{
                    padding: '10px',
                    cursor: 'pointer',
                    borderBottom: '1px solid #ddd',
                    backgroundColor: selectedOption === option ? '#007bff' : 'white',
                    color: selectedOption === option ? 'white' : 'black',
                  }}
                >
                  {option.country} - {option.startdate} to {option.enddate}
                </li>
              ))}
            </ul>
          )}
        </div>
      )}
    </div>
  );
};

export default DropdownMenu;
