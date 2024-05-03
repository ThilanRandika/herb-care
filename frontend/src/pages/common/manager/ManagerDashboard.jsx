import React from 'react'
import { Link, Route, Routes } from 'react-router-dom'
import SellerManagerDashboard from '../../sellerPartnership/managerDashboard/SellerManagerDashboard'

function ManagerDashboard() {
  return (
    <>
    <div>ManagerDashboard</div>
    <Routes>
      <Route path="/sellerManagerDashboard/*" element={<SellerManagerDashboard/>} />
    </Routes>
    </>
  )
}

export default ManagerDashboard