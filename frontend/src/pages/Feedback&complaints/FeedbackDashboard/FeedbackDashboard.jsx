import { Route, Routes } from 'react-router-dom';
import './FeedbackDashboard.css'

import Complaints_Dashboard from "../Complaints/Complaints";
import Display_user from "../Complaints/DisplayUser";
import Display_Staff from "../Complaints/DisplayStaff";

import Feedback_Dashboard from "../Feedback/Feedback";
import DisplayFeedback_user from "../Feedback/DisplayUser";
import DisplayFeedback_staff from "../Feedback/DisplayStaff";

import Summary from "../Feedback/FeedbackSummary";

import FeedbackGiftPackage_Dashboard from "../FeedbackGiftPackage/FeedbackGiftPackage";
import DisplayGiftPackage_user from "../FeedbackGiftPackage/DisplayUserGiftPackageFeedback";

import { Link } from 'react-router-dom';


function FeedbackDashboard() {
  return (
    <>
      <Link to="/Feedback&Complains/Complaints">
        <button className='FEEDandCOM_Dash1'>Complaints</button>
      </Link>

      
      
      <Link to="/Feedback&Complains/DisplayComplaintsUser">
        <button className='FEEDandCOM_Dash2'>Display User Complaints</button>
      </Link>

      

      <Link to="/Feedback&Complains/DisplayComplaintsStaff">
        <button className='FEEDandCOM_Dash3'>Display Staff Complaints</button>
      </Link>
      
    
      
      <Link to="/Feedback&Complains/Feedback">
        <button className='FEEDandCOM_Dash4'>Feedback</button>
      </Link>

    

      <Link to="/Feedback&Complains/DisplayFeedbackUser">
        <button className='FEEDandCOM_Dash5' >Display User Feedback</button>
      </Link>

     

      <Link to="/Feedback&Complains/DisplayFeedbackStaff">
        <button className='FEEDandCOM_Dash6' >Display Staff Feedback</button>
      </Link>

    

      <Link to="/Feedback&Complains/FeedbackSummary">
        <button className='FEEDandCOM_Dash7' >Feedback Summary</button>
      </Link>

 
      
      {/* <Link to="/Feedback&Complains/FeedbackGiftPackage">
        <button className='FEEDandCOM_Dash8' >FeedbackGiftPackage</button>
      </Link>
      

      <Link to="/Feedback&Complains/DisplayFeedbackGiftPackageUser">
        <button className='FEEDandCOM_Dash9' >Display Gift Package User</button>
      </Link> */}

    <Routes>
        <Route path="/Complaints" element={<Complaints_Dashboard/>}></Route>
        <Route path="/DisplayComplaintsUser" element={<Display_user/>}></Route>
        <Route path="/DisplayComplaintsStaff" element={<Display_Staff/>}></Route>

        <Route path="/Feedback" element={<Feedback_Dashboard/>}></Route>
        <Route path="/DisplayFeedbackUser" element={<DisplayFeedback_user/>}></Route>
        <Route path="/DisplayFeedbackStaff" element={<DisplayFeedback_staff/>}></Route>

        <Route path="/FeedbackSummary" element={<Summary/>}></Route>

        {/* <Route path="/FeedbackGiftPackage" element={<FeedbackGiftPackage_Dashboard/>}></Route>
        <Route path="/DisplayFeedbackGiftPackageUser" element={<DisplayGiftPackage_user/>}></Route> */}
    </Routes>
    </>
  )
}

export default FeedbackDashboard