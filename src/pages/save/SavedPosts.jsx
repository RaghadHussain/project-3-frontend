import { useState, useEffect } from "react";
import { Link } from "react-router";
import { getSavedPosts, unsavePost } from "../../services/saveService";
import getImageUrl from "../../utils/imageUrl";
import "./SavedPosts.css";

function SavedPosts() {
  const [savedPosts, setSavedPosts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);

  useEffect(() => {
    document.title = "Saved Posts"
  }, [])


  useEffect(() => {
    async function loadSavedPosts() {
      try {
        setLoading(true);
        setError(false);
        const response = await getSavedPosts();
        setSavedPosts(response);
      } catch (err) {
        setError(err.response?.data?.message || "Something went wrong");
      } finally {
        setLoading(false);
      }
    }

    loadSavedPosts();
  }, []);

  async function handleUnsave(saveId) {
    try {
      await unsavePost(saveId);
      setSavedPosts((prev) => prev.filter((saved) => saved._id !== saveId));
    } catch (err) {
      setError(err.response?.data?.message || "Something went wrong");
    }
  }

  if (loading) return <p>Loading...</p>;
  if (error) return <p className="error">Error: {error}</p>;
  if (savedPosts.length === 0) return <p>No saved posts yet</p>;

  return (
    <div className="saved-posts-page">
      <h1>Saved Posts</h1>
      {savedPosts.map((saved) => (
        <div key={saved._id} className="saved-post-card">
          {saved.post?.image && (
            <img src={getImageUrl(saved.post.image)} alt={saved.post.caption} width="200" />
          )}
          <p>{saved.post?.caption}</p>
          <Link to={`/post/${saved.post?._id}`}>See Post Details</Link>
          <button onClick={() => handleUnsave(saved._id)}>Unsave</button>
        </div>
      ))}
    </div>
  );
}

export default SavedPosts;
