import React from 'react';
import Category from "./Category/Category";
import Price from "./Price/Price";
import "./Sidebar.css";

const Sidebar = ({ onPriceRangeChange, onCategoryChange }) => { 
  return (
    <section className="products-user-searching-sidebar">
      <div className="customer-product-list-category-filter">
        <h3 className="filter-title">Category</h3>
        <Category onCategoryChange={onCategoryChange} />
      </div>
      <div className="customer-product-list-price-filter">
        <h3 className="filter-title">Price</h3>
        <Price onPriceRangeChange={onPriceRangeChange} />
      </div>
    </section>
  );
};

export default Sidebar;
