import './specialistInterface.css';
import React, { useContext, useState } from 'react';
import { Route, Routes } from 'react-router-dom';
import AppointmentRequests from '../appointmentRequests/AppointmentRequests';
import Appointments from '../appointments/Appointments';
import NavBarSpecialistDashBoard from '../../../../components/consultation/specialist/navBarSpecialistDashBoard/NavBarSpecialistDashBoard';
import SpecialistDashboard from '../specialistDashboard/SpecialistDashboard';
import Availability from '../availability/Availability';
import { AuthContext } from '../../../../context/AuthContext';

function DashboardSpecialist() {

  const { user } = useContext(AuthContext); // get the customer ID from authentication context
  // const [specialistID, setSpecialistID] = useState("");

  return (
    <>
      <div className="specialistInterface-specialist-container">
        <div className="specialistInterface-specialist-nav-bar">
          <NavBarSpecialistDashBoard/>
          {/* <div className="specialistInterface-specialist-id-input">
            <label> enter specialistID</label>
            <input type="text" value={specialistID} onChange={(e)=> setSpecialistID(e.target.value) }/>
          </div> */}
        </div>

        <div className="specialistInterface-pages">
          <Routes>
            <Route path="/dashboard" element={<SpecialistDashboard specialistID={user._id}/>}></Route>
            <Route path="/appointmentRequests" element={<AppointmentRequests specialistID={user._id}/>}></Route>
            <Route path="/appointments" element={<Appointments specialistID={user._id}/>}></Route>
            <Route path="/availability" element={<Availability specialistID={user._id}/>}></Route>
          </Routes>
        </div>
      </div>
    </>
  );
}

export default DashboardSpecialist;
