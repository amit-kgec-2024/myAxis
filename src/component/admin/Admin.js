import React, { useState } from "react";
import AdminMobil from "./products/AdminMobil";
import AdminAppliances from "./products/AdminAppliances";
import AdminElectronics from "./products/AdminElectronics";
import AdminFashion from "./products/AdminFashion";
import AdminBeauty from "./products/AdminBeauty";
import AdminKitchen from "./products/AdminKitchen";
import AdminFurniture from "./products/AdminFurniture";
import AdminGrocery from "./products/AdminGrocery";
import { useNavigate } from "react-router-dom";
import Layout from "../layout/Layout";

const Admin = () => {
  const [isAdmin, setIsAdmin] = useState("mobile");
  const handelAdmin = (toggleAdmin) => {
    setIsAdmin(toggleAdmin);
  };
  // Logout..............
  const navigate = useNavigate();
  const logOut = () => {
    window.localStorage.removeItem("user:token");
    window.localStorage.removeItem("user:details");
    navigate("/");
  };
  return (
    <Layout className="bg-teal-50 flex flex-row w-full">
      <div className="flex flex-col items-start justify-stretch px-4 py-1 text-2xl font-semibold w-[15%] bg-cyan-100 gap-4 min-h-screen shadow">
        <button
          onClick={() => logOut()}
          className="text-blue-800 border-b-4 p-3 w-full text-center"
        >
          Sign Out
        </button>
        <button
          onClick={() => handelAdmin("mobile")}
          className={`${isAdmin === "mobile" ? "text-pink-400" : "text-black"}`}
        >
          Mobile
        </button>
        <button
          onClick={() => handelAdmin("appliances")}
          className={`${
            isAdmin === "appliances" ? "text-pink-400" : "text-black"
          }`}
        >
          Appliances
        </button>
        <button
          onClick={() => handelAdmin("electronics")}
          className={`${
            isAdmin === "electronics" ? "text-pink-400" : "text-black"
          }`}
        >
          Electronics
        </button>
        <button
          onClick={() => handelAdmin("fashion")}
          className={`${
            isAdmin === "fashion" ? "text-pink-400" : "text-black"
          }`}
        >
          Fashion
        </button>
        <button
          onClick={() => handelAdmin("beauty")}
          className={`${isAdmin === "beauty" ? "text-pink-400" : "text-black"}`}
        >
          Beauty
        </button>
        <button
          onClick={() => handelAdmin("kitchen")}
          className={`${
            isAdmin === "kitchen" ? "text-pink-400" : "text-black"
          }`}
        >
          Kitchen
        </button>
        <button
          onClick={() => handelAdmin("furniture")}
          className={`${
            isAdmin === "furniture" ? "text-pink-400" : "text-black"
          }`}
        >
          Furniture
        </button>
        <button
          onClick={() => handelAdmin("grocery")}
          className={`${
            isAdmin === "grocery" ? "text-pink-400" : "text-black"
          }`}
        >
          Grocery
        </button>
      </div>
      <div className="w-full">
        {isAdmin === "mobile" && <AdminMobil />}
        {isAdmin === "appliances" && <AdminAppliances />}
        {isAdmin === "electronics" && <AdminElectronics />}
        {isAdmin === "fashion" && <AdminFashion />}
        {isAdmin === "beauty" && <AdminBeauty />}
        {isAdmin === "kitchen" && <AdminKitchen />}
        {isAdmin === "furniture" && <AdminFurniture />}
        {isAdmin === "grocery" && <AdminGrocery />}
      </div>
    </Layout>
  );
};

export default Admin;
