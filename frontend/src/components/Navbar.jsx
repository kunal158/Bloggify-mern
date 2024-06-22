import React from "react";
import Toggle from "./Toggle";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { FaBars } from "react-icons/fa";
import { useContext, useState } from "react";
import Menu from "./Menu";
import { UserContext } from "../context/UserContext";

const Navbar = () => {
  const { user } = useContext(UserContext);
  const [menu, setMenu] = useState(false);
  const path = useLocation().pathname;
  const [prompt, setPrompt] = useState("");
  const navigate = useNavigate(); // Initialize useNavigate

  const showMenu = () => {
    setMenu(!menu);
  };

  // const handleSearch = () => {
  //   navigate(prompt ? `/?search=${prompt}` : "/");
  // };

  return (
    <>
      <div className="mt-8 flex items-center justify-between px-6 md:px-[200px] py-4">
        <Link to="/">
          <h1 className="text-3xl font-bold">Blog-iffy!</h1>
        </Link>
        {/* {(path === "/" || path === "/myblogs/:id") && (
          <div className="flex justify-center items-center space-x-0">
            <input
              onChange={(e) => setPrompt(e.target.value)}
              className="w-full h-[50px] pl-12 pr-4 hover:border-solid hover:border-2 hover:border-blue-600 placeholder:opacity-50 rounded-full px-8 py-2 shadow-md focus:shadow-lg focus:outline-none"
              autoComplete="off"
              placeholder="Search here..."
              name="text"
              type="text"
            />
            <p
              onClick={handleSearch}
              className="cursor-pointer transform -translate-x-7"
            >
              <BsSearch />
            </p>
          </div>
        )} */}
        <ul className="mr-4 flex space-x-8">
          <li>
            <Link
              to="/"
              className={`${
                location.pathname === "/"
                  ? "text-black text-[22px] font-semibold"
                  : "text-gray-500 text-[22px] font-semibold hover:text-black"
              } hover:text-primary transition duration-300`}
            >
              Blog
            </Link>
          </li>
          {!user ? (
            <li>
              <Link
                to="/login"
                className={`${
                  location.pathname === "/login"
                    ? "text-black text-[22px] font-semibold"
                    : "text-gray-500 text-[22px] font-semibold hover:text-black"
                } hover:text-primary transition duration-300`}
              >
                Login
              </Link>
            </li>
          ) : (
            <li>
              <Link
                to="/write"
                className={`${
                  location.pathname === "/write"
                    ? "text-black text-[22px] font-semibold -mr-1"
                    : "text-gray-500 text-[22px] font-semibold hover:text-black -mr-1"
                } hover:text-primary transition duration-300`}
              >
                Write{" "}
              </Link>
            </li>
          )}

          {/* {user ? (
            <li>
              <Link
                to="/register"
                className={`${
                  location.pathname === "/register"
                    ? "text-black text-[22px] font-semibold"
                    : "text-gray-500 text-[22px] font-semibold hover:text-black"
                } hover:text-primary transition duration-300`}
              >
                Register
              </Link>
            </li>
          ) : (
            <li>
              <Link
                to="/profile"
                className={`${
                  location.pathname === "/profile"
                    ? "text-black text-[22px] font-semibold"
                    : "text-gray-500 text-[22px] font-semibold hover:text-black"
                } hover:text-primary transition duration-300`}
              >
                Profile
              </Link>
            </li>
          )} */}

          {/* <li>
            <div onClick={showMenu} className="md:hidden text-lg">
              <p className="cursor-pointer relative">
                <FaBars />
              </p>
              {menu && <Menu />}
            </div>
          </li> */}
          {user ? (
            <li>
              <div onClick={showMenu}>
                <p className="cursor-pointer relative mt-2">
                  <FaBars />
                </p>
                {menu && <Menu />}
              </div>
            </li>
          ) : (
            <li>
              <Link
                to="/register"
                className={`${
                  location.pathname === "/register"
                    ? "text-black text-[22px] font-semibold"
                    : "text-gray-500 text-[22px] font-semibold hover:text-black"
                } hover:text-primary transition duration-300`}
              >
                Register
              </Link>
            </li>
          )}
          {!user ? (
            <li>
              <Toggle />
            </li>
          ) : (
            <li>
              <Link
                to="/profile/:id"
                className={`${
                  location.pathname === "/profile"
                    ? "text-black text-[22px] font-semibold -mr-1"
                    : "text-black text-[22px] font-semibold hover:text-black -mr-1"
                } hover:text-primary transition duration-300`}
              >
                {user.username}
              </Link>
            </li>
          )}
        </ul>
      </div>
      <hr className="ml-[13%] mr-[13%] max-w-screen md:px-[190px] py-4" />
    </>
  );
};

export default Navbar;
