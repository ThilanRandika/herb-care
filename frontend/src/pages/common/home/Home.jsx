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

      <br></br>

      <button onClick={togglePopup}>Partnership Request</button>
      {isPopupVisible && 
      (<PartnershipRequest  trigger={isPopupVisible} setPopupVisible={setPopupVisible}>
      </PartnershipRequest>)}
      
      <br></br>

      <Link to="/Feedback&Complains">
        <button>Feedback&complaints</button>
      </Link>

      

      <div style={{ margin: "5%" }} className="consultationButtons">
        <Link to={`../../consultation`} className="custom-link" >Customer Consultation</Link>
      </div>

      <Link to="/Gift_Packages">
        <button>Gift Packages </button>
      </Link>
    </>
  )
}

export default Home