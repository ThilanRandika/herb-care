import { useContext, useState, useEffect } from 'react';
import { AuthContext } from '../../../../context/AuthContext';
import './notificationPopupSpecialist.css';

function NotificationPopupSpecialist({ onClose, setUnreadNotificationCount }) {
  const { user } = useContext(AuthContext);
  const [notifications, setNotifications] = useState([]);
  const [loading, setLoading] = useState(true); // State to track loading status

  useEffect(() => {
    fetch(`http://localhost:8070/specialistNotifications/all/${user._id}`)
      .then(response => response.json())
      .then(data => {
        setNotifications(data);
        setLoading(false); // Set loading to false when data is fetched
      })
      .catch(error => {
        console.error('Error fetching notifications:', error);
        setLoading(false); // Set loading to false in case of error
      });
  }, [user._id]);

  const handleClose = (e) => {
    if (e.target.classList.contains('notificationPopupSpecialist-close-btn') || e.target.classList.contains('notificationPopupSpecialist-notification-popup-overlay')) {
      onClose();
    }
  };

  const handleMarkAllAsRead = () => {
    fetch(`http://localhost:8070/specialistNotifications/markAllAsRead/${user._id}`, {
      method: 'PUT',
    })
    .then(response => {
      if (response.ok) {
        // Update state to reflect all notifications as read
        setNotifications(notifications.map(notification => ({ ...notification, notificationStatus: 'Read' })));
  
        // Fetch updated unread notifications count
        fetch(`http://localhost:8070/specialistNotifications/unreadCount/${user._id}`)
          .then(response => response.json())
          .then(data => {
            // Update unread notifications count state
            setUnreadNotificationCount(data.unreadCount);
          })
          .catch(error => console.error('Error fetching unread notifications count:', error));
      } else {
        console.error('Failed to mark all notifications as read');
      }
    })
    .catch(error => console.error('Error marking all notifications as read:', error));
  };
  



  // Render loading indicator if loading is true
  if (loading) {
    return (
      <div className="specialistList-loading-container">
        <div className="specialistList-loading-spinner"></div>
        <div>Loading...</div>
      </div>
    );
  }

  // If not loading, render the page
  return (
    <div className="notificationPopupSpecialist-notification-popup-overlay" onClick={handleClose}>
      <div className="notificationPopupSpecialist-notification-popup" onClick={(e) => e.stopPropagation()}>
        <div className="notificationPopupSpecialist-notification-popup-content">
          <button className="notificationPopupSpecialist-close-btn" onClick={onClose}>Close</button>
          <h3>Notifications</h3>
          <div className="notificationPopupSpecialist-notificationsList">
            {notifications.map(notification => (
              <div key={notification._id} className={`notificationPopupSpecialist-notification-card ${notification.notificationStatus === 'Read' ? 'notificationPopupSpecialist-notification-card-read' : ''}`}>
                <div className="notificationPopupSpecialist-notification-cardinotification-DateAndTime">
                  <p>{new Date(notification.notificationDateTime).toLocaleDateString()} {new Date(notification.notificationDateTime).toLocaleTimeString()}</p>
                </div>
                <div className="notificationPopupSpecialist-notification-appointment-details">
                  <p>{notification.notificationBody}</p>
                  <div className="notificationPopupSpecialist-notification-card-dateAndTime">
                    <p>Appointment date : {new Date(notification.appointmentDate).toLocaleDateString()}</p>
                    <p>Appointment time : {notification.appointmentTime}</p>
                  </div>
                  <p>Appointment type : {notification.appointmentType}</p>
                </div>
              </div>
            ))}
          </div>
          <button className="notificationPopupSpecialist-mark-all-btn" onClick={handleMarkAllAsRead}>Mark All as Read</button>
        </div>
      </div>
    </div>
  );
}

export default NotificationPopupSpecialist;
