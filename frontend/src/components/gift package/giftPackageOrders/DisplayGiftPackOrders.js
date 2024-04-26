import React, { useState, useEffect } from "react";
import axios from "axios";
import "./DisplayGiftPackOrders.css";

function DisplayGiftPackOrders() {
  const [orders, setOrders] = useState([]);

  useEffect(() => {
    const fetchOrders = async () => {
      try {
        const response = await axios.get("http://localhost:8070/giftPackageOrder/displayGiftPackageOrders");
        setOrders(response.data);
      } catch (error) {
        console.error("Error fetching orders:", error);
      }
    };
    fetchOrders();
  }, []);

  const generateReport = () => {
    // Convert orders data to CSV format
    const csv = orders.map(order => {
      return `${order.customerId},${order.packageId},${order.totalPrice},${order.orderAddress},${order.createdAt},${order.payment},${order.orderStatus}`;
    }).join("\n");

    // Create a Blob object containing the CSV data
    const blob = new Blob([csv], { type: "text/csv" });

    // Create a download link and trigger the download
    const link = document.createElement("a");
    link.href = window.URL.createObjectURL(blob);
    link.download = "gift_package_orders.csv";
    link.click();
  };

  return (
    <div>
      <h3 className="GiftOrder-topic"><center>Gift Package Orders</center></h3>
      {orders.map((order) => (
        <div key={order._id} className="giftPackage-order-container">
          <p>Customer ID: {order.customerId}</p>
          <p>Package ID: {order.packageId}</p>
          <p>Total Price: {order.totalPrice}</p>
          <p>Order Address: {order.orderAddress}</p>
          <p>Order Placed date: {order.createdAt}</p>
          <p>Payment Status: {order.payment}</p>
          <p>Order Deliver Status: {order.orderStatus}</p>
        </div>
      ))}
      <div className="ReportDownload-button-container">
        <button onClick={generateReport} className="btn">Download Report</button>
      </div> 
    </div>
  );
}

export default DisplayGiftPackOrders;
