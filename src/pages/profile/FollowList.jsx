import { useState, useEffect } from 'react'
import { useParams, Link } from 'react-router'
import { getUserById, followUser, unfollowUser } from '../../services/authService'
import { useAuth } from '../../context/AuthContext'
import getImageUrl from '../../utils/imageUrl'
import './Profile.css'

function FollowList({ type }) {
    const { id } = useParams()
    const { user } = useAuth()

    const [users, setUsers] = useState([])
    const [myFollowings, setMyFollowings] = useState([])
    const [error, setError] = useState(null)
    const [loading, setLoading] = useState(true)

    useEffect(() => {
        async function loadList() {
            try {
                setLoading(true)
                setError(null)

                const info = await getUserById(id)
                setUsers(type === 'followers' ? info.followers : info.followings)

                if (user) {
                    const info = await getUserById(user._id)
                    setMyFollowings(info.followings)
                }
            } catch (e) {
                console.log(e)
                setError('Failed to Load List!')
            } finally {
                setLoading(false)
            }
        }
        loadList()
    }, [id, type, user])

    async function handleFollow(Id, isFollowing) {
        try {
            isFollowing ? await unfollowUser(Id) : await followUser(Id)

            const info = await getUserById(user._id)
            setMyFollowings(info.followings)
        } catch (e) {
            console.log(e)
            setError('Failed to Follow/ Unfollow User!')
        }
    }

    if (loading) return <p>Loading...</p>
    if (error) return <p>{error}</p>

    return (
        <div className="follow-list-page">
            <h4>{type === 'followers' ? 'Followers' : 'Followings'}</h4>
            <div className="follow-list">
                {users.map((oneUser) => (
                    <div key={oneUser._id} className="follow-list-item">
                        <Link to={`/${oneUser._id}`}>
                            {oneUser.profileImage && (
                                <img src={getImageUrl(oneUser.profileImage)} alt={oneUser.username} width="40" />
                            )}
                            <strong>{oneUser.username}</strong>
                        </Link>
                        {user && user._id !== oneUser._id && (
                            <button
                                onClick={() =>
                                    handleFollow(
                                        oneUser._id,
                                        myFollowings.some((f) => f._id === oneUser._id)
                                    )
                                }
                            >
                                {myFollowings.some((f) => f._id === oneUser._id) ? 'Unfollow' : 'Follow'}
                            </button>
                        )}
                    </div>
                ))}
                {users.length === 0 && <p>No {type} yet.</p>}
            </div>
        </div>
    )
}

export default FollowList
