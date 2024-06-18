import { useState, useEffect, useContext } from 'react';
import axios from 'axios';
import { AuthContext } from '../../../context/AuthContext';
import './customerongoingOrders.css';
import { Link } from 'react-router-dom';
import config from '../../../config';

function CustomerOngoingOrders() {


    const { user } = useContext(AuthContext);
    const [orders, setOrders] = useState([]);
    const [completedOrdersCount, setCompletedOrdersCount] = useState(0);
    const [cancelledOrdersCount, setCancelledOrdersCount] = useState(0);

    useEffect(() => {
        const fetchOrders = async () => {
            try {
                const response = await axios.get(`${config.BASE_URL}/order/getOngoingOrdersForUser/${user._id}`);
                setOrders(response.data.ongoingOrders);
                console.log(response.data)
                setCompletedOrdersCount(response.data.completedOrdersCount);
                setCancelledOrdersCount(response.data.cancelledOrdersCount);
            } catch (error) {
                console.error('Error fetching orders:', error);
            }
        };

        fetchOrders();
    }, [user.__Id]);



    const cancelOrder = async (orderId) => {
        try {
            await axios.put(`${config.BASE_URL}/order/cancelOrder/${orderId}`);
            // Refetch orders after cancellation
            const response = await axios.get(`${config.BASE_URL}/order/getOrdersForUser/${user._id}`);
            setOrders(response.data);
        } catch (error) {
            console.error('Error cancelling order:', error);
        }
    };


  return (
    <>
        <h2 className='customer-ongoing-order-header'>My Orders</h2>
        <div className="my-ongoing-orders-all-contents">
            {/* <div className="my-orders-order-list"> */}

            <div className="order-summary-boxes">
                <div className="order-summary-box">
                    <p>Complete Orders</p>
                    <h3>{completedOrdersCount}</h3>
                </div>
                <div className="order-summary-box">
                    <p>Cancellations</p>
                    <h3>{cancelledOrdersCount}</h3>
                </div>
            </div>

            <div className='customer-ongoing-order-container'>
            {orders.length === 0 ? (
                <p className="no-orders-message">No ongoing orders...</p>
            ) : (
            <table className="customer-order-history-table">
                <thead>
                    <tr>
                        <th className="customer-order-id">Order Id</th>
                        <th className="customer-order-price">Price</th>
                        <th className="customer-payment-method">Payment Method</th>
                        <th className="customer-order-status">Status</th>
                        <th className="customer-order-date">Date</th>
                        <th className="customer-order-actions">Invoice</th>
                        <th className="customer-order-actions">Actions</th>
                    </tr>
                </thead>
                <tbody>
                {/* {orders.map(order => (
                    <div key={order.orderId} className="my-orders-order">
                        <p>Order ID: {order.orderId}</p>
                        <p>Product ID: {order.productId}</p>
                        <p>Quantity: {order.quantity}</p>
                        <p>Date Placed: {new Date(order.datePlaced).toLocaleDateString()}</p>
                        <p>Username: {order.username}</p>
                        <p>Shipping Address: {order.shippingAddress}</p>
                        <p>Contact Number: {order.contactNumber}</p>
                        <p>Status: {order.status}</p>
                        <div className="my-orders-order-actions">
                            <button onClick={() => cancelOrder(order._id)}>Cancel Order</button>
                            <div className="my-orders-order-actions-fc">

                            <Link to={`/Feedback&Complains/Feedback?orderId=${order._id}&productId=${order.productId}`}>
                                <button className='FEEDandCOM_Dash4'>Feedback</button>
                            </Link>
                            <Link to={`/Feedback&Complains/Complaints?orderId=${order._id}&productId=${order.productId}`}>
                                <button className='FEEDandCOM_Dash4'>Complaints</button>
                            </Link>
                            
                            </div>
                        </div>
                    </div> */}


                    
                    {orders.map((order, index) => (
                        <tr key={index} className={`customer-order-row-${index}`}>
                            <td>{order.id}</td>
                            <td>{order.price}</td>
                            <td>{order.paymentMethod}</td>
                            <td className={`customer-order-status-${order.status.toLowerCase()}`}>{order.status}</td>
                            <td>{order.date}</td>
                            <td>
                                {/* <span className="customer-view-order-invoice" onClick={() => handleGenerateOrderInvoice(order.id)}>get invoice</span> */}
                            </td>
                            <td>
                                <Link to={`/customerOneOrder/${order.id}`} className="seller-view-order-link">
                                    View
                                </Link>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
             )}
            </div>
        </div>

        </>
  )
}

export default CustomerOngoingOrders