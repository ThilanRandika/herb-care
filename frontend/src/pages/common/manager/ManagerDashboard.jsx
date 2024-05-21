import React from 'react'
import { Link, Route, Routes } from 'react-router-dom'
import SellerManagerDashboard from '../../sellerPartnership/managerDashboard/SellerManagerDashboard'
import './managerDashboard.css'
import Inventory_Dashboard from '../../inventory/Inventory_Dashboard/Inventory_Dashboard'
import ManagerMainDashboard from './dashboard/ManagerMainDashboard'

function ManagerDashboard() {
  return (
    <>
    <div className='staffContainer'>

    <div className="main-staff-sidebar">
  <ul className="main-staff-sidebar-nav">
    <li className="main-staff-sidebar-item">
      <Link
        className="main-staff-sidebar-link"
        to={"/manager/Inventory_Dashboard"}
      >
        Inventory
      </Link>
    </li>
    <li className="main-staff-sidebar-item">
      <Link
        className="main-staff-sidebar-link"
        to={"/manager/SellerManagerDashboard/pendingSellerRequest"}
      >
        Seller
      </Link>
    </li>
  </ul>
</div>

      <Routes>
        <Route path="/sellerManagerDashboard/*" element={<SellerManagerDashboard />} />
        <Route path="/Inventory_Dashboard/*" element={<Inventory_Dashboard />} />
      </Routes>
    </div>
    </>
  )
}

export default ManagerDashboard