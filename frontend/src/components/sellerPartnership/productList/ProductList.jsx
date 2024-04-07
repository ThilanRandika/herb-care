import axios from 'axios';
import React, { useEffect, useState } from 'react'
import './productList.css'
import { Link } from 'react-router-dom';

function ProductList() {

  const [productList, setProductList] = useState([]);


  //get product details

  useEffect(() =>{
    axios.get('http://localhost:8070/sellerProducts/products')
    .then((res) => {
      console.log( res.data);
      setProductList(res.data);
    })
    .catch((err) => {
      console.log('Error getting pending seller sellers', err);
    })
  },[]);

  return (
    <>

      <h1>ProductList</h1>
      {/* map through the array of products and display them */}
      <div class="row row-cols-1 row-cols-md-3 g-4">
        <>
          {productList.map((product,index) => (
            <div class="col" key={index}>
                <Link to={`/sellerMainHome/product/${product._id}`}>
                  {console.log(product._id)}
              <div class="card">
                <img src="https://cdn.photographylife.com/wp-content/uploads/2014/09/Nikon-D750-Image-Samples-2.jpg" class="card-img-top" alt="..."/>
                <div class="card-body">
                  <h5 class="card-title">{product.name}</h5>
                  <p class="card-text">{product.description}</p>
                  <p class="card-text">{product.ingredients}</p>
                  <p class="card-text">{product.mini_quantity}</p>
                  <p class="card-text">{product.calculatedPrice}</p>
                </div>
              </div>
            </Link>
            </div>
            ))}
        </>
    </div>
    </>
    


  )
}

export default ProductList