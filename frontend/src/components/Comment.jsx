import { MdDelete } from "react-icons/md"
import { URL } from "../url"
import { useContext } from "react"
import { UserContext } from "../context/UserContext"
import axios from "axios"
import Notiflix from 'notiflix';
import PostDetails from "../pages/PostDetails"

const Comment = ({ c,post,func }) => {
    const {user} = useContext(UserContext)
    const deleteComment = async (id) => {
        const token = localStorage.getItem("token") // Retrieve the token from local storage

        try {
            await axios.delete(URL + "/api/comments/" + id, {
                headers: {
                    Authorization: `Bearer ${token}`
                },
                withCredentials: true
            })
            
            func();
            Notiflix.Notify.success("Comment Deleted Successfully");
        } catch (err) {
            Notiflix.Notify.failure('Something Went Wrong');
        }
    }

    return (
        <div className="px-2 py-2 bg-gray-200 rounded-lg my-2">
            <div className="flex items-center justify-between">
                <h3 className="font-bold text-gray-600">@{c.author}</h3>
                <div className="flex justify-center items-center space-x-4">
                    <p className="text-gray-500 text-sm">{new Date(c.updatedAt).toString().slice(0, 15)}</p>
                    <p className="text-gray-500 text-sm">{new Date(c.updatedAt).toString().slice(16, 24)}</p>
                    {user?._id === c?.userId ? <div className="flex items-center justify-center space-x-2">
                        <p className="cursor-pointer" onClick={() => deleteComment(c._id)}><MdDelete /></p>
                    </div> : ""}
                </div>
            </div>
            <p className="px-4 mt-2">{c.comment}</p>
        </div>
    )
}

export default Comment