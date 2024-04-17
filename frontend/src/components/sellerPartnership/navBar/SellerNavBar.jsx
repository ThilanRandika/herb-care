import React from 'react'
import { Link } from 'react-router-dom'
import './sellerNavBar.css'

function SellerNavBar() {
  return (
    <>
        <nav class="navbar navbar-expand-lg " style={{ backgroundColor: '#2bd46c44' }}>
            <div class="container-fluid">
            <Link
              className="nav-link"
              to={"/sellerMainHome/sellerHome"}
              aria-current="page"
            >
              Home
            </Link>
            <button class="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
            <span class="navbar-toggler-icon"></span>
            </button>
            <div class="collapse navbar-collapse" id="navbarSupportedContent">
            <ul class="navbar-nav me-auto mb-2 mb-lg-0">
                <Link
                className="nav-link"
                to={"/sellerMainHome/allproduct"}
                aria-current="page"
                >
                All Products
                </Link>
                <Link
                className="nav-link"
                to={"/sellerMainHome/bag"}
                aria-current="page"
                >
                Bag
                </Link>
                <Link
                className="nav-link"
                to={"/sellerMainHome/orders"}
                aria-current="page"
                >
                Orders
                </Link>
            </ul>
            <form class="d-flex flex-row">
                <input class="form-control me-2" type="search" placeholder="Search" aria-label="Search"/>
                <button class="btn btn-outline-success" type="submit">Search</button>
            </form>
            </div>
            </div>
            </nav>
    </>
  )
}

export default SellerNavBar