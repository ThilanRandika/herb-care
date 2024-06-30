import { Link, Route, Routes } from 'react-router-dom';
import './staffOrders.css';
import OrderStaffDashboard from '../../../components/order/staff/orderStaffDashboard/OrderStaffDashboard';
import OrderStaffNewOrders from '../../../components/order/staff/orderStaffNewOrders/OrderStaffNewOrders';
import OrderStaffProcessingOrders from '../../../components/order/staff/orderStaffProcessingOrders/OrderStaffProcessingOrders';
import OrderStaffReadyToDelivery from '../../../components/order/staff/orderStaffReadyToDelivery/OrderStaffReadyToDelivery';
import OrderStaffOnDeliveryOrders from '../../../components/order/staff/orderStaffOnDeliveryOrders/OrderStaffOnDeliveryOrders';
import OrderStaffCompletedOrders from '../../../components/order/staff/orderStaffCompletedOrders/OrderStaffCompletedOrders';
import StaffOrdersTopNav from '../../../components/common/staff/staffOrdersTopNav/StaffOrdersTopNav';

function StaffOrders() {
  return (
    <div className='staff-orders-allContent'>

      <StaffOrdersTopNav></StaffOrdersTopNav>

      {/* <br /><br /><br /><br /><br /><br />

      <div className="staff-orders-allContent-top-nav">
        <div className="seller-staff-sidebar">
          <ul className="seller-staff-sidebar-nav">
            <li className="seller-staff-sidebar-item">
              <Link
                className="seller-staff-sidebar-link"
                to={"/staff/staffOrders/dashboard"}
                aria-current="page"
              >
                Orders Dashboard
              </Link>
            </li>
            <li className="seller-staff-sidebar-item">
              <Link
                className="seller-staff-sidebar-link"
                to={"/staff/staffOrders/newOrders/"}
              >
                New Orders
              </Link>
            </li>
            <li className="seller-staff-sidebar-item">
              <Link
                className="seller-staff-sidebar-link"
                to={"/staff/staffOrders/processingOrders/"}
              >
                Processing Orders
              </Link>
            </li>
            <li className="seller-staff-sidebar-item">
              <Link
                className="seller-staff-sidebar-link"
                to={"/staff/staffOrders/ReadyToDeliveryOrders/"}
              >
                Ready To Delivery Orders
              </Link>
            </li>
            <li className="seller-staff-sidebar-item">
              <Link
                className="seller-staff-sidebar-link"
                to={"/staff/staffOrders/onDeliveryOrders/"}
              >
                On Delivery Orders
              </Link>
            </li>
            <li>
              <Link
                className="seller-staff-sidebar-link"
                to={"/staff/staffOrders/completedOrders/"}
              >
                Completed Orders
              </Link>
            </li>
            
          </ul>
        </div>
      </div> */}

      <Routes>
        <Route>
          <Route path="/dashboard" element={<OrderStaffDashboard />}></Route>
          <Route path="/newOrders" element={<OrderStaffNewOrders />}></Route>
          <Route path="/processingOrders" element={<OrderStaffProcessingOrders />}></Route>
          <Route path="/ReadyToDeliveryOrders" element={<OrderStaffReadyToDelivery />}></Route>
          <Route path="/onDeliveryOrders" element={<OrderStaffOnDeliveryOrders />}></Route>
          <Route path="/completedOrders" element={<OrderStaffCompletedOrders />}></Route>
        </Route>
      </Routes>
      
    </div>
  )
}

export default StaffOrders