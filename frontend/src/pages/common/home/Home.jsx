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
import Banner2 from '../../../components/common/Banner2/Banner2';
import BannerGirl from '../../../components/common/BannerGirl/BannerGirl';
import HomeBlogs from '../../../components/common/homeBlogs/HomeBlogs';

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
        
        <Link to="/partnershipRequestForm" >
          <div class="center-container">
            <div className='seller-req' onClick={togglePopup}>
              <img src={require(`../../../../../frontend/src/Images/logo/WhatsApp Image 2024-05-13 at 15.30.42_635bfe04.jpg`)} alt="" />
              <button class="seller-request-button">Join Now</button>
            </div>
          </div>
        </Link>

        {/* <NavigationBar></NavigationBar> */}
        <br />
        <br />
        <Banner2/>
        <br />
        <ProductCard2/>
        <br></br>
        <br></br>
        <BannerGirl/>
        <br></br>
      <ProductSummary />
      <br />
      <HomeBlogs/>
      <Footer></Footer>

      </div>


      
      

    </>
  )
}

export default Home;
