import { useAuth } from "../context/AuthContext"
import "./Pages.css"
import { useEffect } from "react"

function Dashboard({  }) {
  const {user} = useAuth()

  useEffect(() => {
      document.title = "Welcome"
    }, [])
  

  return (
    <div className="dashboard-page">
        <h1>Welcome {user.username}</h1>
    </div>
  )
}

export default Dashboard