import Footer from "../components/Footer";
import Navbar from "../components/Navbar";
import Comment from "../components/Comment";
import Loader from "../components/Loader";
import { BiEdit } from "react-icons/bi";
import { MdDelete } from "react-icons/md";
import { URL} from "../url";
import { useNavigate, useParams } from "react-router-dom";
import { useContext, useEffect, useState } from "react";
import { UserContext } from "../context/UserContext";
import axios from "axios";
import Notiflix from 'notiflix';

const PostDetails = () => {
    const postId = useParams().id;
    const [post, setPost] = useState({});
    const [loader, setLoader] = useState(false);
    const [comments, setComments] = useState([]);
    const [comment, setComment] = useState("");
    const { user } = useContext(UserContext);
    const navigate = useNavigate();

    const fetchPost = async () => {
        setLoader(true);
        try {
            const token = localStorage.getItem("token"); // Get the token from local storage
            const res = await axios.get(URL + "/api/posts/" + postId, {
                headers: { Authorization: `Bearer ${token}` }, // Send token in headers
            });
            setPost(res.data);
            setLoader(false);
        } catch (err) {
            Notiflix.Notify.failure('Something Went Wrong');
            setLoader(true);
        }
    };

    const handleDeletePost = async () => {
        try {
            const token = localStorage.getItem("token"); // Get the token from local storage
            const res = await axios.delete(URL + "/api/posts/" + postId, {
                headers: { Authorization: `Bearer ${token}` }, // Send token in headers
                withCredentials: true,
            });
            Notiflix.Notify.success('Post Deleted Successfully');
            navigate('/');
        } catch (err) {
            Notiflix.Notify.failure('Something Went Wrong');
        }
    };

    useEffect(() => {
        fetchPost();
    }, [postId]);

    const fetchPostComments = async () => {
        try {
            const token = localStorage.getItem("token"); // Get the token from local storage
            const res = await axios.get(URL + "/api/comments/post/" + postId, {
                headers: { Authorization: `Bearer ${token}` }, // Send token in headers
            });
            setComments(res.data);
        } catch (err) {
            console.log(err);
        }
    };

    useEffect(() => {
        fetchPostComments();
    }, [postId]);

    const postComment = async (e) => {
        e.preventDefault();
        try {
            const token = localStorage.getItem("token"); // Get the token from local storage
            const res = await axios.post(
                URL + "/api/comments/create",
                { comment: comment, author: user.username, postId: postId, userId: user._id },
                { headers: { Authorization: `Bearer ${token}` }, withCredentials: true }
            );
            setComment("");
            fetchPostComments();
            
            Notiflix.Notify.success('Comment Posted Sucessfully');
        } catch (err) {
            Notiflix.Notify.failure('Something Went Wrong');
        }
    };

    return (
        <div>
            <Navbar />
            {loader ? (
                <div className="h-[80vh] flex justify-center items-center w-full">
                    <Loader />
                </div>
            ) : (
                <div className="px-8 md:px-[200px] mt-8">
                    <div className="flex justify-between items-center">
                        <h1 className="text-2xl font-bold text-black md:text-3xl">
                            {post.title} 
                        </h1>
                        {user?._id === post?.userId && (
                            <div className="flex items-center justify-center space-x-2">
                                <p className="cursor-pointer">
                                    <BiEdit onClick={() => { navigate("/edit/" + postId); }} />
                                </p>
                                <p className="cursor-pointer" onClick={handleDeletePost}>
                                    <MdDelete />
                                </p>
                            </div>
                        )}
                    </div>

                    <div className="flex items-center justify-between mt-2 md:mt-4">
                        <p>@{post.username}</p>
                        <div className="flex space-x-2">
                            <p>{new Date(post.updatedAt).toString().slice(0, 15)}</p>
                            <p>{new Date(post.updatedAt).toString().slice(16, 24)}</p>
                        </div>
                    </div>

                    <img src={post.photo} alt="" className="w-full mx-auto mt-8" />
                    <p className="mx-auto mt-8">{post.desc}</p>

                    <div className="flex items-center mt-8 space-x-4 font-semibold">
                        <p>Categories:</p>
                        <div className="flex justify-center items-center space-x-2">
                            {post.categories?.map((c, i) => (
                                <div key={i} className="bg-gray-300 rounded-lg px-3 py-1">{c}</div>
                            ))}
                        </div>
                    </div>

                    <div className="flex flex-col mt-4">
                        <h3 className="mt-6 mb-4 font-semibold">Comments:</h3>
                        {comments?.map((c) => (
                            <Comment key={c._id} c={c} post={post} func={fetchPostComments} />
                        ))}
                    </div>

                    {/* Write a comment */}
                    <div className="w-full flex flex-col mt-4 md:flex-row">
                        <input
                            onChange={(e) => setComment(e.target.value)}
                            type="text"
                            value={comment}
                            placeholder={"Write a comment"}
                            className="md:w-[80%] outline-none px-4 py-2 mt-4 md:mt-0"
                        />
                        <button onClick={postComment} className="text-white bg-black px-2 py-2 md:w-[20%] mt-4 md:mt-0">
                            Add comment
                        </button>
                    </div>
                </div>
            )}
            <Footer />
        </div>
    );
};

export default PostDetails;
