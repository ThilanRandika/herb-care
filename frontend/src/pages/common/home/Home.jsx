import React, { useState } from 'react';
import PartnershipRequest from "../../../components/sellerPartnership/partnershipRequest/PartnershipRequest";
import "./home.css";
import NavigationBar from '../../../components/common/navigationBar/NavigationBar';
import { Link } from 'react-router-dom';
import Banner from '../../../components/common/Banner/Banner'

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
      </div>


    </>
  )
}

export default Home;
