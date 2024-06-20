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
  const [mainImage, setMainImage] = useState("");
  const [smallImages, setSmallImages] = useState([]);

  useEffect(() => {
    axios.get(`${config.BASE_URL}/Product/${id}`)
      .then((res) => {
        const images = [
          `${config.BASE_URL}/${res.data.product.image1}`,
          `${config.BASE_URL}/${res.data.product.image2}`,
          `${config.BASE_URL}/${res.data.product.image3}`
        ];
        setProduct({
          ...res.data.product,
          manufactureDate: new Date(res.data.product.manufactureDate).toLocaleDateString(),
          expireDate: new Date(res.data.product.expireDate).toLocaleDateString(),
        });
        // setMainImage(`${config.BASE_URL}/${res.data.product.image}`);
        setMainImage(require(`../../../../../BACKEND/uploads/${res.data.product.image}`));
        setSmallImages(images);
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

  const addToCart = () => {
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

  const handleImageClick = (clickedImage) => {
    setMainImage(clickedImage);
    setSmallImages(
      smallImages.map((img) => (img === clickedImage ? mainImage : img))
    );
  };

  if (!product) {
    return <div className="loading-container">Loading...</div>;
  }

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
        <Header />
      </div>

      {loading ? (
        <div style={{ margin: "25px" }}>Loading...</div>
      ) : (
        <div>
          <div className="user-single-product-page">
            <div className="user-single-product-image">
              <img src={mainImage} alt="Main Product" className="user-main-product-image" />
              <div className="user-small-product-images">
                {smallImages.map((img, index) => (
                  <img
                    key={index}
                    src={img}
                    alt={`Product ${index + 1}`}
                    className="user-small-product-image"
                    onClick={() => handleImageClick(img)}
                  />
                ))}
              </div>
            </div>
            <div className="user-single-product-details">
              <div className="user-single-product-name">{product.name}</div>
              <div className="user-single-product-category">
                {product.category}
              </div>
              <p>Manufacture Date: {product.manufactureDate}</p>
              <p>Expire Date: {product.expireDate}</p>
              <div className="user-single-product-price">
                Rs.{product.Manufactured_price}
              </div>
              <div className="user-single-product-quantity">
                <span className="user-single-product-quantity-label">
                  Minimum Quantity: {product.mini_quantity}
                </span>
                <div className="user-single-product-quantity-selection">
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
              <div className="user-single-product-supplier">
                <span className="user-single-supplier-name">Supplier:</span>
                <span className="user-single-supplier-details">
                  <span className="user-single-supplier-location">
                    Sri Lanka, Malabe
                  </span>
                  <span className="user-single-supplier-verification">
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

          <div className="user-productDetail-content">
            <div>
              <button
                className={`user-single-product-button ${
                  activeTab === "description" ? "active" : ""
                }`}
                onClick={() => handleTabChange("description")}
              >
                Description
              </button>
              <button
                className={`user-single-product-button ${
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
                <p className="user-single-product-description">
                  {product.description}
                </p>
              )}
              {activeTab === "ingredients" && (
                <p className="user-single-product-shipping">
                  {product.ingredients}
                </p>
              )}
            </div>
          </div>
          
          <div className="productPage-feedbacks">
            <Feedback productid={id} />
          </div>
        </div>
      )}

      <Footer />
    </>
  );
}

export default Product;
