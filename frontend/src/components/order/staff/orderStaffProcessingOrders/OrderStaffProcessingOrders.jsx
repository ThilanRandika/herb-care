import React, { useContext, useEffect, useState } from 'react';
import './orderStaffProcessingOrders.css';
import axios from 'axios';
import { Link, useNavigate } from 'react-router-dom';
import config from '../../../../config';
import { AuthContext } from '../../../../context/AuthContext';

function OrderStaffProcessingOrders() {

    const [openOrder, setOpenOrder] = useState(null);
    const [orders, setOrders] = useState([]);
    const navigator = useNavigate();

    useEffect(() => {
        axios.get(`${config.BASE_URL}/order/getAllProcessingOrders`)
            .then((res) => {
                console.log(res.data);
                setOrders(res.data);
            })
            .catch((err) => {
                console.log(err);
            });
    }, []); // eslint-disable-line react-hooks/exhaustive-deps

    const toggleOrderDetails = (order) => {
        setOpenOrder(openOrder === order ? null : order);
    };

    const handleCompleteProcess = (id) => {
        axios.put(`${config.BASE_URL}/Order/setOrderToReadyToDelivery/${id}`)
            .then((res) => {
                alert("The Order has been ready to delivery");
                console.log(res.data);
                window.location.reload();
            })
            .catch((err) => {
                console.log(err);
            });
    };

    return (
        <div className="seller-processing-order-container">
            <table className="seller-processing-order-table">
                <thead>
                    <tr>
                        <th>Order Id</th>
                        <th>Customer</th>
                        <th>Date</th>
                        <th>Price</th>
                        <th>Status</th>
                        <th>Action</th>
                    </tr>
                </thead>
                <tbody>
                    {orders.map((order) => (
                        <React.Fragment key={order.id}>
                            <tr onClick={() => toggleOrderDetails(order)}>
                                <td>{order.id}</td>
                                <td>{order.userId}</td>
                                <td>{order.date}</td>
                                <td>{order.price}</td>
                                <td>{order.status}</td>
                                <td>
                                    <button>View order</button>
                                    <span>{openOrder === order ? '^' : '>'}</span>
                                </td>
                            </tr>
                            {openOrder === order && (
                                <tr>
                                    <td colSpan="6">
                                        <table className="seller-processing-order-details">
                                            <thead>
                                                <tr>
                                                    <th>Product Name</th>
                                                    <th>Quantity</th>
                                                    <th>Price</th>
                                                    <th>Total Price</th>
                                                </tr>
                                            </thead>
                                            <tbody>
                                                {order.orderDetails && order.orderDetails.map((orderDetail) => (
                                                    <tr key={orderDetail.productName}>
                                                        <td>{orderDetail.productName}</td>
                                                        <td>{orderDetail.quantity}</td>
                                                        <td>{orderDetail.price}</td>
                                                        <td>{orderDetail.totalPrice}</td>
                                                    </tr>
                                                ))}
                                            </tbody>
                                            <tfoot>
                                                <tr>
                                                    <td colSpan="3">Total Price</td>
                                                    <td>{order.price}</td>
                                                </tr>
                                                <tr>
                                                    <td colSpan="4">
                                                        <button
                                                            className="seller-processing-order-button"
                                                            onClick={() => handleCompleteProcess(order.id)}
                                                        >
                                                            Ready To Delivery
                                                        </button>
                                                    </td>
                                                </tr>
                                            </tfoot>
                                        </table>
                                    </td>
                                </tr>
                            )}
                        </React.Fragment>
                    ))}
                </tbody>
            </table>
        </div>
    );
}

export default OrderStaffProcessingOrders  