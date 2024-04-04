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
              to={"/specialistInterface/"}
              aria-current="page"
            >
              Dashboard
            </Link>
          </li>
          <li className="nav-item">
            <Link
              className="nav-link"
              to={"/specialistInterface/appointmentRequests"}
            >
              appointment requests
            </Link>
          </li>
          <li className="nav-item">
            <Link
              className="nav-link"
              to={"/specialistInterface/appointments"}
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