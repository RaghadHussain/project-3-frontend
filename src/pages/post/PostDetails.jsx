import { useState, useEffect } from "react";
import { useParams, useNavigate, Link } from "react-router";
import { getPostById, deletePostById } from "../../services/postService";
import { getSavedPosts, saveNewPost, unsavePost } from "../../services/saveService";
import {
  getCommentsByPostId,
  createComment,
  deleteCommentById,
  addReplyToComment,
  deleteReplyById,
} from "../../services/commentService";
import { useAuth } from "../../context/AuthContext";
import getImageUrl from "../../utils/imageUrl";
import "./Post.css";


function PostDetails() {
  const [post, setPost] = useState(null);
  const [saveId, setSaveId] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);

  const [comments, setComments] = useState([]);
  const [newComment, setNewComment] = useState("");

  const [replyingTo, setReplyingTo] = useState(null);
  const [replyText, setReplyText] = useState("");

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
        setError(err.response?.data?.message || "Failed to load post");
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
      setError(err.response?.data?.message || "Failed to delete post");
    }
  }


  async function handleAddComment(event) {
    event.preventDefault();
    if (!newComment.trim()) return;

    try {
      const created = await createComment(id, newComment);
      setComments([{ ...created, sender: user }, ...comments]);
      setNewComment("");
    } catch (err) {
      setError(err.response?.data?.message || "Failed to add comment");
    }
  }

  async function handleDeleteComment(commentId) {
    try {
      await deleteCommentById(commentId);
      setComments(comments.filter((comment) => comment._id !== commentId));
    } catch (err) {
      setError(err.response?.data?.message || "Failed to delete comment");
    }
  }

  function handleReply(commentId) {
    setReplyingTo((prev) => (prev === commentId ? null : commentId));
    setReplyText("");
  }

  async function handleAddReply(event, commentId) {
    event.preventDefault();
    if (!replyText.trim()) return;

    try {
      const updatedComment = await addReplyToComment(commentId, replyText);
      const newReply = updatedComment.replyTo[updatedComment.replyTo.length - 1];

      setComments((prevCom) =>
        prevCom.map((comment) =>
          comment._id === commentId
            ? { ...comment, replyTo: [...(comment.replyTo || []), { ...newReply, sender: user }] }
            : comment
        )
      );
      setReplyText("");
      setReplyingTo(null);
    } catch (err) {
      setError(err.response?.data?.message || "Failed to add reply");
    }
  }

  async function handleDeleteReply(commentId, replyId) {
    try {
      await deleteReplyById(commentId, replyId);
      setComments((prev) =>
        prev.map((comment) =>
          comment._id === commentId
            ? { ...comment, replyTo: comment.replyTo.filter((reply) => reply._id !== replyId) }
            : comment
        )
      );
    } catch (err) {
      setError(err.response?.data?.message || "Failed to delete reply");
    }
  }

  if (loading) return <p>Loading...</p>;
  if (error) {
    return <p className="error">Error: {error}</p>;
  }
  return (
    <div className="post-details-page">
      <>
        <h4>{post.title}</h4>
        {post.image && <img src={getImageUrl(post.image)} alt={post.caption} width="400" />}
        <p>{post.caption}</p>
        <p>Posted by {post.user?.username}</p>

        <div className="post-actions">
          {user && post.user?._id === user._id && (
            <>
              <button onClick={handleDeletePost}>Delete Post</button>
              <Link to={`/post/${post._id}/edit`} className="btn-link">Edit Post</Link>
            </>
          )}
        </div>

        <div className="comments-section">
          <h3>Comments</h3>

          {user && (
            <form onSubmit={handleAddComment}>
              <textarea
                value={newComment}
                onChange={(event) => setNewComment(event.target.value)}
                placeholder="Add a comment..."
                rows="3"
              />
              <button type="submit">Post Comment</button>
            </form>
          )}

          {comments.map((comment) => (
            <div key={comment._id} className="comment">
              <p>
                <Link to={`/${comment.sender._id}`}><strong>{comment.sender?.username}</strong></Link>: {comment.message}
              </p>
              {user && comment.sender?._id === user._id && (
                <button onClick={() => handleDeleteComment(comment._id)}>
                  Delete
                </button>
              )}
              {user && (
                <button onClick={() => handleReply(comment._id)}>
                  Reply
                </button>
              )}

              {replyingTo === comment._id && (
                <form onSubmit={(event) => handleAddReply(event, comment._id)} className="reply-form">
                  <textarea
                    value={replyText}
                    onChange={(event) => setReplyText(event.target.value)}
                    placeholder="Write a reply..."
                    rows="2"
                  />
                  <button type="submit">Send Reply</button>
                </form>
              )}

              {comment.replyTo?.length > 0 && (
                <div className="replies">
                  {comment.replyTo.map((reply) => (
                    <div key={reply._id} className="reply">
                      <p>
                        <Link to={`/${reply.sender._id}`}><strong>{reply.sender?.username}</strong></Link>: {reply.message}
                      </p>
                      {user && reply.sender?._id === user._id && (
                        <button onClick={() => handleDeleteReply(comment._id, reply._id)}>
                          Delete
                        </button>
                      )}
                    </div>
                  ))}
                </div>
              )}
            </div>
          ))}
        </div>
      </>
    </div>
  );
}

export default PostDetails;