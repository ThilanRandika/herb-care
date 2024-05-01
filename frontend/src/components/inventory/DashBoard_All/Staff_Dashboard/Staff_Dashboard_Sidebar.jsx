import React from 'react'
import { Link } from 'react-router-dom';
import './Staff_Dashboard_Sidebar.css'
import { BsFillGridFill, BsPlusCircleFill, BsListUl, BsPersonFill, BsGearFill } from 'react-icons/bs';


function Staff_Dashboard_Sidebar() {
  return (
    <div className="Staff-manager-inventory-parts-sidebar">
      <ul className='Staff-manager-inventory-parts-list'>
        <li>
          <Link className="Staff-manager-inventory-parts-link" to="/Staff_Dashboard/" aria-current="page">
          <BsFillGridFill className="sidebar-icon" />Staff Dashboard
          </Link>
        </li>
        <li>
          <Link className="Staff-manager-inventory-parts-link" to="/Staff_Dashboard/AddProductProposal">
          <BsPlusCircleFill className="sidebar-icon" />Add Product Proposal
          </Link>
        </li>
        
        <li>
          <Link className="Staff-manager-inventory-parts-link" to="/Staff_Dashboard/notifications">
          <BsListUl  className="sidebar-icon" /> Notifications
          </Link>
        </li>
      </ul>
    </div>
  )
}

export default Staff_Dashboard_Sidebar