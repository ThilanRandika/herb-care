import {
  BrowserRouter,
  Routes,
  Route,
} from "react-router-dom";

import './App.css';
import Home from "./pages/common/home/Home";
import Dashboard from "./pages/sellerPartnership/Home/Dashboard";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home/>}></Route>
        <Route path="/sellerPartnership" element={<Dashboard/>}></Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
