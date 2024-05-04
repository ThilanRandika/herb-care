import React, { useState } from 'react';
import axios from 'axios';
import { useLocation } from 'react-router-dom';
import './PlaceOrder.css'

const GiftPackageOrderForm = () => {
  const [orderName, setOrderName] = useState('');
  const [orderAddress, setOrderAddress] = useState('');
  const [area, setArea] = useState('');
  const [postalCode, setPostalCode] = useState('');
  const [mobileNum, setMobileNum] = useState('');
  const [paymentMethod, setPaymentMethod] = useState('');
  const location = useLocation();
  const packageId = new URLSearchParams(location.search).get('packageId');

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {                
      const response = await axios.post(`http://localhost:8070/giftPackageOrder/create/${packageId}`, {
        packageId,
        orderName,
        orderAddress,
        area,
        postalCode,
        mobileNum,
        paymentMethod,
      });
      console.log(response.data);
      alert("Order submitted successfully")
      setOrderName('');
      setOrderAddress('');
      setArea('');
      setPostalCode('');
      setMobileNum('');
      setPaymentMethod('');
    } catch (error) {
      console.error(error.response.data);
      alert("Failed to create order")
    }
  };

  return (
    <form className="PGPO_form" onSubmit={handleSubmit}>
      <label className="PGPO_ordername" >Order Name : <br/>
      <input type="text"  placeholder="Input Full Name" value={orderName} onChange={(e) => setOrderName(e.target.value)} />
      </label><br/>
      <label className="PGPO_orderaddress" >Address : <br/>
      <input type="text"  placeholder="House no. / building / streat /area" value={orderAddress} onChange={(e) => setOrderAddress(e.target.value)} />
      </label><br/>
      <label className="PGPO_area">Area : <br/>
      <input type="text"  placeholder="Input province , district , city" value={area} onChange={(e) => setArea(e.target.value)} />
      </label><br/>
      <label className="PGPO_postalcode" >Postal Code : <br/>
      <input type="text" placeholder="Input Postal Code" value={postalCode} onChange={(e) => setPostalCode(e.target.value)} />
      </label><br/>
      <label className="PGPO_monum" >Mobile Number : <br/>
      <input type="text" placeholder="Input Mobile Number" value={mobileNum} onChange={(e) => setMobileNum(e.target.value)} />
      </label><br/>
      <label className="PGPO_pymentmethod" >Payment Method: <br/>
        <label className="PGPO_monumrado1">
          <input
            type="radio"
            value="Cash on Delivery"
            checked={paymentMethod === 'Cash on Delivery'}
            onChange={(e) => setPaymentMethod(e.target.value)}
          />
          Cash on Delivery
        </label>
        <br/>
        <label className="PGPO_monumradio2">
          <input
            type="radio"
            value="Card Payment"
            checked={paymentMethod === 'Card Payment'}
            onChange={(e) => setPaymentMethod(e.target.value)}
          />
          Card Payment
        </label>
      </label><br/>
     
      <button type="submit" className="PGPO_subbttn">Submit Order</button>
    </form>
  );
};

export default GiftPackageOrderForm;
