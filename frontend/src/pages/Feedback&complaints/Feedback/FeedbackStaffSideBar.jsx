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
            Feebacks
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
      </ul>
    </div>
    </>
  )
}

export default FeedbackStaffSideBar