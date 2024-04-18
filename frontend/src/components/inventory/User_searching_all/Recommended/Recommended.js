import React from 'react';
import "./Recommended.css";
import Button from '../Button';

function Recommended() {
  return (
    <>
      <div>
        <h2 className="recommended-title">Recommended</h2>
        <div className="recommended-flex">
          <Button className="recommended-button" value="" title="All Products" />
          <Button className="recommended-button" value="Nike" title="Nike" />
          <Button className="recommended-button" value="Adidas" title="Adidas" />
          <Button className="recommended-button" value="Puma" title="Puma" />
          <Button className="recommended-button" value="Vans" title="Vans" />
        </div>
      </div>
    </>
  )
}

export default Recommended;
