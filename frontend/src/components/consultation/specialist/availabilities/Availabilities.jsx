import React, { useState } from 'react';
import './availabilities.css';
import axios from 'axios';
import Calendar from 'react-calendar';
import 'react-calendar/dist/Calendar.css';

function Availabilities(props) {
  const [availabilities, setAvailabilities] = useState([]);
  const [value, onChange] = useState(new Date());
  const [formattedDate, setFormattedDate] = useState('');

  const formatDate = (date) => {
    const year = date.getFullYear();
    const month = (date.getMonth() + 1).toString().padStart(2, '0'); // Add leading zero if needed
    const day = date.getDate().toString().padStart(2, '0'); // Add leading zero if needed
    const final = `${year}-${month}-${day}`;
    setFormattedDate(final);
  };

  const fetchAvailabilities = async () => {
    try {
      await formatDate(value); // Format the date before fetching availabilities
      const response = await axios.get(`http://localhost:8070/availability/getAvailabilitiesByDateAndSpecialist`, {
        params: {
          date: formattedDate,
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
      <h2>Availabilities</h2>
      <div className="date-picker">
        <label htmlFor="date">Select Date:</label>
          <div>
            <Calendar onChange={(date) => { onChange(date); formatDate(date); }} value={value} />
          </div>
        <button onClick={fetchAvailabilities}>Fetch Availabilities</button>
      </div>
      <div className="availabilities-list">
        <h4>Availabilities for {formattedDate}</h4>
        <ul>
          {availabilities.map((availability, index) => (
            <li key={index}>
              {availability.startTime} - {availability.endTime}
              <br />
              {availability.type}
              <br />
              {availability.center}
            </li>
          ))}
        </ul>
      </div>
    </>
  );
}

export default Availabilities;
