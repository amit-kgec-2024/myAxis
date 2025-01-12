import React, { useEffect, useState } from "react";
import Layout from "../../component/layout/Layout";
import AddButton from "../../component/button/AddButton";
import H1 from "../../component/tag/H1";
import Container from "../../component/tag/Container";
import { useNavigate } from "react-router-dom";
import { environment } from "../../enviroment/enviroment";
import { IoIosSearch } from "react-icons/io";
import { MdEditSquare } from "react-icons/md";
import { MdDelete } from "react-icons/md";
import { toast } from "react-toastify";
import ToggleSwitch from "../../component/tag/ToggleSwitch";
import { RxTrackPrevious, RxTrackNext } from "react-icons/rx";

const tableHeader = [
  { title: "Category Name" },
  { title: "Category" },
  { title: "Products" },
  { title: "Status" },
  { title: "Action" },
];

const CategoryList = () => {
  const router = useNavigate();
  const [list, islist] = useState([]);
  const [isPagination, setIsPagination] = useState({});
  const [searchTerm, setSearchTerm] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [listDeactive, islistDeactive] = useState([]);
  const [isPaginationDeactive, setIsPaginationDeactive] = useState({});
  const [searchTermDeactive, setSearchTermDeactive] = useState("");
  const [currentPageDeactive, setCurrentPageDeactive] = useState(1);
  const [isActive, setDeActive] = useState(1);
  const defaultUserImage = "user2.png";
  console.log("isPagination-------->", currentPage);
  console.log("listDeactive-------->", currentPageDeactive);

  const handelActive = (toggleActive) => {
    setDeActive(toggleActive);
  };

  const dataListGet = async (page = 1) => {
    // active
    try {
      const response = await fetch(
        environment.apiUrl + `category/list?page=${page}`
      );
      if (!response.ok) {
        throw new Error("Network response was not ok");
      }
      const dataList = await response.json();
      islist(dataList.list);
      setIsPagination(dataList.pagination);
    } catch (error) {
      console.log(error);
    }
  };
  const dataListGetDeactive = async (page = 1) => {
    // DEactive
    try {
      const responsedeactive = await fetch(
        environment.apiUrl + `category/list/deactive?page=${page}`
      );
      if (!responsedeactive.ok) {
        throw new Error("Network response deactive was not ok");
      }
      const dataListdeactive = await responsedeactive.json();
      islistDeactive(dataListdeactive.list);
      setIsPaginationDeactive(dataListdeactive.pagination);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    dataListGet(currentPage);
    dataListGetDeactive(currentPageDeactive);
  }, [currentPage, currentPageDeactive]);

  const deleteCategory = async (id) => {
    if (window.confirm("Are you sure you want to delete this category?")) {
      try {
        const response = await fetch(
          environment.apiUrl + `category/delete/${id}`,
          {
            method: "DELETE",
            headers: {
              "Content-Type": "application/json",
            },
          }
        );
        if (response.ok) {
          console.log("Delete Successful");
          toast.success("Delete Successful");
          dataListGet();
          dataListGetDeactive();
        }
      } catch (error) {
        console.error("Error deleting data:", error);
        alert("Failed to delete the parent category.");
      }
    }
  };

  const handleToggle = async (id) => {
    try {
      const response = await fetch(
        environment.apiUrl + `category/status/${id}`,
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
          },
        }
      );
      if (response.ok) {
        console.log("Status Update Successful");
        toast.success("Status Update Successful");
        dataListGet();
        dataListGetDeactive();
      }
    } catch (error) {
      console.error("Error Status Update data:", error);
      alert("Failed to Status Update the parent category.");
    }
  };

  const filteredList = list.filter((item) =>
    // active
    (item.categoryName?.toLowerCase() || "").includes(searchTerm.toLowerCase())
  );

  const filteredListDeactive = listDeactive.filter((item) =>
    // deactive
    (item.categoryName?.toLowerCase() || "").includes(
      searchTermDeactive.toLowerCase()
    )
  );

  return (
    <Layout>
      <Container className="flex flex-row items-center justify-between">
        <H1>Category List</H1>
        <AddButton onClick={() => router("/category-add")}>
          Add Category
        </AddButton>
      </Container>
      <Container className={`${isActive === 1 ? "block" : "hidden"}`}>
        <div>
          <div className="px-4 md:px-8 py-4 flex justify-between bg-teal-100">
            <div className="flex flex-row items-center gap-3 py-2 px-4 border-2 border-black bg-white rounded-lg">
              <IoIosSearch className="text-2xl" />
              <input
                type="text"
                placeholder="Search..."
                value={searchTerm}
                className="outline-none"
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </div>
            <div>
              <button
                onClick={() => handelActive(2)}
                className="text-sm md:text-lg text-white px-6 py-2 rounded-md bg-red-700"
              >
                DeActive
              </button>
            </div>
          </div>
          <table className="my-2 w-full">
            <thead className="bg-slate-200">
              <tr>
                {tableHeader.map((ele, index) => (
                  <th
                    className={`text-${
                      ele.title === "Action" ? "center" : "start"
                    } p-3`}
                    key={index}
                  >
                    {ele.title}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {filteredList.map((item, index) => (
                <tr key={index} className="border-b-2">
                  <td className="p-3 flex items-center flex-row gap-2">
                    <img
                      src={item.src ? item.src : defaultUserImage}
                      alt="Bird"
                      className="w-8 h-8 rounded-full"
                    />{" "}
                    <span>{item.categoryName}</span>
                  </td>
                  <td className="p-3">05</td>
                  <td className="p-3">{item.productCount}</td>
                  <td className="p-3">
                    <ToggleSwitch
                      isRight={item.isActive}
                      handleToggle={() => handleToggle(item.id)}
                    />
                  </td>
                  <td className="p-3">
                    <span className="flex flex-row justify-center gap-4">
                      <button
                        onClick={() => {
                          sessionStorage.setItem("categoryId", item.id);
                          router("/category-edit");
                        }}
                      >
                        <MdEditSquare className="text-2xl" />
                      </button>
                      <button onClick={() => deleteCategory(item.id)}>
                        <MdDelete className="text-2xl" />
                      </button>
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
          {isPagination.totalPages === 0 ? (
            <></>
          ) : (
            <div className="flex justify-center items-center gap-4 my-4">
              <button
                disabled={currentPage === 1}
                onClick={() => setCurrentPage(1)}
                className={`px-4 py-2 rounded ${
                  currentPage === 1
                    ? "bg-gray-400 text-gray-200 cursor-not-allowed"
                    : "bg-blue-500 text-white"
                }`}
              >
                First
              </button>
              <button
                disabled={currentPage === 1}
                onClick={() => setCurrentPage(currentPage - 1)}
                className={`px-4 py-2 rounded ${
                  currentPage === 1
                    ? "bg-gray-400 text-gray-200 cursor-not-allowed"
                    : "bg-blue-500 text-white"
                }`}
              >
                <RxTrackPrevious />
              </button>
              <span>
                Page {currentPage} of {isPagination.totalPages}
              </span>
              <button
                disabled={currentPage === isPagination.totalPages}
                onClick={() => setCurrentPage(currentPage + 1)}
                className={`px-4 py-2 rounded ${
                  currentPage === isPagination.totalPages
                    ? "bg-gray-400 text-gray-200 cursor-not-allowed"
                    : "bg-blue-500 text-white"
                }`}
              >
                <RxTrackNext />
              </button>
              <button
                disabled={currentPage === isPagination.totalPages}
                onClick={() => setCurrentPage(isPagination.totalPages)}
                className={`px-4 py-2 rounded ${
                  currentPage === isPagination.totalPages
                    ? "bg-gray-400 text-gray-200 cursor-not-allowed"
                    : "bg-blue-500 text-white"
                }`}
              >
                Last
              </button>
            </div>
          )}
        </div>
      </Container>
      <Container className={`${isActive === 2 ? "block" : "hidden"}`}>
        <div>
          <div className="px-4 md:px-8 py-4 flex justify-between bg-teal-100">
            <div className="flex flex-row items-center gap-3 py-2 px-4 border-2 border-black bg-white rounded-lg">
              <IoIosSearch className="text-2xl" />
              <input
                type="text"
                placeholder="Search..."
                value={searchTermDeactive}
                className="outline-none"
                onChange={(e) => setSearchTermDeactive(e.target.value)}
              />
            </div>
            <div>
              <button
                onClick={() => handelActive(1)}
                className="text-sm md:text-lg text-white px-6 py-2 rounded-md bg-green-700"
              >
                Active
              </button>
            </div>
          </div>
          <table className="my-2 w-full">
            <thead className="bg-slate-200">
              <tr>
                {tableHeader.map((ele, index) => (
                  <th
                    className={`text-${
                      ele.title === "Action" ? "center" : "start"
                    } p-3`}
                    key={index}
                  >
                    {ele.title}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {filteredListDeactive.map((item, index) => (
                <tr key={index} className="border-b-2">
                  <td className="p-3 flex items-center flex-row gap-2">
                    <img
                      src={item.src ? item.src : defaultUserImage}
                      alt="Bird"
                      className="w-8 h-8 rounded-full"
                    />{" "}
                    <span>{item.categoryName}</span>
                  </td>
                  <td className="p-3">05</td>
                  <td className="p-3">{item.productCount}</td>
                  <td className="p-3">
                    <ToggleSwitch
                      isRight={item.isActive}
                      handleToggle={() => handleToggle(item.id)}
                    />
                  </td>
                  <td className="p-3">
                    <span className="flex flex-row justify-center gap-4">
                      <button
                        onClick={() => {
                          sessionStorage.setItem("categoryId", item.id);
                          router("/category-edit");
                        }}
                      >
                        <MdEditSquare className="text-2xl" />
                      </button>
                      <button onClick={() => deleteCategory(item.id)}>
                        <MdDelete className="text-2xl" />
                      </button>
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
          {isPaginationDeactive.totalPages === 0 ? (
            <></>
          ) : (
            <div className="flex justify-center items-center gap-4 my-4">
              <button
                disabled={currentPageDeactive === 1}
                onClick={() => setCurrentPageDeactive(1)}
                className={`px-4 py-2 rounded ${
                  currentPageDeactive === 1
                    ? "bg-gray-400 text-gray-200 cursor-not-allowed"
                    : "bg-blue-500 text-white"
                }`}
              >
                First
              </button>
              <button
                disabled={currentPageDeactive === 1}
                onClick={() => setCurrentPageDeactive(currentPageDeactive - 1)}
                className={`px-4 py-2 rounded ${
                  currentPageDeactive === 1
                    ? "bg-gray-400 text-gray-200 cursor-not-allowed"
                    : "bg-blue-500 text-white"
                }`}
              >
                Previous
              </button>
              <span>
                Page {currentPageDeactive} of {isPaginationDeactive.totalPages}
              </span>
              <button
                disabled={currentPageDeactive === isPagination.totalPages}
                onClick={() => setCurrentPageDeactive(currentPageDeactive + 1)}
                className={`px-4 py-2 rounded ${
                  currentPageDeactive === isPaginationDeactive.totalPages
                    ? "bg-gray-400 text-gray-200 cursor-not-allowed"
                    : "bg-blue-500 text-white"
                }`}
              >
                <RxTrackPrevious />
              </button>
              <button
                disabled={
                  currentPageDeactive === isPaginationDeactive.totalPages
                }
                onClick={() =>
                  setCurrentPageDeactive(isPaginationDeactive.totalPages)
                }
                className={`px-4 py-2 rounded ${
                  currentPageDeactive === isPaginationDeactive.totalPages
                    ? "bg-gray-400 text-gray-200 cursor-not-allowed"
                    : "bg-blue-500 text-white"
                }`}
              >
                <RxTrackNext />
              </button>
            </div>
          )}
        </div>
      </Container>
    </Layout>
  );
};

export default CategoryList;
