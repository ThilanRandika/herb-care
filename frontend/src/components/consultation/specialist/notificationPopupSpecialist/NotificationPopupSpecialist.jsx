import './notificationPopupSpecialist.css';

function NotificationPopupSpecialist({ onClose }) {
  const handleClose = (e) => {
    // Check if the target is the close button or the overlay
    if (e.target.classList.contains('notificationPopupSpecialist-close-btn') || e.target.classList.contains('notificationPopupSpecialist-notification-popup-overlay')) {
      onClose();
    }
  };

  return (
    <div className="notificationPopupSpecialist-notification-popup-overlay" onClick={handleClose}>
      <div className="notificationPopupSpecialist-notification-popup" onClick={(e) => e.stopPropagation()}>
        <div className="notificationPopupSpecialist-notification-popup-content">
          <button className="notificationPopupSpecialist-close-btn" onClick={onClose}>Close</button>
          <h3>Notifications</h3>
          sadsadsadasd <br />sadffasdasd <br />assdasdsadsadsadasdadffasdasd assdasdsadsadsadas  sadffasdasd <br />assdasdsadsadsadasd <br />sadffasdasd <br />assdasdsadsadsadasd <br />sadffasdasd <br />assdasd
        </div>
      </div>
    </div>
  );
}

export default NotificationPopupSpecialist;
