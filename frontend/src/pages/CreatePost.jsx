import { useContext, useState } from "react";
import axios from "axios";
import Footer from "../components/Footer";
import Navbar from "../components/Navbar";
import { ImCross } from 'react-icons/im';
import { UserContext } from "../context/UserContext";
import { URL } from "../url";
import { useNavigate } from "react-router-dom";
import Notiflix from 'notiflix';
import Compressor from 'compressorjs';

const CreatePost = () => {
    const [title, setTitle] = useState('');
    const [desc, setDesc] = useState('');
    const [image, setImage] = useState(''); // Initialize as null
    const [imagePreview, setImagePreview] = useState(''); // State for image preview
    const [cat, setCat] = useState('');
    const [cats, setCats] = useState([]);
    const { user } = useContext(UserContext);
    const navigate = useNavigate();

    const addCategory = () => {
        let updatedCats = [...cats];
        updatedCats.push(cat);
        setCat("");
        setCats(updatedCats);
    };

    const deleteCategory = (i) => {
        let updatedCats = [...cats];
        updatedCats.splice(i, 1);
        setCats(updatedCats);
    };

    const handleCreate = async (e) => {
        e.preventDefault();

        // Create post data object
        const postData = {
            title,
            desc,
            username: user.username,
            userId: user._id,
            categories: cats, // Keep categories as an array
            photo: image ? image : null, // Include the image if it exists
        };

        // Convert image to base64 if it exists
        
                // Attempt to create the post
                try {
                    const token = localStorage.getItem("token");
                    const response = await axios.post(URL + "/api/posts/create", postData, {
                        headers: {
                            Authorization: `Bearer ${token}`,
                            'Content-Type': 'application/json', // Use application/json for object
                        },
                    });

                    Notiflix.Notify.success('Post Created Successfully');
                    navigate("/posts/post/" + response.data._id);
                } catch (err) {
                    Notiflix.Notify.failure('Something Went Wrong');
                }
            }
    const handleImageChange = (e) => {
        if (e.target.files[0]) {
            const file = e.target.files[0];
    
            new Compressor(file, {
                quality: 0.6, // Adjust quality
                success: (compressedResult) => {
                    const reader = new FileReader();
                    reader.onload = () => {
                        if (reader.readyState === 2) {
                            setImagePreview(reader.result); // Set the preview of the compressed image
                            setImage(reader.result);
                            console.log(image); // Set the compressed file for uploading
                        }
                    };
                    reader.readAsDataURL(compressedResult);
                },
                error(err) {
                    console.log(err.message);
                },
            });
        }
    };
    

    return (
        <div>
            <Navbar />
            <div className="px-6 md:px-[200px] mt-8">
                <h1 className="font-bold md:text-2xl text-xl">Create a post</h1>
                <form className="w-full flex flex-col space-y-4 md:space-y-8 mt-4">
                    <input 
                        onChange={(e) => setTitle(e.target.value)} 
                        type="text" 
                        placeholder="Enter post title" 
                        className="outline-none px-4 py-2" 
                    />
                    <input 
                        onChange={handleImageChange} 
                        type="file" 
                        accept="image/*"
                        className="px-4" 
                    />
                    {imagePreview && <img src={imagePreview} alt="Image Preview" className="mt-2 w-full h-auto" />} {/* Image preview */}

                    <div className="flex flex-col">
                        <div className="flex items-center space-x-4 md:space-x-8">
                            <input 
                                value={cat} 
                                onChange={(e) => setCat(e.target.value)} 
                                className="outline-none px-4 py-2" 
                                type="text" 
                                placeholder="Enter post category" 
                            />
                            <div 
                                onClick={addCategory} 
                                className="bg-black text-white px-4 py-2 font-semibold cursor-pointer"
                            >
                                Add
                            </div>
                        </div>

                        <div className="flex px-4 mt-3">
                            {cats.map((c, i) => (
                                <div key={i} className="flex justify-center items-center space-x-2 mr-4 bg-gray-200 px-2 py-1 rounded-md">
                                    <p>{c}</p>
                                    <p onClick={() => deleteCategory(i)} className="text-white bg-black rounded-full cursor-pointer p-1 text-sm">
                                        <ImCross />
                                    </p>
                                </div>
                            ))}
                        </div>
                    </div>

                    <textarea 
                        onChange={(e) => setDesc(e.target.value)} 
                        rows={15} 
                        cols={30} 
                        className="px-4 py-3 outline-none" 
                        placeholder="Enter post description" 
                    />
                    <button 
                        onClick={handleCreate} 
                        className="w-full md:w-[20%] mx-auto text-white bg-black font-semibold px-4 py-2 md:text-xl text-lg"
                    >
                        Create
                    </button>
                </form>
            </div>
            <Footer />
        </div>
    );
};

export default CreatePost;
