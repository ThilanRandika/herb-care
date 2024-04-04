import React, { useEffect, useState } from 'react'
import './appointmentRequests.css'
import axios from 'axios';

function AppointmentRequests(props) {

  const  [appointments, setAppointments] = useState([]);
  const [specialist, setSpecialist] = useState("");

  useEffect(() => {
    setSpecialist(props.specialistID);
  }, [props.specialistID]);

  console.log("logged specialist: " + JSON.stringify(specialist));

  useEffect(() => {
    axios.get(`http://localhost:8070/consultAppointment/getUpcomingAppointments/${props.specialistID}`)
        .then((res) => {
            console.log("Got data: ", res.data);
            setAppointments(res.data);
        })
        .catch((err) => {
            console.log('Error getting pending appointments', err);
        });
}, []);



  const handleReject = (id) => {
    axios.put(`http://localhost:8070/consultAppointment/rejectAppointment/${id}`)
        .then((res) => {
            console.log("Request rejected successfully", res.data);

            
            axios.get(`http://localhost:8070/consultAppointment/getUpcomingAppointments/${props.specialistID}`)
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


  return (
    <>

      <div>
            <h1>Pending Consultation Appointments</h1>
            
            <table style={{marginTop:"5%"}}>
                <thead> 
                    <tr>
                        <th scope="col">No.</th>
                        <th scope="col">Date</th>
                        <th scope="col">Center</th>
                        <th scope="col">Status</th>
                    </tr>
                </thead>
                <tbody>
                    {appointments.map((request, index) => (
                        <tr key={index}>
                            <td>{index + 1}</td>
                            <td>{request.date}</td>
                            <td>{request.center}</td>
                            <td>{request.status}</td>
                          
                            <td>
                                <button variant="primary" onClick={() => handleReject(request._id)}>Reject</button>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    </>
  )
}

export default AppointmentRequests