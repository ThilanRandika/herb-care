import "./homeConsultation.css";
import Header from "../../../components/consultation/header/Header";
import SpecialistList from "../../../components/consultation/specialistList/SpecialistList";

function HomeConsultation() {
  return (
    <div className="homeConsultation">
      <Header />
      <SpecialistList />

    </div>
  )
}

export default HomeConsultation