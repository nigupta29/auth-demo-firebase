import { Link } from "react-router-dom"
import { useAuth } from "../context/AuthContext"

const Dashboard = () => {
  const { currentUser } = useAuth()

  return (
    <div>
      <h2 className='mb-3'>Dashboard</h2>

      <p>Name : {currentUser.displayName}</p>
      <p>Email : {currentUser.email}</p>

      <Link to='/update-profile' className='btn btn-success'>
        Update Profile
      </Link>
    </div>
  )
}

export default Dashboard
