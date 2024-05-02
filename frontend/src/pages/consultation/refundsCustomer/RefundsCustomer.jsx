import { Route, Routes } from 'react-router-dom';
import './refundsCustomer.css';
import RefundAddForm from '../../../components/consultation/refundAddForm/RefundAddForm';
import MyRefunds from '../../../components/consultation/myRefunds/MyRefunds';


function RefundsCustomer() {
  return (
    <>

      <Routes>
        <Route path="/myRefunds" element={<MyRefunds />} ></Route>
        <Route path="/addForm/:appointmentId" element={<RefundAddForm />} ></Route>
      </Routes>

    </>
  )
}

export default RefundsCustomer