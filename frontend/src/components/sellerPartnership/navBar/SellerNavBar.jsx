import React from 'react'
import { Link } from 'react-router-dom'
import './sellerNavBar.css'

function SellerNavBar() {
  return (
    <>
     <nav className="custom-navbar">
  <div className="custom-navbar-container">
    <Link className="custom-navbar-logo" to={"/sellerMainHome/sellerHome"}>
    <img src={require(`../../../Images/logo/HerbCare Logo.png`)} alt="Company Logo" className="custom-navbar-logo-image" />
    </Link>
    <div className="custom-navbar-links">
      <ul className="custom-navbar-list">
        <li className="custom-navbar-item">
          <Link className="custom-navbar-logo" to={"/sellerMainHome/sellerHome"}>
          Home
          </Link>
        </li>
        <li className="custom-navbar-item">
          <Link className="custom-navbar-link" to={"/sellerMainHome/allproduct"} aria-current="page">
            All Products
          </Link>
        </li>
        <li className="custom-navbar-item">
          <Link className="custom-navbar-link" to={"/sellerMainHome/bag"} aria-current="page">
            Bag
          </Link>
        </li>
        <li className="custom-navbar-item">
          <Link className="custom-navbar-link" to={"/sellerMainHome/orders"} aria-current="page">
            Orders
          </Link>
        </li>
      </ul>
    </div>
  </div>
</nav>


    </>
  )
}

export default SellerNavBar