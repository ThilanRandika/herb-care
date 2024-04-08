import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import './Product.css';

function Product() {
  const { id } = useParams(); // Get the product id from the URL parameter
  const [product, setProduct] = useState(null);

  useEffect(() => {
    axios.get(`http://localhost:8070/Product/${id}`)
      .then((res) => {
        setProduct(res.data.product);
        console.log(res.data.product);
      })
      .catch((err) => {
        alert(err.message);
      });
  }, [id]);

  if (!product) {
    return <div>Loading...</div>;
  }

  // Construct the image URL using the relative path
  const imageUrl = `http://localhost:8070/${product.image}`;

  return (
    <div className="product-container">
      <h2>{product.name}</h2>
      <img src={imageUrl} alt={product.name} /> {/* Display the product image */}
      <p>Price: {product.price}</p>
      <p>Manufactured Price: {product.Manufactured_price}</p>
      <p>Category: {product.category}</p>
      <p>Manufacture Date: {product.manufactureDate}</p>
      <p>Expire Date: {product.expireDate}</p>
      <p>Description: {product.description}</p>
      <p>Ingredients: {product.ingredients}</p>
      <p>Quantity: {product.quantity}</p>
      <button className="add-to-cart-button">Add to Cart</button>
    </div>
  );
}

export default Product;
