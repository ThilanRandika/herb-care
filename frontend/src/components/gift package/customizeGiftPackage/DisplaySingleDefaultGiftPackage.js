import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useLocation, Link } from 'react-router-dom'; // Import Link from react-router-dom
import "./DisplaySingleDefaultGiftPackage.css"
import FeedbackGiftPAck from '../../../components/Feedback&Complaints/FeedbackGiftPackage/Display/DisplayUnderPackage/UnderPackageFeedbacks';
import Header from '../../common/header/header';
import Footer from '../../common/footer/footer';

const DisplaySingleDefaultGiftPackage = () => {
    const [packageData, setPackageData] = useState(null);
    const [loading, setLoading] = useState(true);
    const location = useLocation();
    const packageId = new URLSearchParams(location.search).get('packageId');
    

    useEffect(() => {
        const fetchPackage = async () => {
            try {
                const response = await axios.get(`http://localhost:8070/defaultGiftpackage/${packageId}`);
                setPackageData(response.data);
            } catch (error) {
                console.error('Error fetching package:', error);
            } finally {
                setLoading(false);
            }
        };

        if (packageId) {
            fetchPackage();
        } else {
            setLoading(false);
        }
    }, [packageId]);

    return (
        <div>
            <Header></Header>
            <br></br>
            <br></br>
            
            <div className="Single_GiftPack_display_header_card">
                <h1 className="Single_GiftPack_display_header">Default Gift Packages</h1>
                <h5 className="Single_GiftPack_display_header">Order the special Gift packages from us with a best price.</h5>
                <p className="Single_GiftPack_display_header">Quick  -  Easy  -  The best</p>
                <p className="Single_GiftPack_display_header">From Us</p>
            </div>

            <div>
            {loading ? (
                <p>Loading...</p>
            ) : (
                packageData && (
                    <div>
                        <div className='SGP_containor'>
                            <div className='SGP_Image_card'>
                                {packageData.images.map((image, index) => (
                                    <img key={index} src={require(`../../../../../BACKEND/uploads/${image}`)} alt={`Image ${index}`} />
                                ))}
                            </div>
                            <div className='SGP_Content'>
                                <h1>{packageData.packageName}</h1>
                                <br></br>
                                <p>{packageData.description}</p>
                                <p>Including Products: <br></br>{packageData.products}</p>
                                <br></br>
                                <p>Total Price: {packageData.totalPrice}</p>
                                <br></br>
                                <div className='SGP_order_btn_containor'>
                                    <Link to={`/Place-Order?packageId=${packageData._id}`}>
                                        <button className="btn">Order Package</button>
                                    </Link>
                                </div>
                            </div>
                        </div>
                        <FeedbackGiftPAck packageId={packageId} />
                    </div>
                )
            )}

            </div>  
            <Footer></Footer>
            </div> 
    );
};

export default DisplaySingleDefaultGiftPackage;
