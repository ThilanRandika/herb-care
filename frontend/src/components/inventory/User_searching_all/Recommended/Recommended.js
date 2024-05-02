import React from 'react';
import "./Recommended.css";

function Recommended() {
  return (
    <>
      <div>
        <h2 className="recommended-title-custom">Recommended</h2>
        <div className="recommended-flex-custom">
          <button className="recommended-button-custom" title="All Products">All Products</button>
          <button className="recommended-button-custom" title="Skin Care">Skin Care</button>
          <button className="recommended-button-custom" title="Face Cream">Face Cream</button>
        </div>
      </div>
    </>
  )
}

export default Recommended;
