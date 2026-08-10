import { useAuth } from "../context/AuthContext"
import "./Pages.css"

function Dashboard({  }) {
  const {user} = useAuth()
  return (
    <div className="dashboard-page">
        <h1>Welcome {user.username}</h1>
    </div>
  )
}

export default Dashboard