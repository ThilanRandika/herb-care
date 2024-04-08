import { useContext, useEffect, useState } from 'react';
import './myOngoingConsultations.css'
import axios from 'axios';
import { AuthContext } from '../../../context/AuthContext';

function MyOngoingConsultations() {

    const  [onGoingAppointments, setonGoingAppointments] = useState([]);
    const { user } = useContext(AuthContext); // get the customer ID from authentication context


    useEffect(() => {
        axios.get(`http://localhost:8070/consultAppointment/getOngoingAppointments/${user._id}`)
            .then((res) => {
                console.log("Got data: ", res.data);
                setonGoingAppointments(res.data);
            })
            .catch((err) => {
                console.log('Error getting ongoing appointments', err);
            });
    }, []);


    const handleCancel = (id) => {
      axios.put(`http://localhost:8070/consultAppointment/cancelAppointment/${id}`)
          .then((res) => {
              console.log("Request cancelled successfully", res.data);
              axios.get(`http://localhost:8070/consultAppointment/getOngoingAppointments/${user._id}`)
                .then((res) => {
                    console.log("Got data: ", res.data);
                    setonGoingAppointments(res.data);
                })
                .catch((err) => {
                    console.log('Error getting ongoing appointments', err);
                });
          })
          .catch((err) => {
              // Handle error, show error message, etc.
              console.error('Error cancelling appointment', err);
          });
    };


  return (
    <>

        <div>
        <h3>Ongoing Consultations</h3>
          <table style={{ marginTop: "5%" }}>
            <thead>
              <tr>
                <th scope="col">No.</th>
                <th scope="col">Date</th>
                <th scope="col">Center</th>
                <th scope="col">Specialist</th>
                <th scope="col">Status</th>
              </tr>
            </thead>
            <tbody>
              {onGoingAppointments.map((appointment, index) => (
                <tr key={index}>
                  <td>{index + 1}</td>
                  <td>{appointment.date}</td>
                  <td>{appointment.center}</td>
                  <td>{appointment.specialist}</td>
                  <td>{appointment.status}</td>
                  <td>
                    {appointment.status === "Pending" && (
                      <button variant="primary" onClick={ () => handleCancel(appointment._id) } >Cancel</button>
                    )}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

    </>
  )
}

export default MyOngoingConsultations