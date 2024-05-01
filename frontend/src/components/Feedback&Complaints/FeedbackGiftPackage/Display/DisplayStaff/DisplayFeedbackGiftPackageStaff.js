import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './DisplayFeedbackGiftPackageStaff.css';

const StarRating = ({ rating }) => {
  const stars = [];
  for (let i = 1; i <= 5; i++) {
    stars.push(<span key={i} className={i <= rating ? 'fas fa-star gold' : 'far fa-star gold'} />);
  }
  return <div>{stars}</div>;
};

const AdminFeedbackList = () => {
  const [feedbacks, setFeedbacks] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [feedbacksCount, setFeedbacksCount] = useState(0);

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
        const response = await axios.get('http://localhost:8070/feedbackgiftpackage/all');
        setFeedbacks(response.data.feedbacks);
      } catch (error) {
        console.error('Error fetching feedbacks:', error);
      }
    };

    fetchFeedbacks();
  }, []);

  useEffect(() => {
    const fetchFeedbacksCount = async () => {
      try {
        const response = await axios.get('http://localhost:8070/feedbackgiftpackage/count');
        setFeedbacksCount(response.data.count);
      } catch (error) {
        console.error('Error fetching feedbacks count:', error);
      }
    };

    fetchFeedbacksCount();

    // Fetch feedback count every 10 seconds
    const interval = setInterval(fetchFeedbacksCount, 10000);

    // Clear interval on component unmount
    return () => clearInterval(interval);
  }, []);

  const handleDeleteFeedback = async (id) => {
    try {
      await axios.delete(`http://localhost:8070/feedbackgiftpackage/delete/${id}`);
      setFeedbacks((prevFeedbacks) => prevFeedbacks.filter((feedback) => feedback._id !== id));
    } catch (error) {
      console.error('Error deleting feedback:', error);
    }
  };

  const handleDownloadPDF = async () => {
    try {
      const response = await axios.get('http://localhost:8070/feedbackgiftpackage/download', { responseType: 'blob' });
      const url = window.URL.createObjectURL(new Blob([response.data]));
      const link = document.createElement('a');
      link.href = url;
      link.setAttribute('download', 'GiftPackageFeedbacks.pdf');
      document.body.appendChild(link);
      link.click();
    } catch (error) {
      console.error('Error downloading PDF:', error);
    }
  };

  return (
    <div>
      <br />
      <h1 className='DFGPST_title'>Gift Packages Feedbacks List </h1>
      <br />
      <input className='DFGPST_searchfeedback' type="text" placeholder="Search customer...." value={searchQuery} onChange={(e) => setSearchQuery(e.target.value)}/>
      <button className='DFGPST_pdfdownloadbtn' onClick={handleDownloadPDF}>Download PDF</button>

      <h1>Total Feedbacks : {feedbacksCount}</h1>
      <table className='DFGPST_table'>
        <thead>
          <tr>
            <th>Customer</th>
            <th>Ratings</th>
            <th>Message</th>
            <th>Images</th>
            <th>Date & Time</th>
            <th>Updated <br></br>Date & Time</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {feedbacks.filter(searchFeedbacks).map((feedback) => (
            <tr key={feedback._id}>
              <td>{feedback.Customer.customer_name}</td>
              <td><StarRating rating={feedback.ratings} /></td>
              <td>{feedback.message}</td>
              <td>
                {feedback.image.length > 0 ? (
                  <div className='DFGPST_image'>
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
              <td>
                <button className='DFGPST_deletebtn' onClick={() => handleDeleteFeedback(feedback._id)}>Delete</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default AdminFeedbackList;
