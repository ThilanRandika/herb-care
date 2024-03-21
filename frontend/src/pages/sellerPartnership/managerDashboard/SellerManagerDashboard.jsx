import React from "react";
import ManagerSideBar from "../../../components/sellerPartnership/managerSideBar/ManagerSideBar";
import { Routes, Route } from "react-router-dom";
import PendingSellerRequests from "../../../components/sellerPartnership/pendingSellerRequests/PendingSellerRequests";
import DiscussionLevelRequests from "../../../components/sellerPartnership/discussionLevelRequests/DiscussionLevelRequests";
import RegisteredSellers from "../../../components/sellerPartnership/RegisterdSellers/RegisteredSellers";
import SellerRegisterForm from "../../../components/sellerPartnership/sellerRegisterForm/SellerRegisterForm";

function SellerManagerDashboard() {
  return (
    <>
      <div className="container-fluid">
        <div className="row">
          <div className="col-lg-1">
            <ManagerSideBar />
          </div>

          <div className="col-lg-11">
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
              <Route exact path="/registeredSellers" element={<RegisteredSellers />} />
              <Route exact path="/sellerRegisterForm/:id" element={<SellerRegisterForm />} />
            </Routes>
          </div>
        </div>
      </div>
    </>
  );
}

export default SellerManagerDashboard;
