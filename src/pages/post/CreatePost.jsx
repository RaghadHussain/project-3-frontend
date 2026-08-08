import React from 'react'
import { useState } from 'react'
import { createPost } from '../../services/postService'
import { useNavigate } from 'react-router'

function CreatePost() {

  const [formData, setFormData] = useState({
    title: '',
    caption: '',
    image: '',
    category: ''
  })

  const navigate = useNavigate()

  function handleChange(event) {
    setFormData({ ...formData, [event.target.name]: event.target.value })
  }

  function handleImageChange(event) {
    setFormData({ ...formData, image: event.target.files[0] })
  }

  async function handleSubmit(event) {
    event.preventDefault()
    const createdPost = await createPost(formData)
    navigate(`/post/${createdPost._id}`)
  }

  return (
    <div>
      <h1 className='title'>Add New Post</h1>
      <form onSubmit={handleSubmit}>
        <label htmlFor="title">Title: </label>
        <input type="text" name="title" id="title" value={formData.title} onChange={handleChange} />

        <label htmlFor="caption">Caption: </label>
        <textarea name="caption" id="caption" value={formData.caption} onChange={handleChange} />

        <label htmlFor="image">Upload Image: </label>
        <input id="image" name="image" type="file" accept="image/*" onChange={handleImageChange} />

        <label htmlFor="category">Category: </label>
        <select required name="category" id="category" value={formData.category} onChange={handleChange}>
          <option value="">Select A Category</option>
          <option value="fashion">Fashion</option>
          <option value="skincare">Skin Care</option>
          <option value="lifestyle">Lifestyle</option>
          <option value="hobbies">Hobby</option>
        </select>
        <button type="submit">Create Post</button>
      </form>
    </div>
  )
}

export default CreatePost
