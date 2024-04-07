import {
  BrowserRouter,
  Routes,
  Route,
} from "react-router-dom";
import './App.css';
import Home from "./pages/common/home/Home";
import Inventory_Dashboard from "./pages/inventory/Inventory_Dashboard/Inventory_Dashboard";
import SellerManagerDashboard from "./pages/sellerPartnership/managerDashboard/SellerManagerDashboard";
import LoginPage from "./pages/common/login/LoginPage";
import SellerStaffDashboard from "./pages/sellerPartnership/staffDashboard/SellerStaffDashboard";
import SellerMainHome from "./pages/sellerPartnership/Home/SellerMainHome";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home/>}></Route>
        <Route path="/Inventory_Dashboard" element={<Inventory_Dashboard/>}></Route>
        <Route path="/sellerMainHome/*" element={<SellerMainHome/>}></Route>
        <Route path="/sellerManagerDashboard/*" element={<SellerManagerDashboard/>}></Route>
        <Route path="/sellerStaffDashboard/*" element={<SellerStaffDashboard/>}></Route>
        <Route path="/login" element={<LoginPage/>}></Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
