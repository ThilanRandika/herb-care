import "./homeConsultation.css";
import Header from "../../../components/consultation/header/Header";
import SpecialistList from "../../../components/consultation/specialistList/SpecialistList";
import AppointmentAddForm from "../../../components/consultation/appointmentAddForm/AppointmentAddForm";

function HomeConsultation() {
  return (
    <div className="homeConsultation">
      <Header />
      <SpecialistList />
      <AppointmentAddForm />

    </div>
  )
}

export default HomeConsultation