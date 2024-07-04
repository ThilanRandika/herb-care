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
        <div className="customer-complete-my-orders-all-contents">
            <h2>Completed Orders</h2>
            {completedOrders.length === 0 ? (
                <p className="customer-complete-no-orders-message">No completed orders</p>
            ) : (
                completedOrders.map((order, index) => (
                    <div key={index} className="customer-complete-order-card">
                        <div className="customer-complete-order-card-header">
                            <h3>Order ID: {order.id}</h3>
                            <span>Status: {order.status}</span>
                        </div>
                        <div className="customer-complete-order-card-body">
                            <p><strong>Price:</strong> {order.price}</p>
                            <p><strong>Payment Method:</strong> {order.paymentMethod}</p>
                            <p><strong>Date:</strong> {new Date(order.date).toLocaleDateString()}</p>
                            {order.products.map((product, idx) => (
                                <div key={idx} className="customer-complete-order-product">
                                    {product.image ? (
                                        <img
                                            src={product.image.startsWith('http') ? product.image : require(`../../../../../BACKEND/uploads/${product.image}`)}
                                            className="customer-product-list-image"
                                            alt="Product"
                                            />
                                        ) : (
                                            <div className="no-image-available">
                                            No Image Available
                                            </div>
                                        )}
                                    <div className="customer-complete-order-product-details">
                                        <p><strong>Name:</strong> {product.productName}</p>
                                        <p><strong>Quantity:</strong> {product.quantity}</p>
                                    </div>
                                    <div className="customer-complete-order-card-footer">
                                        <Link to={`/Feedback&Complains/Feedback?orderId=${order.id}&productId=${product.productId}`}>
                                            <button className='customer-complete-FEEDandCOM_Dash4'>Feedback</button>
                                        </Link>
                                        <Link to={`/Feedback&Complains/Complaints?orderId=${order.id}&productId=${product.productId}`}>
                                            <button className='customer-complete-FEEDandCOM_Dash4'>Complaints</button>
                                        </Link>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                ))
            )}
        </div>
    );
}

export default CompletedOrders;
