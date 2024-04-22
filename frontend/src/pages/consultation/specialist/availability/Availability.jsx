import React, { useState } from 'react';
import './availability.css';
import AvailabilitySettingPage from '../../../../components/consultation/specialist/availabilitySettingPage/AvailabilitySettingPage';
import Availabilities from '../../../../components/consultation/specialist/availabilities/Availabilities';

function Availability(props) {
  const [selectedDate, setSelectedDate] = useState(new Date());
  const [isNewAvailabilitySubmitted, setIsNewAvailabilitySubmitted] = useState(false);

  return (
    <div className='specialist-availabilityPage-parent-fullPage'>
      <h2>Specialist Availability page</h2>
      <div className="specialist-availabilityPage-parent-contents">
        <div className="specialist-availabilityPage-parent-availabilities">
          <Availabilities specialistID={props.specialistID} setSelectedDate={setSelectedDate} isNewAvailabilitySubmitted={isNewAvailabilitySubmitted} setIsNewAvailabilitySubmitted={setIsNewAvailabilitySubmitted} />
        </div>
        <div className="specialist-availabilityPage-parent-availability-add-form">
          <AvailabilitySettingPage specialistID={props.specialistID} selectedDate={selectedDate} setIsNewAvailabilitySubmitted={setIsNewAvailabilitySubmitted} />
        </div>
      </div>
    </div>
  )
}

export default Availability;
