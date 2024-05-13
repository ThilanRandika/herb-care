import { BrowserRouter, Routes, Route } from "react-router-dom";

import "./App.css";
import Home from "./pages/common/home/Home";
import Inventory_Dashboard from "./pages/inventory/Inventory_Dashboard/Inventory_Dashboard";

import User_searching from "./pages/inventory/user_searching/User_searching";
import Producttesting from "./pages/inventory/Inventory_Dashboard/Producttesting";
import "bootstrap/dist/css/bootstrap.min.css";
import Product from "./pages/inventory/user_searching/Product";
import Staff_Dashboard from "./pages/inventory/Staff_Inventory_Management/Staff_Dashboard";

import SellerManagerDashboard from "./pages/sellerPartnership/managerDashboard/SellerManagerDashboard";
import LoginPage from "./pages/common/login/LoginPage";
import SellerStaffDashboard from "./pages/sellerPartnership/staffDashboard/SellerStaffDashboard";
import SellerMainHome from "./pages/sellerPartnership/Home/SellerMainHome";

import ConsultationsCustomer from "./pages/consultation/consultationsCustomer/ConsultationsCustomer";
import SpecialistInterface from "./pages/consultation/specialist/specialistInterface/SpecialistInterface";
import ConsultationStaff from "./pages/consultation/staff/consultationStaff/ConsultationStaff";

import FeedbackDashboard from "./pages/Feedback&complaints/FeedbackDashboard/FeedbackDashboard";

import GiftPackage_manage from "./pages/giftPackage/staff/Dashboard/GiftPackage_manage";
import AddDefaultGiftPack from "./components/gift package/defaultGiftPackage/AddDefaultGiftPack";
import DefaultGiftpackages from "./components/gift package/defaultGiftPackage/DefaultGiftPackages";
import UpdateDefaultGiftPackage from "./components/gift package/defaultGiftPackage/UpdateDefaultGiftPackage";

import MyOrders from "./pages/Order_Management/myOrders/MyOrders";

import DisplayDefaultGiftPackages from "./components/gift package/customizeGiftPackage/DisplayDefaultGiftPackages";
import PlaceOrder from "./components/gift package/giftPackageOrders/PlaceOrder";
import DisplayGiftPackOrders from "./components/gift package/giftPackageOrders/DisplayGiftPackOrders";

// import routes
import ViewPackages from "./components/HolidayPackage/ViewPackages";
import ManagePackages from "./components/HolidayPackage/ManagePackages";
import StaffDashboard from "./components/HolidayPackage/StaffDashboard";
import PackageDetails from "./components/HolidayPackage/PackageDetails";
import BookingForm from "./components/HolidayPackage/BookingForm";
import CreatePackage from "./components/HolidayPackage/CreatePackage";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route
          path="/Feedback&Complains/*"
          element={<FeedbackDashboard />}
        ></Route>

        <Route path="/customer" element={<Home />}></Route>
        <Route
          path="/Inventory_Dashboard/*"
          element={<Inventory_Dashboard />}
        />
        <Route path="/User_searching/*" element={<User_searching />} />
        <Route path="/Producttesting/*" element={<Producttesting />} />
        <Route path="/Product/:id" element={<Product />} />
        <Route path="/Staff_Dashboard/*" element={<Staff_Dashboard />} />

        <Route path="/sellerMainHome/*" element={<SellerMainHome />} />
        <Route
          path="/sellerManagerDashboard/*"
          element={<SellerManagerDashboard />}
        />
        <Route
          path="/sellerStaffDashboard/*"
          element={<SellerStaffDashboard />}
        />

        <Route path="/" element={<LoginPage />} />
        <Route path="/consultation/*" element={<ConsultationsCustomer />} />
        <Route
          path="/specialistInterface/*"
          element={<SpecialistInterface />}
        />
        <Route path="/consultationStaff/*" element={<ConsultationStaff />} />

        <Route path="/staffGift" element={<GiftPackage_manage />}></Route>
        <Route
          path="/add_Default_gift_pack"
          element={<AddDefaultGiftPack />}
        ></Route>
        <Route
          path="/Default_gift_packages"
          element={<DefaultGiftpackages />}
        ></Route>

        <Route path="/myOrders/*" element={<MyOrders />} />

        <Route
          path="/Update_default_gift_packages/:id"
          element={<UpdateDefaultGiftPackage />}
        ></Route>
        <Route
          path="/Gift-Package-Orders"
          element={<DisplayGiftPackOrders />}
        ></Route>
        <Route
          path="/Gift_Packages"
          element={<DisplayDefaultGiftPackages />}
        ></Route>
        <Route path="/Place-Order/:id" element={<PlaceOrder />}></Route>

        <Route path="/StaffDashboard" element={<StaffDashboard />}></Route>
        <Route path="/ViewPackages" element={<ViewPackages />}></Route>
        <Route path="/ManagePackages" element={<ManagePackages />}></Route>
        <Route path="/PackageDetails/:id" element={<PackageDetails />}></Route>
        <Route path="/BookingForm" element={<BookingForm />}></Route>
        <Route path="/CreatePackage" element={<CreatePackage />}></Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
