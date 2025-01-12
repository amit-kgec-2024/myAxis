import React from "react";
import { useNavigate } from "react-router-dom";

const Page404 = () => {
  const navigate = useNavigate();
  const handelGoBack = () => {
    navigate(-1);
  };
  return (
    <div className="flex flex-col justify-center items-center w-full h-screen">
      <img src="../6325257.png" alt="Bird" />
      <h1 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold text-teal-950">
        Uh-oh, page not found...
      </h1>
      <button
        onClick={handelGoBack}
        className="bg-teal-700 mt-6 text-xl text-white uppercase rounded-md px-6 py-1 font-bold"
      >
        Go Back
      </button>
    </div>
  );
};

export default Page404;
