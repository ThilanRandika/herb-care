import React, { useContext, useState } from 'react';
import { Link } from 'react-router-dom';
import { AuthContext } from '../../../../context/AuthContext';
import './topNavBarSpecialist.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'  // Import fontAwesome
import { faBell } from '@fortawesome/free-solid-svg-icons'        // Import faBell icon
import Logo from '../../../../Images/logo/HerbCare Logo.png'; // Import the logo
import {useNavigate} from 'react-router-dom'

function TopNavBarSpecialist({ isNotificationVisible, setNotificationVisible }) {
  const { user, logout } = useContext(AuthContext);
  const [isUserInfoVisible, setUserInfoVisible] = useState(false);
  const navigator = useNavigate();

  const handleLogout = () => {
    // Perform logout action
    // logout();
    navigator('../../');
  };

  const handleNotificationClick = () => {
    setNotificationVisible(!isNotificationVisible);
  };


  console.log(user)

  return (
    <div className="specialistInterface-specialist-top-nav-bar-top-nav-bar-specialist">
      <div className="specialistInterface-specialist-top-nav-bar-logo-container">
        <Link to="dashboard">
        <img src={Logo} alt="Logo" />
        </Link>
      </div>
      <div className="specialistInterface-specialist-top-nav-bar-search-bar">
        <form class="specialistInterface-specialist-top-nav-bar-search-bar">
          <input class="specialistInterface-specialist-top-nav-bar-search-bar-input" type="search" placeholder="Appointment or Patient" aria-label="Search"/>
          <button class="specialistInterface-specialist-top-nav-bar-search-bar-btn" type="submit">Search</button>
        </form>

      </div>
      <div className="specialistInterface-specialist-top-nav-bar-notifications" onClick={handleNotificationClick}>
        <FontAwesomeIcon icon={faBell} />
      </div>
      <div className="specialistInterface-specialist-top-nav-bar-user-info">
        <div className="specialistInterface-specialist-top-nav-bar-user-info-toggle" onClick={() => setUserInfoVisible(!isUserInfoVisible)}>
          <span>{user.specialistName}</span>
          <i className={`fas ${isUserInfoVisible ? 'fa-chevron-up' : 'fa-chevron-down'}`}></i>
        </div>
        {isUserInfoVisible && (
          <div className="specialistInterface-specialist-top-nav-bar-user-info-dropdown">
            <button onClick={handleLogout}>Logout</button>
          </div>
        )}
      </div>
    </div>
  );
}

export default TopNavBarSpecialist;
