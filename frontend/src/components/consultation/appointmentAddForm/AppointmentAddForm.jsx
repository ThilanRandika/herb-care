import React, { useState } from 'react'
import './appointmentAddForm.css'
import axios from 'axios';
import {useNavigate} from 'react-router-dom'

function AppointmentAddForm() {

  const [date, setDate] = useState("");
  const [specialist, setSpecialist] = useState("");
  const [patient, setPatient] = useState("");
  const navigator = useNavigate();

  const submit = (e) => {
    e.preventDefault();
    const newAppointment = {
      date: date,
      specialist: specialist,
      patient: patient
    }
    console.log(newAppointment)
    axios.post('http://localhost:8070/consultAppointment/add', newAppointment).then((res)=>{
      navigator('../');
    }).catch((err)=>{
      console.error(err);
    })
  };

  return (
    <div className='AppointmentAddForm'>
        <form onSubmit={submit}>
            <div class="mb-3">
                <label for="date" class="form-label">Date</label>
                <input type="date" class="form-control" id="date" onChange={(e)=> setDate(e.target.value) } />
            </div>
            <div class="mb-3">
                <label for="specialist" class="form-label">Specialist</label>
                <input type="text" class="form-control" id="specialist" onChange={(e)=> setSpecialist(e.target.value) } />
            </div>
            <div class="mb-3">
                <label for="patient" class="form-label">Patient</label>
                <input type="text" class="form-control" id="patient" onChange={(e)=>  setPatient(e.target.value) } />
            </div>
            <button type="submit" class="btn btn-primary">Submit</button>
            </form>
    </div>
  )
}

export default AppointmentAddForm