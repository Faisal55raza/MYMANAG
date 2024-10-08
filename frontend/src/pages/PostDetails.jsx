import Footer from "../components/Footer"
import Navbar from "../components/Navbar"
import Comment from "../components/Comment"
import Loader from "../components/Loader"
import { BiEdit } from "react-icons/bi"
import { MdDelete } from "react-icons/md"
import { URL, IF } from "../url"
import { useNavigate, useParams } from "react-router-dom"
import { useContext, useEffect, useState } from "react"
import { UserContext } from "../context/UserContext"
import axios from "axios"

const PostDetails = () => {
    const postId = useParams().id
    const [post, setPost] = useState({})
    const [loader,setloader] = useState(false)
    const [comments, setComments] = useState([])
    const [comment,setComment] = useState("")
    const {user} = useContext(UserContext)
    const navigate = useNavigate()

    const fetchPost = async () => {
        setloader(true)
        try {
            const res = await axios.get(URL + "/api/posts/" + postId)
            setPost(res.data)
            setloader(false)
        } catch (err) {
            console.log(err)
            setloader(true)
        }
    }

    const handleDeletePost = async () => {
        try{
            const res = await axios.delete(URL + "/api/posts/" + postId, {withCredentials:true})
            // console.log(res.data)
            navigate("/")
        } catch (err) {
            console.log(err)
        }   
    }

    useEffect(() => {
        fetchPost()
    }, [postId])

    const fetchPostComments = async () => {
        try {
            const res = await axios.get(URL + "/api/comments/post/" + postId)
            setComments(res.data)
        } catch (err) {
            console.log(err)
        }
    }

    useEffect(() => {
        fetchPostComments()
    }, [postId])

    const postComment = async(e) => {
        e.preventDefault()
        try{
            const res = await axios.post(URL + "/api/comments/create", {comment:comment, author:user.username, postId:postId, userId:user._id}, {withCredentials:true})
            window.location.reload(true)
        } catch (err) {
            console.log(err)
        }
    }

    return (
        <div>
            <Navbar />
            {loader ? <div className="h-[80vh] flex justify-center items-center w-full"><Loader /></div> : <div className="px-8 md:px-[200px] mt-8">
                <div className="flex justify-between items-center">
                    <h1 className="text-2xl font-bold text-black md:text-3xl">
                        {post.title} </h1>
                    {user?._id === post?.userId && <div className="flex items-center justify-center space-x-2">
                        <p className="cursor-pointer"><BiEdit onClick={()=>{navigate("/edit/" + postId)}}/></p>
                        <p className="cursor-pointer" onClick={handleDeletePost}><MdDelete /></p>
                    </div>}
                </div>

                <div className="flex items-center justify-between mt-2 md:mt-4">
                    <p>@{post.username}</p>
                    <div className="flex space-x-2">
                        <p>{new Date(post.updatedAt).toString().slice(0, 15)}</p>
                        <p>{new Date(post.updatedAt).toString().slice(16, 24)}</p>
                    </div>
                </div>

                <img src={IF+post.photo} alt="" className="w-full mx-auto mt-8" />
                <p className="mx-auto mt-8">
                    {post.desc}
                </p>

                <div className="flex items-center mt-8 space-x-4 font-semibold">
                    <p>Categories:</p>
                    <div className="flex justify-center items-center space-x-2">
                        {post.categories?.map((c, i) => (
                            <>
                                <div key={i} className="bg-gray-300 rounded-lg px-3 py-1">{c}</div>
                            </>
                        ))}
                    </div>
                </div>

                <div className="flex flex-col mt-4">
                    <h3 className="mt-6 mb-4 font-semibold">Comments:</h3>
                    {comments?.map((c) => (
                        <Comment key={c._id} c={c} post={post} />
                    ))}
                </div>

                {/* Write a comment */}
                <div className="w-full flex flex-col mt-4 md:flex-row">
                    <input onChange={(e) => setComment(e.target.value)} type="text" placeholder="Write a comment" className="md:w-[80%] outline-none px-4 py-2 mt-4 md:mt-0" />
                    <button onClick={postComment} className="text-white bg-black px-2 py-2 md:w-[20%] mt-4 md:mt-0">Add comment</button>
                </div>
            </div>}
            <Footer />
        </div>

    )
}

export default PostDetails