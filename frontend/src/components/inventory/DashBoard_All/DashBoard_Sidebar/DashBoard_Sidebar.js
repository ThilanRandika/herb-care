import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { BsFillGridFill, BsPlusCircleFill, BsListUl, BsPersonFill, BsGearFill } from 'react-icons/bs'; // Importing icons from react-icons library
import './DashBoard_Sidebar.css';
import AddProduct from '../../AddProduct/AddProduct';
import AllProducts from '../../AllProduct/AllProducts';

const Sidebar1 = ({ handleMenuItemClick }) => { // Receive handleMenuItemClick as a prop
  return (
    <div className="sidebar">
      <h2>Inventory Dashboard</h2>
      <ul className="sidebar-menu">
        <li>
          <Link to="/dashboard">
            <BsFillGridFill /> Dashboard
          </Link>
        </li>
        <li>
          <Link to="/AddProduct" onClick={() => handleMenuItemClick('add-product')}>
            <BsPlusCircleFill /> Add Product
          </Link>
        </li>
        <li>
          <Link to="/all-products" onClick={() => handleMenuItemClick('all-products')}>
            <BsListUl /> All Products
          </Link>
        </li>
        <li>
          <Link to="/profile">
            <BsPersonFill /> Profile
          </Link>
        </li>
        <li>
          <Link to="/settings">
            <BsGearFill /> Settings
          </Link>
        </li>
      </ul>
    </div>
  );
};

const Inventory_Dashboard = () => {
  const [selectedComponent, setSelectedComponent] = useState(null);

  const handleMenuItemClick = (component) => {
    setSelectedComponent(component);
  };

  return (
    <div className="dashboard">
      <Sidebar handleMenuItemClick={handleMenuItemClick} /> {/* Pass handleMenuItemClick as a prop */}
      <div className="content">
        {selectedComponent === 'dashboard' && <h3>Dashboard Content</h3>}
        {selectedComponent === 'add-product' && <AddProduct />}
        {selectedComponent === 'all-products' && <AllProducts />}
        {/* Add similar conditions for other components */}
      </div>
      <div className="additional-section">
        {/* Content for the additional section */}
      </div>
    </div>
  );
};

export default Inventory_Dashboard;
