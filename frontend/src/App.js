import {
  BrowserRouter,
  Routes,
  Route,
} from "react-router-dom";
import './App.css';
import Home from "./pages/common/home/Home";
import Inventory_Dashboard from "./pages/inventory/Inventory_Dashboard/Inventory_Dashboard";

import User_searching from "./pages/user_searching/User_searching"
import Producttesting from "./pages/inventory/Inventory_Dashboard/Producttesting";
import 'bootstrap/dist/css/bootstrap.min.css';
import Product from "./pages/user_searching/Product";

import SellerManagerDashboard from "./pages/sellerPartnership/managerDashboard/SellerManagerDashboard";
import LoginPage from "./pages/common/login/LoginPage";
import SellerStaffDashboard from "./pages/sellerPartnership/staffDashboard/SellerStaffDashboard";
import SellerMainHome from "./pages/sellerPartnership/Home/SellerMainHome";

import ConsultationsCustomer from "./pages/consultation/consultationsCustomer/ConsultationsCustomer";
import SpecialistInterface from "./pages/consultation/specialist/specialistInterface/SpecialistInterface";
import ConsultationStaff from "./pages/consultation/staff/consultationStaff/ConsultationStaff";



function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/customer" element={<Home/>}></Route>
        <Route path="/Inventory_Dashboard" element={<Inventory_Dashboard/>}></Route>

        <Route path="/User_searching/*" element={<User_searching/>}></Route>
        <Route path="/Producttesting/*" element={<Producttesting/>}></Route>
        <Route path="/Product/:id" element={<Product/>}></Route>
        
        <Route path="/consultation/*" element={<ConsultationsCustomer/>}></Route>
        <Route path="/specialistInterface/*" element={<SpecialistInterface/>}></Route>
        <Route path="/consultationStaff/*" element={<ConsultationStaff/>}></Route>

        <Route path="/sellerMainHome/*" element={<SellerMainHome/>}></Route>
        <Route path="/sellerManagerDashboard/*" element={<SellerManagerDashboard/>}></Route>
        <Route path="/sellerStaffDashboard/*" element={<SellerStaffDashboard/>}></Route>
        <Route path="/" element={<LoginPage/>}></Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
