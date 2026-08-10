import { useState, useEffect } from 'react'
import { getAllPosts, likePost, unlikePost } from '../../services/postService'
import { getSavedPosts, saveNewPost, unsavePost } from '../../services/saveService'
import { Link } from 'react-router'
import { useAuth } from '../../context/AuthContext'
import getImageUrl from '../../utils/imageUrl'
import './Post.css'

function Explore() {
  const { user } = useAuth()

  const [posts, setPosts] = useState([])
  const [savedPosts, setSavedPosts] = useState([])


  useEffect(() => {
    async function loadPosts() {
      try {
        const response = await getAllPosts()
        setPosts(response)

        const savedResponse = await getSavedPosts()
        setSavedPosts(savedResponse)
      } catch (e) {
        console.log(e)
      }
    }

    loadPosts()
  }, [])

  function isPostSaved(onePost) {
    return savedPosts.some(
      (saved) => saved.post?._id === onePost._id && saved.user?._id === user._id
    )
  }

  async function handleLike(onePost) {
    const alreadyLiked = onePost.likes.some((oneId) => oneId === user._id)

    const updatedPost = alreadyLiked
      ? await unlikePost(onePost._id)
      : await likePost(onePost._id)

    setPosts((prevPosts) =>
      prevPosts.map((p) => (p._id === updatedPost._id ? updatedPost : p))
    )
  }

  async function handleSave(onePost) {
    try {
      const saved = await saveNewPost(onePost._id)
      setSavedPosts((prev) => [
        ...prev,
        { _id: saved._id, post: { _id: onePost._id }, user: { _id: user._id } },
      ])
    } catch (e) {
      console.log(e)
    }
  }

  async function handleUnsave(onePost) {
    try {
      const existingSave = savedPosts.find(
        (saved) => saved.post?._id === onePost._id && saved.user?._id === user._id
      )
      if (!existingSave) return

      await unsavePost(existingSave._id)
      setSavedPosts((prev) => prev.filter((saved) => saved._id !== existingSave._id))
    } catch (e) {
      console.log(e)
    }
  }

  return (
    <div className="explore-page">
      {posts.map(onePost => {
        const saved = isPostSaved(onePost)
        return (
          <div key={onePost._id} className="post-card">
            <Link to={`/${onePost.user._id}`}><h4>{onePost.user.username}</h4></Link>
            {onePost.category && <p>{onePost.category}</p>}
            <h2>{onePost.title}</h2>
            {onePost.image && <img src={getImageUrl(onePost.image)} alt={onePost.title} width="200" />}
            <p>{onePost.caption}</p>
            <p>Created At: {new Date(onePost.createdAt).getFullYear()}/{new Date(onePost.createdAt).getMonth()}/{new Date(onePost.createdAt).getDate()}</p>
            <button onClick={() => handleLike(onePost)}>
              <span style={{ color: onePost.likes.some((oneId) => oneId === user._id) ? 'red' : 'gray' }}>❤︎⁠</span>
            </button>
            <button
              onClick={() => handleSave(onePost)}
              style={{ display: saved ? 'none' : 'inline-block' }}
            >
              Save
            </button>
            <button
              onClick={() => handleUnsave(onePost)}
              style={{ display: saved ? 'inline-block' : 'none' }}
            >
              Unsave
            </button>
            <Link to={`/post/${onePost._id}`}>💬</Link>
          </div>
        )
      })}
    </div>
  )
}

export default Explore
