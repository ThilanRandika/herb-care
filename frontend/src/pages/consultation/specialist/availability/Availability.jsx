import React from './availability.css';
import AvailabilitySettingPage from '../../../../components/consultation/specialist/availabilitySettingPage/AvailabilitySettingPage';
import Availabilities from '../../../../components/consultation/specialist/availabilities/Availabilities';

function Availability(props) {
  return (
    <>
        <h2>Availability page</h2>
        <div className="availability-page-contents">
          <div className="availabilities">
            <Availabilities specialistID={props.specialistID} />
          </div>
          <div className="availability-add-form">
            <AvailabilitySettingPage specialistID={props.specialistID} />
          </div>
        </div>
    </>
  )
}

export default Availability