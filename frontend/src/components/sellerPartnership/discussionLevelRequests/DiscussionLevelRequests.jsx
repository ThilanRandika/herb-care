import axios from 'axios';
import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom';

function DiscussionLevelRequests() {

    const  [discussions, setDiscussions] = useState([]);
    
    // Fetches the requests

    useEffect(() => {
        axios.get('http://localhost:8070/sellerPartnershipRequest/allSellerReqDis')
            .then((res) => {
                console.log("Got data: ", res.data);
                setDiscussions(res.data);
            })
            .catch((err) => {
                console.log('Error getting pending seller requests', err);
            });
    }, []);


  return (
    <>
        <div className="container">
            <h1>Discussion Level Partnership Requests</h1>
            
            <table class="table table-striped" style={{marginTop:"5%"}}>
                <thead> 
                    <tr>
                        <th scope="col">No.</th>
                        <th scope="col">Seller Name</th>
                        <th scope="col">Email</th>
                        <th scope="col">Address</th>
                        <th scope="col">Contact NUmber</th>
                        <th scope="col">Company Name</th>
                        <th scope="col">Company Description</th>
                        <th scope="col"></th>
                        <th scope="col">Company Website</th>
                        <th scope="col">Tax Id</th>
                        <th scope="col"></th>
                    </tr>
                </thead>
                <tbody>
                    {discussions.map((discussion, index) => (
                        <tr key={index}>
                            <td>{index + 1}</td>
                            <td>{discussion.seller_name}</td>
                            <td><a href={`mailto:${discussion.email}`} target='_blank'>{discussion.email}</a></td>
                            <td>{discussion.address}</td>
                            <td>{discussion.contact_num}</td>
                            <td>{discussion.company}</td>
                            <td>{discussion.company_discription ? discussion.company_discription : "N/A"}</td>
                            <td><a href={discussion.website} rel="noreferrer" target='_blank' >Visit Site</a></td>
                            <td>{discussion.website ? discussion.website : "N/A"}</td>
                            <td>{discussion.taxId ? discussion.taxId : "N/A"}</td>
                            <td>
                            <Link to={`/SellerManagerDashboard/sellerRegisterForm/${discussion._id}`}>Approve</Link>
                                <button variant="primary" /*onClick={() => handleApprove(discussion._id)}*/>Reject</button>
                                {/* Show button only if the user is an admin */}
                                {//props.userType === 'admin' && 
                                    }
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    </>
  )
}

export default DiscussionLevelRequests