import React, { useState } from 'react';
import axios from 'axios';
import './AddFeedback.css';

const FeedbackForm = () => {
  const [ratings, setRatings] = useState(0);
  const [message, setMessage] = useState('');
  const [images, setImages] = useState([]);

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
    images.forEach((image) => {
      formData.append('image', image);
    });

    try {
      await axios.post('http://localhost:8070/feedback/add/PRO2345', formData, {
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

  return (
    <div className='F_containor1'>
      <h2>Feedback Form</h2>
      <form onSubmit={handleSubmit}>
        <div className='F_containor2'>
          <label className='F_ratings'>Ratings: {renderStars()}</label>
        </div>
        <br />
        <label className='F_message'>
          Message:
          <textarea value={message} onChange={(e) => setMessage(e.target.value)} required />
        </label>
        <br />
        <label className='F_image'>
          Upload Images:
          <input type="file" multiple onChange={handleImageChange} accept="image/*" />
        </label>
        <br />
        <button className="Feedbackbtn" type="submit">Submit Feedback</button>
      </form>
    </div>
  );
};

export default FeedbackForm;
