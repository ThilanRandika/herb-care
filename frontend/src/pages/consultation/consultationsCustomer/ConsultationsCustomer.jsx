import { Link, Route, Routes } from 'react-router-dom';
import './consultationsCustomer.css';
import MyConsultations from '../myConsultations/MyConsultations';
import HomeConsultation from '../home-consultation/HomeConsultation';
import { useState } from 'react';

function ConsultationsCustomer() {

  const [customerID, setCustomerID] = useState("");

  return (
    <>
      <div className="consultations-nav">
        <Link className="nav-link" to={"/consultation"} aria-current="page"> Home Consultations </Link>
        <Link className="nav-link" to={"/consultation/myConsultations"} aria-current="page"> My Consultations </Link>
        <div className="customer">
          <label> Enter CustomerID :</label>
          <input type='text' value={customerID} onChange={(e)=> setCustomerID(e.target.value) }/>
        </div>
      </div>

        <Routes>
            <Route path="/" element={<HomeConsultation customerID={customerID} />}></Route>
            <Route path="/myConsultations" element={<MyConsultations customerID={customerID} />}></Route>
        </Routes>
    </>
  )
}

export default ConsultationsCustomer