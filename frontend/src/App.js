import {
  BrowserRouter,
  Routes,
  Route,
} from "react-router-dom";

import './App.css';
import Home from "./pages/common/home/Home";
import Inventory_Dashboard from "./pages/inventory/Inventory_Dashboard/Inventory_Dashboard";
import Dashboard from "./pages/sellerPartnership/Home/Dashboard";
import GiftPackage_manage from "./pages/staff/Dashboard/GiftPackage_manage";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home/>}></Route>
        <Route path="/Inventory_Dashboard" element={<Inventory_Dashboard/>}></Route>
        <Route path="/sellerPartnership" element={<Dashboard/>}></Route>
        <Route path="/staff" element={<GiftPackage_manage/>}></Route>
      </Routes>
    </BrowserRouter>

  );
}

export default App;
