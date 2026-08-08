import { useState, useEffect } from "react";
import { useParams, useNavigate, Link } from "react-router";
import { getPostById, deletePostById } from "../../services/postService";
import {
  getSavedPosts,
  saveNewPost,
  unsavePost,
} from "../../services/saveService";
import {
  getCommentsByPostId,
  createComment,
  deleteCommentById,
} from "../../services/commentService";
import { useAuth } from "../../context/AuthContext";

function PostDetails() {
  const [post, setPost] = useState(null);
  const [saveId, setSaveId] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);

  const [comments, setComments] = useState([]);
  const [newComment, setNewComment] = useState("");

  const { user } = useAuth();
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

        const postComments = await getCommentsByPostId(id);
        setComments(postComments);
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

  async function handleAddComment(evt) {
    evt.preventDefault();
    if (!newComment.trim()) return;

    try {
      const created = await createComment(id, newComment);
      setComments([{ ...created, sender: user }, ...comments]);
      setNewComment("");
    } catch (err) {
      setError(err.response.data.message);
    }
  }

  async function handleDeleteComment(commentId) {
    try {
      await deleteCommentById(commentId);
      setComments(comments.filter((comment) => comment._id !== commentId));
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

        <div className="comments-section">
          <h3>Comments</h3>

          {user && (
            <form onSubmit={handleAddComment}>
              <p>{user.username}</p>
              <textarea
                value={newComment}
                onChange={(evt) => setNewComment(evt.target.value)}
                placeholder="Add a comment..."
                rows="3"
              />
              <button type="submit">Post Comment</button>
            </form>
          )}

          {comments.map((comment) => (
            <div key={comment._id} className="comment">
              <p>
                <strong>{comment.sender?.username}</strong>: {comment.message}
              </p>
              {user && comment.sender?._id === user._id && (
                <button onClick={() => handleDeleteComment(comment._id)}>
                  Delete
                </button>
              )}
            </div>
          ))}
        </div>
      </>
    </div>
  );
}

export default PostDetails;
