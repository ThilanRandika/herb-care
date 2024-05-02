import React, { useState, useEffect } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import "./AllProducts.css";

export default function AllProducts() {
  const [products, setProducts] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [filteredProducts, setFilteredProducts] = useState([]);

  useEffect(() => {
    function getProducts() {
      axios
        .get("http://localhost:8070/Product/")
        .then((res) => {
          console.log(res.data);
          setProducts(res.data);
          setFilteredProducts(res.data);
        })
        .catch((err) => {
          alert(err.message);
        });
    }

    getProducts();
  }, []);

  const handleSearchChange = (e) => {
    setSearchQuery(e.target.value);
    const filtered = products.filter((product) =>
      product.name.toLowerCase().includes(e.target.value.toLowerCase())
    );
    setFilteredProducts(filtered);
  };

  const handleDelete = async (productId) => {
    try {
      await axios.delete(`http://localhost:8070/Product/delete/${productId}`);
      // Remove the deleted product from the state
      setFilteredProducts(filteredProducts.filter((product) => product._id !== productId));
      setProducts(products.filter((product) => product._id !== productId));
      alert("Product deleted successfully");
    } catch (error) {
      console.error('Error deleting product:', error);
      alert('Failed to delete product');
    }
  };

  return (
    <div className="all-products-container">
      <input
        type="text"
        placeholder="Search by product name..."
        value={searchQuery}
        onChange={handleSearchChange}
        className="search-input"
      />
      <table className="product-table">
        <thead>
          <tr>
            <th className="product-table-header">Product Name</th>
            <th className="product-table-header">Category</th>
            <th className="product-table-header">Price</th>
            <th className="product-table-header">Quantity</th>
            <th className="product-table-header">Expire Date</th>
            <th className="product-table-header">Update</th>
            <th className="product-table-header">Delete</th>
          </tr>
        </thead>
        <tbody>
          {filteredProducts.map((product, index) => (
            <tr key={index}>
              <td className="product-table-data">{product.name}</td>
              <td className="product-table-data">{product.category}</td>
              <td className="product-table-data">{product.price}</td>
              <td className="product-table-data">{product.quantity}</td>
              <td className="product-table-data">{product.expireDate}</td>
              <td className="product-table-data">
                <Link to={`/Inventory_Dashboard/UpdateProduct/${product._id}`}>
                  <button className="inventory-manager-update-btn" >Update</button>
                </Link>
              </td>
              <td className="product-table-data">
                <button className="inventory-manager-delete-btn" onClick={() => handleDelete(product._id)}>Delete</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
  
}
