import React, { useState } from 'react';
import SearchBar from '../../../components/inventory/User_searching_all/Search_Bar/SearchBar';
import Products from '../../../components/inventory/User_searching_all/Products/Products';
import Recommended from '../../../components/inventory/User_searching_all/Recommended/Recommended';
import Sidebar from '../../../components/inventory/User_searching_all/SideBar/Sidebar';
import Footer from '../../../components/common/footer/footer';
import Cart from '../../Order_Management/Cart';
import { Route, Routes } from 'react-router-dom';
import Product from './Product';
import "./User_searching.css";
import Header from '../../../components/common/header/header';

function User_searching() {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedPriceRange, setSelectedPriceRange] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("");
  const [selectedFilters, setSelectedFilters] = useState([]);

  const handleSearch = (query) => {
    setSearchQuery(query);
  };

  const handlePriceRangeChange = (range) => {
    setSelectedPriceRange(range);
    updateSelectedFilters('priceRange', range);
  };

  const handleCategoryChange = (category) => {
    setSelectedCategory(category);
    updateSelectedFilters('category', category);
  };

  const updateSelectedFilters = (type, value) => {
    setSelectedFilters(prevFilters => {
      const existingFilter = prevFilters.find(filter => filter.type === type);
      if (existingFilter) {
        return prevFilters.map(filter => filter.type === type ? { type, value } : filter);
      }
      return [...prevFilters, { type, value }];
    });
  };

  const removeFilter = (type) => {
    setSelectedFilters(prevFilters => prevFilters.filter(filter => filter.type !== type));
    if (type === 'priceRange') setSelectedPriceRange("");
    if (type === 'category') setSelectedCategory("");
  };

  const clearAllFilters = () => {
    setSelectedFilters([]);
    setSelectedPriceRange("");
    setSelectedCategory("");
  };

  return (
    <>
      <Header />
      <br />
      <br />
      <div className="user-searching-display_header_card">
          <h1 className="user-searching-display_header">Shop: All Products</h1>
          <h5 className="user-searching-display_header">Lorem ipsum dolor sit amet consectetur.</h5>
          <p className="user-searching-display_header">Quick  -  Easy  -  The best</p>
          <p className="user-searching-display_header">From Us</p>
      </div>
      <div className="user-searching-container">
        <div className="user-searching-sidebar">
          <Sidebar onPriceRangeChange={handlePriceRangeChange} onCategoryChange={handleCategoryChange} />
        </div>
        <div className="user-searching-content">
          <SearchBar onSearch={handleSearch} />
          <div className="user-searching-filter-bar">
            <div className="filter-tags">
              {selectedFilters.map(filter => (
                <span className='filter-tags-name' key={filter.type}>
                  {filter.value} <h5 onClick={() => removeFilter(filter.type)}>x</h5>
                </span>
              ))}
              <button className="clear-filters" onClick={clearAllFilters}>Clear all filters</button>
            </div>
          </div>
          <div className='user-searching-products-display'>
          <Products searchQuery={searchQuery} priceRange={selectedPriceRange} category={selectedCategory} />
          </div>
        </div>
      </div>
      <Footer />
      <Routes>
        <Route path="/Product/:id" element={<Product />} />
        <Route path="/Cart" element={<Cart />} />
      </Routes>
    </>
  );
}

export default User_searching;
