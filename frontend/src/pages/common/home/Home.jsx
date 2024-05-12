import React, { useState } from 'react';
import PartnershipRequest from "../../../components/sellerPartnership/partnershipRequest/PartnershipRequest";
import "./home.css";
import NavigationBar from '../../../components/common/navigationBar/NavigationBar';
import Footer from '../../../components/common/footer/footer';
import Header from '../../../components/common/header/header';
import ProductSummary from "../../../components/Feedback&Complaints/Feedback/Display/Summary/FeedbackSummary";
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


      <Header></Header>
      {/* <NavigationBar></NavigationBar> */}
      <ProductSummary />
      <Footer></Footer>

    </>
  )
}

export default Home;
