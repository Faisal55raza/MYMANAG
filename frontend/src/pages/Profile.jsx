import { useContext, useEffect, useState } from "react";
import Footer from "../components/Footer";
import Navbar from "../components/Navbar";
import ProfilePosts from "../components/ProfilePosts";
import axios from "axios";
import { UserContext } from "../context/UserContext";
import { URL } from "../url";
import { useNavigate, useParams } from "react-router-dom";
import Notiflix from 'notiflix';

const Profile = () => {
    const [username, setUsername] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [updated, setUpdated] = useState(false);
    const [posts, setPosts] = useState([]);
    const { user, setUser } = useContext(UserContext);
    const params = useParams().id;
    const navigate = useNavigate();
    if(!user) navigate("/")
    const fetchProfile = async () => {
        try {
            const token = localStorage.getItem("token"); // Retrieve token from local storage
            const res = await axios.get(URL + "/api/users/" + user._id, {
                headers: {
                    Authorization: `Bearer ${token}`, // Attach token to the request
                },
            });
            setUsername(res.data.username);
            setEmail(res.data.email);
            setPassword(res.data.password);
        } catch (err) {
            Notiflix.Notify.failure('Something Went Wrong');
        }
    };

    useEffect(() => {
        fetchProfile();
    }, [params]);
    
    const handleLogout = async () => {
        try {
            const res = await axios.get(URL + "/api/auth/logout", { withCredentials: true })
            
            localStorage.removeItem("token") // Clear the token from local storage
            setUser(null)
            Notiflix.Notify.failure('Logout Successfull');
            navigate("/login")
        } catch (err) {
            Notiflix.Notify.failure('Something Went Wrong');
        }
    }
    const handleUserUpdate = async () => {
        setUpdated(false);
        try {
            const token = localStorage.getItem("token"); // Retrieve token from local storage
            const res = await axios.put(
                URL + "/api/users/" + user._id,
                { username, email, password },
                {
                    headers: {
                        Authorization: `Bearer ${token}`, // Attach token to the request
                    },
                }
            );
            Notiflix.Notify.success('User Updated Successfully');
            setUpdated(true);
        } catch (err) {
            Notiflix.Notify.failure('Something Went Wrong');
            setUpdated(false);
        }
    };

    const handleUserDelete = async () => {
        try {
            const token = localStorage.getItem("token"); // Retrieve token from local storage
            const res = await axios.delete(URL + "/api/users/" + user._id, {
                headers: {
                    Authorization: `Bearer ${token}`, // Attach token to the request
                },
            });
            await handleLogout();
            Notiflix.Notify.success('User Deleted Sucessfully');
            setUser(null);
            navigate("/");
        } catch (err) {
            Notiflix.Notify.failure('Something Went Wrong');
        }
    };

    const fetchUserPosts = async () => {
        try {
            const token = localStorage.getItem("token"); // Retrieve token from local storage
            const res = await axios.get(URL + "/api/posts/user/" + user._id, {
                headers: {
                    Authorization: `Bearer ${token}`, // Attach token to the request
                },
            });
            setPosts(res.data);
        } catch (err) {
            Notiflix.Notify.failure('Something Went Wrong');
        }
    };

    useEffect(() => {
        fetchUserPosts();
    }, [params]);

    return (
        <div>
            <Navbar />
            <div className="px-8 md:px-[200px] mt-8 md:flex-row flex flex-col-reverse md:items-start items-start">
                <div className="flex flex-col md:w-[70%] w-full mt-8 md:mt-0">
                    <h1 className="text-xl font-bold mb-4">Your posts:</h1>
                    {posts?.map((p) => (
                        <ProfilePosts key={p._id} p={p} />
                    ))}
                </div>
                <div className="md:sticky md:top-12 flex justify-start md:justify-end items-start md:w-[30%] w-full md:items-end">
                    <div className="flex flex-col space-y-4 items-start">
                        <h1 className="text-xl font-bold mb-4">Profile</h1>
                        <input
                            onChange={(e) => setUsername(e.target.value)}
                            value={username}
                            className="outline-none px-4 py-2 text-gray-500"
                            placeholder="Your username"
                            type="text"
                        />
                        <input
                            onChange={(e) => setEmail(e.target.value)}
                            value={email}
                            className="outline-none px-4 py-2 text-gray-500"
                            placeholder="Your email"
                            type="email"
                        />
                        {/* <input onChange={(e) => setPassword(e.target.value)} value={password} className="outline-none px-4 py-2 text-gray-500" placeholder="Your password" type="password" /> */}

                        <div className="flex items-center space-x-4 mt-8">
                            <button
                                onClick={handleUserUpdate}
                                className="text-white font-semibold bg-black px-4 py-2 hover:text-black hover:bg-gray-400"
                            >
                                Update
                            </button>
                            <button
                                onClick={handleUserDelete}
                                className="text-white font-semibold bg-black px-4 py-2 hover:text-black hover:bg-gray-400"
                            >
                                Delete
                            </button>
                        </div>
                        {updated && (
                            <h3 className="text-green-500 text-sm text-center mt-4">
                                User updated successfully!
                            </h3>
                        )}
                    </div>
                </div>
            </div>
            <Footer />
        </div>
    );
};

export default Profile;
