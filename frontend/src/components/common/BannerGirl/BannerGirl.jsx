import React from 'react';
import './bannerGirl.css';

function BannerGirl() {
  return (
    <div className="bannerGirl-background">
      <div className="bannerGirl-banner-container">
        <div className="bannerGirl-text-section">
          <h1>Embrace Natural Healing with Pure Ayurvedic Herbs.</h1>
          <p>Discover the therapeutic power of traditional Ayurvedic remedies crafted from nature's finest botanicals for your complete wellness journey.</p>
          <button>Browse Natural Remedies</button>
        </div>
        <div className="bannerGirl-image-section">
          <img src={require('../../../Images/home/home_bannerImg1.png')} alt="Girl in nature" />
          <div className="bannerGirl-overlay-text-right bannerGirl-top-right">1,280+ Satisfied Customers</div>
          <div className="bannerGirl-overlay-text-left bannerGirl-bottom-left">1,280+ Herbal Formulations</div>
        </div>
      </div>
    </div>
  );
}

export default BannerGirl;