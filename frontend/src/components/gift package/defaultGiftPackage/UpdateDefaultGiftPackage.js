import React, { useState, useEffect } from "react";
import axios from "axios";
import { useParams } from "react-router-dom";
import "./UpdateDefaultGiftPackage.css"
import config from "../../../config";

function UpdateDefaultGiftPackage() {
    const { id } = useParams();
    const [packageData, setPackageData] = useState({
        packageName: "",
        description: "",
        products: "",
        totalPrice: "",
        images: []
    });

    useEffect(() => {
        // Check if id is defined before fetching the package
        if (id) {
            fetchPackage();
        }
    }, [id]); // Re-fetch package whenever id changes

    const fetchPackage = async () => {
        try {
            const response = await axios.get(`${config.BASE_URL}/defaultGiftpackage/default-gift-pack/${id}`);
            setPackageData(response.data);
        } catch (error) {
            console.error("Error fetching default gift package:", error);
            alert("Error fetching default gift package: " + error.message); // Log specific error message
        }
    };
    

    const handleChange = (e) => {
        const { name, value } = e.target;
        setPackageData({
            ...packageData,
            [name]: value
        });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const updatedPackageData = {
                packageName: packageData.packageName,
                description: packageData.description,
                products: packageData.products,
                totalPrice: packageData.totalPrice
            };

            await axios.put(`${config.BASE_URL}/defaultGiftpackage/updateDefault-gift-package/${id}`, updatedPackageData);
            alert("Package updated successfully");
        } catch (error) {
            console.error("Error updating default gift package:", error);
            alert("Error updating default gift package");
        }
    };

    // If id is undefined, display a message
    if (!id) {
        return <div>No package selected</div>;
    }

    return (
        <div>
            <br></br>
            <div className="UDGPS_title_card">
                <h3 className="UDGPS_title"><center>Default Gift Packages</center></h3>
                <p className="UDGPS_title">Manage default gift packages</p>
            </div>

            <div className="giftPackage-default-update">
            <form onSubmit={handleSubmit}>
                <div>
                    <label>Package Name:</label>
                    <input type="text" name="packageName" value={packageData.packageName} onChange={handleChange} required />
                </div>
                <div>
                    <label>Description:</label>
                    <textarea name="description" value={packageData.description} onChange={handleChange} required />
                </div>
                <div>
                    <label>Products:</label>
                    <input type="text" name="products" value={packageData.products} onChange={handleChange} required />
                </div>
                <div>
                    <label>Total Price:</label>
                    <input type="number" name="totalPrice" value={packageData.totalPrice} onChange={handleChange} required />
                </div>
                <br></br>
                <button type="submit" className="btn">Update Package</button>
            </form>
        </div>

        </div>
        
    );
}

export default UpdateDefaultGiftPackage;
