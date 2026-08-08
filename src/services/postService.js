import api from "./api";
import axios from "axios";

async function createPost(body) {
  const postFormData = new FormData();
  Object.entries(body).forEach(([key, value]) => {
    if (value) postFormData.append(key, value);
  });

  const response = await api.post("/post", postFormData);
  return response.data;
}

async function getPostById(id) {
  const response = await api.get(`/post/${id}`);
  return response.data;
}

async function updatePostById(id, body) {
  const postFormData = new FormData();
  Object.entries(body).forEach(([key, value]) => {
    if (value) postFormData.append(key, value);
  });

  const response = await api.put(`/post/${id}`, postFormData);
  return response.data;
}

async function deletePostById(id) {
  const response = await api.delete(`/post/${id}`);
  return response.data;
}

async function getAllPosts(){
    const response = await api.get('/post')
    return response.data
}

async function likePost(id) {
    const response = await api.post(`/post/like/${id}`)
    return response.data
}

async function unlikePost(id) {
    const response = await api.post(`/post/${id}/unlike`)
    return response.data
}


export {
    createPost,
    getAllPosts,
    getPostById,
    updatePostById,
    deletePostById,
    likePost,
    unlikePost
};
