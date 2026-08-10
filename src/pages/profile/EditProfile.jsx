import { useState, useEffect } from 'react'
import { useNavigate, useParams } from 'react-router'
import { getUserById, updateUserInfo } from '../../services/authService'
import getImageUrl from '../../utils/imageUrl'
import './EditProfile.css'

function EditProfile() {

    const { id } = useParams()
    const navigate = useNavigate()

    const [formData, setFormData] = useState({
        username: '',
        bio: '',
        profileImage: '',
        followers: [],
        followings: []
    })

    const [error, setError] = useState(false)
    const [loading, setLoading] = useState(true)

    useEffect(() => {
        async function loadInfo() {
            try {
                setLoading(true)
                const response = await getUserById(id)
                setFormData(response)
            } catch (e) {
                setError(e.response?.data?.message || 'Something went wrong')
            } finally {
                setLoading(false)
            }
        }
        loadInfo()
    }, [id])

    function handleChange(event) {
        setFormData({ ...formData, [event.target.name]: event.target.value })
    }

    function handleImageChange(event) {
        setFormData({ ...formData, profileImage: event.target.files[0] })
    }

    async function handleSubmit(event) {
        event.preventDefault()
        try {
            await updateUserInfo(id, formData)
            navigate(`/${id}`)
        } catch (e) {
            setError(e.response?.data?.message)
        }
    }

    if (loading) return <p>Loading...</p>
    if (error) return <p className='error'>Error: {error}</p>
    return (
        <div className="edit-profile-page">
            <h3 className='title'>Edit {formData.username} Profile</h3>
            <form onSubmit={handleSubmit}>
                <label htmlFor="bio">Bio: </label>
                <input type="text" name="bio" id="bio" value={formData.bio} onChange={handleChange} />

                {formData.profileImage && typeof formData.profileImage === 'string' &&
                    <img src={getImageUrl(formData.profileImage)} alt={formData.username} width="200" />}
                <label htmlFor="profileImage">Change Profile Image: </label>
                <input id="profileImage" name="profileImage" type="file" accept="image/*" onChange={handleImageChange} />

                <div>
                    <span>{formData.followers.length} Followers</span>{" "}
                    <span>{formData.followings.length} Following</span>
                </div>

                <button type="submit">Save Changes</button>
            </form>
        </div>
    )
}

export default EditProfile
