import React, { useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { admin } from "../data/AdminDashboard";
import { seller } from "../data/SellersDashboard";
import { delivery } from "../data/DeliveryDashboard";
import { vendor } from "../data/VendorDashboard";
import { helpdesk } from "../data/HelpdeskDashboard";
import { FaChevronDown, FaChevronUp } from "react-icons/fa";
import { TbCircleDotFilled } from "react-icons/tb";

const Dashboard = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const [expandedIndex, setExpandedIndex] = useState(null);

  const handleExpandClick = (index) => {
    setExpandedIndex(expandedIndex === index ? null : index);
  };

  const isActivePath = (path, children) => {
    if (path && location.pathname === path) return true;
    if (children) {
      return children.some((child) => location.pathname === child.path);
    }
    return false;
  };
  const isChildActive = (path) => location.pathname === path;
  const renderLavels = (data) => {
    const handleNavigation = (path) => {
      if (path) {
        navigate(path);
      }
    };

    return data.map((ele, index) => {
      if (ele.name) {
        const isActive = isActivePath(ele.path, ele.children);
        return (
          <div key={index} className="flex flex-col my-3">
            <button
              onClick={() => {
                handleNavigation(ele.path);
                if (ele.children) handleExpandClick(index);
              }}
              className={`flex items-center justify-between w-full px-5 py-2 text-lg rounded-md ${
                isActive
                  ? "bg-red-500 text-white font-bold"
                  : "hover:bg-slate-100"
              }`}
            >
              <span className="flex items-center gap-3">
                {ele.icon}
                {ele.name}
              </span>
              {ele.children ? (
                <span>
                  {expandedIndex === index ? (
                    <FaChevronUp />
                  ) : (
                    <FaChevronDown />
                  )}
                </span>
              ) : (
                <span></span>
              )}
            </button>
            {expandedIndex === index && ele.children && (
              <div className="ml-4">
                {ele.children.map((exe, childIndex) => {
                  const isActiveChild = isChildActive(exe.path);
                  return (
                    <button
                      key={childIndex}
                      onClick={() => handleNavigation(exe.path)}
                      className={`flex items-center gap-3 w-full px-4 py-2 rounded-md hover:bg-slate-100 ${
                        isActiveChild ? "font-bold" : ""
                      }`}
                    >
                      <span>
                        <TbCircleDotFilled />
                      </span>
                      <span>{exe.name}</span>
                    </button>
                  );
                })}
              </div>
            )}
          </div>
        );
      }
      return null; // Return null when ele.name is falsy
    });
  };

  let USERTYPE;
  if (typeof window !== "undefined") {
    USERTYPE = localStorage.getItem("userType");
  }
  const sideDashboard = (
    <div>
      {USERTYPE === "Admin" ? (
        <div>{renderLavels(admin)}</div>
      ) : USERTYPE === "Seller" ? (
        <div>{renderLavels(seller)}</div>
      ) : USERTYPE === "Delivery Partners" ? (
        <div>{renderLavels(helpdesk)}</div>
      ) : USERTYPE === "Help Desk" ? (
        <div>{renderLavels(delivery)}</div>
      ) : USERTYPE === "Vendor" ? (
        <div>{renderLavels(vendor)}</div>
      ) : (
        <div>{renderLavels(admin)}</div>
      )}
    </div>
  );
  return (
    <div className="w-[20rem] bg-teal-900 h-screen">
      <div className="flex justify-center items-center h-[10%]">
        <img src="/logofull.png" alt="IndMart" style={{ width: "9rem" }} />
      </div>
      <div className="overflow-auto h-[85%] scrollbar-thin scrollbar-thumb-blue-500 scrollbar-track-gray-200">
        {sideDashboard}
      </div>
    </div>
  );
};

export default Dashboard;
