//import React, { useEffect, useState } from 'react'
import { NavLink } from 'react-router-dom'
import './sellerNavBar.css'
import { useState } from 'react';
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

  const [showSublinks, setShowSublinks] = useState(false);

  const toggleSublinks = () => {
    setShowSublinks(!showSublinks);
  };

  return (
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
              <NavLink className="custom-navbar-link" activeClassName="active" to={"/sellerMainHome/allproduct"}>
                All Products
              </NavLink>
            </li>
            <li className="custom-navbar-item">
              <NavLink className="custom-navbar-link" activeClassName="active" to={"/sellerMainHome/bag"}>
                Bag
              </NavLink>
            </li>
            <li className="custom-navbar-item">
              <div className={`custom-navbar-link ${showSublinks ? "active" : ""}`}  onClick={toggleSublinks}>
                Orders
              </div>
              {/* Sublinks */}
              {showSublinks && (
                <ul className="seller-sublinks">
                  <li><NavLink to={"/sellerMainHome/orders/pending"}>Pending Orders</NavLink></li>
                  <li><NavLink to={"/sellerMainHome/orders/processing"}>Processing Orders</NavLink></li>
                  <li><NavLink to={"/sellerMainHome/orders/completed"}>Completed Orders</NavLink></li>
                </ul>
              )}
            </li>
            <li className="custom-navbar-item">
              <NavLink className="custom-navbar-link" to={"/sellerMainHome/profile"}>
                Profile
              </NavLink>
            </li>
            <li className="custom-navbar-item">
              <NavLink className="custom-navbar-link" to={"/sellerMainHome/appointment"}>
                Make Appointment
              </NavLink>
            </li>
          </ul>
        </div>
      </div>
    </nav>
  );
}

export default SellerNavBar