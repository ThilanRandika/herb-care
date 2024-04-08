import { Link, Route, Routes } from 'react-router-dom';
import './consultationsCustomer.css';
import MyConsultations from '../myConsultations/MyConsultations';
import HomeConsultation from '../home-consultation/HomeConsultation';
import RefundsCustomer from '../refundsCustomer/RefundsCustomer';
import MyRefunds from '../../../components/consultation/myRefunds/MyRefunds';
// import { useContext, useState } from 'react';
// import { AuthContext } from '../../../context/AuthContext';

function ConsultationsCustomer() {

  return (
    <>
      <div className="consultations-nav">
        <Link className="nav-link" to={"/consultation"} aria-current="page"> Home Consultations </Link>
        <Link className="nav-link" to={"/consultation/myConsultations"} aria-current="page"> My Consultations </Link>
        <Link className='nav-link' to={"/consultation/refunds/myRefunds"} aria-current="page"> Refunds </Link>
      </div>

        <Routes>
            <Route path="/" element={<HomeConsultation />}></Route>
            <Route path="/myConsultations" element={<MyConsultations />}></Route>
            <Route path="/refunds/*" element={<RefundsCustomer />}></Route>
            <Route path="/refunds/myRefunds" element={<MyRefunds />}></Route>

        </Routes>
    </>
  )
}

export default ConsultationsCustomer