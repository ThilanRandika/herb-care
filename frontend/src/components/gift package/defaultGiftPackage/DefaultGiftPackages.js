import React, { useState, useEffect } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import "./DefaultGiftPackages.css";
import config from "../../../config";


function DisplayDefaultGiftPackages() {
    const [defaultGiftPackages, setDefaultGiftPackages] = useState([]);

    useEffect(() => {
        async function fetchDefaultGiftPackages() {
            try {
                const response = await axios.get(`${config.BASE_URL}/defaultGiftpackage/default-gift-packages`);
                setDefaultGiftPackages(response.data);
            } catch (error) {
                console.error("Error fetching default gift packages:", error);
                alert("Error fetching default gift packages");
            }
        }
        fetchDefaultGiftPackages();
    }, []);

    const handleDelete = async (id) => {
        try {
            await axios.delete(`${config.BASE_URL}/defaultGiftpackage/deleteDefault-gift-packages/${id}`);
            alert("Default gift package deleted successfully");
            // Update displayed list after deletion
            setDefaultGiftPackages(defaultGiftPackages.filter((pkg) => pkg._id !== id));
        } catch (error) {
            console.error("Error deleting default gift package:", error);
            alert("Error deleting default gift package");
        }
    };

    const handleDownloadReport = () => {
        // Format data into CSV
        const csvContent = "data:text/csv;charset=utf-8," + defaultGiftPackages.map(giftPackage => Object.values(giftPackage).join(",")).join("\n");
        // Create a link element and trigger download
        const encodedUri = encodeURI(csvContent);
        const link = document.createElement("a");
        link.setAttribute("href", encodedUri);
        link.setAttribute("download", "default_gift_packages_report.csv");
        document.body.appendChild(link);
        link.click();
    };

    return (
        <div>
            <br></br>
            <div className="DGPS_title_card">
                <h3 className="DGPS_title"><center>Default Gift Packages</center></h3>
                <p className="DGPS_title">Manage default gift packages</p>
            </div>
            
            <div>
                {defaultGiftPackages.map((giftPackage) => (
                    <div key={giftPackage._id} className="giftPackage-default-all-container">
                        <div className="details">
                            <img src={require(`../../../../../BACKEND/uploads/${giftPackage.images}`)} alt="Package Image" />
                        </div>
                        <div className="details">
                            <h4>{giftPackage.packageName}</h4>
                            <p>Description: {giftPackage.description}</p>
                            <p>Products: {giftPackage.products}</p>
                            <p>Total Price: Rs.{giftPackage.totalPrice}</p>
                            <div className="button-container">
                                <Link to={`/Update_default_gift_packages/${giftPackage._id}`}><button className="btn">Update</button></Link>
                                <button onClick={() => handleDelete(giftPackage._id)} className="btn">Delete</button>
                            </div>
                        </div>
                    </div>
                ))}
            </div>
            <div className="button-container-report">
                <button onClick={handleDownloadReport} className="btn">Download Report</button>
            </div>
            
        </div>
    );
}

export default DisplayDefaultGiftPackages;
