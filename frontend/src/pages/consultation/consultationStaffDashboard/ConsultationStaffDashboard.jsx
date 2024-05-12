import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import './consultationStaffDashboard.css';

function ConsultationStaffDashboard() {

  const [pendingRefundCount, setPendingRefundCount] = useState(0);
  const [allRefundCount, setAllRefundCount] = useState(0);
  const [completedRefundCount, setCompletedRefundCount] = useState(0);



  useEffect(() => {
    fetchRefundCount();
    fetchAllRefundCount();
    fetchCompletedRefundCount();
  }, []);

  const fetchRefundCount = async () => {
    try {
      const response = await fetch("http://localhost:8070/refund/incompleteRefundsCount");
      if (response.ok) {
        const data = await response.json();
        setPendingRefundCount(data.count);
      } else {
        console.error("Failed to fetch refund count");
      }
    } catch (error) {
      console.error("Failed to fetch refund count:", error);
    }
  };

  const fetchAllRefundCount = async () => {
    try {
      const response = await fetch("http://localhost:8070/refund/allRefundsCount");
      if (response.ok) {
        const data = await response.json();
        setAllRefundCount(data.count);
      } else {
        console.error("Failed to fetch refund count");
      }
    } catch (error) {
      console.error("Failed to fetch refund count:", error);
    }
  };

  const fetchCompletedRefundCount = async () => {
    try {
      const response = await fetch("http://localhost:8070/refund/completeRefundsCount");
      if (response.ok) {
        const data = await response.json();
        setCompletedRefundCount(data.count);
      } else {
        console.error("Failed to fetch refund count");
      }
    } catch (error) {
      console.error("Failed to fetch refund count:", error);
    }
  };


  return (
    <div className='consultationStaffDashboard-allContents'>
        <h2>Consultation staff dashboard</h2>
        <div className='consultationStaffDashboard-stats'>
        <Link to="/staff/consultationStaff/refundRequests" className="staffDashBoard-home-stats-statCard" style={{ textDecoration: 'none', color: 'inherit' }}>
          <div className="staffDashBoard-home-stats-statCard-header">
            <h5>Pending Refund Requests</h5>
            <h2>{pendingRefundCount}</h2>
          </div>
        </Link>
        <Link to="/staff/consultationStaff/refundRequests" className="staffDashBoard-home-stats-statCard" style={{ textDecoration: 'none', color: 'inherit' }}>
          <div className="staffDashBoard-home-stats-statCard-header">
            <h5>All Refund Requests</h5>
            <h2>{allRefundCount}</h2>
          </div>
        </Link>
        <Link to="/staff/consultationStaff/refundRequests" className="staffDashBoard-home-stats-statCard" style={{ textDecoration: 'none', color: 'inherit' }}>
          <div className="staffDashBoard-home-stats-statCard-header">
            <h5>Completed Refund Requests</h5>
            <h2>{completedRefundCount}</h2>
          </div>
        </Link>
        </div>
    </div>
  )
}

export default ConsultationStaffDashboard