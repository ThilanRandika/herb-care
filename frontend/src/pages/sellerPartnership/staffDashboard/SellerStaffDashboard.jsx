import React from 'react'
import StaffSideBar from '../../../components/sellerPartnership/staffSidebar/StaffSideBar'
import { Route, Routes } from 'react-router-dom'
import StaffNewOrders from '../../../components/sellerPartnership/staff/newOrder/StaffNewOrders'
import StaffProcessingOrders from '../../../components/sellerPartnership/staff/processingOrders/StaffProcessingOrders'
import StaffReadyToDeliveryOrders from '../../../components/sellerPartnership/staff/readyToDelivery/StaffReadyToDeliveryOrders'
import StaffDeliveryOrders from '../../../components/sellerPartnership/staff/deliveryOrders/StaffDeliveryOrders'
import StaffCompleteOrders from '../../../components/sellerPartnership/staff/completeOrder/StaffCompleteOrders'
import './sellerStaffDashboard.css'

function SellerStaffDashboard() {
  return (
    <>
      <div className="seller-staff-dashboard-container">
            <StaffSideBar />

          <div className="seller-staff-content-container">
            <Routes>
            <Route
                exact
                path="/newOrders"
                element={<StaffNewOrders />}
              />
              <Route
                path="/processingOrders"
                element={<StaffProcessingOrders />}
              />
              <Route exact path="/readyToDelivery" element={<StaffReadyToDeliveryOrders />} />
              <Route exact path="/deliveryOrders" element={<StaffDeliveryOrders />} />
              <Route exact path="/completeOrders" element={<StaffCompleteOrders />} />
            </Routes>
          </div>
      </div>
    </>
  )
}

export default SellerStaffDashboard