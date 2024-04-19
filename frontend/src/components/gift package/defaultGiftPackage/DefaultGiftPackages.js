import React, { useState, useEffect } from "react";
import axios from "axios";
import { Link } from "react-router-dom";

function DisplayDefaultGiftPackages() {

    const [defaultGiftPackages, setDefaultGiftPackages] = useState([]);
    const [products, setProducts] = useState([]);

    useEffect(() => {
        async function fetchProducts() {
            try {
                const response = await axios.get("http://localhost:8070/defaultGiftpackage/products");
                setProducts(response.data);
            } catch (error) {
                console.error("Error fetching products:", error);
            }
        }
        fetchProducts();
    }, []);


    

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

    const handleUpdate = (id) => {
        // Handle update logic
    };


    const handleDelete = async (id) => {
        try {
            await axios.delete(`http://localhost:8070/defaultGiftpackage/deleteDefault-gift-packages/${id}`);
            alert("Default gift package deleted successfully");
            // Update displayed list after deletion
            setDefaultGiftPackages(defaultGiftPackages.filter((pkg) => pkg._id !== id));
        } catch (error) {
            console.error("Error deleting default gift package:", error);
            alert("Error deleting default gift package");
        }
    };

    return (
        <div>
            <h3>Default Gift Packages</h3>
            <div>
                {defaultGiftPackages.map((giftPackage) => (
                    <div key={giftPackage._id} className="giftPackage-default-all-container">
                        <h4>{giftPackage.packageName}</h4>
                        <p>{giftPackage.description}</p>
                        <h5>Products:</h5>
                        <ul>
                            {giftPackage.products.map((product) => (
                                <li key={product._id}>{product.name}</li>
                            ))}
                        </ul>
                        <div>
                            {giftPackage.images.map((image, index) => (
                                <img key={index} src={`http://localhost:8070/${image}`} alt={`Image ${index}`} />
                            ))}
                        </div>
                        <div>
                            <Link to="/Update_default_gift_packages"><button>Update</button></Link>
                            <button onClick={() => handleDelete(giftPackage._id)}>Delete</button>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
}

export default DisplayDefaultGiftPackages;
