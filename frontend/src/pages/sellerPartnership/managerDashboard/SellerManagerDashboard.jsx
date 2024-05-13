import React from "react";
import ManagerSideBar from "../../../components/sellerPartnership/managerSideBar/ManagerSideBar";
import { Routes, Route } from "react-router-dom";
import PendingSellerRequests from "../../../components/sellerPartnership/manager/pendingSellerRequests/PendingSellerRequests";
import DiscussionLevelRequests from "../../../components/sellerPartnership/manager/discussionLevelRequests/DiscussionLevelRequests";
import RegisteredSellers from "../../../components/sellerPartnership/manager/RegisterdSellers/RegisteredSellers";
import SellerRegisterForm from "../../../components/sellerPartnership/manager/sellerRegisterForm/SellerRegisterForm";
import SellerDetailEdit from "../../../components/sellerPartnership/manager/sellerDetailEdit/SellerDetailEdit";
import './sellerManagerDashboard.css'
import SellerManagerDashboardPage from "../dashboardPage/SellerManagerDashboardPage";

function SellerManagerDashboard() {
  return (
    <>
      <div className="seller-manager-dashboard-container">
            <ManagerSideBar />

          <div className="seller-manager-content-container">
            <Routes>
              <Route
                exact
                path="/pendingSellerRequest"
                element={<PendingSellerRequests />}
              />
              <Route
                path="/discussionLevel"
                element={<DiscussionLevelRequests />}
              />
              <Route
                exact
                path="/pendingSellerRequest"
                element={<PendingSellerRequests />}
              />
              <Route
                exact
                path="/SMdashboard"
                element={<SellerManagerDashboardPage />}
              />
              <Route exact path="/registeredSellers" element={<RegisteredSellers />} />
              <Route exact path="/sellerRegisterForm/:id" element={<SellerRegisterForm />} />
              <Route exact path="/sellerUpdateForm/:id" element={<SellerDetailEdit />} />
            </Routes>
        </div>
      </div>
      
    </>
  );
}

export default SellerManagerDashboard;
