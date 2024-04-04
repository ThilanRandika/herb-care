import "./homeConsultation.css";
import Header from "../../../components/consultation/header/Header";
import SpecialistList from "../../../components/consultation/specialistList/SpecialistList";
import AppointmentAddForm from "../../../components/consultation/appointmentAddForm/AppointmentAddForm";
import { useContext, useState } from "react";
import { AuthContext } from '../../../context/AuthContext';

function HomeConsultation() {

  const [selectedSpecialist, setSelectedSpecialist] = useState(null);
  // const { user } = useContext(AuthContext); // get the customer ID from authentication context

  return (

    <>
      <div className="homeConsultation">
        <Header />
        <SpecialistList setSelectedSpecialist={setSelectedSpecialist} />
        <AppointmentAddForm selectedSpecialist={selectedSpecialist} />
      </div>
    </>
  )
}

export default HomeConsultation