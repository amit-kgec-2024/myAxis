import React, { useState } from "react";
import AdminLogin from "./admin/AdminLogin";
import ManagementLogin from "./management/ManagementLogin";


const defaultImage = "logo192.png";
const Home = () => {
  const [isToggle, setIsToggle] = useState();
  const handelToggle = (toggleComponent) => {
    setIsToggle(toggleComponent);
  };
  return (
    <div className="p-5 bg-teal-200 h-screen">
      <div className="flex flex-row items-start p-6 gap-6 bg-white h-full">
        <button onClick={()=> handelToggle("management")} className="flex flex-row justify-start items-center p-2 gap-2 shadow-md w-[20%] rounded-sm bg-slate-100">
          <div
            className="w-[4rem] h-[4rem]"
            style={{
              backgroundImage: `url(${defaultImage})`,
              backgroundPosition: "center",
              backgroundSize: "cover",
            }}
          />
          <div className="text-start">
            <h1 className="font-bold uppercase">Management</h1>
            <h1 className="text-xs">Click here to Login Portal</h1>
          </div>
        </button>
        <button
          onClick={() => handelToggle("admin")}
          className="flex flex-row justify-start items-center p-2 gap-2 shadow-md w-[20%] rounded-sm bg-slate-100"
        >
          <div
            className="w-[4rem] h-[4rem]"
            style={{
              backgroundImage: `url(${defaultImage})`,
              backgroundPosition: "center",
              backgroundSize: "cover",
            }}
          />
          <div className="text-start">
            <h1 className="font-bold uppercase">Admin Login</h1>
            <h1 className="text-xs">Click here to Login Portal</h1>
          </div>
        </button>
        <button className="flex flex-row justify-start items-center p-2 gap-2 shadow-md w-[20%] rounded-sm bg-slate-100">
          <div
            className="w-[4rem] h-[4rem]"
            style={{
              backgroundImage: `url(${defaultImage})`,
              backgroundPosition: "center",
              backgroundSize: "cover",
            }}
          />
          <div className="text-start">
            <h1 className="font-bold uppercase">Delivery Boy</h1>
            <h1 className="text-xs">Click here to Login Portal</h1>
          </div>
        </button>
        <button className="flex flex-row justify-start items-center p-2 gap-2 shadow-md w-[20%] rounded-sm bg-slate-100">
          <div
            className="w-[4rem] h-[4rem]"
            style={{
              backgroundImage: `url(${defaultImage})`,
              backgroundPosition: "center",
              backgroundSize: "cover",
            }}
          />
          <div className="text-start">
            <h1 className="font-bold uppercase">Help desk</h1>
            <h1 className="text-xs">Click here to Login Portal</h1>
          </div>
        </button>
      </div>
      {isToggle === "admin" && <AdminLogin setIsToggle={setIsToggle} />}
      {isToggle === "management" && <ManagementLogin setIsToggle={setIsToggle} />}
    </div>
  );
};

export default Home;
