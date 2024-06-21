import React from 'react';
import './bannerGirl.css';

function BannerGirl() {
  return (
    <div className="bannerGirl-background">
      <div className="bannerGirl-banner-container">
        <div className="bannerGirl-text-section">
          <h1>Lorem Ipsum Dolor Ipsum Amet Consectetur.</h1>
          <p>Lorem Ipsum Dolor Sit Amet Consectetur. Porttitor Varius Quam Faucibus Placerat.</p>
          <button>Lorem Ipsum Dolor</button>
        </div>
        <div className="bannerGirl-image-section">
          <img src={require('../../../Images/home/home_bannerImg1.png')} alt="Girl in nature" />
          <div className="bannerGirl-overlay-text-right bannerGirl-top-right">1,280+ Porttitor Consectetur</div>
          <div className="bannerGirl-overlay-text-left bannerGirl-bottom-left">1,280+ Porttitor Consectetur</div>
        </div>
      </div>
    </div>
  );
}

export default BannerGirl;
