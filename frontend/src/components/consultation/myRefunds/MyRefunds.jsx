import { useContext, useEffect, useState } from 'react';
import './myRefunds.css';
import axios from 'axios';
import { AuthContext } from '../../../context/AuthContext';

function MyRefunds(props) {

    const  [Refunds, setRefunds] = useState([]);
    const { user } = useContext(AuthContext); // get the customer ID from authentication context

    useEffect(() => {
        axios.get(`http://localhost:8070/refund/customerRefunds/${user.userDetails._id}`)
            .then((res) => {
                console.log("Got data: ", res.data);
                setRefunds(res.data);
            })
            .catch((err) => {
                console.log('Error getting Refunds', err);
            });
    }, []);

  return (
    <>
      <div>
        <h3>My All Refunds</h3>
          <table style={{ marginTop: "5%" }}>
            <thead>
              <tr>
                <th scope="col">No.</th>
                <th scope="col">appointment</th>
                <th scope="col">Refund Date</th>
                <th scope="col">Refund Type</th>
                <th scope="col">Refund Amount</th>
                <th scope="col">bank Account Details</th>
                <th scope="col">Status</th>
              </tr>
            </thead>
            <tbody>
              {Refunds.map((refund, index) => (
                <tr key={index}>
                  <td>{index + 1}</td>
                  <td>{refund.appointment}</td>
                  <td>{refund.refundDateTime}</td>
                  <td>{refund.refundType}</td>
                  <td>{refund.refundAmount}</td>
                  <td>{refund.bankAccountDetails}</td>
                  <td>{refund.refundStatus}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>  
    </>
  )
}

export default MyRefunds