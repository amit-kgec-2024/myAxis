import React, { useState } from "react";
import { MdDelete } from "react-icons/md";
import { MdRemoveRedEye } from "react-icons/md";
import { FaEdit } from "react-icons/fa";
import { FaChevronLeft } from "react-icons/fa6";
import { FaChevronRight } from "react-icons/fa6";
import { IoMdSearch } from "react-icons/io";
import { FaPlus } from "react-icons/fa6";

const AdminCard = ({
  usersData = [],
  handelManagement,
  handelToggle,
  isManagement,
  handelDelete,
}) => {
  const [currentPage, setCurrentPage] = useState(1);
  const [searchTerm, setSearchTerm] = useState("");
  const rowsPerPage = 15;

  const filteredUsers = usersData.filter(
    (user) =>
      (user.firstname?.toLowerCase() || "").includes(
        searchTerm.toLowerCase()
      ) ||
      (user.lastname?.toLowerCase() || "").includes(searchTerm.toLowerCase()) ||
      (user.email?.toLowerCase() || "").includes(searchTerm.toLowerCase()) ||
      (String(user.mobile) || "").includes(searchTerm) ||
      (user.regNo || "").includes(searchTerm)
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
    <div>
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
          onClick={() => handelToggle("registerAdmin")}
          className="flex items-center text-lg px-3 py-1 bg-red-600 text-white rounded-md gap-3"
        >
          <FaPlus /> Add Admins
        </button>
      </div>

      <table className="w-full">
        <thead className="bg-slate-200">
          <tr>
            <th className="p-2">Sl No</th>
            <th className="p-2">Name</th>
            <th className="p-2">Email</th>
            <th className="p-2">Mobile</th>
            <th className="p-2">Code</th>
            <th className="p-2">Action</th>
          </tr>
        </thead>
        <tbody className="w-full">
          {currentRows.map((item, index) => (
            <tr key={index} className="border-b">
              <td className="text-center p-2">{startIndex + index + 1}</td>
              <td className="text-center p-2">
                {item.firstname} {item.lastname}
              </td>
              <td className="text-center p-2">{item.email}</td>
              <td className="text-center p-2">{item.mobile}</td>
              <td className="text-center p-2">{item.regNo}</td>
              <td className="text-center p-2">
                <div className="text-xl flex justify-center text-slate-600 gap-5">
                  <button onClick={() => handelToggle("showAdmin", item._id)}>
                    <MdRemoveRedEye />
                  </button>
                  <button onClick={() => handelToggle("editAdmin", item._id)}>
                    <FaEdit />
                  </button>
                  <button onClick={() => handelDelete(item._id)}>
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
  );
};

export default AdminCard;
