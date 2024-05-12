import React, { useState } from "react";
import axios from "axios";
import "./AddDefaultGiftPack.css";

function AddDefaultGiftPack() {
    const [packageName, setPackageName] = useState("");
    const [description, setDescription] = useState("");
    const [products, setProducts] = useState("");
    const [totalPrice, setTotalPrice] = useState("");
    const [images, setImages] = useState([]);

    const handlePackageNameChange = (event) => {
        setPackageName(event.target.value);
    };

    const handleDescriptionChange = (event) => {
        setDescription(event.target.value);
    };

    const handleProductsChange = (event) => {
        setProducts(event.target.value);
    };

    const handleTotalPriceChange = (event) => {
        setTotalPrice(event.target.value);
    };

    const handleImageChange = (e) => {
        const fileList = Array.from(e.target.files);
        setImages(fileList);
    };

    const handleSubmit = async (event) => {
        event.preventDefault();
        try {
            const formData = new FormData();
            formData.append("packageName", packageName);
            formData.append("description", description);
            formData.append("products", products);
            formData.append("totalPrice", totalPrice);

            images.forEach((image) => {
                formData.append("images", image);
            });

            await axios.post("http://localhost:8070/defaultGiftpackage/addDefault-gift-package", formData, {
                headers: {
                    "Content-Type": "multipart/form-data",
                },
            });
            alert("Package added successfully");

            setPackageName("");
            setDescription("");
            setProducts("");
            setTotalPrice("");
            setImages([]);
        } catch (error) {
            console.error("Error adding package:", error);
            alert("Error adding package");
        }
    };

    return (

        <div>
            <br></br>
            <div className="ADGPS_title_card">
                <h3 className="ADGPS_title"><center>Default Gift Packages</center></h3>
                <p className="ADGPS_title">Manage default gift packages</p>
            </div>

            <div className="giftPackage-default-add">

                <form onSubmit={handleSubmit}>
                    <div>
                        <label>Package Name:</label>
                        <input type="text" value={packageName} onChange={handlePackageNameChange} required />
                    </div>
                    <br></br>
                    <div>
                        <label>Description:</label>
                        <textarea value={description} onChange={handleDescriptionChange} required />
                    </div>
                    <br></br>
                    <div>
                        <label>Product List:</label>
                        <textarea value={products} onChange={handleProductsChange} required />
                    </div>
                    <br></br>
                    <div>
                        <label>Package Total Price:</label>
                        <input type="text" value={totalPrice} onChange={handleTotalPriceChange} required />
                    </div>
                    <br></br>
                    <div>
                        <label>Upload Images:</label>
                        <br></br>
                        <input type="file" multiple onChange={handleImageChange} accept="image/*" />
                    </div>
                    <br></br>
                    <div>
                        <button type="submit"className="add">Add Package</button>
                    </div>
                </form>
            </div>
        </div>
    );
}

export default AddDefaultGiftPack;