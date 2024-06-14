import './cart.css';
import React, { useState, useEffect, useContext } from 'react';
import axios from 'axios';
import { AuthContext } from '../../../context/AuthContext';

function Cart() {
    const { user } = useContext(AuthContext); // get the customer ID from authentication context
    const [loading, setLoading] = useState(true);
    const [items, setItems] = useState([]);
    const [alltotalcount, setalltotalcount] = useState(0);
    const [selectedItems, setSelectedItems] = useState([]);
    const [editMode, setEditMode] = useState(false);
    const [updatedQuantities, setUpdatedQuantities] = useState({});
    const [showCheckoutModal, setShowCheckoutModal] = useState(false);

    console.log("User is ", user._id);

    useEffect(() => {
        axios.post(`http://localhost:8070/Cart/allcart`)
            .then((res) => {
                console.log(res.data);
                if (res.data && Array.isArray(res.data.items)) {
                    setItems(res.data.items);
                } else {
                    console.error("Unexpected response format: ", res.data);
                    setItems([]);
                }
                setLoading(false);
            })
            .catch((err) => {
                console.log(err);
                setLoading(false);
            });
    }, [user._id]);

    const removeItem = (id) => {
        axios.delete(`http://localhost:8070/Cart/remove/${id}`)
            .then((res) => {
                console.log(res.data);
                console.log("Deleted the item");
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
            setSelectedItems(items.map(item => item._id));
        }
    };

    const refreshItems = () => {
        axios.get('http://localhost:8070/Cart/allcart')
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

    const handleCheckout = () => {
        setShowCheckoutModal(true);
        console.log("Selected items for checkout:", selectedItems);
    };

    const handleCloseModal = () => {
        setShowCheckoutModal(false);
    };

    console.log("Items:", items);

    return (
        <>
            <div className='seller-bag-container'>
                {loading ? (
                    <div style={{ margin: "25px" }}>
                        Loading...
                    </div>
                ) : (
                    <div className="bag-container">
                        <div className="bag-container-head">
                            <h1 className="bag-heading">Cart</h1>
                            <button className="select-all-button" onClick={toggleSelectAll}>
                                {selectedItems.length === items.length ? 'Deselect All' : 'Select All'}
                            </button>
                        </div>
                        <br />
                        {items.length > 0 ? items.map((item, index) => (
                            <div className="product-page" key={index}>
                                <div className="product-image">
                                    {item.image ? (
                                        <img src={require(`../../../../../BACKEND/uploads/${item.image}`)} 
                                            alt={item.name} 
                                            className="siImg" />
                                    ) : (
                                        <div className="no-image-placeholder">No Image Available</div>
                                    )}
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
                                                {editMode[item._id] ? (
                                                    <>
                                                        <h6>Add Quantity Changes</h6>
                                                        <input
                                                            type="number"
                                                            value={updatedQuantities[item._id] || item.quantity}
                                                            onChange={(e) => updateQuantity(item._id, parseInt(e.target.value))}
                                                        />
                                                        <button className="edit-button" onClick={() => handleToggleEditMode(item._id)}>{editMode[item._id] ? 'Done Editing' : 'Edit Bag'}</button>
                                                    </>
                                                ) : (
                                                    <>
                                                        <div style={{ display: 'flex' }}>
                                                            <input
                                                                type="checkbox"
                                                                className="seller-bag-checkbox"
                                                                checked={selectedItems.includes(item._id)}
                                                                onChange={() => toggleSelect(item._id)}
                                                            />
                                                            <label className="seller-bag-checkbox-label">Select</label>
                                                        </div>
                                                        <button className="edit-button" onClick={() => handleToggleEditMode(item._id)}>{editMode[item._id] ? 'Done Editing' : 'Edit Bag'}</button>
                                                    </>
                                                )}
                                            </div>
                                            <button className="remove-button" onClick={() => removeItem(item._id)}>Remove</button>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        )) : (
                            <div>No items found in the cart.</div>
                        )}
                        <button className="checkout-button" onClick={handleCheckout}>Checkout</button>
                    </div>
                )}
            </div>
        </>
    );
}

export default Cart;
