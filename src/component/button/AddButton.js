import React from "react";
import { IoMdAdd } from "react-icons/io";

const AddButton = ({ children, className = "", onClick = null }) => {
  return (
    <button
      onClick={onClick}
      className={`flex flex-row items-center font-semibold gap-2 px-6 py-2 text-white bg-teal-500 outline-none rounded-md ${className}`}
    >
      <IoMdAdd className="text-xl" /> {children}
    </button>
  );
};

export default AddButton;
