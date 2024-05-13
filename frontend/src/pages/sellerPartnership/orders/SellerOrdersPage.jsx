import React from 'react'
import './sellerOrdersPage.css'
import SellerApprovelPendingOrders from '../../../components/sellerPartnership/sellerOrder/pendingOrders/SellerApprovelPendingOrders'
import SellerOngoingOrders from '../../../components/sellerPartnership/sellerOrder/ongoingOrders/SellerOngoingOrders'
import SellerCompletedOrders from '../../../components/sellerPartnership/sellerOrder/completedOrders/SellerCompletedOrders'
import { Route, Routes } from 'react-router-dom'

function SellerOrdersPage() {
  return (
    <>
    <div className='seller-OrdersPage'>
    {/* <SellerApprovelPendingOrders/>
    <SellerOngoingOrders/>
    <SellerCompletedOrders/> */}
    <Routes>
      <Route path="/pending" element={<SellerApprovelPendingOrders/>}/>
      <Route path="/processing" element={<SellerOngoingOrders/>}/>
      <Route path="/completed" element={<SellerCompletedOrders/>}/>
    </Routes>
    </div>
    </>
  )
}

export default SellerOrdersPage