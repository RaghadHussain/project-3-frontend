import { useState, useEffect } from 'react'
import { getAllPosts } from '../../services/postService'
import { Link } from 'react-router'

function Explore() {

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
        </div>
      ))}
    </div>
  )
}

export default Explore
