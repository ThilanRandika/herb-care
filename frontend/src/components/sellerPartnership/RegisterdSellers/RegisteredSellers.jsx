// RegisteredSellers.jsx

import axios from 'axios';
import React, { useEffect, useState } from 'react';
import './registeredSellers.css'; // Import the CSS file for styling
import { Link } from 'react-router-dom';

function RegisteredSellers() {
    const [sellers, setSellers] = useState([]);

    useEffect(() => {
        axios.get('http://localhost:8070/seller/all')
            .then((res) => {
                setSellers(res.data);
            })
            .catch((err) => {
                console.log('Error getting registered sellers', err);
            });
    }, []);


    const handleReject = (id) => {
        axios.delete(`http://localhost:8070/seller/deleteSeller/${id}`)
            .then((res) => {
                setSellers(prevSellers => prevSellers.filter(seller => seller.sellerId !== id));
            })
            .catch((err) => {
                console.error('Error rejecting seller request', err);
            });
    };


    return (
        <div className="registered-sellers-container">
            <h1>Registered Sellers</h1>
            <table className="registered-sellers-table">
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
                    </tr>
                </thead>
                <tbody>
                    {sellers.map((seller, index) => (
                        <tr key={index}>
                            <td>{index + 1}</td>
                            <td>{seller.seller_name}</td>
                            <td><a href={`mailto:${seller.email}`} target='_blank'>{seller.email}</a></td>
                            <td>{seller.address}</td>
                            <td>{seller.contact_num}</td>
                            <td>{seller.company}</td>
                            <td>{seller.company_discription ? seller.company_discription : "N/A"}</td>
                            <td><a href={seller.website} rel="noreferrer" target='_blank'>Visit Site</a></td>
                            <td>{seller.taxId ? seller.taxId : "N/A"}</td>
                            <td>
                                <Link to={`/SellerManagerDashboard/sellerUpdateForm/${seller.sellerId}`} className="approve-link"> Edit</Link>
                                <button className="reject-btn" onClick={() => handleReject(seller.sellerId)}>Remove</button>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
}

export default RegisteredSellers;
