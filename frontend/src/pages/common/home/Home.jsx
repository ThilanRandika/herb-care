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

      <Link to="/Complaints">
        <button>Complaints</button>
      </Link>

      <br></br>
      
      <Link to="/DisplayComplaintsUser">
        <button>Display User Complaints</button>
      </Link>

      <br></br>

      <Link to="/DisplayComplaintsStaff">
        <button>Display Staff Complaints</button>
      </Link>
      

      <br></br>
      
      <Link to="/Feedback">
        <button>Feedback</button>
      </Link>

      <br></br>  

      <Link to="/DisplayFeedbackUser">
        <button>Display User Feedback</button>
      </Link>

      <br></br>

      <Link to="/DisplayFeedbackStaff">
        <button>Display Staff Feedback</button>
      </Link>
    </>
  )
}

export default Home