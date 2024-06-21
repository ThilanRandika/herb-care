import axios from 'axios';
import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import config from '../../../config';
import './productCartRatings.css'

function ProductCardsRating() {

    const [products, setProducts] = useState([]);
  const [summaries, setSummaries] = useState([]);

    useEffect(() => {
        function getProducts() {
          axios.get(`${config.BASE_URL}/order/top-rated-products/`)
            .then((res) => {
              setProducts(res.data);
              console.log(products)
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
    <>
    <div className='home-product-cards-container'>
    {products.map((product, index) => (
    <div class="home-product-list-card" key={index}>
                <div class="home-customer-product-list-image">
                  <img
                    src={require(`../../../../../BACKEND/uploads/${product.image}`)}
                    className="customer-product-list-image"
                    alt="Product"
                  />
                </div>
                <div class="customer-product-list-details">
                    <div class="customer-product-list-info2">
                      <div class="customer-product-list-name">{product.name}</div>
                    <div class="customer-product-list-price">
                      Rs.{product.Manufactured_price}
                    </div>
                      <div className='FHS_ratings'>{renderStars(getProductRating(product.name))} (105)</div>
                    </div>
                  {/* <div class="customer-product-list-description">DESCRIPTION</div>
              <div class="customer-product-list-description">
                {product.description}
              </div> */}
                  <div className="customer-product-list-add-to-cart-button-container">
                    <div>
                      <Link to={`/Product/${product._id}`}>
                        <button class="customer-product-list-add-to-cart-button">
                          View Product
                        </button>
                      </Link>
                    </div>
                  </div>
                </div>
              </div>
    ))}
    </div>
              </>
  )
}

export default ProductCardsRating