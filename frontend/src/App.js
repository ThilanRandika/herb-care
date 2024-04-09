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
import AddDefaultGiftPack from "./components/gift package/defaultGiftPackage/AddDefaultGiftPack";
import DefaultGiftpackages from "./components/gift package/defaultGiftPackage/DefaultGiftPackages";
import UpdateDefaultGiftPackage from "./components/gift package/defaultGiftPackage/UpdateDefaultGiftPackage";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home/>}></Route>
        <Route path="/Inventory_Dashboard" element={<Inventory_Dashboard/>}></Route>
        <Route path="/sellerPartnership" element={<Dashboard/>}></Route>
        <Route path="/staff" element={<GiftPackage_manage/>}></Route>
        <Route path="/add_Default_gift_pack" element={<AddDefaultGiftPack/>}></Route>
        <Route path="/Default_gift_packages" element={<DefaultGiftpackages/>}></Route>
        <Route path="/Update_default_gift_packages" element={<UpdateDefaultGiftPackage/>}></Route>
      </Routes>
    </BrowserRouter>

  );
}

export default App;
