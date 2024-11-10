import React from "react";
import { managementData } from "../../utils/navigationList";

const Header = ({ isManagement, handelManagement }) => {
  return (
    <div className="w-[15rem] shadow bg-teal-200 flex flex-col gap-1 p-2 justify-start font-semibold text-slate-400">
      <div className="text-3xl text-center py-8">IndMart</div>
      {managementData.map((ele, index) => (
        <button
          key={index}
          onClick={() => handelManagement(ele.label)}
          className={`text-start p-3  ${
            isManagement === ele.label
              ? "bg-teal-300 text-black rounded-md"
              : "hover:bg-teal-300 hover:text-black rounded-md"
          }`}
        >
          {ele.label}
        </button>
      ))}
    </div>
  );
};

export default Header;
