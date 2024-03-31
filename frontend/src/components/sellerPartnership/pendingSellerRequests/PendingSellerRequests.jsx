// PendingSellerRequests.jsx

import axios from 'axios';
import React, { useEffect, useState } from 'react';
import './pendingSellerRequests.css'; // Import the CSS file for styling

function PendingSellerRequests() {
    const [requests, setRequests] = useState([]);

    useEffect(() => {
        axios.get('http://localhost:8070/sellerPartnershipRequest/allSellerReq')
            .then((res) => {
                setRequests(res.data);
            })
            .catch((err) => {
                console.log('Error getting pending seller requests', err);
            });
    }, []);

    const handleApprove = (id) => {
        axios.put(`http://localhost:8070/sellerPartnershipRequest/reqAprove/${id}`)
            .then((res) => {
                setRequests(prevRequests => prevRequests.filter(request => request._id !== id));
            })
            .catch((err) => {
                console.error('Error approving seller request', err);
            });
    };

    const handleReject = (id) => {
        axios.delete(`http://localhost:8070/sellerPartnershipRequest/rejectReq/${id}`)
            .then((res) => {
                setRequests(prevRequests => prevRequests.filter(request => request._id !== id));
            })
            .catch((err) => {
                console.error('Error rejecting seller request', err);
            });
    };

    return (
        <div className="pending-seller-requests-container">
            <h1>Pending Seller Requests</h1>
            <table className="pending-seller-requests-table">
                <thead>
                    <tr>
                        <th scope="col">No.</th>
                        <th scope="col">Seller Name</th>
                        <th scope="col">Email</th>
                        <th scope="col">Address</th>
                        <th scope="col">Contact Number</th>
                        <th scope="col">Company Name</th>
                        <th scope="col">Company Description</th>
                        <th scope="col">Company Website</th>
                        <th scope="col">Tax Id</th>
                        <th scope="col">Actions</th>
                    </tr>
                </thead>
                <tbody>
                    {requests.map((request, index) => (
                        <tr key={index}>
                            <td>{index + 1}</td>
                            <td>{request.seller_name}</td>
                            <td><a href={`mailto:${request.email}`} target='_blank'>{request.email}</a></td>
                            <td>{request.address}</td>
                            <td>{request.contact_num}</td>
                            <td>{request.company}</td>
                            <td>{request.company_discription ? request.company_discription : "N/A"}</td>
                            <td><a href={request.website} rel="noreferrer" target='_blank'>Visit Site</a></td>
                            <td>{request.website ? request.website : "N/A"}</td>
                            <td>{request.taxId ? request.taxId : "N/A"}</td>
                            <td>
                                <button className="approve-btn" onClick={() => handleApprove(request._id)}>Approve</button>
                                <button className="reject-btn" onClick={() => handleReject(request._id)}>Reject</button>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
}

export default PendingSellerRequests;
