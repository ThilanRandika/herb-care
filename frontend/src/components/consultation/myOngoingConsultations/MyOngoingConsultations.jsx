import { useEffect, useState } from 'react';
import './myOngoingConsultations.css'
import axios from 'axios';

function MyOngoingConsultations(props) {

    const  [onGoingAppointments, setonGoingAppointments] = useState([]);

    useEffect(() => {
        axios.get(`http://localhost:8070/consultAppointment/getOngoingAppointments/${props.customerID}`)
            .then((res) => {
                console.log("Got data: ", res.data);
                setonGoingAppointments(res.data);
            })
            .catch((err) => {
                console.log('Error getting pending appointments', err);
            });
    }, []);

  return (
    <>

        <div className="container">
        <h3>Ongoing Consultations</h3>
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
              {onGoingAppointments.map((appointment, index) => (
                <tr key={index}>
                  <td>{index + 1}</td>
                  <td>{appointment.date}</td>
                  <td>{appointment.center}</td>
                  <td>{appointment.specialist}</td>
                  <td>
                    <button variant="primary">Cancel</button>
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