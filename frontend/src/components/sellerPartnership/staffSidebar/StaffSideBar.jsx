import React from 'react'
import { Link } from 'react-router-dom'

function StaffSideBar() {
  return (
    <>
      <div className="col-lg-3 left-column">
        <ul className="nav flex-column">
          <li className="nav-item">
            <Link
              className="nav-link"
              to={"/SellerManagerDashboard"}
              aria-current="page"
            >
              Dashboard
            </Link>
          </li>
          <li className="nav-item">
            <Link
              className="nav-link"
              to={"/SellerStaffDashboard/newOrders"}
            >
              New Orders
            </Link>
          </li>
          <li className="nav-item">
            <Link
              className="nav-link"
              to={"/SellerStaffDashboard/processingOrders"}
            >
              Processing Orders
            </Link>
          </li>
          <li className="nav-item">
            <Link
              className="nav-link "
              to="/SellerStaffDashboard/readyToDelivery"
            >
              Oders for Delivery
            </Link>
          </li>
          <li className="nav-item">
            <Link
              className="nav-link "
              to="/SellerStaffDashboard/deliveryOrders"
            >
              On goning Delivery Order
            </Link>
          </li>
          <li className="nav-item">
            <Link
              className="nav-link "
              to="/SellerStaffDashboard/completeOrders"
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