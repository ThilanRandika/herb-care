import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import 'bootstrap-icons/font/bootstrap-icons.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.bundle.min.js';
import './staffWholeSaleTopNav.css';

function StaffWholeSaleTopNav() {
  const location = useLocation();

  const isActive = (path) => location.pathname === path;

  return (
    <div>
      <header className='header d-flex align-items-center w-100'>
        <nav className="navbar navbar-expand-lg w-100" style={{ backgroundColor: '#f3f3f3' }}>
          <div className="container-fluid">
            <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
              <span className="navbar-toggler-icon"></span>
            </button>
            <div className="collapse navbar-collapse" id="navbarSupportedContent">
              <ul className="navbar-nav me-auto mb-2 mb-lg-0">
                <li className="nav-item staff-main-top-nav-single-nav-item">
                  <Link className={`nav-link ${isActive('/staff/SellerStaff/dashboard') ? 'staff-main-top-nav-navLink' : ''}`} to="/staff/SellerStaff/dashboard" aria-current="page">
                    Dashboard
                  </Link>
                </li>
                <li className="nav-item staff-main-top-nav-single-nav-item">
                  <Link className={`nav-link ${isActive('/staff/SellerStaff/newOrders/') ? 'staff-main-top-nav-navLink' : ''}`} to="/staff/SellerStaff/newOrders/">
                    Pending
                  </Link>
                </li>
                <li className="nav-item staff-main-top-nav-single-nav-item">
                  <Link className={`nav-link ${isActive('/staff/SellerStaff/processingOrders/') ? 'staff-main-top-nav-navLink' : ''}`} to="/staff/SellerStaff/processingOrders/">
                    Processing
                  </Link>
                </li>
                <li className="nav-item staff-main-top-nav-single-nav-item">
                  <Link className={`nav-link ${isActive('/staff/SellerStaff/readyToDelivery/') ? 'staff-main-top-nav-navLink' : ''}`} to="/staff/SellerStaff/readyToDelivery/">
                    Ready To Delivery
                  </Link>
                </li>
                <li className="nav-item staff-main-top-nav-single-nav-item">
                  <Link className={`nav-link ${isActive('/staff/SellerStaff/deliveryOrders/') ? 'staff-main-top-nav-navLink' : ''}`} to="/staff/SellerStaff/deliveryOrders/">
                    On Delivery
                  </Link>
                </li>
                <li className="nav-item staff-main-top-nav-single-nav-item">
                  <Link className={`nav-link ${isActive('/staff/SellerStaff/completeOrders/') ? 'staff-main-top-nav-navLink' : ''}`} to="/staff/SellerStaff/completeOrders/">
                    Completed
                  </Link>
                </li>
              </ul>
            </div>
          </div>
        </nav>
      </header>
    </div>
  );
}

export default StaffWholeSaleTopNav;
