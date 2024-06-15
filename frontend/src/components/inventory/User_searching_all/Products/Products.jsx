import "./Products.css";
import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';

function Products({ searchQuery, priceRange, category }) {
  const [products, setProducts] = useState([]);

  useEffect(() => {
    function getProducts() {
      axios.get("http://localhost:8070/Product/")
        .then((res) => {
          setProducts(res.data);
        })
        .catch((err) => {
          alert(err.message);
        });
    }

    getProducts();
  }, []);

  const filterByPriceRange = (price, range) => {
    switch (range) {
      case "0-1000":
        return price >= 0 && price <= 1000;
      case "1000-2000":
        return price > 1000 && price <= 2000;
      case "2000-3000":
        return price > 2000 && price <= 3000;
      case "3000-4000":
        return price > 3000 && price <= 4000;
      case "4000-5000":
        return price > 4000 && price <= 5000;
      case "above-5000":
        return price > 5000;
      default:
        return true;
    }
  };

  const filterByCategory = (productCategory, selectedCategory) => {
    return selectedCategory === "" || productCategory === selectedCategory;
  };

  const filteredProducts = products.filter(product =>
    product.name.toLowerCase().includes(searchQuery.toLowerCase()) &&
    filterByPriceRange(product.price, priceRange) &&
    filterByCategory(product.category, category) // Apply category filter
  );

  return (
    <div className="User-searching-card-container">
      
      {filteredProducts.map((product, index) => (


        // <Link to={`/Product/${product._id}`} key={index}>
        //   <section className="User-searching-card">
        //     <div className="productCard-img-inventory">
        //       <img src={require(`../../../../../../BACKEND/uploads/${product.image}`)} className="card-img" alt={product.name} height={120} width={120}/>
        //     </div>

        //     <div className="User-searching-card-details">
        //       <h3 className="User-searching-card-title1">{product.name}</h3>
              
        //       <section className="User-searching-card-price">
        //         <div className="User-searching-price">
        //           Rs. {product.price}
        //         </div>
        //       </section>
        //       <button className="User-searching-add-to-cart-button1">Add to Cart</button>
        //     </div>
        //   </section>

        
          <div class="customer-product-list-card" key={index}>
                <div class="customer-product-list-image">
                  <img
                    src={require(`../../../../../../BACKEND/uploads/${product.image}`)}
                    className="customer-product-list-image"
                    alt="Product"
                  />
                </div>
                <div class="customer-product-list-details">
                  <div class="customer-product-list-info1">
                    <div class="customer-product-list-info2">
                      <div class="customer-product-list-name">{product.name}</div>
                      <div class="customer-product-list-description">{product.category}</div>
                    </div>
                    <div class="customer-product-list-price">
                      Rs.{product.Manufactured_price}
                    </div>
                  </div>
                  {/* <div class="customer-product-list-description">DESCRIPTION</div>
              <div class="customer-product-list-description">
                {product.description}
              </div> */}
                  <div className="customer-product-list-add-to-cart-button-container">
                    <div>
                      <Link to={`/Product/${product._id}`}>
                        <button class="customer-product-list-add-to-cart-button">
                          View Product
                        </button>
                      </Link>
                    </div>
                    <div className="customer-product-list-add-to-cart-cart-button">
                      <img width="30" height="30" src="https://img.icons8.com/sf-regular-filled/48/1A1A1A/shopping-cart.png" alt="shopping-cart--v1"/>
                    </div>
                  </div>
                </div>
              </div>



       // </Link>

        
      ))}
    </div>
  );
}

export default Products;
