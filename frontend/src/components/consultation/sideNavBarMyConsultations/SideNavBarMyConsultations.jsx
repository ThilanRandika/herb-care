import './sideNavBarMyConsultations.css';
import { NavLink } from 'react-router-dom';

function SideNavBarMyConsultations() {
  return (
    <>
      <div>
        <ul className="navBar-myConsultations-nav-list">
          <li>
            <NavLink
              exact
              activeClassName="active"
              className="navBar-myConsultations-nav-item"
              to={"/consultation/myConsultations/myOngoingConsultations"}
            >
              Ongoing Consultations
            </NavLink>
          </li>
          <li>
            <NavLink
              activeClassName="active"
              className="navBar-myConsultations-nav-item"
              to={"/consultation/myConsultations/myCancelledConsultations"}
            >
              Cancelled Consultations
            </NavLink>
          </li>
          <li>
            <NavLink
              activeClassName="active"
              className="navBar-myConsultations-nav-item"
              to={"/consultation/myConsultations/myRejectedConsultations"}
            >
              Rejected Consultations
            </NavLink>
          </li>
          <li>
            <NavLink
              activeClassName="active"
              className="navBar-myConsultations-nav-item"
              to={"/consultation/myConsultations/myAllConsultations"}
            >
              History
            </NavLink>
          </li>
        </ul>
      </div>
    </>
  );
}

export default SideNavBarMyConsultations;
