import React, { useContext, useEffect, useState } from 'react';
import './orderStaffCompletedOrders.css';
import axios from 'axios';
import { Link, useNavigate } from 'react-router-dom';
import config from '../../../../config';

function OrderStaffCompletedOrders() {

    const [openOrder, setOpenOrder] = useState(null);
    const [orders, setOrders] = useState([]);
    const navigator = useNavigate();

    useEffect(() => {
        axios.get(`${config.BASE_URL}/Order/getAllCompletedOrders`)
            .then((res) => {
                console.log(res.data)
                setOrders(res.data);
            })
    }, []); // eslint-disable-line react-hooks/exhaustive-deps

    const toggleOrderDetails = (order) => {
        if (openOrder === order) {
            setOpenOrder(null);
        } else {
            setOpenOrder(order);
        }
    };

    return (
        <table className="seller-complete-order-table">
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
                                <button className='seller-complete-order-button'>View order</button>
                                <span className='seller-complete-order-toggleArrow'>{openOrder === order ? '^' : '>'}</span>
                            </td>
                        </tr>
                        {openOrder === order && (
                            <tr>
                                <td colSpan="6">
                                    <table className="seller-complete-order-orderDetails">
                                        <thead>
                                            <tr>
                                                <th>Product Name</th>
                                                <th>Quantity</th>
                                                <th>Price</th>
                                                <th>Total Price</th>
                                            </tr>
                                        </thead>
                                        <tbody>
                                            {order.orderDetails &&
                                                order.orderDetails.map((orderDetail) => (
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
                                        </tfoot>
                                    </table>
                                </td>
                            </tr>
                        )}
                    </React.Fragment>
                ))}
            </tbody>
        </table>
    );
}

export default OrderStaffCompletedOrders  