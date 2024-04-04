import { useContext, useEffect, useState } from 'react';
import './myAllConsultations.css';
import axios from 'axios';
import { AuthContext } from '../../../context/AuthContext';


function MyAllConsultations() {

    const  [Appointments, setAppointments] = useState([]);
    const { user } = useContext(AuthContext); // get the customer ID from authentication context

    useEffect(() => {
        axios.get(`http://localhost:8070/consultAppointment/getAppointmentsForCus/${user.userDetails._id}`)
            .then((res) => {
                console.log("Got data: ", res.data);
                setAppointments(res.data);
            })
            .catch((err) => {
                console.log('Error getting pending appointments', err);
            });
    }, []);

  return (
    <>
      <div>
        <h3>All Consultations</h3>
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
            {Appointments.map((appointment, index) => (
              <tr key={index}>
                <td>{index + 1}</td>
                <td>{appointment.date}</td>
                <td>{appointment.center}</td>
                <td>{appointment.specialist}</td>
                <td>{appointment.status}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </>

  )
}

export default MyAllConsultations