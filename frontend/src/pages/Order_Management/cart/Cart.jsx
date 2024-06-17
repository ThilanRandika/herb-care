import './cart.css';
import React, { useState, useEffect, useContext } from 'react';
import axios from 'axios';
import { AuthContext } from '../../../context/AuthContext';
import SellerCheckout from '../../../components/sellerPartnership/sellerCheckout/SellerCheckout';
import CartCheckout from '../../../components/order/CartCheckout';
import Header from '../../../components/common/header/header';
import Footer from '../../../components/common/footer/footer';

function Cart() {
    const { user } = useContext(AuthContext); // get the customer ID from authentication context
    const [loading, setLoading] = useState(true);
    const [items, setItems] = useState([]);
    const [selectedItems, setSelectedItems] = useState([]);
    const [editMode, setEditMode] = useState({});
    const [updatedQuantities, setUpdatedQuantities] = useState({});
    const [showCheckoutModal, setShowCheckoutModal] = useState(false);

    console.log("User is ", user._id);

    useEffect(() => {
        fetchCartItems();
    }, [user._id]);

    const fetchCartItems = () => {
        axios.get(`https://herb-care-pzwv.onrender.com/Cart/user/${user._id}`)
            .then((res) => {
                console.log(res.data);
                if (res.data && Array.isArray(res.data)) {
                    setItems(res.data);
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
    };

    const removeItem = (id) => {
        axios.delete(`https://herb-care-pzwv.onrender.com/Cart/remove/${id}`)
            .then((res) => {
                console.log(res.data);
                console.log("Deleted the item");
                fetchCartItems();
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

    const updateQuantity = (itemId, newQuantity) => {
        setUpdatedQuantities((prevQuantities) => ({
            ...prevQuantities,
            [itemId]: newQuantity,
        }));
    };

    const handleUpdateItem = (itemId) => {
        const newQuantity = updatedQuantities[itemId];
        if (newQuantity !== undefined) {
            axios.put(`https://herb-care-pzwv.onrender.com/Cart/update/${itemId}`, { quantity: newQuantity })
                .then((res) => {
                    console.log("cart item updated", res.data);
                    fetchCartItems();
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

        <div className="home-customer-header">
          <Header></Header>
        </div>

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
                                                        <div style={{ display: 'flex' }}>
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
                        )) : (
                            <div>No items found in the cart.</div>
                        )}
                        <button className="checkout-button" onClick={handleCheckout}>Checkout</button>
                        {showCheckoutModal && (
                            <div className="sellerCh">
                            <div className="customerCh-content">
                                <span className="close" onClick={handleCloseModal}>&times;</span>
                                <CartCheckout selectedItems={selectedItems} userId={user._id}
                            onClose={handleCloseModal} />
                            </div>
                        </div>
                        )}
                    </div>
                )}
            </div>
            
            <br /><br />
            <Footer></Footer>
        </>
    );
}

export default Cart;
