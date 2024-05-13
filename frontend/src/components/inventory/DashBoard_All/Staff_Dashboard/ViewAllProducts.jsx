import React, { useState, useEffect } from "react";
import axios from "axios";
import { Link } from "react-router-dom"; // Import Link from react-router-dom
import "./ViewAllProducts.css"; // Import CSS file for styling

export default function ViewAllProducts() {
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

  const handleDelete = async (product) => {
    try {
      const productToDelete = {
        action: "Remove",
        ProductID: product._id,
        name: product.name,
        category: product.category,
        description: product.description,
        price: product.price,
        Manufactured_price: product.Manufactured_price,
        discount: product.discount,
        quantity: product.quantity,
        image: product.image,
        expireDate: product.expireDate,
        manufactureDate: product.manufactureDate,
        ingredients: product.ingredients
      };
  
      await axios.post('http://localhost:8070/ApprovalProcess/addDelete', productToDelete);
      
    } catch (error) {
      console.error('Error deleting product:', error);
      alert('Failed to delete product');
    }
  };
  
  

  // Handle search query change
  const handleSearchChange = (e) => {
    setSearchQuery(e.target.value);
    // Filter products based on search query
    const filtered = products.filter((product) =>
      product.name.toLowerCase().includes(e.target.value.toLowerCase())
    );
    setFilteredProducts(filtered);
  };



  // Function to extract only the date part from the datetime string
  const extractDate = (dateTimeString) => {
    return dateTimeString.split("T")[0];
  };


  return (
    <div className="staff-products-container">
      <input
        type="text"
        placeholder="Search by product name..."
        value={searchQuery}
        onChange={handleSearchChange}
        className="staff-search-input"
      />
      <table className="staff-product-table">
        <thead>
          <tr className="staff-product-table-header">
            <th>Product Name</th>
            <th>Category</th>
            <th>Price</th>
            <th>Quantity</th>
            <th>Expire Date</th>
            <th>Update</th>
            <th>Delete</th>
          </tr>
        </thead>
        <tbody>
          {filteredProducts.map((product, index) => (
            <tr key={index} >
              <td className="staff-product-table-data">{product.name}</td>
              <td className="staff-product-table-data">{product.category}</td>
              <td className="staff-product-table-data">{product.price}</td>
              <td className="staff-product-table-data">{product.quantity}</td>
              <td className="staff-product-table-data">{extractDate(product.expireDate)}</td>
              <td className="staff-product-table-data">
                <Link to={`/staff/Staff_Dashboard/StaffUpdateProduct/${product._id}`}>
                  <button className="staff-update-btn">Update</button>
                </Link>
              </td>
              <td className="staff-product-table-data">
              
                <button className="staff-delete-btn" onClick={() => handleDelete(product)}>Delete</button>

              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
