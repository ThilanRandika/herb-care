import React, { useState } from 'react';
import axios from 'axios';
import './AddComplaints.css'
import { useLocation } from 'react-router-dom';
import config from "../../../../config";

const ComplaintForm = () => {
    const [complaintsName, setComplaintsName] = useState('');
    const [email, setEmail] = useState('');
    const [description, setDescription] = useState('');
    const location = useLocation();
    const orderId = new URLSearchParams(location.search).get('orderId');
    const productId = new URLSearchParams(location.search).get('productId');

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const response = await axios.post(`${config.BASE_URL}/complaints/add/${productId}`, {
                orderId,
                complaintsName,
                email,
                description
            });
            console.log(response.data);
            alert('Complaints Submitted Successfully');
    
            // Clear form fields
            setComplaintsName('');
            setEmail('');
            setDescription('');
        } catch (error) {
            console.error(error);
            alert('Failed to submit complaints. Please try again.')
        }
    };
    

    return (
        <div className="page_center">
        <div className='com_containor'>
            <h1 align="center">Customer Complaints</h1>
                <form onSubmit={handleSubmit}>

                    <br></br>
                    <label for="name" className="ccom_name">Complainant Name:</label>
                    <input className="ccom_input2" type="text" value={complaintsName} onChange={(e) => setComplaintsName(e.target.value)} />
            
                    <br></br>
                    <label for="email" className="ccom_email">Complainant Email:</label>    
                    <input className="ccom_input3" type="email" value={email} onChange={(e) => setEmail(e.target.value)} />
            
                    <br></br>
                    <label for="description" className="ccom_description">Description:</label>
                    <textarea className="ccom_textarea" value={description} onChange={(e) => setDescription(e.target.value)} />
            
                    <button className="ccom_input" type="submit">Submit</button>
                </form>
        </div>
        </div>
    );
};

export default ComplaintForm;
