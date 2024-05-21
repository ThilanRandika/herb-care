import "./Products.css";
import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';

function Products({ searchQuery, priceRange, category }) {
  const [products, setProducts] = useState([]);

  useEffect(() => {
    function getProducts() {
      axios.get("http://localhost:8070/Product/")
        .then((res) => {
          setProducts(res.data);
        })
        .catch((err) => {
          alert(err.message);
        });
    }

    getProducts();
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

  const filteredProducts = products.filter(product =>
    product.name.toLowerCase().includes(searchQuery.toLowerCase()) &&
    filterByPriceRange(product.price, priceRange) &&
    filterByCategory(product.category, category) // Apply category filter
  );

  return (
    <div className="User-searching-card-container">
      
      {filteredProducts.map((product, index) => (
        <Link to={`/Product/${product._id}`} key={index}>
          <section className="User-searching-card">
            <div className="productCard-img-inventory">
              <img src={require(`../../../../../../BACKEND/uploads/${product.image}`)} className="card-img" alt={product.name} height={120} width={120}/>
            </div>

            <div className="User-searching-card-details">
              <h3 className="User-searching-card-title1">{product.name}</h3>
              
              <section className="User-searching-card-price">
                <div className="User-searching-price">
                  Rs. {product.price}
                </div>
              </section>
              <button className="User-searching-add-to-cart-button1">Add to Cart</button>
            </div>
          </section>
        </Link>
      ))}
    </div>
  );
}

export default Products;
