import React, { useState } from 'react';
import PartnershipRequest from "../../../components/sellerPartnership/partnershipRequest/PartnershipRequest";
import "./home.css";
import Navbar from '../../../components/common/navbar/navBar';
import { Link } from 'react-router-dom';

function Home() {

  const [isPopupVisible, setPopupVisible] = useState(false);

  const togglePopup = () => {
    setPopupVisible(!isPopupVisible);
  };

  return (
    <>
      <Navbar></Navbar>
      <div>Home</div>

      <Link to="/Login">
        <button>Login</button>
      </Link>

      <br />

      <button onClick={togglePopup}>Partnership Request</button>
      {isPopupVisible && 
      (<PartnershipRequest  trigger={isPopupVisible} setPopupVisible={setPopupVisible}>
      </PartnershipRequest>)}
      
      <br />

      <Link to="/Feedback&Complains">
        <button>Feedback&complaints</button>
      </Link>

      {/* Cart icon */}
      <div style={{ position: "fixed", top: "20px", right: "20px", zIndex: "999" }}>
        <Link to="/cart">
          <i className="fas fa-shopping-cart fa-2x"></i>
        </Link>
      </div>

      <div style={{ margin: "5%" }} className="consultationButtons">
        <Link to={`../../consultation`} className="custom-link" >Customer Consultation</Link>
      </div>
    </>
  )
}

export default Home;
