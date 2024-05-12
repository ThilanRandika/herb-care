import { useEffect, useState } from "react";
import "./sellerCheckout.css";
import axios from "axios";
import { useNavigate } from "react-router-dom";

function SellerCheckout({ selectedItems, onClose }) {
  const [products, setProduct] = useState([]);
  const [sellers, setSeller] = useState({});
  const [paymentMethod, setPaymentMethod] = useState("credit");
  const [address, setAddress] = useState("");

  const navigator = useNavigate();

  const handlePaymentMethodChange = (e) => {
    setPaymentMethod(e.target.value);
  };

  useEffect(() => {

    console.log(selectedItems)
    axios
      .get("http://localhost:8070/sellerOrder/checkout",  {
        params: {
          selectedItems: selectedItems
        }
      })
      .then((res) => {
        console.log(res.data);
        setSeller(res.data.seller);
        setAddress(res.data.seller.address || "");
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
        address:address,
        payment: paymentMethod,
      },
      products: formattedProducts,
    };

    axios
      .post("http://localhost:8070/sellerOrder/placeOrder", newOrder)
      .then((res) => {
        alert("Your order has been placed successfully!");
        console.log(res.data);
        navigator('../orders');
      })
      .catch((err) => {
        console.log(err);
      });
  };

  return (
    <>
    <div className="seller-checkout-full-container">
      <div className="seller-checkout">
        <div className="seller-checkout-container">
          <main>
            <div className="seller-checkout-header py-5 text-center">
              <img
                className="checkout-logo d-block mx-auto mb-4"
                src="https://th.bing.com/th/id/OIP.MCmM1b-hj0SntnEkvZNAnwHaHa?rs=1&pid=ImgDetMain"
                alt=""
                width="72"
                height="57"
              />
              <h2 className="checkout-title">Checkout Form</h2>
            </div>

            <div className="row g-3">
              <div className="col-md-5 col-lg-4 checkout-shopping-cart">
                <h4 className="d-flex justify-content-between align-items-center mb-3">
                  <span className="text-muted">Shopping Cart</span>
                  <span className="badge bg-secondary rounded-pill">{sellers.itemCount}</span>
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
                    {products.map((product, index) => (
                      <li
                        className="list-group-item d-flex justify-content-between lh-sm"
                        key={index}
                      >
                        <div className="item-details">
                          <h6 className="item-name my-0">
                            {product.details.product_name}
                          </h6>
                          <small className="item-description text-muted">
                            Brief description
                          </small>
                        </div>
                        <span className="item-price text-muted">
                          {product.order.quantity}
                        </span>
                        <span className="item-price text-muted">
                          {product.order.total_price}
                        </span>
                      </li>
                    ))}
                    <br />
                    <li className="list-group-item d-flex justify-content-between">
                      <span className="total-label">Total (LKR)</span>
                      <strong className="total-amount">Rs.{sellers.totalPrice}</strong>
                    </li>
                  </ul>
                </ul>
              </div>

              <div className="col-md-7 col-lg-8">
                <h4 className="mb-3">Company Details</h4>
                <form
                  className="needs-validation checkout-form"
                  noValidate
                >
                  <div className="row g-3">
                    {/* Add form fields for billing address */}

                    <div className="billing-address-form row g-3">
                      <div className="col-12">
                        <label htmlFor="firstName" className="billing-label">
                          Company Name :
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
                          Email : <span className="text-muted"></span>
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
                          Address :
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
                          Shipping Address :{" "}
                          <span className="text-muted">(If want to change address)</span>
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
      </div>
    </>
  );
}

export default SellerCheckout;
