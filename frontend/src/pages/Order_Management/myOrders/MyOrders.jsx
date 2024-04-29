import { useState, useEffect, useContext } from 'react';
import axios from 'axios';
import { AuthContext } from '../../../context/AuthContext';
import './myOrders.css';

function MyOrders() {
    const { user } = useContext(AuthContext);
    const [orders, setOrders] = useState([]);

    useEffect(() => {
        const fetchOrders = async () => {
            try {
                const response = await axios.get(`http://localhost:8070/order/getOrdersForUser/${user._id}`);
                setOrders(response.data);
            } catch (error) {
                console.error('Error fetching orders:', error);
            }
        };

        fetchOrders();
    }, [user.userId]);



    const cancelOrder = async (orderId) => {
        try {
            await axios.put(`http://localhost:8070/order/cancelOrder/${orderId}`);
            // Refetch orders after cancellation
            const response = await axios.get(`http://localhost:8070/order/getOrdersForUser/${user._id}`);
            setOrders(response.data);
        } catch (error) {
            console.error('Error cancelling order:', error);
        }
    };


    return (
        <div className="my-orders-all-contents">
            <h2>My Orders</h2>
            <div className="my-orders-order-list">
                {orders.map(order => (
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
                                <button>Add Feedback</button>
                                <button>Add Complaint</button>
                            </div>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
}

export default MyOrders;
