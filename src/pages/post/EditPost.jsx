import React from 'react'
import { useState, useEffect } from 'react'
import { getPostById, updatePostById } from '../../services/postService'
import { useNavigate, useParams } from 'react-router'

function EditPost() {

  const { id } = useParams()
  const navigate = useNavigate()

  const [formData, setFormData] = useState({
    title: '',
    caption: '',
    image: '',
    category: ''
  })
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(false)

  useEffect(() => {
    async function loadPost() {
      try {
        setLoading(true)
        const post = await getPostById(id)
        setFormData(post)
      } catch (e) {
        setError(e.response?.data?.message)
      } finally {
        setLoading(false)
      }
    }
    loadPost()
  }, [id])

  function handleChange(event) {
    setFormData({ ...formData, [event.target.name]: event.target.value })
  }

  function handleImageChange(event) {
    setFormData({ ...formData, image: event.target.files[0] })
  }

  async function handleSubmit(event) {
    event.preventDefault()
    try {
      await updatePostById(id, formData)
      navigate(`/post/${id}`)
    } catch (e) {
      setError(e.response?.data?.message)
    }
  }

  if (loading) return <p>Loading...</p>
  if (error) return <p className='error'>Error: {error}</p>

  return (
    <div>
      <h1 className='title'>Edit Post</h1>
      <form onSubmit={handleSubmit}>
        <label htmlFor="title">Title: </label>
        <input type="text" name="title" id="title" value={formData.title} onChange={handleChange} />

        <label htmlFor="caption">Caption: </label>
        <textarea name="caption" id="caption" value={formData.caption} onChange={handleChange} />

        {formData.image && <img src={formData.image} alt={formData.title} width="200" />}
        <label htmlFor="image">Change Image: </label>
        <input id="image" name="image" type="file" accept="image/*" onChange={handleImageChange} />

        <label htmlFor="category">Category: </label>
        <select required name="category" id="category" value={formData.category} onChange={handleChange}>
          <option value="">Select A Category</option>
          <option value="fashion">Fashion</option>
          <option value="skincare">Skin Care</option>
          <option value="lifestyle">Lifestyle</option>
          <option value="hobbies">Hobby</option>
        </select>
        <button type="submit">Save Changes</button>
      </form>
    </div>
  )
}

export default EditPost
