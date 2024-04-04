import "./specialistCard.css";
import { useState } from "react";

function SpecialistCard(props) {

  const [isSelected, setIsSelected] = useState(false); // State to track if the specialist is selected

  const handleSelect = () => {
    setIsSelected(!isSelected); // Toggle isSelected state when the specialist is selected/unselected
    if (!isSelected) {
      props.onSelect(props.specialist); // Call onSelect function with the specialist ID when selected
    } else {
      props.onSelect(null); // Clear selected specialist ID when unselected
    }
  };

  

  return (
    <div className={`specialist ${isSelected ? 'selected' : ''}`} onClick={handleSelect}>
        <img src="https://www.shutterstock.com/image-vector/vector-medical-icon-doctor-image-600nw-1170228883.jpg" alt="specialistImage" className="specialistImg" />
        <div className="specialistInfo">
            <div className="specialistName">{ props.specialist.specialistName }</div>
            <div className="speciality">{ props.specialist.speciality }</div>
            <div className="consultation Fee">Rs.{ props.specialist.consultationFee }</div>
            <div className="specialistRating">
                { props.specialist.rating }/5
            </div>
            <div className="selection">
              <button>Select Specialist</button>
            </div>
            
        </div>
    </div>
  )
}

export default SpecialistCard