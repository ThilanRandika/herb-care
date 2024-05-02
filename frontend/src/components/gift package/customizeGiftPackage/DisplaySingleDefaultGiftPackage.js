import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useLocation } from 'react-router-dom';

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
            {loading ? (
                <p>Loading...</p>
            ) : (
                packageData && (
                    <div>
                      <div>
                           
                            {packageData.images.map((image, index) => (
                                <img key={index} src={require(`../../../../../BACKEND/uploads/${image}`)} alt={`Image ${index}`} />
                            ))}
                        </div>
                        <h1>{packageData.packageName}</h1>
                        <p>Description: {packageData.description}</p>
                        <p>Products: {packageData.products}</p>
                        <p>Total Price: {packageData.totalPrice}</p>
                        
                    </div>
                    
                )
            )}
        </div>
    );
};

export default DisplaySingleDefaultGiftPackage;
