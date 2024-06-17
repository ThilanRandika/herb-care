import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './FeedbackSummary.css';
import config from "../../../../../config";

const FeedbackSummaries = () => {
  const [summaries, setSummaries] = useState([]);
  const [currentFeedback, setCurrentFeedback] = useState(0);

  useEffect(() => {
    const fetchFeedbackSummaries = async () => {
      try {
        const response = await axios.get(`${config.BASE_URL}/feedback/feedback-summaries`);
        setSummaries(response.data);
      } catch (error) {
        console.error(error);
      }
    };

    fetchFeedbackSummaries();
  }, []);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentFeedback(currentFeedback => (currentFeedback + 1) % summaries.length);
    }, 5000); // Change feedback every 5 seconds

    return () => clearInterval(interval);
  }, [summaries.length]);

  const renderStars = (rating) => {
    const stars = [];
    for (let i = 1; i <= 5; i++) {
      stars.push(
        <span key={i} className={i <= rating ? 'FHS_star gold' : 'FHS_star'}>
          &#9733;
        </span>
      );
    }
    return stars;
  };

  return (
    <div className='FHS_containor1'>
      <div className='FHS_containor2'>
        {summaries.map((summary, index) => (
          <div key={index} className={`FHS_feedback ${currentFeedback === index ? 'visible' : ''}`}>
            <div className='FHS_image_container'>
                <img className='FHS_image' src={require(`../../../../../../../BACKEND/uploads/${summary.productImage}`)} alt={summary.productName} />
            </div>
            <div className='FHS_content_containor'>
              <p className='FHS_Pname'>{summary.productName}</p>
              <div className='FHS_ratings'>{renderStars(summary.ratings)}</div>
              <p className='FHS_message'>{summary.message}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default FeedbackSummaries;
