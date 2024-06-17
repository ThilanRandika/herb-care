import React, { useState, useEffect } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import { FaCubes, FaDollarSign, FaShoppingCart, FaTags } from "react-icons/fa"; // Import icons from react-icons
import { PDFDownloadLink, Document, Page, Text, View, StyleSheet, Image } from '@react-pdf/renderer';
import logoImage from "../../../Images/logo/Herb_Care_Logo.png"; // Import your logo image
import "./AllProducts.css";
import config from "../../../config";

export default function AllProducts() {
  const [products, setProducts] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [filteredProducts, setFilteredProducts] = useState([]);

  useEffect(() => {
    function getProducts() {
      axios
        .get(`${config.BASE_URL}/Product/`)
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
      await axios.delete(`${config.BASE_URL}/Product/delete/${productId}`);
      // Remove the deleted product from the state
      setFilteredProducts(filteredProducts.filter((product) => product._id !== productId));
      setProducts(products.filter((product) => product._id !== productId));
      alert("Product deleted successfully");
    } catch (error) {
      console.error('Error deleting product:', error);
      alert('Failed to delete product');
    }
  };

  const styles = StyleSheet.create({
    page: {
      flexDirection: 'column',
      padding: 20,
    },
    header: {
      flexDirection: 'row',
      justifyContent: 'center',
      marginBottom: 20,
    },
    headerText: {
      fontSize: 24,
      fontWeight: 'bold',
    },
    cardContainer: {
      flexDirection: 'row',
      flexWrap: 'wrap',
      marginTop:140,
      marginBottom: 30,
    },
    card: {
      width: 'calc(25% - 25px)', // Adjust as needed for card spacing
      backgroundColor: '#f0f0f0',
      padding: 10,
      margin: 10,
      borderRadius: 5,
      boxShadow: '0 0 5px rgba(0, 0, 0, 0.2)',
      textAlign: 'center',
    },
    cardTitle: {
      fontSize: 18,
      fontWeight: 'bold',
      
      marginBottom: 5,
    },
    cardValue: {
      fontSize: 12,
    },
    productContainer: {
      marginBottom: 20,
      borderBottom: 1,
      borderBottomColor: '#ccc',
      paddingBottom: 10,
    },
    label: {
      fontWeight: 'bold',
      fontSize: 18,
      marginBottom: 5,
    },
    value: {
      fontSize: 12,
      marginBottom: 10,
      
    },
    logo: {
      position: 'absolute',
      top: 20,
      left: 20,
      width: 100, // Adjust as needed
      height: 100, // Adjust as needed
    },
  });
  

  const MyDocument = () => (
    <Document>
      <Page style={styles.page}>
        <Image src={logoImage} style={styles.logo} />
        <View style={styles.header}>
          <Text style={styles.headerText}>Inventory Report</Text>
        </View>
        <View style={styles.cardContainer}>
          <View style={styles.card}>
            <Text style={styles.cardTitle}>Total Products</Text>
            <Text style={styles.cardValue}>{products.length}</Text>
          </View>
          <View style={styles.card}>
            <Text style={styles.cardTitle}>Total Store Value</Text>
            <Text style={styles.cardValue}>Rs. {products.reduce((acc, curr) => acc + curr.price * curr.quantity, 0)}</Text>
          </View>
          <View style={styles.card}>
            <Text style={styles.cardTitle}>Out of Stock</Text>
            <Text style={styles.cardValue}>{products.filter((product) => product.quantity === 0).length}</Text>
          </View>
          <View style={styles.card}>
            <Text style={styles.cardTitle}>All Categories</Text>
            <Text style={styles.cardValue}>{[...new Set(products.map((product) => product.category))].length}</Text>
          </View>
        </View>
        {filteredProducts.map((product, index) => (
          <View key={index} style={styles.productContainer}>
            {Object.keys(product).map((key) => (
              <View key={key}>
                <Text style={styles.label}>{key}:</Text>
                <Text style={styles.value}>{product[key]}</Text>
              </View>
            ))}
          </View>
        ))}
      </Page>
    </Document>
  );
  
  // Function to extract only the date part from the datetime string
  const extractDate = (dateTimeString) => {
    return dateTimeString.split("T")[0];
  };

  return (
    <div className="all-products-container">
      <div className="cards2-container">
        <div className="card2">
          <FaCubes className="icon2" />
          <h3 className="title2">Total Products</h3>
          <h3 className="count2">{products.length}</h3>
        </div>
        <div className="card2">
          <FaDollarSign className="icon2" />
          <h3 className="title2">Total Store Value</h3>
          {/* Calculate total store value */}
          <h3 className="count2">Rs. {products.reduce((acc, curr) => acc + curr.price * curr.quantity, 0)}</h3>
        </div>
        <div className="card2 out-of-stock-card">
          <FaShoppingCart className="icon2" />
          <h3 className="title2">Out of Stock</h3>
          <h3 className="count2">{products.filter((product) => product.quantity === 0).length}</h3>
        </div>
        <div className="card2">
          <FaTags className="icon2" />
          <h3 className="title2">All Categories</h3>
          {/* Get unique categories */}
          <h3 className="count2">{[...new Set(products.map((product) => product.category))].length}</h3>
        </div>
      </div>
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
              <td className="product-table-data">{extractDate(product.expireDate)}</td>
              <td className="product-table-data">
                <Link to={`/manager/Inventory_Dashboard/UpdateProduct/${product._id}`}>
                  <button className="inventory-manager-update-btn">Update</button>
                </Link>
              </td>
              <td className="product-table-data">
                <button className="inventory-manager-delete-btn" onClick={() => handleDelete(product._id)}>Delete</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      <PDFDownloadLink document={<MyDocument />} fileName="product_report.pdf">
        {({ blob, url, loading, error }) =>
          loading ? 'Generating PDF...' : <button className="report-generate-button">Report Generate</button>
        }
      </PDFDownloadLink>
    </div>
  );
}
