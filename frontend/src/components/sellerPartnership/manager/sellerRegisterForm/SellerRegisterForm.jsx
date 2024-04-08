// SellerRegisterForm.jsx

import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { useParams,useNavigate } from 'react-router-dom';
import './sellerRegisterForm.css'; // Import the CSS file for styling

function SellerRegisterForm() {
    const { id } = useParams();

    const [sellerDetails, setSellerDetails] = useState({});
    const [productDetails, setProductDetails] = useState([]);
    const [selectedProducts, setSelectedProducts] = useState([]);

    const navigator = useNavigate();


    useEffect(() => {
        axios.get(`http://localhost:8070/sellerPartnershipRequest/add/${id}`)
            .then((res) => {
                setSellerDetails(res.data);
            })
            .catch((err) => {
                console.log('Error getting seller details', err);
            });

        axios.get('http://localhost:8070/product')
            .then((res) => {
                setProductDetails(res.data);
            })
            .catch((err) => {
                console.log('Error getting product details', err);
            });

    }, [id]);

    const handleProductChange = (productId, fieldName, value) => {
        const existingProductIndex = selectedProducts.findIndex(product => product.product_id === productId);
    
        if (existingProductIndex !== -1) {
            // If product already exists, update its details
            setSelectedProducts(prevProducts => {
                const updatedProducts = [...prevProducts];
                updatedProducts[existingProductIndex] = {
                    ...updatedProducts[existingProductIndex],
                    [fieldName]: value
                };
                return updatedProducts;
            });
        } else {
            // If product doesn't exist, add it to selected products array
            const productToAdd = {
                product_id: productId,
                [fieldName]: value
            };
            setSelectedProducts(prevProducts => [...prevProducts, productToAdd]);
        }
    };
    


    // const handleProductChange = (e) => {
    //     const { name, value } = e.target;
    //     setSelectedProducts({ ...selectedProducts, [name] : value});
    // }

    const addChange = (e) => {
        const { name, value } = e.target;
        setSellerDetails({ ...sellerDetails, [name]: value });
      };


    const onSubmit = (e)=> {
        e.preventDefault();
        const newSeller = {
            seller: {...sellerDetails, requestId: id},
            products: selectedProducts.map(product => ({
                product_id: product.product_id,
                mini_quantity: parseInt(product.mini_quantity),
                base_price: parseFloat(product.base_price),
                price_margine: parseFloat(product.price_margine)
            }))
        };
        console.log(newSeller)
        axios.post('http://localhost:8070/seller/addSeller', newSeller)
        .then((res)=>{
            console.log(res.data)
            alert("Seller Added Successfully");
            navigator('../discussionLevel');
        })
        .catch((err)=>{
            console.log(err)
        })
    }

    return (
        <div className="seller-register-form-container">
            <form>
                {/* Seller details */}
                <div className="form-group">
                    <label>Email address</label>
                    <input
                        type="email"
                        className="form-control"
                        value={sellerDetails.email || ''}
                        readOnly
                    />
                    <small className="form-text text-muted">We'll never share your email with anyone else.</small>
                </div>
                <div className="form-group">
                    <label>Your Name</label>
                    <input
                        type="text"
                        className="form-control"
                        value={sellerDetails.seller_name || ''}
                        readOnly
                    />
                </div>
                <div className="form-group">
                    <label>Company Name</label>
                    <input
                        type="text"
                        className="form-control"
                        value={sellerDetails.company || ''}
                        readOnly
                    />
                </div>
                <div className="form-group">
                    <label>Company Description</label>
                    <textarea
                        className="form-control"
                        rows="4"
                        value={sellerDetails.company_discription || ''}
                        readOnly
                    />
                </div>
                <div className="form-group">
                    <label>Address</label>
                    <input
                        type="text"
                        className="form-control"
                        value={sellerDetails.address || ''}
                        readOnly
                    />
                </div>
                <div className="form-group">
                    <label>Contact Number</label>
                    <input
                        type="phone"
                        className="form-control"
                        value={sellerDetails.contact_num || ''}
                        readOnly
                    />
                </div>
                <div className="form-group">
                    <label>Company Website (Optional)</label>
                    <input
                        type="text"
                        className="form-control"
                        value={sellerDetails.website || ''}
                        readOnly
                    />
                </div>
                <div className="form-group">
                    <label>Tax Id</label>
                    <input
                        type="text"
                        className="form-control"
                        value={sellerDetails.tax_id || ''}
                        readOnly
                    />
                </div>
                <div className="form-group">
                    <label>Price Margine</label>
                    <input
                        type="text"
                        className="form-control"
                        name='price_margine'
                        onChange={addChange}
                    />
                </div>

                {/* Product details */}
                <div className="product-details">
                    <label>Products</label>
                    {productDetails.map((product) => (
                        <div key={product._id} className="product-item">
                            <label className="product-name">{product.name}</label>
                            <input
                                type="text"
                                className="form-control product-price"
                                placeholder="Product Price Margin"
                                onChange={(e) => handleProductChange(product._id, 'price_margine', e.target.value)}
                            />
                            <input
                                type="text"
                                className="form-control product-quantity"
                                placeholder="Product Quantity"
                                onChange={(e) => handleProductChange(product._id, 'mini_quantity', e.target.value)}
                            />
                            <input
                                type="text"
                                className="form-control product-quantity"
                                placeholder="Base Price"
                                onChange={(e) => handleProductChange(product._id, 'base_price', e.target.value)}
                            />
                        </div>
                    ))}
                </div>

                {/* Additional details */}
                <div className="additional-details">
                <label htmlFor="exampleInputEmail1" className="form-label">
                    Agreement
                </label>
                <input
                    type="text"
                    className="form-control"
                    id="exampleInputEmail1"
                    name="seller_agreement"
                    onChange={addChange}
                />
                </div>

                {/* Submit button */}
                <button type="submit" className="btn btn-primary" onClick={onSubmit}>Submit</button>
            </form>
        </div>
    );
}

export default SellerRegisterForm;
