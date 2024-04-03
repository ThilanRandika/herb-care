import { Route, Routes } from 'react-router-dom';
import './refundsCustomer.css';
import RefundAddForm from '../../../components/consultation/refundAddForm/RefundAddForm';
import MyRefunds from '../../../components/consultation/myRefunds/MyRefunds';

function RefundsCustomer(props) {
  return (
    <>
    
      <h3>Refunds page</h3>

      <MyRefunds customerID={props.customerID} />

      <Routes>
        <Route path="/addForm/:appointmentId" element={<RefundAddForm />} ></Route>
      </Routes>

    </>
  )
}

export default RefundsCustomer