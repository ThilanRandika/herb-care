import React from 'react';
import "./Recommended.css";

function Recommended() {
  const handleAllProductsClick = () => {
    // Refresh the page
    window.location.reload();
  };

  return (
    <>
      <div>
        <p></p>
        {/* <h2 className="recommended-title-custom">Recommended</h2> */}
        <div className="recommended-flex-custom">
          
          {/* <button className="recommended-button-custom" title="All Products" onClick={handleAllProductsClick}>All Products</button> */}
          {/* <button className="recommended-button-custom" title="Skin Care">Skin Care</button>
          <button className="recommended-button-custom" title="Face Cream">Face Cream</button> */}
        </div>
      </div>
    </>
  )
}

export default Recommended;
