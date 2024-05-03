import React, { useEffect, useState } from 'react';
import axios from 'axios';
import './UserDisplay.css'

const UserDisplay = () => {
  const [complaints, setComplaints] = useState([]);

  useEffect(() => {
    const fetchComplaints = async () => {
      try {
        const response = await axios.get('http://localhost:8070/complaints/get');
        console.log((response.data));
        setComplaints(response.data);
      } catch (error) {
        console.error(error);
      }
    };

    fetchComplaints();
  }, []);

  const handleDelete = async (id) => {
    try {
      await axios.delete(`http://localhost:8070/complaints/delete/${id}`);
      setComplaints((prevComplaints) => prevComplaints.filter((complaint) => complaint._id !== id));
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div>
      <br></br>
      <h2 className='UD_title'>My Complaints</h2>
      <br></br>
      <ul className='UD_UL'>
        {complaints.map((complaint) => (
        <div className='UD_containor'>
          <li key={complaint._id} >
            <h4 className='UD_complaintsName'>{complaint.complaintsName}</h4>
            <p className='UD_email'>Email : {complaint.email}</p>
            <p className='UD_descreiption'>Description : {complaint.description}</p>
            <p className='UD_status'>Status : {complaint.status}</p>
            <div className='UD_DTContainor'>
            <p className='UD_date'>
                Date: {new Date(complaint.createdAt).toLocaleDateString()} <br/>
                Time: {new Date(complaint.createdAt).toLocaleTimeString()}
            </p>
            <button type="button" className="CUS_btnDel" onClick={() => handleDelete(complaint._id)}>Delete</button>
          </div>
          </li>
          </div>  
        ))}
      </ul>
    </div>
  );
};

export default UserDisplay;