import { NavLink } from 'react-router-dom';
import './consultationCusNavBar.css';

function ConsultationCusNavBar() {
    return (
        <div className='consultation-customer-top-navBar'>
            <div className="consultation-customer-top-navBar-list">
                <NavLink
                    className="consultation-customer-top-navBar-nav-link"
                    activeClassName="active"
                    exact
                    to="/consultation/homeConsultation"
                >
                    Home Consultations
                </NavLink>
                <NavLink
                    className="consultation-customer-top-navBar-nav-link"
                    activeClassName="active"
                    to="/consultation/myConsultations/myOngoingConsultations"
                >
                    My Consultations
                </NavLink>
                <NavLink
                    className='consultation-customer-top-navBar-nav-link'
                    activeClassName="active"
                    to="/consultation/refunds/myRefunds"
                >
                    Refunds
                </NavLink>
            </div>
        </div>
    );
}

export default ConsultationCusNavBar;
