import React, { useEffect, useState } from 'react';
import axios from 'axios';

function Appointments(props) {
  const [appointments, setAppointments] = useState([]);
  const [specialist, setSpecialist] = useState("");

  useEffect(() => {
    setSpecialist(props.specialistID);
  }, [props.specialistID]);

  console.log("logged specialist: " + JSON.stringify(specialist));

  useEffect(() => {
    // Fetch appointments history when the component mounts
    axios.get(`http://localhost:8070/consultAppointment/getIncompleteAppointments/${props.specialistID}`)
      .then((res) => {
        console.log("Got appointment history data: ", res.data);
        setAppointments(res.data);
      })
      .catch((err) => {
        console.error('Error getting appointment history', err);
      });
  }, []);

  return (
    <div>
      <h1>Appointment History</h1>
      <table style={{ marginTop: "5%" }}>
        <thead>
          <tr>
            <th scope="col">No.</th>
            <th scope="col">Date</th>
            <th scope="col">Center</th>
            <th scope="col">Status</th>
          </tr>
        </thead>
        <tbody>
          {appointments.map((appointment, index) => (
            <tr key={index}>
              <td>{index + 1}</td>
              <td>{appointment.date}</td>
              <td>{appointment.center}</td>
              <td>{appointment.status}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default Appointments;
