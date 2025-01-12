import React, { useState } from "react";
import AdminLogin from "../../component/login/AdminLogin";
import ForgetPassword from "../../component/ForgetPassword";

const Administrator = () => {
  const [isToggle, setIsToggle] = useState();
  const handelToggle = (toggleComponent) => {
    setIsToggle(toggleComponent);
  };
  return (
    <div>
      <div className="flex flex-row items-center justify-between bg-slate-100 px-4 py-2 border-b-4 border-b-teal-700 border-t-4 border-t-teal-500">
        <img src="../logofull.png" alt="Bird" className="w-[10rem]" />
        <p className="uppercase font-semibold text-lg md:text-xl">
          ADMINISTRATOR system
        </p>
      </div>
      <div className="bg-white h-full p-6">
        <div
          className={`flex flex-row items-start gap-6 ${
            isToggle === "admin" ? "hidden" : "block"
          }`}
        >
          <button
            onClick={() => handelToggle("adminLogin")}
            className="flex flex-row justify-start items-center p-2 gap-2 shadow-md w-[20%] rounded-sm bg-slate-100"
          >
            <div
              className="w-[4rem] h-[4rem]"
              style={{
                backgroundImage: `url(../admin.png)`,
                backgroundPosition: "center",
                backgroundSize: "cover",
              }}
            />
            <div className="text-start">
              <h1 className="font-bold uppercase">Admin Login</h1>
              <h1 className="text-xs">Click here to Login Portal</h1>
            </div>
          </button>
        </div>
        {isToggle === "admin" && (
          <ForgetPassword setIsToggle={setIsToggle} isToggle={isToggle} />
        )}
      </div>
      {isToggle === "adminLogin" && (
        <AdminLogin handelToggle={handelToggle} setIsToggle={setIsToggle} />
      )}
    </div>
  );
};

export default Administrator;
