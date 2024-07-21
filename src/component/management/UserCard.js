import React from "react";
import { MdDelete } from "react-icons/md";
import { MdRemoveRedEye } from "react-icons/md";
import { FaEdit } from "react-icons/fa";
import { FaRegEdit } from "react-icons/fa";
import { IoEyeOff } from "react-icons/io5";

const UserCard = ({
  id,
  firstname,
  lastname,
  email,
  regNo,
  mobile,
  handelToggle,
  setIsView,
  isView,
  handelDelete,
}) => {
  return (
    <div className="border-b">
      <div className="flex flex-row items-center justify-between p-4">
        <div className="flex flex-row items-center gap-4 text-ellipsis">
          {regNo}
          <h1>
            {firstname} {lastname}
          </h1>
          <h1>{mobile}</h1>
          <h1>{email}</h1>
        </div>
        <div className="text-xl flex text-slate-600 gap-5">
          {isView === "show" ? (
            <button onClick={() => setIsView(false)}>
              <IoEyeOff />
            </button>
          ) : (
            <button onClick={() => handelToggle("show", id)}>
              <MdRemoveRedEye />
            </button>
          )}
          {isView === "deit" ? (
            <button onClick={() => setIsView(false)}>
              <FaRegEdit />
            </button>
          ) : (
            <button onClick={() => handelToggle("edit", id)}>
              <FaEdit />
            </button>
          )}
          <button onClick={() => handelDelete(id)}>
            <MdDelete />
          </button>
        </div>
      </div>
    </div>
  );
};

export default UserCard;
