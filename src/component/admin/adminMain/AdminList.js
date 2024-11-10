import React, { useEffect, useState } from "react";
import { environment } from "../../../enviroment/enviroment";
import AdminRegister from "./AdminRegister";
import AdminView from "./AdminView";
import AdminEdit from "./AdminEdit";
import { toast } from "react-toastify";
import Layout from "../../layout/Layout";
import AdminCard from "../AdminCard";

const AdminList = ({ isManagement, handelManagement }) => {
  const [isId, setIsId] = useState();
  const [isSection, setIsSection] = useState("adminList");
  const handelToggle = (toggles, id) => {
    setIsSection(toggles);
    setIsId(id);
  };
  const [usersData, setUsers] = useState([]);
  useEffect(() => {
    fetchUsers();
  }, []);
  const fetchUsers = async () => {
    try {
      const response = await fetch(environment.apiUrl + "admin/list");
      if (!response.ok) {
        throw new Error("Network response was not ok");
      }
      const data = await response.json();
      setUsers(data);
    } catch (error) {
      console.loh(error);
    }
  };
  const handelDelete = async (id) => {
    const userConfirmed = window.confirm(
      "Are you sure you want to delete this item?"
    );

    if (userConfirmed) {
      try {
        const res = await fetch(environment.apiUrl + `admin/delete/${id}`, {
          method: "DELETE",
        });

        if (res.ok) {
          toast.success("Delete Successfully Admin");
          fetchUsers();
        }
      } catch (error) {
        console.log(error);
        toast.error("Delete operation was canceled by the user.");
      }
    } else {
      toast.error("Delete operation was canceled by the user.");
      console.log("Delete operation was canceled by the user.");
    }
  };

  return (
    <Layout>
      <div className="w-full overflow-hidden">
        {isSection === "adminList" && (
          <AdminCard
            usersData={usersData}
            isManagement={isManagement}
            handelManagement={handelManagement}
            handelToggle={handelToggle}
            handelDelete={handelDelete}
          />
        )}
        {isSection === "registerAdmin" && (
          <AdminRegister
            setIsSection={setIsSection}
            handelToggle={handelToggle}
          />
        )}
        {isSection === "showAdmin" && (
          <AdminView setIsSection={setIsSection} isId={isId} />
        )}
        {isSection === "editAdmin" && (
          <AdminEdit
            setIsSection={setIsSection}
            isId={isId}
            fetchUsers={fetchUsers}
          />
        )}
      </div>
    </Layout>
  );
};

export default AdminList;
