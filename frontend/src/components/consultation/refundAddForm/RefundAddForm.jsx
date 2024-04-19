import { useParams } from 'react-router-dom';
import './refundAddForm.css';
import { useEffect, useState } from 'react';
import axios from 'axios';
import {useNavigate} from 'react-router-dom'

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
        const response = await axios.get(`http://localhost:8070/consultAppointment/getAppointment/${appointmentId}`);
        setAppointment(response.data);
        setRefund({ ...refund, appointment: appointmentId });
        // console.log("refund app", refund.appointment);
      } catch (error) {
        console.error('Error fetching appointment:', error);
      }
    };

    fetchAppointment();
  }, [appointmentId]);


  useEffect(() => {
    const fetchRefundInfo = async () => {
      try {
        const response = await axios.get(`http://localhost:8070/refund/refundInfo/${appointmentId}`);
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
    const newRefund = {
      appointmentId: refund.appointment,
      bankAccountDetails: refund.bankAccountDetails,
    }
    console.log(newRefund);
    axios.post('http://localhost:8070/refund/add', newRefund).then((res)=>{
      navigator('../../myConsultations/myOngoingConsultations');
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

      <form onSubmit={Submit}>
          <div className="mb-3">
            <label htmlFor="appointmentID" >Appointment ID</label>
            <input type="text" className="form-control" id="appointmentID" value={appointment._id} readOnly name="appointment" />
          </div>
          <div className="mb-3">
            <label htmlFor="appointmentAmount" >Appointment Amount</label>
            <input type="text" className="form-control" id="appointmentAmount" value={appointment.appointmentAmount} readOnly name="appointmentAmount" />
          </div>
          <div className="mb-3">
            <label htmlFor="bankAccountDetails" >Bank Account Details</label>
            <textarea type="text" className="form-control" id="bankAccountDetails" onChange={addChange} name="bankAccountDetails" />
          </div>

          <div className="refundInfo">
            <label htmlFor="refundAmount" >Refund Amount</label>
            <input type="text" className="form-control" id="refundAmount" value={refundInfo.refundAmount} readOnly name="refundAmount" />

            <label htmlFor="refundType" >Refund Type</label>
            <input type="text" className="form-control" id="refundType" value={refundInfo.refundType} readOnly name="refundType" />
          </div>

          <button type="submit"> Submit </button>
      </form>
    
    </>
  )
}

export default RefundAddForm