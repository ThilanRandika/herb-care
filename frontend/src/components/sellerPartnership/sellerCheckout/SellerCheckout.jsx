import { useEffect, useState } from "react";
import "./sellerCheckout.css";
import axios from "axios";
import { useNavigate } from "react-router-dom";

function SellerCheckout() {
  const [products, setProduct] = useState([]);
  const [sellers, setSeller] = useState({});
  const [paymentMethod, setPaymentMethod] = useState("credit");

  const navigator = useNavigate();

  const handlePaymentMethodChange = (e) => {
    setPaymentMethod(e.target.value);
  };

  useEffect(() => {
    axios
      .get("http://localhost:8070/sellerOrder/checkout")
      .then((res) => {
        console.log(res.data);
        setSeller(res.data.seller);
        setProduct(res.data.products);
        console.log(sellers);
        console.log(products);
      })
      .catch((err) => {
        console.log(err);
      });
  }, []); // eslint-disable-line react-hooks/exhaustive-deps

  const onSubmit = (e) => {
    e.preventDefault();

    const formattedProducts = products.map((product) => ({
      product: product.order.product_Id,
      pricePerItem: product.order.product_price,
      quantity: product.order.quantity,
    }));

    const newOrder = {
      seller: {
        ...sellers,
        payment: paymentMethod,
      },
      products: formattedProducts,
    };

    axios
      .post("http://localhost:8070/sellerOrder/placeOrder", newOrder)
      .then((res) => {
        alert("Your order has been placed successfully!");
        console.log(res.data);
        navigator("../bag");
      })
      .catch((err) => {
        console.log(err);
      });
  };

  return (
    <>
      <div className="seller-checkout">
        <div className="seller-checkout-container">
          <main>
            <div className="seller-checkout-header py-5 text-center">
              <img
                className="seller-checkout-logo d-block mx-auto mb-4"
                src="https://th.bing.com/th/id/OIP.MCmM1b-hj0SntnEkvZNAnwHaHa?rs=1&pid=ImgDetMain"
                alt=""
                width="72"
                height="57"
              />
              <h2 className="seller-checkout-title">Checkout Form</h2>
              <p className="seller-checkout-description lead">
                Here is an example of a form created entirely using form
                controls in Bootstrap. Each required form set has a verification
                status that can be triggered by trying to submit the form
                without completing it.
              </p>
            </div>

            <div className="row g-3">
              <div className="col-md-5 col-lg-4 seller-checkout-shopping-cart">
                <h4 className="d-flex justify-content-between align-items-center mb-3">
                  <span className="text-muted">Shopping Cart</span>
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
                    {products.map((product, index) => (
                      <li
                        class="list-group-item d-flex justify-content-between lh-sm"
                        key={index}
                      >
                        <div class="item-details">
                          <h6 class="item-name my-0">
                            {product.details.product_name}
                          </h6>
                          <small class="item-description text-muted">
                            Brief description
                          </small>
                        </div>
                        <span class="item-price text-muted">
                          {product.order.quantity}
                        </span>
                        <span class="item-price text-muted">
                          {product.order.total_price}
                        </span>
                      </li>
                    ))}
                    <br />
                    <li class="list-group-item d-flex justify-content-between">
                      <span class="total-label">Total (USD)</span>
                      <strong class="total-amount">{sellers.totalprice}</strong>
                    </li>
                  </ul>
                </ul>
              </div>

              <div className="col-md-7 col-lg-8">
                <h4 className="mb-3">Billing address</h4>
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
                          value={sellers.companyName}
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
                          value={sellers.email}
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
                          value={sellers.address}
                          required
                        />
                        <div className="billing-feedback invalid-feedback">
                          Please enter your shipping address.
                        </div>
                      </div>

                      <div className="col-12">
                        <label htmlFor="address2" className="billing-label">
                          Address 2{" "}
                          <span className="text-muted">(optional)</span>
                        </label>
                        <input
                          type="text"
                          className="billing-input form-control"
                          id="address2"
                          placeholder="Apartment 24"
                          value={sellers.address}
                        />
                      </div>
                    </div>
                  </div>

                  {/* <hr className="my-4" />

            <div className="form-check">
              <input type="checkbox" className="form-check-input" id="same-address" />
              <label className="form-check-label" htmlFor="same-address">The shipping address is the same as my billing address</label>
            </div>

            <div className="form-check">
              <input type="checkbox" className="form-check-input" id="save-info" />
              <label className="form-check-label" htmlFor="save-info">Save this information next time</label>
            </div> */}

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
                        checked={paymentMethod === "CreditCard"}
                        required
                      />
                      <label className="form-check-label" htmlFor="credit">
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
                        checked={paymentMethod === "AccountTransaction"}
                        required
                      />
                      <label className="form-check-label" htmlFor="cash">
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
                        checked={paymentMethod === "PayOrder"}
                        required
                      />
                      <label className="form-check-label" htmlFor="paypal">
                        Pay Order
                      </label>
                    </div>
                  </div>

                  <hr className="my-4" />

                  <button
                    className="w-100 btn btn-primary btn-lg"
                    type="submit"
                    onClick={onSubmit}
                  >
                    Continue to pay
                  </button>
                </form>
              </div>
            </div>
          </main>
        </div>
      </div>
    </>
  );
}

export default SellerCheckout;
