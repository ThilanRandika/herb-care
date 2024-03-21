import { Link } from 'react-router-dom';
import './navBarSpecialistDashBoard.css';

function NavBarSpecialistDashBoard() {
  return (
    <>
      <div className="col-lg-3 left-column">
        <ul className="nav flex-column">
          <li className="nav-item">
            <Link
              className="nav-link"
              to={"/dashboardSpecialist/"}
              aria-current="page"
            >
              Dashboard
            </Link>
          </li>
          <li className="nav-item">
            <Link
              className="nav-link"
              to={"/dashboardSpecialist/appointmentRequests"}
            >
              appointment requests
            </Link>
          </li>
          <li className="nav-item">
            <Link
              className="nav-link"
              to={"/dashboardSpecialist/appointments"}
            >
              Appointments
            </Link>
          </li>
        </ul>
      </div>
    </>
  )
}

export default NavBarSpecialistDashBoard