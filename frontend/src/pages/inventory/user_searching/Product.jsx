import React, { useState, useEffect, useContext } from 'react';
import { useParams } from 'react-router-dom';
import { FaPlus, FaMinus } from 'react-icons/fa';
import { AuthContext } from '../../../context/AuthContext';
import axios from 'axios';
import './Product.css';
import Feedback from '../../../components/Feedback&Complaints/Feedback/Display/DisplayUnderProduct/displayUnderProduct';
import Header from '../../../components/common/header/header';
import Footer from '../../../components/common/footer/footer';
import config from '../../../config';

function Product() {
  const { id } = useParams(); // Get the product id from the URL parameter
  const [loading, setLoading] = useState(true);
  const [product, setProduct] = useState(null);
  const [quantity, setQuantity] = useState(1);
  const [activeTab, setActiveTab] = useState("description");
  const [error, setError] = useState("");
  const { user } = useContext(AuthContext);

  useEffect(() => {
    axios.get(`${config.BASE_URL}/Product/${id}`)
      .then((res) => {
        setProduct({
          ...res.data.product,
          manufactureDate: new Date(res.data.product.manufactureDate).toLocaleDateString(),
          expireDate: new Date(res.data.product.expireDate).toLocaleDateString(),
        });
        console.log(res.data.product);
        setLoading(false);
      })
      .catch((err) => {
        setLoading(false);
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
    if (!user){
      alert("Please login to add to cart");
      return;
    }
    axios
      .post(`${config.BASE_URL}/Cart/add/${id}`, {
        userId: user._id,
        quantity: quantity,
        price: product.Manufactured_price,
        totalPrice: (quantity * product.Manufactured_price).toFixed(2),
      })
      .then((res) => {
        console.log(res.data);
        alert("Added to Bag");
      })
      .catch((err) => {
        console.log(err);
      });
  };

  if (!product) {
    return <div className="loading-container">Loading...</div>;
  }

  const imageUrl = `${config.BASE_URL}/${product.image}`;

  const handleQuantityChange = (event) => {
    const newQuantity = parseInt(event.target.value);
    if (newQuantity < product.mini_quantity) {
      setError(`Minimum quantity is ${product.mini_quantity}`);
    } else {
      setError("");
      setQuantity(newQuantity);
    }
  };

  const handleTabChange = (tab) => {
    setActiveTab(tab);
  };



  return (

    <>

      <div className="home-customer-header">
        <Header></Header>
      </div>

    {/* <div className="product-page-container">
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


        


      </div>
    </div> */}



    
    {loading ? ( // Conditionally render loading indicator
        <div style={{ margin: "25px" }}>
          Loding...
        </div>
      ) : (
        <div>
      <div class="seller-single-product-page">
        <div className="seller-single-product-image">
                  {product.image ? (
                    <img
                      src={product.image.startsWith('http') ? product.image : require(`../../../../../BACKEND/uploads/${product.image}`)}
                      className="customer-product-list-image"
                      alt="Product"
                    />
                  ) : (
                    <div className="no-image-available">
                      No Image Available
                    </div>
                  )}
        </div>
        <div className="seller-single-product-details">
          <div className="seller-single-product-name">{product.name}</div>
          <div className="seller-single-product-category">
            {product.category}
          </div>
          <p>Manufacture Date: {product.manufactureDate}</p>
          <p>Expire Date: {product.expireDate}</p>
          {/* <div className="seller-single-product-status">
      <span className="seller-single-in-stock">In stock</span>
      <span className="seller-single-reviews">32 reviews | 154 sold</span>
      <span className="seller-single-rating">★★★★ 9.3</span>
    </div> */}
          <div className="seller-single-product-price">
            Rs.{product.Manufactured_price}
          </div>
          <div className="seller-single-product-quantity">
            <span className="seller-single-product-quantity-label">
              Minimum Quantity: {product.mini_quantity}
            </span>
            <div className="seller-single-product-quantity-selection">
              <input
                type="number"
                id="quantity"
                name="quantity"
                min={product.mini_quantity}
                value={quantity}
                onChange={handleQuantityChange}
              />
              <label htmlFor="quantity">:Quantity</label>
            </div>
          </div>
          {error && <span className="error-message">{error}</span>}
          <div className="seller-single-product-supplier">
            <span className="seller-single-supplier-name">Supplier:</span>
            <span className="seller-single-supplier-details">
              <span className="seller-single-supplier-location">
                Sri Lanka, Malabe
              </span>
              <span className="seller-single-supplier-verification">
                Verified Seller
              </span>
            </span>
          </div>
          <button className="add-to-bag-button" onClick={addToCart}>
            Add to Bag
          </button>
        </div>
      </div>

      <br />

      <div className="single-productDetail-content">
        <div>
          <button
            className={`seller-single-product-button ${
              activeTab === "description" ? "active" : ""
            }`}
            onClick={() => handleTabChange("description")}
          >
            Description
          </button>
          <button
            className={`seller-single-product-button ${
              activeTab === "ingredients" ? "active" : ""
            }`}
            onClick={() => handleTabChange("ingredients")}
          >
            Ingredients
          </button>
        </div>
        <br />
        <div id="description" className="tab-content">
          {activeTab === "description" && (
            <p className="seller-single-product-description">
              {product.description}
            </p>
          )}
          {activeTab === "ingredients" && (
            <p className="seller-single-product-shipping">
              {product.ingredients}
            </p>
          )}
        </div>
      </div>
      
      <div className="productPage-feedbacks">
        <Feedback productid={id} />
      </div>

      </div>
      
      )};

    <Footer></Footer>
    </>
    
  );
}

export default Product;