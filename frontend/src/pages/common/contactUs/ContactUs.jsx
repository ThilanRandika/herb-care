import React, { useState } from 'react';
import "./ContactUs.css";
import { BsEnvelopeAtFill } from "react-icons/bs";
import { BsTelephoneInboundFill } from "react-icons/bs";
import { BsHouseFill } from "react-icons/bs";
import { GoogleMap, LoadScript } from '@react-google-maps/api';
import Footer from '../../../components/common/footer/footer';
import Header from '../../../components/common/header/header';

const containerStyle = {
    width: '1300px',
    height: '800px'
  };
  
  const center = {
    lat: -3.745,
    lng: -38.523
  };

function ContactUs(){

    return (
        <>
        <Header></Header>
        <div>
            
            <br></br>
            <div className="ContactUs_title_card">
                <h3 className="ContactUs_title">Contact Us</h3>
                <h3 className="ContactUs_title">.....</h3>
                <p className="ContactUs_title">Cultivating Connections: Reach Out to Us and Let's Start a Conversation!</p>
            </div>

            <div className="ContactUs_Containor">
                <div className="ContactUs_Address_card">
                    <div className='ContactUs_icon'>
                        <BsHouseFill />
                    </div>
                    <h4>Visit Us</h4>
                    <hr></hr>
                    <p>379/9 kuruduwatte,Walivita,Kaduwela. </p> 
                    <p>Malabe, Sri Lanka</p>
                </div>

                <div className="ContactUs_Phone_card">
                    <div className='ContactUs_icon'>
                        <BsTelephoneInboundFill />
                    </div>
                    <h4>Call us</h4>
                    <hr></hr>
                    <p>0112 413 779</p>
                </div>

                <div className="ContactUs_Email_card">
                    <div className='ContactUs_icon'>
                        <BsEnvelopeAtFill />
                    </div>
                    <h4>Contact Us</h4>
                    <hr></hr>
                    <p>ceylonherbcare3@gmail.com</p>
                </div>
            </div>

            <br></br>

            <div className='ContactUs_map'>
                <LoadScript
                    googleMapsApiKey="AIzaSyCBnRDMLJ1nN-jQoh1UqqO-efh_P9nc0FQ"
                >
                    <GoogleMap
                        mapContainerStyle={containerStyle}
                        center={center}
                        zoom={10}
                    >
                        {/* Child components, such as markers, info windows, etc. */}
                        <></>
                    </GoogleMap>
                </LoadScript>
            </div>
            <Footer></Footer>
        </div>

      </>
    )
}

export default ContactUs;





