import React, { useEffect, useState } from 'react'
import './appointmentRequests.css'
import axios from 'axios';
import { useLocation } from 'react-router-dom';
import config from '../../../../config';


function AppointmentRequests(props) {

  const  [appointments, setAppointments] = useState([]);
  const [specialist, setSpecialist] = useState("");
  const [expandedAppointment, setExpandedAppointment] = useState(null);
  const [loading, setLoading] = useState(true); // State to track loading status
  const [successMessage, setSuccessMessage] = useState("");
  const location = useLocation(); // Use useLocation to access the current URL location

  useEffect(() => {
    setSpecialist(props.specialistID);
  }, [props.specialistID]);

  useEffect(() => {
    const searchParams = new URLSearchParams(location.search);
    const searchQuery = searchParams.get('search'); // Get the value of the 'search' parameter

    axios
      .get(`${config.BASE_URL}/consultAppointment/getUpcomingAppointments/${props.specialistID}`)
      .then((res) => {
        console.log('Got data:', res.data);
        const filteredAppointments = searchQuery
          ? res.data.filter(
              (appointment) =>
                appointment.patientInfo.patientName.toLowerCase().includes(searchQuery.toLowerCase()) ||
                appointment._id.toLowerCase().includes(searchQuery.toLowerCase())
            )
          : res.data;
        const sortedAppointments = filteredAppointments.sort((a, b) => new Date(a.date) - new Date(b.date));
        setAppointments(sortedAppointments);
        setLoading(false);
      })
      .catch((err) => {
        console.log('Error getting pending appointments', err);
        setLoading(false);
      });
  }, [location.search, props.specialistID]);



  // Close success alert after 3 seconds
  useEffect(() => {
    const timer = setTimeout(() => {
      setSuccessMessage("");
    }, 3000);

    return () => clearTimeout(timer);
  }, [successMessage]);
  



  const handleReject = (id) => {
    axios.put(`${config.BASE_URL}/consultAppointment/rejectAppointment/${id}`)
        .then((res) => {
            console.log("Request rejected successfully", res.data);
            setSuccessMessage("Appointment rejected successfully!");
            setExpandedAppointment(null); // Close all expanded appointment details
            axios.get(`${config.BASE_URL}/consultAppointment/getUpcomingAppointments/${props.specialistID}`)
              .then((res) => {
                  console.log("Got data: ", res.data);
                  setAppointments(res.data);
              })
              .catch((err) => {
                  console.log('Error getting pending appointments', err);
              });
            
        })
        .catch((err) => {
            // Handle error, show error message, etc.
            console.error('Error rejecting appointment', err);
        });
  };



  const handleComplete = (id) => {
    axios.put(`${config.BASE_URL}/consultAppointment/completeAppointment/${id}`)
      .then((res) => {
        console.log("Appointment completed successfully", res.data);
        setSuccessMessage("Appointment completed successfully!");
        setExpandedAppointment(null); // Close all expanded appointment details
        // Fetch appointments again to update the list
        axios.get(`${config.BASE_URL}/consultAppointment/getUpcomingAppointments/${props.specialistID}`)
          .then((res) => {
              console.log("Got data: ", res.data);
                setAppointments(res.data);
          })
          .catch((err) => {
              console.log('Error getting pending appointments', err);
          });
      })
      .catch((err) => {
        console.error('Error completing appointment', err);
      });
  };



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
    <div className="appointmentRequests-container">
      {successMessage && <div className="appointmentRequests-success-alert">{successMessage}</div>}
      <h1>Upcoming Appointments</h1>
      <table className="appointmentRequests-table">
        <thead>
          <tr>
            <th>No.</th>
            <th>Date</th>
            <th>Time</th>
            <th>Center</th>
            <th>Patient Name</th>
          </tr>
        </thead>
        <tbody>
          {appointments.map((request, index) => (
            <React.Fragment key={index}>
              <tr onClick={() => toggleExpandedDetails(index)}>
                <td>{index + 1}</td>
                <td>{new Date(request.date).toLocaleDateString()}</td>
                <td>{request.timeSlot}</td>
                <td>{request.centerName ? request.centerName : "Virtual Session"}</td>
                <td>{request.patientInfo.patientName}</td>
                
              </tr>
              {expandedAppointment === index && (
                <tr className="appointmentRequests-expanded-details active">
                  <td colSpan="5">
                    <div className="appointmentRequests-expanded-details-innerContainer">
                      <div className="appointmentRequests-expanded-details-innerContainer-left">
                        <p><strong>Appointment ID: </strong> {request._id}</p>
                        <p><strong>Date: </strong> {new Date(request.date).toLocaleDateString()}</p>
                        <p><strong>Time: </strong> {request.timeSlot}</p>
                        <p>{request.centerName ? request.centerName : "Virtual Session"}</p>
                        <p><strong>Appointment Amount:</strong> {request.appointmentAmount}</p>
                        <div className="appointmentRequest-specialist-actionButtons">
                            <button className="appointmentRequests-reject-btn" onClick={() => handleReject(request._id)}>Reject</button>
                            <button className="appointmentRequests-complete-btn" onClick={() => handleComplete(request._id)} >Complete</button>
                        </div>
                      </div>
                      <div className="appointmentRequests-expanded-details-innerContainer-right">
                        <h5>Patient Info:</h5>
                        <p><strong>Name:</strong> {request.patientInfo.patientName}</p>
                        <p><strong>Age:</strong> {request.patientInfo.patientAge}</p>
                        <p><strong>Gender:</strong> {request.patientInfo.patientGender}</p>
                        <p><strong>Phone:</strong> {request.patientInfo.patientPhone}</p>
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
  )
}

export default AppointmentRequests