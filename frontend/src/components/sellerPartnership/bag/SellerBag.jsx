import axios from 'axios';
import React, { useEffect, useState } from 'react';
import './sellerBag.css';
import SellerCheckout from '../sellerCheckout/SellerCheckout';

function SellerBag() {
    const [loading, setLoading] = useState(true);
    const [items, setItems] = useState([]);
    const [selectedItems, setSelectedItems] = useState([]);
    const [editMode, setEditMode] = useState(false);
    const [updatedQuantities, setUpdatedQuantities] = useState({});

    const [showCheckoutModal, setShowCheckoutModal] = useState(false);

    useEffect(() => {
        axios.get('http://localhost:8070/sellerBag/allBag')
            .then((res) => {
                console.log(res.data);
                setItems(res.data);
                setLoading(false);
            })
            .catch((err) => {
                console.log(err);
                setLoading(false);
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

    const toggleSelectAll = () => {
        if (selectedItems.length === items.length) {
            setSelectedItems([]);
        } else {
            setSelectedItems(items.map(item => item.item_id));
        }
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

    const handleToggleEditMode = (itemId) => {
        setEditMode((prevEditMode) => ({
            ...prevEditMode,
            [itemId]: !prevEditMode[itemId],
        }));
    };

    // const handleCheckout = () => {
    //     // Here you can perform checkout operation for selected items
    //     console.log("Selected items for checkout:", selectedItems);
    // };

    const handleCheckout = () => {
        setShowCheckoutModal(true);
        console.log("Selected items for checkout:", selectedItems);
    };

    // Function to close the checkout modal
    const handleCloseModal = () => {
        setShowCheckoutModal(false);
    };


    return (
        <>
        <div className='seller-bag-container'>
        {loading ? ( // Conditionally render loading indicator
        <div style={{ margin: "25px" }}>
          Loding...
        </div>
      ) : (
            <div className="bag-container">
                <div className="bag-container-head">
                <h1 className="bag-heading">Seller Bag</h1>

                <button className="select-all-button" onClick={toggleSelectAll}>
                        {selectedItems.length === items.length ? 'Deselect All' : 'Select All'}
                </button>
                </div>
                <br />

                {items.map((item, index) => (
                    // <div className="searchItem" key={index}>
                    //     <img src="https://th.bing.com/th/id/R.415058df456a4e2fad958b7f05aa06a8?rik=sdiU4nxQeJtCwg&pid=ImgRaw&r=0" alt="" className="siImg" />

                    //     <div className="siDesc">
                    //         <h2 className="siTitle">{item.name}</h2>
                    //         <span className="siCategory">{item.category}</span>
                    //         <span className="siDescription">{item.description}</span>
                    //         <span className="siQuantity">{item.quantity}</span>
                    //         <span className="siDescription">{item.description}</span>
                    //         <span className="siCancelOp"></span>
                    //         <span className="siCancelOpSubtitle"></span>
                    //     </div>

                    //     <div className="siDetails">
                    //         <div className="siDetailTexts">
                    //             <span className="siTotalPrice">${item.totalPrice}</span>
                    //             <span className="siTaxOp">Includes taxes and fees</span>
                    //             {editMode ? (
                    //                 <>
                    //                     <input
                    //                         type="number"
                    //                         value={updatedQuantities[item.item_id] || item.quantity}
                    //                         onChange={(e) => updateQuantity(item.item_id, parseInt(e.target.value))}
                    //                     />
                    //                     <button className="update-button" onClick={() => handleUpdateItem(item.item_id)}>Update</button>
                    //                     <button className="remove-button" onClick={() => removeItem(item.item_id)}>Remove</button>
                    //                 </>
                    //             ) : (
                    //                 <input
                    //                     type="checkbox"
                    //                     className="select-checkbox"
                    //                     checked={selectedItems.includes(item.item_id)}
                    //                     onChange={() => toggleSelect(item.item_id)}
                    //                 />
                    //             )}
                    //         </div>
                    //     </div>
                    // </div>


                    <div className="product-page" key={index}>
                        <div className="product-image">
                            <img src={require(`../../../../../BACKEND/uploads/${item.image}`)} 
                            alt="" 
                            className="siImg" />
                        </div>
                        <div className="product-details">
                            <div className="siDesc">
                                <h2 className="product-name">{item.name}</h2>
                                <span className="product-category">Category: {item.category}</span>
                                <span className="product-quantity">Quantity: {item.quantity}</span>
                                <span className="product-price">Price: Rs.{item.totalPrice}</span>
                                <span className="siTaxOp">Includes taxes and fees</span>
                                <span className="siCancelOp"></span>
                                <span className="siCancelOpSubtitle"></span>
                            </div>

                            <div className="siDetails">
                                <div className="siDetailTexts">
                                    <div>
                                    {editMode[item.item_id] ? (
                                        <>
                                            <h6>Add Quantity Changes</h6>
                                            <input
                                                type="number"
                                                value={updatedQuantities[item.item_id] || item.quantity}
                                                onChange={(e) => updateQuantity(item.item_id, parseInt(e.target.value))}
                                            />
                                            <button className="update-button" onClick={() => handleUpdateItem(item.item_id)}>Update</button>
                                            <button className="edit-button" onClick={() => handleToggleEditMode(item.item_id)}>{editMode[item.item_id] ? 'Done Editing' : 'Edit Bag'}</button>
                                        </>
                                    ) : (
                                        <>
                                            <div style={{ display:'flex' }}>
                                            <input
                                                type="checkbox"
                                                className="seller-bag-checkbox"
                                                checked={selectedItems.includes(item.item_id)}
                                                onChange={() => toggleSelect(item.item_id)}
                                            />
                                            <label className="seller-bag-checkbox-label">Select</label>
                                            </div>
                                            <button className="edit-button" onClick={() => handleToggleEditMode(item.item_id)}>{editMode[item.item_id] ? 'Done Editing' : 'Edit Bag'}</button>
                                        </>
                                    )}
                                    </div>
                                    <button className="remove-button" onClick={() => removeItem(item.item_id)}>Remove</button>
                                </div>
                            </div>
                        </div>
                    </div>
                ))}
                <button className="checkout-button" onClick={handleCheckout}>Checkout</button>
                {showCheckoutModal && (
                    <div className="sellerCh">
                    <div className="sellerCh-content">
                        <span className="close" onClick={handleCloseModal}>&times;</span>
                        <SellerCheckout selectedItems={selectedItems}
                    onClose={handleCloseModal} />
                    </div>
                </div>
                )}
            </div>
            )}:
            </div>
        </>
    );
}

export default SellerBag;
