import React from 'react'
import { Link } from 'react-router-dom'
import './staffSideBar.css'

function StaffSideBar() {
  return (
    <>
      <div className="seller-staff-sidebar">
        <ul className="seller-staff-sidebar-nav">
          <li className="seller-staff-sidebar-item">
            <Link
              className="seller-staff-sidebar-link"
              to={"/staff/SellerstaffDashboard"}
              aria-current="page"
            >
              Dashboard
            </Link>
          </li>
          <li className="seller-staff-sidebar-item">
            <Link
              className="seller-staff-sidebar-link"
              to={"/staff/SellerStaffDashboard/newOrders"}
            >
              New Orders
            </Link>
          </li>
          <li className="seller-staff-sidebar-item">
            <Link
              className="seller-staff-sidebar-link"
              to={"/staff/SellerStaffDashboard/processingOrders"}
            >
              Processing Orders
            </Link>
          </li>
          <li className="seller-staff-sidebar-item">
            <Link
              className="seller-staff-sidebar-link "
              to="/staff/SellerStaffDashboard/readyToDelivery"
            >
              Oders for Delivery
            </Link>
          </li>
          <li className="seller-staff-sidebar-item">
            <Link
              className="seller-staff-sidebar-link "
              to="/staff/SellerStaffDashboard/deliveryOrders"
            >
              On goning Delivery Order
            </Link>
          </li>
          <li className="seller-staff-sidebar-item">
            <Link
              className="seller-staff-sidebar-link "
              to="/staff/SellerStaffDashboard/completeOrders"
            >
              Complete Orders
            </Link>
          </li>
        </ul>
      </div>
    </>
  )
}

export default StaffSideBar