import React from 'react'
import { Link, Route, Routes } from 'react-router-dom'
import ManagePackages from './ManagePackages'
import StaffDashboard from './StaffDashboard'
import ManageServices from './ManageServices'
import StaffHolidayBookings from './StaffHolidayBookings'

function StaffInterfaceHolidayPackages() {
  return (
    <div>

      <div className="seller-staff-sidebar">
        <ul className="seller-staff-sidebar-nav">
          <li className="seller-staff-sidebar-item">
            <Link
              className="seller-staff-sidebar-link"
              to={"/staff/staffHolidayPackages/"}
              aria-current="page"
            >
              Holiday Packages Dashboard
            </Link>
          </li>
          <li className="seller-staff-sidebar-item">
            <Link
              className="seller-staff-sidebar-link"
              to={"/staff/staffHolidayPackages/managePackages/"}
            >
              Manage Packages
            </Link>
          </li>
          <li className="seller-staff-sidebar-item">
            <Link
              className="seller-staff-sidebar-link"
              to={"/staff/staffHolidayPackages/manageServices/"}
            >
              Manage Services
            </Link>
          </li>
          <li className="seller-staff-sidebar-item">
            <Link
              className="seller-staff-sidebar-link"
              to={"/staff/staffHolidayPackages/holidayBookings/"}
            >
              Holiday Bookings
            </Link>
          </li>
          
        </ul>
      </div>


        <Routes>
            <Route path="/" element={<StaffDashboard />} />
            <Route path="/managePackages" element={<ManagePackages />}></Route>
            <Route path="/manageServices" element={<ManageServices />}></Route>
            <Route path="/holidayBookings" element={<StaffHolidayBookings />}></Route>
      </Routes>
    </div>
  )
}

export default StaffInterfaceHolidayPackages