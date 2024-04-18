import React from 'react';
import { Link } from 'react-router-dom';

function Inventory_DashSidebar() {
  return (
    <aside className="sidebar">
      <ul>
        <li>
          <Link to="/add-product">Add Product</Link>
        </li>
        <li>
          <Link to="/all-products">All Products</Link>
        </li>
      </ul>
    </aside>
  );
}

export default Inventory_DashSidebar;