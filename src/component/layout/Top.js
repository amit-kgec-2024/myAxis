import React from "react";
import { useNavigate } from "react-router-dom";
import { RiLogoutCircleRLine } from "react-icons/ri";

const Top = () => {
  // LOG Out................
  const navigate = useNavigate();
  const logOut = () => {
    localStorage.clear();
    sessionStorage.clear();
    navigate("/");
  };

  let USERTYPE;
  if (typeof window !== "undefined") {
    USERTYPE = localStorage.getItem("userType");
  }
  return (
    <div className="sticky top-0 z-50" style={{ backgroundColor: "#ABA944" }}>
      <div className="py-4 px-6 shadow flex flex-row items-center justify-between text-white">
        <span>{USERTYPE}</span>
        <button onClick={() => logOut()} className="text-2xl">
          <RiLogoutCircleRLine />
        </button>
      </div>
    </div>
  );
};

export default Top;
