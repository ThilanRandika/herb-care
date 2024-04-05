import React from './availability.css';
import AvailabilitySettingPage from '../../../../components/consultation/specialist/availabilitySettingPage/AvailabilitySettingPage';
import Availabilities from '../../../../components/consultation/specialist/availabilities/Availabilities';

function Availability(props) {
  return (
    <>
        <h2>Availability page</h2>
        <Availabilities specialistID={props.specialistID} />
        <AvailabilitySettingPage specialistID={props.specialistID} />
    </>
  )
}

export default Availability