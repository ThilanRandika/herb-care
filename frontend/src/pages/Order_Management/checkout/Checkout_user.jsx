import React, { useEffect, useState } from 'react';
import './checkout.css';
import { useParams, useNavigate } from 'react-router-dom';
import axios from 'axios'; // Import Axios

function Checkout_user() {
    const { price } = useParams();
    const navigate = useNavigate();

    const [formData, setFormData] = useState({
        fullName: '',
        email: '',
        address: '',
        city: '',
        zip: '',
        country: '',
        totalPrice: price // Initialize totalprice with the price from URL parameter
    });

    const [errors, setErrors] = useState({});
    const [successMessage, setSuccessMessage] = useState('');

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setFormData({
            ...formData,
            [name]: value
        });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (validateForm()) {
            try {
                const response = await axios.post('http://localhost:8070/Cart/addorder_checkout', formData); // Use Axios post method
                if (response.status === 201) {
                    console.log('Order added successfully:', response.data);
                    setSuccessMessage('Order added successfully!');
                    alert('Order added successfully!');
                    navigate('/cart');
                } else {
                    console.error('Failed to add order');
                }
            } catch (error) {
                console.error('Error adding order:', error);
            }
        }
    };

    const validateForm = () => {
        let isValid = true;
        let errors = {};

        // Full Name validation
        if (!formData.fullName.trim()) {
            errors.fullName = 'Full Name is required';
            isValid = false;
        }

        // Email validation
        if (!formData.email.trim()) {
            errors.email = 'Email is required';
            isValid = false;
        } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
            errors.email = 'Email is invalid';
            isValid = false;
        }

        // Address validation
        if (!formData.address.trim()) {
            errors.address = 'Address is required';
            isValid = false;
        }

        // City validation
        if (!formData.city.trim()) {
            errors.city = 'City is required';
            isValid = false;
        }

        // ZIP Code validation
        if (!formData.zip.trim()) {
            errors.zip = 'ZIP Code is required';
            isValid = false;
        }

        // Country validation
        if (!formData.country.trim()) {
            errors.country = 'Country is required';
            isValid = false;
        }

        setErrors(errors);
        return isValid;
    };

    // Update totalprice value if the price changes in the URL
    useEffect(() => {
        setFormData((prevFormData) => ({
            ...prevFormData,
            totalprice: price
        }));
    }, [price]);

    return (
        <div className="checkout-page" style={{ padding: 80 }}>
            <h2>Checkout</h2>
            {successMessage && <p className="success-message">{successMessage}</p>}
            <form onSubmit={handleSubmit}>
                <div className="form-group">
                    <label htmlFor="fullName">Full Name:</label>
                    <input
                        type="text"
                        id="fullName"
                        name="fullName"
                        value={formData.fullName}
                        onChange={handleInputChange}
                        
                    />
                    {errors.fullName && <p className="error-message">{errors.fullName}</p>}
                </div>
                <div className="form-group">
                    <label htmlFor="email">Email:</label>
                    <input
                        type="email"
                        id="email"
                        name="email"
                        value={formData.email}
                        onChange={handleInputChange}
                        
                    />
                    {errors.email && <p className="error-message">{errors.email}</p>}
                </div>
                <div className="form-group">
                    <label htmlFor="address">Address:</label>
                    <input
                        type="text"
                        id="address"
                        name="address"
                        value={formData.address}
                        onChange={handleInputChange}
                        
                    />
                    {errors.address && <p className="error-message">{errors.address}</p>}
                </div>
                <div className="form-group">
                    <label htmlFor="city">City:</label>
                    <input
                        type="text"
                        id="city"
                        name="city"
                        value={formData.city}
                        onChange={handleInputChange}
                        
                    />
                    {errors.city && <p className="error-message">{errors.city}</p>}
                </div>
                <div className="form-group">
                    <label htmlFor="zip">ZIP Code:</label>
                    <input
                        type="text"
                        id="zip"
                        name="zip"
                        value={formData.zip}
                        onChange={handleInputChange}
                        
                    />
                    {errors.zip && <p className="error-message">{errors.zip}</p>}
                </div>
                <div className="form-group">
                    <label htmlFor="country">Country:</label>
                    <input
                        type="text"
                        id="country"
                        name="country"
                        value={formData.country}
                        onChange={handleInputChange}
                        
                    />
                    {errors.country && <p className="error-message">{errors.country}</p>}
                </div>
                <div className="form-group">
                    <label htmlFor="totalprice">Total Price:</label>
                    <input
                        type="text"
                        id="totalprice"
                        name="totalPrice"
                        value={formData.totalPrice}
                        onChange={handleInputChange}
                        
                        disabled
                    />
                </div>
                <button type="submit">Place Order</button>
            </form>
        </div>
    );
}

export default Checkout_user;
