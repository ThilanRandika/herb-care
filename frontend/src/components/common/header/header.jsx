import React, { Component } from 'react';
import $ from 'jquery';
import './header.css';
import { Link } from 'react-router-dom';
// import { Cart3 } from 'bootstrap-icons-react';


class Header extends Component {
  componentDidMount() {
    $(window).on('scroll', function() {
      if ($(this).scrollTop() >= 200) {
        $('.navbar').addClass('fixed-top');
      } else if ($(this).scrollTop() === 0) {
        $('.navbar').removeClass('fixed-top');
      }
    });
    
    function adjustNav() {
      var winWidth = $(window).width(),
        dropdown = $('.dropdown'),
        dropdownMenu = $('.dropdown-menu');
      
      if (winWidth >= 768) {
        dropdown.on('mouseenter', function() {
          $(this).addClass('show')
            .children(dropdownMenu).addClass('show');
        });
        
        dropdown.on('mouseleave', function() {
          $(this).removeClass('show')
            .children(dropdownMenu).removeClass('show');
        });
      } else {
        dropdown.off('mouseenter mouseleave');
      }
    }
    
    $(window).on('resize', adjustNav);
    
    adjustNav();
  }

  componentWillUnmount() {
    $(window).off('scroll resize');
  }

  render() {
    return (
      <div className="home-header-body">
        <header class="header-area overlay">
        <nav class="navbar navbar-expand-md navbar-dark">
		    <div class="container">
			    {/* <a href="#" class="navbar-brand">CylonHerbCare</a> */}
          <img src={require('../../../Images/logo/HerbCare Logo.png')} className="head_imagesees" alt="" />
			    <button type="button" class="navbar-toggler collapsed" data-toggle="collapse" data-target="#main-nav">
				    <span class="menu-icon-bar"></span>
				    <span class="menu-icon-bar"></span>
				    <span class="menu-icon-bar"></span>
			    </button>
			
			    <div id="main-nav" class="collapse navbar-collapse">
				    <ul class="navbar-nav ml-auto Headfro_ULLI">
					    <li><Link to="/" class="nav-item nav-link active hed_fosiz">Home</Link></li>
					    <li><Link to="/User_searching" class="nav-item nav-link hed_fosiz">Shop</Link></li>
					    <li class="dropdown">
						    <a href="#" class="nav-item nav-link" data-toggle="dropdown hed_fosiz">Special Packages</a>
						    <div class="dropdown-menu">
							    <Link to="/Gift_Packages" class="dropdown-item hed_dorfosiz">Gift Packages</Link>
							    <Link to="/ViewPackages" class="dropdown-item hed_dorfosiz">Holiday Packages</Link>
						    </div>
					    </li>
					    <li><Link to="/consultation/homeConsultation" class="nav-item nav-link hed_fosiz">Consultation</Link></li>
              <li><Link to="#" class="nav-item nav-link hed_fosiz">About Us</Link></li>

              <li><Link to="#" class="nav-item nav-link hed_fosiz headeee_loLOinf"><img width="30" height="30" src="https://img.icons8.com/sf-regular-filled/48/1A1A1A/shopping-cart.png" alt="shopping-cart--v1"/></Link></li>
              
              <li><Link to="/User" class="nav-item nav-link hed_fosiz ">profile</Link></li>
					    <li><Link to="Login" class="nav-item nav-link hed_fosiz ">Login</Link></li>
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
  }
}

export default Header;