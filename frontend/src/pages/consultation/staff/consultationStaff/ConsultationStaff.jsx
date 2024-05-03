import { Link, Route, Routes } from 'react-router-dom';
import './consultationStaff.css';
import ConsultationStaffDashboard from '../../consultationStaffDashboard/ConsultationStaffDashboard';
import StaffRefundRequests from '../staffRefundRequests/StaffRefundRequests';

function ConsultationStaff() {
  return (
    <>

    <div className='consultation-dashboard-container'>
    <div className="seller-staff-sidebar">
        <ul className="seller-staff-sidebar-nav">
          <li className="seller-staff-sidebar-item">
            <Link
              className="seller-staff-sidebar-link"
              to={"/staff/consultationStaff/"}
              aria-current="page"
            >
              consultation Dashboard
            </Link>
          </li>
          <li className="seller-staff-sidebar-item">
            <Link
              className="seller-staff-sidebar-link"
              to={"/staff/consultationStaff/refundRequests/"}
            >
              Refund Requests
            </Link>
          </li>
          
        </ul>
      </div>

      <div className='consultaion-content-container'>
      <Routes>
        <Route path="/" element={<ConsultationStaffDashboard />}></Route>
        <Route path="/refundRequests" element={<StaffRefundRequests />}></Route>
      </Routes>
      </div>
    </div> 
    </>
  )
}

export default ConsultationStaff