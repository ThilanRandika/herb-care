import { useState, useEffect, useContext } from 'react';
import './specialistProfile.css';
import axios from 'axios';
import { AuthContext } from '../../../../context/AuthContext';
import config from '../../../../config';

function SpecialistProfile() {
    const { user } = useContext(AuthContext);
    const [specialistData, setSpecialistData] = useState({
        specialistName: '',
        email: '',
        speciality: '',
        rating: 0,
        consultationFee: 0
    });
    const [editing, setEditing] = useState(false);

    useEffect(() => {
        // Fetch specialist data when the component mounts
        fetchSpecialistData();
    }, []);

    const fetchSpecialistData = () => {
        // Fetch specialist data by ID
        axios.get(`${config.BASE_URL}/specialist/${user._id}`)
            .then(response => {
                setSpecialistData(response.data);
            })
            .catch(error => console.error('Error fetching specialist data:', error));
    };

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setSpecialistData({
            ...specialistData,
            [name]: value
        });
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        // Send updated specialist data to backend for updating
        axios.put(`${config.BASE_URL}/specialist/update/${user._id}`, specialistData)
            .then(response => {
                console.log('Specialist data updated successfully:', response.data);
                setEditing(false); // Exit editing mode
            })
            .catch(error => console.error('Error updating specialist data:', error));
    };

    return (
        <div className="specialistProfile-allContents">
            <h1>Specialist Profile</h1>
            <div className="specialistProfile-detailsContainer">
                {editing ? (
                    <form onSubmit={handleSubmit}>
                        <div className="specialistProfile-inputContainer">
                            <label htmlFor="specialistName">Name:</label>
                            <input
                                type="text"
                                id="specialistName"
                                name="specialistName"
                                value={specialistData.specialistName}
                                onChange={handleInputChange}
                                className="specialistProfile-input"
                            />
                        </div>
                        <div className="specialistProfile-inputContainer">
                            <label htmlFor="email">Email:</label>
                            <input
                                type="email"
                                id="email"
                                name="email"
                                value={specialistData.email}
                                onChange={handleInputChange}
                                className="specialistProfile-input"
                            />
                        </div>
                        <div className="specialistProfile-inputContainer">
                            <label htmlFor="speciality">Speciality:</label>
                            <input
                                type="text"
                                id="speciality"
                                name="speciality"
                                value={specialistData.speciality}
                                onChange={handleInputChange}
                                className="specialistProfile-input"
                            />
                        </div>
                        <div className="specialistProfile-inputContainer">
                            <label htmlFor="consultationFee">Consultation Fee:</label>
                            <input
                                type="number"
                                id="consultationFee"
                                name="consultationFee"
                                value={specialistData.consultationFee}
                                onChange={handleInputChange}
                                className="specialistProfile-input"
                            />
                        </div>
                        <button type="submit" className="specialistProfile-saveButton">Save Changes</button>
                    </form>
                ) : (
                    <>
                        <div className="specialistProfile-infoContainer">
                            <span className="specialistProfile-label">Name:</span>
                            <span className="specialistProfile-value">{specialistData.specialistName}</span>
                        </div>
                        <div className="specialistProfile-infoContainer">
                            <span className="specialistProfile-label">Email:</span>
                            <span className="specialistProfile-value">{specialistData.email}</span>
                        </div>
                        <div className="specialistProfile-infoContainer">
                            <span className="specialistProfile-label">Speciality:</span>
                            <span className="specialistProfile-value">{specialistData.speciality}</span>
                        </div>
                        <div className="specialistProfile-infoContainer">
                            <span className="specialistProfile-label">Rating:</span>
                            <span className="specialistProfile-value">{specialistData.rating}</span>
                        </div>
                        <div className="specialistProfile-infoContainer">
                            <span className="specialistProfile-label">Consultation Fee:</span>
                            <span className="specialistProfile-value">{specialistData.consultationFee}</span>
                        </div>
                    </>
                )}
                <button onClick={() => setEditing(!editing)} className="specialistProfile-editButton">{editing ? 'Cancel' : 'Edit Profile'}</button>
            </div>
        </div>
    );
}

export default SpecialistProfile;
