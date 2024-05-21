import { Link, Route, Routes } from 'react-router-dom';
import './consultationsCustomer.css';
import MyConsultations from '../myConsultations/MyConsultations';
import HomeConsultation from '../home-consultation/HomeConsultation';
import RefundsCustomer from '../refundsCustomer/RefundsCustomer';
import MyRefunds from '../../../components/consultation/myRefunds/MyRefunds';
import Header from '../../../components/common/header/header';
import NavigationBar from '../../../components/common/navigationBar/NavigationBar';
import ConsultationCusNavBar from '../../../components/consultation/consultationCusNavBar/ConsultationCusNavBar';
// import { useContext, useState } from 'react';
// import { AuthContext } from '../../../context/AuthContext';

function ConsultationsCustomer() {

  return (
    <>
    {/* <NavigationBar></NavigationBar> */}
    
        {/* <ConsultationCusNavBar></ConsultationCusNavBar> */}

        <Header></Header>

        <Routes>
            <Route path="/homeConsultation" element={<HomeConsultation />}></Route>
            <Route path="/myConsultations/*" element={<MyConsultations />}></Route>
            <Route path="/refunds/*" element={<RefundsCustomer />}></Route>
            <Route path="/refunds/myRefunds" element={<MyRefunds />}></Route>

        </Routes>
    </>
  )
}

export default ConsultationsCustomer