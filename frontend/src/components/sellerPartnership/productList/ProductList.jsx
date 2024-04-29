import axios from "axios";
import React, { useEffect, useState } from "react";
import "./productList.css";
import { Link } from "react-router-dom";
import SearchBar from "../searchBar/SearchBar";

function ProductList() {
  const [loading, setLoading] = useState(true);
  const [productList, setProductList] = useState([]);
  const [filteredProductList, setFilteredProductList] = useState([]);
  const [categories, setCategories] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState("");

  useEffect(() => {
    axios
      .get("http://localhost:8070/sellerProducts/products")
      .then((res) => {
        console.log(res.data);
        setProductList(res.data.products);
        setFilteredProductList(res.data.products);
        setCategories(res.data.categories);
        setLoading(false);
      })
      .catch((err) => {
        console.log("Error getting pending seller sellers", err);
        setLoading(false);
      });
  }, []);

  const handleSearch = (query) => {
    const filteredProducts = productList.filter((product) =>
      product.name.toLowerCase().includes(query.toLowerCase())
    );
    setFilteredProductList(filteredProducts);
  };

  const handleCategoryChange = (category) => {
    setSelectedCategory(category);
  };

  const handleAllProducts = () => {
    setSelectedCategory("");
  };

  return (
    <div className="seller-product-list-centered-container">
      {loading ? ( // Conditionally render loading indicator
        <div style={{ margin: "25px" }}>
          Loding...
        </div>
      ) : (
      <div className="seller-product-list-container">
        <div className="seller-product-list-header">
          <h1>Product List</h1>
          <div className="seller-product-list-searchBar">
            <SearchBar onSearch={handleSearch} />
          </div>
        </div>
        <br />
        <div className="categories-container">
          <ul>
            <li>
              <button onClick={handleAllProducts}>All</button>
            </li>
            {categories.map((category) => (
              <li key={category}>
                <button onClick={() => handleCategoryChange(category)}>
                  {category}
                </button>
              </li>
            ))}
          </ul>
        </div>
        <div className="seller-product-list-grid">
          {filteredProductList
            .filter(
              (product) =>
                selectedCategory === "" || product.category === selectedCategory
            )
            .map((product, index) => (
              <div class="seller-product-list-card" key={index}>
                <div class="seller-product-list-image">
                  <img
                    src={require(`../../../../../BACKEND/uploads/${product.image}`)}
                    className="seller-product-list-image"
                    alt="Product"
                  />
                </div>
                <div class="seller-product-list-details">
                  <div class="seller-product-list-id">Code #{product._id}</div>
                  <div class="seller-product-list-info1">
                    <div class="seller-product-list-info2">
                      <div class="seller-product-list-name">{product.name}</div>
                    </div>
                    <div class="seller-product-list-price">
                      Rs.{product.calculatedPrice}
                    </div>
                  </div>
                  {/* <div class="seller-product-list-description">DESCRIPTION</div>
              <div class="seller-product-list-description">
                {product.description}
              </div> */}
                  <Link to={`/sellerMainHome/product/${product._id}`}>
                    <button class="seller-product-list-add-to-cart-button">
                      View Product
                    </button>
                  </Link>
                </div>
              </div>
            ))}
        </div>
      </div>
      )};
    </div>
  );
}

export default ProductList;
