import React, { useState, useEffect } from "react";
import axios from "axios";
import "./AllProducts.css"; // Import CSS file for styling


export default function AllProducts() {
  const [products, setProducts] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [filteredProducts, setFilteredProducts] = useState([]);

  
  useEffect(() => {
    function getProducts() {
      axios
        .get("http://localhost:8070/Product/")
        .then((res) => {
          console.log(res.data); // Assuming the data is in res.data
          setProducts(res.data); // Set the products state with fetched data
          setFilteredProducts(res.data); // Initialize filtered products with all products
        })
        .catch((err) => {
          alert(err.message);
        });
    }

    getProducts();
  }, []);

  // Handle search query change
  const handleSearchChange = (e) => {
    setSearchQuery(e.target.value);
    // Filter products based on search query
    const filtered = products.filter((product) =>
      product.name.toLowerCase().includes(e.target.value.toLowerCase())
    );
    setFilteredProducts(filtered);
  };

  return (
    <div className="products-container">
      <input
        type="text"
        placeholder="Search by product name..."
        value={searchQuery}
        onChange={handleSearchChange}
        className="search-input"
      />
      <table>
        <thead>
          <tr>
            <th>Product Name</th>
            <th>Category</th>
            <th>Price</th>
            <th>Quantity</th>
            <th>Expire Date</th>
            <th>Update</th> {/* New column for update button */}
            <th>Delete</th> {/* New column for delete button */}
          </tr>
        </thead>
        <tbody>
          {filteredProducts.map((product, index) => (
            <tr key={index}>
              <td>{product.name}</td>
              <td>{product.category}</td>
              <td>{product.price}</td>
              <td>{product.quantity}</td>
              <td>{product.expireDate}</td>
              <td>
                <button   >Update</button> {/* onClick={() => handleUpdate(product._id)}*/}
              </td>
              <td>
                <button>Delete</button> {/* onClick={() => handleDelete(product._id)} */}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
