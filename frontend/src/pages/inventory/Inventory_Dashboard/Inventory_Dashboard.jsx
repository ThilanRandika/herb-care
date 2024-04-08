import React, { useState } from 'react';
import AddProduct from '../../../components/inventory/AddProduct/AddProduct';
import AllProducts from '../../../components/inventory/AllProduct/AllProducts';
import './Inventory_Dashboard.css';
import Sidebar from '../../../components/inventory/DashBoard_All/sidebar/Sidebar';
import MainDash from '../../../components/inventory/DashBoard_All/MainDash/MainDash';

function Inventory_Dashboard() {
  return (
    <div className="App">
      
    <div className="AppGlass">
      <Sidebar/>
      <MainDash/>
    </div>
  </div>
  );
}

export default Inventory_Dashboard;
