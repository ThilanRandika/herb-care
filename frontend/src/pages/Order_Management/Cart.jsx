import React, { useState, useEffect } from 'react';
import axios from 'axios';
import "./Cart.css";
import { useNavigate } from 'react-router-dom';


function Cart() {
  const [items, setItems] = useState([]);
  const [alltotalcount,setalltotalcount]=useState(0);
  const navigate = useNavigate();

  useEffect(() => {
    fetchCartItems();
  }, []);

  const fetchCartItems = () => {
    axios.post('http://localhost:8070/Cart/allcart')
      .then(response => {
        setItems(response.data.items);
        setalltotalcount(response.data.totalPrice);
      })
      .catch(error => {
        console.error('Error fetching data:', error);
      });
  };

  const updateQuantity = (productId, quantity) => {
    axios.post(`http://localhost:8070/Cart/update/${productId}`, { quantity })
      .then(response => {
        const updatedItem = response.data.item;
        const updatedItems = items.map(item => {
          if (item._id === updatedItem._id) {
            return updatedItem;
          }
          return item;
        });
        setItems(updatedItems);
      })
      .catch(error => {
        console.error('Error updating quantity:', error);
      });
  }

  const removeItem = (productId) => {
    axios.post(`http://localhost:8070/Cart/remove/${productId}`)
      .then(response => {
        const updatedItems = items.filter(item => item._id !== productId);
        setItems(updatedItems);
        window.location.reload();
      })
      .catch(error => {
        console.error('Error removing item:', error);
      });
  }

  const handleCheckout = () => {
    // Redirect to the checkout page and pass the total price as a query parameter
    navigate(`/checkout/${alltotalcount}`);
  };

  return (
    <div className='container'>
      <h2>Cart</h2>
      {items.map(item => (
        <div className="item" key={item._id}>
          <p>Product id: {item.product_id}</p>
          <p>Name: {item.name}</p>
          <p>Quantity: {item.quantity}</p>
          <p>Price: {item.totalPrice}</p>
          <div style={{display:'flex',justifyContent:'space-between'}}>
            <div>
              <img style={{cursor:'pointer'}} onClick={() => updateQuantity(item._id, item.quantity + 1)} width="40" height="40" src="https://img.icons8.com/fluency/48/add--v1.png" alt="add--v1"/>&nbsp;
              <img style={{cursor:'pointer'}} onClick={() => updateQuantity(item._id, item.quantity - 1)} width="40" height="40" src="https://img.icons8.com/fluency/48/minus.png" alt="minus"/>
            </div>
            <img style={{cursor:'pointer'}} onClick={() => removeItem(item._id)} width="40" height="40" src="https://img.icons8.com/plasticine/100/filled-trash.png" alt="filled-trash"/>
          </div>
        </div>
      ))}
      <br></br>
      <h4>Total Price : {alltotalcount}</h4>
      <button className='cart-button'  onClick={handleCheckout}>Checkout</button>
      <br/><br/>
    </div>
  );
}

export default Cart;
