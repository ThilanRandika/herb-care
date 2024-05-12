import { useState } from 'react';
import './navigationBar.css';
import { Link } from 'react-router-dom';
import PartnershipRequest from "../../../components/sellerPartnership/partnershipRequest/PartnershipRequest";

function NavigationBar() {

    const [isPopupVisible, setPopupVisible] = useState(false);

    const togglePopup = () => {
        setPopupVisible(!isPopupVisible);
    };

  return (
    <>
        <div className="home-navBar-allContent">
            <nav className="home-navBar-nav">
                <Link to="/Login" className="home-navBar-nav-link">
                <button>Login</button>
                </Link>
                <button onClick={togglePopup}>Partnership Request</button>
                {isPopupVisible && <PartnershipRequest trigger={isPopupVisible} setPopupVisible={setPopupVisible} />}
                <Link to="/Feedback&Complains" className="home-navBar-nav-link">
                <button>Feedback & Complaints</button>
                </Link>
                <Link to="/cart" className="home-navBar-nav-link">
                <i className="fas fa-shopping-cart fa-2x"></i>
                </Link>
                <Link to="/consultation/homeConsultation" className="home-navBar-nav-link">
                <button>Customer Consultation</button>
                </Link>
                <Link to="/myOrders" className="home-navBar-nav-link">
                <button>My Orders</button>
                </Link>
                <Link to="/Gift_Packages" className="home-navBar-nav-link">
                <button>Gift Packages</button>
                </Link>
                <Link to="/DisplayGiftPackageUser" className="home-navBar-nav-link">
                <button>Gift Packages orders User</button>
                </Link>
                <Link to="/User" className="home-navBar-nav-link">
                <button>User Dashboard</button>
                </Link>
            </nav>
        </div>
    </>
  )
}

export default NavigationBar