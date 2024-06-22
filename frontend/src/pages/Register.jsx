import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import Toggle from "../components/Toggle";
import axios from "axios";
import { URL } from "../url";
import { FaEye, FaEyeSlash } from "react-icons/fa";

const Register = () => {
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [showpass, setShowpass] = useState(false);
  const navigate = useNavigate();

  const handleregister = async () => {
    try {
      const res = await axios.post(URL + "/api/auth/register", {
        username,
        email,
        password,
      });
      // setUsername("");
      // setEmail("");
      // setPassword("");
      // setError(""); // Clear any previous error messages
      navigate("/login");
    } catch (err) {
      if (err.response && err.response.status === 400) {
        setError(err.response.data.message); // Set the specific error message
      } else {
        setError("Already registered!");
      }
      console.log(err);
    }
  };

  return (
    <>
      <div className="mt-8 flex items-center justify-between px-6 md:px-[280px] py-4">
        <Link to="/">
          <h1 className="text-3xl font-bold">Blog-iffy!</h1>
        </Link>
        <ul className="mr-4 flex space-x-8">
          <li>
            <Link to="/login" className="text-black text-[22px] font-semibold">
              Login
            </Link>
          </li>
          <li>
            <Toggle />
          </li>
        </ul>
      </div>
      <hr className="mx-[13%]"></hr>
      <div className="w-full flex justify-center items-center h-[80vh] ">
        <div className="flex flex-col justify-center items-center space-y-4 w-[80%] md:w-[25%]">
          <h1 className="text-xl font-bold text-left">Create your account</h1>
          <input
            onChange={(e) => setUsername(e.target.value)}
            className="w-full px-4 py-2 border-2 border-black outline-0"
            type="text"
            placeholder="Enter your username"
            value={username}
          />
          <input
            onChange={(e) => setEmail(e.target.value)}
            className="w-full px-4 py-2 border-2 border-black outline-0"
            type="text"
            placeholder="Enter your email"
            value={email}
          />
          <div className="relative w-full">
            <input
              onChange={(e) => setPassword(e.target.value)}
              className="w-full px-4 py-2 border-2 border-black outline-0"
              type={showpass ? "text" : "password"}
              placeholder="Enter your password"
              value={password}
            />
            <span
              onClick={() => setShowpass(!showpass)}
              className="absolute right-3 top-3 cursor-pointer"
            >
              {showpass ? <FaEye /> : <FaEyeSlash />}
            </span>
          </div>
          <button
            onClick={handleregister}
            className="w-full px-4 py-4 text-lg font-bold text-white bg-black rounded-lg hover:bg-gray-500 hover:text-black "
          >
            Register
          </button>
          {error && <p className="text-red-500 font-medium mt-2">{error}</p>}
          <div className="flex justify-center items-center space-x-3">
            <p>Already have an account?</p>
            <p className="text-gray-500 hover:text-black">
              <Link to="/login">Login</Link>
            </p>
          </div>
        </div>
      </div>
    </>
  );
};

export default Register;
