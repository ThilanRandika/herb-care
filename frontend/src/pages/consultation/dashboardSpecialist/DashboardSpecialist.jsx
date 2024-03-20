import React from 'react';
import { Route, Routes } from 'react-router-dom';
import AppointmentRequests from '../appointmentRequests/AppointmentRequests';
import AppointmentsHistory from '../appointmentsHistory/AppointmentsHistory';
import NavBarSpecialistDashBoard from '../../../components/consultation/navBarSpecialistDashBoard/NavBarSpecialistDashBoard';

function DashboardSpecialist() {
  return (
    <>
      <div>DashboardSpecialist</div>
      <NavBarSpecialistDashBoard/>

      <Routes>
        <Route path="/appointmentRequests" element={<AppointmentRequests/>}></Route>
        <Route path="/appointmentsHistory" element={<AppointmentsHistory/>}></Route>
      </Routes>
    </>
  );
}

export default DashboardSpecialist;