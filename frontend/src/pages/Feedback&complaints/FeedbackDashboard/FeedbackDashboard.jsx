import { Route, Routes } from 'react-router-dom';

import Complaints_Dashboard from "../Complaints/Complaints";
import Display_user from "../Complaints/DisplayUser";
import Display_Staff from "../Complaints/DisplayStaff";

import Feedback_Dashboard from "../Feedback/Feedback";
import DisplayFeedback_user from "../Feedback/DisplayUser";
import DisplayFeedback_staff from "../Feedback/DisplayStaff";
// import DisplayUnder_Product from "../Feedback/DisplayUnderProduct";

import Summary from "../Feedback/FeedbackSummary";

//import FeedbackGiftPackage_Dashboard from "../FeedbackGiftPackage/FeedbackGiftPackage";

import { Link } from 'react-router-dom';


function FeedbackDashboard() {
  return (
    <>
    <h1>feedback</h1>
    <Link to="/Feedback&Complains/Complaints">
        <button>Complaints</button>
      </Link>

      <br></br>
      
      <Link to="/Feedback&Complains/DisplayComplaintsUser">
        <button>Display User Complaints</button>
      </Link>

      <br></br>

      <Link to="/Feedback&Complains/DisplayComplaintsStaff">
        <button>Display Staff Complaints</button>
      </Link>
      

      <br></br>
      
      <Link to="/Feedback&Complains/Feedback">
        <button>Feedback</button>
      </Link>

      <br></br>  

      <Link to="/Feedback&Complains/DisplayFeedbackUser">
        <button>Display User Feedback</button>
      </Link>

      <br></br>

      <Link to="/Feedback&Complains/DisplayFeedbackStaff">
        <button>Display Staff Feedback</button>
      </Link>

      <br></br>

      <Link to="/Feedback&Complains/FeedbackSummary">
        <button>Feedback Summary</button>
      </Link>

      <br></br>

      {/* <Link to="/Feedback&Complains/DisplayUnderProduct">
        <button>Under Product</button>
      </Link> */}

      <br></br>
      
      {/* <Link to="/Feedback&Complains/FeedbackGiftPackage">
        <button>FeedbackGiftPackage</button>
      </Link> */}
    <Routes>
        <Route path="/Complaints" element={<Complaints_Dashboard/>}></Route>
        <Route path="/DisplayComplaintsUser" element={<Display_user/>}></Route>
        <Route path="/DisplayComplaintsStaff" element={<Display_Staff/>}></Route>

        <Route path="/Feedback" element={<Feedback_Dashboard/>}></Route>
        <Route path="/DisplayFeedbackUser" element={<DisplayFeedback_user/>}></Route>
        <Route path="/DisplayFeedbackStaff" element={<DisplayFeedback_staff/>}></Route>
        {/* <Route path='/DisplayUnderProduct' element={<DisplayUnder_Product/>}></Route> */}

        <Route path="/FeedbackSummary" element={<Summary/>}></Route>

        {/* <Route path="/FeedbackGiftPackage" element={<FeedbackGiftPackage_Dashboard/>}></Route> */}
    </Routes>
    </>
  )
}

export default FeedbackDashboard