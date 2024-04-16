import React, { useState } from 'react';
import axios from 'axios';
import './AddComplaints.css'

const ComplaintForm = ({ productId }) => {
    //const [order, setOrder] = useState('');
    const [complaintsName, setComplaintsName] = useState('');
    const [email, setEmail] = useState('');
    const [description, setDescription] = useState('');

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const response = await axios.post(`http://localhost:8070/complaints/add/6616e9a655f4276e55708c82`, {
                //order,
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
                    <label for="name" className="com_name">Complainant Name:</label>
                    <input className="com_input2" type="text" value={complaintsName} onChange={(e) => setComplaintsName(e.target.value)} />
            
                    <br></br>
                    <label for="email" className="com_email">Complainant Email:</label>    
                    <input className="com_input3" type="email" value={email} onChange={(e) => setEmail(e.target.value)} />
            
                    <br></br>
                    <label for="description" className="com_description">Description:</label>
                    <textarea className="com_textarea" value={description} onChange={(e) => setDescription(e.target.value)} />
            
                    <button className="com_inputbttn" type="submit">Submit</button>
                </form>
        </div>
        </div>
    );
};

export default ComplaintForm;
