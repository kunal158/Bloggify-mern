import axios from "axios";
import Footer from "../components/Footer";
import Navbar from "../components/Navbar";
import { URL } from "../url";
import { useContext, useEffect, useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import Loader from "../components/Loader";
import { UserContext } from "../context/UserContext";
import Card from "../components/Card";
import { BsSearch } from "react-icons/bs";

const Home = () => {
  const [posts, setPosts] = useState([]);
  const [noResults, setNoResults] = useState(false);
  const [loader, setLoader] = useState(false);
  const { search } = useLocation();
  const navigate = useNavigate();

  const { user } = useContext(UserContext);
  const [prompt, setPrompt] = useState("");

  const fetchPosts = async () => {
    setLoader(true);
    try {
      const res = await axios.get(
        "https://bloggify-g3gf.onrender.com/api/posts/" + search
      );
      // console.log(res.data)
      setPosts(res.data);
      if (res.data.length === 0) {
        setNoResults(true);
      } else {
        setNoResults(false);
      }
      setLoader(false);
    } catch (err) {
      console.log(err);
      setLoader(true);
    }
  };

  useEffect(() => {
    fetchPosts();
  }, [search]);

  return (
    <>
      <Navbar />

      <div className="max-w-screen md:px-[190px] py-4 px-8 min-h-[80vh]">
        <div className="relative mt-6 mb-6 w-[40%]">
          <p
            onClick={() =>
              navigate(prompt ? "?search=" + prompt : navigate("/"))
            }
            className="cursor-pointer"
          >
            <BsSearch className="absolute top-1/2 right-4 transform -translate-y-1/2 text-gray-500" />
          </p>
          <input
            onChange={(e) => setPrompt(e.target.value)}
            className="w-full h-[70px] pl-12 pr-4 hover:border-solid hover:border-2 hover:border-blue-600 placeholder:opacity-50 rounded-full px-8 py-2 shadow-md focus:shadow-lg focus:outline-none"
            autoComplete="off"
            placeholder="Search here..."
            name="text"
            type="text"
          />
        </div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {loader ? (
            <div className="h-[40vh] flex justify-center items-center">
              <Loader />
            </div>
          ) : !noResults ? (
            posts.map((post) => (
              <>
                <Link to={user ? `/posts/post/${post._id}` : "/login"}>
                  <Card key={post._id} post={post} />
                </Link>
              </>
            ))
          ) : (
            <h3 className="text-center font-bold mt-16 text-3xl">
              No posts available
            </h3>
          )}
        </div>
      </div>
      <Footer />
    </>
  );
};

export default Home;

{
  /* <div className="relative mt-6 mb-6 w-[40%]">
          <p
            onClick={() =>
              navigate(prompt ? "?search=" + prompt : navigate("/"))
            }
            className="cursor-pointer"
          >
            <BsSearch className="absolute top-1/2 right-4 transform -translate-y-1/2 text-gray-500" />
          </p>

          <input
            onChange={(e) => setPrompt(e.target.value)}
            className="w-full h-[70px] pl-12 pr-4 hover:border-solid hover:border-2 hover:border-blue-600 placeholder:opacity-50 rounded-full px-8 py-2 shadow-md focus:shadow-lg focus:outline-none"
            autoComplete="off"
            placeholder="Search here..."
            name="text"
            type="text"
          />
        </div> */
}
