import React from 'react';
import { NavLink } from 'react-router-dom';
import './navBarSpecialistDashBoard.css';

function NavBarSpecialistDashBoard() {
  return (
    <div>
      <ul className="navBarSpecialistDashboard-specialist-nav-list">
        <li>
          <NavLink
            exact
            activeClassName="active"
            className="navBarSpecialistDashboard-specialist-nav-item"
            to={"/specialistInterface/dashboard"}
          >
            Dashboard
          </NavLink>
        </li>
        <li>
          <NavLink
            activeClassName="active"
            className="navBarSpecialistDashboard-specialist-nav-item"
            to={"/specialistInterface/appointmentRequests"}
          >
            Upcoming Appointment
          </NavLink>
        </li>
        <li>
          <NavLink
            activeClassName="active"
            className="navBarSpecialistDashboard-specialist-nav-item"
            to={"/specialistInterface/appointments"}
          >
            History
          </NavLink>
        </li>
        <li>
          <NavLink
            activeClassName="active"
            className="navBarSpecialistDashboard-specialist-nav-item"
            to={"/specialistInterface/availability"}
          >
            Availability
          </NavLink>
        </li>
        <li>
          <NavLink
            activeClassName="active"
            className="navBarSpecialistDashboard-specialist-nav-item"
            to={"/specialistInterface/profile"}
          >
            Profile
          </NavLink>
        </li>
      </ul>
    </div>
  );
}

export default NavBarSpecialistDashBoard;
