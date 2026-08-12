import { useState } from "react";
import { Route, Routes } from "react-router";
import Navbar from "./components/Navbar";
import SignupPage from "./pages/SignupPage";
import Homepage from "./pages/Homepage";
import SignInPage from "./pages/SigninPage";
import Dashboard from "./pages/Dashboard";
import { useEffect } from "react";
import { getCurrentUser, logout } from "./services/authService";
import ProtectedRoute from "./components/ProtectedRoute";
import { useAuth } from "./context/AuthContext";
import CreatePost from "./pages/Post/CreatePost";
import SavedPosts from "./pages/save/SavedPosts";
import Notification from "./pages/Notification/Notification";
import Profile from "./pages/profile/Profile";
import PostDetails from "./pages/Post/PostDetails";
import EditPost from "./pages/Post/EditPost";
import Explore from "./pages/Post/Explore";
import EditProfile from "./pages/profile/EditProfile";
import FollowList from "./pages/profile/FollowList";
import NotFoundPage from "./pages/NotFoundPage";

function App() {
  return (
    <div>
      <Navbar />
      <Routes>
        <Route path="/" element={<Homepage />} />
        <Route path="/sign-up" element={<SignupPage />} />
        <Route path="/sign-in" element={<SignInPage />} />
        <Route path="/explore" element={<Explore />} />
        <Route path="/dashboard" element={<ProtectedRoute><Dashboard /></ProtectedRoute>} />
        <Route path="/post/new" element={<ProtectedRoute><CreatePost /></ProtectedRoute>} />
        <Route path="/post/save" element={<ProtectedRoute><SavedPosts /></ProtectedRoute>} />
        <Route path="/post/:id" element={<ProtectedRoute><PostDetails /></ProtectedRoute>} />
        <Route path="/post/:id/edit" element={<ProtectedRoute><EditPost /></ProtectedRoute>} />
        <Route path="/notification" element={<ProtectedRoute><Notification /></ProtectedRoute>} />
        <Route path="/:id" element={<ProtectedRoute><Profile /></ProtectedRoute>} />
        <Route path="/:id/edit" element={<ProtectedRoute><EditProfile /></ProtectedRoute>} />
        <Route path="/:id/followers" element={<ProtectedRoute><FollowList type="followers" /></ProtectedRoute>} />
        <Route path="/:id/following" element={<ProtectedRoute><FollowList type="following" /></ProtectedRoute>} />
        <Route path="*" element={<NotFoundPage/>}/>

      </Routes>
    </div>
  );
}

export default App;
