import { useState, useEffect } from 'react'
import { getAllPosts, likePost, unlikePost } from '../../services/postService'
import { Link } from 'react-router'
import { useAuth } from '../../context/AuthContext'

function Explore() {
  const { user } = useAuth()

  const [posts, setPosts] = useState([])


  useEffect(() => {
    async function loadPosts() {
      try {
        const response = await getAllPosts()
        setPosts(response)
      } catch (e) {
        console.log(e)
      }
    }

    loadPosts()
  }, [])

  async function handleLike(onePost) {
    const alreadyLiked = onePost.likes.some((oneId) => oneId === user._id)

    const updatedPost = alreadyLiked
      ? await unlikePost(onePost._id)
      : await likePost(onePost._id)

    setPosts((prevPosts) =>
      prevPosts.map((p) => (p._id === updatedPost._id ? updatedPost : p))
    )
  }

  return (
    <div>
      {posts.map(onePost => (
        <div key={onePost._id}>
          <h4>{onePost.user.username}</h4>
          {onePost.category && <p>{onePost.category}</p>}
          <h2>{onePost.title}</h2>
          {onePost.image && <img src={onePost.image} alt={onePost.title} width="200" />}
          <p>{onePost.caption}</p>
          <p>Created At: {new Date(onePost.createdAt).getFullYear()}/{new Date(onePost.createdAt).getMonth()}/{new Date(onePost.createdAt).getDate()}</p>
          <Link to={`/post/${onePost._id}`}>💬</Link>
          <button onClick={() => handleLike(onePost)}>
            <span style={{ color: onePost.likes.some((oneId) => oneId === user._id) ? 'red' : 'gray' }}>❤︎⁠</span>
          </button>
        </div>
      ))}
    </div>
  )
}

export default Explore
