import React, { useState } from 'react';
import axios from 'axios';
import './AddFeedbackGiftPackage.css';
import { useLocation } from 'react-router-dom';

const StarRatingInput = ({ value, onChange }) => {
  const stars = Array.from({ length: 5 }, (_, index) => (
    <span
      key={index}
      className={index < value ? 'star-filled' : 'star-empty'}
      onClick={() => onChange(index + 1)}
    >
      &#9733;
    </span>
  ));

  return <div className="star-rating">{stars}</div>;
};

const FeedbackForm = () => {
  const [ratings, setRatings] = useState(0);
  const [message, setMessage] = useState('');
  const [images, setImages] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const location = useLocation();
  const giftPackageOrder = new URLSearchParams(location.search).get('giftPackageOrder');
  const packageId = new URLSearchParams(location.search).get('packageId');

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);

    const formData = new FormData();
    formData.append('ratings', ratings);
    formData.append('message', message);
    formData.append('giftPackageOrder', giftPackageOrder);
    images.forEach((image) => {
      formData.append('image', image);
    });

    try {
      await axios.post(`http://localhost:8070/feedbackGiftPackage/add/${packageId}`, formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });
      alert('Feedback submitted successfully');
      setRatings(0);
      setMessage('');
      setImages([]);
    } catch (error) {
      alert('Error submitting feedback:', error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className='FGP_Containor1'>
      <div className='FGP_Containo2'>
        <h2>Leave a Feedback</h2>
        <form onSubmit={handleSubmit} className='FGP_form'>
          <label className='FGP_Rating'>
            Ratings:
            <StarRatingInput value={ratings} onChange={setRatings} />
          </label>
          <label className='FGP_message'>
            Message:
            <textarea
              value={message}
              onChange={(e) => setMessage(e.target.value)}
            />
          </label>
          <label className='FGP_image'>
            Images:
            <input
              type="file"
              multiple
              onChange={(e) => setImages([...images, ...e.target.files])}
            />
          </label>
          <button type="submit" disabled={isLoading} className='FGP_subBttn'>
            {isLoading ? 'Submitting...' : 'Submit Feedback'}
          </button>
        </form>
      </div>
    </div>
  );
};

export default FeedbackForm;
