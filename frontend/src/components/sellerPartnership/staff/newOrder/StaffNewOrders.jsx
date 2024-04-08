import React, { useEffect, useState } from 'react'
import './staffNewOrders.css'
import axios from 'axios';
import { useNavigate } from 'react-router-dom';


function StaffNewOrders() {

    const [openOrder, setOpenOrder] = useState(null);
    const [orders, setOrders] = useState([]);
    const navigator = useNavigate();

    useEffect(() => {
        axios.get('http://localhost:8070/sellerOrder/pendingOrders')
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


  const handleAcceptOrder = (id)=> {
    axios.put('http://localhost:8070/sellerOrder/acceptOrder/' + id)
    .then((res) =>{
        alert("The Order has been accepted");
        console.log(res.data)
        window.location.reload();
    })
    .catch((err) => {
        console.log(err)
    })
  }

  const handleRejectOrder = (id) => {
    axios.delete('http://localhost:8070/sellerOrder/rejectPendingOrder/' + id)
    .then((res) => {
        alert("The Order has been rejected")
        console.log(res.data)
        window.location.reload();
    })
    .catch((err) => {
        console.log(err)
    })
  }

  return (
    <table className="staffNewOrders-table">
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
                            <td className="staffNewOrders-td">{order.id}</td>
                            <td className="staffNewOrders-td">{order.customer}</td>
                            <td className="staffNewOrders-td">{order.date}</td>
                            <td className="staffNewOrders-td">{order.price}</td>
                            <td className="staffNewOrders-td">{order.status}</td>
                            <td className="staffNewOrders-td">
                                <button>View order</button>
                                <span>{openOrder === order ? '^' : '>'}</span>
                            </td>
                        </tr>
                        {openOrder === order && (
                            <tr>
                                <td colSpan="6">
                                    <table>
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
                                                        <td className="staffNewOrders-td">{orderDetail.productName}</td>
                                                        <td className="staffNewOrders-td">{orderDetail.quantity}</td>
                                                        <td className="staffNewOrders-td">{orderDetail.price}</td>
                                                        <td className="staffNewOrders-td">{orderDetail.totalPrice}</td>
                                                    </tr>
                                                ))}
                                        </tbody>
                                        <tfoot>
                                            <tr>
                                                <td colSpan="3">Total Price</td>
                                                <td className="staffNewOrders-td">{order.price}</td>
                                            </tr>
                                            <tr>
                                                <td colSpan="3">
                                                    <button
                                                        className="staffNewOrders-acceptButton"
                                                        onClick={() => handleAcceptOrder(order.id)}
                                                    >
                                                        Accept
                                                    </button>
                                                </td>
                                                <td>
                                                    <button
                                                        className="staffNewOrders-rejectButton"
                                                        onClick={() => handleRejectOrder(order.id)}
                                                    >
                                                        Reject
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

export default StaffNewOrders