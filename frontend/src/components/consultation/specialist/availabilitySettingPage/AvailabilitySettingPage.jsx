import { useState } from 'react';
import './availabilitySettingPage.css';
import axios from 'axios';

function AvailabilitySettingPage(props) {
  const [formData, setFormData] = useState({
    specialist: props.specialistID,
    type: '',
    center: '',
    date: '',
    startTime: '',
    endTime: ''
  });

  // Generate time options in 30-minute intervals
  const timeOptions = [];
  for (let hour = 0; hour < 24; hour++) {
    for (let minute = 0; minute < 60; minute += 30) {
      const formattedHour = hour.toString().padStart(2, '0');
      const formattedMinute = minute.toString().padStart(2, '0');
      timeOptions.push(`${formattedHour}:${formattedMinute}`);
    }
  }

  const handleChange = (e) => {
    const { id, value } = e.target;

    // If the appointment type is "virtual", hide the center input field and set its value to null
    if (id === "type" && value === "virtual") {
      setFormData({ ...formData, type: value, center: null });
    } else {
      setFormData({ ...formData, [id]: value });
    }
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    try {
      await axios.post('http://localhost:8070/availability/add', formData);
      console.log('Availability added successfully!');
    } catch (error) {
      console.error('Failed to add availability:', error);
    }
  };

  return (
    <>
      <h3>Availability Add Form</h3>
      <form onSubmit={handleSubmit}>
        <div>
          <label htmlFor="specialist">Specialist</label>
          <input type="text" readOnly id="specialist" value={props.specialistID} />
        </div>
        <div>
          <label htmlFor="type">Select the appointment type:</label><br/>
          <input type="radio" id="type" name="type" value="physical" onChange={handleChange} />
          <label htmlFor="physical">Physical</label><br/>
          <input type="radio" id="type" name="type" value="virtual" onChange={handleChange} />
          <label htmlFor="virtual">Virtual</label>
        </div>
        {/* Conditional rendering for the center input field */}
        {formData.type !== "virtual" && (
          <div>
            <label htmlFor="center">Center</label>
            <input type="text" id="center" onChange={handleChange} />
          </div>
        )}
        <div>
          <label htmlFor="date">Date</label>
          <input type="date" id="date" required onChange={handleChange} />
        </div>
        <div>
          <label htmlFor="startTime">Start Time</label>
          <select id="startTime" onChange={handleChange} required>
            <option value="">Select Start Time</option>
            {timeOptions.map((time, index) => (
              <option key={index} value={time}>{time}</option>
            ))}
          </select>
        </div>
        <div>
          <label htmlFor="endTime">End Time</label>
          <select id="endTime" onChange={handleChange} required>
            <option value="">Select End Time</option>
            {timeOptions.map((time, index) => (
              <option key={index} value={time}>{time}</option>
            ))}
          </select>
        </div>
        <button type="submit">Submit</button>
      </form>
    </>
  );
}

export default AvailabilitySettingPage;
