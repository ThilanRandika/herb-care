import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './UnderPackageFeedbacks.css'
import config from "../../../../../config";

// Function to generate star icons based on rating value
const generateStars = (rating) => {
  const stars = [];
  for (let i = 1; i <= 5; i++) {
    if (i <= rating) {
      stars.push(<i className="fas fa-star" key={i}></i>);
    } else {
      stars.push(<i className="far fa-star" key={i}></i>);
    }
  }
  return stars;
};

const FeedbackList = (props) => {
  const [feedbacks, setFeedbacks] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchFeedbacks = async () => {
      try {
        const response = await axios.get(`${config.BASE_URL}/feedbackGiftPackage/singleFeedback/${props.packageId}`);   
        setFeedbacks(response.data);
        setLoading(false);
      } catch (error) {
        setError(error.message);
        setLoading(false);
      }
    };

    fetchFeedbacks();
  }, [props.packageId]);

  return (
    <div className="UPGFAS_containor22">
      <h1 className="UPGFAS_titl">Ratings & Reviews</h1>
      <ul className="UPGFAS_ULLLL">
        {feedbacks && feedbacks.map((feedback) => (
          <li key={feedback._id}>
            <p className="UPGFAS_name">{feedback.Customer.customer_name}</p>
            <p className="UPGFAS_mess">{feedback.message}</p>
            <p className="UPGFAS_rat">{generateStars(feedback.ratings)}</p>
            {feedback.image && feedback.image.map((image, index) => (
              <img className="UPGFAS_im" key={index} src={require(`../../../../../../../BACKEND/uploads/${image}`)} alt={`Image ${index + 1}`} />
            ))}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default FeedbackList;
