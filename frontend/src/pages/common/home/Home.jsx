import React, { useState } from 'react';
import PartnershipRequest from "../../../components/sellerPartnership/partnershipRequest/PartnershipRequest";
import "./home.css";
import Navbar from '../../../components/common/navbar/navBar';

function Home() {

  const [isPopupVisible, setPopupVisible] = useState(false);

  const togglePopup = () => {
    setPopupVisible(!isPopupVisible);
  };

  return (
    <>
      <Navbar></Navbar>
      <div>Home</div>
      <button onClick={togglePopup}>Partnership Request</button>
      {isPopupVisible && 
      (<PartnershipRequest  trigger={isPopupVisible} setPopupVisible={setPopupVisible}>
      </PartnershipRequest>)}
    </>
  )
}

export default Home