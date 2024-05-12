import React, { useState } from 'react';
import PartnershipRequest from "../../../components/sellerPartnership/partnershipRequest/PartnershipRequest";
import "./home.css";
import NavigationBar from '../../../components/common/navigationBar/NavigationBar';
import { Link } from 'react-router-dom';
import Banner from '../../../components/common/Banner/Banner'
import GiftHomeBanner from '../../../components/gift package/GiftHomeBanner/GiftHomeBanner'

function Home() {

  const [isPopupVisible, setPopupVisible] = useState(false);

  const togglePopup = () => {
    setPopupVisible(!isPopupVisible);
  };

  return (
    <>
      <NavigationBar></NavigationBar>
      <div>
        <Banner/>

        <br></br>
        <br></br>
        <br></br>

        <GiftHomeBanner/>
      </div>


    </>
  )
}

export default Home;
