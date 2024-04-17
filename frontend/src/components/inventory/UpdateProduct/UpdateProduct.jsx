import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import './UpdateProduct.css';

function Product() {
  const { id } = useParams(); // Get the product id from the URL parameter
  const [product, setProduct] = useState(null);
  const [formData, setFormData] = useState({
    name: '',
    price: '',
    Manufactured_price: '',
    category: '',
    manufactureDate: '',
    expireDate: '',
    description: '',
    ingredients: '',
    quantity: ''
  });

  useEffect(() => {
    axios.get(`http://localhost:8070/Product/${id}`)
      .then((res) => {
        setProduct(res.data.product);
        setFormData({
          ...res.data.product,
          manufactureDate: formatDate(res.data.product.manufactureDate),
          expireDate: formatDate(res.data.product.expireDate)
        }); // Initialize form data with product details and format dates
      })
      .catch((err) => {
        alert(err.message);
      });
  }, [id]);

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    const year = date.getFullYear();
    let month = date.getMonth() + 1;
    month = month < 10 ? `0${month}` : month;
    let day = date.getDate();
    day = day < 10 ? `0${day}` : day;
    return `${year}-${month}-${day}`;
  };

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.put(`http://localhost:8070/Product/update/${id}`, formData);
      console.log(response.data);
      alert('Product updated successfully');
    } catch (error) {
      alert(error.message);
    }
  };

  if (!product) {
    return <div>Loading...</div>;
  }

  return (
    <div className="update-product-container">
      <h2 className="update-product-title">Update Product</h2>
      <form className="update-product-form" onSubmit={handleSubmit}>
        <div className="form-group">
          <label className="form-label">Name:</label>
          <input type="text" name="name" value={formData.name} onChange={handleChange} className="form-input" />
        </div>

        <div className="form-group">
          <label className="form-label">Price:</label>
          <input type="text" name="price" value={formData.price} onChange={handleChange} className="form-input" />
        </div>

        <div className="form-group">
          <label className="form-label">Manufactured Price:</label>
          <input type="text" name="Manufactured_price" value={formData.Manufactured_price} onChange={handleChange} className="form-input" />
        </div>

        <div className="form-group">
          <label className="form-label">Category:</label>
          <input type="text" name="category" value={formData.category} onChange={handleChange} className="form-input" />
        </div>

        <div className="form-group">
          <label className="form-label">Manufacture Date:</label>
          <input type="date" name="manufactureDate" value={formData.manufactureDate} onChange={handleChange} className="form-input" />
        </div>

        <div className="form-group">
          <label className="form-label">Expire Date:</label>
          <input type="date" name="expireDate" value={formData.expireDate} onChange={handleChange} className="form-input" />
        </div>

        <div className="form-group">
          <label className="form-label">Description:</label>
          <input type="text" name="description" value={formData.description} onChange={handleChange} className="form-input" />
        </div>

        <div className="form-group">
          <label className="form-label">Ingredients:</label>
          <input type="text" name="ingredients" value={formData.ingredients} onChange={handleChange} className="form-input" />
        </div>

        <div className="form-group">
          <label className="form-label">Quantity:</label>
          <input type="text" name="quantity" value={formData.quantity} onChange={handleChange} className="form-input" />
        </div>

        <button type="submit" className="submit-button">Update</button>
      </form>
    </div>
  );
}

export default Product;
