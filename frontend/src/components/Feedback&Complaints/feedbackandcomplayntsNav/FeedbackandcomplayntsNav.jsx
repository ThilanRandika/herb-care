import React from 'react'
import { Link } from 'react-router-dom'

function FeedbackandcomplayntsNav() {
  return (
    <div>

        {/* <Link to="/Feedback&Complains/Complaints">
        <button className='FEEDandCOM_Dash1'>Complaints</button>
      </Link> */}

      
      
      {/* <Link to="/Feedback&Complains/DisplayComplaintsUser">
        <button className='FEEDandCOM_Dash2'>Display User Complaints</button>
      </Link> */}

      
      

      <Link to="/Feedback&Complains/DisplayComplaintsStaff">
        <button className='FEEDandCOM_Dash3'>Display Staff Complaints</button>
      </Link>
      
    
      
      {/* <Link to="/Feedback&Complains/Feedback">
        <button className='FEEDandCOM_Dash4'>Feedback</button>
      </Link> */}

    

      {/* <Link to="/Feedback&Complains/DisplayFeedbackUser">
        <button className='FEEDandCOM_Dash5' >Display User Feedback</button>
      </Link> */}

     

      <Link to="/Feedback&Complains/DisplayFeedbackStaff">
        <button className='FEEDandCOM_Dash6' >Display Staff Feedback</button>
      </Link>

    

      <Link to="/Feedback&Complains/FeedbackSummary">
        <button className='FEEDandCOM_Dash7' >Feedback Summary</button>
      </Link>

 
      
      {/* <Link to="/Feedback&Complains/FeedbackGiftPackage">
        <button className='FEEDandCOM_Dash8' >FeedbackGiftPackage</button>
      </Link> */}
      

      {/* <Link to="/Feedback&Complains/DisplayFeedbackGiftPackageUser">
        <button className='FEEDandCOM_Dash9' >Display Gift Package User</button>
      </Link> */}

      <Link to="/Feedback&Complains/DisplayFeedbackGiftPackageStaff">
        <button className='FEEDandCOM_Dash10' >Display Gift Package Staff</button>
      </Link>
      

      {/* <Link to="/Feedback&Complains/DisplayFeedbackUnderPackage">
        <button className='FEEDandCOM_Dash11' >Display feedbacks under packages</button>
      </Link> */}

    </div>
  )
}

export default FeedbackandcomplayntsNav