import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './DisplayFeedbackGiftPackage.css';

const StarRating = ({ rating }) => {
    const starsTotal = 5;
    const filledStars = Math.round((rating / 100) * starsTotal);

    return (
        <div className='star-rating'>
            {[...Array(starsTotal)].map((_, index) => (
                <span key={index} className={index < filledStars ? 'star-filled' : 'star-empty'}>&#9733;</span>
            ))}
        </div>
    );
};

const FeedbackList = () => {
    const [feedbacks, setFeedbacks] = useState([]);

    useEffect(() => {
        // Fetch feedbacks for the logged-in user
        const fetchFeedbacks = async () => {
            try {
                const response = await axios.get('http://localhost:8070/feedbackGiftPackage/giftpackagefeedbacks', {
                    headers: {
                        Authorization: `Bearer ${localStorage.getItem('token')}`
                    }
                });
                setFeedbacks(response.data.feedbacks);
            } catch (error) {
                console.error(error);
                // Handle error
            }
        };

        fetchFeedbacks();
    }, []);

    const handleDeleteFeedback = async (feedbackId) => {
        try {
            await axios.delete(`http://localhost:8070/feedbackGiftPackage/delete/${feedbackId}`, {
                headers: {
                    Authorization: `Bearer ${localStorage.getItem('token')}`
                }
            });
            // After successful deletion, update the feedbacks state
            setFeedbacks(prevFeedbacks => prevFeedbacks.filter(feedback => feedback._id !== feedbackId));
        } catch (error) {
            console.error(error);
            // Handle error
        }
    };

    return (
        <div className='DFGPU_containor1'>
            <h2 className='DFGPU_title'>Gift Packages Feedback History</h2><br />
            <div>
                <ul className='DFGPU_containor2'>
                    {feedbacks.map(feedback => (
                        <li className='DFGPU_LI' key={feedback._id}>
                            <div >
                                <p className='DFGPU_rating'>Ratings: </p>
                                {feedback.ratings ? <StarRating rating={feedback.ratings} className='DFGPU_ratingstars' /> : null}
                            </div>
                            <p className='DFGPU_message'>Message: {feedback.message}</p>
                            <p className='DFGPU_image'>Images:</p>
                            <ul className='DFGPU_imaUL'>
                                {feedback.image ? feedback.image.map((image, index) => (
                                    <li key={index}>
                                        <img className='DFGPU_im' src={require(`../../../../../../../BACKEND/uploads/${image}`)} alt={`Image ${index}`} style={{ maxWidth: '200px' }} />
                                    </li>
                                )) : null}
                            </ul>
                            <button className='DFGPU_deletefeedgift' onClick={() => handleDeleteFeedback(feedback._id)}>Delete Feedback</button>
                        </li>
                    ))}
                </ul>
            </div>
        </div>
    );
};

export default FeedbackList;
