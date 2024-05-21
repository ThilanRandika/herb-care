import React from 'react';
import FeedbackStaff from '../../../components/Feedback&Complaints/FeedbackGiftPackage/Display/DisplayStaff/DisplayFeedbackGiftPackageStaff';
import FeedbackStaffSideBar from '../Feedback/FeedbackStaffSideBar';

const DisplayGiftPackage_Staff = () => {
    return (
        <div  className='complaines-staff-display-container'>
            <FeedbackStaffSideBar></FeedbackStaffSideBar>
            <FeedbackStaff />
        </div>
    );
};

export default DisplayGiftPackage_Staff;
