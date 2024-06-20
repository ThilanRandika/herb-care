// SellerRegisterForm.jsx

import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { useParams,useNavigate } from 'react-router-dom';
import './sellerRegisterForm.css'; // Import the CSS file for styling
import config from "../../../../config";

function SellerRegisterForm() {
    const { id } = useParams();

    const [sellerDetails, setSellerDetails] = useState({});
    const [productDetails, setProductDetails] = useState([]);
    const [selectedProducts, setSelectedProducts] = useState([]);
    const [searchTerm, setSearchTerm] = useState('');
    const [sellerAgreement, setSellerAgreement] = useState(null);

    const navigator = useNavigate();

    const handleFileUpload = (e) => {
    setSellerAgreement(e.target.files[0]);
    }

    const handleSearch = (e) => {
        setSearchTerm(e.target.value);
    };

    const filteredProducts = productDetails.filter((product) =>
        product.name.toLowerCase().includes(searchTerm.toLowerCase())
    );



    useEffect(() => {
        axios.get(`${config.BASE_URL}/sellerPartnershipRequest/add/${id}`)
            .then((res) => {
                setSellerDetails(res.data);
            })
            .catch((err) => {
                console.log('Error getting seller details', err);
            });

        axios.get(`${config.BASE_URL}/product`)
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

        console.log("Agreement" ,sellerAgreement);
        const formData = new FormData();
        formData.append("seller", JSON.stringify({...sellerDetails, requestId: id}));
        formData.append("products", JSON.stringify(selectedProducts.map(product => ({
            product_id: product.product_id,
            mini_quantity: parseInt(product.mini_quantity),
            base_price: parseFloat(product.base_price),
            price_margine: parseFloat(product.price_margine)
        }))));
        formData.append("seller_agreement", sellerAgreement);

        console.log(formData)
        axios.post(`${config.BASE_URL}/seller/addSeller`, formData)
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
                <div className="seller-register-form-group">
                    <label>Email address</label>
                    <input
                        type="email"
                        className="seller-register-form-control"
                        value={sellerDetails.email || ''}
                        readOnly
                    />
                    <small className="seller-register-form-text ">We'll never share your email with anyone else.</small>
                </div>
                <div className="seller-register-form-group">
                    <label>Your Name</label>
                    <input
                        type="text"
                        className="seller-register-form-control"
                        value={sellerDetails.seller_name || ''}
                        readOnly
                    />
                </div>
                <div className="seller-register-form-group">
                    <label>Company Name</label>
                    <input
                        type="text"
                        className="seller-register-form-control"
                        value={sellerDetails.company || ''}
                        readOnly
                    />
                </div>
                <div className="seller-register-form-group">
                    <label>Company Description</label>
                    <textarea
                        className="seller-register-form-control"
                        rows="4"
                        value={sellerDetails.company_discription || ''}
                        readOnly
                    />
                </div>
                <div className="seller-register-form-group">
                    <label>Address</label>
                    <input
                        type="text"
                        className="seller-register-form-control"
                        value={sellerDetails.address || ''}
                        readOnly
                    />
                </div>
                <div className="seller-register-form-group">
                    <label>Contact Number</label>
                    <input
                        type="phone"
                        className="seller-register-form-control"
                        value={sellerDetails.contact_num || ''}
                        readOnly
                    />
                </div>
                <div className="seller-register-form-group">
                    <label>Company Website (Optional)</label>
                    <input
                        type="text"
                        className="seller-register-form-control"
                        value={sellerDetails.website || ''}
                        readOnly
                    />
                </div>
                <div className="seller-register-form-group">
                    <label>Tax Id</label>
                    <input
                        type="text"
                        className="seller-register-form-control"
                        value={sellerDetails.tax_id || ''}
                        readOnly
                    />
                </div>

                {/* Product details */}
                <div className="seller-register-product-details">
                <label>Products</label>
                <input
                    type="text"
                    className="seller-register-form-control product-search"
                    placeholder="Search Products"
                    value={searchTerm}
                    onChange={handleSearch}
                />
                <div className="seller-register-scrollable-container">
                <div className="seller-register-product-list">
                    {filteredProducts.map((product) => (
                    <div key={product._id} className="seller-register-product-item">
                        <div className="seller-register-product-info">
                            <img src={require(`../../../../../../BACKEND/uploads/${product.image}`)} alt={product.name} className="seller-register-product-image" />
                            <label className="seller-register-product-name">{product.name}</label>
                        </div>
                        <input
                        type="text"
                        className="seller-register-form-control product-price"
                        placeholder="Product Price Margin"
                        onChange={(e) =>
                            handleProductChange(product._id, 'price_margine', e.target.value)
                        }
                        />
                        <input
                        type="text"
                        className="seller-register-form-control product-quantity"
                        placeholder="Product Quantity"
                        onChange={(e) =>
                            handleProductChange(product._id, 'mini_quantity', e.target.value)
                        }
                        />
                        <input
                        type="text"
                        className="seller-register-form-control product-quantity"
                        placeholder="Base Price"
                        onChange={(e) =>
                            handleProductChange(product._id, 'base_price', e.target.value)
                        }
                        />
                    </div>
                    ))}
                </div>
                </div>
                </div>

                {/* Additional details */}
                <div className="seller-register-additional-details">
                <label htmlFor="seller-agreement-upload" className="seller-register-form-label">
                    Agreement
                </label>
                <input
                type="file"
                className="seller-register-form-control"
                id="seller-agreement-upload"
                name="seller_agreement"
                onChange={handleFileUpload}
                />
                </div>

                {/* Submit button */}
                <button type="submit" className="seller-register-btn" onClick={onSubmit}>Submit</button>
            </form>
        </div>
    );
}

export default SellerRegisterForm;
