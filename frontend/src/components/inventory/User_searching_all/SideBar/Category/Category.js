import React, { useState } from 'react';
import "./Category.css";


const CategorySelector = ({ onCategoryChange }) => {
  const [selectedCategory, setSelectedCategory] = useState("");

  const handleCategoryChange = (e) => {
    const category = e.target.value;
    setSelectedCategory(category);
    onCategoryChange(category); // Pass the selected category to the parent component
  };

  return (
    <div className="User-search-category-container">
      <h3 className="User-search-category-heading">Category:</h3>
      {/* Category radio buttons */}
      <div className="User-search-category-option">
        <input
          type="radio"
          id="hair-care"
          name="category"
          value="Hair Care"
          onChange={handleCategoryChange}
        />
        <label htmlFor="hair-care">Hair Care</label>
      </div>
      <div className="User-search-category-option">
        <input
          type="radio"
          id="face-body-care"
          name="category"
          value="Face and Body Care"
          onChange={handleCategoryChange}
        />
        <label htmlFor="face-body-care">Face and Body Care</label>
      </div>
      <div className="User-search-category-option">
        <input
          type="radio"
          id="pain-safety"
          name="category"
          value="Pain and Safety"
          onChange={handleCategoryChange}
        />
        <label htmlFor="pain-safety">Pain and Safety</label>
      </div>
      <div className="User-search-category-option">
        <input
          type="radio"
          id="others"
          name="category"
          value="Others"
          onChange={handleCategoryChange}
        />
        <label htmlFor="others">Others</label>
      </div>
    </div>
  );
};

export default CategorySelector;


