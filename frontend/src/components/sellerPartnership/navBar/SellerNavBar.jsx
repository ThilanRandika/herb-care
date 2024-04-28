import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import './sellerNavBar.css'
import axios from 'axios';

function SellerNavBar() {

  const [unreadNotifications, setUnreadNotifications] = useState(0); // Example initial count

  useEffect(() => {
    axios.get("http://localhost:8070/sellerNotification/unReadCount")
    .then((res) => {
      console.log('Successfully retrieved unread   notifications count', res.data);
      setUnreadNotifications(res.data.unreadCount);
    })
    .catch((err) => {
      console.error(`Error retrieving unread notifications count : ${err}`);
      });
  } , []);

  // Function to handle marking notifications as read
  const handleMarkAsRead = () => {
    setUnreadNotifications(0);
    // Add logic here to mark notifications as read in your application
  };

  return (
    <>
     <nav className="custom-navbar">
  <div className="custom-navbar-container">
    <Link className="custom-navbar-logo" to={"/sellerMainHome/sellerHome"}>
    <img src={require(`../../../Images/logo/HerbCare Logo.png`)} alt="Company Logo" className="custom-navbar-logo-image" />
    </Link>
    <div className="custom-navbar-links">
      <ul className="custom-navbar-list">
        <li className="custom-navbar-item">
          <Link className="custom-navbar-logo" to={"/sellerMainHome/sellerHome"}>
          Home
          </Link>
        </li>
        <li className="custom-navbar-item">
          <Link className="custom-navbar-link" to={"/sellerMainHome/allproduct"} aria-current="page">
            All Products
          </Link>
        </li>
        <li className="custom-navbar-item">
          <Link className="custom-navbar-link" to={"/sellerMainHome/bag"} aria-current="page">
            Bag
          </Link>
        </li>
        <li className="custom-navbar-item">
          <Link className="custom-navbar-link" to={"/sellerMainHome/orders"} aria-current="page">
            Orders
          </Link>
        </li>
        <li className="custom-navbar-item">
          <Link className="custom-navbar-link" to={"/sellerMainHome/profile"} aria-current="page">
            Profile
          </Link>
        </li>
        <li className="custom-navbar-item">
          <Link className="custom-navbar-link" to={"/sellerMainHome/appointment"} aria-current="page">
            Make Appointment
          </Link>
        </li>
        <li className="custom-navbar-item">
          <Link className="bell-notification" to={"/sellerMainHome/notification"} aria-current="page" onClick={handleMarkAsRead}>
            <i className="fas fa-bell"></i>
            {unreadNotifications > 0 && (
              <span className="notification-count">{unreadNotifications}</span>
            )}
          </Link>
        </li>
      </ul>
    </div>
  </div>
</nav>


    </>
  )
}

export default SellerNavBar