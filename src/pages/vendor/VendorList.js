import React, { useEffect, useState } from "react";
import Layout from "../../component/layout/Layout";
import AddButton from "../../component/button/AddButton";
import H1 from "../../component/tag/H1";
import Container from "../../component/tag/Container";
import { useNavigate } from "react-router-dom";
import { environment } from "../../enviroment/enviroment";
import { IoIosSearch } from "react-icons/io";
import { MdEditSquare } from "react-icons/md";
import { IoEyeSharp } from "react-icons/io5";

const tableHeader = [
  { title: "Vendor Name" },
  { title: "Phone Number" },
  { title: "Display Name" },
  { title: "Status" },
  { title: "Action" },
];

const VendorList = () => {
  const router = useNavigate();
  const [list, islist] = useState([]);
  const [isPagination, setIsPagination] = useState({});
  const [searchTerm, setSearchTerm] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const defaultUserImage = "user2.png";
  console.log("isPagination-------->", isPagination);
  const dataListGet = async (page = 1) => {
    try {
      const response = await fetch(
        environment.apiUrl + `vendor/list?page=${page}`
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

  useEffect(() => {
    dataListGet(currentPage);
  }, [currentPage]);

  const filteredList = list.filter((item) =>
    (item.fullName?.toLowerCase() || "").includes(searchTerm.toLowerCase())
  );
  return (
    <Layout>
      <Container className="flex flex-row items-center justify-between">
        <H1>Vendors List</H1>
        <AddButton onClick={() => router("/vendor-add")}>Add Vendors</AddButton>
      </Container>
      <Container>
        <div>
          <div className="px-4 md:px-8 py-4 flex justify-start bg-teal-100">
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
                      src={
                        item.profileImage ? item.profileImage : defaultUserImage
                      }
                      alt="Bird"
                      className="w-8 h-8 rounded-full"
                    />{" "}
                    <span>{item.fullName}</span>
                  </td>
                  <td className="p-3">{item.phoneNo}</td>
                  <td className="p-3">{item.displayName}</td>
                  <td className="p-3">
                    {item.isActive === true ? (
                      <p className="w-6 h-6 rounded-full bg-green-600"></p>
                    ) : (
                      <p className="w-6 h-6 rounded-full bg-red-600"></p>
                    )}
                  </td>
                  <td className="p-3">
                    <span className="flex flex-row justify-center gap-4">
                      <button
                        onClick={() => {
                          sessionStorage.setItem("vendorId", item.id);
                          router("/vendor-edit");
                        }}
                      >
                        <MdEditSquare className="text-2xl" />
                      </button>
                      <button
                        onClick={() => {
                          sessionStorage.setItem("vendorId", item.id);
                          router("/vendor-view");
                        }}
                      >
                        <IoEyeSharp className="text-2xl" />
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
                Previous
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
                Next
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
    </Layout>
  );
};

export default VendorList;
