import { useContext, useState } from "react";
import { AuthContext } from '../../../context/AuthContext';
import './appointmentAddForm.css'
import axios from 'axios';
import {useNavigate} from 'react-router-dom'
import Calendar from 'react-calendar';
import 'react-calendar/dist/Calendar.css';


function AppointmentAddForm(props) {

  const [date, setDate] = useState("");
  const [center, setCenter] = useState(null);
  const [type, setType] = useState("");
  const navigator = useNavigate();
  const { user } = useContext(AuthContext); // get the customer ID from authentication context
  console.log(user.userDetails);

  const handleDateChange = (selectedDate) => {
    // Clone the selected date to avoid mutating the original object
    const adjustedDate = new Date(selectedDate);
    
    // Add 5 hours and 30 minutes to the selected date
    adjustedDate.setHours(adjustedDate.getHours() + 5);
    adjustedDate.setMinutes(adjustedDate.getMinutes() + 30);
  
    // Convert the adjusted date to UTC format
    const utcDate = adjustedDate.toISOString();
    
    // Set the UTC date to the state
    setDate(utcDate);
  };
  


  const handleTypeChange = (e) => {
    const selectedType = e.target.value;
    setType(selectedType);
    
    // If the selected type is virtual, set the center state to null
    if (selectedType === "virtual") {
      setCenter(null);
    }
  };
  
  

  const submit = (e) => {
    e.preventDefault();
    const newAppointment = {
      date: date,
      specialist: props.selectedSpecialist._id,
      patient: user.userDetails,
      center: center,
      type: type,
      appointmentAmount: props.selectedSpecialist.consultationFee
    }
    console.log("new appointment is",  newAppointment);
    axios.post('http://localhost:8070/consultAppointment/add', newAppointment).then((res)=>{
      navigator('../myConsultations');
    }).catch((err)=>{
      console.error(err);
    })
  };

  console.log(date);

  return (
    <div className='AppointmentAddForm'>
        <form onSubmit={submit}>
          {props.selectedSpecialist && (
            <div className="selectedSpecialistDetails">
              <div className="mb-3">
                <label htmlFor="specialist" className="form-label">Specialist</label>
                <input type="text" className="form-control" id="specialist" value={props.selectedSpecialist.specialistName} readOnly />
              </div>
              <div className="mb-3">
                <label htmlFor="specialist_speciality" className="form-label">Speciality</label>
                <input type="text" className="form-control" id="specialist_speciality" value={props.selectedSpecialist.speciality} readOnly />
              </div>
              <div className="mb-3">
                <label htmlFor="specialist_ratings" className="form-label">Ratings</label>
                <input type="text" className="form-control" id="specialist_ratings" value={props.selectedSpecialist.rating} readOnly />
              </div>
              <div className="mb-3">
                <label htmlFor="consultationFee" className="form-label">Consultation Fee</label>
                <input type="text" className="form-control" id="consultationFee" value={props.selectedSpecialist.consultationFee} readOnly />
              </div>
            </div>
          )}  
          <div className="mb-3">
              <label htmlFor="date" className="form-label">Date</label>
              <div>
                <Calendar onChange={handleDateChange} value={date} />
              </div>
          </div>
          <div className="mb-3">
              <label htmlFor="patient" className="form-label">patient</label>
              <input type="text" className="form-control" id="patient" value={user.userDetails.customer_name} readOnly/>
          </div>
          

          <div>
            <label htmlFor="type">Select the appointment type:</label><br/>
            <input type="radio" id="physical" name="type" value="physical" onChange={handleTypeChange} />
            <label htmlFor="physical">Physical</label><br/>
            <input type="radio" id="virtual" name="type" value="virtual" onChange={handleTypeChange} />
            <label htmlFor="virtual">Virtual</label>
          </div>
          {/* Conditional rendering for the center input field */}
          {type !== "virtual" && (
            <div className="mb-3">
                <label htmlFor="center" className="form-label">center</label>
                <input type="text" className="form-control" id="center" onChange={(e)=> setCenter(e.target.value) } />
            </div>
          )}

          <button type="submit" className="btn btn-primary">Submit</button>
        </form>

        
    </div>
  )
}

export default AppointmentAddForm