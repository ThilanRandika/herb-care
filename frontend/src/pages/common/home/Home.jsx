import React, { useState } from 'react';
import PartnershipRequest from "../../../components/sellerPartnership/partnershipRequest/PartnershipRequest";
import ComplaintForm from '../../../components/Feedback&Complaints/Complaints/Add/AddComplaints';
import UserDashboard from '../../../components/Feedback&Complaints/Complaints/Display/DisplayUser/UserDisplay';
import "./home.css";
import Navbar from '../../../components/common/navbar/navBar';

function Home() {

  const [isPopupVisible, setPopupVisible] = useState(false);
  const [isComplaintPopupVisible, setComplaintPopupVisible] = useState(false);
  const [isComplaintPopupDisplayUser, setComplaintPopupDisplayUser] = useState(false);

  const togglePopup = () => {
    setPopupVisible(!isPopupVisible);
  };
  const toggleComplaintPopup = () => {
    setComplaintPopupVisible(!isComplaintPopupVisible);
  };
  const toggleComplaintUserDisplay = () => {
    setComplaintPopupDisplayUser(!isComplaintPopupDisplayUser);
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
      {isComplaintPopupVisible && (<ComplaintForm  trigger={isComplaintPopupVisible} setPopupVisible={setComplaintPopupVisible}></ComplaintForm>)}

      <br></br>

      <button onClick={toggleComplaintUserDisplay}>DisplayUser</button>
      {isComplaintPopupDisplayUser && (<UserDashboard  trigger={isComplaintPopupDisplayUser} setPopupVisible={setComplaintPopupDisplayUser}></UserDashboard>)}
    </>
  )
}

export default Home