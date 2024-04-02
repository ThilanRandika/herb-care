import { Route, Routes } from 'react-router-dom';
import './refundsCustomer.css';
import RefundAddForm from '../../../components/consultation/refundAddForm/RefundAddForm';

function RefundsCustomer() {
  return (
    <>
    
      <h3>Refunds page</h3>

      <Routes>
        <Route path="/addForm/:appointmentId" element={<RefundAddForm />} ></Route>
      </Routes>

    </>
  )
}

export default RefundsCustomer