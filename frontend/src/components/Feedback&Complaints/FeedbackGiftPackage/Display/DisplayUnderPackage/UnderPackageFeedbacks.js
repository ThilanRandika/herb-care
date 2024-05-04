import React, { useState, useEffect } from 'react';
import axios from 'axios';

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
        const response = await axios.get(`http://localhost:8070/feedbacksGiftPackage/single/${props.productid}`);
        setFeedbacks(response.data);
        setLoading(false);
      } catch (error) {
        setError(error.message);
        setLoading(false);
      }
    };

    fetchFeedbacks();
  }, [props.productid]);

  return (
    <div>
      <h1>Ratings & Reviews</h1>
      
      <ul>
        {feedbacks && feedbacks.map((feedback) => (
          <li key={feedback._id}>
            <p>Customer Name: {feedback.Customer?.customer_name}</p>
            <p>Feedback: {feedback.message}</p>
            <p>Ratings: {generateStars(feedback.ratings)}</p>
            {feedback.image && feedback.image.map((image, index) => (
              <img key={index} src={`http://localhost:8070/uploads/${image}`} alt={`Image ${index + 1}`} />
            ))}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default FeedbackList;
