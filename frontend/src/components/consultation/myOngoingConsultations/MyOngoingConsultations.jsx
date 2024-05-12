// MyOngoingConsultations.js

import React, { useContext, useEffect, useState } from 'react';
import './myOngoingConsultations.css';
import axios from 'axios';
import { AuthContext } from '../../../context/AuthContext';

function MyOngoingConsultations() {
  const [onGoingAppointments, setOnGoingAppointments] = useState([]);
  const { user } = useContext(AuthContext);
  const [expandedAppointment, setExpandedAppointment] = useState(null);
  const [loading, setLoading] = useState(true); // State to track loading status

  useEffect(() => {
    axios.get(`http://localhost:8070/consultAppointment/getOngoingAppointments/${user._id}`)
      .then((res) => {
        console.log("Got data: ", res.data);
        setOnGoingAppointments(res.data);
        setLoading(false); // Set loading to false after data is fetched
      })
      .catch((err) => {
        console.log('Error getting ongoing appointments', err);
        setLoading(false); // Set loading to false in case of error
      });
  }, []);

  const handleCancel = (id) => {
    axios.put(`http://localhost:8070/consultAppointment/cancelAppointment/${id}`)
      .then((res) => {
        console.log("Request cancelled successfully", res.data);
        axios.get(`http://localhost:8070/consultAppointment/getOngoingAppointments/${user._id}`)
          .then((res) => {
            console.log("Got data: ", res.data);
            setOnGoingAppointments(res.data);
          })
          .catch((err) => {
            console.log('Error getting ongoing appointments', err);
          });
      })
      .catch((err) => {
        console.error('Error cancelling appointment', err);
      });
  };


  
  
  const handleGenerateInvoice = async (appointmentId) => {
    try {
      const response = await axios.get(`http://localhost:8070/consultAppointment/generateInvoice/${appointmentId}`, {
        responseType: 'blob', // Receive response as Blob (binary data)
      });
  
      // Create a blob URL for the PDF
      const url = window.URL.createObjectURL(new Blob([response.data]));
  
      // Create a link element to trigger the download
      const link = document.createElement('a');
      link.href = url;
      link.setAttribute('download', `invoice_${appointmentId}.pdf`);
      document.body.appendChild(link);
      link.click();
  
      // Clean up
      window.URL.revokeObjectURL(url);
      document.body.removeChild(link);
    } catch (error) {
      console.error('Error generating invoice:', error);
    }
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
    <div className='ongoingConsultations-allContents'>
      <h3 className='ongoingConsultations-header'>Ongoing Consultations</h3>
      <table className='ongoingConsultations-table'>
        <thead className='ongoingConsultations-thead'>
          <tr>
            <th>Date</th>
            <th>Time</th>
            <th>Specialist</th>
            <th>Status</th>
          </tr>
        </thead>
        <tbody className='ongoingConsultations-tbody'>
          {onGoingAppointments.map((appointment, index) => (
            <React.Fragment key={index}>
              <tr onClick={() => toggleExpandedDetails(index)}>
                <td>{new Date(appointment.date).toLocaleDateString()}</td>
                <td>{appointment.timeSlot}</td>
                <td>{appointment.specialistName}</td>
                <td>{appointment.status}</td>
              </tr>
              {expandedAppointment === index && (
                <tr className="ongoingConsultations-expanded-details active">
                  <td colSpan="5">
                    <div className='ongoingConsultations-expanded-details-innerContainer'>
                      <div className="ongoingConsultations-expanded-details-innerContainer-left">
                        {appointment.type !== 'virtual' && (
                              <>
                                  <p><strong>Center:</strong> {appointment.centerName}</p>
                                  <p><strong>Center Location:</strong> {appointment.centerLocation}</p>
                              </>
                          )}
                        <p><strong>Type:</strong> {appointment.type}</p>
                        <p><strong>Appointment Amount:</strong> {appointment.appointmentAmount}</p>
                        <p><strong>Time Slot:</strong> {appointment.timeSlot}</p>
                        {appointment.status === "Pending" && (
                          <div className="ongoingAppointments-onlyPending">
                            <button className='ongoingConsultations-tbody-cancel-btn' onClick={() => handleCancel(appointment._id)}>Cancel</button>
                            <button className='ongoingConsultations-tbody-invoice-btn' onClick={() => handleGenerateInvoice(appointment._id)}>Invoice</button>
                          </div>
                        )}
                      </div>
                      <div className="ongoingConsultations-expanded-details-innerContainer-right">
                        <h5>Patient Info:</h5>
                          <p><strong>patientName:</strong> {appointment.patientInfo.patientName}</p>
                          <p><strong>patientAge:</strong> {appointment.patientInfo.patientAge}</p>
                          <p><strong>patientGender:</strong> {appointment.patientInfo.patientGender}</p>
                          <p><strong>patientName:</strong> {appointment.patientInfo.patientPhone}</p>                          
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

export default MyOngoingConsultations;