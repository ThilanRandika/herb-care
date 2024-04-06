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


function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home/>}></Route>
        <Route path="/Inventory_Dashboard" element={<Inventory_Dashboard/>}></Route>
        <Route path="/User_searching/*" element={<User_searching/>}></Route>
        <Route path="/Producttesting/*" element={<Producttesting/>}></Route>
        <Route path="/Product/:id" element={<Product/>}></Route>
      </Routes>

    </BrowserRouter>
  );
}

export default App;
