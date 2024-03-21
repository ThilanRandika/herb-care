import axios from 'axios';
import React, { useEffect, useState } from 'react'

function PendingSellerRequests() {

    const  [requests, setRequests] = useState([]);
    
    // Fetches the requests

    useEffect(() => {
        axios.get('http://localhost:8070/sellerPartnershipRequest/allSellerReq')
            .then((res) => {
                console.log("Got data: ", res.data);
                setRequests(res.data);
            })
            .catch((err) => {
                console.log('Error getting pending seller requests', err);
            });
    }, []);


    const handleApprove = (id) => {
        // Make an HTTP request to approve the seller request
        axios.put(`http://localhost:8070/sellerPartnershipRequest/reqAprove/${id}`)
            .then((res) => {
                // Handle success, update the UI, or show a message
                console.log("Request approved successfully", res.data);


                axios.get('http://localhost:8070/sellerPartnershipRequest/allSellerReq')
                .then((res) => {
                console.log("Got data: ", res.data);
                setRequests(res.data);
                })
                .catch((err) => {
                    console.log('Error getting pending seller requests', err);
                });
                
            })
            .catch((err) => {
                // Handle error, show error message, etc.
                console.error('Error approving seller request', err);
            });
    };


    const handleReject = (id) => {
        // Make an HTTP request to approve the seller request
        axios.delete(`http://localhost:8070/sellerPartnershipRequest/rejectReq/${id}`)
            .then((res) => {
                // Handle success, update the UI, or show a message
                console.log("Request rejected successfully", res.data);

                
                axios.get('http://localhost:8070/sellerPartnershipRequest/allSellerReq')
                .then((res) => {
                console.log("Got data: ", res.data);
                setRequests(res.data);
                })
                .catch((err) => {
                    console.log('Error getting pending seller requests', err);
                });
                
            })
            .catch((err) => {
                // Handle error, show error message, etc.
                console.error('Error rejecting seller request', err);
            });
    };
    

  return (
    <>
        <div className="container" >
            <h1>Pending Seller Requests</h1>
            
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
                    {requests.map((request, index) => (
                        <tr key={index}>
                            <td>{index + 1}</td>
                            <td>{request.seller_name}</td>
                            <td><a href={`mailto:${request.email}`} target='_blank'>{request.email}</a></td>
                            <td>{request.address}</td>
                            <td>{request.contact_num}</td>
                            <td>{request.company}</td>
                            <td>{request.company_discription ? request.company_discription : "N/A"}</td>
                            <td><a href={request.website} rel="noreferrer" target='_blank' >Visit Site</a></td>
                            <td>{request.website ? request.website : "N/A"}</td>
                            <td>{request.taxId ? request.taxId : "N/A"}</td>
                            <td>
                                <button variant="primary" onClick={() => handleApprove(request._id)}>Approve</button>
                                <button variant="primary" onClick={() => handleReject(request._id)}>Reject</button>
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

export default PendingSellerRequests