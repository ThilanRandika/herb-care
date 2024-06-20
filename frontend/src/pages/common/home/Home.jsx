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
import Categories from '../../../components/common/categories/Categories';
import ProductCardsRating from '../../../components/common/productCards1/ProductCardsRating';
import ProductCard2 from '../../../components/common/productCard2/ProductCard2';

function Home() {

  const [isPopupVisible, setPopupVisible] = useState(false);

  const togglePopup = () => {
    setPopupVisible(!isPopupVisible);
  };

  return (
    <>

        <div className="home-customer-header">
          <Header></Header>
        </div>
      
      <div>
        <Banner/>

        <br></br>
        <br></br>

        <Categories/>

        <br></br>
        <br></br>
        <br></br>

        <GiftHomeBanner/>
        <br />
        <br />

        <ProductCardsRating/>

        <br />
        <br />
        

        <div className='seller-req' onClick={togglePopup}>
          <img src={require(`../../../../../frontend/src/Images/logo/WhatsApp Image 2024-05-13 at 15.30.42_635bfe04.jpg`)} alt="" />
        </div>
        {isPopupVisible && <PartnershipRequest trigger={isPopupVisible} setPopupVisible={setPopupVisible} />}

        {/* <NavigationBar></NavigationBar> */}
        <ProductCard2/>

        <br></br>
        <br></br>
        <br></br>
      <ProductSummary />
      <Footer></Footer>

      </div>


      
      

    </>
  )
}

export default Home;
