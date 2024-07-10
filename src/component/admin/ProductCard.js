import React, { useState } from "react";
import { MdDelete } from "react-icons/md";
import { MdRemoveRedEye } from "react-icons/md";
import { FaEdit } from "react-icons/fa";
import { FaRegEdit } from "react-icons/fa";
import { IoEyeOff } from "react-icons/io5";

const ProductCard = ({
  id,
  title,
  img,
  price,
  discount,
  category,
  sale,
  stars,
  handleDelete,
}) => {
  const [isView, setIsView] = useState(false);
  const [isEdit, setIsEdit] = useState(false);

  return (
    <div className="border-b">
      <div className="flex flex-row items-center justify-between p-4">
        <div className="flex flex-row items-center gap-4 text-ellipsis">
          <img src={img} width={20} alt={id} />
          {id}
          <h1>{title}</h1>
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
          <button onClick={() => handleDelete(id)}>
            <MdDelete />
          </button>
        </div>
      </div>
      {isView && (
        <div className="flex flex-row justify-around items-center p-3 gap-4 w-full">
          <img src={img} alt={title} className="w-[200px] h-[200px] " />
          <div className="flex flex-col justify-between w-full">
            <h1 className="font-bold text-sm mb-2">
              Price: <span className="text-green-400">{price}</span>
            </h1>
            <h1 className="font-bold text-sm mb-2">
              Discount: <span className="text-green-400">{discount}</span>
            </h1>
            <h1 className="font-bold text-sm mb-2">
              Stars: <span className="text-green-400">{stars}</span>
            </h1>
            <h1 className="font-bold text-sm mb-2">
              Category: <span className="text-green-400">{category}</span>
            </h1>
            <h1 className="font-bold text-sm mb-2">
              Sale: <span className="text-green-400">{sale}</span>
            </h1>
          </div>
        </div>
      )}
      {isEdit && <div>Edit</div>}
    </div>
  );
};

export default ProductCard;
