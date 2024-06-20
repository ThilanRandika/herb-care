import React from 'react';
import Slider from "react-slick";
import './Banner.css';
import "slick-carousel/slick/slick.css"; 
import "slick-carousel/slick/slick-theme.css";



function Banner() {
    const settings = {
        dots: true,
        infinite: true,
        speed: 500,
        slidesToShow: 1,
        slidesToScroll: 1,
        autoplay: true,
        autoplaySpeed: 3000,
    };

    const slides = [
        { imageUrl: "home_bannerImg1.png", productCount: 1260, categoryCount: 35 },
        { imageUrl: "home_bannerImg1.png", productCount: 1500, categoryCount: 40 }
    ];

    return (
        <div className="banner-container">
            <div className="banner-text">
                <h1>Neque Quisquam Qui Dolorem</h1>
                <p>Lorem Ipsum Dolor Sit Amet Consectetur Aliquam Tristique Scelerisque Vulputate. Pellentesque.</p>
                <button className="explore-button">Explore More</button>
            </div>
            <div className="banner-slider">
                <Slider {...settings}>
                    {slides.map((slide, index) => (
                        <div key={index} className="slide">
                            <img src={require(`../../../Images/home/${slide.imageUrl}`)} alt={`Slide ${index}`} />
                        </div>
                    ))}
                </Slider>
                <div className="fixed-statements">
                    <div className="product-count top-left">
                        <div className="content">
                            <span className="icon">🌿</span>
                            <span className="lText">Lorem Ipsum Dolor</span>
                            <span className="lCount">1260</span>
                        </div>
                    </div>
                    <div className="category-count bottom-right">
                        <div className="content">
                            <span className="icon">🌿</span>
                            <span className="rText">Lorem Ipsum Dolor</span>
                            <span className="rCount">35</span>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Banner;
