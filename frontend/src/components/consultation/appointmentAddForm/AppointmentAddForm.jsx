import React, { useState } from 'react'
import './appointmentAddForm.css'
import axios from 'axios';
import {useNavigate} from 'react-router-dom'


function AppointmentAddForm(props) {

  const [date, setDate] = useState("");
  const [center, setCenter] = useState("");
  const navigator = useNavigate();

  const submit = (e) => {
    e.preventDefault();
    const newAppointment = {
      date: date,
      specialist: props.selectedSpecialist._id,
      patient: props.customerID,
      center: center
    }
    console.log(newAppointment)
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
            </div>
          )}  
          <div className="mb-3">
              <label htmlFor="date" className="form-label">Date</label>
              <input type="date" className="form-control" id="date" onChange={(e)=> setDate(e.target.value) } />
          </div>
          <div className="mb-3">
              <label htmlFor="patient" className="form-label">patient</label>
              <input type="text" className="form-control" id="patient" value={props.customerID} readOnly/>
          </div>
          <div className="mb-3">
              <label htmlFor="center" className="form-label">center</label>
              <input type="text" className="form-control" id="center" onChange={(e)=> setCenter(e.target.value) } />
          </div>
          <button type="submit" className="btn btn-primary">Submit</button>
        </form>
    </div>
  )
}

export default AppointmentAddForm