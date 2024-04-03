import "./homeConsultation.css";
import Header from "../../../components/consultation/header/Header";
import SpecialistList from "../../../components/consultation/specialistList/SpecialistList";
import AppointmentAddForm from "../../../components/consultation/appointmentAddForm/AppointmentAddForm";
import { useState } from "react";

function HomeConsultation(props) {

  const [selectedSpecialist, setSelectedSpecialist] = useState(null);

  return (

    <>
      <div className="homeConsultation">
        <Header />
        <SpecialistList setSelectedSpecialist={setSelectedSpecialist} />
        <AppointmentAddForm selectedSpecialist={selectedSpecialist} customerID={props.customerID} />
      </div>
    </>
  )
}

export default HomeConsultation