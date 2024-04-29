import React, { useState } from 'react';
import axios from 'axios';
import './AddFeedback.css';
import { useLocation } from 'react-router-dom';

const FeedbackForm = () => {
  const [ratings, setRatings] = useState(0);
  const [message, setMessage] = useState('');
  const [images, setImages] = useState([]);
  const location = useLocation();
  const orderId = new URLSearchParams(location.search).get('orderId');
  const productId = new URLSearchParams(location.search).get('productId');

  const handleImageChange = (e) => {
    setImages([...images, ...e.target.files]);
  };

  const handleStarClick = (rating) => {
    setRatings(rating);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (ratings === 0) {
        alert('Please provide a rating');
        return;
      }

    const formData = new FormData();
    formData.append('ratings', ratings);
    formData.append('message', message);
    formData.append('orders', orderId);
    images.forEach((image) => {
      formData.append('image', image);
    });

    

    try {
      await axios.post(`http://localhost:8070/feedback/add/${productId}`, formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
          Authorization: `Bearer ${localStorage.getItem('token')}`, // Assuming you have stored the token in localStorage
        },
      });
      alert('Feedback submitted successfully');
      setRatings(0);
      setMessage('');
      setImages([]);
    } catch (error) {
      console.error(error);
      alert('Failed to submit feedback');
    }
  };

  const renderStars = () => {
    const stars = [];
    for (let i = 1; i <= 5; i++) {
      stars.push(
        <span key={i} onClick={() => handleStarClick(i)}>
          {i <= ratings ? '★' : '☆'}
        </span>
      );
    }
    return stars;
  };

  console.log(productId)

  return (
    <div className='F_conCenter'>
    <div className='F_containor1'>
      <h2 className='F_title'>Leave a Feedback</h2><br/>
        <form onSubmit={handleSubmit}>
          <div className='F_containor2'>
            <label className='F_ratings'>Click stars to rate a product: <br/>{renderStars()}</label>
          </div>
         <label className='F_message'>
            Share your review about recently purchased product:
            <textarea value={message} onChange={(e) => setMessage(e.target.value)} required />
          </label>
        <br />
          <label className='F_image'>
            Upload Images: <br/>
            <input type="file" multiple onChange={handleImageChange} accept="image/*" />
          </label>
        <br />
          <button className="Feedbackbtn" type="submit">Submit Review</button>
        </form>
    </div>
    </div>
  );
};

export default FeedbackForm;
