import { useContext, useEffect, useState } from 'react';
import { AuthContext } from '../../../../context/AuthContext';
import './specialistDashboard.css';
import CalenderSpecialistAvailabilitiesDashBoard from '../../../../components/consultation/specialist/calenderSpecialistAvailabilitiesDashBoard/CalenderSpecialistAvailabilitiesDashBoard';
import SpecialistBarChart from '../../../../components/consultation/specialist/specialistBarChart/SpecialistBarChart';

function SpecialistDashboard(props) {
  const { user } = useContext(AuthContext);
  const [ongoingAppointmentsCount, setOngoingAppointmentsCount] = useState(0);
  const [allAppointmentsCount, setAllAppointmentsCount] = useState(0);
  const [completedAppointmentsCount, setCompletedAppointmentsCount] = useState(0);
  const [todayAppointmentsCount, setTodayAppointmentsCount] = useState(0);

  useEffect(() => {
    fetch(`http://localhost:8070/consultAppointment/getOngoingAppointmentsCount/${user._id}`)
      .then(response => response.json())
      .then(data => setOngoingAppointmentsCount(data.count))
      .catch(error => console.error('Error fetching ongoing appointments count:', error));

    fetch(`http://localhost:8070/consultAppointment/getAllAppointmentsCount/${user._id}`)
      .then(response => response.json())
      .then(data => setAllAppointmentsCount(data.count))
      .catch(error => console.error('Error fetching all appointments count:', error));

    fetch(`http://localhost:8070/consultAppointment/getCompletedAppointmentsCount/${user._id}`)
      .then(response => response.json())
      .then(data => setCompletedAppointmentsCount(data.count))
      .catch(error => console.error('Error fetching completed appointments count:', error));

    fetch(`http://localhost:8070/consultAppointment/getTodaysAppointmentsCount/${user._id}`)
      .then(response => response.json())
      .then(data => setTodayAppointmentsCount(data.count))
      .catch(error => console.error('Error fetching today appointments count:', error));
  }, [user._id]);

  return (
    <div className='specialistDashboard-allContent'>
      <div className="specialistDashboard-greeting">
        <span className='specialistDashboard-greeting-welcomeTxt'>Welcome, </span>
        <span className='specialistDashboard-greeting-specialistName'>{user.specialistName}</span>
      </div>

      <div className="specialistDashboard-countStatsAndCalender">
        <div className="specialistDashboard-countStats">
          <div className="specialistDashboard-countStats-ongoingAppointments">
            <h5>Ongoing Appointments</h5>
            <h3>{ongoingAppointmentsCount}</h3>
          </div>
          <div className="specialistDashboard-countStats-otherCounts">
            <div className="specialistDashboard-countStats-allAppointments">
              <h6>All Appointments</h6>
              <h4>{allAppointmentsCount}</h4>
            </div>
            <div className="specialistDashboard-countStats-completedAppointments">
              <h6>Completed Appointments</h6>
              <h4>{completedAppointmentsCount}</h4>
            </div>
            <div className="specialistDashboard-countStats-todayAppointments">
              <h6>Today's Appointments</h6>
              <h4>{todayAppointmentsCount}</h4>
            </div>
          </div>
        </div>

        <div className="specialistDashboard-calenderContent">
          <CalenderSpecialistAvailabilitiesDashBoard specialistID={user._id}  />
        </div>
      </div>

      <div className="specialistDashboard-barChart">
        <SpecialistBarChart />
      </div>
    </div>
  );
}

export default SpecialistDashboard;
