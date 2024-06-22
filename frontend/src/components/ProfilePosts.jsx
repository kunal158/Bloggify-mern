import React from "react";
import { IF } from "../url";

const ProfilePosts = ({ p }) => {
  return (
    <div class="mt-10 mb-5 mx-3 overflow-hidden shadow-gray-400 transform transition duration-300 hover:scale-110 rounded-xl shadow-xl hover:shadow-2xl bg-white max-w-[95%] md:h-[500px]">
      <img
        src={IF + p.photo}
        alt="Laptop"
        class=" h-[53%] w-full rounded-t-md object-cover "
      />
      <div class="p-4">
        <h1 class="inline-flex items-center text-2xl font-bold ">{p.title} </h1>

        <div className="flex flex-col w-[100%]">
          <div className="mt-3 flex mb-2 text-sm font-semibold text-gray-400 justify-between items-center md:mb-4">
            <p>@{p.username}</p>
            <div className="ml-3 flex items-end space-x-1 text-sm">
              <p>{new Date(p.updatedAt).toString().slice(0, 15)}</p>
            </div>
          </div>
        </div>
        <p className="font-semibold text-gray-800">Read More</p>
      </div>
    </div>
  );
};

export default ProfilePosts;
