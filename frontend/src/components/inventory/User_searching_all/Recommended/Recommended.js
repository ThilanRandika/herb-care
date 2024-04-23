import React from 'react';
import "./Recommended.css";
import Button from '../Button';

function Recommended() {
  return (
    <>
      <div>
        <h2 className="recommended-title-custom">Recommended</h2>
        <div className="recommended-flex-custom">
          <a href=" " className="recommended-link recommended-all-products">
            <Button className="recommended-button-custom" title="All Products" />
          </a>
          <a href=" " className="recommended-link recommended-skin-care">
            <Button className="recommended-button-custom" title="Skin Care" />
          </a>
          <a href=" " className="recommended-link recommended-face-cream">
            <Button className="recommended-button-custom" title="Face Cream" />
          </a>
        </div>
      </div>
    </>
  )
}

export default Recommended;
