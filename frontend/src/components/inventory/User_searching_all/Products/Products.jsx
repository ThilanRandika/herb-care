import "./Products.css";
import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom'; // Import Link from React Router
import axios from 'axios';
import { AiFillStar } from 'react-icons/ai';

function Products({ searchQuery, priceRange }) {
  const [products, setProducts] = useState([]);

  useEffect(() => {
    function getProducts() {
      axios.get("http://localhost:8070/Product/")
        .then((res) => {
          console.log(res.data);
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

  const filteredProducts = products.filter(product =>
    product.name.toLowerCase().includes(searchQuery.toLowerCase()) &&
    filterByPriceRange(product.price, priceRange)
  );

  return (
    <div className="card-container">
      {filteredProducts.map((product, index) => (
        <Link to={`/Product/${product._id}`} key={index}> {/* Use Link to navigate to product page */}
          <section className="card">
            <img src={product.image} alt={product.name} />
            <div className="card-details">
              <h3 className="card-title">{product.name}</h3>
              <section className="card-reviews">
                <AiFillStar className="rating-star" />
                <AiFillStar className="rating-star" />
                <AiFillStar className="rating-star" />
                <AiFillStar className="rating-star" />
                <AiFillStar className="rating-star" />
                <span className="total-reviews">5</span>
              </section>
              <section className="card-price">
                <div className="price">
                  <del>Rs.800.00</del> {product.price}
                </div>
              </section>
              <button className="add-to-cart-button">Add to Cart</button>
            </div>
          </section>
        </Link>
      ))}
    </div>
  );
}

export default Products;
