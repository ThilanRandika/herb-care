import React, { useState } from "react";
import "./partnershipRequest.css";
import axios from "axios";
import config from "../../../config";
import { Link } from "react-router-dom";

function PartnershipRequest() {
  const [sellerRequest, setSellerRequest] = useState({
    email: "",
    seller_name: "",
    company: "",
    company_discription: "",
    address: "",
    contact_num: "",
    website: "",
    tax_id: "",
  });

  const addChange = (e) => {
    const { name, value } = e.target;
    setSellerRequest({ ...sellerRequest, [name]: value });
  };


  const Submit = async (e) => {
    e.preventDefault();
    try {
      await axios.post(`${config.BASE_URL}/sellerPartnershipRequest/add`, sellerRequest);
      console.log(sellerRequest)
      // alert("Requst Added Successfully");
      setSellerRequest("")
    } catch (error) {
      alert(error.message);
    }
  };

  return (
    <>
      <div className="popup">
        <div className="popup-inner">

          {/* <button
            className="close-btn"
            onClick={() => props.setPopupVisible(false)}
          >
            close
          </button> */}

          <form onSubmit={Submit}>
            <div className="mb-3">
              <label htmlFor="exampleInputEmail1" className="form-label">
                Email address
              </label>
              <input
                type="email"
                className="form-control"
                id="exampleInputEmail1"
                aria-describedby="emailHelp"
                onChange={addChange}
                name="email"
              />
              <div id="emailHelp" className="form-text">
                We'll never share your email with anyone else.
              </div>
            </div>
            <div className="mb-3">
              <label htmlFor="exampleInputPassword1" className="form-label">
                Your Name
              </label>
              <input
                type="text"
                className="form-control"
                id="exampleInputName1"
                onChange={addChange}
                name="seller_name"
              />
            </div>
            <div className="mb-3">
              <label htmlFor="exampleInputEmail1" className="form-label">
                Company Name
              </label>
              <input
                type="text"
                className="form-control"
                id="exampleInputName2"
                name="company"
                onChange={addChange}
              />
            </div>
            <div className="mb-3">
              <label htmlFor="exampleInputEmail1" className="form-label">
                Company Discription
              </label>
              <textarea
                type="textArea"
                className="form-control"
                id="exampleInputDescription1"
                rows="4"
                name="company_discription"
                onChange={addChange}
              />
            </div>
            <div className="mb-3">
              <label htmlFor="exampleInputEmail1" className="form-label">
                Address
              </label>
              <input
                type="text"
                className="form-control"
                id="exampleInputAddress1"
                name="address"
                onChange={addChange}
              />
            </div>
            <div className="mb-3">
              <label htmlFor="exampleInputEmail1" className="form-label">
                Contact Number
              </label>
              <input
                type="phone"
                className="form-control"
                id="exampleInputPhoneNUmber1"
                name="contact_num"
                onChange={addChange}
              />
            </div>
            <div className="mb-3">
              <label htmlFor="exampleInputEmail1" className="form-label">
                Company Website (Optional)
              </label>
              <input
                type="text"
                className="form-control"
                id="exampleInputEmail1"
                name="website"
                onChange={addChange}
              />
            </div>
            <div className="mb-3">
              <label htmlFor="exampleInputEmail1" className="form-label">
                Tax Id
              </label>
              <input
                type="text"
                className="form-control"
                id="exampleInputEmail1"
                name="tax_id"
                onChange={addChange}
              />
            </div>
            <button type="submit" className="btn btn-primary">
              Submit
            </button>
          </form>
        </div>
      </div>
    </>
  ) 
}

export default PartnershipRequest;
