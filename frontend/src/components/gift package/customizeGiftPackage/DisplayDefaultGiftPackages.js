// DisplayDefaultGiftPackages.js

import React, { useState, useEffect } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import "./DisplayDefaultGiftPackages.css";


function DisplayDefaultGiftPackages() {
  const [defaultGiftPackages, setDefaultGiftPackages] = useState([]);

  useEffect(() => {
    async function fetchDefaultGiftPackages() {
      try {
        const response = await axios.get("http://localhost:8070/defaultGiftpackage/default-gift-packages");
        setDefaultGiftPackages(response.data);
      } catch (error) {
        console.error("Error fetching default gift packages:", error);
        alert("Error fetching default gift packages");
      }
    }
    fetchDefaultGiftPackages();
  }, []);

  return (
    <div>

      <h3 className="header"><center>Default Gift Packages</center></h3>
      <h6><center>Order the special Gift packages from us with a best price.</center></h6>
      <p><center>Quick  -  Easy  -  The best</center></p>
      <p><center>From Us</center></p>
      <div>
        {defaultGiftPackages.map((giftPackage) => (
          <div key={giftPackage._id} className="giftPackage-default-container">
            <div className="card-content">
              <img src={require(`../../../../../BACKEND/uploads/${giftPackage.images}`)} alt="Package Image" />
            </div>
            <div className="card-content">
                <h4>{giftPackage.packageName}</h4>
                <p>{giftPackage.description}</p>
                <br></br>
                <p>Including products:</p>
                <p>{giftPackage.products}</p>
                <br></br>
                <p>Total Price: Rs.{giftPackage.totalPrice}</p>
                <div className="button-container">
                  <Link to={{
                    pathname: `/Place-Order/${giftPackage._id}`,
                    state: {
                      packageDetails: giftPackage,
                      customerDetails: null // You can update this with actual customer details
                    }
                  }}><button className="btn">Order Package</button></Link>
                </div>
            </div>
          </div>
        ))}
      </div>


      <br></br> <br></br> <br></br>


      {/* <div className="section2">
        <h2>Customize your own gift Package with your favorite products</h2>
        <p>If you are not staisfied with our default gift packages feel free to add your favourite products and make your own package</p>
        <div className="button-container">
          <Link to=" "><button className="btn">Customize a Gift Package</button></Link>
        </div>
      </div> */}

    </div>
  );
}

export default DisplayDefaultGiftPackages;
