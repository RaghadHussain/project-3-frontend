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


/* 

async function getHootById(id) {
    const response = await api.get(`/hoots/${id}`)
    return response.data
} */




/* async function updateHoot(id, body) {
    const response = await api.put(`/hoots/${id}`,body)
    return response.data
}

async function deleteHoot(id) {
    const response = await api.delete(`/hoots/${id}`)
    return response.data
}

async function createComment(id,body) {
    const response = await api.put(`/hoots/${id}/comment`,body)
    return response.data
} */

export{
    createPost,
    getAllPosts
}
export { createPost, getPostById, updatePostById, deletePostById };
