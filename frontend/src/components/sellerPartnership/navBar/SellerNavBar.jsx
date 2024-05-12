//import React, { useEffect, useState } from 'react'
import { NavLink } from 'react-router-dom'
import './sellerNavBar.css'
//import axios from 'axios';

function SellerNavBar() {

  // const [unreadNotifications, setUnreadNotifications] = useState(0); // Example initial count

  // useEffect(() => {
  //   axios.get("http://localhost:8070/sellerNotification/unReadCount")
  //   .then((res) => {
  //     console.log('Successfully retrieved unread   notifications count', res.data);
  //     setUnreadNotifications(res.data.unreadCount);
  //   })
  //   .catch((err) => {
  //     console.error(`Error retrieving unread notifications count : ${err}`);
  //     });
  // } , []);

  // // Function to handle marking notifications as read
  // const handleMarkAsRead = () => {
  //   setUnreadNotifications(0);
  //   // Add logic here to mark notifications as read in your application
  // };

  return (
    <>
     <nav className="custom-navbar">
  <div className="custom-navbar-container">
    <NavLink className="custom-navbar-logo" to={"/sellerMainHome/sellerHome"}>
    <img src={require(`../../../Images/logo/HerbCare Logo.png`)} alt="Company Logo" className="custom-navbar-logo-image" />
    </NavLink>
    <div className="custom-navbar-links">
      <ul className="custom-navbar-list">
        <li className="custom-navbar-item">
          <NavLink className="custom-navbar-link" activeClassName="active" to={"/sellerMainHome/sellerHome"}>
          Home
          </NavLink>
        </li>
        <li className="custom-navbar-item">
          <NavLink className="custom-navbar-link" activeClassName="active" to={"/sellerMainHome/allproduct"} aria-current="page">
            All Products
          </NavLink>
        </li>
        <li className="custom-navbar-item">
          <NavLink className="custom-navbar-link" activeClassName="active" to={"/sellerMainHome/bag"} aria-current="page">
            Bag
          </NavLink>
        </li>
        <li className="custom-navbar-item">
          <NavLink className="custom-navbar-link" activeClassName="active" to={"/sellerMainHome/orders"} aria-current="page">
            Orders
          </NavLink>
        </li>
        {/* <li className="custom-navbar-item">
          <Link className="custom-navbar-link" to={"/sellerMainHome/orders"} aria-current="page">
            Payments
          </Link>
        </li> */}
        <li className="custom-navbar-item">
          <NavLink className="custom-navbar-link" to={"/sellerMainHome/profile"} aria-current="page">
            Profile
          </NavLink>
        </li>
        <li className="custom-navbar-item">
          <NavLink className="custom-navbar-link" to={"/sellerMainHome/appointment"} aria-current="page">
            Make Appointment
          </NavLink>
        </li>
        {/* <li className="custom-navbar-item">
          <Link className="bell-notification" to={"/sellerMainHome/notification"} aria-current="page" onClick={handleMarkAsRead}>
            <i className="fas fa-bell"></i>
            {unreadNotifications > 0 && (
              <span className="notification-count">{unreadNotifications}</span>
            )}
          </Link>
        </li> */}
      </ul>
    </div>
  </div>
</nav>


    </>
  )
}

export default SellerNavBar