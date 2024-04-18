// MyAllConsultations.js

import React, { useContext, useEffect, useState } from 'react';
import './myAllConsultations.css';
import axios from 'axios';
import { AuthContext } from '../../../context/AuthContext';

function MyAllConsultations() {
    const [appointments, setAppointments] = useState([]);
    const { user } = useContext(AuthContext);
    const [expandedAppointment, setExpandedAppointment] = useState(null);    

    useEffect(() => {
        axios.get(`http://localhost:8070/consultAppointment/getAppointmentsForCus/${user._id}`)
            .then((res) => {
                console.log("Got data: ", res.data);
                setAppointments(res.data);
            })
            .catch((err) => {
                console.log('Error getting pending appointments', err);
            });
    }, []);


    const toggleExpandedDetails = (index) => {
        setExpandedAppointment(expandedAppointment === index ? null : index);
      };

      

    return (
        <div className='allConsultations-allContents'>
            <h3 className='allConsultations-header'>All Consultations</h3>
            <table className='allConsultations-table'>
                <thead className='allConsultations-thead'>
                    <tr>
                        <th>No.</th>
                        <th>Date</th>
                        <th>Specialist</th>
                        <th>Status</th>
                    </tr>
                </thead>
                <tbody className='allConsultations-tbody'>
                    {appointments.map((appointment, index) => (
                        <React.Fragment key={index}>
                            <tr onClick={() => toggleExpandedDetails(index)}>
                            <td>{index + 1}</td>
                            <td>{new Date(appointment.date).toLocaleDateString()}</td>
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
                                    <p><strong>Time Slot:</strong> {appointment.timeSlot}</p>
                                    
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
