import React from 'react'
import { NavLink } from 'react-router-dom'

function FeedbackStaffSideBar() {
  return (
    <>
    <div className="seller-manager-sidebar">
      <ul className="seller-manager-sidebar-nav">
        <li className="seller-manager-sidebar-item">
          <NavLink
            className="seller-manager-sidebar-link"
            activeClassName="active"
            to={"/staff/DisplayFeedbackStaff"}
            exact
          >
            Product Feedbacks
          </NavLink>
        </li>
        <li className="seller-manager-sidebar-item">
          <NavLink
            className="seller-manager-sidebar-link"
            activeClassName="active"
            to={"/staff/DisplayComplaintsStaff"}
          >
            Complaines
          </NavLink>
        </li>
        <li className="seller-manager-sidebar-item">
          <NavLink
            className="seller-manager-sidebar-link"
            activeClassName="active"
            to={"/staff/DisplayFeedbackGiftPackageStaff"}
          >
            Gift Package Feedbacks
          </NavLink>
        </li>
      </ul>
    </div>
    </>
  )
}

export default FeedbackStaffSideBar