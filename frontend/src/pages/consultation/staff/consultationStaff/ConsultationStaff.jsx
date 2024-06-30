import { Link, Route, Routes } from 'react-router-dom';
import './consultationStaff.css';
import ConsultationStaffDashboard from '../../consultationStaffDashboard/ConsultationStaffDashboard';
import StaffRefundRequests from '../staffRefundRequests/StaffRefundRequests';
import StaffConsultationsTopNav from '../../../../components/common/staff/staffConsultationsTopNav/StaffConsultationsTopNav';

function ConsultationStaff() {
  return (
    <>

      <StaffConsultationsTopNav></StaffConsultationsTopNav>

    <div className='consultation-dashboard-container'>

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