import React from 'react'
import './sellerOrdersPage.css'
import SellerApprovelPendingOrders from '../../../components/sellerPartnership/sellerOrder/pendingOrders/SellerApprovelPendingOrders'
import SellerOngoingOrders from '../../../components/sellerPartnership/sellerOrder/ongoingOrders/SellerOngoingOrders'
import SellerCompletedOrders from '../../../components/sellerPartnership/sellerOrder/completedOrders/SellerCompletedOrders'

function SellerOrdersPage() {
  return (
    <>
    <div className='seller-OrdersPage'>SellerOrdersPage
    <SellerApprovelPendingOrders/>
    <SellerOngoingOrders/>
    <SellerCompletedOrders/>
    </div>
    </>
  )
}

export default SellerOrdersPage