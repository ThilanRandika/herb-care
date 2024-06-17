import { useParams } from 'react-router-dom';
import './refundAddForm.css';
import { useEffect, useState } from 'react';
import axios from 'axios';
import {useNavigate} from 'react-router-dom'
import config from '../../../config';

function RefundAddForm() {
  const navigator = useNavigate();
  const { appointmentId } = useParams();
  const [appointment, setAppointment] = useState(null);

  const [refund, setRefund] = useState({
    appointment: "",
    bankAccountDetails: "",
  });

  const [refundInfo, setRefundInfo] = useState({
    appointment: "",
    refundType: "",
    refundAmount: "",
    refundDateTime: "",
    refundStatus: ""
  });

  useEffect(() => {
    const fetchAppointment = async () => {
      try {
        const response = await axios.get(`${config.BASE_URL}/consultAppointment/getAppointment/${appointmentId}`);
        setAppointment(response.data);
        setRefund({ ...refund, appointment: appointmentId });
      } catch (error) {
        console.error('Error fetching appointment:', error);
      }
    };

    fetchAppointment();
  }, [appointmentId]);


  useEffect(() => {
    const fetchRefundInfo = async () => {
      try {
        const response = await axios.get(`${config.BASE_URL}/refund/refundInfo/${appointmentId}`);
        setRefundInfo(response.data);
      } catch (error) {
        console.error('Error fetching appointment:', error);
      }
    };

    fetchRefundInfo();
  }, [appointmentId]);


  const addChange = (e) => {
    const { name, value } = e.target;
    setRefund({ ...refund, [name]: value });
  };

  const Submit = async (e) => {
    e.preventDefault();

    // Check if bank account details are empty
    if (!refund.bankAccountDetails.trim()) {
      // Display alert if bank account details are empty
      alert('Please fill in the bank account details.');
      return; // Exit the function early
    }

    const newRefund = {
      appointmentId: refund.appointment,
      bankAccountDetails: refund.bankAccountDetails,
    }
    axios.post(`${config.BASE_URL}/refund/add`, newRefund).then((res)=>{
      alert('Refund request submitted successfully!'); // Show success alert
      navigator('../../refunds/myRefunds');
    }).catch((err)=>{
      console.error(err);
    })
  };

  // Render loading state if appointment is null
  if (appointment === null) {
    return (
      <div className="specialistList-loading-container">
        <div className="specialistList-loading-spinner"></div>
        <div>Loading...</div>
      </div>
    );
  }
  

  return (
    <>
      <div className="refundAddForm-header">
        <h2>Refund Add Form</h2>
      </div>

      {appointment && (
        <div className="refundAddForm-staticContent">
          <div className="refundAddForm-appointmentInfo">
            <h3>Appointment Details</h3>
            <div className="refundAddForm-appointmentInfo-appointmentDate">
              <p>Appointment Date : {appointment.date}</p>
            </div>
            <div className="refundAddForm-appointmentInfo-appointmentTimeslot">
            <p>Appointment Time : {appointment.timeslot}</p>
            </div>
            <div className="refundAddForm-appointmentInfo-specialist">
            <p>Specialist : {appointment.specialistName}</p>
            </div>
            <div className="refundAddForm-appointmentInfo-appointmentDate">
              <p>appointment Amount : Rs.{appointment.appointmentAmount}</p>
            </div>
            <div className="refundAddForm-appointmentInfo-appointmentDate">
              <p>patientName : {appointment.patientInfo.patientName}</p>
            </div>
          </div>

          <div className="refundAddForm-refundInfo">
              <h3>Refund Details</h3>

              <label htmlFor="refundAmount" >Refund Amount</label>
              <input type="text" className="form-control" id="refundAmount" value={refundInfo.refundAmount} readOnly name="refundAmount" />

              <label htmlFor="refundType" >Refund Type</label>
              <input type="text" className="form-control" id="refundType" value={refundInfo.refundType} readOnly name="refundType" />
            </div>
        </div>
      )}


      <form onSubmit={Submit}>
          <div className="refundAddForm-refund-userInputs">
            <p>Please fill and submit the bank account details for complete the refund request</p>
            <div className="refundAddForm-refund-bankDetails">
              <label htmlFor="bankAccountDetails" >Bank Account Details</label>
              <textarea type="text" className="form-control" id="bankAccountDetails" onChange={addChange} name="bankAccountDetails" />
            </div>
          </div>

          <div className='refundAddForm-refund-submit'>
            <button type="submit"> Apply Refund </button>
          </div>
      </form>
    
    </>
  )
}

export default RefundAddForm