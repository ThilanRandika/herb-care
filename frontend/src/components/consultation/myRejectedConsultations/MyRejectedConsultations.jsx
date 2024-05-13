import './myRejectedConsultations.css';
import React, { useContext, useEffect, useState } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import { AuthContext } from '../../../context/AuthContext';

function MyRejectedConsultations(props) {
  const  [rejectedAppointments, setRejectedAppointments] = useState([]);
  const [dataFetched, setDataFetched] = useState(false); // Track whether data has been fetched
  const [refundStatuses, setRefundStatuses] = useState([]); // Store refund statuses
  const { user } = useContext(AuthContext); // get the customer ID from authentication context
  const [expandedAppointment, setExpandedAppointment] = useState(null); // Track expanded appointment
  const [loading, setLoading] = useState(true); // State to track loading status

    useEffect(() => {
        axios.get(`http://localhost:8070/consultAppointment/rejectedAppointments/${user._id}`)
            .then((res) => {
                console.log("Got data: ", res.data);
                setRejectedAppointments(res.data);
                setDataFetched(true); // Update state to indicate data has been fetched
                setLoading(false); // Set loading to false after data is fetched
            })
            .catch((err) => {
                console.log('Error getting cancelled appointments', err);
                setLoading(false); // Set loading to false in case of error
            });
    }, [user._id]);

    useEffect(() => {
      const fetchRefundStatuses = async () => {
        const refundStatuses = await Promise.all(rejectedAppointments.map(appointment =>
          hasRefund(appointment._id)
        ));
        setRefundStatuses(refundStatuses);
      };
  
      if (dataFetched) {
        fetchRefundStatuses();
      }
    }, [rejectedAppointments, dataFetched]);
  
    const hasRefund = async (appointmentId) => {
      try {
        const response = await axios.get(`http://localhost:8070/refund/checkExistingRefund/${appointmentId}`);
        return response.data.hasRefund;
      } catch (error) {
        console.error('Error checking existing refund:', error);
        return false; // Return false in case of error
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
    <div className='rejectedConsultations-allContents'>
      <h3 className='rejectedConsultations-header'>Rejected Consultations</h3>
      <table className='rejectedConsultations-table'>
        <thead className='rejectedConsultations-thead'>
        <tr>
            <th>Date</th>
            <th>Time</th>
            <th>Specialist</th>
            <th>Action</th>
        </tr>          
        </thead>
        <tbody className='rejectedConsultations-tbody'>
          {rejectedAppointments.map((appointment, index) => (
            <React.Fragment key={index}>
              <tr onClick={() => toggleExpandedDetails(index)}>
              <td>{new Date(appointment.date).toLocaleDateString()}</td>
              <td>{appointment.timeSlot}</td>
              <td>{appointment.specialistName}</td>
                <td>
                  {dataFetched && refundStatuses[index] !== undefined ? (
                    <>
                      {!refundStatuses[index] ? (
                        <Link to={`../../refunds/addForm/${appointment._id}`} className="rejectedConsultations-link-btn">Apply refund</Link>
                      ) : (
                        <span>Refund already requested</span>
                      )}
                    </>
                  ) : (
                    <>
                      <span>Loading......</span>
                    </>
                  )}
                </td>
              </tr>
              {expandedAppointment === index && (
              <tr className="rejectedConsultations-expanded-details active">
                  <td colSpan="5">
                  <div className='rejectedConsultations-expanded-details-innerContainer'>
                      <div className="rejectedConsultations-expanded-details-innerContainer-left">
                        {appointment.type !== 'virtual' && (
                            <>
                                <p><strong>Center:</strong> {appointment.centerName}</p>
                                <p><strong>Center Location:</strong> {appointment.centerLocation}</p>
                            </>
                        )}
                        <p><strong>Type:</strong> {appointment.type}</p>
                        <p><strong>Appointment Amount:</strong> {appointment.appointmentAmount}</p>
                      
                      </div>
                      <div className="rejectedConsultations-expanded-details-innerContainer-right">
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

export default MyRejectedConsultations