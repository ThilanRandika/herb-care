import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { BsFillGridFill, BsPlusCircleFill, BsListUl, BsPersonFill, BsGearFill } from 'react-icons/bs'; // Importing icons from react-icons library
import './DashBoard_Sidebar.css';
import ProductForm from '../../ProductForm/ProductForm';
import AllProducts from '../../AllProduct/AllProducts';

const DashBoard_Sidebar = () => {
  return (
    <div className="inventory-manager-sidebar">
      <ul className='inventory-manager-nav-list'>
        <li>
          <Link className="sidebar-link" to="/Inventory_Dashboard/" aria-current="page">
            <BsFillGridFill className="sidebar-icon" /> Dashboard
          </Link>
        </li>
        <li>
          <Link className="sidebar-link" to="/Inventory_Dashboard/AddProduct">
            <BsPlusCircleFill className="sidebar-icon" /> Add Product
          </Link>
        </li>
        
        <li>
          <Link className="sidebar-link" to="/Inventory_Dashboard/Notifications">
            <BsListUl className="sidebar-icon" /> Notifications
          </Link>
        </li>
      </ul>
    </div>
  );
};
export default DashBoard_Sidebar;
