import axios from 'axios';
import React, { useEffect, useState } from 'react';
import './pendingSellerRequests.css'; // Import the CSS file for styling

function PendingSellerRequests() {
    const [requests, setRequests] = useState([]);
    const [openOrder, setOpenOrder] = useState(null);

    useEffect(() => {
        axios.get('http://localhost:8070/sellerPartnershipRequest/allSellerReq')
            .then((res) => {
                setRequests(res.data);
            })
            .catch((err) => {
                console.log('Error getting pending seller requests', err);
            });
    }, []);

    const toggleOrderDetails = (request) => {
        setOpenOrder(openOrder === request ? null : request);
    };

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
                        <React.Fragment key={index}>
                            <tr onClick={() => toggleOrderDetails(request)} >
                                <td>{index + 1}</td>
                                <td>{request.seller_name}</td>
                                <td><a href={`mailto:${request.email}`} target='_blank'>{request.email}</a></td>
                                <td>{request.address}</td>
                                <td>{request.contact_num}</td>
                                <td>{request.company}</td>
                                <td>{request.company_discription ? request.company_discription : "N/A"}</td>
                                <td>{request.website ? request.website : "N/A"}</td>
                                <td>{request.taxId ? request.taxId : "N/A"}</td>
                                <td>
                                    <button className="approve-btn" onClick={() => handleApprove(request._id)}>Approve</button>
                                    <button className="reject-btn" onClick={() => handleReject(request._id)}>Reject</button>
                                </td>
                            </tr>
                            {openOrder === request && (
                                <tr className={`details-row ${openOrder === request ? 'open' : ''}`}>
                                    <td colSpan="10">
                                        <div className="seller-details">
                                            <p><strong>Seller Name:</strong> {request.seller_name}</p>
                                            <p><strong>Email:</strong> <a href={`mailto:${request.email}`} target="_blank" rel="noopener noreferrer">{request.email}</a></p>
                                            <p><strong>Address:</strong> {request.address}</p>
                                            <p><strong>Contact Number:</strong> {request.contact_num}</p>
                                            <p><strong>Company Name:</strong> {request.company}</p>
                                            <p><strong>Company Description:</strong> {request.company_discription ? request.company_discription : "N/A"}</p>
                                            <p><strong>Company Website:</strong> <a href={request.website} target="_blank" rel="noopener noreferrer">{request.website}</a></p>
                                            <p><strong>Tax ID:</strong> {request.taxId ? request.taxId : "N/A"}</p>
                                        </div>
                                    </td>
                                </tr>
                            )}
                        </React.Fragment>
                    ))}
                </tbody>
            </table>
        </div>
    );
}

export default PendingSellerRequests;
