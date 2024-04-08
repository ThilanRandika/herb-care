import React from "react";
import ManagerSideBar from "../../../components/sellerPartnership/managerSideBar/ManagerSideBar";
import { Routes, Route } from "react-router-dom";
import PendingSellerRequests from "../../../components/sellerPartnership/manager/pendingSellerRequests/PendingSellerRequests";
import DiscussionLevelRequests from "../../../components/sellerPartnership/manager/discussionLevelRequests/DiscussionLevelRequests";
import RegisteredSellers from "../../../components/sellerPartnership/manager/RegisterdSellers/RegisteredSellers";
import SellerRegisterForm from "../../../components/sellerPartnership/manager/sellerRegisterForm/SellerRegisterForm";
import SellerDetailEdit from "../../../components/sellerPartnership/manager/sellerDetailEdit/SellerDetailEdit";

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
              <Route exact path="/sellerUpdateForm/:id" element={<SellerDetailEdit />} />
            </Routes>
          </div>
        </div>
      </div>
    </>
  );
}

export default SellerManagerDashboard;
