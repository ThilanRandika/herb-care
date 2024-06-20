import React, { useContext, useState } from "react";
import "./sellerAppointment.css";
import { AuthContext } from "../../../context/AuthContext";
import axios from "axios";
import config from "../../../config";

function SellerAppointment() {
  const { user } = useContext(AuthContext);
  const [ topic, setTopic ] = useState('');
  const [ discription, setDiscription ] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();

    const newAppointment = {
      topic: topic,
      discription: discription
    };

    axios
      .post(`${config.BASE_URL}/sellerAppointments/creatAppoinment/${user.sellerId}`, newAppointment)
      .then((res) => {
        alert("Your Appointment has been placed successfully!");
        console.log(res.data);
        setDiscription('');
        setTopic('');
        navigator('../appointment');
      })
      .catch((err) => {
        console.log(err);
      });

  };
  return (
    <>
      <h3 className="p-3 text-center">Appontments</h3>
      <div className="seller-appointment-container">
        <div className="seller-appointment-content">
          <div className="seller-appointment-left">
            <div className="address details">
              <i className="fas fa-map-marker-alt"></i>
              <div className="topic">Address</div>
              <div className="text-one">Surkhet, NP12</div>
              <div className="text-two">Birendranagar 06</div>
            </div>
            <div className="phone details">
              <i className="fas fa-phone-alt"></i>
              <div className="topic">Phone</div>
              <div className="text-one">+0098 9893 5647</div>
              <div className="text-two">+0096 3434 5678</div>
            </div>
            <div className="email details">
              <i className="fas fa-envelope"></i>
              <div className="topic">Email</div>
              <div className="text-one">codinglab@gmail.com</div>
              <div className="text-two">info.codinglab@gmail.com</div>
            </div>
          </div>
          <div className="seller-appointment-right">
            <div className="topic-text">Make An Appointment</div>
            <p></p>
            <form action="#">
              <div className="input-box">
                <input
                  type="text"
                  value={user.seller_name}
                  placeholder="Enter your name"
                />
              </div>
              <div className="input-box">
                <input
                  type="text"
                  value={user.email}
                  placeholder="Enter your email"
                />
              </div>
              <div className="input-box">
                <input
                  type="text"
                  value={user.company}
                  placeholder="Enter your name"
                />
              </div>
              <div className="input-box">
                <input 
                type="text" 
                value={topic}
                onChange={(e) => setTopic(e.target.value)}
                placeholder="Enter your Topic" />
              </div>
              <div className="input-box message-box">
                <input
                  type="textarea"
                  value={discription}
                  onChange={(e) => setDiscription(e.target.value)}
                  placeholder="Discribe your topic briefly"
                />
              </div>
              <div className="button">
                <input type="button" onClick={handleSubmit} value="Send Now" />
              </div>
            </form>
          </div>
        </div>
      </div>
    </>
  );
}

export default SellerAppointment;
