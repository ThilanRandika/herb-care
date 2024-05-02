import React, { useContext, useState } from "react";
import axios from 'axios';
import { useLocation } from 'react-router-dom';
import { AuthContext } from "../../../context/AuthContext";

const GiftPackageOrderForm = () => {
  const [customerId, setCustomerId] = useState('');
  const [packageId, setPackageId] = useState('');
  const [orderAddress, setOrderAddress] = useState('');
  const [response, setResponse] = useState(null);
  const location = useLocation();
  const queryPackageId = new URLSearchParams(location.search).get('packageId');
  const { user } = useContext(AuthContext);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.post('http://localhost:8070/giftPackageOrder/addGiftPackageOrders', {
        customerId,
        packageId,
        orderAddress
      });
      setResponse(res.data);
    } catch (error) {
      console.error(error);
      setResponse({ message: 'Error: Please try again later.' });
    }
  };

  return (
    <div>
      <h2>Gift Package Order Form</h2>
      <form onSubmit={handleSubmit}>
        <div>
          <label htmlFor="customerId">Customer ID:</label>
          <input type="text" id="customerId" value={user._id} onChange={(e) => setCustomerId(e.target.value)} />
        </div>
        <div>
          <label htmlFor="packageId">Package ID:</label>
          <input type="text" id="packageId" value={queryPackageId} disabled />
        </div>
        <div>
          <label htmlFor="orderAddress">Order Address:</label>
          <input type="text" id="orderAddress" value={orderAddress} onChange={(e) => setOrderAddress(e.target.value)} />
        </div>
        <button type="submit">Submit</button>
      </form>
      {response && (
        <div>
          <h3>Response:</h3>
          <p>Package Details: {JSON.stringify(response.packageDetails)}</p>
          <p>Customer Details: {JSON.stringify(response.customerDetails)}</p>
          <p>Total Price: {response.totalPrice}</p>
          <p>Order Address: {response.orderAddress}</p>
        </div>
      )}
    </div>
  );
};

export default GiftPackageOrderForm;
