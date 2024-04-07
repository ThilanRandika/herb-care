import "./specialistList.css";
import SpecialistCard from "../../../components/consultation/specialistCard/SpecialistCard";
import { useEffect, useState } from "react";
import axios from 'axios';

function SpecialistList(props) {

  const [specialists, setSpecialists] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [filteredSpecialists, setFilteredSpecialists] = useState([]);

  useEffect(()=>{
    
    axios.get('http://localhost:8070/specialist/all')
    .then((res) => {
      setSpecialists(res.data);
    })
    .catch((error) => console.error(error));

  }, []);



  useEffect(() => {
    // Filter specialists based on the search query
    const filtered = specialists.filter(specialist =>
      specialist.specialistName.toLowerCase().includes(searchQuery.toLowerCase())
    );
    setFilteredSpecialists(filtered);
  }, [searchQuery, specialists]);




  const handleSelectSpecialist = (specialist) => {
    props.setSelectedSpecialist(specialist); // Update selected specialist ID state when a specialist is selected
  };


  const handleSearchInputChange = (e) => {
    setSearchQuery(e.target.value);
  };


  return (
    <div className="specialistList">
      <header>
        <h2>Doctors and Therapists</h2>
        <p>Find your healthcare provider below.</p>
        <input
          type="text"
          placeholder="Search for a specialist"
          value={searchQuery}
          onChange={handleSearchInputChange}
        />
      </header>
      <div className="horizontalSpecialistList">
        {filteredSpecialists.map((specialist) => (
          <SpecialistCard
            key={specialist._id}
            specialist={specialist}
            onSelect={handleSelectSpecialist}
          />
        ))}
      </div>
    </div>
  )
}

export default SpecialistList