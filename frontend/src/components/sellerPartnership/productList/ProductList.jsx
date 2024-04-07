import axios from 'axios';
import React, { useEffect, useState } from 'react';
import './productList.css';
import { Link } from 'react-router-dom';

function ProductList() {
  const [productList, setProductList] = useState([]);

  useEffect(() => {
    axios.get('http://localhost:8070/sellerProducts/products')
      .then((res) => {
        console.log(res.data);
        setProductList(res.data);
      })
      .catch((err) => {
        console.log('Error getting pending seller sellers', err);
      });
  }, []);

  return (
    <div className="product-list-container">
      <h1>Product List</h1>
      <div className="product-grid">
        {productList.map((product, index) => (
          <div className="product-card" key={index}>
            <Link to={`/sellerMainHome/product/${product._id}`}>
              <img src="https://cdn.photographylife.com/wp-content/uploads/2014/09/Nikon-D750-Image-Samples-2.jpg" className="product-image" alt="Product" />
              <div className="product-details">
                <h2 className="product-name">{product.name}</h2>
                <p className="product-description">{product.description}</p>
                <p className="product-ingredients">{product.ingredients}</p>
                <p className="product-quantity">Quantity: {product.mini_quantity}</p>
                <p className="product-price">Price: {product.calculatedPrice}</p>
              </div>
            </Link>
          </div>
        ))}
      </div>
    </div>
  );
}

export default ProductList;
