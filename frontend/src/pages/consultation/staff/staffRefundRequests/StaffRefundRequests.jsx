import React, { useEffect, useState } from 'react';
import './staffRefundRequests.css';
import axios from 'axios';
import config from '../../../../config';

function StaffRefundRequests() {
    const [refundRequests, setRefundRequests] = useState([]);
    const [showAlert, setShowAlert] = useState(false);
    const [selectedAppointmentDetails, setSelectedAppointmentDetails] = useState(null); // State to hold appointment details

    useEffect(() => {
        fetchRefundRequests();
    }, []);

    const fetchRefundRequests = async () => {
        try {
            const response = await axios.get(`${config.BASE_URL}/refund/pendingRefunds`);
            setRefundRequests(response.data);
        } catch (error) {
            console.error('Error getting refund requests', error);
        }
    };

    const handleMarkAsCompleted = async (refundId) => {
        try {
            await axios.put(`${config.BASE_URL}/refund/completeRefund/${refundId}`);
            setShowAlert(true); // Show success alert
            // Re-fetch refund requests after marking as completed
            fetchRefundRequests();
            // Hide success alert after 3 seconds
            setTimeout(() => {
                setShowAlert(false);
            }, 3000);
        } catch (error) {
            console.error('Failed to mark refund as completed', error);
        }
    };


    const fetchAppointmentDetails = async (appointmentId) => {
        try {
            const response = await axios.get(`${config.BASE_URL}/consultAppointment/getAppointment/${appointmentId}`);
            return response.data;
        } catch (error) {
            console.error('Error getting appointment details:', error);
            return null;
        }
    };


    const handleViewAppointmentDetails = async (appointmentId) => {
        try {
            if (selectedAppointmentDetails && selectedAppointmentDetails._id === appointmentId) {
                // If the selected appointment details are already shown, hide them by resetting the state
                setSelectedAppointmentDetails(null);
            } else {
                // Otherwise, fetch and display the appointment details
                const appointmentDetails = await fetchAppointmentDetails(appointmentId);
                setSelectedAppointmentDetails(appointmentDetails);
            }
        } catch (error) {
            console.error('Error fetching appointment details:', error);
        }
    };


    return (
        <>
            <div className='staff-refund-requests-container'>
                <h3 className='staff-refund-requests-header'>Refund Requests</h3>
                {showAlert && (
                <div className="staff-refund-requests-alert" role="alert">
                    Refund completed successfully!
                </div>
                )}
                <table className='staff-refund-requests-table' style={{ marginTop: "5%" }}>
                    <thead>
                        <tr>
                            <th scope="col">No.</th>
                            <th scope="col">Date</th>
                            <th scope="col">Refund Type</th>
                            <th scope="col">Refund Amount</th>
                            <th scope="col">Bank Account Details</th>
                            <th scope="col">Status</th>
                            <th scope="col">Action</th>
                        </tr>
                    </thead>
                    <tbody>
                        {refundRequests.map((refund, index) => (
                        <React.Fragment key={index}>
                            <tr>
                                <td>{index + 1}</td>
                                <td>{new Date(refund.refundDateTime).toLocaleDateString()}</td>
                                <td>{refund.refundType}</td>
                                <td>{refund.refundAmount}</td>
                                <td>{refund.bankAccountDetails}</td>
                                <td>{refund.refundStatus}</td>
                                <td>
                                    {refund.refundStatus !== 'Completed' && (
                                        <button className='staff-refund-requests-complete-btn'  onClick={() => handleMarkAsCompleted(refund._id)}>Mark as completed</button>
                                    )}
                                </td>
                                <td>
                                    {refund.appointment && (
                                        <button className='staff-refund-requests-view-btn' onClick={() => handleViewAppointmentDetails(refund.appointment)}>
                                            {selectedAppointmentDetails && selectedAppointmentDetails._id === refund.appointment ? 'Hide Appointment Details' : 'View Appointment Details'}
                                        </button>
                                    )}
                                </td>
                            </tr>
                            {selectedAppointmentDetails && refund.appointment === selectedAppointmentDetails._id && (
                                <tr>
                                    <td colSpan="7">
                                    <div className='refunds-appointment-details'>
                                        <div className="refunds-appointment-details-left">
                                        {selectedAppointmentDetails && selectedAppointmentDetails.type === "physical" && (
                                            <div className="refunds-appointment-details-left">
                                                    <p><strong>Center:</strong> {selectedAppointmentDetails.centerName}</p>
                                                    <p><strong>Center Location:</strong> {selectedAppointmentDetails.centerLocation}</p>
                                                </div>
                                            )}
                                          <p><strong>Type:</strong> {selectedAppointmentDetails.type}</p>
                                          <p><strong>Appointment Amount:</strong> {selectedAppointmentDetails.appointmentAmount}</p>
                                          <p><strong>Time Slot:</strong> {selectedAppointmentDetails.timeSlot}</p>
                                        
                                        </div>
                                        <div className="refunds-appointment-details-right">
                                        <h5>Patient Info:</h5>
                                            <p><strong>patientName:</strong> {selectedAppointmentDetails.patientInfo.patientName}</p>
                                            <p><strong>patientAge:</strong> {selectedAppointmentDetails.patientInfo.patientAge}</p>
                                            <p><strong>patientGender:</strong> {selectedAppointmentDetails.patientInfo.patientGender}</p>
                                            <p><strong>patientName:</strong> {selectedAppointmentDetails.patientInfo.patientPhone}</p>                          
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
        </>
    )
}

export default StaffRefundRequests;
