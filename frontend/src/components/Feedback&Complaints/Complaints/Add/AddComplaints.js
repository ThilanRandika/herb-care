import React, { useState } from 'react';
import axios from 'axios';
import './AddComplaints.css'

const ComplaintForm = ({ productId }) => {
    const [order, setOrder] = useState('');
    const [complaintsName, setComplaintsName] = useState('');
    const [email, setEmail] = useState('');
    const [description, setDescription] = useState('');

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const response = await axios.post(`http://localhost:8070/complaints/add/PRO2323`, {
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
        <div className='com_containor'>
            <h1 align="center">Drop Complaints</h1>
                <form onSubmit={handleSubmit}>
                    <label for="orderId">Order:</label>
                    <input className="com_input1" type="text" value={order} onChange={(e) => setOrder(e.target.value)} />

                    <br></br>
                    <label for="name">Complaints Name:</label>
                    <input className="com_input2" type="text" value={complaintsName} onChange={(e) => setComplaintsName(e.target.value)} />
            
                    <br></br>
                    <label for="email">Email:</label>    
                    <input className="com_input3" type="email" value={email} onChange={(e) => setEmail(e.target.value)} />
            
                    <br></br>
                    <label for="description">Description:</label>
                    <textarea className="com_textarea" value={description} onChange={(e) => setDescription(e.target.value)} />
            
                    <button className="com_inputbttn" type="submit">Submit</button>
                </form>
        </div>
    );
};

export default ComplaintForm;
