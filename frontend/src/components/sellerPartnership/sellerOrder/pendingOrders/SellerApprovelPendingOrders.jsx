import React, { useContext, useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import './sellerApprovelPendingOrders.css';
import axios from 'axios';
import { AuthContext } from '../../../../context/AuthContext';
import config from "../../../../config";

function SellerApprovelPendingOrders() {

    const [orders, setOrders] = useState([]);
    const { user } = useContext(AuthContext)

    useEffect(() => {
        axios.get(`${config.BASE_URL}/sellerOrder/sellerPendingOrders/${user.sellerId}`)
        .then((res) => {
            console.log(res.data);
            setOrders(res.data);
        })
        .catch((err) => {
            console.log(err)
        })
    } , []); // eslint-disable-line react-hooks/exhaustive-deps

    return (
        <div className="seller-approvel-pending-orders-container">
            <h2 className="seller-order-history-heading">Approval Pending Orders</h2>
            <table className="seller-order-history-table">
                <thead>
                    <tr>
                        <th className="seller-order-id">Order Id</th>
                        <th className="seller-order-price">Price</th>
                        <th className="seller-payment-method">Payment Method</th>
                        <th className="seller-order-status">Status</th>
                        <th className="seller-order-date">Date</th>
                        <th className="seller-order-actions">Actions</th>
                    </tr>
                </thead>
                <tbody>
                    {orders.map((order, index) => (
                        <tr key={index} className={`seller-order-row-${index}`}>
                            <td>{order.orderviewId}</td>
                            <td>{order.price}</td>
                            <td>{order.paymentMethod}</td>
                            <td className={`seller-order-status-${order.status.toLowerCase()}`}>{order.status}</td>
                            <td>{order.date}</td>
                            <td>
                                <Link to={`/sellerMainHome/singleOrder/${order.id}`} className="seller-view-order-link">
                                    View Order
                                </Link>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
}

export default SellerApprovelPendingOrders;