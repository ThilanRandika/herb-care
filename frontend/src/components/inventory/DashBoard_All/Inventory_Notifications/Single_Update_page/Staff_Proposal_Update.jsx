import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import config from '../../../../../config';

function Staff_Proposal_Update() {
    const { id } = useParams(); // Get the proposal id from the URL parameter
    const [proposal, setProposal] = useState(null);
    const [formData, setFormData] = useState({
      name: '',
      price: '',
      Manufactured_price: '',
      category: '',
      manufactureDate: '',
      expireDate: '',
      description: '',
      ingredients: '',
      quantity: '',
      image: null,
    });
  
    useEffect(() => {
      axios.get(`${config.BASE_URL}/ApprovalProcess/${id}`)
        .then((res) => {
          setProposal(res.data.approval); // Assuming the data is in res.data.approval
          setFormData({
            name: res.data.approval.name,
            price: res.data.approval.price,
            Manufactured_price: res.data.approval.Manufactured_price,
            category: res.data.approval.category,
            manufactureDate: formatDate(res.data.approval.manufactureDate),
            expireDate: formatDate(res.data.approval.expireDate),
            description: res.data.approval.description,
            ingredients: res.data.approval.ingredients,
            quantity: res.data.approval.quantity,
            image: res.data.approval.image,
          }); // Initialize form data with proposal details and format dates
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

    const handleImageChange = async (e) => {
        if (e.target.files.length > 0) {
          // If image is uploaded, set it in formData
          setFormData({ ...formData, image: e.target.files[0] });
        } else {
          try {
            // If no image uploaded, fetch previous image from database
            const response = await axios.get(`${config.BASE_URL}/ApprovalProcess/${id}`);
            const previousImage = response.data.approval.image; // Fix the variable name here
            // Set previous image in formData
            setFormData({ ...formData, image: previousImage });
          } catch (error) {
            alert('Error fetching previous image');
            console.error(error);
          }
        }
      };
      
  
    const handleSubmit = async (e) => {
      e.preventDefault();
  
      try {
        // Submit the form data as needed
      } catch (error) {
        alert('Error occurred while updating proposal');
        console.error(error);
      }
    };
  
    if (!proposal) {
      return <div>Loading...</div>;
    }
  
    return (
      <div className="update-product-container">
        <h2 className="update-product-title">Update Proposal</h2>
        <form className="update-product-form" onSubmit={handleSubmit}>
        
          {/* Render form fields with proposal data */}

          <div className="form-group">

          <label className="form-label">Image:</label>
          <img src={require(`../../../../../../../BACKEND/uploads/${proposal.image}`)} alt={formData.name} className="product-image" />
          <input type="file" name="image" onChange={handleImageChange} className="form-input" />

        </div>

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

export default Staff_Proposal_Update;
