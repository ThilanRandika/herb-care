import axios from 'axios';
import React, { useEffect, useState } from 'react';
import './singleProduct.css';
import { useParams } from 'react-router-dom';

function SingleProduct() {

    const {Id} = useParams();

    const [product, setProduct] = useState({});
    const [quantity, setQuantity] = useState(1);
    const [activeTab, setActiveTab] = useState('description');

    useEffect(() => {
        axios.get(`http://localhost:8070/sellerProducts/products/` + Id)
        .then((res)=>{
            console.log(res.data)
            setProduct(res.data)
        })
        .catch((err)=>{
            console.log(err)
        })
    } , [Id]); 

    const addToBag = ()=> {
        axios.post('http://localhost:8070/sellerBag/addToBag/' + Id , {
            "quantity":  quantity,
            "price": product.calculatedPrice,
            "totalPrice": (quantity * product.calculatedPrice).toFixed(2)
        })
        .then((res)=>{
            alert("Added to Bag")
            console.log(res.data)
        })
        .catch((err)=> {
            console.log(err)
        })
    }

    const handleQuantityChange = (event) => {
        setQuantity(parseInt(event.target.value)); // Parse quantity value to integer
    }

    const handleTabChange = (tab) => {
        setActiveTab(tab);
    };

    return (

        <>
        <div className="single-product-container">
            <div className="single-product-row">
                <div className="product-image-container">
                    <img src="https://th.bing.com/th/id/R.9f2917860a54b5dea2983cfb083b1bc8?rik=g0TgqaEXJtFolQ&pid=ImgRaw&r=0" alt="{product.name}" className="product-image"/>
                </div>
                <div className="product-details-container">
                    <h2 className="product-name">{product.name}</h2>
                    <p className="product-category">Category: {product.category}</p>
                    <p className="product-min-quantity">Minimum Quantity: {product.mini_quantity}</p>
                    <p className="product-price">Price: ${product.calculatedPrice}</p>
                    <div className="quantity-selection">
                        <label htmlFor="quantity">Quantity:</label>
                        <input type="number" id="quantity" name="quantity" min="1" value={quantity} onChange={handleQuantityChange} />
                    </div>
                    <button className="add-to-bag-button" onClick={addToBag}>Add to Bag</button>
                </div>
            </div>
        </div>
        <br />
        <div className="product-tab-links">
            <button className={activeTab === 'description' ? 'active' : ''} onClick={() => handleTabChange('description')}>Description</button>
            <button className={activeTab === 'ingredients' ? 'active' : ''} onClick={() => handleTabChange('ingredients')}>Ingredients</button>
        </div>
        <div className="product-details">
            {activeTab === 'description' && (
                <p className="product-description">{product.description}</p>
            )}
            {activeTab === 'ingredients' && (
                <p className="product-ingredients">{product.ingredients}</p>
            )}
        </div>


        </>
    );
}

export default SingleProduct;
