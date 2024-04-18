import React, { useState, useEffect } from "react";
import axios from "axios";
import "./AddDefaultGiftPack.css"

function AddDefaultGiftPack() {
    const [packageName, setPackageName] = useState("");
    const [description, setDescription] = useState("");
    const [productIds, setProductIds] = useState([]);
    const [products, setProducts] = useState([]); // State to store available products
    const [images, setImages] = useState([]);

    // Fetch available products from backend when component mounts
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

    
    const handlePackageNameChange = (event) => {
        setPackageName(event.target.value);
    };

    const handleDescriptionChange = (event) => {
        setDescription(event.target.value);
    };

    const handleProductChange = (event) => {
        const selectedProducts = Array.from(event.target.selectedOptions, (option) => option.value);
        setProductIds(selectedProducts);
    };

    const handleImageChange = (event) => {
        // Convert FileList object to an array
        const fileList = event.target.files;
        // Set the images state to the array of files
        setImages(fileList);
    };
    

    const handleSubmit = async (event) => {
        event.preventDefault();
        try {
            const formData = new FormData();
            formData.append("packageName", packageName);
            formData.append("description", description);
            formData.append("productIds", JSON.stringify(productIds));
            images.forEach((image) => {
                formData.append("images", image);
            });
            await axios.post("http://localhost:8070/defaultGiftpackage/addDefault-gift-package", formData, {
                headers: {
                    "Content-Type": "multipart/form-data",
                },
            });
            alert("Package added successfully");
            // Clear form fields after successful submission
            setPackageName("");
            setDescription("");
            setProductIds([]);
            setImages([]);
        } catch (error) {
            console.error("Error adding package:", error);
            alert("Error adding package");
        }
    };

    return (
        <div className="giftPackage-default-all-container">
            <h3>Create Default Gift Package</h3>
            <form onSubmit={handleSubmit}>
                <div>
                    <label>Package Name:</label>
                    <input type="text" value={packageName} onChange={handlePackageNameChange} required />
                </div>
                <div>
                    <label>Description:</label>
                    <textarea value={description} onChange={handleDescriptionChange} required />
                </div>
                <div>
                    <label>Select Products:</label>
                    <select multiple onChange={handleProductChange} required>
                        {products.map((product) => (
                            <option key={product._id} value={product._id}>{product.name}</option>
                        ))}
                    </select>
                </div>
                <div>
                    <label>Upload Images:</label>
                    <input type="file" multiple onChange={handleImageChange} required />
                </div>
                <div>
                    <button type="submit">Add Package</button>
                </div>
            </form>
        </div>
    );
}

export default AddDefaultGiftPack;
