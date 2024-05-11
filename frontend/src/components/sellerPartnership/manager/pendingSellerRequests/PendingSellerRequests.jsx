import axios from 'axios';
import React, { useEffect, useState } from 'react';
import './pendingSellerRequests.css';

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
        <div className="seller-pending-req-container">
            <h1 className="seller-pending-req-heading">Pending Seller Requests</h1>
            <table className="seller-pending-req-table">
                <thead>
                    <tr>
                        <th scope="col">No.</th>
                        <th scope="col">Seller Name</th>
                        <th scope="col">Email</th>
                        <th scope="col">Address</th>
                        <th scope="col">Contact Number</th>
                        <th scope="col">Company Name</th>
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
                                <td><a className="seller-pending-req-email" href={`mailto:${request.email}`} target='_blank'>{request.email}</a></td>
                                <td>{request.address}</td>
                                <td>{request.contact_num}</td>
                                <td>{request.company}</td>
                                <td>{request.website ? request.website : "N/A"}</td>
                                <td>{request.taxId ? request.taxId : "N/A"}</td>
                                <td>
                                    <button className="seller-pending-req-approve-btn" onClick={() => handleApprove(request._id)}>Approve</button>
                                    <button className="seller-pending-req-reject-btn" onClick={() => handleReject(request._id)}>Reject</button>
                                </td>
                            </tr>
                            {openOrder === request && (
                                <tr className={`seller-pending-req-details-row ${openOrder === request ? 'open' : ''}`}>
                                    <td colSpan="10">
                                        <div className="seller-pending-req-details">
                                            <table className="toggle-part-table">
                                                <tbody>
                                                    <tr>
                                                        <td><strong>Seller Name:</strong></td>
                                                        <td>{request.seller_name}</td>
                                                    </tr>
                                                    <tr>
                                                        <td><strong>Email:</strong></td>
                                                        <td><a className="seller-pending-req-email" href={`mailto:${request.email}`} target="_blank" rel="noopener noreferrer">{request.email}</a></td>
                                                    </tr>
                                                    <tr>
                                                        <td><strong>Address:</strong></td>
                                                        <td>{request.address}</td>
                                                    </tr>
                                                    <tr>
                                                        <td><strong>Contact Number:</strong></td>
                                                        <td>{request.contact_num}</td>
                                                    </tr>
                                                    <tr>
                                                        <td><strong>Company Name:</strong></td>
                                                        <td>{request.company}</td>
                                                    </tr>
                                                    <tr>
                                                        <td><strong>Company Description:</strong></td>
                                                        <td>{request.company_discription ? request.company_discription : "N/A"}</td>
                                                    </tr>
                                                    <tr>
                                                        <td><strong>Company Website:</strong></td>
                                                        <td><a className="seller-pending-req-website" href={request.website} target="_blank" rel="noopener noreferrer">{request.website}</a></td>
                                                    </tr>
                                                    <tr>
                                                        <td><strong>Tax ID:</strong></td>
                                                        <td>{request.taxId ? request.taxId : "N/A"}</td>
                                                    </tr>
                                                </tbody>
                                            </table>
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

/* CSS styles... */
