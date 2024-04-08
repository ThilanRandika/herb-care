import './specialistInterface.css';
import React, { useState } from 'react';
import { Route, Routes } from 'react-router-dom';
import AppointmentRequests from '../appointmentRequests/AppointmentRequests';
import Appointments from '../appointments/Appointments';
import NavBarSpecialistDashBoard from '../../../../components/consultation/specialist/navBarSpecialistDashBoard/NavBarSpecialistDashBoard';
import SpecialistDashboard from '../specialistDashboard/SpecialistDashboard';
import Availability from '../availability/Availability';

function DashboardSpecialist() {

  const [specialistID, setSpecialistID] = useState("");

  return (
    <>
      <div className="specialist-container">
        <div className="specialist-nav-bar">
          <NavBarSpecialistDashBoard/>
          <div className="specialist-id-input">
            <label> enter specialistID</label>
            <input type="text" value={specialistID} onChange={(e)=> setSpecialistID(e.target.value) }/>
          </div>
        </div>

        <div className="pages">
          <Routes>
            <Route path="/" element={<SpecialistDashboard specialistID={specialistID}/>}></Route>
            <Route path="/appointmentRequests" element={<AppointmentRequests specialistID={specialistID}/>}></Route>
            <Route path="/appointments" element={<Appointments specialistID={specialistID}/>}></Route>
            <Route path="/availability" element={<Availability specialistID={specialistID}/>}></Route>
          </Routes>
        </div>
      </div>
    </>
  );
}

export default DashboardSpecialist;
