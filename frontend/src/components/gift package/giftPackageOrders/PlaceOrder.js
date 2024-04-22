// PlaceOrder.js

import React, { useState } from "react";
import axios from "axios";

function PlaceOrder({ packageDetails, customerDetails }) {
  const [orderAddress, setOrderAddress] = useState("");

  const handleAddressChange = (e) => {
    setOrderAddress(e.target.value);
  };

  const handleCheckout = async () => {
    try {
      const response = await axios.post("http://localhost:8070/giftPackageOrder/addGiftPackageOrders", {
        customerId: customerDetails._id,
        packageId: packageDetails._id,
        orderAddress: orderAddress
      });
      alert("Your order has been created!");
      // Redirect to payment page or display payment modal
    } catch (error) {
      console.error("Error placing order:", error);
      alert("Error placing order");
    }
  };

  return (
    <div>
      <h3>Place Order</h3>
      <div>
        <h4>Package Details</h4>
        <p>Package Name: {packageDetails.packageName}</p>
        <p>Description: {packageDetails.description}</p>
        <p>Total Price: {packageDetails.totalPrice}</p>
        {/* Add more package details here */}
      </div>
      <div>
        <h4>Customer Details</h4>
        <p>Customer Name: {customerDetails.name}</p>
        {/* Add more customer details here */}
      </div>
      <div>
        <h4>Delivery Address</h4>
        <input type="text" value={orderAddress} onChange={handleAddressChange} />
      </div>
      <button onClick={handleCheckout}>Checkout</button>
    </div>
  );
}

export default PlaceOrder;
