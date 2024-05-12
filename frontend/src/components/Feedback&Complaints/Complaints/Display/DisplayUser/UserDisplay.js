import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { ListGroup, Button } from 'react-bootstrap';
import './UserDisplay.css';

const UserDisplay = () => {
  const [complaints, setComplaints] = useState([]);

  useEffect(() => {
    const fetchComplaints = async () => {
      try {
        const response = await axios.get('http://localhost:8070/complaints/get');
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
      <div className='UD_title_card'>
        <h2 className='UD_title'>My Complaints</h2>
        <p className='UD_title'>Manage your complaints</p>
      </div>
      
      <br />
      <ListGroup className='UD_UL'>
        {complaints.map((complaint) => (
          <ListGroup.Item key={complaint._id} className='UD_containor'>
            <h4 className='UD_complaintsName'>{complaint.complaintsName}</h4>
            <p className='UD_email'><strong>Email:</strong> {complaint.email}</p>
            <p className='UD_descreiption'><strong>Description:</strong> {complaint.description}</p>
            <p className='UD_status'><strong>Status:</strong> {complaint.status}</p>
            <div className='UD_DTContainor'>
              <p className='UD_date' style={{ margin: '10px 0', color: 'gray', fontSize: '0.9rem' }}>
                <strong>Date:</strong> {new Date(complaint.createdAt).toLocaleDateString()} <br />
                <strong>Time:</strong> {new Date(complaint.createdAt).toLocaleTimeString()}
              </p>
              <Button className='CUS_btnDel' variant="danger" size="sm" style={{ marginLeft: '10px' }} onClick={() => handleDelete(complaint._id)}>Delete</Button>
            </div>
          </ListGroup.Item>
        ))}
      </ListGroup>
    </div>
  );
};

export default UserDisplay;
