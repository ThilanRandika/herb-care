import "./specialistCard.css";

function SpecialistCard(props) {
  return (
    <div className="specialist">
        <img src="https://www.shutterstock.com/image-vector/vector-medical-icon-doctor-image-600nw-1170228883.jpg" alt="specialistImage" className="specialistImg" />
        <div className="specialistInfo">
            <div className="specialistName">{ props.name }</div>
            <div className="speciality">{ props.speciality }</div>
            <div className="specialistRating">
                { props.ratings }/5
            </div>
            <button>Select Specialist</button>
        </div>
    </div>
  )
}

export default SpecialistCard