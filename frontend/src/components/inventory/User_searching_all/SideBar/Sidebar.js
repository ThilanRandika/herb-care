import React from 'react';
import Category from "./Category/Category";
import Price from "./Price/Price";

import "./Sidebar.css";

const Sidebar = ({ onPriceRangeChange, onCategoryChange }) => { 
  return (
    <section className="sidebar">
      <div className="logo-container">
        <h1>🛒</h1>
      </div>
      
      <Category onCategoryChange={onCategoryChange} /> 
    
      <Price onPriceRangeChange={onPriceRangeChange} />
    </section>
  );
};

export default Sidebar;
