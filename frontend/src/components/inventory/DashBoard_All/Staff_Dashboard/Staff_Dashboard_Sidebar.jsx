import React from 'react'
import { Link } from 'react-router-dom';
import './Staff_Dashboard_Sidebar.css'


function Staff_Dashboard_Sidebar() {
  return (
    <div className="Staff-sidebar">
      <ul className='Staff-nav-list'>
        <li>
          <Link className="staff-sidebar-link" to="/Staff_Dashboard/" aria-current="page">
            Staff Dashboard
          </Link>
        </li>
        <li>
          <Link className="staff-sidebar-link" to="/Staff_Dashboard/AddProductProposal">
            Add Product Proposal
          </Link>
        </li>
        <li>
          <Link className="staff-sidebar-link" to="/Staff_Dashboard/ViewProducts">
            View Products
          </Link>
        </li>
        <li>
          <Link className="staff-sidebar-link" to="/Staff_Dashboard/notifications">
            Notifications
          </Link>
        </li>
      </ul>
    </div>
  )
}

export default Staff_Dashboard_Sidebar