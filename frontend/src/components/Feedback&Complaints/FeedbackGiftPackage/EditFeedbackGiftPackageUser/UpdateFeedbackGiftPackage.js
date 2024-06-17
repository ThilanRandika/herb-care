import React, { useState } from 'react';
import axios from 'axios';
import './UpdateFeedbackGiftPackage.css'
import config from "../../../../config";

const UpdateFeedbackGiftPackage = ({ feedbackId, ratings, message, onUpdate }) => {
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
      await axios.put(`${config.BASE_URL}/feedbackGiftPackage/update/${feedbackId}`, formData, {
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
      <h3 className='DFGPU_utitle'>Update Feedback</h3>
      <form onSubmit={handleUpdate} className='UF_container'>
        <div>
          <label className='DFGPU_rati'>Ratings: {renderStars()}</label>
        </div>
        <div>
          <label className='DFGPU_mess'>Message:</label>
          <textarea value={newMessage} onChange={(e) => setNewMessage(e.target.value)} required />
        </div>
        <div>
          <label className='DFGPU_imag'>Upload New Images:</label>
          <input type="file" onChange={handleImageChange} accept="image/*" multiple />
        </div>
        <p className='DFGPU_note'>You can't change previously uploaded images.</p>
        <button className='DFGPU_up' type="submit">Update</button>
      </form>
    </div>
  );
};

export default UpdateFeedbackGiftPackage;
