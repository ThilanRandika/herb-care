import axios from 'axios';
import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom';

function SellerOngoingOrders() {
    const [orders, setOrders] = useState([]);

    useEffect(() => {
        axios.get('http://localhost:8070/sellerOrder/ongoingOrders')
        .then((res) => {
            console.log(res.data);
            setOrders(res.data);
        })
        .catch((err) => {
            console.log(err)
        })
    } , []); // eslint-disable-line react-hooks/exhaustive-deps

    return (
        <div className="seller-approvel-pending-orders">
            <h2>Ongoing Orders</h2>
            <table>
                <thead>
                    <tr>
                        <th>Order Id</th>
                        <th>Price</th>
                        <th>Payment Method</th>
                        <th>Status</th>
                        <th>Date</th>
                        <th>Actions</th>
                    </tr>
                </thead>
                <tbody>
                    {orders.map((order) => (
                        <tr key={order.id}>
                            <td>{order.id}</td>
                            <td>{order.price}</td>
                            <td>{order.paymentMethod}</td>
                            <td className={`order-status-${order.status.toLowerCase()}`}>{order.status}</td>
                            <td>{order.date}</td>
                            <td>
                                {console.log(order.id)}
                                <Link to={`/sellerMainHome/singleOrder/${order.id}`} className="view-order-link">
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

export default SellerOngoingOrders