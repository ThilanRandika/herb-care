import React, { useState } from 'react';
import SearchBar from '../../components/inventory/User_searching_all/Search_Bar/SearchBar'
import Products from '../../components/inventory/User_searching_all/Products/Products'
import Recommended from '../../components/inventory/User_searching_all/Recommended/Recommended'
import Sidebar from '../../components/inventory/User_searching_all/SideBar/Sidebar'
import { Route, Routes } from 'react-router-dom'
import Product from './Product';



function User_searching() {
  const [searchQuery, setSearchQuery] = useState('');

  const handleSearch = (query) => {
    setSearchQuery(query);
  };

  const [selectedPriceRange, setSelectedPriceRange] = useState("");

  const handlePriceRangeChange = (range) => {
    setSelectedPriceRange(range);
  };

  return (
    <>
       <div>
        <Sidebar handleChange={handlePriceRangeChange} />
        <SearchBar onSearch={handleSearch}/>
        <Recommended/>
        <Products searchQuery={searchQuery} priceRange={selectedPriceRange}  />
        
      </div>
      <Routes>
        
        <Route path="/Product/:id" element={< Product/>} />
      </Routes>
    
    </>


    
  )
}

export default User_searching