import React, { useState } from 'react';
import { Route, Routes } from 'react-router-dom';
import AppointmentRequests from '../appointmentRequests/AppointmentRequests';
import Appointments from '../appointments/Appointments';
import NavBarSpecialistDashBoard from '../../../components/consultation/navBarSpecialistDashBoard/NavBarSpecialistDashBoard';

function DashboardSpecialist() {

  const [specialistID, setSpecialistID] = useState("");

  return (
    <>
      <div>
        <h1>DashboardSpecialist</h1>
      </div>
      <NavBarSpecialistDashBoard/>
      <div className="specialist">
        <label> enter specialistID</label>
        <input type="text" value={specialistID} onChange={(e)=> setSpecialistID(e.target.value) }/>
      </div>

      <Routes>
        <Route path="/appointmentRequests" element={<AppointmentRequests specialistID={specialistID}/>}></Route>
        <Route path="/appointments" element={<Appointments specialistID={specialistID}/>}></Route>
      </Routes>
    </>
  );
}

export default DashboardSpecialist;