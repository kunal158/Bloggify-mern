import React, { useState, useContext, useEffect } from "react";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import { ImCross } from "react-icons/im";
import { URL } from "../url";
import { UserContext } from "../context/UserContext";
import axios from "axios";
import { useNavigate, useParams } from "react-router-dom";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";
import "./Edit.css";

const EditPost = () => {
  const { id } = useParams();
  const { user } = useContext(UserContext);
  const navigate = useNavigate();

  const [title, setTitle] = useState("");
  const [desc, setDesc] = useState("");
  const [file, setFile] = useState(null);
  const [cat, setCat] = useState("");
  const [cats, setCats] = useState([]);
  const [photo, setPhoto] = useState("");

  useEffect(() => {
    const fetchPost = async () => {
      try {
        const res = await axios.get(`${URL}/api/posts/${id}`);
        setTitle(res.data.title);
        setDesc(res.data.desc);
        setPhoto(res.data.photo); // Set the photo state here
        setCats(res.data.categories);
      } catch (err) {
        console.error("Error fetching post:", err);
      }
    };

    fetchPost();
  }, [id]);

  const handleFileChange = (e) => {
    setFile(e.target.files[0]);
  };

  const deleteCategory = (i) => {
    let updatedCats = [...cats];
    updatedCats.splice(i, 1);
    setCats(updatedCats);
  };

  const addCategory = () => {
    let updatedCats = [...cats];
    updatedCats.push(cat);
    setCat("");
    setCats(updatedCats);
  };

  const handleUpdate = async (e) => {
    e.preventDefault();
    const postData = {
      title,
      desc,
      username: user.username,
      userId: user._id,
      categories: cats,
      photo,
    };

    if (file) {
      const formData = new FormData();
      formData.append("file", file);
      formData.append("filename", `${Date.now()}-${file.name}`);

      try {
        const response = await axios.post(`${URL}/api/upload`, formData, {
          withCredentials: true,
        });
        setPhoto(response.data.filename);
        postData.photo = response.data.filename;
      } catch (err) {
        console.error("Error during image upload:", err);
      }
    }

    try {
      const response = await axios.put(`${URL}/api/posts/${id}`, postData, {
        withCredentials: true,
      });
      navigate(`/posts/post/${response.data._id}`);
    } catch (err) {
      console.error("Error updating post:", err);
    }
  };

  const modules = {
    toolbar: [
      [{ font: [] }],
      [{ size: [] }],
      ["bold", "italic", "underline", "strike", "blockquote"],
      [
        { list: "ordered" },
        { list: "bullet" },
        { indent: "-1" },
        { indent: "+1" },
      ],
      ["link", "image"],
    ],

    clipboard: {
      matchVisual: false,
    },
  };

  const formats = [
    "font",
    "size",
    "bold",
    "italic",
    "underline",
    "strike",
    "blockquote",
    "list",
    "bullet",
    "indent",
    "link",
    "image",
  ];

  return (
    <div>
      <Navbar />
      <div className="px-6 md:px-[200px] mt-8">
        <h1 className="font-bold md:text-2xl text-xl">Edit a post</h1>
        <form className="w-full flex flex-col space-y-4 md:space-y-8 mt-4">
          <input
            onChange={(e) => setTitle(e.target.value)}
            type="text"
            placeholder="Enter post title"
            value={title}
            className="px-4 py-2 outline-none"
          />
          <input
            onChange={handleFileChange}
            type="file"
            className="mr-4 px-4"
          />
          {/* {photo && (
            <div className="mt-4">
              <img
                src={`${URL}/uploads/${photo}`}
                alt="Post"
                className="w-full"
              />
            </div>
          )} */}

          <div className="flex flex-col">
            <div className="flex items-center space-x-4 md:space-x-8">
              <input
                value={cat}
                onChange={(e) => setCat(e.target.value)}
                className="px-4 py-2 outline-none"
                placeholder="Enter post category"
                type="text"
              />
              <div
                onClick={addCategory}
                className="bg-black text-white px-4 py-2 font-semibold cursor-pointer"
              >
                Add
              </div>
            </div>

            {/* categories */}
            <div className="flex px-4 mt-3">
              {cats.map((c, i) => (
                <div
                  key={i}
                  className="flex justify-center items-center space-x-2 mr-4 bg-gray-200 px-2 py-1 rounded-md"
                >
                  <p>{c}</p>
                  <p
                    onClick={() => deleteCategory(i)}
                    className="text-white bg-black rounded-full cursor-pointer p-1 text-sm"
                  >
                    <ImCross />
                  </p>
                </div>
              ))}
            </div>
          </div>

          <div style={{ height: "500px" }}>
            <div
              style={{
                height: "100%",
                border: "1px solid #000",
                marginBottom: "4px",
                borderRadius: "0px",
                overflowY: "hidden",
              }}
            >
              <ReactQuill
                value={desc}
                onChange={setDesc}
                modules={modules}
                formats={formats}
                placeholder="Enter post description"
                className="ql-editor overflow-hidden"
              />
            </div>
          </div>

          <button
            onClick={handleUpdate}
            className="bg-black w-full md:w-[20%] mx-auto text-white font-semibold px-4 py-2 md:text-xl text-lg"
          >
            Update
          </button>
        </form>
      </div>

      <Footer />
    </div>
  );
};

export default EditPost;
