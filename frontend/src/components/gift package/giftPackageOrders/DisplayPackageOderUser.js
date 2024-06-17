import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './DisplayPackageOderUser.css';
import { Link } from 'react-router-dom';
import config from "../../../config";

const OrderDisplay = () => {
  const [orders, setOrders] = useState([]);

  useEffect(() => {
    const fetchOrders = async () => {
      try {
        const response = await axios.get(`${config.BASE_URL}/giftPackageOrder/orders`);
        setOrders(response.data.orders);
      } catch (error) {
        console.error('Failed to fetch orders:', error);
      }
    };

    fetchOrders();
  }, []);

  const handleCancelOrder = async (orderId) => {
    try {
      await axios.delete(`${config.BASE_URL}/giftPackageOrder/cancelGiftPackageOrders/${orderId}`);
      // Update the orders state after deletion
      setOrders(prevOrders => prevOrders.filter(order => order._id !== orderId));
    } catch (error) {
      console.error('Failed to cancel order:', error);
    }
  };

  return (
    <div>
      
      <h2 className='DPOU_ti'>Your Orders</h2>
      <ul className='DPOU_ULL'>
        {orders.map(order => (
          <li key={order._id}>
            <p className='DPOU_Oname'>Order Name: {order.orderName}</p>
            <p className='DPOU_Oraddre'>Order Address: {order.orderAddress}</p>
            <p className='DPOU_orare'>Area: {order.area}</p>
            <p className='DPOU_orpos'>Postal Code: {order.postalCode}</p>
            <p className='DPOU_ormob'>Mobile Number: {order.mobileNum}</p>
            <p className='DPOU_ormeth'>Payment Method: {order.paymentMethod}</p>
            <p className='DPOU_ortoAm'>Total Amount: {order.totalAmount}</p>
            <p className='DPOU_orpaysta'>Payment Status: {order.payment}</p>
            <p className='DPOU_orsta'>Order Status: {order.orderStatus}</p>
            <button className='DPOU_canbtn' onClick={() => handleCancelOrder(order._id)}>Cancel Order</button>

            <Link to={`/Feedback&Complains/FeedbackGiftPackage?giftPackageOrder=${order._id}&packageId=${order.packageId}`}>
                  <button className='DPOU_canbtn'>Feedbacks</button>
            </Link>

          </li>
        ))}
      </ul>
      
    </div>
  );
};

export default OrderDisplay;
