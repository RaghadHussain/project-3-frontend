import api from "./api";

async function getCommentsByPostId(postId) {
  const response = await api.get(`/comment/${postId}`);
  return response.data;
}

async function createComment(postId, message) {
  const response = await api.post("/comment", { post: postId, message });
  return response.data;
}

async function deleteCommentById(commentId) {
  const response = await api.delete(`/comment/${commentId}`);
  return response.data;
}

export { getCommentsByPostId, createComment, deleteCommentById };
