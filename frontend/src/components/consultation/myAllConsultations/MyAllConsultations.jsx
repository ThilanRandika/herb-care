import { useEffect, useState } from 'react';
import './myAllConsultations.css';
import axios from 'axios';

function MyAllConsultations(props) {

    const  [Appointments, setAppointments] = useState([]);

    useEffect(() => {
        axios.get(`http://localhost:8070/consultAppointment/getAppointmentsForCus/${props.customerID}`)
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

        <div className="container">
        <h3>All Consultations</h3>
          <table className="table table-striped" style={{ marginTop: "5%" }}>
            <thead>
              <tr>
                <th scope="col">No.</th>
                <th scope="col">Date</th>
                <th scope="col">Center</th>
                <th scope="col">Specialist</th>
              </tr>
            </thead>
            <tbody>
              {Appointments.map((appointment, index) => (
                <tr key={index}>
                  <td>{index + 1}</td>
                  <td>{appointment.date}</td>
                  <td>{appointment.center}</td>
                  <td>{appointment.specialist}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

    </>
  )
}

export default MyAllConsultations