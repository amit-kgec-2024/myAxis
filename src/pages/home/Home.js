import React, { useState } from "react";
import AdminLogin from "../../component/login/AdminLogin";
import DeliveryLogin from "../../component/login/DeliveryLogin";
import HelpLogin from "../../component/login/HelpLogin";
import VendorLogin from "../../component/login/VendorLogin";
import SellerLogin from "../../component/login/SellerLogin";
import ForgetPassword from "../../component/ForgetPassword";

const defaultImage = "logo192.png";
const Home = () => {
  const [isToggle, setIsToggle] = useState();
  const handelToggle = (toggleComponent) => {
    setIsToggle(toggleComponent);
  };
  return (
    <div className="p-5 bg-teal-200 h-screen">
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
            onClick={() => handelToggle("vendor")}
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
              <h1 className="font-bold uppercase">Vendors</h1>
              <h1 className="text-xs">Click here to Login Portal</h1>
            </div>
          </button>
          <button
            onClick={() => handelToggle("seller")}
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
              <h1 className="font-bold uppercase">Sellers</h1>
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
              <h1 className="font-bold uppercase">Delivery Partner</h1>
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
          isToggle === "seller" ||
          isToggle === "vendor" ||
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
      {isToggle === "seller" && (
        <SellerLogin handelToggle={handelToggle} setIsToggle={setIsToggle} />
      )}
      {isToggle === "vendor" && (
        <VendorLogin handelToggle={handelToggle} setIsToggle={setIsToggle} />
      )}
    </div>
  );
};

export default Home;
