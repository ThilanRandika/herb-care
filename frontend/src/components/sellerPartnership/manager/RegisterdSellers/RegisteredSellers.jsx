// RegisteredSellers.jsx

import axios from 'axios';
import React, { useEffect, useState } from 'react';
import './registeredSellers.css'; // Import the CSS file for styling
import { Link } from 'react-router-dom';
import config from "../../../../config";

function RegisteredSellers() {
    const [sellers, setSellers] = useState([]);

    useEffect(() => {
        axios.get(`${config.BASE_URL}/seller/all`)
            .then((res) => {
                setSellers(res.data);
            })
            .catch((err) => {
                console.log('Error getting registered sellers', err);
            });
    }, []);

    const handleDownloadPDF = () => {
        window.open(`${config.BASE_URL}/seller/all?format=pdf`);
    };

    const handleReject = (id) => {
        axios.delete(`${config.BASE_URL}/seller/deleteSeller/${id}`)
            .then((res) => {
                setSellers(prevSellers => prevSellers.filter(seller => seller.sellerId !== id));
            })
            .catch((err) => {
                console.error('Error rejecting seller request', err);
            });
    };

    return (
        <div className="seller-registered-sellers-container">
            <h1 className="seller-registered-sellers-title">Registered Sellers</h1>
            <button className="seller-registered-download-btn" onClick={handleDownloadPDF}>Download PDF Report</button>
            <table className="seller-registered-sellers-table">
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
                        <th scope="col">Action</th>
                    </tr>
                </thead>
                <tbody>
                    {sellers.map((seller, index) => (
                        <tr key={index}>
                            <td>{index + 1}</td>
                            <td>{seller.seller_name}</td>
                            <td><a href={`mailto:${seller.email}`} className="seller-registered-link" target='_blank'>{seller.email}</a></td>
                            <td>{seller.address}</td>
                            <td>{seller.contact_num}</td>
                            <td>{seller.company}</td>
                            <td><a href={seller.website} className="seller-registered-link" rel="noreferrer" target='_blank'>Visit Site</a></td>
                            <td>{seller.taxId ? seller.taxId : "N/A"}</td>
                            <td>
                                <Link to={`/SellerManagerDashboard/sellerUpdateForm/${seller.sellerId}`} className="seller-registered-link-btn">Edit</Link>
                                <br />
                                <br />
                                <button className="seller-registered-reject-btn" onClick={() => handleReject(seller.sellerId)}>Remove</button>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
}

export default RegisteredSellers;
