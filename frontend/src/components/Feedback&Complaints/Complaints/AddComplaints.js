import React, { useState } from 'react';
import axios from 'axios';

const ComplaintForm = ({ productId }) => {
    const [order, setOrder] = useState('');
    const [complaintsName, setComplaintsName] = useState('');
    const [email, setEmail] = useState('');
    const [description, setDescription] = useState('');

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const response = await axios.post(`http://localhost:8070/complaints/add/PRO123`, {
                order,
                complaintsName,
                email,
                description
            });
            console.log(response.data);
            alert('Complaints Submitted Successfully');
        } catch (error) {
            console.error(error);
            alert('Failed to submit complaints. Please try again.')
        }
    };

    return (
        <form onSubmit={handleSubmit}>
            <label>Order:</label>
            <input type="text" value={order} onChange={(e) => setOrder(e.target.value)} />

            <br></br>
            <label>Complaints Name:</label>
            <input type="text" value={complaintsName} onChange={(e) => setComplaintsName(e.target.value)} />
            
            <br></br>
            <label>Email:</label>    
            <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} />
            
            <br></br>
            <label>Description:</label>
            <textarea value={description} onChange={(e) => setDescription(e.target.value)} />
            
            <button type="submit">Submit</button>
        </form>
    );
};

export default ComplaintForm;
