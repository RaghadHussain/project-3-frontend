import { useState, useEffect } from "react";
import { useParams, useNavigate, Link } from "react-router";
import { getPostById, deletePostById } from "../../services/postService";
import {
  getSavedPosts,
  saveNewPost,
  unsavePost,
} from "../../services/saveService";

function PostDetails() {
  const [post, setPost] = useState(null);
  const [saveId, setSaveId] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);

  const navigate = useNavigate();

  const { id } = useParams();

  useEffect(() => {
    async function loadPostDetails() {
      try {
        setLoading(true);
        setError(false);
        const response = await getPostById(id);
        setPost(response);

        const savedPosts = await getSavedPosts();
        const existingSave = savedPosts.find((saved) => saved.post?._id === id);
        setSaveId(existingSave ? existingSave._id : null);
      } catch (err) {
        setError(err.response.data.message);
      } finally {
        setLoading(false);
      }
    }
    loadPostDetails();
  }, []);

  async function handleDeletePost() {
    try {
      await deletePostById(id);
      navigate("/explore");
    } catch (err) {
      setError(err.response.data.message);
    }
  }

  async function handleSavePost() {
    try {
      if (saveId) {
        await unsavePost(saveId);
        setSaveId(null);
      } else {
        const saved = await saveNewPost(id);
        setSaveId(saved._id);
      }
    } catch (err) {
      setError(err.response.data.message);
    }
  }

  if (loading) return <p>Loading...</p>;
  if (error) {
    return <p className="error">Error: {error}</p>;
  }
  return (
    <div>
      <>
        {post.image && <img src={post.image} alt={post.caption} width="400" />}
        <p>{post.caption}</p>
        <p>Posted by {post.user?.username}</p>
        <button onClick={handleDeletePost}>Delete Post</button>
        <Link to={`/post/${post._id}/edit`}>Edit Post</Link>
        <button onClick={handleSavePost}>{saveId ? "Unsave" : "Save"}</button>
      </>
    </div>
  );
}

export default PostDetails;
