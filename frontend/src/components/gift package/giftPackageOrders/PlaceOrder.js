import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useLocation } from 'react-router-dom';
import './PlaceOrder.css';
import Header from '../../common/header/header';
import Footer from '../../common/footer/footer';

const PlaceOrder = () => {
  const [orderName, setOrderName] = useState('');
  const [orderAddress, setOrderAddress] = useState('');
  const [area, setArea] = useState('');
  const [postalCode, setPostalCode] = useState('');
  const [mobileNum, setMobileNum] = useState('');
  const [paymentMethod, setPaymentMethod] = useState('Cash on Delivery');
  const [loading, setLoading] = useState(false);
  const [orderId, setOrderId] = useState('');
  const [totalPrice, setTotalPrice] = useState('');
  const [deliveryPrice, setDeliveryPrice] = useState(200); // Default delivery price
  const [totalAmount, setTotalAmount] = useState('');
  const location = useLocation();
  const packageId = new URLSearchParams(location.search).get('packageId');
  


  useEffect(()=>{
    axios.get(`http://localhost:8070/giftPackageOrder/get/${packageId}`)
    .then((res)=>{
      console.log(res.data.newOrder.orderAddress)
      setOrderName(res.data.newOrder.orderName)
      setOrderAddress(res.data.newOrder.orderAddress)
      setMobileNum(res.data.newOrder.mobileNum)
      setTotalPrice(res.data.newOrder.totalAmount)

      console.log(res.data.orderName)
    })
    .catch((err)=>{
      console.log(err)
    })
  },[])

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
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
      console.log("Create Order Response:", response.data);
      alert("Order submitted successfully")
      setOrderName('');
      setOrderAddress('');
      setArea('');
      setPostalCode('');
      setMobileNum('');
      setOrderId(response.data.order._id);
      setTotalPrice(response.data.totalPrice);
      setTotalAmount(parseFloat(response.data.totalPrice) + deliveryPrice);
    } catch (error) {
      console.error("Create Order Error:", error.response.data);
      alert("Failed to create order")
    }
    setLoading(false);
  };

  return (
    <div>
      <Header></Header>
      <br></br>
      <form className="PGPO_form" onSubmit={handleSubmit}>
        <label className="PGPO_ordername">Order Name : <br/>
          <input type="text"  value={orderName} onChange={(e) => setOrderName(e.target.value)} required />
        </label><br/>
        <label className="PGPO_orderaddress">Address : <br/>
          <input type="text"  value={orderAddress} onChange={(e) => setOrderAddress(e.target.value)} required />
        </label><br/>
        <label className="PGPO_area">Area : <br/>
          <input type="text" placeholder="Input province, district, city" value={area} onChange={(e) => setArea(e.target.value)} required />
        </label><br/>
        <label className="PGPO_postalcode">Postal Code : <br/>
          <input type="text" placeholder="Input Postal Code" value={postalCode} onChange={(e) => setPostalCode(e.target.value)} required />
        </label><br/>
        <label className="PGPO_monum">Mobile Number : <br/>
          <input type="text"  value={mobileNum} onChange={(e) => setMobileNum(e.target.value)} required />
        </label><br/>

        <p className="PGPO_totpri">Total Price: {totalPrice}</p>
        
        <label className="PGPO_paymentmethod">Payment Method: <br/>
          <label className="PGPO_paymentmethod_option">
            <input
              type="radio"
              value="Cash on Delivery"
              checked={paymentMethod === 'Cash on Delivery'}
              onChange={(e) => setPaymentMethod(e.target.value)}
            />
            Cash on Delivery <p className="PGPO_admon">(Add 200 for delivery fee)</p>
          </label>
          <br/>
          {/* <label className="PGPO_paymentmethod_option">
            <input
              type="radio"
              value="Card Payment"
              checked={paymentMethod === 'Card Payment'}
              onChange={(e) => setPaymentMethod(e.target.value)}
            />
            Card Payment
          </label> */}
        </label><br/>
        <button type="submit" className="PGPO_submit_button" disabled={loading}>
          {loading ? 'Submitting...' : 'Place Order'}
        </button>
      </form>
      <br></br>

      {/* Display total price, delivery price, and total amount */}
      {orderId && (
        <div className="PGPO_containor1">
          <p className="PGPO_totpri">Total Price: {totalPrice}</p>
          <p className="PGPO_delpri">Delivery Price: {deliveryPrice}</p>
          <p className="PGPO_totamou">Total Amount: {totalAmount}</p>
        </div>
      )}
      <Footer></Footer>
    </div>
  );
};

export default PlaceOrder;
