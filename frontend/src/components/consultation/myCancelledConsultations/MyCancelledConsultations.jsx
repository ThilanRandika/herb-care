import { useEffect, useState } from 'react';
import './myCancelledConsultations.css';
import axios from 'axios';
import RefundAddForm from '../refundAddForm/RefundAddForm';
import { Link } from 'react-router-dom';

function MyCancelledConsultations(props) {

  const  [cancelledAppointments, setCancelledAppointments] = useState([]);
  const [dataFetched, setDataFetched] = useState(false); // Track whether data has been fetched
  const [refundStatuses, setRefundStatuses] = useState([]); // Store refund statuses

    useEffect(() => {
        axios.get(`http://localhost:8070/consultAppointment/cancelledAppointments/${props.customerID}`)
            .then((res) => {
                console.log("Got data: ", res.data);
                setCancelledAppointments(res.data);
                setDataFetched(true); // Update state to indicate data has been fetched
            })
            .catch((err) => {
                console.log('Error getting cancelled appointments', err);
            });
    }, [props.customerID]);

    useEffect(() => {
      const fetchRefundStatuses = async () => {
        const refundStatuses = await Promise.all(cancelledAppointments.map(appointment =>
          hasRefund(appointment._id)
        ));
        setRefundStatuses(refundStatuses);
      };
  
      if (dataFetched) {
        fetchRefundStatuses();
      }
    }, [cancelledAppointments, dataFetched]);
  
    const hasRefund = async (appointmentId) => {
      try {
        const response = await axios.get(`http://localhost:8070/refund/checkExistingRefund/${appointmentId}`);
        return response.data.hasRefund;
      } catch (error) {
        console.error('Error checking existing refund:', error);
        return false; // Return false in case of error
      }
    };

  return (
    <>
    
        <div>
            <h3>Cancelled Consultations</h3>
            <table style={{ marginTop: "5%" }}>
            <thead>
              <tr>
                <th scope="col">No.</th>
                <th scope="col">ID</th>
                <th scope="col">Date</th>
                <th scope="col">Center</th>
                <th scope="col">Specialist</th>
                <th scope="col">Status</th>
              </tr>
            </thead>
            <tbody>
              {cancelledAppointments.map((appointment, index) => (
                <tr key={index}>
                  <td>{index + 1}</td>
                  <td>{appointment._id}</td>
                  <td>{appointment.date}</td>
                  <td>{appointment.center}</td>
                  <td>{appointment.specialist}</td>
                  <td>{appointment.status}</td>
                  <td>
                    {dataFetched && refundStatuses[index] !== undefined && (
                      <>
                        {!refundStatuses[index] && (
                        <>
                        <Link to={`../refunds/addForm/${appointment._id}`} className="custom-link" >Apply refund</Link>
                        </>
                        )}
                        {refundStatuses[index] && (
                          <span>Refund already requested</span>
                        )}
                      </>
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

export default MyCancelledConsultations