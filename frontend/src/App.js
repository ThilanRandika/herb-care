import {
  BrowserRouter,
  Routes,
  Route,
} from "react-router-dom";

import './App.css';
import Home from "./pages/common/home/Home";
import Inventory_Dashboard from "./pages/inventory/Inventory_Dashboard/Inventory_Dashboard";
import Dashboard from "./pages/sellerPartnership/Home/Dashboard";
import ConsultationsCustomer from "./pages/consultation/consultationsCustomer/ConsultationsCustomer";
import DashboardSpecialist from "./pages/consultation/dashboardSpecialist/DashboardSpecialist";
import ConsultationStaff from "./pages/consultation/consultationStaff/ConsultationStaff";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home/>}></Route>
        <Route path="/Inventory_Dashboard" element={<Inventory_Dashboard/>}></Route>
        <Route path="/sellerPartnership" element={<Dashboard/>}></Route>
        
        <Route path="/consultation/*" element={<ConsultationsCustomer/>}></Route>
        <Route path="/dashboardSpecialist/*" element={<DashboardSpecialist/>}></Route>
        <Route path="/consultationStaff/*" element={<ConsultationStaff/>}></Route>
      </Routes>

    </BrowserRouter>
  );
}

export default App;
