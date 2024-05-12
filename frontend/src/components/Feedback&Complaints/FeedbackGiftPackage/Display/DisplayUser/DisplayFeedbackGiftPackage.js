import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './DisplayFeedbackGiftPackage.css';
import UpdateFeedbackGiftPackage from '../../EditFeedbackGiftPackageUser/UpdateFeedbackGiftPackage';

const UserFeedbackGiftpackage = () => {
  const [feedbacks, setFeedbacks] = useState([]);
  const [editingFeedbackId, setEditingFeedbackId] = useState(null);

  const fetchFeedbacks = async () => {
    try {
      const response = await axios.get('http://localhost:8070/feedbackGiftPackage/');
      console.log(response.data); // Make sure this logs an array of feedbacks
      setFeedbacks(response.data.feedbacks);
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    fetchFeedbacks();
  }, []);

  console.log(feedbacks);

  const handleDelete = async (feedbackId) => {
    try {
      await axios.delete(`http://localhost:8070/feedbackGiftPackage/delete/${feedbackId}`);
      setFeedbacks((prevFeedbacks) => prevFeedbacks.filter((item) => item._id !== feedbackId));
    } catch (error) {
      console.error(error);
    }
  };

  const handleEdit = (feedbackId) => {
    setEditingFeedbackId(feedbackId);
  };

  const handleUpdate = () => {
    setEditingFeedbackId(null);
    fetchFeedbacks();
  };

  const renderStars = ({ rating }) => {
    const stars = [];
    for (let i = 1; i <= 5; i++) {
      let starClass = "DFGPU_star2"; // Default color
      if (i <= rating) {
        starClass = "DFGPU_star1"; // Change color for filled stars
      }
      stars.push(<span key={i} className={starClass}>&#9733;</span>);
    }
    return <div>{stars}</div>;
  };

  return (
    
    <div>
      <div className="DFGPU_title_card">
      <h2 className="DFGPU_title">Gift Package Feedbacks</h2>
      <p className="DFGPU_title">Manage your submitted Feedbacks for Gift Packages</p>
      </div>
      
      <br />
      <ul className="DFGPU_containor">
        {Array.isArray(feedbacks) && feedbacks.map((item) => (
          <li key={item._id} className="DFGPU_containor2">
            {editingFeedbackId === item._id ? (
              <UpdateFeedbackGiftPackage
                feedbackId={item._id}
                ratings={item.ratings}
                message={item.message}
                image={item.image}
                onUpdate={handleUpdate}
              />
            ) : (
              <>
                <strong className="DFGPU_rating">Ratings:</strong> {renderStars({ rating: item.ratings })}<br />
                <strong className="DFGPU_mes">Message:</strong> <br /> {item.message}<br /><br />
                {item.image && item.image.length > 0 && (
                  <div>
                    <strong className="DFGPU_ima">Images:</strong>
                    <ul>
                      {item.image.map((image, index) => (
                        <li key={index}>
                          <img src={require(`../../../../../../../BACKEND/uploads/${image}`)} alt={`Image ${index}`} style={{ maxWidth: '200px', maxHeight: '200px' }} />
                        </li>
                      ))}
                    </ul>
                  </div>
                )}
                <br />
                <p className="DFGPU_date">
                  Created Date: {new Date(item.createdAt).toLocaleDateString()}<br />
                  Created Time: {new Date(item.createdAt).toLocaleTimeString()}<br /><br />
                </p>
                <div className="DFGPU_btn_container"> 
                  <button className="DFGPU_del" onClick={() => handleDelete(item._id)}>Delete</button>
                  <button className="DFGPU_edit" onClick={() => handleEdit(item._id)}>Edit</button>
                </div>
                
              </>
            )}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default UserFeedbackGiftpackage;
