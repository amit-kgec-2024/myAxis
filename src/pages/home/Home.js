import React from "react";
import { useNavigate } from "react-router-dom";

const Home = () => {
  const navigate = useNavigate();
  return (
    <div className="bg-white">
      <div className="flex flex-row items-start justify-around bg-slate-100 py-2 border-b-4 border-b-teal-700 border-t-4 border-t-teal-500">
        <img src="../logofull.png" alt="Bird" className="w-[10rem]" />
        <p className="bg-blue-500 px-3 py-1 rounded-sm text-white">
          IndMart Main Website
        </p>
      </div>
      <div className="">
        <img src="../download.jpeg" alt="Bird" className="w-full h-56" />
      </div>
      <div className="flex flex-row items-center justify-around gap-6 p-4">
        <div
          style={{
            backgroundImage: "url(../876iygjhgmb.png)",
            backgroundSize: "cover",
            backgroundPosition: "start",
          }}
          className="flex flex-col justify-start items-start text-teal-800 p-2 gap-3 border-b-4 border-b-rose-600 border-t-4 border-t-amber-600 w-full"
        >
          <h1 className="text-lg md:text-2xl font-bold uppercase">
            Member's Area
          </h1>
          <li
            onClick={() => navigate("/members")}
            className="text-xs sm:text-base cursor-pointer"
          >
            Click to Visit
          </li>
        </div>
        <div
          style={{
            backgroundImage: "url(../876iygjhgmb.png)",
            backgroundSize: "cover",
            backgroundPosition: "start",
          }}
          className="flex flex-col justify-start items-start text-teal-800 p-2 gap-3 border-b-4 border-b-rose-600 border-t-4 border-t-amber-600 w-full"
        >
          <h1 className="text-lg md:text-2xl font-bold uppercase">
            ADMINISTRATOR Area
          </h1>
          <li
            onClick={() => navigate("/administrator")}
            className="text-xs sm:text-base cursor-pointer"
          >
            Click to Visit
          </li>
        </div>
        <div
          style={{
            backgroundImage: "url(../876iygjhgmb.png)",
            backgroundSize: "cover",
            backgroundPosition: "start",
          }}
          className="flex flex-col justify-start items-start text-teal-800 p-2 gap-3 border-b-4 border-b-rose-600 border-t-4 border-t-amber-600 w-full"
        >
          <h1 className="text-lg md:text-2xl font-bold uppercase">
            Application
          </h1>
          <li
            onClick={() => navigate("/applications")}
            className="text-xs sm:text-base cursor-pointer"
          >
            Click to Visit
          </li>
        </div>
      </div>
    </div>
  );
};

export default Home;
