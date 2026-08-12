import { useState, useEffect } from 'react'
import { useParams, Link } from 'react-router'
import { getUserById, followUser, unfollowUser } from '../../services/authService'
import { useAuth } from '../../context/AuthContext'
import { getUserPosts } from '../../services/postService'
import getImageUrl from '../../utils/imageUrl'
import './Profile.css'
import { IoChatbubbleOutline } from "react-icons/io5";

function Profile() {
  const { user } = useAuth()
  const { id } = useParams()

  const [info, setInfo] = useState(null)
  const [error, setError] = useState(null)
  const [loading, setLoading] = useState(true)
  const [post, setPost] = useState([])



  useEffect(() => {
    async function loadInfo() {
      try {
        setLoading(true)
        setError(false)

        const userInfo = await getUserById(id)
        const userPosts = await getUserPosts(id)

        setInfo(userInfo)
        setPost(userPosts)
      } catch (e) {
        console.log(e)
        setError('Failed to Load Profile Information!')
      } finally {
        setLoading(false)
      }
    }
    loadInfo()
  }, [id])

  async function handleFollow() {
    try {
      const isFollowing = info.followers.some((oneId) => oneId === user._id)

      const updatedUser = isFollowing
        ? await unfollowUser(id)
        : await followUser(id)

      setInfo(updatedUser)
    } catch (e) {
      console.log(e)
      setError('Failed to Follow/ Unfollow User!')
    }
  }

  if (loading) return <p>Loading...</p>
  if (error) return <p>{error}</p>

  const userProfile = user && user._id === info._id
  const isFollowing = user && info.followers.some((oneId) => oneId === user._id)

  return (
    <div className="profile-page">
      <h4>{info.username}</h4>
      {info.profileImage && <img src={getImageUrl(info.profileImage)} alt={info.username} width="200" />}
      <p>{info.bio}</p>
      <div>
        <Link to={`/${id}/followers`}>{info.followers.length} Followers</Link>{" "}
        <Link to={`/${id}/following`}>{info.followings.length} Following</Link>
      </div>

      {!userProfile && user && (
        <button onClick={handleFollow}>
          {isFollowing ? "Unfollow" : "Follow"}
        </button>
      )}
      {userProfile && <Link to={`/${id}/edit`}>Edit Profile</Link>}

      <div>
        {post.map(onePost => (
          <div key={onePost._id} className="profile-post-card">
            <Link to={`/${onePost.user._id}`}><h4>{onePost.user.username}</h4></Link>
            {onePost.category && <p>{onePost.category}</p>}
            <h2>{onePost.title}</h2>
            {onePost.image && <img src={getImageUrl(onePost.image)} alt={onePost.title} width="200" />}
            <p>{onePost.caption}</p>
            <p>Created At: {new Date(onePost.createdAt).getFullYear()}/{new Date(onePost.createdAt).getMonth()}/{new Date(onePost.createdAt).getDate()}</p>
            <Link to={`/post/${onePost._id}`}><IoChatbubbleOutline /></Link>
          </div>
        ))}
      </div>
    </div>
  )
}

export default Profile