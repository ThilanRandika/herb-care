import React, { useState, useEffect } from 'react';
import "./GiftHomeBanner.css";
import image1 from "../../../../src/Images/giftImages/gift_1.png";
import image2 from "../../../../src/Images/giftImages/gift_2.png";

function GiftHomeBanner (){
    const [currentImageIndex, setCurrentImageIndex] = useState(0);

    useEffect(() => {
        const intervalId = setInterval(() => {
            setCurrentImageIndex(prevIndex => (prevIndex + 1) % 2); // Change 2 to the number of images you have
        }, 5000); // Change 5000 to 5 seconds (in milliseconds)

        return () => clearInterval(intervalId);
    }, []);

    const images = [image1, image2]; // Add more images as needed

    return(
        <div className='GHPB_image'>
            <img src={images[currentImageIndex]} alt='main banner'/>
        </div>
    )
}

export default GiftHomeBanner;