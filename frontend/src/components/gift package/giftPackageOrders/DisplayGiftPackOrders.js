import React, { useState, useEffect } from "react";
import axios from "axios";
import "./DisplayGiftPackOrders.css";

function DisplayGiftPackOrders() {
  const [orders, setOrders] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");

  const searchorders = (orders) => {
    if (!searchQuery) {
      return true; // Show all feedbacks if search query is empty
    }

    const customerName = orders.area.toLowerCase();
    return customerName.includes(searchQuery.toLowerCase());
  };

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
      <br></br>
      <div className="GiftOrder_title_card">
        <h3 className="GiftOrder_title"><center>Gift Package Orders</center></h3>
        <p className="GiftOrder_title">Manage customer orders</p>
      </div>
      <input className='GiftOrder_seching' type="text" placeholder="Search Area...." value={searchQuery} onChange={(e) => setSearchQuery(e.target.value)}/>
      {orders.filter(searchorders).map((order) => (
        <div key={order._id} className="giftPackage-order-container">
          <p><b>Order Name:</b> {order.orderName}</p>
          <p><b>Order Address:</b> {order.orderAddress}</p>
          <p><b>Area:</b> {order.area}</p>
          <p><b>Postal Code:</b> {order.postalCode}</p>
          <p><b>Mobile Number:</b> {order.mobileNum}</p>
          <p><b>Payment Method:</b> {order.paymentMethod}</p>
          <p><b>Total Amount:</b> {order.totalAmount}</p>
          <p><b>Order Placed date:</b> {new Date(order.createdAt).toLocaleDateString()}</p>
          <p><b>Order Placed time:</b> {new Date(order.createdAt).toLocaleTimeString()}</p>
          <p><b>Payment Status:</b> {order.payment}</p>
          <select
            value={order.payment}
            onChange={(e) => updateOrderStatus(order._id, order.orderStatus, e.target.value)}
          >
            <option value="Pending">Pending</option>
            <option value="Delivered">Delivered</option>
            <option value="Done">Done</option>
          </select>
          <br></br><br></br>
          <p><b>Order Deliver Status:</b> {order.orderStatus}</p>
          <select
            value={order.orderStatus}
            onChange={(e) => updateOrderStatus(order._id, e.target.value, order.payment)}
          >
            <option value="pending">Pending</option>
            <option value="processing">Processing</option>
            <option value="completed">Completed</option>
            <option value="delivered">Delivered</option>
          </select>

          <div className="GiftOrder_card_btn">

              <button onClick={() => cancelOrder(order._id)} className="cancel-btn">Cancel Order</button>
          </div>

        </div>
      ))}
      <div className="ReportDownload-button-container">
        <button onClick={generateReport} className="btn">Download Full Report</button>
      </div>
    </div>
  );
}

export default DisplayGiftPackOrders;
