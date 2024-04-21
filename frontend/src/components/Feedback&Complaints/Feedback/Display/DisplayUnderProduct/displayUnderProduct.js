import React, { useState, useEffect } from 'react';
import axios from 'axios';

const FeedbackUnderProduct = ({ productId }) => {
  const [product, setProduct] = useState(null);
  const [feedback, setFeedback] = useState([]);

  useEffect(() => {
    const fetchProduct = async () => {
      try {
        if (!productId) {
          return; // If productId is undefined, do not make the query
        }
        const response = await axios.get(`http://localhost:8070/products/661ed1c2ba2e882298ce303c`);//${productId}
        setProduct(response.data);
      } catch (error) {
        console.error(error);
      }
    };

    const fetchFeedback = async () => {
      try {
        if (!productId) {
          return; // If productId is undefined, do not make the query
        }
        const response = await axios.get(`http://localhost:8070/feedback/products/661ed1c2ba2e882298ce303c`);//${productId}
        setFeedback(response.data);
      } catch (error) {
        console.error(error);
      }
    };

    fetchProduct();
    fetchFeedback();
  }, [productId]);

  return (
    <div>
      {product && (
        <>
          <h2>{product.name}</h2>
          <p>Category: {product.category}</p>
          <p>Description: {product.description}</p>
          <p>Price: {product.price}</p>
          <p>Quantity: {product.quantity}</p>
          <p>Manufactured Price: {product.Manufactured_price}</p>
          <p>Discount: {product.discount}</p>
          <p>Ingredients: {product.ingredients}</p>
          <img src={product.image_url} alt="Product" />
        </>
      )}

      <h3>Feedback for Product:</h3>
      <ul>
        {feedback.map((item) => (
          <li key={item._id}>
            <p>Rating: {item.ratings}</p>
            <p>Message: {item.message}</p>
            <p>Images:</p>
            <ul>
              {item.image.map((img, index) => (
                <li key={index}>
                  <img src={img} alt={`Image ${index}`} />
                </li>
              ))}
            </ul>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default FeedbackUnderProduct;
