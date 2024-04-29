import React, { useEffect, useState } from 'react';
import axios from 'axios';
import './appointments.css'

function Appointments(props) {
  const [appointments, setAppointments] = useState([]);
  const [specialist, setSpecialist] = useState("");
  const [expandedAppointment, setExpandedAppointment] = useState(null);
  const [loading, setLoading] = useState(true); // State to track loading status

  useEffect(() => {
    setSpecialist(props.specialistID);
  }, [props.specialistID]);

  console.log("logged specialist: " + JSON.stringify(specialist));

  useEffect(() => {
    // Fetch appointments history when the component mounts
    axios.get(`http://localhost:8070/consultAppointment/getIncompleteAppointments/${props.specialistID}`)
      .then((res) => {
        console.log("Got appointment history data: ", res.data);
        // Sort appointments by date in descending order
        const sortedAppointments = res.data.sort((a, b) => new Date(b.date) - new Date(a.date));
        setAppointments(sortedAppointments);
        setLoading(false); // Set loading to false after data is fetched
      })
      .catch((err) => {
        console.error('Error getting appointment history', err);
        setLoading(false); // Set loading to false in case of error
      });
  }, []);
  

  const toggleExpandedDetails = (index) => {
    setExpandedAppointment(expandedAppointment === index ? null : index);
  };




  // Render loading indicator if loading is true
  if (loading) {
    return (
      <div className="specialistList-loading-container">
        <div className="specialistList-loading-spinner"></div>
        <div>Loading...</div>
      </div>
    );
  }

  // If not loading, render the page
  return (
    <div className="appointments-history-specialist-container">
      <h1>Appointments History</h1>
      <table className="appointments-history-specialist-table">
        <thead>
          <tr>
            <th>No.</th>
            <th>Date</th>
            <th>Center</th>
            <th>Appointment Amount</th>
            <th>Status</th>
          </tr>
        </thead>
        <tbody>
          {appointments.map((appointment, index) => (
            <React.Fragment key={index}>
              <tr onClick={() => toggleExpandedDetails(index)}>
                <td>{index + 1}</td>
                <td>{new Date(appointment.date).toLocaleDateString()}</td>
                <td>{appointment.centerName ? appointment.centerName : "Virtual Session"}</td>
                <td>Rs.{appointment.appointmentAmount}</td>
                <td>{appointment.status}</td>
              </tr>
              {expandedAppointment === index && (
                <tr className="appointmentRequests-expanded-details active">
                  <td colSpan="5">
                    <div className="appointmentRequests-expanded-details-innerContainer">
                      <div className="appointmentRequests-expanded-details-innerContainer-left">
                        <p><strong>Date: </strong> {new Date(appointment.date).toLocaleDateString()}</p>
                        <p><strong>Time: </strong> {appointment.timeSlot}</p>
                        <p><strong>Center: </strong> {appointment.centerName? appointment.centerName : "Virtual Session"}</p>
                        <p><strong>Appointment Amount: Rs.</strong> {appointment.appointmentAmount}</p>
                        </div>
                      <div className="appointmentRequests-expanded-details-innerContainer-right">
                        <h5>Patient Info:</h5>
                        <p><strong>Name:</strong> {appointment.patientInfo.patientName}</p>
                        <p><strong>Age:</strong> {appointment.patientInfo.patientAge}</p>
                        <p><strong>Gender:</strong> {appointment.patientInfo.patientGender}</p>
                        <p><strong>Phone:</strong> {appointment.patientInfo.patientPhone}</p>
                      </div>
                    </div>
                  </td>
                </tr>
              )}
            </React.Fragment>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default Appointments;
