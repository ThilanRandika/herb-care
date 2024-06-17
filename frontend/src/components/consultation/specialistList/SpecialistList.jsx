import "./specialistList.css";
import SpecialistCard from "../../../components/consultation/specialistCard/SpecialistCard";
import { useEffect, useState } from "react";
import axios from 'axios';
import config from "../../../config";

function SpecialistList(props) {

  const [specialists, setSpecialists] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [filteredSpecialists, setFilteredSpecialists] = useState([]);
  const [loading, setLoading] = useState(true); // State to track loading status

  useEffect(()=>{
    
    axios.get(`${config.BASE_URL}/specialist/all`)
    .then((res) => {
      setSpecialists(res.data);
      setLoading(false); // Set loading to false after data is fetched
    })
    .catch((error) => {
      console.error(error);
      setLoading(false); // Set loading to false in case of error
    });

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


  // Render loading indicator if loading is true
  if (loading) {
    return (
      <div className="specialistList-loading-container">
        <div className="specialistList-loading-spinner"></div>
        <div>Loading...</div>
      </div>
    );
  }

  // If not loading, render the specialist list
  return (
    <div className="specialistList">
      <header className="specialist-list-header">
          <h2>Doctors and Therapists</h2>
        <p>Find your healthcare provider below.</p>
        <div className="specialist-search-bar">
          <input
            type="text"
            placeholder="Search for a specialist"
            value={searchQuery}
            onChange={handleSearchInputChange}
            className="specialist-search-input"
          />
        </div>
      </header>
      <div className="horizontalSpecialistList">
        {filteredSpecialists.map((specialist) => (
          <SpecialistCard
            key={specialist._id}
            specialist={specialist}
            onSelect={handleSelectSpecialist}
            isSelected={props.selectedSpecialist && props.selectedSpecialist._id === specialist._id}
          />
        ))}
      </div>
    </div>
  )
}

export default SpecialistList