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

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home/>}></Route>
        <Route path="/Inventory_Dashboard" element={<Inventory_Dashboard/>}></Route>
        <Route path="/sellerHome" element={<SellerHome/>}></Route>
        <Route path="/sellerManagerDashboard/*" element={<SellerManagerDashboard/>}></Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
