import React, { useState } from 'react';
import SearchBar from '../../../components/inventory/User_searching_all/Search_Bar/SearchBar';
import Products from '../../../components/inventory/User_searching_all/Products/Products';
import Recommended from '../../../components/inventory/User_searching_all/Recommended/Recommended';
import Sidebar from '../../../components/inventory/User_searching_all/SideBar/Sidebar';

import Cart from '../../Order_Management/Cart';

import { Route, Routes } from 'react-router-dom';
import Product from './Product';

import "./User_searching.css"; // Import CSS for User_searching component

function User_searching() {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedPriceRange, setSelectedPriceRange] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("");

  const handleSearch = (query) => {
    setSearchQuery(query);
  };

  const handlePriceRangeChange = (range) => {
    setSelectedPriceRange(range);
  };

  const handleCategoryChange = (category) => { 
    setSelectedCategory(category);
  };

  return (
    <>
      <div className="user-searching-container">
        <div className="User-searching-sidebar">
          {/* Pass handlePriceRangeChange function to Sidebar */}
          <Sidebar onPriceRangeChange={handlePriceRangeChange} onCategoryChange={handleCategoryChange} />
        </div>

        <div className="user-searching-content">
          <SearchBar onSearch={handleSearch}/>
          <Recommended/>
          <Products searchQuery={searchQuery} priceRange={selectedPriceRange} category={selectedCategory}  />
        </div>
      </div>

      <Routes>
        <Route path="/Product/:id" element={< Product/>} />
        <Route path="/Cart" element={<Cart/>} />
      </Routes>
    </>
  )
}

export default User_searching;
