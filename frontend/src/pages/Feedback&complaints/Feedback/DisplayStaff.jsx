import React from 'react'
import StaffDisplay from '../../../components/Feedback&Complaints/Feedback/Display/DisplayStaff/StaffDisplay'
import './displayStaff.css'
import FeedbackStaffSideBar from './FeedbackStaffSideBar'

function Display_Staff() {
  return (
    <div className='feedback-staff-display-container'>
      <FeedbackStaffSideBar></FeedbackStaffSideBar>
        <StaffDisplay/>
    </div>
  )
}

export default Display_Staff