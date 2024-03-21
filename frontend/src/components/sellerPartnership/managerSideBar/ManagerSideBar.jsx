import React from "react";
import { Link } from "react-router-dom";

function ManagerSideBar() {
  return (
    <>
      <div className="col-lg-3 left-column">
        <ul className="nav flex-column">
          <li className="nav-item">
            <Link
              className="nav-link"
              to={"/SellerManagerDashboard"}
              aria-current="page"
            >
              Dashboard
            </Link>
          </li>
          <li className="nav-item">
            <Link
              className="nav-link"
              to={"/SellerManagerDashboard/pendingSellerRequest"}
            >
              Partnership Requests
            </Link>
          </li>
          <li className="nav-item">
            <Link
              className="nav-link"
              to={"/SellerManagerDashboard/discussionLevel"}
            >
              Discussion Level Requests
            </Link>
          </li>
          <li className="nav-item">
            <Link
              className="nav-link "
              to="/SellerManagerDashboard/registeredSellers"
            >
              Registered Sellers
            </Link>
          </li>
        </ul>
      </div>
    </>
  );
}

export default ManagerSideBar;
