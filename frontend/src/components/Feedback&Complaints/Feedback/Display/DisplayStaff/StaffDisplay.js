import React, { useEffect, useState } from 'react';
import axios from 'axios';
import './StaffDisplay.css';

const StarRating = ({ rating }) => {
  const stars = [];
  for (let i = 1; i <= 5; i++) {
    stars.push(<span key={i} className={i <= rating ? 'fas fa-star gold' : 'far fa-star gold'} />);
  }
  return <div>{stars}</div>;
};


const StaffDashboard = () => {
  const [feedbacks, setFeedbacks] = useState([]);
  const [count, setCount] = useState(0);

  useEffect(() => {
    const fetchFeedbacks = async () => {
      try {
        const response = await axios.get('http://localhost:8070/feedback/');
        if (response.data && response.data.feedbacks) {
          setFeedbacks(response.data.feedbacks);
        } else {
          console.error('Invalid data format received from the server');
        }
      } catch (error) {
        console.error('Error fetching feedbacks:', error);
      }
    };

    fetchFeedbacks();
  }, []);
  
  useEffect(() => {
    axios.get('http://localhost:8070/feedback/count')
      .then(response => {
        setCount(response.data.count);
      })
      .catch(error => {
        console.error('Error fetching feedback count:', error);
      });
  }, []);

  const deleteFeedback = async (id) => {
    try {
      await axios.delete(`http://localhost:8070/feedback/delete/${id}`);
      setFeedbacks((prevFeedbacks) => prevFeedbacks.filter((feedback) => feedback._id !== id));
      setCount((prevCount) => prevCount - 1); // Decrement the count by 1
    } catch (error) {
      console.error('Error deleting feedback:', error);
    }
  };

  return (
    <div>
      <h1 className='FSD_title'>Feedbacks Lists</h1>
      <div>
        <h1 className='FSD_count'>Total Feedbacks: {count}</h1>
      </div>
      <div className='FSD_containor1'>
        {feedbacks.map((feedback) => (
          <div key={feedback._id} style={{ marginBottom: '20px' }} className='FSD_comntainor2'>
            <h3 className='FSD_cusName'>Customer: {feedback.Customer.name}</h3>
            <p className='FSD_ratings'>Ratings: <StarRating rating={feedback.ratings} /></p>
            <p className='FSD_message'>Message: {feedback.message}</p>
            <p className='FSD_image'>
              Images:{' '}
              {feedback.image ? (
                <div>
                  {feedback.image.map((img, index) => (
                    <img
                      key={index}
                      src={img}
                      alt={`Image ${index}`}
                      style={{ maxWidth: '100px', maxHeight: '100px', marginRight: '10px' }}
                    />
                  ))}
                </div>
              ) : (
                <span>No images</span>
              )}
            </p>
            <p className='FSD_date'>
              Date: {new Date(feedback.createdAt).toLocaleDateString()} <br/>
              Time: {new Date(feedback.createdAt).toLocaleTimeString()} <br/><br></br>
              {feedback.updatedAt && (
                <>
                  Updated Date: {new Date(feedback.updatedAt).toLocaleDateString()} <br/>
                  Updated Time: {new Date(feedback.updatedAt).toLocaleTimeString()}
                </>
              )}
            </p>
            <button className='FSD_deletebtn' onClick={() => deleteFeedback(feedback._id)}>Delete</button>
          </div>
        ))}
      </div>
    </div>
  );
};

export default StaffDashboard;
