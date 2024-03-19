import React, { useState, useEffect } from "react";
import axios from "axios";

export default function AllProducts() {
  const [products, setProducts] = useState([]);

  useEffect(() => {
    function getProducts() {
      axios.get("http://localhost:8027/Product/")
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
    <div className="container">
      <h1>All Products</h1>
      {/* Render your products here */}
    </div>
  );
}
