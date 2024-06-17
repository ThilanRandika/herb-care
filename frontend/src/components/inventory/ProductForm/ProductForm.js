import React, { useState } from 'react';
import axios from 'axios';
import './ProductForm.css'; // Import your CSS file
import config from '../../../config';

function ProductForm() {
  const [formData, setFormData] = useState({
    name: '',
    category: '', // Change category input to dropdown
    description: '',
    price: '',
    Manufactured_price: '',
    discount: 0,
    quantity: '',
    imageFile: null,
    expireDate: '',
    manufactureDate: '',
    ingredients: ''
  });

  // const handleChange = (e) => {
  //   const { name, value } = e.target;
  //   setFormData({ ...formData, [name]: value });
  // };

  const handleChange = (e) => {
    const { name, value } = e.target;
    // Check if the value is negative before updating the state
    if ((name === 'price' || name === 'Manufactured_price' || name === 'quantity') && parseFloat(value) < 0) {
      return; // Do not update state for negative values
    }
    setFormData({ ...formData, [name]: value });
  };
  
  const handleImageChange = (e) => {
    setFormData({ ...formData, imageFile: e.target.files[0] });
    console.log(e.target.files[0]);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const formDataToSend = new FormData();
      formDataToSend.append('name', formData.name);
      formDataToSend.append('category', formData.category);
      formDataToSend.append('description', formData.description);
      formDataToSend.append('price', formData.price);
      formDataToSend.append('Manufactured_price', formData.Manufactured_price);
      formDataToSend.append('discount', formData.discount);
      formDataToSend.append('quantity', formData.quantity);
      formDataToSend.append('image', formData.imageFile); // Append image file
      formDataToSend.append('expireDate', formData.expireDate);
      formDataToSend.append('manufactureDate', formData.manufactureDate);
      formDataToSend.append('ingredients', formData.ingredients);

      await axios.post(`${config.BASE_URL}/Product/add`, formDataToSend, {
        headers: {
          'Content-Type': 'multipart/form-data' // Set content type to multipart/form-data
        }
      });
      alert('Product Added Successfully');
      // Optionally, redirect to another page after successful submission
    } catch (error) {
      alert('Error occurred while adding product');
      console.error(error);
    }
  };

  const today = new Date().toISOString().split('T')[0]; // Get today's date

  return (
    <div className="form-container-inventory-add">
      <legend className="form-legend">Add Product</legend>
      <form onSubmit={handleSubmit}>
        <div className="form-group-inventory-add">
          <label>Name:</label>
          <input type="text" name="name" value={formData.name} onChange={handleChange} required />
        </div>
        <div className="form-group-inventory-add">
          <label>Category:</label>
          <select name="category" value={formData.category} onChange={handleChange} required>
            <option value="">Select Category</option>
            <option value="Hair Care">Hair Care</option>
            <option value="Face and Body Care">Face and Body Care</option>
            <option value="Pain and Safety">Pain and Safety</option>
            <option value="Others">Others</option>
            
          </select>
        </div>
        <div className="form-group-inventory-add">
          <label>Description:</label>
          <textarea name="description" value={formData.description} onChange={handleChange} required />
        </div>
        <div className="form-group-inventory-add">
          <label>Price:</label>
          <input type="number" name="price" value={formData.price} onChange={handleChange} required />
        </div>
        <div className="form-group-inventory-add">
          <label>Manufactured Price:</label>
          <input type="number" name="Manufactured_price" value={formData.Manufactured_price} onChange={handleChange} required />
        </div>
        <div className="form-group-inventory-add">
          <label>Discount:</label>
          <input type="number" name="discount" value={formData.discount} onChange={handleChange} />
        </div>
        <div className="form-group-inventory-add">
          <label>Quantity:</label>
          <input type="number" name="quantity" value={formData.quantity} onChange={handleChange} required />
        </div>
        <div className="form-group-inventory-add">
          <label>Image:</label>
          <input type="file" name="image" onChange={handleImageChange} required />
        </div>
        <div className="form-group-inventory-add">
          <label>Expire Date:</label>
          <input type="date" name="expireDate" value={formData.expireDate}   min={today} onChange={handleChange} required />
        </div>
        <div className="form-group-inventory-add">
          <label>Manufacture Date:</label>
          <input type="date" name="manufactureDate" value={formData.manufactureDate}  max={today} onChange={handleChange} required />
        </div>
        <div className="form-group-inventory-add">
          <label>Ingredients:</label>
          <input type="text" name="ingredients" value={formData.ingredients} onChange={handleChange} required />
        </div>
        <button className="inventory-manager-add" type="submit">Submit</button>
      </form>
    </div>
  );
}

export default ProductForm;