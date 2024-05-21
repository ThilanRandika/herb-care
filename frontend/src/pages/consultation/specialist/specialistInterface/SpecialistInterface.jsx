import './specialistInterface.css';
import React, { useContext, useState } from 'react';
import { Route, Routes } from 'react-router-dom';
import AppointmentRequests from '../appointmentRequests/AppointmentRequests';
import Appointments from '../appointments/Appointments';
import NavBarSpecialistDashBoard from '../../../../components/consultation/specialist/navBarSpecialistDashBoard/NavBarSpecialistDashBoard';
import SpecialistDashboard from '../specialistDashboard/SpecialistDashboard';
import Availability from '../availability/Availability';
import { AuthContext } from '../../../../context/AuthContext';
import TopNavBarSpecialist from '../../../../components/consultation/specialist/topNavBarSpecialist/TopNavBarSpecialist';
import NotificationPopup from '../../../../components/consultation/specialist/notificationPopupSpecialist/NotificationPopupSpecialist'
import SpecialistProfile from '../specialistProfile/SpecialistProfile';

function DashboardSpecialist() {

  const { user } = useContext(AuthContext); // get the specialist object from authentication context
  const [isNotificationVisible, setNotificationVisible] = useState(false);
  const [unreadNotificationCount, setUnreadNotificationCount] = useState(0);

  const handleCloseNotification = () => {
    setNotificationVisible(false);
  };

  return (
    <div className="specialistInterface-specialist-allPages">
      <div className="specialistInterface-specialist-top-nav-bar">
        <TopNavBarSpecialist isNotificationVisible={isNotificationVisible} setNotificationVisible={setNotificationVisible} unreadNotificationCount={unreadNotificationCount} setUnreadNotificationCount={setUnreadNotificationCount} />
      </div>
      <div className="specialistInterface-specialist-notifications-popup">
        {isNotificationVisible && <NotificationPopup onClose={handleCloseNotification} setUnreadNotificationCount={setUnreadNotificationCount} />}
      </div>
      <div className="specialistInterface-specialist-container">
        <div className="specialistInterface-specialist-side-nav-bar">
          <NavBarSpecialistDashBoard/>
        </div>
        <div className="specialistInterface-pages">
          <Routes>
            <Route path="/dashboard" element={<SpecialistDashboard specialistID={user._id}/>}></Route>
            <Route path="/appointmentRequests" element={<AppointmentRequests specialistID={user._id}/>}></Route>
            <Route path="/appointments" element={<Appointments specialistID={user._id}/>}></Route>
            <Route path="/availability" element={<Availability specialistID={user._id}/>}></Route>
            <Route path="/profile" element={<SpecialistProfile />}></Route>
          </Routes>
        </div>
      </div>
    </div>
  );
}

export default DashboardSpecialist;
