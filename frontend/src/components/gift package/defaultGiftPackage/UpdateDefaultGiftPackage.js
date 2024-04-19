import React, { useState, useEffect } from "react";
import axios from "axios";

function UpdateDefaultGiftPackage({ packageToUpdate }) {
    const [packageName, setPackageName] = useState(packageToUpdate.packageName);
    const [description, setDescription] = useState(packageToUpdate.description);
    const [productIds, setProductIds] = useState(packageToUpdate.products.map(product => product._id));
    const [products, setProducts] = useState([]);
    const [images, setImages] = useState([]);

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
        setImages(event.target.files);
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
            await axios.put(`http://localhost:8070/defaultGiftpackage/updateDefault-gift-package/${packageToUpdate._id}`, formData, {
                headers: {
                    "Content-Type": "multipart/form-data",
                },
            });
            alert("Package updated successfully");
        } catch (error) {
            console.error("Error updating package:", error);
            alert("Error updating package");
        }
    };

    return (
        <div className="giftPackage-default-all-container">
            <h3>Update Default Gift Package</h3>
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
                    <select multiple onChange={handleProductChange} value={productIds} required>
                        {products.map((product) => (
                            <option key={product._id} value={product._id}>{product.name}</option>
                        ))}
                    </select>
                </div>
                <div>
                    <label>Upload Images:</label>
                    <input type="file" multiple onChange={handleImageChange} />
                </div>
                <div>
                    <button type="submit">Save</button>
                </div>
            </form>
        </div>
    );
}

export default UpdateDefaultGiftPackage;
