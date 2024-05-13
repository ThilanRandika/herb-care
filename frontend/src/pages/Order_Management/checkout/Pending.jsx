import React, { useEffect, useState } from 'react'

function Pending() {

    const [orders, setOrders] = useState([]);

  useEffect(() => {
    fetchOrders();
  }, []);

  const fetchOrders = async () => {
    try {
      const response = await fetch('http://localhost:8070/Cart/allOrders'); // Assuming your backend API endpoint is '/api/orders'
      const data = await response.json();
      setOrders(data);
    } catch (error) {
      console.error('Error fetching orders:', error);
    }
  };

  return (
    <div>
      <h2>Orders</h2>
      <ul>
        {orders.map(order => (
          <li style={{margin:40}} key={order._id}>
            <div>
              <strong>Full Name:</strong> {order.fullName}
            </div>
            <div>
              <strong>Email:</strong> {order.email}
            </div>
            <div>
              <strong>Address:</strong> {order.address}
            </div>
            <div>
              <strong>City:</strong> {order.city}
            </div>
            <div>
              <strong>Zip:</strong> {order.zip}
            </div>
            <div>
              <strong>Country:</strong> {order.country}
            </div>
            <div>
              <strong>Total Price:</strong> {order.totalPrice}
            </div>
          </li>
        ))}
      </ul>
    </div>
  )
}

export default Pending