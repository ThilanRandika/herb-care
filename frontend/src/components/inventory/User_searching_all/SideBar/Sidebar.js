import React from 'react';
import Category from "./Category/Category";
import Price from "./Price/Price";

import "./Sidebar.css";

const Sidebar = ({ onPriceRangeChange }) => {
  return (
    <section className="sidebar">
      <div className="logo-container">
        <h1>🛒</h1>
      </div>
      <Category />
      {/* Pass onPriceRangeChange to Price component */}
      <Price onPriceRangeChange={onPriceRangeChange} />
    </section>
  );
};

export default Sidebar;
