import React, { useState } from 'react';
import "./Price.css";

const Price = ({ onPriceRangeChange }) => {
  const [selectedPriceRange, setSelectedPriceRange] = useState("");

  const handleChange = (e) => {
    const range = e.target.value;
    setSelectedPriceRange(range);
    onPriceRangeChange(range); // Pass the selected price range to the parent component
  };

  return (
    <div className="User-searching-price-container">
      <h3 className="User-searching-price-heading">Price Range:</h3>
      <div className="User-searching-price-option">
        <input
          type="radio"
          id="0-1000"
          name="priceRange"
          value="0-1000"
          onChange={handleChange}
        />
        <label htmlFor="0-1000">Rs.0 - Rs.1000</label>
      </div>
      <div className="User-searching-price-option">
        <input
          type="radio"
          id="1000-2000"
          name="priceRange"
          value="1000-2000"
          onChange={handleChange}
        />
        <label htmlFor="1000-2000">Rs.1000 - Rs.2000</label>
      </div>
      <div className="User-searching-price-option">
        <input
          type="radio"
          id="2000-3000"
          name="priceRange"
          value="2000-3000"
          onChange={handleChange}
        />
        <label htmlFor="2000-3000">Rs.2000 - Rs.3000</label>
      </div>
      <div className="User-searching-price-option">
        <input
          type="radio"
          id="3000-4000"
          name="priceRange"
          value="3000-4000"
          onChange={handleChange}
        />
        <label htmlFor="3000-4000">Rs.3000 - Rs.4000</label>
      </div>
      <div className="User-searching-price-option">
        <input
          type="radio"
          id="4000-5000"
          name="priceRange"
          value="4000-5000"
          onChange={handleChange}
        />
        <label htmlFor="4000-5000">Rs.4000 - Rs.5000</label>
      </div>
      <div className="User-searching-price-option">
        <input
          type="radio"
          id="above-5000"
          name="priceRange"
          value="above-5000"
          onChange={handleChange}
        />
        <label htmlFor="above-5000">Above Rs.5000</label>
      </div>
    </div>
  );
};

export default Price;
