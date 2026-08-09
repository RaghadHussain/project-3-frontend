import { useState, useEffect } from "react";
import { getNotifications } from "../../services/notificationService";

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

  function renderMessage(notification) {
    const username = notification.sender?.username;

    if (notification.type === "comment") {
      return (
        <>
          <strong>{username}</strong>: {notification.comment?.message}
        </>
      );
    }

    if (notification.type === "like") {
      return (
        <>
          <strong>{username}</strong> liked ur post
        </>
      );
    }

    if (notification.type === "follow") {
      return (
        <>
          <strong>{username}</strong> follow ur account
        </>
      );
    }

    return <strong>{username}</strong>;
  }

  if (loading) return <p>Loading...</p>;
  if (error) return <p className="error">Error: {error}</p>;
  if (notifications.length === 0) return <p>No notifications yet</p>;

  return (
    <div>
      <h1>Notifications</h1>
      {notifications.map((notification) => (
        <div
          key={notification._id}
          style={{
            border: "1px solid #ddd",
            borderRadius: "8px",
            padding: "10px 14px",
            marginBottom: "8px",
          }}
        >
          <p style={{ margin: 0 }}>{renderMessage(notification)}</p>
        </div>
      ))}
    </div>
  );
}

export default Notification;
