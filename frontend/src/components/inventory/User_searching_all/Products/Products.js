import "./Products.css";
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { AiFillStar } from 'react-icons/ai';

function Products() {
  const [products, setProducts] = useState([]);

  useEffect(() => {
    function getProducts() {
      axios.get("http://localhost:8070/Product/")
        .then((res) => {
          console.log(res.data); // Assuming the data is in res.data
          setProducts(res.data); // Set the products state with fetched data
        })
        .catch((err) => {
          alert(err.message);
        });
    }

    getProducts();
  }, []);

  return (
    <div className="card-container">
      {products.map((product, index) => (
        <section className="card" key={index}>
          <img src={product.image_url} alt={product.name} />
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
      ))}
    </div>
  );
}

export default Products;
