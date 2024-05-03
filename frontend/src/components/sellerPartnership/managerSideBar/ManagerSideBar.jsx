// ManagerSideBar.js
import React from "react";
import { NavLink } from "react-router-dom";
import "./managerSideBar.css"; // Import CSS file for styling

function ManagerSideBar() {
  return (
    <div className="seller-manager-sidebar">
      <ul className="seller-manager-sidebar-nav">
        <li className="seller-manager-sidebar-item">
          <NavLink
            className="seller-manager-sidebar-link"
            activeClassName="active"
            to={"/SellerManagerDashboard"}
            exact
          >
            Dashboard
          </NavLink>
        </li>
        <li className="seller-manager-sidebar-item">
          <NavLink
            className="seller-manager-sidebar-link"
            activeClassName="active"
            to={"/SellerManagerDashboard/pendingSellerRequest"}
          >
            Partnership Requests
          </NavLink>
        </li>
        <li className="seller-manager-sidebar-item">
          <NavLink
            className="seller-manager-sidebar-link"
            activeClassName="active"
            to={"/SellerManagerDashboard/discussionLevel"}
          >
            Discussion Level Requests
          </NavLink>
        </li>
        <li className="seller-manager-sidebar-item">
          <NavLink
            className="seller-manager-sidebar-link"
            activeClassName="active"
            to="/SellerManagerDashboard/registeredSellers"
          >
            Registered Sellers
          </NavLink>
        </li>
      </ul>
    </div>
  );
}

export default ManagerSideBar;
