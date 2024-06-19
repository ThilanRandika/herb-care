import React, { useEffect, useState } from 'react';
import './productCard2.css';
import { Link } from 'react-router-dom';
import axios from 'axios';
import config from '../../../config';

function ProductCard2() {
  const [products, setProducts] = useState([]);
  const [summaries, setSummaries] = useState([]);

  useEffect(() => {
    function getProducts() {
      axios.get(`${config.BASE_URL}/order/top-rated-products/`)
        .then((res) => {
          setProducts(res.data);
          console.log(products);
        })
        .catch((err) => {
          alert(err.message);
        });
    }

    const fetchFeedbackSummaries = async () => {
      try {
        const response = await axios.get(`${config.BASE_URL}/feedback/feedback-summaries`);
        setSummaries(response.data);
      } catch (error) {
        console.error(error);
      }
    };

    getProducts();
    fetchFeedbackSummaries();
  }, []);

  const getProductRating = (productName) => {
    const productSummary = summaries.find(summary => summary.productName === productName);
    return productSummary ? productSummary.ratings : 0;
  };

  const renderStars = (rating) => {
    const stars = [];
    for (let i = 1; i <= 5; i++) {
      stars.push(
        <span key={i} className={i <= rating ? 'FHS_star gold' : 'FHS_star'}>
          &#9733;
        </span>
      );
    }
    return stars;
  };

  return (
    <div className='product-card-2-container-wrapper'>
      <div className='product-card-2-container'>
        <div className='product-card-2-left'>
          {products.map((product, index) => (
            <div className="home-product2-list-card" key={index}>
              <div className="customer-product-list-image">
                <img
                  src={require(`../../../../../BACKEND/uploads/${product.image}`)}
                  className="customer-product-list-image"
                  alt="Product"
                />
              </div>
              <div className="customer-product-list-details">
                <div className="customer-product-list-info1">
                  <div className="customer-product-list-info2">
                    <div className="customer-product-list-name">{product.name}</div>
                    <div className="customer-product-list-description"><span>Category: </span>{product.category}</div>
                    <div className='FHS_ratings'>ratings: {renderStars(getProductRating(product.name))}</div>
                  </div>
                  <div className="customer-product-list-price">
                    Rs.{product.Manufactured_price}
                  </div>
                </div>
                <div className="customer-product-list-add-to-cart-button-container">
                  <div>
                    <Link to={`/Product/${product._id}`}>
                      <button className="customer-product-list-add-to-cart-button">
                        View Product
                      </button>
                    </Link>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
        <div className='product-card-2-right'>
          <div className='image-container'>
            <img src='https://th.bing.com/th/id/OIP.61_Ed7geh4FS2KLh5QXkZQHaE8?w=263&h=184&c=7&r=0&o=5&dpr=1.1&pid=1.7' alt='' />
            <div className="image-text-overlay">Lorem ipsum dolor sit amet consectetur adipisicing elit. Veniam, amet.</div>
          </div>
          <div className='image-container'>
            <img src='https://th.bing.com/th/id/OIP.U0SfqHcCr4A3TEW4cIDGOQHaEI?w=327&h=182&c=7&r=0&o=5&dpr=1.1&pid=1.7' alt='' />
            <div className="image-text-overlay">Lorem ipsum dolor sit amet consectetur adipisicing elit. Ab, soluta!</div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default ProductCard2;
