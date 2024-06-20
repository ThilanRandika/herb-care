import axios from 'axios';
import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom';
import './staffReadyToDeliveryOrders.css'
import config from "../../../../config";

function StaffReadyToDeliveryOrders() {
    const [openOrder, setOpenOrder] = useState(null);
    const [orders, setOrders] = useState([]);
    const navigator = useNavigate();

    useEffect(() => {
        axios.get(`${config.BASE_URL}/sellerOrder/readyToDeliveryOrders`)
            .then((res)=> {
                console.log(res.data)
                setOrders(res.data);
            })
    } , []); // eslint-disable-line react-hooks/exhaustive-deps

    const toggleOrderDetails = (order) => {
        if (openOrder === order) {
            setOpenOrder(null);
        } else {
            setOpenOrder(order);
        }
    };

    const handleDeliveryProcess = (id)=> {
        axios.put(`${config.BASE_URL}/sellerOrder/onDelivery/` + id)
            .then((res) =>{
                alert("The Order has been delivery");
                console.log(res.data)
                window.location.reload();
            })
            .catch((err) => {
                console.log(err)
            })
    };

    return (
        <table className="seller-readyToDeli-order-table">
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
                            <td>{order.customer}</td>
                            <td>{order.date}</td>
                            <td>{order.price}</td>
                            <td>{order.status}</td>
                            <td>
                                <button className="seller-readyToDeli-order-button">View order</button>
                                <span className="seller-readyToDeli-order-toggleArrow">{openOrder === order ? '^' : '>'}</span>
                            </td>
                        </tr>
                        {openOrder === order && (
                            <tr>
                                <td colSpan="6">
                                    <table className="seller-readyToDeli-order-orderDetails">
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
                                            <tr>
                                                <td colSpan="3">
                                                    <button
                                                        className="seller-readyToDeli-order-button acceptButton"
                                                        onClick={() => handleDeliveryProcess(order.id)}
                                                    >
                                                        Send To Delivery
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
    );
}

export default StaffReadyToDeliveryOrders;
