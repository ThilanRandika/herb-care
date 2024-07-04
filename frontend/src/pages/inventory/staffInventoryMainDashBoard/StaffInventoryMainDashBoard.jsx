import { Route, Routes } from 'react-router-dom';
import './staffInventoryMainDashBoard.css';
import StaffProductAddPage from '../staffProductAddPage/StaffProductAddPage';
import StaffInventoryDashboardHome from '../staffInventoryDashboardHome/StaffInventoryDashboardHome';
import StaffInventoryTopNav from '../../../components/common/staff/staffInventoryTopNav/StaffInventoryTopNav';

function StaffInventoryMainDashBoard() {
  return (
    <div>
      <StaffInventoryTopNav></StaffInventoryTopNav>
        <Routes>
            <Route path="/" element={<StaffInventoryDashboardHome />}></Route>
            <Route path="/addProduct" element={<StaffProductAddPage />}></Route>
      </Routes>
    </div>
  )
}

export default StaffInventoryMainDashBoard