import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './UserDisplay.css'
import UpdateFeedback from '../../EditFeedbackUser/UpdateFeedback';
import config from "../../../../../config";

const StarRating = ({ rating }) => {
  const stars = [];
  for (let i = 1; i <= 5; i++) {
    if (i <= rating) {
      stars.push(<span key={i} className="FUD_star1" >&#9733;</span>);
    } else {
      stars.push(<span key={i} className="FUD_star2" >&#9734;</span>);
    }
  }
  return <div>{stars}</div>;
};

const UserFeedback = ({ customerId }) => {
  const [feedback, setFeedback] = useState([]);
  const [editingFeedbackId, setEditingFeedbackId] = useState(null);

  const fetchFeedbacks = async () => {
    try {
      const response = await axios.get(`${config.BASE_URL}/feedback/get`);
      console.log(response.data);
      setFeedback(response.data);
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    fetchFeedbacks();
  }, []); // Add customerId to the dependency array if needed

  const handleDelete = async (feedbackId) => {
    try {
      await axios.delete(`${config.BASE_URL}/feedback/delete/${feedbackId}`);
      setFeedback((prevFeedback) => prevFeedback.filter((item) => item._id !== feedbackId));
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

  return (
    <div>
      <div className='FUD_history_card'>
          <h2 className='FUD_history'>Feedback History</h2>
          <p className='FUD_history'>Manage your submitted feedbacks</p>

      </div>
      
      <br></br>
      <ul className='FUD_containor'>
        {feedback.map((item) => (
          <li key={item._id} className='FUD_containor2'>
            {editingFeedbackId === item._id ? (
              <UpdateFeedback
                feedbackId={item._id}
                ratings={item.ratings}
                message={item.message}
                image={item.image}
                onUpdate={handleUpdate}
              />
            ) : (
              <>
                <strong className='FUD_ratings'>Ratings:</strong> <StarRating rating={item.ratings} /><br />
                <strong className='FUD_message'>Message:</strong> <br></br> {item.message}<br /><br/>
                {item.image && item.image.length > 0 && (
                  <div>
                    <strong className='FUD_image'>Images:</strong>
                    <ul>
                      {item.image.map((image, index) => (
                        <li key={index}>
                          <img src={require(`../../../../../../../BACKEND/uploads/${image}`)} alt={`Image ${index}`} style={{ maxWidth: '200px', maxHeight: '200px' }} />
                        </li>
                      ))}
                    </ul>
                  </div>
                )}
                <br/>
                <p className='FUD_date'>
                  Created Date: {new Date(item.createdAt).toLocaleDateString()} <br/>
                  Created Time: {new Date(item.createdAt).toLocaleTimeString()} <br/><br></br>
              </p>
              <div className="FUD_btn_container">
                <button className="FUD_deleteBtn" onClick={() => handleDelete(item._id)}>Delete</button>
                <button className="FUD_editBtn" onClick={() => handleEdit(item._id)}>Edit</button>
              </div>
                
              </>
            )}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default UserFeedback;
