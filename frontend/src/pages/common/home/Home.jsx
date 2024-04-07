import React, { useState } from 'react';
import PartnershipRequest from "../../../components/sellerPartnership/partnershipRequest/PartnershipRequest";
import ComplaintForm from '../../../components/Feedback&Complaints/Complaints/Add/AddComplaints';
import UserDashboard from '../../../components/Feedback&Complaints/Complaints/Display/DisplayUser/UserDisplay';
import StaffDashboard from '../../../components/Feedback&Complaints/Complaints/Display/DisplayStaff/StaffDisplay'
import FeedbackForm from '../../../components/Feedback&Complaints/Feedback/Add/AddFeedback';
import FeedbackUserDashboard from '../../../components/Feedback&Complaints/Feedback/Display/DisplayUser/UserDisplay';
import FeedbackStaffDashboard from '../../../components/Feedback&Complaints/Feedback/Display/DisplayStaff/StaffDisplay';
import "./home.css";
import Navbar from '../../../components/common/navbar/navBar';

function Home() {

  const [isPopupVisible, setPopupVisible] = useState(false);
  const [isComplaintPopupVisible, setComplaintPopupVisible] = useState(false);
  const [isComplaintPopupDisplayUser, setComplaintPopupDisplayUser] = useState(false);
  const [isComplaintPopupDisplayStaff, setComplaintPopupDisplayStaff] = useState(false);
  const [isFeedbackPopupVisible, setFeedbackPopupVisible] = useState(false);
  const [isFeedbackPopupDisplayUser, setFeedbackPopupDisplayUser] = useState(false);
  const [isFeedbackPopupDisplayStaff, setFeedbackPopupDisplayStaff] = useState(false);

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
  const toggleFeedbackUserDisplay = () => {
    setFeedbackPopupDisplayUser(!isFeedbackPopupDisplayUser);
  };
  const toggleFeedbackStaffDisplay = () => {
    setFeedbackPopupDisplayStaff(!isFeedbackPopupDisplayStaff);
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

      <button onClick={toggleComplaintUserDisplay}>Display User Complaints</button>
      {isComplaintPopupDisplayUser && (<UserDashboard  trigger={isComplaintPopupDisplayUser} setPopupVisible={setComplaintPopupDisplayUser}></UserDashboard>)}

      <br></br>

      <button onClick={toggleComplaintStaffDisplay}>Display Staff Complaints</button>
      {isComplaintPopupDisplayStaff && (<StaffDashboard trigger={isComplaintPopupDisplayStaff} setPopupVisible={setComplaintPopupDisplayStaff}></StaffDashboard>)}

      <br></br>

      <button onClick={toggleFeedbackPopup}>Feedback</button>
      {isFeedbackPopupVisible && (<FeedbackForm trigger={isFeedbackPopupVisible} setPopupVisible={setFeedbackPopupVisible}></FeedbackForm>)}  

      <br></br>  

      <button onClick={toggleFeedbackUserDisplay}>Display User Feedback</button>
      {isFeedbackPopupDisplayUser && (<FeedbackUserDashboard  trigger={isFeedbackPopupDisplayUser} setPopupVisible={setFeedbackPopupDisplayUser}></FeedbackUserDashboard>)}

      <br></br>

      <button onClick={toggleFeedbackStaffDisplay}>Display Staff Feedback</button>
      {isFeedbackPopupDisplayStaff && (<FeedbackStaffDashboard  trigger={isFeedbackPopupDisplayStaff} setPopupVisible={setFeedbackPopupDisplayStaff}></FeedbackStaffDashboard>)}    
    </>
  )
}

export default Home