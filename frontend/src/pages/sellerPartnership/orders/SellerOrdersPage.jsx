import React from 'react'
import SellerApprovelPendingOrders from '../../../components/sellerPartnership/sellerOrder/pendingOrders/SellerApprovelPendingOrders'
import SellerOngoingOrders from '../../../components/sellerPartnership/sellerOrder/ongoingOrders/SellerOngoingOrders'
import SellerCompletedOrders from '../../../components/sellerPartnership/sellerOrder/completedOrders/SellerCompletedOrders'

function SellerOrdersPage() {
  return (
    <>
    <div>SellerOrdersPage</div>
    <SellerApprovelPendingOrders/>
    <SellerOngoingOrders/>
    <SellerCompletedOrders/>
    </>
  )
}

export default SellerOrdersPage