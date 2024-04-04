import React, { useState } from 'react';
import PartnershipRequest from "../../../components/sellerPartnership/partnershipRequest/PartnershipRequest";
import ComplaintForm from '../../../components/Feedback&Complaints/Complaints/Add/AddComplaints';
import UserDashboard from '../../../components/Feedback&Complaints/Complaints/Display/DisplayUser/UserDisplay';
import StaffDashboard from '../../../components/Feedback&Complaints/Complaints/Display/DisplayStaff/StaffDisplay'
import FeedbackForm from '../../../components/Feedback&Complaints/Feedback/Add/AddFeedback';
import "./home.css";
import Navbar from '../../../components/common/navbar/navBar';

function Home() {

  const [isPopupVisible, setPopupVisible] = useState(false);
  const [isComplaintPopupVisible, setComplaintPopupVisible] = useState(false);
  const [isComplaintPopupDisplayUser, setComplaintPopupDisplayUser] = useState(false);
  const [isComplaintPopupDisplayStaff, setComplaintPopupDisplayStaff] = useState(false);
  const [isFeedbackPopupVisible, setFeedbackPopupVisible] = useState(false);

  const togglePopup = () => {
    setPopupVisible(!isPopupVisible);
  };
  const toggleComplaintPopup = () => {
    setComplaintPopupVisible(!isComplaintPopupVisible);
  };
  const toggleComplaintUserDisplay = () => {
    setComplaintPopupDisplayUser(!isComplaintPopupDisplayUser);
  };
  const toggleComplaintStaffDisplay = () => {
    setComplaintPopupDisplayStaff(!isComplaintPopupDisplayStaff);
  };
  const toggleFeedbackPopup = () => {
    setFeedbackPopupVisible(!isFeedbackPopupVisible);
  }
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

      <button onClick={toggleComplaintUserDisplay}>Display User</button>
      {isComplaintPopupDisplayUser && (<UserDashboard  trigger={isComplaintPopupDisplayUser} setPopupVisible={setComplaintPopupDisplayUser}></UserDashboard>)}

      <br></br>

      <button onClick={toggleComplaintStaffDisplay}>Display Staff</button>
      {isComplaintPopupDisplayStaff && (<StaffDashboard trigger={isComplaintPopupDisplayStaff} setPopupVisible={setComplaintPopupDisplayStaff}></StaffDashboard>)}

      <br></br>

      <button onClick={toggleFeedbackPopup}>Feedback</button>
      {isFeedbackPopupVisible && (<FeedbackForm trigger={isFeedbackPopupVisible} setPopupVisible={setFeedbackPopupVisible}></FeedbackForm>)}  

    </>
  )
}

export default Home