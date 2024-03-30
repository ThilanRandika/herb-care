import { Link, Route, Routes } from 'react-router-dom';
import './consultationsCustomer.css';
import MyConsultations from '../myConsultations/MyConsultations';
import HomeConsultation from '../home-consultation/HomeConsultation';

function ConsultationsCustomer() {
  return (
    <>
        <Link className="nav-link" to={"/consultation"} aria-current="page"> Home Consultations </Link>
        <Link className="nav-link" to={"/consultation/myConsultations"} aria-current="page"> My Consultations </Link>

        <Routes>
            <Route path="/" element={<HomeConsultation />}></Route>
            <Route path="/myConsultations" element={<MyConsultations />}></Route>
        </Routes>
    </>
  )
}

export default ConsultationsCustomer