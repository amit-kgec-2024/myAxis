import React, { useEffect, useState } from "react";
import { environment } from "../../enviroment/enviroment";
import Layout from "../../component/layout/Layout";
import { FaTrash } from "react-icons/fa";
import { toast } from "react-toastify";
import { LuLoader2 } from "react-icons/lu";

const Furniture = () => {
  const [base64Image, setBase64Image] = useState("");
  const [imageSizeMessage, setImageSizeMessage] = useState("");
  const [messageColor, setMessageColor] = useState("green");
  const [list, setList] = useState([]);
  const [isLoader, setIsLoader] = useState(false);
  const [isLoader2, setIsLoader2] = useState(null);
  useEffect(() => {
    getBannerData();
  }, []);
  const getBannerData = async () => {
    const data = await fetch(environment.apiUrl + "banner/furniture/list");
    const resData = await data.json();
    setList(resData.list);
  };
  const handleFileChange = (e) => {
    const file = e.target.files[0];
    const maxSize = 1 * 1024 * 1024;

    if (file) {
      if (file.size > maxSize) {
        setImageSizeMessage("Image size exceeds 1MB.");
        setMessageColor("red");
        setBase64Image("");
      } else {
        setImageSizeMessage("Image size is within the 1MB limit.");
        setMessageColor("green");

        const reader = new FileReader();
        reader.readAsDataURL(file);
        reader.onloadend = () => {
          setBase64Image(reader.result);
        };
      }
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoader(true);
    try {
      if (base64Image) {
        const response = await fetch(environment.apiUrl + "banner/create", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ url: base64Image, bannerType: "Furniture" }),
        });
        const resData = await response.json();
        toast.success("Banner Upload Succesfully");
        getBannerData();
        console.log(resData);
        setIsLoader(false);
      }
    } catch (error) {
      console.log(error);
      setIsLoader(false);
    }
  };

  const handleDelete = async (e, id) => {
    e.preventDefault();
    const confirmDelete = window.confirm(
      "Are you sure you want to delete this banner?"
    );

    if (!confirmDelete) {
      return;
    }
    setIsLoader2(id);
    try {
      const response = await fetch(environment.apiUrl + `banner/delete/${id}`, {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
        },
      });
      const resData = await response.json();
      toast.success("Banner Deleted Successfully");
      getBannerData();
      console.log(resData);
      setIsLoader2(null);
    } catch (error) {
      console.log(error);
      setIsLoader2(null);
    }
  };

  return (
    <Layout>
      <div className="flex justify-center">
        <h1 className="font-bold text-3xl text-slate-500 py-4">
          Furniture Banner Image
        </h1>
      </div>
      <div className="flex flex-row justify-around">
        <div className="flex justify-start p-10 w-full">
          <form onSubmit={handleSubmit} className="w-full">
            <input
              className="shadow p-4"
              type="file"
              accept="image/*"
              onChange={handleFileChange}
            />
            {imageSizeMessage && (
              <p style={{ color: messageColor }}>{imageSizeMessage}</p>
            )}
            <div className="border shadow w-full h-60 my-5">
              {base64Image ? (
                <img src={base64Image} alt="Uploaded" className="w-full h-60" />
              ) : (
                <div className="w-full h-full flex items-center justify-center">
                  <h1 className="font-bold text-3xl text-slate-500">
                    Uplode Banner Image
                  </h1>
                </div>
              )}
            </div>
            <button
              disabled={!base64Image}
              type="submit"
              className="px-4 py-2 bg-red-400 font-semibold text-white rounded-sm"
            >
              {isLoader === true ? (
                <LuLoader2 className="animate-spin text-2xl" />
              ) : (
                "Submit"
              )}
            </button>
          </form>
        </div>
        <div className="w-full flex justify-center">
          <div className="flex flex-col gap-4 h-[600px] w-full overflow-x-scroll p-2">
            {list ? (
              <>
                {list.map((ele, index) => (
                  <div className="w-full flex gap-1 items-start" key={index}>
                    <img src={ele.url} alt="Bird" className="w-full h-44" />
                    <button
                      onClick={(e) => handleDelete(e, ele._id)}
                      className="text-red-800"
                    >
                      {isLoader2 === ele._id ? (
                        <LuLoader2 className="animate-spin" />
                      ) : (
                        <FaTrash />
                      )}
                    </button>
                  </div>
                ))}
              </>
            ) : (
              <>
                <h1>No Data found</h1>
              </>
            )}
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default Furniture;
