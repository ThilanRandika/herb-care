import axios from 'axios';
import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'

function SellerRegisterForm() {

    const {id} = useParams();
    console.log(id)

    const [ sellerDetails, setSellerDetails] = useState({});
    const [ productDetails, setProductDetails] = useState([]);

    useEffect(() => {
        axios.get('http://localhost:8070/sellerPartnershipRequest/add/' + id)
        .then((res) => {
            console.log("Got data: ", res.data);
            setSellerDetails(res.data);
        })
        .catch((err) => {
            console.log('Error getting pending seller requests', err);
        });

        axios.get('http://localhost:8070/product')
        .then((res) => {
            console.log("Got data: ", res.data);
            setProductDetails(res.data);
        })
        .catch((err) => {
            console.log('Error getting pending Product requests', err);
        });
        
    },[id]);  // Only run once on component mount

  return (

    <div className="container">
        <form >
                <div className="mb-3">
                <label htmlFor="exampleInputEmail1" className="form-label">
                    Email address
                </label>
                <input
                    type="email"
                    className="form-control"
                    id="exampleInputEmail1"
                    aria-describedby="emailHelp"
                    value={sellerDetails.email || ''}
                    name="email"
                    readOnly
                />
                <div id="emailHelp" className="form-text">
                    We'll never share your email with anyone else.
                </div>
                </div>
                <div className="mb-3">
                <label htmlFor="exampleInputPassword1" className="form-label">
                    Your Name
                </label>
                <input
                    type="text"
                    className="form-control"
                    id="exampleInputName1"
                    value={sellerDetails.seller_name || ''}
                    name="seller_name"
                    readOnly
                />
                </div>
                <div className="mb-3">
                <label htmlFor="exampleInputEmail1" className="form-label">
                    Company Name
                </label>
                <input
                    type="text"
                    className="form-control"
                    id="exampleInputName2"
                    value={sellerDetails.company || ''}
                    name="company"
                    readOnly
                />
                </div>
                <div className="mb-3">
                <label htmlFor="exampleInputEmail1" className="form-label">
                    Company Discription
                </label>
                <textarea
                    type="textArea"
                    className="form-control"
                    id="exampleInputDescription1"
                    rows="4"
                    value={sellerDetails.company_discription || ''}
                    name="company_discription"
                    readOnly
                    
                />
                </div>
                <div className="mb-3">
                <label htmlFor="exampleInputEmail1" className="form-label">
                    Address
                </label>
                <input
                    type="text"
                    className="form-control"
                    id="exampleInputAddress1"
                    value={sellerDetails.address || ''}
                    name="address"
                    readOnly
                />
                </div>
                <div className="mb-3">
                <label htmlFor="exampleInputEmail1" className="form-label">
                    Contact Number
                </label>
                <input
                    type="phone"
                    className="form-control"
                    id="exampleInputPhoneNUmber1"
                    value={sellerDetails.contact_num || ''}
                    name="contact_num"
                    readOnly
                    
                />
                </div>
                <div className="mb-3">
                <label htmlFor="exampleInputEmail1" className="form-label">
                    Company Website (Optional)
                </label>
                <input
                    type="text"
                    className="form-control"
                    id="exampleInputEmail1"
                    value={sellerDetails.website || ''}
                    name="website"
                    readOnly
                />
                </div>
                <div className="mb-3">
                <label htmlFor="exampleInputEmail1" className="form-label">
                    Tax Id
                </label>
                <input
                    type="text"
                    className="form-control"
                    id="exampleInputEmail1"
                    value={sellerDetails.tax_id || ''}
                    name="tax_id"
                    readOnly
                />
                </div>
                <div className="mb-3">
                <label htmlFor="exampleInputEmail1" className="form-label">
                    Products
                </label>
                    <select class="form-select" aria-label="Default select example">
                        {productDetails.map((product, index) => (
                            <option key={index}  value={product._Id}>{product.name}</option>
                        ))};
                    </select>
                </div>
                <div className="mb-3">
                <label htmlFor="exampleInputEmail1" className="form-label">
                    Price
                </label>
                <input
                    type="text"
                    className="form-control"
                    id="exampleInputEmail1"
                    value={sellerDetails.tax_id || ''}
                    name="tax_id"
                />
                </div>
                <div className="mb-3">
                <label htmlFor="exampleInputEmail1" className="form-label">
                    Minimum Quantity
                </label>
                <input
                    type="text"
                    className="form-control"
                    id="exampleInputEmail1"
                    value={sellerDetails.tax_id || ''}
                    name="tax_id"
                />
                </div>
                <div className="mb-3">
                <label htmlFor="exampleInputEmail1" className="form-label">
                    Agreement
                </label>
                <input
                    type="text"
                    className="form-control"
                    id="exampleInputEmail1"
                    value={sellerDetails.tax_id || ''}
                    name="tax_id"
                />
                </div>
                <button type="submit" className="btn btn-primary">
                Submit
                </button>
            </form>
        </div>  
  )
}

export default SellerRegisterForm