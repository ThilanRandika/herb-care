import { useEffect, useState } from 'react';
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


  useEffect(() => {
    // Update formData.date when props.selectedDate changes
    if (props.selectedDate) {
      setFormData(prevFormData => ({ ...prevFormData, date: props.selectedDate }));
    }
  }, [props.selectedDate]);



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
    const { id, value, name } = e.target;
    //name attribute is only available for type
    if (name === "type") {
      // If the appointment type is "virtual", hide the center input field and set its value to null
      if (value === "virtual") {
        setFormData({ ...formData, type: value, center: null });
      } else {
        setFormData({ ...formData, [name]: value });
      }
    }else{
      setFormData({ ...formData, [id]: value });
    }
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    try {
      await axios.post('http://localhost:8070/availability/add', formData);
      console.log('Availability added successfully!');
      props.setIsNewAvailabilitySubmitted (true);
    } catch (error) {
      console.error('Failed to add availability:', error);
    }
  };



  return (
    <div className='specialist-availability-availabilityAddFor-all'>
      <h5>Add Availability for { new Date(props.selectedDate).toLocaleDateString() }</h5>
      <form className='specialist-availability-availabilityAddFor-form' onSubmit={handleSubmit}>
        <div>
          <label htmlFor="type">Select the appointment type:</label><br/>
          <div className="specialist-availabilityAddForm-type">
            <div className="specialist-availabilityAddForm-type-physical">
              <input type="radio" className="btn-check" name="type" id="physical" value="physical" autoComplete="off" onChange={handleChange} />
              <label className="btn btn-secondary" htmlFor="physical">physical</label>
            </div>
            <div className="specialist-availabilityAddForm-type-virtual">
              <input type="radio" className="btn-check" name="type" id="virtual" value="virtual" autoComplete="off" onChange={handleChange} />
              <label className="btn btn-secondary" htmlFor="virtual">virtual</label>
            </div>
          </div>
        </div>
        {/* Conditional rendering for the center input field */}
        {formData.type !== "virtual" && (
          <div>
            <label className="specialist-availabilityAddForm-center" htmlFor="center">Center</label>
            <input type="text" id="center" onChange={handleChange} />
          </div>
        )}
        
        <div className='specialist-availabilityAddForm-startTime' >
          <label htmlFor="startTime">Start Time</label>
          <select id="startTime" onChange={handleChange} required>
            <option value="">Select Start Time</option>
            {timeOptions.map((time, index) => (
              <option key={index} value={time}>{time}</option>
            ))}
          </select>
        </div>
        <div className='specialist-availabilityAddForm-endTime'>
          <label htmlFor="endTime">End Time</label>
          <select id="endTime" onChange={handleChange} required>
            <option value="">Select End Time</option>
            {timeOptions.map((time, index) => (
              <option key={index} value={time}>{time}</option>
            ))}
          </select>
        </div>
        <button className='specialist-availabilityAddForm-submitBtn' type="submit">Submit</button>
      </form>
    </div>
  );
}

export default AvailabilitySettingPage;
