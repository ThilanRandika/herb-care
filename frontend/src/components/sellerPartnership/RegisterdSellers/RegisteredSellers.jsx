import axios from 'axios';
import React, { useEffect, useState } from 'react'

function RegisteredSellers() {
  const  [sellers, setSellers] = useState([]);
    
    // Fetches the sellers

    useEffect(() => {
        axios.get('http://localhost:8070/seller/all')
            .then((res) => {
                console.log("Got data: ", res.data);
                setSellers(res.data);
            })
            .catch((err) => {
                console.log('Error getting pending seller sellers', err);
            });
    }, []);

  return (
    <>
        <div className="container">
            <h1>Pending Seller sellers</h1>
            
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
                    {sellers.map((seller, index) => (
                        <tr key={index}>
                            <td>{index + 1}</td>
                            <td>{seller.seller_name}</td>
                            <td><a href={`mailto:${seller.email}`} target='_blank'>{seller.email}</a></td>
                            <td>{seller.address}</td>
                            <td>{seller.contact_num}</td>
                            <td>{seller.company}</td>
                            <td>{seller.company_discription ? seller.company_discription : "N/A"}</td>
                            <td><a href={seller.website} rel="noreferrer" target='_blank' >Visit Site</a></td>
                            <td>{seller.website ? seller.website : "N/A"}</td>
                            <td>{seller.taxId ? seller.taxId : "N/A"}</td>
                            
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    </>
  )
}

export default RegisteredSellers