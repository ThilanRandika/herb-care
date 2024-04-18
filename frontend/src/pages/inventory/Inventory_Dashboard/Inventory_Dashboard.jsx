import React, { useState } from 'react';
import { Link, Route, Routes } from 'react-router-dom';

import AllProducts from '../../../components/inventory/AllProduct/AllProducts';
import './Inventory_Dashboard.css';

import MainDash from '../../../components/inventory/DashBoard_All/MainDash/MainDash';
import DashBoard_Sidebar from '../../../components/inventory/DashBoard_All/DashBoard_Sidebar/DashBoard_Sidebar';
import ProductForm from '../../../components/inventory/ProductForm/ProductForm';
import UpdateProduct from '../../../components/inventory/UpdateProduct/UpdateProduct';
import StaffProposalsChanges from '../../../components/inventory/DashBoard_All/Inventory_Notifications/Staff_Proposals_Changes';


function Inventory_Dashboard() {
  return (
    
      <>
        <div className="inventory-container">
          <div className="inventory-dashboard-nav-bar">
            <DashBoard_Sidebar/>
            
          </div>

          <div className="DashBoard-pages">

          <Routes>
            <Route path="/" element={<MainDash/>}></Route>
            <Route path="/AddProduct" element={<ProductForm/>}></Route>
            <Route path="/AllProducts" element={<AllProducts/>}></Route>
            <Route path="/Notifications" element={<StaffProposalsChanges/>}></Route>
            <Route path="/UpdateProduct/:id" element={<UpdateProduct/>}></Route>
          </Routes>
          </div>
        </div>
        
      </>
  
  );
}

export default Inventory_Dashboard;
