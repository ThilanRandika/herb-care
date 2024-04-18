import './myConsultations.css';
import { Link, Route, Routes } from 'react-router-dom';
import MyOngoingConsultations from '../../../components/consultation/myOngoingConsultations/MyOngoingConsultations';
import MyAllConsultations from '../../../components/consultation/myAllConsultations/MyAllConsultations';
import MyCancelledConsultations from '../../../components/consultation/myCancelledConsultations/MyCancelledConsultations';
import MyRejectedConsultations from '../../../components/consultation/myRejectedConsultations/MyRejectedConsultations';
import SideNavBarMyConsultations from '../../../components/consultation/sideNavBarMyConsultations/SideNavBarMyConsultations';

function MyConsultations() {

  return (
    <>

      <div className="myConsultations-customer-container">
        <div className="myConsultations-customer-nav-bar">
          <SideNavBarMyConsultations/>
        </div>

        <div className="myConsultations-customer-pages">
          <Routes>
              <Route path="/myOngoingConsultations" element={<MyOngoingConsultations />}></Route>
              <Route path="/myCancelledConsultations" element={<MyCancelledConsultations />}></Route>
              <Route path="/myRejectedConsultations" element={<MyRejectedConsultations />}></Route>
              <Route path="/myAllConsultations" element={<MyAllConsultations />}></Route>
          </Routes>

        </div>
        
      </div>




    </>
  )
}

export default MyConsultations