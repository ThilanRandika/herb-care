import axios from 'axios';
import React, { useEffect, useState } from 'react';
import './sellerBag.css';

function SellerBag() {
    const [items, setItems] = useState([]);
    const [selectedItems, setSelectedItems] = useState([]);
    const [editMode, setEditMode] = useState(false);
    const [updatedQuantities, setUpdatedQuantities] = useState({});

    useEffect(() => {
        axios.get('http://localhost:8070/sellerBag/allBag')
            .then((res) => {
                console.log(res.data);
                setItems(res.data);
            })
            .catch((err) => {
                console.log(err);
            });
    }, []);

    const removeItem = (id) => {
        axios.delete(`http://localhost:8070/sellerBag/deleteItem/${id}`)
            .then((res) => {
                console.log(res.data);
                console.log("delete the item");
                refreshItems();
            })
            .catch((err) => {
                console.log(err);
            });
    };

    const toggleSelect = (id) => {
        setSelectedItems((prevSelectedItems) => {
            if (prevSelectedItems.includes(id)) {
                return prevSelectedItems.filter((itemId) => itemId !== id);
            } else {
                return [...prevSelectedItems, id];
            }
        });
    };

    const refreshItems = () => {
        axios.get('http://localhost:8070/sellerBag/allBag')
            .then((res) => {
                console.log(res.data);
                setItems(res.data);
            })
            .catch((err) => {
                console.log(err);
            });
    };

    const updateQuantity = (itemId, newQuantity) => {
        setUpdatedQuantities((prevQuantities) => ({
            ...prevQuantities,
            [itemId]: newQuantity,
        }));
    };

    const handleUpdateItem = (itemId) => {
        const newQuantity = updatedQuantities[itemId];
        if (newQuantity !== undefined) {
            axios.put(`http://localhost:8070/sellerBag/updateQuantity/${itemId}`, { quantity: newQuantity })
                .then((res) => {
                    console.log(res.data);
                    refreshItems();
                })
                .catch((err) => {
                    console.log(err);
                });
        }
    };

    return (
        <>
            <div className="seller-bag-container">
                <h1 className="bag-heading">Seller Bag</h1>

                <button className="edit-button" onClick={() => setEditMode(!editMode)}>{editMode ? 'Done Editing' : 'Edit Bag'}</button>

                {items.map((item, index) => (
                    <div className="searchItem" key={index}>
                        <img src="https://th.bing.com/th/id/R.415058df456a4e2fad958b7f05aa06a8?rik=sdiU4nxQeJtCwg&pid=ImgRaw&r=0" alt="" className="siImg" />

                        <div className="siDesc">
                            <h2 className="siTitle">{item.name}</h2>
                            <span className="siCategory">{item.category}</span>
                            <span className="siDescription">{item.description}</span>
                            <span className="siQuantity">{item.quantity}</span>
                            <span className="siDescription">{item.description}</span>
                            <span className="siCancelOp"></span>
                            <span className="siCancelOpSubtitle"></span>
                        </div>

                        <div className="siDetails">
                            <div className="siDetailTexts">
                                <span className="siTotalPrice">${item.totalPrice}</span>
                                <span className="siTaxOp">Includes taxes and fees</span>
                                {editMode ? (
                                    <>
                                        <input
                                            type="number"
                                            value={updatedQuantities[item.item_id] || item.quantity}
                                            onChange={(e) => updateQuantity(item.item_id, parseInt(e.target.value))}
                                        />
                                        <button className="update-button" onClick={() => handleUpdateItem(item.item_id)}>Update</button>
                                        <button className="remove-button" onClick={() => removeItem(item.item_id)}>Remove</button>
                                    </>
                                ) : (
                                    <input
                                        type="checkbox"
                                        className="select-checkbox"
                                        checked={selectedItems.includes(item.item_id)}
                                        onChange={() => toggleSelect(item.item_id)}
                                    />
                                )}
                            </div>
                        </div>
                    </div>
                ))}
            </div>
        </>
    );
}

export default SellerBag;
