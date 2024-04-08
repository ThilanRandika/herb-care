import React, { useEffect, useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faClipboardList,
  faBoxOpen,
  faShippingFast,
  faHome,
} from "@fortawesome/free-solid-svg-icons";
import "./sellerSingleOrder.css";
import { useParams } from "react-router-dom";
import axios from "axios";

function SellerSingleOrder() {
  const { orderId } = useParams();
  console.log(orderId);

  const [singleOrder, setSingleOrder] = useState({ orderDetails: [] });
  const [showReturnForm, setShowReturnForm] = useState(false);

  useEffect(() => {
    console.log("useEffect runs with orderId:", orderId);
    axios
      .get("http://localhost:8070/sellerOrder/getOneOrder/" + orderId)
      .then((res) => {
        console.log(res.data);
        setSingleOrder(res.data);
      })
      .catch((err) => {
        console.log(err);
      });
  }, []); // eslint-disable-line react-hooks/exhaustive-deps

  const toggleReturnForm = () => {
    setShowReturnForm(!showReturnForm); // Toggles the state between true and false
  };

  return (
    <>
      {console.log(singleOrder)}
      <div className=" container row d-flex justify-content-center align-items-center  py-5 h-100 vw-100 mb-5">
        <div className="d-flex justify-content-between align-items-center mb-5">
          <div>
            <h5 className="mb-0">
              ORDER{" "}
              <span className="text-primary font-weight-bold">
                #{singleOrder.id}
              </span>
            </h5>
          </div>
          <div className="text-end">
            <p className="mb-0">
              Order Date <span>{singleOrder.date}</span>
            </p>
            <p className="mb-0">
              USPS{" "}
              <span className="font-weight-bold">234094567242423422898</span>
            </p>
          </div>
        </div>
        <div>
          <div className="row g-3">
            <div className="col-md-5 col-lg-4 seller-checkout-shopping-cart">
              <h4 className="d-flex justify-content-between align-items-center mb-3">
                <span className="text-muted">Ordered Products</span>
                <span className="badge bg-secondary rounded-pill">3</span>
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
                <ul class="cart-item-list list-group mb-3">
                  {singleOrder.orderDetails.map((product, index) => (
                    <li
                      class="list-group-item d-flex justify-content-between lh-sm"
                      key={index}
                    >
                      <div class="item-details">
                        <h6 class="item-name my-0">{product.productName}</h6>
                        <small class="item-description text-muted">
                          Brief description
                        </small>
                      </div>
                      <span class="item-price text-muted">
                        {product.quantity}
                      </span>
                      <span class="item-price text-muted">
                        {product.totalPrice}
                      </span>
                    </li>
                  ))}
                  <br />
                  <li class="list-group-item d-flex justify-content-between">
                    <span class="total-label">Total (USD)</span>
                    <strong class="total-amount">{singleOrder.price}</strong>
                  </li>
                </ul>
              </ul>
            </div>

            <div className="col-md-7 col-lg-8">
              <h4 className="mb-3">Company Details</h4>
              <form
                className="needs-validation seller-checkout-form"
                noValidate
              >
                <div className="row g-3">
                  {/* Add form fields for billing address */}

                  <div className="billing-address-form row g-3">
                    <div className="col-12">
                      <label htmlFor="firstName" className="billing-label">
                        First Name
                      </label>
                      <input
                        type="text"
                        className="billing-input form-control"
                        id="firstName"
                        placeholder=""
                        value={singleOrder.customer}
                        required
                      />
                      <div className="billing-feedback invalid-feedback">
                        Please enter a valid first name.
                      </div>
                    </div>

                    <div className="col-12">
                      <label htmlFor="email" className="billing-label">
                        Email <span className="text-muted">(optional)</span>
                      </label>
                      <input
                        type="email"
                        className="billing-input form-control"
                        id="email"
                        placeholder="you@example.com"
                        value={singleOrder.emial}
                      />
                      <div className="billing-feedback invalid-feedback">
                        Please enter a valid email address to receive shipping
                        updates.
                      </div>
                    </div>

                    <div className="col-12">
                      <label htmlFor="address" className="billing-label">
                        Address
                      </label>
                      <input
                        type="text"
                        className="billing-input form-control"
                        id="address"
                        placeholder="1234 First Street"
                        value={singleOrder.address}
                        required
                      />
                      <div className="billing-feedback invalid-feedback">
                        Please enter your shipping address.
                      </div>
                    </div>

                    <div className="col-12">
                      <label htmlFor="address2" className="billing-label">
                        Address 2 <span className="text-muted">(optional)</span>
                      </label>
                      <input
                        type="text"
                        className="billing-input form-control"
                        id="address2"
                        placeholder="Apartment 24"
                        value={singleOrder.address}
                      />
                    </div>
                  </div>
                </div>
              </form>
            </div>
          </div>
        </div>
        {singleOrder.status === "completed" ? (
          <h1>Order has been completed...!</h1>
        ) : (
          <div className="p-5">
            <div className="d-flex justify-content-between align-items-center mb-5">
              <ul
                id="progressbar-2"
                className="d-flex justify-content-between mx-0 mt-0 mb-5 px-0 pt-0 pb-2"
              >
                <li
                  className={`step0 text-center ${
                    [
                      "pending",
                      "processing",
                      "readyToDelivery",
                      "onDelivery",
                      "completed",
                    ].includes(singleOrder.status)
                      ? "active"
                      : ""
                  }`}
                  id="step1"
                ></li>
                <li
                  className={`step0 text-center ${
                    [
                      "processing",
                      "readyToDelivery",
                      "onDelivery",
                      "completed",
                    ].includes(singleOrder.status)
                      ? "active"
                      : ""
                  }`}
                  id="step2"
                ></li>
                <li
                  className={`step0 text-center ${
                    ["readyToDelivery", "onDelivery", "completed"].includes(
                      singleOrder.status
                    )
                      ? "active"
                      : ""
                  }`}
                  id="step3"
                ></li>
                <li
                  className={`step0 text-center ${
                    ["onDelivery", "completed"].includes(singleOrder.status)
                      ? "active"
                      : ""
                  }`}
                  id="step4"
                ></li>
                <li
                  className={`step0 text-center ${
                    ["completed"].includes(singleOrder.status) ? "active" : ""
                  }`}
                  id="step5"
                ></li>
              </ul>
            </div>

            <div className="d-flex justify-content-between">
              <div className="d-lg-flex align-items-center">
                <FontAwesomeIcon icon={faClipboardList} className="fa-3x" />
                <div>
                  <p className="fw-bold mb-1">Order</p>
                  <p className="fw-bold mb-0">Processed</p>
                </div>
              </div>
              <div className="d-lg-flex align-items-center">
                <FontAwesomeIcon icon={faBoxOpen} className="fa-3x" />
                <div>
                  <p className="fw-bold mb-1">Order</p>
                  <p className="fw-bold mb-0">Shipped</p>
                </div>
              </div>
              <div className="d-lg-flex align-items-center">
                <FontAwesomeIcon icon={faShippingFast} className="fa-3x" />
                <div>
                  <p className="fw-bold mb-1">Order</p>
                  <p className="fw-bold mb-0">Shipped</p>
                </div>
              </div>
              <div className="d-lg-flex align-items-center">
                <FontAwesomeIcon icon={faShippingFast} className="fa-3x" />
                <div>
                  <p className="fw-bold mb-1">Order</p>
                  <p className="fw-bold mb-0">En Route</p>
                </div>
              </div>
              <div className="d-lg-flex align-items-center">
                <FontAwesomeIcon icon={faHome} className="fa-3x" />
                <div>
                  <p className="fw-bold mb-1">Order</p>
                  <p className="fw-bold mb-0">Arrived</p>
                </div>
              </div>
            </div>
          </div>
        )}
        ;
        {singleOrder.status === "completed" && (
          <div className="p-5">
            <h3>Return Product details</h3>
            {showReturnForm ? ( // Conditionally render the return product form based on the state
              <form>
                {/* Add form fields for return product details */}
                {/* Example: */}

                <div className="col-12">
                  <label htmlFor="address" className="billing-label">
                    Product Name
                  </label>
                  <input
                    type="text"
                    className="billing-input form-control"
                    id="address"
                    required
                  />
                </div>

                <div className="col-12">
                  <label htmlFor="address" className="billing-label">
                    Quantity
                  </label>
                  <input
                    type="text"
                    className="billing-input form-control"
                    id="address"
                    required
                  />
                </div>

                <label htmlFor="returnReason">Return Reason</label>
                <textarea
                  id="returnReason"
                  name="returnReason"
                  rows="4"
                  className="form-control"
                ></textarea>
                <button type="submit" className="btn btn-primary mt-3">
                  Submit Return
                </button>
                <button onClick={toggleReturnForm} className="btn btn-primary">
                  close Form
                </button>
              </form>
            ) : (
              <button onClick={toggleReturnForm} className="btn btn-primary">
                Add Return Product
              </button>
            )}
          </div>
        )}
      </div>
    </>
  );
}

export default SellerSingleOrder;
