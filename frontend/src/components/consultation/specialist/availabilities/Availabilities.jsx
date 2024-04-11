import React, { useEffect, useState } from 'react';
import './availabilities.css';
import axios from 'axios';
import Calendar from 'react-calendar';
import 'react-calendar/dist/Calendar.css';

function Availabilities(props) {
  const [availabilities, setAvailabilities] = useState([]);
  const [value, onChange] = useState(new Date());
  const [formattedDate, setFormattedDate] = useState(new Date().toISOString().split('T')[0]); // Set initial date to today
  const [showAvailabilities, setShowAvailabilities] = useState(false); // State to control visibility of availabilities

  const formatDate = (date) => {
    const year = date.getFullYear();
    const month = (date.getMonth() + 1).toString().padStart(2, '0'); // Add leading zero if needed
    const day = date.getDate().toString().padStart(2, '0'); // Add leading zero if needed
    const final = `${year}-${month}-${day}`;
    setFormattedDate(final);
  };

  useEffect(() => {
    fetchAvailabilities();
  }, [formattedDate]); // Fetch availabilities whenever formattedDate changes

  useEffect(() => {
    updateDateState(value)
  }, [value]);

  //refresh availability when a new availability added.
  useEffect(() => {
    if (props.isNewAvailabilitySubmitted == true) {
      fetchAvailabilities();
      props.setIsNewAvailabilitySubmitted(false);
    }
  }, [props.isNewAvailabilitySubmitted]); // Fetch availabilities whenever new availability is submitted

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
      setShowAvailabilities(true); // Show availabilities after fetching
    } catch (error) {
      console.error('Failed to fetch availabilities:', error);
      // Optionally, display an error message to the user
    }
  };

  const isToday = (someDate) => {
    const today = new Date();
    return someDate.getDate() === today.getDate() &&
           someDate.getMonth() === today.getMonth() &&
           someDate.getFullYear() === today.getFullYear();
  };
  
  const updateDateState = (selectedDate) => {
    const adjustedDate = new Date(selectedDate);

    if (isToday(selectedDate)) {
      adjustedDate.setHours(0);
      adjustedDate.setMinutes(0);
      adjustedDate.setSeconds(0);
      adjustedDate.setMilliseconds(0);
    }

    adjustedDate.setHours(adjustedDate.getHours() + 5);
    adjustedDate.setMinutes(adjustedDate.getMinutes() + 30);
    
    const utcDate = adjustedDate.toISOString();
    props.setSelectedDate(utcDate);
  };

  


  return (
    <div className='specialist-availabilityPage-availabilities-fullPage'>
      <h2>Scheduled Availabilities</h2>
      <div className="specialist-availabilityPage-availabilities-date-picker">
        <label htmlFor="date">Select Date:</label>
          <div className='specialist-availabilityPage-availabilities-calendar'>
            <Calendar onChange={(date) => { onChange(date); formatDate(date); setShowAvailabilities(false); }} value={value} />
          </div>
      </div>
      {showAvailabilities ? (
        availabilities.length > 0 ? (
          <div className="specialist-availabilityPage-availabilities-availabilities-list">
            {availabilities.map((availability, index) => (
              <div key={index}>
                <h4 className="specialist-availabilityPage-availabilities-availabilitiesAvailable-msg" >Availabilities for {isToday(new Date(formattedDate)) ? 'Today' : new Date(formattedDate).toLocaleDateString()}</h4>
                <ul>
                  <li>
                    {availability.startTime} - {availability.endTime}
                    <br />
                    {availability.type}
                    <br />
                    {availability.center}
                  </li>
                </ul>
              </div>
            ))}
          </div>
        ) : (
          <h5 className="specialist-availabilityPage-availabilities-noAvailabilities-msg">There are no availabilities found for {isToday(new Date(formattedDate)) ? 'Today' : new Date(formattedDate).toLocaleDateString()}.</h5>
        )
      ) : null}
    </div>
  );
}

export default Availabilities;
