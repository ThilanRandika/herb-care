import React from 'react'
import './displayConplainesStaff.css'
import StaffDisplay from '../../../components/Feedback&Complaints/Complaints/Display/DisplayStaff/StaffDisplay'
import FeedbackStaffSideBar from '../Feedback/FeedbackStaffSideBar'

function Display_Staff() {
  return (
    <div className='complaines-staff-display-container'>
      <FeedbackStaffSideBar></FeedbackStaffSideBar>
        <StaffDisplay/>
    </div>
  )
}

export default Display_Staff