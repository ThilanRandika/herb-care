import { useState, useEffect, useContext } from 'react';
import axios from 'axios';
import { AuthContext } from '../../../context/AuthContext';
import './completeOrders.css';
import { Link } from 'react-router-dom';
import config from '../../../config';

function CompletedOrders() {
    const { user } = useContext(AuthContext);
    const [completedOrders, setCompletedOrders] = useState([]);

    useEffect(() => {
        const fetchCompletedOrders = async () => {
            try {
                const response = await axios.get(`${config.BASE_URL}/order/getCompleteOrdersForUser/${user._id}`);
                setCompletedOrders(response.data);
            } catch (error) {
                console.error('Error fetching completed orders:', error);
            }
        };

        fetchCompletedOrders();
    }, [user._id]);

    return (
        <div className="my-orders-all-contents">
            <h2>Completed Orders</h2>
            {completedOrders.length === 0 ? (
                <p className="no-orders-message">No completed orders</p>
            ) : (
                <table className="customer-complete-order-history-table">
                    <thead>
                        <tr>
                            <th className="customer-complete-order-id">Order Id</th>
                            <th className="customer-complete-order-price">Price</th>
                            <th className="customer-complete-payment-method">Payment Method</th>
                            <th className="customer-complete-order-status">Status</th>
                            <th className="customer-complete-order-date">Date</th>
                            <th className="customer-complete-order-actions">Invoice</th>
                            <th className="customer-complete-order-actions">Actions</th>
                        </tr>
                    </thead>
                    <tbody>
                        {completedOrders.map((order, index) => (
                            <tr key={index} className={`customer-complete-order-row-${index}`}>
                                <td>{order._id}</td>
                                <td>{order.price}</td>
                                <td>{order.paymentMethod}</td>
                                <td className={`customer-complete-order-status-${order.status.toLowerCase()}`}>{order.status}</td>
                                <td>{new Date(order.datePlaced).toLocaleDateString()}</td>
                                <td>
                                    {/* Add logic for invoice if needed */}
                                </td>
                                <td>
                                    <div className="my-orders-order-actions-fc">
                                        <Link to={`/Feedback&Complains/Feedback?orderId=${order._id}&productId=${order.productId}`}>
                                            <button className='FEEDandCOM_Dash4'>Feedback</button>
                                        </Link>
                                        <Link to={`/Feedback&Complains/Complaints?orderId=${order._id}&productId=${order.productId}`}>
                                            <button className='FEEDandCOM_Dash4'>Complaints</button>
                                        </Link>
                                    </div>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            )}
        </div>
    );
}

export default CompletedOrders;
