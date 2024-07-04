import "./Products.css";
import React, { useState, useEffect, useContext } from 'react';
import { AuthContext } from '../../../../context/AuthContext';
import { Link } from 'react-router-dom';
import axios from 'axios';
import config from "../../../../config";

const ITEMS_PER_PAGE = 9;

function Products({ searchQuery, priceRange, category }) {
  const [products, setProducts] = useState([]);
  const [summaries, setSummaries] = useState([]);
  const [loading, setLoading] = useState(true); // State to track loading status
  const [currentPage, setCurrentPage] = useState(1);
  const { user } = useContext(AuthContext);

  useEffect(() => {
    function getProducts() {
      axios.get(`${config.BASE_URL}/Product/`)
        .then((res) => {
          setProducts(res.data);
          setLoading(false);
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
        setLoading(false);
      } catch (error) {
        console.error(error);
      }
    };

    getProducts();
    fetchFeedbackSummaries();
  }, []);

  const filterByPriceRange = (price, range) => {
    switch (range) {
      case "0-1000":
        return price >= 0 && price <= 1000;
      case "1000-2000":
        return price > 1000 && price <= 2000;
      case "2000-3000":
        return price > 2000 && price <= 3000;
      case "3000-4000":
        return price > 3000 && price <= 4000;
      case "4000-5000":
        return price > 4000 && price <= 5000;
      case "above-5000":
        return price > 5000;
      default:
        return true;
    }
  };

  const filterByCategory = (productCategory, selectedCategory) => {
    return selectedCategory === "" || productCategory === selectedCategory;
  };
  
  const getProductRating = (productName) => {
    const productSummary = summaries.find(summary => summary.productName === productName);
    return productSummary ? productSummary.ratings : 0;
  };

  const filteredProducts = products.filter(product =>
    product.name.toLowerCase().includes(searchQuery.toLowerCase()) &&
    filterByPriceRange(product.price, priceRange) &&
    filterByCategory(product.category, category) // Apply category filter
  );


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

  const addToCart = (product) => {
    if (!user){
      alert("Please login to add to cart");
      return;
    }
    axios
      .post(`${config.BASE_URL}/Cart/add/${product._id}` , {
        userId: user._id,
        quantity: 1,
        price: product.Manufactured_price,
        totalPrice: (1 * product.Manufactured_price).toFixed(2),
      })
      .then((res) => {
        console.log(res.data);
        alert("Added to Bag");
      })
      .catch((err) => {
        console.log("Error adding to cart:", err);
      });
  };

  const totalPages = Math.ceil(filteredProducts.length / ITEMS_PER_PAGE);
  const currentProducts = filteredProducts.slice((currentPage - 1) * ITEMS_PER_PAGE, currentPage * ITEMS_PER_PAGE);

  if (loading) {
    return (
      <div className="specialistList-loading-container">
        <div className="specialistList-loading-spinner"></div>
        <div>Loading...</div>
      </div>
    );
  }

  return (
    <>

    <div className="User-searching-card-container">
      
    {currentProducts.map((product, index) => (


        // <Link to={`/Product/${product._id}`} key={index}>
        //   <section className="User-searching-card">
        //     <div className="productCard-img-inventory">
        //       <img src={require(`../../../../../../BACKEND/uploads/${product.image}`)} className="card-img" alt={product.name} height={120} width={120}/>
        //     </div>

        //     <div className="User-searching-card-details">
        //       <h3 className="User-searching-card-title1">{product.name}</h3>
              
        //       <section className="User-searching-card-price">
        //         <div className="User-searching-price">
        //           Rs. {product.price}
        //         </div>
        //       </section>
        //       <button className="User-searching-add-to-cart-button1">Add to Cart</button>
        //     </div>
        //   </section>

        
          <div class="customer-product-list-card" key={index}>
                <div className="customer-product-list-image">
                  {product.image ? (
                    <img
                      src={product.image.startsWith('http') ? product.image : require(`../../../../../../BACKEND/uploads/${product.image}`)}
                      className="customer-product-list-image"
                      alt="Product"
                    />
                  ) : (
                    <div className="no-image-available">
                      No Image Available
                    </div>
                  )}
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
                    <div className="customer-product-list-add-to-cart-cart-button">
                      <img width="30" height="30" src="https://img.icons8.com/sf-regular-filled/48/1A1A1A/shopping-cart.png" alt="shopping-cart--v1" onClick={() => addToCart(product)}/>
                    </div>
                  </div>
                </div>
              </div>
            // </Link>
            ))}





        
    </div>
    <div className="pagination">
    {Array.from({ length: totalPages }, (_, index) => (
      <button
        key={index}
        onClick={() => setCurrentPage(index + 1)}
        className={currentPage === index + 1 ? 'active' : ''}
      >
        {index + 1}
      </button>
    ))}
  </div>
  </>
  );
}

export default Products;