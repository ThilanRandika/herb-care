import React, { useState, useEffect } from 'react';
import "./Banner.css";
import banner1 from "../../../../src/Images/bannerImages/1.png";
import banner2 from "../../../../src/Images/bannerImages/2.png";

function Banner (){
    const [currentImageIndex, setCurrentImageIndex] = useState(0);

    useEffect(() => {
        const intervalId = setInterval(() => {
            setCurrentImageIndex(prevIndex => (prevIndex + 1) % 2); // Change 2 to the number of images you have
        }, 5000); // Change 5000 to 5 seconds (in milliseconds)

        return () => clearInterval(intervalId);
    }, []);

    const images = [banner1, banner2]; // Add more images as needed

    return(
        <div className='HPB_image'>
            <img src={images[currentImageIndex]} alt='main banner'/>
        </div>
    )
}

export default Banner;
