import { useContext } from "react"
import { UserContext } from "../context/UserContext"
import axios from "axios"
import { URL } from "../url"
import { Link, useNavigate } from "react-router-dom"
import Notiflix from 'notiflix';

const Menu = () => {
    const {user} = useContext(UserContext)
    const {setUser} = useContext(UserContext)
    const navigate = useNavigate()

    const handleLogout = async () => {
        try {
            const res = await axios.get(URL + "/api/auth/logout", { withCredentials: true })
            
            localStorage.removeItem("token") // Clear the token from local storage
            setUser(null)
            Notiflix.Notify.success('Logout succesfully');
            navigate("/login")
        } catch (err) {
            Notiflix.Notify.failure('Something Went Wrong');
        }
    }
    
    
    return (
        <div className="bg-black w-[200px] z-10 flex flex-col items-start absolute top-12 right-6 md:right-32 rounded-md p-4 space-y-4">
            {!user && <h3 className="text-white text-sm hover:text-gray-500 cursor-pointer"><Link to="/login">Login</Link></h3>}
            {!user && <h3 className="text-white text-sm hover:text-gray-500 cursor-pointer"><Link to="/register">Register</Link></h3>}
            {user && <h3 className="text-white text-sm hover:text-gray-500 cursor-pointer"><Link to={"/profile/" + user._id}>Profile</Link></h3>}
            {user && <h3 className="text-white text-sm hover:text-gray-500 cursor-pointer"><Link to="/write">Write</Link></h3>}
            {user && <h3 className="text-white text-sm hover:text-gray-500 cursor-pointer"><Link to={"/myblogs/" + user._id}>My blogs</Link></h3>}
            {user && <h3 onClick={handleLogout} className="text-white text-sm hover:text-gray-500 cursor-pointer">Logout</h3>}
        </div>
    )
}

export default Menu