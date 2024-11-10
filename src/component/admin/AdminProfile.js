import React, { useEffect, useState } from "react";
import Layout from "../layout/Layout";
import { environment } from "../../enviroment/enviroment";
import Input from "../Input";

const AdminProfile = () => {
  const [isData, setIsData] = useState([]);
  let id;
  if (typeof window !== "undefined") {
    id = localStorage.getItem("id");
  }
  useEffect(() => {
    const fetchOneUsers = async () => {
      try {
        const response = await fetch(environment.apiUrl + `admin/boy/${id}`);
        if (!response.ok) {
          throw new Error("Network response was not ok");
        }
        const data = await response.json();
        setIsData(data);
      } catch (error) {
        console.log(error);
      }
    };

    fetchOneUsers();
  }, [id]);
  return (
    <Layout>
      <div>
        <div className="flex justify-center py-6">
          <img
            src={isData.profImage}
            alt=""
            className="w-40 h-40 rounded-full"
          />
        </div>
        <Input value={isData.regNo} label="Reg No" />
        <div className="flex items-center gap-3">
          <Input
            value={`${isData.firstname} ${isData.lastname}`}
            label="Name"
          />
          {isData.fatherName && (
            <Input value={isData.fatherName} label="Father Name" />
          )}
          {isData.husbandName && (
            <Input value={isData.husbandName} label="Husband Name" />
          )}
        </div>
        <div className="flex items-center gap-3">
          <Input value={isData.email} label="Email" />
          <Input value={isData.mobile} label="Mobile" />
          <Input value={isData.gender ? "Male" : "Female"} label="Gender" />
        </div>
        <div className="flex items-center gap-3">
          <Input value={isData.dob} label="DOB" />
          <Input value={isData.community} label="Community" />
          <Input value={isData.qulification} label="Qulification" />
        </div>
        <Input value={isData.permamentAddress} label="Permament Address" />
        <div className="flex items-center gap-3">
          <Input value={isData.state_name} label="State" />
          <Input value={isData.district_name} label="District" />
          <Input value={isData.pin} label="Pin" />
        </div>
        <Input value={isData.temporaryAddress} label="Temporary Address" />
        <label
          htmlFor="textBrif"
          className="block text-black font-bold text-sm mb-2"
        >
          Brief Description
        </label>
        <textarea
          id="textBrif"
          value={isData.briefDescription}
          className="rounded border shadow px-3 outline-none py-2 appearance-none w-full"
        />
        <div className="flex flex-row items-center justify-around">
          <div className="flex flex-col items-center justify-between px-6 py-3">
            <Input
              value={isData.panNumber}
              label="Pan Details"
              className="w-[40%]"
            />
            <img src={isData.panImage} alt="" className="w-60 h-48" />
          </div>
          <div className="flex flex-col items-center justify-between px-6 py-3">
            <Input
              value={isData.aadharNumber}
              label="Aadhar Details"
              className="w-[40%]"
            />
            <img src={isData.aadharImage} alt="" className="w-60 h-48" />
          </div>
          <div className="flex flex-col items-center justify-between px-6 py-3">
            <Input
              value={isData.bankNumber}
              label="Bank Details"
              className="w-[40%]"
            />
            <img src={isData.bankImage} alt="" className="w-60 h-48" />
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default AdminProfile;
