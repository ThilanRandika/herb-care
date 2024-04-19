import React, { useState } from "react";

function SearchBar({ onSearch }) {
  const [searchQuery, setSearchQuery] = useState("");

  const handleChange = (e) => {
    const query = e.target.value;
    setSearchQuery(query);
    onSearch(query); // Call the search function whenever input value changes
  };

  return (
    <form>
      <input
        type="text"
        className="seller-searchbar-input"
        placeholder="Search..."
        value={searchQuery}
        onChange={handleChange} // Trigger search function on input change
      />
    </form>
  );
}

export default SearchBar;