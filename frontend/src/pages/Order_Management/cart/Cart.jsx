import './cart.css';
import React, { useState, useEffect, useContext } from 'react';
import axios from 'axios';
import { AuthContext } from '../../../context/AuthContext';
import CartCheckout from '../../../components/order/CartCheckout';
import Header from '../../../components/common/header/header';
import Footer from '../../../components/common/footer/footer';
import config from '../../../config';
import { Link } from 'react-router-dom';
import ProductCardsRating from '../../../components/common/productCards1/ProductCardsRating';

function Cart() {
    const { user } = useContext(AuthContext); // get the customer ID from authentication context
    const [loading, setLoading] = useState(true);
    const [items, setItems] = useState([]);
    const [selectedItems, setSelectedItems] = useState([]);
    const [updatedQuantities, setUpdatedQuantities] = useState({});
    const [showCheckoutModal, setShowCheckoutModal] = useState(false);
    const [totalPrice, setTotalPrice] = useState(0);
    const [errorMsg, setErrorMsg] = useState('');

    console.log("User is ", user._id);

    useEffect(() => {
        fetchCartItems();
    }, [user._id]);

    const fetchCartItems = () => {
        axios.get(`${config.BASE_URL}/Cart/user/${user._id}`)
            .then((res) => {
                console.log(res.data);
                if (res.data && Array.isArray(res.data)) {
                    setItems(res.data);
                    const calculatedTotalPrice = res.data.reduce((sum, item) => sum + item.totalPrice, 0);
                    setTotalPrice(calculatedTotalPrice);
                } else {
                    console.error("Unexpected response format: ", res.data);
                    setItems([]);
                    setTotalPrice(0);
                }
                setLoading(false);
            })
            .catch((err) => {
                console.log(err);
                setLoading(false);
            });
    };

    const removeItem = (id) => {
        axios.delete(`${config.BASE_URL}/Cart/remove/${id}`)
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
            axios.put(`${config.BASE_URL}/Cart/update/${itemId}`, { quantity: newQuantity })
                .then((res) => {
                    console.log("cart item updated", res.data);
                    fetchCartItems();
                })
                .catch((err) => {
                    console.log(err);
                });
        }
    };

    const handleCheckout = () => {
        if (selectedItems.length === 0) {
            setErrorMsg('Please select at least one item to checkout.');
        } else {
            setShowCheckoutModal(true);
            console.log("Selected items for checkout:", selectedItems);
            setErrorMsg(''); // Clear any previous error message
        }
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

            {/* <div className='seller-bag-container'>
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
            </div> */}

{loading ? (
                    <div style={{ margin: "25px" }}>
                        Loading...
                    </div>
                ) : (
                    <div className='customer-cart-main-container'>
                        <div class="customer-cart-container">
                            <div class="customer-cart-wrapper customer-cart-wrapper-content animated fadeInRight">
                                <div class="row">
                                    <div class="col-md-9">
                                        <div class="customer-cart-ibox">
                                            <div class="customer-cart-ibox-title">
                                                <span class="pull-right">(<strong>{items.length}</strong>) items</span>
                                                <h5>Items in your cart</h5>
                                                <button className="select-all-button" onClick={toggleSelectAll}>
                                                    {selectedItems.length === items.length ? 'Deselect All' : 'Select All'}
                                                </button>
                                            </div>
                                            {items.length > 0 ? items.map((item, index) => (
                                            <div class="customer-cart-ibox-content" key={index}>
                                                <div class="table-responsive">
                                                    <table class="customer-cart-shoping-cart-table">
                                                        <tbody>
                                                            <tr>
                                                                <td width="90" >
                                                                    <div class="customer-cart-cart-product-imitation">
                                                                        <div className="customer-cart-product-image">
                                                                        {item.image ? (
                                                                            <img
                                                                                src={item.image.startsWith('http') ? item.image : require(`../../../../../BACKEND/uploads/${item.image}`)}
                                                                                className="customer-cart-product-list-image"
                                                                                alt="Product"
                                                                                />
                                                                            ) : (
                                                                                <div className="no-image-available">
                                                                                No Image Available
                                                                                </div>
                                                                            )}
                                                                        </div>
                                                                    </div>
                                                                </td>
                                                                <td class="customer-cart-desc" width="450" style={{ padding: '10px' }}>
                                                                    <div className="customer-cart-product-name">
                                                                        <h3>
                                                                            <Link to={`/Product/${item._id}`}>
                                                                                {item.name}
                                                                            </Link>
                                                                        </h3>
                                                                    </div>
                                                                    <p class="small customer-cart-description">
                                                                        {item.description}
                                                                    </p>
                                                                    <dl class="small m-b-none">
                                                                        <dt>Category</dt>
                                                                        <dd>{item.category}</dd>
                                                                    </dl>
                                                                    {/* <div class="m-t-sm">
                                                                        <a href="#" class="text-muted"><i class="fa fa-gift"></i> Add gift package</a>
                                                                        |
                                                                        <a href="#" class="text-muted"><i class="fa fa-trash"></i> Remove item</a>
                                                                    </div> */}
                                                                </td>
                                                                {/* <td>
                                                                    $180,00
                                                                    <s class="small text-muted">$230,00</s>
                                                                </td> */}
                                                                <td width="150">
                                                                    <h4 className='customer-cart-price'>
                                                                        RS.{item.totalPrice}
                                                                    </h4>
                                                                <div className="customer-cart-siDetails">
                                                                    <div className="customer-cart-siDetailTexts">
                                                                        <div>
                                                                                <>
                                                                                    <input
                                                                                        type="number"
                                                                                        value={updatedQuantities[item.item_id] || item.quantity}
                                                                                        onChange={(e) => updateQuantity(item.item_id, parseInt(e.target.value))}
                                                                                    />
                                                                                    <button className="update-button" onClick={() => handleUpdateItem(item.item_id)}>Update</button>
                                                                                </>
                                                                        </div>
                                                                    </div>
                                                                </div>
                                                                </td>
                                                                <td>
                                                                    <div className='customer-cart-select-container'>
                                                                        <div style={{ display: 'flex' }}>
                                                                            <input
                                                                                type="checkbox"
                                                                                className="seller-bag-checkbox"
                                                                                checked={selectedItems.includes(item.item_id)}
                                                                                onChange={() => toggleSelect(item.item_id)}
                                                                            />
                                                                            <label className="seller-bag-checkbox-label">Select</label>
                                                                        </div>
                                                                        <button className="remove-button" onClick={() => removeItem(item.item_id)}>Remove</button>
                                                                    </div>
                                                                </td>
                                                            </tr>
                                                        </tbody>
                                                    </table>
                                                </div>
                                            </div>
                                            )) : (
                                                <div>No items found in the cart.</div>
                                            )}
                                            <div class="customer-cart-ibox-content">
                                                <button class="btn btn-primary pull-right" onClick={handleCheckout}><i class="fa fa-shopping-cart"></i> Checkout</button>
                                                <Link to="/User_searching" >
                                                    <button class="btn btn-white"><i class="fa fa-arrow-left"></i> Continue shopping</button>
                                                </Link>
                                                {errorMsg && (
                                                    <div className="error-message" style={{ color: 'red', marginTop: '10px' }}>
                                                        {errorMsg}
                                                    </div>
                                                )}
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
                                        </div>
                                    </div>
                                    <div class="col-md-3">
                                        <div class="customer-cart-ibox">
                                            <div class="customer-cart-ibox-title">
                                                <h5>Cart Summary</h5>
                                            </div>
                                            <div class="customer-cart-ibox-content">
                                                <span>
                                                    Total
                                                </span>
                                                <h2 class="font-bold">
                                                    RS. {totalPrice}
                                                </h2>
                                                <hr />
                                                <span class="text-muted small">
                                                    *For United States, France and Germany applicable sales tax will be applied
                                                </span>
                                                <div class="m-t-sm">
                                                    <div class="btn-group">
                                                        <button class="btn btn-primary pull-right" onClick={handleCheckout}><i class="fa fa-shopping-cart"></i> Checkout</button>
                                                    </div>
                                                    {errorMsg && (
                                                        <div className="error-message" style={{ color: 'red', marginTop: '10px' }}>
                                                            {errorMsg}
                                                        </div>
                                                    )}
                                                </div>
                                            </div>
                                        </div>
                                        <div class="customer-cart-ibox">
                                            <div class="customer-cart-ibox-title">
                                                <h5>Support</h5>
                                            </div>
                                            <div class="customer-cart-ibox-content text-center">
                                                <h3><i class="fa fa-phone"></i> +43 100 783 001</h3>
                                                <span class="small">
                                                    Please contact with us if you have any questions. We are available 24h.
                                                </span>
                                            </div>
                                        </div>
                                        <div class="customer-cart-ibox">
                                            <div class="customer-cart-ibox-content">
                                                <h4>Realated</h4>
                                                <p class="font-bold">
                                                    Other products you may be interested
                                                </p>
                                                <hr />
                                                <div className='customer-cart-related-prdcts'>
                                                    <ProductCardsRating/>
                                                </div>
                                                <div className="customer-cart-client-more">
                                                    <Link to="/User_searching">Show all</Link>
                                                </div>
                                                {/* <div>
                                                    <a href="#" class="product-name"> Product 1</a>
                                                    <div class="small m-t-xs">
                                                        Many desktop publishing packages and web page editors now.
                                                    </div>
                                                    <div class="m-t text-right">
                                                        <a href="#" class="btn btn-xs btn-outline btn-primary">Info <i class="fa fa-long-arrow-right"></i> </a>
                                                    </div>
                                                </div>
                                                <hr />
                                                <div>
                                                    <a href="#" class="product-name"> Product 2</a>
                                                    <div class="small m-t-xs">
                                                        Many desktop publishing packages and web page editors now.
                                                    </div>
                                                    <div class="m-t text-right">
                                                        <a href="#" class="btn btn-xs btn-outline btn-primary">Info <i class="fa fa-long-arrow-right"></i> </a>
                                                    </div>
                                                </div> */}
                                                
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                )}




            
            <br /><br />
            <Footer></Footer>
        </>
    );
}

export default Cart;
