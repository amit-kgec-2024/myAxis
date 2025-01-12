import React, { useState } from "react";
import DeliveryLogin from "../../component/login/DeliveryLogin";
import HelpLogin from "../../component/login/HelpLogin";
import VendorLogin from "../../component/login/VendorLogin";
import SellerLogin from "../../component/login/SellerLogin";
import ForgetPassword from "../../component/ForgetPassword";
const Members = () => {
  const [isToggle, setIsToggle] = useState();
  const handelToggle = (toggleComponent) => {
    setIsToggle(toggleComponent);
  };
  return (
    <div>
      <div className="flex flex-row items-center justify-between bg-slate-100 px-4 py-2 border-b-4 border-b-teal-700 border-t-4 border-t-teal-500">
        <img src="../logofull.png" alt="Bird" className="w-[10rem]" />
        <p className="uppercase font-semibold text-lg md:text-xl">
          Members system
        </p>
      </div>
      <div className="bg-white h-full p-6">
        <div
          className={`flex flex-row items-start gap-6 ${
            isToggle === "helpdesk" || isToggle === "delivery"
              ? "hidden"
              : "block"
          }`}
        >
          <button
            onClick={() => handelToggle("vendor")}
            className="flex flex-row justify-start items-center p-2 gap-2 shadow-md w-[20%] rounded-sm bg-slate-100"
          >
            <div
              className="w-[4rem] h-[4rem]"
              style={{
                backgroundImage: `url(../vendor.png)`,
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
                backgroundImage: `url(../seller.png)`,
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
                backgroundImage: `url(../delivery-bike.png)`,
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
                backgroundImage: `url(../help-desk.png)`,
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
        {(isToggle === "seller" ||
          isToggle === "vendor" ||
          isToggle === "helpdesk" ||
          isToggle === "delivery") && (
          <ForgetPassword setIsToggle={setIsToggle} isToggle={isToggle} />
        )}
      </div>
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

export default Members;
