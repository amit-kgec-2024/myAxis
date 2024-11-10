import React, { useEffect, useState } from "react";
import Input from "../../Input";
import Button from "../../Button";
import {
  optionStars,
  optionCategoryGrocery,
  optionSale,
} from "../../../utils/dropdown";
import { FaChevronLeft, FaChevronRight, FaEdit, FaPlus } from "react-icons/fa";
import ProductCard from "../ProductCard";
import Layout from "../../layout/Layout";
import { IoMdSearch } from "react-icons/io";
import { MdDelete, MdRemoveRedEye } from "react-icons/md";
import ImageUpload from "../../ImageUpload";
import { environment } from "../../../enviroment/enviroment";
import { toast } from "react-toastify";

const AdminGrocery = () => {
  const [getData, setGetdata] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [searchTerm, setSearchTerm] = useState("");
  const [isRegister, setIsRegister] = useState("list");
  const [productImage, setIsproductImage] = useState(null);
  const [isId, setisId] = useState(null);
  const [getDetails, setGetdetails] = useState("");
  console.log("---------------->", getDetails);
  const handelAdmin = (toggle, id) => {
    setIsRegister(toggle);
    setisId(id);
  };
  // GET request............

  const onChangeProduct = (base64Image) => {
    setIsproductImage(base64Image);
  };

  const fetchData = async () => {
    try {
      const res = await fetch(environment.apiUrl + "grocery/list");
      const jsonData = await res.json();
      setGetdata(jsonData);
    } catch (error) {
      console.log("Error Fetching Data", error);
    }
  };
  const fetchDetails = async () => {
    try {
      const res = await fetch(environment.apiUrl + `grocery/details/${isId}`);
      const jsonData = await res.json();
      setGetdetails(jsonData);
    } catch (error) {
      console.log("Error Fetching Data", error);
    }
  };
  useEffect(() => {
    fetchData();
  }, []);
  useEffect(() => {
    if (isId) {
      fetchDetails();
    }
  }, [isId, isRegister]);
  // POST request...........
  const [product, setProduct] = useState({
    title: "",
    price: "",
    models: "",
    discount: "",
    stars: "",
    category: "",
    sale: "",
  });
  // image POST MongoDB
  const handelSubmit = async (e) => {
    e.preventDefault();
    const res = await fetch(environment.apiUrl + "grocery/register", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        imgUrl: productImage,
        title: product.title,
        price: product.price,
        models: product.models,
        stars: product.stars,
        discount: product.discount,
        category: product.category,
        sale: product.sale,
      }),
    });
    fetchData();
    handelAdmin("list");
    toast.success("Product Add Succesfully");
    if (res.status === 400) {
      toast.error("Invalid Credintial!");
    } else {
      await res.json();
    }
  };

  // Delete Products..................
  const handleDelete = async (id) => {
    try {
      const response = await fetch(
        environment.apiUrl + `grocery/delete/${id}`,
        {
          method: "DELETE",
        }
      );
      fetchData();
      if (!response.ok) {
        throw new Error("Network response was not ok");
      }
    } catch (error) {
      console.error("Delete error:", error);
    }
  };
  const rowsPerPage = 15;

  const filteredUsers = getData.filter(
    (user) =>
      (user.product?.title?.toLowerCase() || "").includes(
        searchTerm.toLowerCase()
      ) ||
      (user.product?.models?.toLowerCase() || "").includes(
        searchTerm.toLowerCase()
      ) ||
      (user.product?.category?.toLowerCase() || "").includes(
        searchTerm.toLowerCase()
      )
  );

  const totalPages = Math.ceil(filteredUsers.length / rowsPerPage);

  const startIndex = (currentPage - 1) * rowsPerPage;
  const endIndex = startIndex + rowsPerPage;

  const currentRows = filteredUsers.slice(startIndex, endIndex);

  const handleNextPage = () => {
    if (currentPage < totalPages) {
      setCurrentPage(currentPage + 1);
    }
  };

  const handlePrevPage = () => {
    if (currentPage > 1) {
      setCurrentPage(currentPage - 1);
    }
  };

  return (
    <Layout>
      <div className="w-full bg-teal-500 text-white p-4 flex flex-row justify-between items-center">
        <h1>Beauty</h1>
        {(isRegister === "register" ||
          isRegister === "show" ||
          isRegister === "edit") && (
          <button
            onClick={() => handelAdmin("list")}
            className="flex items-center px-4 py-1 bg-red-500 gap-3"
          >
            Back
          </button>
        )}
      </div>
      {isRegister === "list" && (
        <div className="w-full overflow-hidden">
          <div className="text-2xl font-semibold p-4">Grocery List</div>
          <div className="flex items-center justify-between my-4 px-8">
            <div className="flex items-center border-2 px-3 rounded-xl">
              <IoMdSearch className="text-2xl" />
              <input
                type="text"
                placeholder="Search..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="px-4 py-2 w-full outline-none"
              />
            </div>
            <button
              onClick={() => handelAdmin("register")}
              className="flex items-center text-lg px-3 py-1 bg-red-600 text-white rounded-md gap-3"
            >
              <FaPlus /> Add Grocery
            </button>
          </div>
          <table className="w-full">
            <thead className="bg-slate-200">
              <tr>
                <th className="p-2">Sl No</th>
                <th className="p-2">Name</th>
                <th className="p-2">Price</th>
                <th className="p-2">Discount</th>
                <th className="p-2">Action</th>
              </tr>
            </thead>
            <tbody className="w-full">
              {currentRows.map((item, index) => (
                <tr key={index} className="border-b">
                  <td className="text-center p-2">{startIndex + index + 1}</td>
                  <td className="text-center p-2">{item.product.title}</td>
                  <td className="text-center p-2">{item.product.price}</td>
                  <td className="text-center p-2">{item.product.discount}</td>
                  <td className="text-center p-2">
                    <div className="text-xl flex justify-center text-slate-600 gap-5">
                      <button
                        onClick={() => handelAdmin("show", item.product.id)}
                      >
                        <MdRemoveRedEye />
                      </button>
                      <button
                        onClick={() => handelAdmin("edit", item.product.id)}
                      >
                        <FaEdit />
                      </button>
                      <button onClick={() => handleDelete(item.product.id)}>
                        <MdDelete />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
          <div className="flex justify-center gap-6 items-center mt-4">
            <button
              onClick={handlePrevPage}
              disabled={currentPage === 1}
              className="px-2 py-2 bg-gray-300 text-gray-700 rounded-full disabled:opacity-50"
            >
              <FaChevronLeft />
            </button>
            <span>
              Page {currentPage} of {totalPages}
            </span>
            <button
              onClick={handleNextPage}
              disabled={currentPage === totalPages}
              className="px-2 py-2 bg-gray-300 text-gray-700 rounded-full disabled:opacity-50"
            >
              <FaChevronRight />
            </button>
          </div>
        </div>
      )}
      {isRegister === "register" && (
        <div className="flex flex-col p-5 items-start justify-start w-full">
          <div className="text-2xl font-semibold p-4">Create Grocery</div>
          <form
            className="w-full flex flex-col"
            onSubmit={(e) => handelSubmit(e)}
          >
            <div className="flex gap-4">
              <Input
                label="Title"
                type="text"
                name="title"
                id="title"
                value={product.title}
                onChange={(e) =>
                  setProduct({ ...product, title: e.target.value })
                }
              />
              <Input
                label="Price"
                type="price"
                name="price"
                id="price"
                value={product.price}
                onChange={(e) =>
                  setProduct({ ...product, price: e.target.value })
                }
              />
            </div>
            <div className="flex gap-4">
              <Input
                label="Discount"
                type="discount"
                name="discount"
                id="discount"
                value={product.discount}
                onChange={(e) =>
                  setProduct({ ...product, discount: e.target.value })
                }
              />
              <Input
                label="Models"
                type="models"
                name="models"
                id="models"
                value={product.models}
                onChange={(e) =>
                  setProduct({ ...product, models: e.target.value })
                }
              />
            </div>
            <div className="flex gap-4 items-start justify-start">
              <div
                className="w-full p-2 border rounded mb-3 lg:mb-4"
                id="stars"
                value={product.stars}
                onChange={(e) =>
                  setProduct({ ...product, stars: e.target.value })
                }
              >
                <h1>Get select Stars</h1>
                <select className="form-select outline-none border">
                  {optionStars.map((option) => (
                    <option value={option.value}>{option.label}</option>
                  ))}
                </select>
              </div>
              <div
                className="w-full p-2 border rounded mb-3 lg:mb-4"
                id="category"
                value={product.category}
                onChange={(e) =>
                  setProduct({ ...product, category: e.target.value })
                }
              >
                <h1>Get select Catagories</h1>
                <select className="form-select outline-none border">
                  {optionCategoryGrocery.map((option) => (
                    <option value={option.value}>{option.label}</option>
                  ))}
                </select>
              </div>
              <div
                className="w-full p-2 border rounded mb-3 lg:mb-4"
                id="sale"
                value={product.sale}
                onChange={(e) =>
                  setProduct({ ...product, sale: e.target.value })
                }
              >
                <h1>Get select Sale</h1>
                <select className="form-select outline-none border">
                  {optionSale.map((option) => (
                    <option value={option.value}>{option.label}</option>
                  ))}
                </select>
              </div>
            </div>
            <div className="flex gap-4 items-start justify-start">
              <ImageUpload
                onImageUpload={onChangeProduct}
                initialLabel={"Add Pan Card Image"}
              />
            </div>
            <div className="">
              <Button type="submit" label="Add Product" />
            </div>
          </form>
        </div>
      )}
      {isRegister === "show" && (
        <div>
          <div className="flex items-center gap-3">
            {/* <Input value={isData.dob} label="DOB" />
            <Input value={isData.community} label="Community" />
            <Input value={isData.qulification} label="Qulification" /> */}
          </div>
        </div>
      )}
    </Layout>
  );
};

export default AdminGrocery;
