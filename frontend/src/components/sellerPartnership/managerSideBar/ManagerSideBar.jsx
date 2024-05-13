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
            to={"/manager/SellerManagerDashboard/pendingSellerRequest"}
          >
            Partnership Requests
          </NavLink>
        </li>
        <li className="seller-manager-sidebar-item">
          <NavLink
            className="seller-manager-sidebar-link"
            activeClassName="active"
            to={"/manager/SellerManagerDashboard/discussionLevel"}
          >
            Discussion Level Requests
          </NavLink>
        </li>
        <li className="seller-manager-sidebar-item">
          <NavLink
            className="seller-manager-sidebar-link"
            activeClassName="active"
            to="/manager/SellerManagerDashboard/registeredSellers"
          >
            Registered Sellers
          </NavLink>
        </li>
      </ul>
    </div>
  );
}

export default ManagerSideBar;
