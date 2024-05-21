import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './displayUnderProduct.css';

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

  useEffect(() => {
    // Fetch feedbacks for the product
    axios.get(`http://localhost:8070/feedback/feedbacks/${props.productid}`)
      .then(response => {
        setFeedbacks(response.data);
      })
      .catch(error => {
        console.error('Error fetching feedbacks:', error);
      });
  }, [props.productid]);

  return (
    <div className='DIUP_containor1'>
    
      <h3 className='DIUP_title'>Ratings & Reviews</h3>
      <ul className='DIUP_UL'>

        {feedbacks.map(feedback => (

        <li key={feedback._id}>
          <div className='DIUP_containor2'>

          <p className='DIUP_name'>{feedback.Customer.customer_name}</p>
          <p className='DIUP_rate'>{generateStars(feedback.ratings)}</p>
          <p className='message'>{feedback.message}</p>
          
            {feedback.image && feedback.image.length > 0 && (
            <div className='DIUP_imag'>
            {feedback.image.map((image, index) => (
              <img key={index}  src={require(`../../../../../../../BACKEND/uploads/${image}`)} alt={`Image ${index + 1}`} />
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
