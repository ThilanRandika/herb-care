import axios from 'axios';
import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom';

function StaffDeliveryOrders() {
    const [openOrder, setOpenOrder] = useState(null);
    const [orders, setOrders] = useState([]);
    const navigator = useNavigate();

    useEffect(() => {
        axios.get('http://localhost:8070/sellerOrder/onDeliveryOrders')
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


  const handleCompletedProcess = (id)=> {
    axios.put('http://localhost:8070/sellerOrder/completed/' + id)
    .then((res) =>{
        alert("The Order has been completed");
        console.log(res.data)
        window.location.reload();
    })
    .catch((err) => {
        console.log(err)
    })
  }


  return (
    <table>
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
                            className="acceptButton"
                            onClick={() => handleCompletedProcess(order.id)}
                          >
                            Ordered Completed
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

export default StaffDeliveryOrders