import React, { useEffect, useState } from 'react';
import './orderStaffNewOrders.css';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import config from '../../../../config';

function OrderStaffNewOrders() {

  const [openOrder, setOpenOrder] = useState(null);
  const [orders, setOrders] = useState([]);
  const navigator = useNavigate();

  useEffect(() => {
      axios.get(`${config.BASE_URL}/order/getAllPendingOrders`)
          .then((res) => {
              console.log(res.data);
              setOrders(res.data);
          });
  }, []);

  const toggleOrderDetails = (order) => {
      if (openOrder === order) {
          setOpenOrder(null);
      } else {
          setOpenOrder(order);
      }
  };

  const handleAcceptOrder = (id) => {
      axios.put(`${config.BASE_URL}/order/setOrderToProcessing/` + id)
          .then((res) => {
              alert("The Order has been accepted");
              console.log(res.data);
              window.location.reload();
          })
          .catch((err) => {
              console.log(err);
          });
  };

  // const handleRejectOrder = (id) => {
  //     axios.delete(`${config.BASE_URL}/sellerOrder/rejectPendingOrder/` + id)
  //         .then((res) => {
  //             alert("The Order has been rejected");
  //             console.log(res.data);
  //             window.location.reload();
  //         })
  //         .catch((err) => {
  //             console.log(err);
  //         });
  // };

  return (
    <div className="staffNewOrders-container">
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
                                <td className="staffNewOrders-td">{order.userId}</td>
                                <td className="staffNewOrders-td">{order.date}</td>
                                <td className="staffNewOrders-td">{order.price}</td>
                                <td className="staffNewOrders-td">{order.status}</td>
                                <td className="staffNewOrders-td">
                                    <button className="staffNewOrders-button">View order</button>
                                    <span>{openOrder === order ? '^' : '>'}</span>
                                </td>
                            </tr>
                            {openOrder === order && (
                                <tr>
                                    <td colSpan="6">
                                        <table className="staffNewOrders-detailsTable">
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
                                                            <td className="staffNewOrders-detailsTd">{orderDetail.productName}</td>
                                                            <td className="staffNewOrders-detailsTd">{orderDetail.quantity}</td>
                                                            <td className="staffNewOrders-detailsTd">{orderDetail.price}</td>
                                                            <td className="staffNewOrders-detailsTd">{orderDetail.totalPrice}</td>
                                                        </tr>
                                                    ))}
                                            </tbody>
                                            <tfoot>
                                                <tr className="staffNewOrders-totalRow">
                                                    <td colSpan="3">Total Price</td>
                                                    <td className="staffNewOrders-detailsTd">{order.price}</td>
                                                </tr>
                                                <tr>
                                                    <td colSpan="4">
                                                        <div className="staffNewOrders-buttonContainer">
                                                            <button
                                                                className="staffNewOrders-acceptButton staffNewOrders-button"
                                                                onClick={() => handleAcceptOrder(order.id)}
                                                            >
                                                                Accept
                                                            </button>
                                                        </div>
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
  )
}

export default OrderStaffNewOrders  