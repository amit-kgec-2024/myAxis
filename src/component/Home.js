import React, { useState } from "react";
import AdminLogin from "./admin/AdminLogin";
import ManagementLogin from "./management/ManagementLogin";
import DeliveryLogin from "./delivery/DeliveryLogin";
import HelpLogin from "./helpdesk/HelpLogin";
import ForgetPassword from "./management/ForgetPassword";

const defaultImage = "logo192.png";
const Home = () => {
  const [isToggle, setIsToggle] = useState();
  const handelToggle = (toggleComponent) => {
    setIsToggle(toggleComponent);
  };
  return (
    <div className="p-0 bg-teal-200 h-screen">
      <div className="bg-white h-full p-6">
        <div
          className={`flex flex-row items-start gap-6 ${
            isToggle === "admin" ||
            isToggle === "helpdesk" ||
            isToggle === "delivery"
              ? "hidden"
              : "block"
          }`}
        >
          <button
            onClick={() => handelToggle("management")}
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
              <h1 className="font-bold uppercase">Management</h1>
              <h1 className="text-xs">Click here to Login Portal</h1>
            </div>
          </button>
          <button
            onClick={() => handelToggle("adminLogin")}
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
          <button
            onClick={() => handelToggle("deliveryLogin")}
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
              <h1 className="font-bold uppercase">Delivery Boy</h1>
              <h1 className="text-xs">Click here to Login Portal</h1>
            </div>
          </button>
          <button
            onClick={() => handelToggle("helpLogin")}
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
              <h1 className="font-bold uppercase">Help desk</h1>
              <h1 className="text-xs">Click here to Login Portal</h1>
            </div>
          </button>
        </div>
        {(isToggle === "admin" ||
          isToggle === "helpdesk" ||
          isToggle === "delivery") && (
          <ForgetPassword setIsToggle={setIsToggle} isToggle={isToggle} />
        )}
      </div>
      {isToggle === "adminLogin" && (
        <AdminLogin handelToggle={handelToggle} setIsToggle={setIsToggle} />
      )}
      {isToggle === "deliveryLogin" && (
        <DeliveryLogin handelToggle={handelToggle} setIsToggle={setIsToggle} />
      )}
      {isToggle === "helpLogin" && (
        <HelpLogin handelToggle={handelToggle} setIsToggle={setIsToggle} />
      )}
      {isToggle === "management" && (
        <ManagementLogin setIsToggle={setIsToggle} />
      )}
    </div>
  );
};

export default Home;
