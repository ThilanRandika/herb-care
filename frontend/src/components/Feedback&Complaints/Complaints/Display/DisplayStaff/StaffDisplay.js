import React, { useEffect, useState } from 'react';
import axios from 'axios';
import './StaffDisplay.css';

const ComplaintsList = () => {
  const [complaints, setComplaints] = useState([]);

  useEffect(() => {
    const getComplaints = async () => {
      try {
        const response = await axios.get("http://localhost:8070/complaints/");
        setComplaints(response.data);
      } catch (error) {
        alert(error.message);
      }
    };

    getComplaints();
  }, []);

  const handleStatusChange = async (complaintId, newStatus) => {
    try {
      await axios.put(`http://localhost:8070/complaints/${complaintId}`, { status: newStatus });
      setComplaints((prevComplaints) =>
        prevComplaints.map((complaint) =>
          complaint._id === complaintId ? { ...complaint, status: newStatus } : complaint
        )
      );
    } catch (error) {
      alert(error.message);
    }
  };

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
      <h2>Complaints List</h2>
      <div className='SD_containor'>
        <ul className='sd_UL'>
          {complaints.map((complaint) => (
            <li key={complaint._id}>
              <p className='SD_complaintsName'><strong>Complaint Name: </strong>{complaint.complaintsName}</p>
              <p className='SD_email'><strong>Email: </strong>{complaint.email}</p>
              <p className='SD_description'><strong>Description: </strong>{complaint.description}</p>
              <p className='SD_status'><strong>Status: </strong>{complaint.status}</p>

              <p className='UD_date'>
                Date: {new Date(complaint.createdAt).toLocaleDateString()} <br/>
                Time: {new Date(complaint.createdAt).toLocaleTimeString()}
            </p>
              <p className='SD_change'>Change status: 
              <select
                value={complaint.status}
                onChange={(e) => handleStatusChange(complaint._id, e.target.value)} className='SD_status'>
                
                <option value="In Progress">In Progress</option>
                <option value="Resolved">Resolved</option>
                <option value="Removed">Removed</option>
                
              </select>

              <button type="button" className="btnDel" onClick={() => handleDelete(complaint._id)}>Delete</button>
              </p>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default ComplaintsList;
