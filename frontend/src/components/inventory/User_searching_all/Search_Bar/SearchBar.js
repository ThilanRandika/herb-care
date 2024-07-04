import React, { useState } from 'react';
import "./SearchBar.css";

function SearchBar({ onSearch }) {
  const [searchText, setSearchText] = useState('');

  const handleInputChange = (e) => {
    setSearchText(e.target.value);
    onSearch(e.target.value);
  };

  return (
    <nav className='userSearchingsearchBarnav'>
      <div className='shop-searchBar-title'>
        <h5>Search your favorite item with us...</h5>
      </div>
      <div className="userSearchingsearchBarnav-container">
        <input
          className="userSearchingsearchBarnav-search-input"
          type="text"
          value={searchText}
          onChange={handleInputChange}
          placeholder="Enter your search product..."
        />
      </div>
    </nav>
  )
}

export default SearchBar;
