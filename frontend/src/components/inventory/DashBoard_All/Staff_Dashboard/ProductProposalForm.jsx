import React, { useState } from 'react';
import axios from 'axios';
import './ProductProposalForm.css'; 

function ApprovalProcessForm() {
  const [formData, setFormData] = useState({
    name: '',
    category: '',
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

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleImageChange = (e) => {
    setFormData({ ...formData, imageFile: e.target.files[0] });
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
      formDataToSend.append('action', 'Add'); // Set action to "Add"

      await axios.post('http://localhost:8070/ApprovalProcess/addProposal', formDataToSend, {
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

  return (
    <div className="staff-form-container">
      <legend className="staff-form-legend">Add Product Proposal</legend>
      <form onSubmit={handleSubmit}>
        <div className="staff-form-group">
          <label className="staff-label">Name:</label>
          <input type="text" name="name" value={formData.name} onChange={handleChange} className="staff-input" required />
        </div>
        <div className="staff-form-group">
          <label className="staff-label">Category:</label>
          <input type="text" name="category" value={formData.category} onChange={handleChange} className="staff-input" required />
        </div>
        <div className="staff-form-group">
          <label className="staff-label">Description:</label>
          <textarea name="description" value={formData.description} onChange={handleChange} className="staff-input" required />
        </div>
        <div className="staff-form-group">
          <label className="staff-label">Price:</label>
          <input type="number" name="price" value={formData.price} onChange={handleChange} className="staff-input" required />
        </div>
        <div className="staff-form-group">
          <label className="staff-label">Manufactured Price:</label>
          <input type="number" name="Manufactured_price" value={formData.Manufactured_price} onChange={handleChange} className="staff-input" required />
        </div>
        <div className="staff-form-group">
          <label className="staff-label">Discount:</label>
          <input type="number" name="discount" value={formData.discount} onChange={handleChange} className="staff-input" />
        </div>
        <div className="staff-form-group">
          <label className="staff-label">Quantity:</label>
          <input type="number" name="quantity" value={formData.quantity} onChange={handleChange} className="staff-input" required />
        </div>
        <div className="staff-form-group">
          <label className="staff-label">Image:</label>
          <input type="file" name="image" onChange={handleImageChange} className="staff-input" required />
        </div>
        <div className="staff-form-group">
          <label className="staff-label">Expire Date:</label>
          <input type="date" name="expireDate" value={formData.expireDate} onChange={handleChange} className="staff-input" required />
        </div>
        <div className="staff-form-group">
          <label className="staff-label">Manufacture Date:</label>
          <input type="date" name="manufactureDate" value={formData.manufactureDate} onChange={handleChange} className="staff-input" required />
        </div>
        <div className="staff-form-group">
          <label className="staff-label">Ingredients:</label>
          <input type="text" name="ingredients" value={formData.ingredients} onChange={handleChange} className="staff-input" required />
        </div>
        <button type="submit" className="staff-button">Submit</button>
      </form>
    </div>
  );
}

export default ApprovalProcessForm;
