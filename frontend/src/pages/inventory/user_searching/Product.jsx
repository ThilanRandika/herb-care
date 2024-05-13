import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { FaPlus, FaMinus } from 'react-icons/fa';
import axios from 'axios';
import './Product.css';
import Feedback from '../../../components/Feedback&Complaints/Feedback/Display/DisplayUnderProduct/displayUnderProduct';

function Product() {
  const { id } = useParams(); // Get the product id from the URL parameter
  const [product, setProduct] = useState(null);
  const [quantity, setQuantity] = useState(1);

  useEffect(() => {
    axios.get(`http://localhost:8070/Product/${id}`)
      .then((res) => {
        setProduct({
          ...res.data.product,
          manufactureDate: new Date(res.data.product.manufactureDate).toLocaleDateString(),
          expireDate: new Date(res.data.product.expireDate).toLocaleDateString(),
        });
        console.log(res.data.product);
      })
      .catch((err) => {
        alert(err.message);
      });
  }, [id]);

  const incrementQuantity = () => {
    setQuantity(quantity + 1);
  };

  const decrementQuantity = () => {
    if (quantity > 1) {
      setQuantity(quantity - 1);
    }
  };

  // console.log(product.name);

  const addToCart = () => {
    axios.post('http://localhost:8070/Cart/add', { productId: id, quantity, productname: product.name })
      .then((res) => {
        console.log(res.data); // Handle success response
      })
      .catch((err) => {
        alert(err.message); // Handle error
      });
  };

  if (!product) {
    return <div className="loading-container">Loading...</div>;
  }

  const imageUrl = `http://localhost:8070/${product.image}`;

  return (
    <div className="product-page-container">
      <div className="product-details-container">
        <div className="image-container">
          <img src={require(`../../../../../BACKEND/uploads/${product.image}`)} alt={product.name} />
        </div>
        <div className="details">
          <h2>{product.name}</h2>
          <p>Manufactured Price: {product.Manufactured_price}</p>
          <p>Category: {product.category}</p>
          <p>Manufacture Date: {product.manufactureDate}</p>
          <p>Expire Date: {product.expireDate}</p>
          <p>Description: {product.description}</p>
          <p>Ingredients: {product.ingredients}</p>
          <p>Price: {product.price}</p>
          <div className="quantity-container">
            <button className="quantity-button" onClick={decrementQuantity}><FaMinus /></button>
            <input className="quantity-input" type="number" value={quantity} onChange={(e) => setQuantity(parseInt(e.target.value))} />
            <button className="quantity-button" onClick={incrementQuantity}><FaPlus /></button>
            <button className="add-to-cart-button" onClick={addToCart}>Add to Cart</button>
          </div>
          
        </div>


        <Feedback productid={id} />


      </div>
    </div>
    
  );
}

export default Product;
