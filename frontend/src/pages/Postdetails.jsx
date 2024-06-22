import { useNavigate, useParams } from "react-router-dom";
import Footer from "../components/Footer";
import Navbar from "../components/Navbar";
import { BiEdit } from "react-icons/bi";
import { MdDelete } from "react-icons/md";
import axios from "axios";
import { IF, URL } from "../url";
import { useContext, useEffect, useState } from "react";
import { UserContext } from "../context/UserContext";
import Loader from "../components/Loader";

const Postdetails = () => {
  const postId = useParams().id;
  const [post, setPost] = useState({});
  const { user } = useContext(UserContext);
  const [loader, setLoader] = useState(false);
  const navigate = useNavigate();

  const fetchPost = async () => {
    try {
      const res = await axios.get(URL + "/api/posts/" + postId);
      // console.log(res.data)
      setPost(res.data);
    } catch (err) {
      console.log(err);
    }
  };

  const handleDeletePost = async () => {
    try {
      const res = await axios.delete(URL + "/api/posts/" + postId, {
        withCredentials: true,
      });
      console.log(res.data);
      navigate("/");
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    fetchPost();
  }, [postId]);

  return (
    <div>
      <Navbar />
      {loader ? (
        <div className="h-[80vh] flex justify-center items-center">
          <Loader />
        </div>
      ) : (
        <div className="px-8 md:px-[200px] mt-8">
          <div className="flex justify-center items-center">
            <h1 className="text-2xl font-bold text-black md:text-3xl ">
              {post.title}
            </h1>
          </div>

          <div className="flex items-center justify-between mt-2 md:mt-6 md:px-[120px]">
            <p className="text-gray-400">@{post.username}</p>
            {user?._id === post.userId && (
              <div className="flex items-center justify-center space-x-2">
                <p
                  onClick={() => navigate(`/edit/${postId}`)}
                  className="cursor-pointer ml-5"
                >
                  <BiEdit />
                </p>
                <p onClick={handleDeletePost} className="cursor-pointer">
                  <MdDelete />
                </p>
              </div>
            )}
            <div className="flex space-x-2">
              <p className="text-gray-400 text-sm">
                {new Date(post.updatedAt).toString().slice(4, 15)}
              </p>
            </div>
          </div>
          <img src={IF + post.photo} className="w-[60%] mx-auto mt-8" alt="" />
          <div
            className="ql-editor mx-auto mt-8 md:px-[160px]"
            dangerouslySetInnerHTML={{ __html: post.desc }}
          ></div>

          <div className="flex items-center mt-8 space-x-4 font-semibold">
            <p>Categories:</p>
            <div className="flex justify-center items-center space-x-2">
              {post.categories?.map((c, i) => (
                <>
                  <div key={i} className="bg-gray-300 rounded-lg px-3 py-1">
                    {c}
                  </div>
                </>
              ))}
            </div>
          </div>
        </div>
      )}
      <Footer />
    </div>
  );
};

export default Postdetails;
