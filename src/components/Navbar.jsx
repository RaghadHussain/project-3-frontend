import { Link } from 'react-router'
import { useAuth } from '../context/AuthContext'

function Navbar() {
  const { logout, user} = useAuth()
  return (
    <nav>
      {user 
      ? 
      (<>
      <button onClick={logout}>Sign Out</button>
        <Link to={`/${user._id}`}>Profile</Link>
        <Link to='/post/new'>New Post</Link>
        <Link to='/notification'>Notifications</Link>
        <Link to='/post/save'>Save</Link>
        <Link to='/explore'>Explore</Link>

      </>) :
      (<>
        <Link to='/sign-up'>Sign Up</Link>
        <Link to='/sign-in'>Sign In</Link>
      </>)}
    </nav>
  )
}

export default Navbar