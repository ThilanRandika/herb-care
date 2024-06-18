import axios from "axios";
import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import './sellerDetailEdit.css'
import config from "../../../../config";


function SellerDetailEdit() {

    const { id } = useParams();

    const [sellerDetails, setSellerDetails] = useState({});
    const [productDetails, setProductDetails] = useState([]);

    const navigator = useNavigate();


    useEffect(() => {
        axios.get(`${config.BASE_URL}/seller/oneSeller/${id}`)
            .then((res) => {
                setSellerDetails(res.data.seller);
                setProductDetails(res.data.mergedProducts);
                console.log(res.data.mergedProducts)
            })
            .catch((err) => {
                console.log('Error getting seller details', err);
            });

    }, [id]);

    const handleProductChange = (productId, fieldName, value) => {
        setProductDetails(prevProducts => {
            return prevProducts.map(product => {
                if (product.Products._id === productId) {
                    return {
                        ...product,
                        Products: {
                            ...product.Products,
                            [fieldName]: value
                        }
                    };
                }
                return product;
            });
        });
    };
    

    // const handleProductChange = (e) => {
    //     const { name, value } = e.target;
    //     setSelectedProducts({ ...selectedProducts, [name] : value});
    // }

    const addChangeSeller = (e) => {
        const { name, value } = e.target;
        setSellerDetails({ ...sellerDetails, [name]: value });
      };


    const onSubmit = (e)=> {
        e.preventDefault();
        const updatedSeller = {
            seller: sellerDetails,
            Products: productDetails.map(product => product.Products)
        };
        console.log(updatedSeller)
        axios.put(`${config.BASE_URL}/seller/updateSeller/` + id, updatedSeller)
        .then((res)=>{
            console.log(res.data)
            alert("Seller updated Successfully");
            navigator('../registeredSellers');
        })
        .catch((err)=>{
            console.log(err)
        })
    }


  return (
    <>
    <div>SellerDetailEdit</div>

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
                        value={sellerDetails.price_margine}
                        onChange={addChangeSeller}
                    />
                </div>

                {/* Product details */}
                <div className="product-details">
                    <label>Products</label>
                    {productDetails.map((product) => (
                        <div key={product._id} className="product-item">
                            <label className="product-name">{product.productDetail.name}</label>
                            <input
                                type="text"
                                className="form-control product-price"
                                value={product.Products.price_margine || ''}
                                onChange={(e) => handleProductChange(product.Products._id, 'price_margine', e.target.value)}
                            />
                            <input
                                type="text"
                                className="form-control product-quantity"
                                value={product.Products.mini_quantity || ''}
                                onChange={(e) => handleProductChange(product.Products._id, 'mini_quantity', e.target.value)}
                            />
                            <input
                                type="text"
                                className="form-control product-quantity"
                                value={product.Products.base_price || ''}
                                onChange={(e) => handleProductChange(product.Products._id, 'base_price', e.target.value)}
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
                    value={sellerDetails.seller_agreement}
                    onChange={addChangeSeller}
                />
                </div>

                {/* Submit button */}
                <button type="submit" className="btn btn-primary" onClick={onSubmit}>Submit</button>
            </form>
        </div>
    </>
  )
}

export default SellerDetailEdit