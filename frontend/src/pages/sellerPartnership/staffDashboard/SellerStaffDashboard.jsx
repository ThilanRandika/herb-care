import React from 'react'
import StaffSideBar from '../../../components/sellerPartnership/staffSidebar/StaffSideBar'
import { Route, Routes } from 'react-router-dom'
import StaffNewOrders from '../../../components/sellerPartnership/staff/newOrder/StaffNewOrders'
import StaffProcessingOrders from '../../../components/sellerPartnership/staff/processingOrders/StaffProcessingOrders'
import StaffReadyToDeliveryOrders from '../../../components/sellerPartnership/staff/readyToDelivery/StaffReadyToDeliveryOrders'
import StaffDeliveryOrders from '../../../components/sellerPartnership/staff/deliveryOrders/StaffDeliveryOrders'
import StaffCompleteOrders from '../../../components/sellerPartnership/staff/completeOrder/StaffCompleteOrders'

function SellerStaffDashboard() {
  return (
    <>
      <div className="container-fluid">
        <div className="row">
          <div className="col-lg-1">
            <StaffSideBar />
          </div>

          <div className="col-lg-11">
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
      </div>
    </>
  )
}

export default SellerStaffDashboard