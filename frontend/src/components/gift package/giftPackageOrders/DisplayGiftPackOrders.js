import React, { useState, useEffect } from "react";
import axios from "axios";
import "./DisplayGiftPackOrders.css";

function DisplayGiftPackOrders() {
  const [orders, setOrders] = useState([]);

  useEffect(() => {
    const fetchOrders = async () => {
      try {
        const response = await axios.get('http://localhost:8070/giftPackageOrder/displayGiftPackageOrders');
        setOrders(response.data);
      } catch (error) {
        console.error("Error fetching orders:", error);
      }
    };
    fetchOrders();
  }, []);

  const updateOrderStatus = async (orderId, newStatus, newPaymentStatus) => {
    try {
      await axios.put(
        `http://localhost:8070/giftPackageOrder/updateStatus/${orderId}`,
        { newStatus, newPaymentStatus }
      );
      // Refresh the orders list after updating status
      const response = await axios.get('http://localhost:8070/giftPackageOrder/displayGiftPackageOrders');
      setOrders(response.data);
    } catch (error) {
      console.error("Error updating order status:", error);
      alert("Failed to update order status. Please try again.");
    }
  };

  const generateReport = () => {
    // Convert orders data to CSV format
    const csv = orders.map(order => {
      return `${order.customer.customer_name},${order.packageId.packageName},${order.totalAmount},${order.orderAddress},${order.createdAt},${order.payment},${order.orderStatus}`;
    }).join("\n");

    // Create a Blob object containing the CSV data
    const blob = new Blob([csv], { type: "text/csv" });

    // Create a download link and trigger the download
    const link = document.createElement("a");
    link.href = window.URL.createObjectURL(blob);
    link.download = "gift_package_orders.csv";
    link.click();
  };

  const cancelOrder = async (orderId) => {
    try {
      await axios.delete(`http://localhost:8070/giftPackageOrder/cancelGiftPackageOrders/${orderId}`);
      const updatedOrders = orders.filter(order => order._id !== orderId);
      setOrders(updatedOrders);
    } catch (error) {
      console.error("Error cancelling order:", error);
      alert("Failed to cancel order. Please try again.");
    }
  };

  return (
    <div>
      <h3 className="GiftOrder-topic"><center>Gift Package Orders</center></h3>
      {orders.map((order) => (
        <div key={order._id} className="giftPackage-order-container">
          <p>Order Name: {order.orderName}</p>
          <p>Order Address: {order.orderAddress}</p>
          <p>Area: {order.area}</p>
          <p>Postal Code: {order.postalCode}</p>
          <p>Mobile Number: {order.mobileNum}</p>
          <p>Payment Method: {order.paymentMethod}</p>
          <p>Total Amount: {order.totalAmount}</p>
          <p>Order Placed date: {new Date(order.createdAt).toLocaleDateString()}</p>
          <p>Order Placed time: {new Date(order.createdAt).toLocaleTimeString()}</p>
          <p>Payment Status: {order.payment}</p>
          <select
            value={order.payment}
            onChange={(e) => updateOrderStatus(order._id, order.orderStatus, e.target.value)}
          >
            <option value="Pending">Pending</option>
            <option value="Delivered">Delivered</option>
            <option value="Done">Done</option>
          </select>
          <br></br><br></br>
          <p>Order Deliver Status: {order.orderStatus}</p>
          <select
            value={order.orderStatus}
            onChange={(e) => updateOrderStatus(order._id, e.target.value, order.payment)}
          >
            <option value="pending">Pending</option>
            <option value="processing">Processing</option>
            <option value="completed">Completed</option>
            <option value="delivered">Delivered</option>
          </select>
          <button onClick={() => cancelOrder(order._id)} className="cancel-btn">Cancel Order</button>
        </div>
      ))}
      <div className="ReportDownload-button-container">
        <button onClick={generateReport} className="btn">Download Report</button>
      </div>
    </div>
  );
}

export default DisplayGiftPackOrders;
