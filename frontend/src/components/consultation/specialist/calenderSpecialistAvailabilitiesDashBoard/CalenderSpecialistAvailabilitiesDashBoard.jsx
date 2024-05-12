import React, { useState, useEffect, useContext } from 'react';
import Calendar from 'react-calendar';
import 'react-calendar/dist/Calendar.css';
import './calenderSpecialistAvailabilitiesDashBoard.css';
import { AuthContext } from '../../../../context/AuthContext';

function CalenderSpecialistAvailabilitiesDashBoard() {
  const [ongoingAppointmentDates, setOngoingAppointmentDates] = useState([]);
  const [convertedOngoingAppointmentDates, setConvertedOngoingAppointmentDates] = useState([]);
  const { user } = useContext(AuthContext);


  useEffect(() => {
    // Fetch ongoing appointment dates from the backend
    fetch(`http://localhost:8070/consultAppointment/getOngoingAppointmentDates/${user._id}`)
      .then(response => response.json())
      .then(data => {
        console.log(data);
        // Check if data is an object with a 'dates' array
        if (data && Array.isArray(data.dates)) {
          const dates = data.dates.map(appointment => appointment.split('T')[0]);
          setOngoingAppointmentDates(dates);
        } else {
          console.error('Unexpected data format:', data);
        }
      })
      .catch(error => console.error('Error fetching ongoing appointment dates:', error));
  }, []);


  useEffect(() => {
    // Convert ongoing appointment dates to the desired format
    const convertedDates = ongoingAppointmentDates.map(dateString => convertToDate(dateString));
    setConvertedOngoingAppointmentDates(convertedDates);
  }, [ongoingAppointmentDates]);

  const convertToDate = (dateString) => {
    if (!dateString) return null; // Handle undefined dateString
    const dateParts = dateString.split(' ');
    const monthIndex = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'].indexOf(dateParts[1]);
    const day = dateParts[2].padStart(2, '0'); // Ensure day has leading zero if needed
    return `${dateParts[3]}-${(monthIndex + 1).toString().padStart(2, '0')}-${day}`;
  };
  

  // Function to check if a date is before today
  const isDateBeforeToday = (date) => {
    const today = new Date();
    return date < today;
  };


  return (
    <div className='calenderSpecialistAvailabilitiesDashBoard-allContent'>
      <div className="calenderSpecialistAvailabilitiesDashBoard-header">
        <h3>Ongoing Appointment Days</h3>
      </div>
      <div className="calenderSpecialistAvailabilitiesDashBoard-calender">
        <Calendar
          tileClassName={({ date }) => convertedOngoingAppointmentDates.includes(date.toISOString().split('T')[0]) ? 'highlight-next-week' : null}
          tileDisabled={({ date }) => isDateBeforeToday(date)}
        />
      </div>
    </div>
  );
}

export default CalenderSpecialistAvailabilitiesDashBoard;
