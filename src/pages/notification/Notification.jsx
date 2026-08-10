import { useState, useEffect } from "react";
import { getNotifications } from "../../services/notificationService";
import "./Notification.css";

function Notification() {
  const [notifications, setNotifications] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);

  useEffect(() => {
    async function loadNotifications() {
      try {
        setLoading(true);
        setError(false);
        const response = await getNotifications();
        setNotifications(response);
      } catch (err) {
        setError(err.response?.data?.message || "Something went wrong");
      } finally {
        setLoading(false);
      }
    }

    loadNotifications();
  }, []);

  if (loading) return <p>Loading...</p>;
  if (error) return <p className="error">Error: {error}</p>;
  if (notifications.length === 0) return <p>No notifications yet</p>;

  return (
    <div className="notification-page">
      <h1>Notifications</h1>
      {notifications.map((noti) => (
        <div key={noti._id} className="notification-card">
          <h4>{noti.type} Notification</h4>
          <p>
            {noti.type === "comment" && (
              <>
                <strong>{noti.sender?.username}</strong> commented on your post{" "}
                {noti.comment?.message}
              </>
            )}
            {noti.type === "like" && (
              <>
                <strong>{noti.sender?.username}</strong> liked your post
                {noti.post?.title && ` "${noti.post.title}"`}
              </>
            )}
            {noti.type === "follow" && (
              <>
                <strong>{noti.sender?.username}</strong> started following you
              </>
            )}
          </p>
        </div>
      ))}
    </div>
  );
}

export default Notification;
