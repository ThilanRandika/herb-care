import { Link } from 'react-router-dom';
import './navBarSpecialistDashBoard.css';

function NavBarSpecialistDashBoard() {
  return (
    <>
    <div className="navBar">
      <Link to="/dashboardSpecialist/" >dashboard</Link><br />
      <Link to="/dashboardSpecialist/appointmentRequests" >appointment requests</Link><br />
      <Link to="/dashboardSpecialist/appointmentsHistory" >History</Link>
    </div>
    </>
  )
}

export default NavBarSpecialistDashBoard