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
            <h3>Default Gift Packages</h3>
            <div>
                {defaultGiftPackages.map((giftPackage) => (
                    <div key={giftPackage._id} className="giftPackage-default-all-container">
                        <h4>{giftPackage.packageName}</h4>
                        <p>Description: {giftPackage.description}</p>
                        <p>Products: {giftPackage.products}</p>
                        <p>Total Price: {giftPackage.totalPrice}</p>
                        <img src={`http://localhost:8070/${giftPackage.images[0]}`} alt="Package Image" />
                        <div className="button-container">
                            <Link to=" "><button className="btn">Order Package</button></Link>
                        </div>
                    </div>
                ))}
            </div>
            <br></br> <br></br> <br></br>
            <h2>Customise your own gift Pckage with your favourite products</h2>
            <div className="button-container">
                <Link to=" "><button className="btn">Customise a Gift Package</button></Link>
            </div>
        </div>
    );
}

export default DisplayDefaultGiftPackages;
