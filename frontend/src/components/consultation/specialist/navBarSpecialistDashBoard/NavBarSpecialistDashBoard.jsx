import { Link } from 'react-router-dom';
import './navBarSpecialistDashBoard.css';

function NavBarSpecialistDashBoard() {
  return (
    <>
      <div>
        <ul className="navBarSpecialistDashboard-specialist-nav-list" >
          <li>
            <Link
              className="navBarSpecialistDashboard-specialist-nav-item"
              to={"/specialistInterface/"}
              aria-current="page"
            >
              Dashboard
            </Link>
          </li>
          <li>
            <Link
              className="navBarSpecialistDashboard-specialist-nav-item"
              to={"/specialistInterface/appointmentRequests"}
            >
              appointment requests
            </Link>
          </li>
          <li>
            <Link
              className="navBarSpecialistDashboard-specialist-nav-item"
              to={"/specialistInterface/appointments"}
            >
              Appointments
            </Link>
          </li>
          <li>
            <Link
              className="navBarSpecialistDashboard-specialist-nav-item"
              to={"/specialistInterface/availability"}
            >
              Availability
            </Link>
          </li>
        </ul>
      </div>
    </>
  )
}

export default NavBarSpecialistDashBoard