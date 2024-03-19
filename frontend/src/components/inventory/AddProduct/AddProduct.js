import React, { useState } from "react";
import axios from "axios";
import "./AddProduct.css";

export default function AddProduct() {
  // State variables to hold form data and selected image
  const [formData, setFormData] = useState({
    name: "",
    category: "",
    description: "",
    price: "",
    Manufactured_price: "",
    discount: 0,
    quantity: "",
    image_url: "",
    expireDate: "",
    manufactureDate: "",
    ingredients: ""
  });
  
  const [selectedImage, setSelectedImage] = useState(null);

  

  // Handler for form input changes
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  // Handler for image file change
  const handleImageChange = (e) => {
    const file = e.target.files[0];
    setSelectedImage(file);
  };

// Handler for form submission
const handleSubmit = async (e) => {
  e.preventDefault();
  try {
    // Post the form data to the backend
    await axios.post("http://localhost:8027/Product/add", formData);

    // If successful, display a success message
    alert("Product Added Successfully");
  } catch (error) {
    // If an error occurs, display the error message
    alert(error.message);
  }
};



  return (
    <div className="container">
      <form onSubmit={handleSubmit}>
        <div className="form-group row">
          <label htmlFor="name" className="col-sm-2 col-form-label">Name:</label>
          <div className="col-sm-10">
            <input type="text" className="form-control" id="name" name="name" value={formData.name} onChange={handleChange} required />
          </div>
        </div>
        <div className="form-group row">
          <label htmlFor="category" className="col-sm-2 col-form-label">Category:</label>
          <div className="col-sm-10">
            <input type="text" className="form-control" id="category" name="category" value={formData.category} onChange={handleChange} required />
          </div>
        </div>
        <div className="form-group row">
          <label htmlFor="description" className="col-sm-2 col-form-label">Description:</label>
          <div className="col-sm-10">
            <textarea className="form-control" id="description" name="description" value={formData.description} onChange={handleChange} required />
          </div>
        </div>
        <div className="form-group row">
          <label htmlFor="price" className="col-sm-2 col-form-label">Price:</label>
          <div className="col-sm-10">
            <input type="number" className="form-control" id="price" name="price" value={formData.price} onChange={handleChange} required />
          </div>
        </div>
        <div className="form-group row">
          <label htmlFor="manufacturedPrice" className="col-sm-2 col-form-label">Manufactured Price:</label>
          <div className="col-sm-10">
            <input type="number" className="form-control" id="manufacturedPrice" name="Manufactured_price" value={formData.Manufactured_price} onChange={handleChange} required />
          </div>
        </div>
        <div className="form-group row">
          <label htmlFor="discount" className="col-sm-2 col-form-label">Discount:</label>
          <div className="col-sm-10">
            <input type="number" className="form-control" id="discount" name="discount" value={formData.discount} onChange={handleChange} />
          </div>
        </div>
        <div className="form-group row">
          <label htmlFor="quantity" className="col-sm-2 col-form-label">Quantity:</label>
          <div className="col-sm-10">
            <input type="number" className="form-control" id="quantity" name="quantity" value={formData.quantity} onChange={handleChange} required />
          </div>
        </div>
        <div className="form-group row">
          <label htmlFor="image_url" className="col-sm-2 col-form-label">Image Upload:</label>
          <div className="col-sm-10">
            <input type="file" className="form-control-file" id="image_url" name="image_url" onChange={handleImageChange} />
          </div>
        </div>
        <div className="form-group row">
          <label htmlFor="expireDate" className="col-sm-2 col-form-label">Expire Date:</label>
          <div className="col-sm-10">
            <input type="date" className="form-control" id="expireDate" name="expireDate" value={formData.expireDate} onChange={handleChange} required />
          </div>
        </div>
        <div className="form-group row">
          <label htmlFor="manufactureDate" className="col-sm-2 col-form-label">Manufacture Date:</label>
          <div className="col-sm-10">
            <input type="date" className="form-control" id="manufactureDate" name="manufactureDate" value={formData.manufactureDate} onChange={handleChange} required />
          </div>
        </div>
        <div className="form-group row">
          <label htmlFor="ingredients" className="col-sm-2 col-form-label">Ingredients:</label>
          <div className="col-sm-10">
            <input type="text" className="form-control" id="ingredients" name="ingredients" value={formData.ingredients} onChange={handleChange} required />
          </div>
        </div>
        <div className="form-group row">
          <div className="col-sm-10">
            <button type="submit" className="btn btn-primary">Submit</button>
          </div>
        </div>
      </form>
    </div>
  );
}
