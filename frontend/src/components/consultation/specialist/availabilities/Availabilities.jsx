import React, { useState } from 'react';
import './availabilities.css';
import axios from 'axios';

function Availabilities(props) {
  const [selectedDate, setSelectedDate] = useState('');
  const [availabilities, setAvailabilities] = useState([]);

  const handleDateChange = (e) => {
    setSelectedDate(e.target.value);
  };

  const fetchAvailabilities = async () => {
    try {
      const response = await axios.get(`http://localhost:8070/availability/getAvailabilitiesByDateAndSpecialist`, {
        params: {
          date: selectedDate,
          specialistId: props.specialistID
        }
      });
      setAvailabilities(response.data);
    } catch (error) {
      console.error('Failed to fetch availabilities:', error);
      // Optionally, display an error message to the user
    }
  };

  return (
    <>
      <h3>Availabilities</h3>
      <div className="date-picker">
        <label htmlFor="date">Select Date:</label>
        <input type="date" id="date" value={selectedDate} onChange={handleDateChange} />
        <button onClick={fetchAvailabilities}>Fetch Availabilities</button>
      </div>
      <div className="availabilities-list">
        <h4>Availabilities for {selectedDate}</h4>
        <ul>
          {availabilities.map((availability, index) => (
            <>
                <li key={index}>
                {availability.startTime} - {availability.endTime}
                </li>
                <li>
                {availability.type}
                </li>
                <li>
                {availability.center}
                </li>
            </>
          ))}
        </ul>
      </div>
    </>
  );
}

export default Availabilities;
