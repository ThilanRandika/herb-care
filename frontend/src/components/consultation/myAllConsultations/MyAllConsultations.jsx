// MyAllConsultations.js

import React, { useContext, useEffect, useState } from 'react';
import './myAllConsultations.css';
import axios from 'axios';
import { AuthContext } from '../../../context/AuthContext';
import config from '../../../config';

function MyAllConsultations() {
    const [appointments, setAppointments] = useState([]);
    const { user } = useContext(AuthContext);
    const [expandedAppointment, setExpandedAppointment] = useState(null);
    const [loading, setLoading] = useState(true); // State to track loading status 

    useEffect(() => {
        axios.get(`${config.BASE_URL}/consultAppointment/getAppointmentsForCus/${user._id}`)
            .then((res) => {
                console.log("Got data: ", res.data);
                setAppointments(res.data);
                setLoading(false); // Set loading to false after data is fetched
            })
            .catch((err) => {
                console.log('Error getting pending appointments', err);
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
        <div className='allConsultations-allContents'>
            <h3 className='allConsultations-header'>All Consultations</h3>
            <table className='allConsultations-table'>
                <thead className='allConsultations-thead'>
                    <tr>
                        <th>Date</th>
                        <th>Time</th>
                        <th>Specialist</th>
                        <th>Status</th>
                    </tr>
                </thead>
                <tbody className='allConsultations-tbody'>
                    {appointments.map((appointment, index) => (
                        <React.Fragment key={index}>
                            <tr onClick={() => toggleExpandedDetails(index)}>
                            <td>{new Date(appointment.date).toLocaleDateString()}</td>
                            <td>{appointment.timeSlot}</td>
                            <td>{appointment.specialistName}</td>
                            <td>{appointment.status}</td>
                            </tr>
                            {expandedAppointment === index && (
                            <tr className="allConsultations-expanded-details active">
                                <td colSpan="5">
                                <div className='allConsultations-expanded-details-innerContainer'>
                                    <div className="allConsultations-expanded-details-innerContainer-left">
                                    {appointment.type !== 'virtual' && (
                                        <>
                                            <p><strong>Center:</strong> {appointment.centerName}</p>
                                            <p><strong>Center Location:</strong> {appointment.centerLocation}</p>
                                        </>
                                    )}
                                    <p><strong>Type:</strong> {appointment.type}</p>
                                    <p><strong>Appointment Amount:</strong> {appointment.appointmentAmount}</p>
                                    
                                    </div>
                                    <div className="allConsultations-expanded-details-innerContainer-right">
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

export default MyAllConsultations;
