import {
  BrowserRouter,
  Routes,
  Route,
} from "react-router-dom";

import './App.css';
import Home from "./pages/common/home/Home";
import Inventory_Dashboard from "./pages/inventory/Inventory_Dashboard/Inventory_Dashboard";
import SellerHome from "./pages/sellerPartnership/Home/SellerHome";
import SellerManagerDashboard from "./pages/sellerPartnership/managerDashboard/SellerManagerDashboard";
import LoginPage from "./pages/common/login/LoginPage";
import SellerStaffDashboard from "./pages/sellerPartnership/staffDashboard/SellerStaffDashboard";



import FeedbackDashboard from "./pages/Feedback&complaints/FeedbackDashboard/FeedbackDashboard";




function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home/>}></Route>
        
        <Route path="/Inventory_Dashboard" element={<Inventory_Dashboard/>}></Route>
        <Route path="/Login" element={<LoginPage/>}></Route>

        <Route path="/sellerHome/*" element={<SellerHome/>}></Route>
        <Route path="/sellerManagerDashboard/*" element={<SellerManagerDashboard/>}></Route>
        <Route path="/sellerStaffDashboard/*" element={<SellerStaffDashboard/>}></Route>
        <Route path="/login" element={<LoginPage/>}></Route>

        <Route path="/Feedback&Complains/*" element={<FeedbackDashboard/>}></Route>

      </Routes>
      
    </BrowserRouter>
  );
}

export default App;
