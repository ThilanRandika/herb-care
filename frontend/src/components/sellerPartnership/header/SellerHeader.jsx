import React, { useEffect, useState } from 'react'
import './sellerHeader.css'
import {BsFillBellFill, BsFillEnvelopeFill, BsPersonCircle, BsSearch, BsJustify} from 'react-icons/bs'
import { Link } from 'react-router-dom';
import axios from 'axios';

function SellerHeader() {

    const [isMenuOpen, setIsMenuOpen] = useState(false);
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

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };
  return (
    <header className='header'>
        <div className='menu-icon'>
            <BsJustify className='icon' onClick={toggleMenu}/>
        </div>
        <div className='header-right'>
          <Link className="bell-notification" to={"/sellerMainHome/notification"} aria-current="page" onClick={handleMarkAsRead}>
            <BsFillBellFill className='icon'/>
            {unreadNotifications > 0 && (
              <span className="notification-count">{unreadNotifications}</span>
            )}
          </Link>
            <BsPersonCircle className='icon'/>
        </div>
    </header>
  )
}

export default SellerHeader