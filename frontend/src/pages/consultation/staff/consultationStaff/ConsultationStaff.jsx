import { Link, Route, Routes } from 'react-router-dom';
import './consultationStaff.css';
import ConsultationStaffDashboard from '../../consultationStaffDashboard/ConsultationStaffDashboard';
import StaffRefundRequests from '../staffRefundRequests/StaffRefundRequests';

function ConsultationStaff() {
  return (
    <>
        <div className="navStaff" style={{'margin':'10px', 'display': 'flex', 'gap': '10%'}}>
            <Link className="nav-link" to={"/consultationStaff/"} aria-current="page" >consultation Dashboard</Link>
            <Link className="nav-link" to={"/consultationStaff/refundRequests/"} aria-current="page" >Refund Requests</Link>
        </div>


      <Routes>
        <Route path="/" element={<ConsultationStaffDashboard />}></Route>
        <Route path="/refundRequests" element={<StaffRefundRequests />}></Route>
      </Routes>
    </>
  )
}

export default ConsultationStaff