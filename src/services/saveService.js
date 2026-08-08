import api from "./api";

async function getSavedPosts() {
  const response = await api.get("/save");
  return response.data;
}

async function saveNewPost(postId) {
  const response = await api.post("/save", { post: postId });
  return response.data;
}

async function unsavePost(saveId) {
  const response = await api.delete(`/save/${saveId}`);
  return response.data;
}

export { getSavedPosts, saveNewPost, unsavePost };
