import { Route, Routes } from 'react-router-dom';
import './FeedbackDashboard.css'

import Complaints_Dashboard from "../Complaints/Complaints";
import Display_user from "../Complaints/DisplayUser";
import Display_Staff from "../Complaints/DisplayStaff";

import Feedback_Dashboard from "../Feedback/Feedback";
import DisplayFeedback_user from "../Feedback/DisplayUser";
import DisplayFeedback_staff from "../Feedback/DisplayStaff";

import Summary from "../Feedback/FeedbackSummary";

import FeedbackandcomplayntsNav from "../../../components/Feedback&Complaints/feedbackandcomplayntsNav/FeedbackandcomplayntsNav";


import FeedbackGiftPackage_Dashboard from "../FeedbackGiftPackage/FeedbackGiftPackage";
import DisplayGiftPackage_user from "../FeedbackGiftPackage/DisplayUserGiftPackageFeedback";
import DisplayGiftPackage_Staff from "../FeedbackGiftPackage/DisplayStaffGiftPackageFeedback";
import DisplayUnder_Package from "../FeedbackGiftPackage/UnderPackageFeedbacksDisplay";

function FeedbackDashboard() {
  return (
    <>
      

    <Routes>
        <Route path="/" element={<FeedbackandcomplayntsNav/>}></Route>
        <Route path="/Complaints" element={<Complaints_Dashboard/>}></Route>
        <Route path="/DisplayComplaintsUser" element={<Display_user/>}></Route>
        <Route path="/DisplayComplaintsStaff" element={<Display_Staff/>}></Route>

        <Route path="/Feedback" element={<Feedback_Dashboard/>}></Route>
        <Route path="/DisplayFeedbackUser" element={<DisplayFeedback_user/>}></Route>
        <Route path="/DisplayFeedbackStaff" element={<DisplayFeedback_staff/>}></Route>

        <Route path="/FeedbackSummary" element={<Summary/>}></Route>

        <Route path="/FeedbackGiftPackage" element={<FeedbackGiftPackage_Dashboard/>}></Route>
        <Route path="/DisplayFeedbackGiftPackageUser" element={<DisplayGiftPackage_user/>}></Route>
        <Route path="/DisplayFeedbackGiftPackageStaff" element={<DisplayGiftPackage_Staff/>}></Route>
        <Route path="/DisplayFeedbackUnderPackage" element={<DisplayUnder_Package/>}></Route>
    </Routes>
    </>
  )
}

export default FeedbackDashboard