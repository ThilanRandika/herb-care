import axios from "axios";
import React, { useContext, useEffect, useState } from "react";
import "./singleProduct.css";
import { useParams } from "react-router-dom";
import { AuthContext } from "../../../context/AuthContext";
import config from "../../../config";

function SingleProduct() {
  const { Id } = useParams();

  const [loading, setLoading] = useState(true);
  const [product, setProduct] = useState({});
  const [quantity, setQuantity] = useState(1);
  const [activeTab, setActiveTab] = useState("description");
  const [error, setError] = useState("");
  const { user } = useContext(AuthContext);

  useEffect(() => {
    axios
      .get(`${config.BASE_URL}/sellerProducts/products/${user.sellerId}/${Id}`)
      .then((res) => {
        console.log(res.data);
        setProduct(res.data);
        setQuantity(res.data.mini_quantity);
        setLoading(false);
      })
      .catch((err) => {
        console.log(err);
        setLoading(false);
      });
  }, [Id]);

  const addToBag = () => {
    axios
      .post(`${config.BASE_URL}/sellerBag/addToBag/${Id}/${user.sellerId}`, {
        quantity: quantity,
        price: product.calculatedPrice,
        totalPrice: (quantity * product.calculatedPrice).toFixed(2),
      })
      .then((res) => {
        alert("Added to Bag");
        console.log(res.data);
      })
      .catch((err) => {
        console.log(err);
      });
  };

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
    
    {loading ? ( // Conditionally render loading indicator
        <div style={{ margin: "25px" }}>
          Loding...
        </div>
      ) : (
        <div>
      <div class="seller-single-product-page">
        <div className="seller-single-product-image">
          <img
            src={require(`../../../../../BACKEND/uploads/${product.image}`)}
            alt="{product.name}"
            className="seller-single-product-image"
          />
        </div>
        <div className="seller-single-product-details">
          <div className="seller-single-product-name">{product.name}</div>
          <div className="seller-single-product-category">
            {product.category}
          </div>
          {/* <div className="seller-single-product-status">
      <span className="seller-single-in-stock">In stock</span>
      <span className="seller-single-reviews">32 reviews | 154 sold</span>
      <span className="seller-single-rating">★★★★ 9.3</span>
    </div> */}
          <div className="seller-single-product-price">
            Rs.{product.calculatedPrice}
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
          <button className="add-to-bag-button" onClick={addToBag}>
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
      </div>
      )};
    </>
  );
}

export default SingleProduct;
