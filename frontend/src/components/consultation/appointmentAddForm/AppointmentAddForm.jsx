import { useContext, useEffect, useState } from "react";
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
  const [availabilities, setAvailabilities] = useState([]);
  const navigator = useNavigate();
  const { user } = useContext(AuthContext); // get the customer ID from authentication context
  console.log(user.userDetails);

  useEffect(() => {
    if (props.selectedSpecialist) {
      fetchAvailabilities();
    }
  }, [props.selectedSpecialist]);
  
  useEffect(() => {
    if (date && props.selectedSpecialist) {
      fetchAvailabilities();
    }
  }, [date, props.selectedSpecialist]);
  
  

  const fetchAvailabilities = async () => {
    try {
      const response = await axios.get(`http://localhost:8070/availability/getAvailabilities/${props.selectedSpecialist._id}`);
      setAvailabilities(response.data);
    } catch (error) {
      console.error("Error fetching availabilities:", error);
    }
  };

  const handleDateChange = (selectedDate) => {
    const adjustedDate = new Date(selectedDate);
    adjustedDate.setHours(adjustedDate.getHours() + 5);
    adjustedDate.setMinutes(adjustedDate.getMinutes() + 30);
  
    const utcDate = adjustedDate.toISOString();
    setDate(utcDate);
  
    const availabilityForDate = availabilities.find(availability => {
      const availabilityDate = new Date(availability.date);
      return (
        availabilityDate.getDate() === adjustedDate.getDate() &&
        availabilityDate.getMonth() === adjustedDate.getMonth() &&
        availabilityDate.getFullYear() === adjustedDate.getFullYear()
      );
    });
  
    if (availabilityForDate) {
      setType(availabilityForDate.type);
      setCenter(availabilityForDate.center);
    } else {
      setType("");
      setCenter(null);
    }
  };

  
  
  const handleTypeChange = (e) => {
    const selectedType = e.target.value;
    setType(selectedType);
    
    // If the selected type is virtual, set the center state to null
    if (selectedType === "virtual") {
      setCenter(null);
    }
  };

  

  const isDateDisabled = ({ date }) => {
    // Check if the date is disabled based on availability
    return !availabilities.some(availability => {
      const availabilityDate = new Date(availability.date);
      return date.getDate() === availabilityDate.getDate() &&
             date.getMonth() === availabilityDate.getMonth() &&
             date.getFullYear() === availabilityDate.getFullYear();
    });
  };
  
  

  const submit = (e) => {
    e.preventDefault();

    if (!props.selectedSpecialist) {
      console.error("Selected specialist is null");
      return;
    }
    else if (!user.userDetails){
      console.error("Selected patient is null");
      return;
    }
    else if (!date) {
      console.error("Selected date is null");
      return;
    }
    else if (!type) {
      console.error("Selected type is null");
      return;
    }
    else if (type == "physical" && !center) {
      console.error("Selected center is null");
      return;
    }

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
            <Calendar onChange={handleDateChange} value={date} tileDisabled={isDateDisabled} />
          </div>
        </div>
        <div className="mb-3">
          <label htmlFor="patient" className="form-label">Patient</label>
          <input type="text" className="form-control" id="patient" value={user.userDetails.customer_name} readOnly/>
        </div>
        <div>
          <label htmlFor="type">Select the appointment type:</label><br/>
          {type !== "virtual" && (
            <>
              <input
                type="radio"
                id="physical"
                name="type"
                value="physical"
                onChange={handleTypeChange}
                checked={type === "physical"}
              />
              <label htmlFor="physical">Physical</label><br/>
            </>
          )}
          {type !== "physical" && (
            <>
              <input
                type="radio"
                id="virtual"
                name="type"
                value="virtual"
                onChange={handleTypeChange}
                checked={type === "virtual"}
              />
              <label htmlFor="virtual">Virtual</label><br/>
            </>
          )}
        </div>



        {type !== "virtual" && (
          <div className="mb-3">
            <label htmlFor="center" className="form-label">Center</label>
            <input type="text" className="form-control" id="center" value={center || ''} onChange={(e)=> setCenter(e.target.value) } />
          </div>
        )}
        <button type="submit" className="btn btn-primary">Submit</button>
        </form>

        
    </div>
  )
}

export default AppointmentAddForm