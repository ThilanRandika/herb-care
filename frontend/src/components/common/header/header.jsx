import React, { useContext, useEffect, useState } from 'react';
import $ from 'jquery';
import './header.css';
import { Link } from 'react-router-dom';
import { AuthContext } from '../../../context/AuthContext';
import { useNavigate } from 'react-router-dom';

const Header = () => {
  const { user } = useContext(AuthContext); // Get the customer ID from authentication context
  const [isUserInfoVisible, setUserInfoVisible] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    const handleScroll = () => {
      if ($(window).scrollTop() >= 200) {
        $('.navbar').addClass('fixed-top');
      } else if ($(window).scrollTop() === 0) {
        $('.navbar').removeClass('fixed-top');
      }
    };

    const adjustNav = () => {
      const winWidth = $(window).width();
      const dropdown = $('.dropdown');
      const dropdownMenu = $('.dropdown-menu');

      if (winWidth >= 768) {
        dropdown.on('mouseenter', function () {
          $(this).addClass('show').children(dropdownMenu).addClass('show');
        });

        dropdown.on('mouseleave', function () {
          $(this).removeClass('show').children(dropdownMenu).removeClass('show');
        });
      } else {
        dropdown.off('mouseenter mouseleave');
      }
    };

    $(window).on('scroll', handleScroll);
    $(window).on('resize', adjustNav);

    adjustNav();

    return () => {
      $(window).off('scroll', handleScroll);
      $(window).off('resize', adjustNav);
    };
  }, []);

  const handleLogout = () => {
    // Perform logout action
    // logout();
    window.location.reload()
  };

  return (
    <div className="home-header-body">
      <header className="header-area overlay">
        <nav className="navbar navbar-expand-md navbar-dark">
          <div className="container">
            <img
              src={require('../../../Images/logo/HerbCare Logo.png')}
              className="head_imagesees"
              alt=""
            />
            <button
              type="button"
              className="navbar-toggler collapsed mainNavCollapseButton"
              data-toggle="collapse"
              data-target="#main-nav"
            >
              <span className="menu-icon-bar"></span>
              <span className="menu-icon-bar"></span>
              <span className="menu-icon-bar"></span>
            </button>

            <div id="main-nav" className="collapse navbar-collapse">
              <ul className="navbar-nav ml-auto Headfro_ULLI">
                <li>
                  <Link to="/" className="nav-item nav-link active hed_fosiz">
                    Home
                  </Link>
                </li>
                <li>
                  <Link to="/User_searching" className="nav-item nav-link hed_fosiz">
                    Shop
                  </Link>
                </li>
                <li className="dropdown">
                  <a
                    href="#"
                    className="nav-item nav-link"
                    data-toggle="dropdown hed_fosiz"
                  >
                    Special Packages
                  </a>
                  <div className="dropdown-menu">
                    <Link to="/Gift_Packages" className="dropdown-item hed_dorfosiz">
                      Gift Packages
                    </Link>
                    <Link to="/ViewPackages" className="dropdown-item hed_dorfosiz">
                      Holiday Packages
                    </Link>
                  </div>
                </li>
                <li>
                  <Link to="/consultation/homeConsultation" className="nav-item nav-link hed_fosiz">
                    Consultation
                  </Link>
                </li>
                <li>
                  <Link to="/blogsHome/blogs" className="nav-item nav-link hed_fosiz">
                    Blogs
                  </Link>
                </li>
                <li>
                  <Link to="/aboutUs" className="nav-item nav-link hed_fosiz">
                    About Us
                  </Link>
                </li>
                
                {user && (
                  <>
                    <li>
                      <Link to="/cart" className="nav-item nav-link hed_fosiz headeee_loLOinf">
                        <img
                          width="30"
                          height="30"
                          src="https://img.icons8.com/sf-regular-filled/48/1A1A1A/shopping-cart.png"
                          alt="shopping-cart--v1"
                        />
                      </Link>
                    </li>
                    <li>
                      <Link to="/User" className="nav-item nav-link hed_fosiz">
                        <i className="fa fa-user" aria-hidden="true"></i>
                      </Link>
                    </li>
                  </>
                )}

                <li>
                  {user ? (
                    <div className="mainNavbar-top-nav-bar-user-info">
                      <div className="mainNavbar-top-nav-bar-user-info-toggle" onClick={() => setUserInfoVisible(!isUserInfoVisible)}>
                        <span>{user.customer_name}</span>
                        <i className={`fas ${isUserInfoVisible ? 'fa-chevron-up' : 'fa-chevron-down'}`}></i>
                      </div>
                      {isUserInfoVisible && (
                        <div className="mainNavbar-top-nav-bar-user-info-dropdown">
                          <button onClick={handleLogout}>Logout</button>
                        </div>
                      )}
                    </div>
                  ) : (
                    <Link to="/Login" className="nav-item nav-link hed_fosiz mainNav-loginBtn">
                      Login
                    </Link>
                  )}
                </li>
              </ul>
            </div>
          </div>
        </nav>
      </header>
      <br />
      <br />
      <br />
    </div>
  );
};

export default Header;
