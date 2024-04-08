import "./specialistCard.css";
import { useState } from "react";

function SpecialistCard(props) {

  const { specialist, isSelected, onSelect } = props;

  const handleSelect = () => {
    onSelect(specialist);
  };
  

  return (
    <div className={`specialist-card-one-specialist${isSelected ? ' selected' : ''}`} onClick={handleSelect}>
      <img src="https://www.shutterstock.com/image-vector/vector-medical-icon-doctor-image-600nw-1170228883.jpg" alt="SampleSpecialistImage" className="specialist-card-one-specialist-specialistImg" />
      <div className="specialistInfo">
        <div className="specialist-card-one-specialist-specialistName">{specialist.specialistName}</div>
        <div className="specialist-card-one-specialist-specialty">{specialist.speciality}</div>
        <div className="specialist-card-one-specialist-consultation Fee">Rs.{specialist.consultationFee}</div>
        <div className="specialist-card-one-specialist-specialistRating">{specialist.rating}/5</div>
      </div>
    </div>
  )
}

export default SpecialistCard