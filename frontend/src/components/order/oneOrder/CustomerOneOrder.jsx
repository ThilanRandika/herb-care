import React, { useContext, useEffect, useState } from "react";
import axios from "axios";
import config from "../../../config";
import "./customeroneOrder.css";
import { useParams } from "react-router-dom";
import { AuthContext } from '../../../context/AuthContext'

function CustomerOneOrder() {
  const { user } = useContext(AuthContext)
  const orderId = useParams();

  const [singleOrder, setSingleOrder] = useState({ orderDetails: [] });
  const [showOrderTracker, setShowOrderTracker] = useState(false);
  const [editable, setEditable] = useState(false); // Track if the data is editable
  const [paymentMethod, setPaymentMethod] = useState("credit");
  const [address, setAddress] = useState("");

  useEffect(() => {
    console.log("useEffect runs with orderId:", orderId);
    axios
      .get(`${config.BASE_URL}/order/getOneOrder/${orderId.id}`)
      .then((res) => {
        console.log(res.data);
        setSingleOrder(res.data);
        setAddress(res.data.address);
        setPaymentMethod(res.data.paymentMethod);

        // Check if the order status is pending and placed within 24 hours
        if (res.data.status === "pending") {
          setEditable(true); // If less than 24 hours and status is pending, set editable to true
          
        }
      })
      .catch((err) => {
        console.log(err);
      });
  }, []); // eslint-disable-line react-hooks/exhaustive-deps

  const handlePaymentMethodChange = (e) => {
    setPaymentMethod(e.target.value);
  };

  const refreshItems = () => {
    axios
      .get(
        `${config.BASE_URL}/sellerOrder/getOneOrder/${orderId}/${user.sellerId}`
      )
      .then((res) => {
        console.log(res.data);
        setSingleOrder(res.data);

        // Check if the order status is pending and placed within 24 hours
        if (res.data.status === "pending") {
          const orderDate = new Date(res.data.date);
          const currentTime = new Date();
          const timeDiff = currentTime - orderDate;
          const hoursElapsed = Math.floor(
            (timeDiff % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)
          );

          if (hoursElapsed < 24) {
            setEditable(true); // If less than 24 hours and status is pending, set editable to true
          }
        }
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const updateOrder = () => {
    // Send updated order details to the backend to update in the database
    const formattedOrderDetails = singleOrder.orderDetails.map((product) => ({
      product: product.productId,
      quantity: product.quantity,
      pricePerItem: parseFloat(product.price), // Parse price to float
    }));

    console.log(formattedOrderDetails);

    const updatedOrder = {
      ...singleOrder,
      payment: paymentMethod,
      address: address,
      orderDetails: formattedOrderDetails,
    };

    console.log(updatedOrder);

    axios
      .put(
        `${config.BASE_URL}/sellerOrder/updateOrder/${orderId}/${user.sellerId}`,
        updatedOrder
      )
      .then((res) => {
        console.log("Order updated successfully:", res.data);
        // If needed, you can add some feedback to indicate that the order has been updated
        refreshItems();
      })
      .catch((err) => {
        console.log("Error updating order:", err);
      });
  };

  const toggleOrderTracker = () => {
    setShowOrderTracker(!showOrderTracker); // Toggles the state between true and false
  };

  //   const updateOrder = () => {
  //     // Send updated order details to the backend to update in the database
  //     const formattedOrderDetails = singleOrder.orderDetails.map((product) => ({
  //       product: product.productId,
  //       quantity: product.quantity,
  //       pricePerItem: parseFloat(product.price), // Parse price to float
  //     }));

  //     console.log(formattedOrderDetails);

  //     const updatedOrder = {
  //       ...singleOrder,
  //       payment: paymentMethod,
  //       address: address,
  //       orderDetails: formattedOrderDetails,
  //     };

  //     console.log(updatedOrder);

  //     axios
  //       .put(
  //         `${config.BASE_URL}/sellerOrder/updateOrder/${orderId}/${user.sellerId}`,
  //         updatedOrder
  //       )
  //       .then((res) => {
  //         console.log("Order updated successfully:", res.data);
  //         // If needed, you can add some feedback to indicate that the order has been updated
  //         refreshItems();
  //       })
  //       .catch((err) => {
  //         console.log("Error updating order:", err);
  //       });
  //   };

  const handleQuantityChange = (index, newQuantity) => {
    // Update quantity in singleOrder state
    const updatedOrderDetails = [...singleOrder.orderDetails];
    updatedOrderDetails[index].quantity = newQuantity;

    // Recalculate total price for the updated product
    updatedOrderDetails[index].totalPrice = (
      newQuantity * updatedOrderDetails[index].price
    ).toFixed(2);

    let totalPrice = 0;
    updatedOrderDetails.forEach((product) => {
      totalPrice = totalPrice + parseInt(product.totalPrice);
    });

    // Update singleOrder state with the updated order details
    setSingleOrder({
      ...singleOrder,
      price: totalPrice.toFixed(2),
      orderDetails: updatedOrderDetails,
    });
  };

  return (
    <>
      <div className="container-fluid d-flex justify-content-center align-items-center cutomer-sin-order">
        <div className="row">
          <div className="col">
            <div className="d-flex justify-content-between align-items-center mb-5">
              <div>
              </div>
              <div className="text-end">
                <p className="mb-0">
                  Order Date <span>{singleOrder.date}</span>
                </p>
                <p className="mb-0">
                  USPS{" "}
                  <span className="font-weight-bold">
                    234094567242423422898
                  </span>
                </p>
              </div>
            </div>
            <div className="seller-checkout-full-container">
              <div className="seller-checkout">
                <div className="seller-checkout-container">
                  <main>
                    <div className="seller-checkout-header py-5 text-center">
                      <img
                        className="checkout-logo d-block mx-auto mb-4"
                        src={require('../../../Images/logo/HerbCare Logo.png')}
                        alt=""
                        width="100"
                        height="100"
                      />
                      <h2 className="checkout-title">ORDER - <span className="text-success font-weight-bold">
                    {singleOrder.id}
                  </span>
                  </h2>
                    </div>

                    <div className="row g-3">
                      <div className="col-md-5 col-lg-4 checkout-shopping-cart">
                        <h4 className="d-flex justify-content-between align-items-center mb-3">
                          <span className="text-muted">Shopping Cart</span>
                          <span className="badge bg-secondary rounded-pill">
                            5
                          </span>
                        </h4>
                        <br />

                        <h6 className="d-flex justify-content-between mb-3">
                          <span className="text-left">Product</span>
                          <span className="text-center">Quantity</span>
                          <span className="text-right">Price</span>
                        </h6>
                        <br />

                        <ul className="list-group mb-3">
                          {/* Add list items dynamically here */}

                          <ul className="cart-item-list list-group mb-3">
                            {singleOrder.orderDetails.map((product, index) => (
                              <li
                                class="list-group-item d-flex justify-content-between lh-sm"
                                key={index}
                              >
                                <div class="item-details seller-singleOrder-item-details">
                                  <h6 class="item-name my-0 seller-singleOrder-item-name">
                                    {product.productName}
                                  </h6>
                                  <small class="item-description text-muted seller-singleOrder-item-description">
                                    Brief description
                                  </small>
                                </div>
                                <span class="item-price text-muted seller-singleOrder-item-price">
                                  {editable ? (
                                    <input
                                      type="number"
                                      value={product.quantity}
                                      onChange={(e) => {
                                        // Handle quantity change only if editable
                                        handleQuantityChange(
                                          index,
                                          parseInt(e.target.value)
                                        );
                                      }}
                                    />
                                  ) : (
                                    product.quantity
                                  )}
                                </span>
                                <span class="item-price text-muted seller-singleOrder-item-price">
                                  {product.totalPrice}
                                </span>
                              </li>
                            ))}
                            <br />
                            <li className="list-group-item d-flex justify-content-between">
                              <span className="total-label">Total (LKR)</span>
                              <strong className="total-amount">
                                Rs.{singleOrder.price}
                              </strong>
                            </li>
                          </ul>
                        </ul>
                      </div>

                      <div className="col-md-7 col-lg-8">
                        <h4 className="mb-3">Customer Details</h4>
                        <form
                          className="needs-validation checkout-form"
                          noValidate
                        >
                          <div className="row g-3">
                            {/* Add form fields for billing address */}

                            <div className="billing-address-form row g-3">
                              <div className="col-12">
                                <label
                                  htmlFor="firstName"
                                  className="billing-label"
                                >
                                  Customer Name :
                                </label>
                                <input
                                  type="text"
                                  className="billing-input form-control"
                                  id="firstName"
                                  placeholder=""
                                  value={user.customer_name}
                                  required
                                />
                                <div className="billing-feedback invalid-feedback">
                                  Please enter a valid first name.
                                </div>
                              </div>

                              <div className="col-12">
                                <label
                                  htmlFor="email"
                                  className="billing-label"
                                >
                                  Email : <span className="text-muted"></span>
                                </label>
                                <input
                                  type="email"
                                  className="billing-input form-control"
                                  id="email"
                                  placeholder="you@example.com"
                                  value={user.email}
                                />
                                <div className="billing-feedback invalid-feedback">
                                  Please enter a valid email address to receive
                                  shipping updates.
                                </div>
                              </div>

                              <div className="col-12">
                                <label
                                  htmlFor="address"
                                  className="billing-label"
                                >
                                  Address :
                                </label>
                                <input
                                  type="text"
                                  className="billing-input form-control"
                                  id="address"
                                  placeholder="1234 First Street"
                                  value={user.address}
                                  required
                                />
                                <div className="billing-feedback invalid-feedback">
                                  Please enter your shipping address.
                                </div>
                              </div>

                              <div className="col-12">
                                <label
                                  htmlFor="address2"
                                  className="billing-label"
                                >
                                  Shipping Address :{" "}
                                  <span className="text-muted">
                                    (If want to change address)
                                  </span>
                                </label>
                                <input
                                  type="text"
                                  className="billing-input form-control"
                                  id="address2"
                                  placeholder="Apartment 24"
                                  value={address}
                                  onChange={(e) => setAddress(e.target.value)}
                                />
                              </div>
                            </div>
                          </div>

                          {singleOrder.status === "pending" &&
                            editable && ( //want to check correctness for this editable******************************************************************
                              <>
                                <hr className="my-4" />

                                <h4 className="mb-3">Payment Method</h4>

                                <div className="my-3">
                                  <div className="form-check">
                                    <input
                                      id="credit"
                                      name="paymentMethod"
                                      type="radio"
                                      className="form-check-input"
                                      value="CreditCard"
                                      onChange={handlePaymentMethodChange}
                                      checked={paymentMethod === "cardPayment"}
                                      required
                                    />
                                    <label
                                      className="form-check-label"
                                      htmlFor="credit"
                                    >
                                      Credit card
                                    </label>
                                  </div>
                                  <div className="form-check">
                                    <input
                                      id="cash"
                                      name="paymentMethod"
                                      type="radio"
                                      className="form-check-input"
                                      value="AccountTransaction"
                                      onChange={handlePaymentMethodChange}
                                      checked={
                                        paymentMethod === "AccountTransaction"
                                      }
                                      required
                                    />
                                    <label
                                      className="form-check-label"
                                      htmlFor="cash"
                                    >
                                      Account Transaction
                                    </label>
                                  </div>
                                  <div className="form-check">
                                    <input
                                      id="paypal"
                                      name="paymentMethod"
                                      type="radio"
                                      className="form-check-input"
                                      value="PayOrder"
                                      onChange={handlePaymentMethodChange}
                                      checked={paymentMethod === "cash"}
                                      required
                                    />
                                    <label
                                      className="form-check-label"
                                      htmlFor="paypal"
                                    >
                                      Pay Order
                                    </label>
                                  </div>
                                </div>
                              </>
                            )}
                        </form>
                      </div>
                    </div>
                  </main>
                </div>
              </div>
            </div>
            {showOrderTracker &&
              (singleOrder.status === "completed" ? (
                <h1>Order has been completed...!</h1>
              ) : (
                <div class="container py-5">
                  <div class="row">
                    <div class="col-md-12 col-lg-12">
                      <div id="seller-tracking-pre"></div>
                      <div id="seller-tracking">
                        <div class="seller-tracking-list">
                          <div
                            class={`${
                              [
                                "pending",
                                "processing",
                                "readyToDelivery",
                                "onDelivery",
                                "completed",
                              ].includes(singleOrder.status)
                                ? "seller-tracking-item"
                                : "seller-tracking-item-pending"
                            }`}
                          >
                            <div class="seller-tracking-icon status-intransit">
                              <svg
                                class="svg-inline--fa fa-circle fa-w-16"
                                aria-hidden="true"
                                data-prefix="fas"
                                data-icon="circle"
                                role="img"
                                xmlns="http://www.w3.org/2000/svg"
                                viewBox="0 0 512 512"
                                data-fa-i2svg=""
                              >
                                <path
                                  fill="currentColor"
                                  d="M256 8C119 8 8 119 8 256s111 248 248 248 248-111 248-248S393 8 256 8z"
                                ></path>
                              </svg>
                            </div>
                            <div class="seller-tracking-date">
                              <img
                                src="https://raw.githubusercontent.com/shajo/portfolio/a02c5579c3ebe185bb1fc085909c582bf5fad802/delivery.svg"
                                class="img-responsive"
                                alt="order-placed"
                              />
                            </div>
                            <div class="seller-tracking-content">
                              Prending Approvel
                              <span>09 Aug 2025, 10:00am</span>
                            </div>
                          </div>
                          <div
                            class={`${
                              [
                                "processing",
                                "readyToDelivery",
                                "onDelivery",
                                "completed",
                              ].includes(singleOrder.status)
                                ? "seller-tracking-item"
                                : "seller-tracking-item-pending"
                            }`}
                          >
                            <div class="seller-tracking-icon status-intransit">
                              <svg
                                class="svg-inline--fa fa-circle fa-w-16"
                                aria-hidden="true"
                                data-prefix="fas"
                                data-icon="circle"
                                role="img"
                                xmlns="http://www.w3.org/2000/svg"
                                viewBox="0 0 512 512"
                                data-fa-i2svg=""
                              >
                                <path
                                  fill="currentColor"
                                  d="M256 8C119 8 8 119 8 256s111 248 248 248 248-111 248-248S393 8 256 8z"
                                ></path>
                              </svg>
                            </div>
                            <div class="seller-tracking-date">
                              <img
                                src="https://raw.githubusercontent.com/shajo/portfolio/a02c5579c3ebe185bb1fc085909c582bf5fad802/delivery.svg"
                                class="img-responsive"
                                alt="order-placed"
                              />
                            </div>
                            <div class="seller-tracking-content">
                              Order Processing
                              <span>09 Aug 2025, 10:00am</span>
                            </div>
                          </div>
                          <div
                            class={`${
                              [
                                "readyToDelivery",
                                "onDelivery",
                                "completed",
                              ].includes(singleOrder.status)
                                ? "seller-tracking-item"
                                : "seller-tracking-item-pending"
                            }`}
                          >
                            <div class="seller-tracking-icon status-intransit">
                              <svg
                                class="svg-inline--fa fa-circle fa-w-16"
                                aria-hidden="true"
                                data-prefix="fas"
                                data-icon="circle"
                                role="img"
                                xmlns="http://www.w3.org/2000/svg"
                                viewBox="0 0 512 512"
                                data-fa-i2svg=""
                              >
                                <path
                                  fill="currentColor"
                                  d="M256 8C119 8 8 119 8 256s111 248 248 248 248-111 248-248S393 8 256 8z"
                                ></path>
                              </svg>
                            </div>
                            <div class="seller-tracking-date">
                              <img
                                src="https://raw.githubusercontent.com/shajo/portfolio/a02c5579c3ebe185bb1fc085909c582bf5fad802/delivery.svg"
                                class="img-responsive"
                                alt="order-placed"
                              />
                            </div>
                            <div class="seller-tracking-content">
                              Order Ready To Delivey
                              <span>09 Aug 2025, 10:00am</span>
                            </div>
                          </div>
                          <div
                            class={`${
                              ["onDelivery", "completed"].includes(
                                singleOrder.status
                              )
                                ? "seller-tracking-item"
                                : "seller-tracking-item-pending"
                            }`}
                          >
                            <div class="seller-tracking-icon status-intransit">
                              <svg
                                class="svg-inline--fa fa-circle fa-w-16"
                                aria-hidden="true"
                                data-prefix="fas"
                                data-icon="circle"
                                role="img"
                                xmlns="http://www.w3.org/2000/svg"
                                viewBox="0 0 512 512"
                                data-fa-i2svg=""
                              >
                                <path
                                  fill="currentColor"
                                  d="M256 8C119 8 8 119 8 256s111 248 248 248 248-111 248-248S393 8 256 8z"
                                ></path>
                              </svg>
                            </div>
                            <div class="seller-tracking-date">
                              <img
                                src="https://raw.githubusercontent.com/shajo/portfolio/a02c5579c3ebe185bb1fc085909c582bf5fad802/delivery.svg"
                                class="img-responsive"
                                alt="order-placed"
                              />
                            </div>
                            <div class="seller-tracking-content">
                              Order On Delivey
                              <span>09 Aug 2025, 10:00am</span>
                            </div>
                          </div>
                          <div
                            class={`${
                              ["completed"].includes(singleOrder.status)
                                ? "seller-tracking-item"
                                : "seller-tracking-item-pending"
                            }`}
                          >
                            <div class="seller-tracking-icon status-intransit">
                              <svg
                                class="svg-inline--fa fa-circle fa-w-16"
                                aria-hidden="true"
                                data-prefix="fas"
                                data-icon="circle"
                                role="img"
                                xmlns="http://www.w3.org/2000/svg"
                                viewBox="0 0 512 512"
                                data-fa-i2svg=""
                              >
                                <path
                                  fill="currentColor"
                                  d="M256 8C119 8 8 119 8 256s111 248 248 248 248-111 248-248S393 8 256 8z"
                                ></path>
                              </svg>
                            </div>
                            <div class="seller-tracking-date">
                              <img
                                src="https://raw.githubusercontent.com/shajo/portfolio/a02c5579c3ebe185bb1fc085909c582bf5fad802/delivery.svg"
                                class="img-responsive"
                                alt="order-placed"
                              />
                            </div>
                            <div class="seller-tracking-content">
                              Order completed<span>09 Aug 2025, 10:00am</span>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            ;
            <button
              onClick={toggleOrderTracker}
              className="seller-order-singleOrder-btn"
            >
              Toggle Order Details
            </button>
            {editable && (
                <button onClick={updateOrder} className="seller-order-singleOrder-btn">
                  Update Order
                </button>
              )}
          </div>
        </div>
      </div>
    </>
  );
}

export default CustomerOneOrder;
