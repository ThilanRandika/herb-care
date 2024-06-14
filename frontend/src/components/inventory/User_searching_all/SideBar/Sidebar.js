import React from 'react';
import Category from "./Category/Category";
import Price from "./Price/Price";

import "./Sidebar.css";

const Sidebar = ({ onPriceRangeChange, onCategoryChange }) => { 
  return (
    <section className="products-userSearchingsidebar">

      <div className="products-userSearchingsidebarcontents">
        <Category onCategoryChange={onCategoryChange} /> 

        <br></br>
    
        <Price onPriceRangeChange={onPriceRangeChange} />

      </div>
    </section>
  );
};

export default Sidebar;
