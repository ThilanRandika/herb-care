// DiscussionLevelRequests.jsx

import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import './discussionLevelRequests.css'; // Import the CSS file for styling

function DiscussionLevelRequests() {
    const [discussions, setDiscussions] = useState([]);

    useEffect(() => {
        axios.get('http://localhost:8070/sellerPartnershipRequest/allSellerReqDis')
            .then((res) => {
                setDiscussions(res.data);
            })
            .catch((err) => {
                console.log('Error getting pending seller requests', err);
            });
    }, []);

    const handleReject = (id) => {
        axios.delete(`http://localhost:8070/sellerPartnershipRequest/rejectReq/${id}`)
            .then((res) => {
                setDiscussions(prevRequests => prevRequests.filter(request => request._id !== id));
            })
            .catch((err) => {
                console.error('Error rejecting seller request', err);
            });
    };

    return (
        <div className="seller-manager-disPending-discussion-level-requests-container">
            <h1 className="seller-manager-disPending-discussion-level-requests-heading">Discussion Level Partnership Requests</h1>
            <table className="seller-manager-disPending-discussion-level-requests-table">
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
                    {discussions.map((discussion, index) => (
                        <tr key={index}>
                            <td>{index + 1}</td>
                            <td>{discussion.seller_name}</td>
                            <td><a className="seller-manager-disPending-discussion-level-requests-email" href={`mailto:${discussion.email}`} target='_blank'>{discussion.email}</a></td>
                            <td>{discussion.address}</td>
                            <td>{discussion.contact_num}</td>
                            <td>{discussion.company}</td>
                            <td><a className="seller-manager-disPending-discussion-level-requests-website" href={discussion.website} rel="noreferrer" target='_blank'>Visit Site</a></td>
                            <td>{discussion.taxId ? discussion.taxId : "N/A"}</td>
                            <td>
                                <div><Link to={`/manager/SellerManagerDashboard/sellerRegisterForm/${discussion._id}`} className="seller-manager-disPending-approve-link">Approve</Link></div>
                                <br />
                                <div><button className="seller-manager-disPending-reject-btn" onClick={() => handleReject(discussion._id)}>Reject</button></div>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
}

export default DiscussionLevelRequests;
