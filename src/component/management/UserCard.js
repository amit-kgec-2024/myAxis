import React, { useState } from "react";
import { MdDelete } from "react-icons/md";
import { MdRemoveRedEye } from "react-icons/md";
import { FaEdit } from "react-icons/fa";
import { FaRegEdit } from "react-icons/fa";
import { IoEyeOff } from "react-icons/io5";


const UserCard = ({ id, firstname, lastname, username, email, regNo, mobile }) => {
  const [isView, setIsView] = useState(false);
  const [isEdit, setIsEdit] = useState(false);

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
          {isView ? (
            <button onClick={() => setIsView(false)}>
              <IoEyeOff />
            </button>
          ) : (
            <button onClick={() => setIsView((prev) => !prev)}>
              <MdRemoveRedEye />
            </button>
          )}
          {isEdit ? (
            <button onClick={() => setIsEdit(false)}>
              <FaRegEdit />
            </button>
          ) : (
            <button onClick={() => setIsEdit((prev) => !prev)}>
              <FaEdit />
            </button>
          )}
          <button>
            <MdDelete />
          </button>
        </div>
      </div>
      {isView && <div>View</div>}
      {isEdit && <div>Edit</div>}
    </div>
  );
};

export default UserCard;
