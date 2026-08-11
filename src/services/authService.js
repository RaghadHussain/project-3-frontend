
import api from './api'

async function signUp(formData){
    const data = new FormData();
    for (const key in formData) {
        if (formData[key]) data.append(key, formData[key]);
    }
    const response = await api.post('/auth/sign-up', data, {
        headers: { 'Content-Type': 'multipart/form-data' },
    })
}

async function signIn(formData){
    const response = await api.post('/auth/sign-in',formData)
    localStorage.setItem('token', response.data.accessToken);
    return response.data.user
}


async function getCurrentUser(){

    const response = await api.get(
        "/auth/me"
    );


    return response.data;

}

function logout(){

    localStorage.removeItem("token");

}

async function getUserById(id){
    const response = await api.get(`/auth/user/${id}`);
    return response.data;
}

async function followUser(id){
    const response = await api.post(`/auth/user/${id}/follow`);
    return response.data;
}

async function unfollowUser(id){
    const response = await api.post(`/auth/user/${id}/unfollow`);
    return response.data;
}

async function updateUserInfo(id, body){
    const userFormData = new FormData();
    Object.entries(body).forEach(([key, value]) => {
        if (value) userFormData.append(key, value);
    });

    const response = await api.put(`/auth/user/${id}`, userFormData);
    return response.data;
}

async function search(query){
    const response = await api.get(`/auth/search?q=${query}`)
    return response.data
}


export {
  signUp,
  signIn,
  getCurrentUser,
  logout,
  getUserById,
  followUser,
  unfollowUser,
  updateUserInfo,
  search
};

