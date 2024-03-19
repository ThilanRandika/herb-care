import "./specialistList.css";
import SpecialistCard from "../../../components/consultation/specialistCard/SpecialistCard";
import { useEffect, useState } from "react";

function SpecialistList() {

  const [specialists, setSpecialists] = useState([]);

  useEffect(()=>{
    const fetchData = async () => {
      try {
        const response = await fetch('http://localhost:8070/specialist/all');
        const data = await response.json();
        setSpecialists(data);
      } catch (error) {
        console.error('Error in etching data', error);
      }
    };

    fetchData();


  }, []);



  return (
    <div className="specialistList">
      <header>
        <h2>Doctors and Therapists</h2>
        <p>Find your healthcare provider below.</p>
      </header>
        <div className="horizontalSpecialistList">
          {specialists.map((specialist)=>(
            <SpecialistCard name={specialist.specialistName} speciality={specialist.speciality} ratings={specialist.rating}/>
          ))}
        </div>
    </div>
  )
}

export default SpecialistList