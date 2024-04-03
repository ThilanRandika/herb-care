import {
  BrowserRouter,
  Routes,
  Route,
} from "react-router-dom";

//import './App.css';
import Home from "./pages/common/home/Home";
import Inventory_Dashboard from "./pages/inventory/Inventory_Dashboard/Inventory_Dashboard";
import SellerHome from "./pages/sellerPartnership/Home/SellerHome";
import SellerManagerDashboard from "./pages/sellerPartnership/managerDashboard/SellerManagerDashboard";
import LoginPage from "./pages/common/login/LoginPage";
import SellerStaffDashboard from "./pages/sellerPartnership/staffDashboard/SellerStaffDashboard";

import Complaints_Dashboard from "./pages/Feedback&complaints/Complaints/Complaints";
import Display_user from "./pages/Feedback&complaints/Complaints/DisplayUser";
import Display_Staff from "./pages/Feedback&complaints/Complaints/DisplayStaff";


function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home/>}></Route>
        <Route path="/Inventory_Dashboard" element={<Inventory_Dashboard/>}></Route>

        <Route path="/sellerHome/*" element={<SellerHome/>}></Route>
        <Route path="/sellerManagerDashboard/*" element={<SellerManagerDashboard/>}></Route>
        <Route path="/sellerStaffDashboard/*" element={<SellerStaffDashboard/>}></Route>
        <Route path="/login" element={<LoginPage/>}></Route>

        <Route path="/Complaints" element={<Complaints_Dashboard/>}></Route>
        <Route path="/DisplayUser" element={<Display_user/>}></Route>
        <Route path="/DisplayStaff" element={<Display_Staff/>}></Route>
      </Routes>
      
    </BrowserRouter>
  );
}

export default App;
