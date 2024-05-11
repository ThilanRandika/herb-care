import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import './staffDashboardHome.css';

function StaffDashboardHome() {
  const [refundCount, setRefundCount] = useState(0);
  const [pendingWholesaleOrdersCount, setPendingWholesaleOrdersCount] = useState(0);
  const [pendingGiftPackageOrdersCount, setPendingGiftPackageOrdersCount] = useState(0);

  useEffect(() => {
    fetchRefundCount();
    fetchPendingWholesaleOrdersCount();
    fetchPendingGiftPackageOrdersCount();
  }, []);

  const fetchRefundCount = async () => {
    try {
      const response = await fetch("http://localhost:8070/refund/incompleteRefundsCount");
      if (response.ok) {
        const data = await response.json();
        setRefundCount(data.count);
      } else {
        console.error("Failed to fetch refund count");
      }
    } catch (error) {
      console.error("Failed to fetch refund count:", error);
    }
  };

  const fetchPendingWholesaleOrdersCount = async () => {
    try {
      const response = await fetch("http://localhost:8070/sellerOrder/pendingOrders/count");
      if (response.ok) {
        const data = await response.json();
        setPendingWholesaleOrdersCount(data.pendingOrdersCount);
      } else {
        console.error("Failed to fetch pending wholesale orders count");
      }
    } catch (error) {
      console.error("Failed to fetch pending wholesale orders count:", error);
    }
  };

  const fetchPendingGiftPackageOrdersCount = async () => {
    try {
      const response = await fetch("http://localhost:8070/giftPackageOrder/pendingOrders/count");
      if (response.ok) {
        const data = await response.json();
        setPendingGiftPackageOrdersCount(data.pendingOrdersCount);
      } else {
        console.error("Failed to fetch pending gift package orders count");
      }
    } catch (error) {
      console.error("Failed to fetch pending gift package orders count:", error);
    }
  };

  return (
    <div className='staffDashBoard-home-allContents'>
      <h1>Staff Dashboard</h1>
      <div className="staffDashBoard-home-stats">
        <Link to="/staff/consultationStaff/refundRequests" className="staffDashBoard-home-stats-statCard" style={{ textDecoration: 'none', color: 'inherit' }}>
          <div className="staffDashBoard-home-stats-statCard-header">
            <h5>Refund Requests</h5>
            <h2>{refundCount}</h2>
          </div>
        </Link>
        <Link to="/staff/SellerStaffDashboard/newOrders" className="staffDashBoard-home-stats-statCard" style={{ textDecoration: 'none', color: 'inherit' }}>
          <div className="staffDashBoard-home-stats-statCard-header">
            <h5>Wholesale Orders</h5>
            <h2>{pendingWholesaleOrdersCount}</h2>
          </div>
        </Link>
        <Link to="/staff/staffGift/Gift-Package-Orders" className="staffDashBoard-home-stats-statCard" style={{ textDecoration: 'none', color: 'inherit' }}>
          <div className="staffDashBoard-home-stats-statCard-header">
            <h5>Gift Package Orders</h5>
            <h2>{pendingGiftPackageOrdersCount}</h2>
          </div>
        </Link>
      </div>
    </div>
  )
}

export default StaffDashboardHome;
