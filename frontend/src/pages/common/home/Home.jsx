import React, { useState } from 'react';
import PartnershipRequest from "../../../components/sellerPartnership/partnershipRequest/PartnershipRequest";
import ComplaintForm from '../../../components/Feedback&Complaints/Complaints/AddComplaints';
import "./home.css";
import Navbar from '../../../components/common/navbar/navBar';

function Home() {

  const [isPopupVisible, setPopupVisible] = useState(false);
  const [isComplaintPopupVisible, setComplaintPopupVisible] = useState(false);

  const togglePopup = () => {
    setPopupVisible(!isPopupVisible);
  };
  const toggleComplaintPopup = () => {
    setComplaintPopupVisible(!isComplaintPopupVisible);
  };

  return (
    <>
      <Navbar></Navbar>
      <div>Home</div>
      <button onClick={togglePopup}>Partnership Request</button>
      {isPopupVisible && 
      (<PartnershipRequest  trigger={isPopupVisible} setPopupVisible={setPopupVisible}>
      </PartnershipRequest>)}
      <br></br>
      <button onClick={toggleComplaintPopup}>Complaints</button>
      {isComplaintPopupVisible && 
      (<ComplaintForm  trigger={isComplaintPopupVisible} setPopupVisible={setComplaintPopupVisible}>
      </ComplaintForm>)}
    </>
  )
}

export default Home