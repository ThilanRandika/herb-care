import "./specialistList.css";
import SpecialistCard from "../../../components/consultation/specialistCard/SpecialistCard";
import { useEffect, useState } from "react";
import axios from 'axios';

function SpecialistList(props) {

  const [specialists, setSpecialists] = useState([]);

  useEffect(()=>{
    
    axios.get('http://localhost:8070/specialist/all')
    .then((res) => {
      setSpecialists(res.data);
    })
    .catch((error) => console.error(error));


  }, []);

  const handleSelectSpecialist = (specialist) => {
    props.setSelectedSpecialist(specialist); // Update selected specialist ID state when a specialist is selected
  };

  return (
    <div className="specialistList">
      <header>
        <h2>Doctors and Therapists</h2>
        <p>Find your healthcare provider below.</p>
      </header>
        <div className="horizontalSpecialistList">
          {specialists.map((specialist)=>(
            <SpecialistCard 
              key={specialist._id} 
              specialist={specialist}
              onSelect={handleSelectSpecialist} />
          ))}
        </div>
    </div>
  )
}

export default SpecialistList