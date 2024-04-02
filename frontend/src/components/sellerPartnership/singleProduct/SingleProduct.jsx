
import axios from 'axios';
import React, { useEffect, useState } from 'react'
import './singleProduct.css';
import { useParams } from 'react-router-dom';

function SingleProduct() {

    const {Id} = useParams();
    console.log(Id)

    const [product, setProduct] = useState({});

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
            "quantity":  product.mini_quantity,
            "price": product.calculatedPrice,
            "totalPrice": "500500.00"
        })
        .then((res)=>{
            console.log(res.data)
        })
        .catch((err)=> {
            console.log(err)
        })
    }


  return (
    <>
    <div class="single-product-container">
    <div class="single-product-row">
        <div class="product-image-container">
        <img src="https://th.bing.com/th/id/R.9f2917860a54b5dea2983cfb083b1bc8?rik=g0TgqaEXJtFolQ&pid=ImgRaw&r=0" alt="{product.name}" class="product-image"/>
        </div>
        <div class="product-details-container">
        <h2>{product.name}</h2>
        <p>{product.description}</p>
        <p>Price: ${product.calculatedPrice}</p>
        <p>Category: {product.category}</p>
        <p>Minimum Quantity: {product.mini_quantity}</p>
        <button onClick={addToBag}>Add to Bag</button>
        </div>
    </div>
    </div>


    </>
    
  )
}

export default SingleProduct