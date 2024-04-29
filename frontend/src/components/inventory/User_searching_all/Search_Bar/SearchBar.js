import React, { useState } from 'react';
import "./SearchBar.css";
import { Link } from 'react-router-dom';
import { FiHeart } from "react-icons/fi";
import { AiOutlineShoppingCart, AiOutlineUserAdd } from "react-icons/ai";

function SearchBar({ onSearch }) {
  const [searchText, setSearchText] = useState('');

  const handleInputChange = (e) => {
    setSearchText(e.target.value);
    onSearch(e.target.value);
  };

  return (
    <nav>
      <div className="nav-container">
        <input
          className="search-input"
          type="text"
          value={searchText}
          onChange={handleInputChange}
          placeholder="Enter your search shoes."
        />
      </div>
      <div className="profile-container">
        <a href="#">
          <FiHeart className="nav-icons" />
        </a>
        <Link to={`/Cart`}>
          <AiOutlineShoppingCart className="nav-icons" />
        </Link>
        <a href="">
          <AiOutlineUserAdd className="nav-icons" />
        </a>
      </div>
    </nav>
  )
}

export default SearchBar;
