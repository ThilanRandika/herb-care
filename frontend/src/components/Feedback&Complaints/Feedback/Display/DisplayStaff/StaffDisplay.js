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

const downloadFeedbacksPdf = async () => {
  try {
    const response = await axios.get('http://localhost:8070/feedback/download', {
      responseType: 'blob', 
    });
    const url = window.URL.createObjectURL(new Blob([response.data]));
    const link = document.createElement('a');
    link.href = url;
    link.setAttribute('download', 'feedbacks.pdf');
    document.body.appendChild(link);
    link.click();
    link.parentNode.removeChild(link);
  } catch (error) {
    console.error('Error downloading PDF:', error);
  }
};

const StaffDashboard = () => {
  const [feedbacks, setFeedbacks] = useState([]);
  const [count, setCount] = useState(0);
  const [searchQuery, setSearchQuery] = useState("");

  const searchFeedbacks = (feedback) => {
    if (!searchQuery) {
      return true; // Show all feedbacks if search query is empty
    }

    const customerName = feedback.Customer.customer_name.toLowerCase();
    return customerName.includes(searchQuery.toLowerCase());
  };

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

  // Omitted code for brevity

return (
  <div>
    <div className='FSD_title_card'>
       <h1 className='FSD_title'>Feedback List</h1>
       <p className='FSD_title'>Manage the feedbacks</p>
    </div>
    <br></br>

    <input className='FSD_searchfeedback' type="text" placeholder="Search customer...." value={searchQuery} onChange={(e) => setSearchQuery(e.target.value)}/>
    
    <button className='FSD_download_feedback_btn' onClick={downloadFeedbacksPdf}>Download Report</button>
    <div>
      <h1 className='FSD_count'>Total Feedbacks: {count}</h1>
    </div>
    <table className='FSD_table'>
      <thead>
        <tr>
          <th>Customer</th>
          <th>Ratings</th>
          <th>Message</th>
          <th>Images</th>
          <th>Droped <br></br>Date & Time</th>
          <th>Updated <br></br>Date & Time</th>
          <th>Action</th>
        </tr>
      </thead>
      <tbody>
        {feedbacks.filter(searchFeedbacks).map((feedback) => (
          <tr key={feedback._id}>
            <td>{feedback.Customer.customer_name}</td>
            <td><StarRating rating={feedback.ratings} /></td>
            <td>{feedback.message}</td>
            <td>
              {feedback.image ? (
                <div className='FSD_image'>
                  {feedback.image.map((img, index) => (
                    <img
                      key={index}
                      src={require(`../../../../../../../BACKEND/uploads/${img}`)}
                      alt={`Image ${index}`}
                      style={{ maxWidth: '100px', maxHeight: '100px', marginRight: '10px' }}
                    />
                  ))}
                </div>
              ) : (
                <span>No images</span>
              )}
            </td>
            <td>
              {new Date(feedback.createdAt).toLocaleDateString()}<br />
              {new Date(feedback.createdAt).toLocaleTimeString()}
            </td>
            <td>
              {feedback.updatedAt ? (
              <>
                  {new Date(feedback.updatedAt).toLocaleDateString()}<br />
                  {new Date(feedback.updatedAt).toLocaleTimeString()}
              </>
              ) : (
                <span>Not updated</span>
              )}
            </td>

            <td><button className='FSD_deletebtn' onClick={() => deleteFeedback(feedback._id)}>Delete</button></td>
          </tr>
        ))}
      </tbody>
    </table>
  </div>
);

};

export default StaffDashboard;
