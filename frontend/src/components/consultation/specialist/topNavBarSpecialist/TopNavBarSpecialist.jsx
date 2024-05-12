import React, { useContext, useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { AuthContext } from '../../../../context/AuthContext';
import './topNavBarSpecialist.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'; // Import fontAwesome
import { faBell } from '@fortawesome/free-solid-svg-icons'; // Import faBell icon
import Logo from '../../../../Images/logo/HerbCare Logo.png'; // Import the logo
import { useNavigate } from 'react-router-dom';

function TopNavBarSpecialist({ isNotificationVisible, setNotificationVisible, unreadNotificationCount, setUnreadNotificationCount }) {
  const { user, logout } = useContext(AuthContext);
  const [isUserInfoVisible, setUserInfoVisible] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const navigator = useNavigate();

  useEffect(() => {
    // Fetch unread notifications count initially
    fetchUnreadNotificationCount();

    // Set up interval to periodically fetch the unread notifications count
    const intervalId = setInterval(fetchUnreadNotificationCount, 10000); // Fetch every 10 seconds

    // Clean up interval on component unmount
    return () => clearInterval(intervalId);
  }, [user._id]); // Fetch count whenever user ID changes

  const fetchUnreadNotificationCount = () => {
    fetch(`http://localhost:8070/specialistNotifications/unreadCount/${user._id}`)
      .then(response => response.json())
      .then(data => {
        setUnreadNotificationCount(data.unreadCount);
      })
      .catch(error => console.error('Error fetching unread notifications count:', error));
  };

  const handleLogout = () => {
    // Perform logout action
    // logout();
    navigator('../../');
  };

  const handleNotificationClick = () => {
    setNotificationVisible(!isNotificationVisible);
  };

  const handleSearch = (e) => {
    e.preventDefault();
    navigator(`/specialistInterface/appointmentRequests?search=${encodeURIComponent(searchQuery)}`);
  };
  

  return (
    <div className="specialistInterface-specialist-top-nav-bar-top-nav-bar-specialist">
      <div className="specialistInterface-specialist-top-nav-bar-logo-container">
        <Link to="dashboard">
          <img src={Logo} alt="Logo" />
        </Link>
      </div>
      <div className="specialistInterface-specialist-top-nav-bar-search-bar">
        <form onSubmit={handleSearch} className="specialistInterface-specialist-top-nav-bar-search-bar">
          <input
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="specialistInterface-specialist-top-nav-bar-search-bar-input"
            type="search"
            placeholder="Appointment or Patient"
            aria-label="Search"
          />
          <button className="specialistInterface-specialist-top-nav-bar-search-bar-btn" type="submit">Search</button>
        </form>
      </div>
      <div className="specialistInterface-specialist-top-nav-bar-notifications" onClick={handleNotificationClick}>
        <FontAwesomeIcon icon={faBell} />
        {unreadNotificationCount > 0 && (
          <span className="specialistInterface-specialist-top-nav-bar-notifications-notification-badge">{unreadNotificationCount}</span>
        )}
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
