import React, { useState } from 'react';
import axios from 'axios';
import './UpdateFeedback.css'

const UpdateFeedback = ({ feedbackId, ratings, message, onUpdate }) => {
  const [newRatings, setNewRatings] = useState(ratings);
  const [newMessage, setNewMessage] = useState(message);
  const [newImages, setNewImages] = useState([]);

  const handleImageChange = (e) => {
    const files = Array.from(e.target.files);
    setNewImages(files); // Only set the new images, replacing any previous ones
  };

  const handleUpdate = async (e) => {
    e.preventDefault();

    const formData = new FormData();
    formData.append('ratings', newRatings);
    formData.append('message', newMessage);
    newImages.forEach((file, index) => {
      formData.append(`images`, file);
    });

    try {
      await axios.put(`http://localhost:8070/feedback/update/${feedbackId}`, formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
          Authorization: `Bearer ${localStorage.getItem('token')}`,
        },
      });
      onUpdate();
    } catch (error) {
      console.error(error);
      alert('Failed to update feedback');
    }
  };

  const renderStars = () => {
    const stars = [];
    for (let i = 1; i <= 5; i++) {
      stars.push(
        <span key={i} onClick={() => setNewRatings(i)}>
          <span style={{ color: i <= newRatings ? 'gold' : 'gray' }}>★</span>
        </span>
      );
    }
    return stars;
  };

  return (
    <div>
      <h3 className='UF_update'>Update Feedback</h3>
      <form onSubmit={handleUpdate} className='UF_containor'>
        <div>
          <label className='UF_ratings'>Ratings: {renderStars()}</label>
        </div>
        <div>
          <label className='UF_message'>Message:</label>
          <textarea value={newMessage} onChange={(e) => setNewMessage(e.target.value)} required />
        </div>
        <div>
          <label className='UF_image'>Upload New Images:</label>
          <input type="file" onChange={handleImageChange} accept="image/*" multiple />
        </div>
        <p className='UF_cant'>You can't change previous uploaded images.</p>
        <button className='UF_upBtn' type="submit">Update</button>
      </form>
    </div>
  );
};

export default UpdateFeedback;
