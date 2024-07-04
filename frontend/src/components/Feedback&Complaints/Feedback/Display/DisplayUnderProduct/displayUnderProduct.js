import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './displayUnderProduct.css';
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

const FeedbackUnderProduct = (props) => {
  const [feedbacks, setFeedbacks] = useState([]);
  const [ratingsSummary, setRatingsSummary] = useState({ 1: 0, 2: 0, 3: 0, 4: 0, 5: 0 });
  const [averageRating, setAverageRating] = useState(0);
  const [totalRatings, setTotalRatings] = useState(0);

  useEffect(() => {
    // Fetch feedbacks for the product
    axios.get(`${config.BASE_URL}/feedback/feedbacks/${props.productid}`)
      .then(response => {
        setFeedbacks(response.data);
      })
      .catch(error => {
        console.error('Error fetching feedbacks:', error);
      });

    // Fetch ratings summary for the product
    axios.get(`${config.BASE_URL}/feedback/ratings-summary/${props.productid}`)
      .then(response => {
        setRatingsSummary(response.data.ratingsSummary);
        setAverageRating(response.data.averageRating);
        setTotalRatings(response.data.totalRatings);
      })
      .catch(error => {
        console.error('Error fetching ratings summary:', error);
      });
  }, [props.productid]);

  return (
    <div className='DIUP_container'>
      <h3 className='DIUP_title'>Ratings & Reviews</h3>
      <br></br>
      <div className='DIUP_ratings_summary'>
        <div className='DIUP_avg_rating'>
          <h1>{averageRating}</h1>
          <div>
            {generateStars(Math.round(averageRating))}
            <p>{totalRatings} ratings</p>
          </div>
        </div>
        
        <div className='DIUP_ratings_breakdown'>
        
          {Object.keys(ratingsSummary).map(rating => (
            
            <div key={rating} className='DIUP_ratings_row'>
              <div className='DIUP_ratings_stars'>
                {generateStars(parseInt(rating))}
              </div>
              <div className='DIUP_ratings_bar'>
                <div style={{ width: `${(ratingsSummary[rating] / totalRatings) * 50}%` }}></div>
              </div>
              <div className='DIUP_ratings_count'>
                {ratingsSummary[rating]}
              </div>
            </div>
            
          ))}
        </div>
      </div>
      <ul className='DIUP_UL'>
        {feedbacks.map(feedback => (
          <li key={feedback._id}>
            <div className='DIUP_container2'>
              <p className='DIUP_name'>{feedback.Customer.customer_name}</p>
              <p className='DIUP_rate'>{generateStars(feedback.ratings)}</p>
              <p className='message'>{feedback.message}</p>
              {feedback.image && feedback.image.length > 0 && (
                <div className='DIUP_imag'>
                  {feedback.image.map((image, index) => (
                    <img key={index} src={require(`../../../../../../../BACKEND/uploads/${image}`)} alt={`Image ${index + 1}`} />
                  ))}
                </div>
              )}
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default FeedbackUnderProduct;
