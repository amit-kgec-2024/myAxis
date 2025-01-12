import React, { useEffect, useState } from "react";
import Layout from "../../component/layout/Layout";
import { useNavigate } from "react-router-dom";
import { environment } from "../../enviroment/enviroment";
import Input from "../../component/tag/Input";
import Container from "../../component/tag/Container";
import ImageUploads from "../../component/tag/ImageUploads";
import H3 from "../../component/tag/H3";
import StateDropdown from "../../component/tag/StateDropdown";
import H2 from "../../component/tag/H2";
import Dropdown from "../../component/tag/Dropdown";
import { salutionData } from "../../utils/dropdown";
import { toast } from "react-toastify";

const HelpdeskView = () => {
  const navigate = useNavigate();
  const [helpdeskId, setHelpdeskId] = useState("");
  const [isActive, setIsActive] = useState(null);
  const [helpdeskData, setHelpdeskData] = useState(null);
  const [isImage, setImages] = useState("");
  const [password, setPassword] = useState("");
  const [selected, setSelected] = useState("");
  const [fullName, setFullName] = useState("");
  const [email, setEmail] = useState("");
  const [mobile, setMobile] = useState("");
  const [permanentAddress1, setPermanentAddress1] = useState("");
  const [permanentAddress2, setPermanentAddress2] = useState("");
  const [permanentStateId, setPermanentStateId] = useState(null);
  const [permanentCity, setPermanentCity] = useState("");
  const [permanentPincode, setPermanentPincode] = useState("");
  const [permanentCountry, setPermanentCountry] = useState("");

  const [presentAddress1, setPresentAddress1] = useState("");
  const [presentAddress2, setPresentAddress2] = useState("");
  const [presentStateId, setPresentStateId] = useState(null);
  const [presentCity, setPresentCity] = useState("");
  const [presentPincode, setPresentPincode] = useState("");
  const [presentCountry, setPresentCountry] = useState("");

  const [isState, setIsState] = useState([]);
  const [panNumber, setPanNumber] = useState("");
  const [panImage, setPanImage] = useState("");
  const [aadharNumber, setAadharNumber] = useState("");
  const [aadharImage, setAadharImage] = useState("");

  const [accountHolder, setAccountHolderName] = useState("");
  const [bankName, setBankName] = useState("");
  const [accountNumber, setAccountNumber] = useState("");
  const [ifscCode, setIfscCode] = useState("");

  const [sameAsBilling, setSameAsBilling] = useState(false);
  const userType = sessionStorage.getItem("userType");

  const fetchState = async () => {
    try {
      const response = await fetch(environment.apiUrl + "state/list");
      if (!response.ok) {
        throw new Error("Network response was not ok");
      }
      const dataState = await response.json();
      setIsState(dataState);
    } catch (error) {
      console.log(error);
    }
  };
  console.log("Id------>", helpdeskId);
  console.log("view------>", helpdeskData);
  useEffect(() => {
    fetchState();
    const helpdeskId = sessionStorage.getItem("helpdeskId");
    setHelpdeskId(helpdeskId);
    if (!helpdeskId) {
      navigate("/helpdesk-list");
    } else {
      fetchHelpdeskData(helpdeskId);
    }
  }, [navigate]);

  const fetchHelpdeskData = async (helpdeskId) => {
    try {
      const response = await fetch(
        environment.apiUrl + `helpdesk/view/${helpdeskId}`
      );
      if (!response.ok) {
        throw new Error("Failed to fetch helpdesk data");
      }
      const data = await response.json();
      setHelpdeskData(data);
      setIsActive(data.data?.isActive);
      setFullName(data.data?.fullName);
      setSelected(data.data?.salution);
      setEmail(data.data?.email);
      setMobile(data.data?.phoneNo);
      setPassword(data.data?.passwords);
      setImages(data.data?.profileImage);
      setPermanentAddress1(data.data?.permanentAddress1);
      setPermanentAddress2(data.data?.permanentAddress2);
      setPermanentCity(data.data?.permanentCity);
      setPermanentCountry(data.data?.permanentCountry);
      setPermanentPincode(data.data?.permanentPincode);
      setPermanentStateId(data.data?.permanentStateId);
      setPresentAddress1(data.data?.presentAddress1);
      setPresentAddress2(data.data?.presentAddress2);
      setPresentCity(data.data?.presentCity);
      setPresentCountry(data.data?.presentCountry);
      setPresentPincode(data.data?.presentPincode);
      setPresentStateId(data.data?.presentStateId);
      setAadharImage(data.data?.aadharImage);
      setAadharNumber(data.data?.aadharNumber);
      setPanImage(data.data?.panImage);
      setPanNumber(data.data?.panNumber);
      setAccountHolderName(data.bankDetails?.accountHolder);
      setAccountNumber(data.bankDetails?.accountNumber);
      setBankName(data.bankDetails?.bankName);
      setIfscCode(data.bankDetails?.ifscCode);
    } catch (error) {
      console.error("Error fetching Helpdesk data:", error);
    }
  };
  useEffect(() => {
    const isSame =
      permanentAddress1 === presentAddress1 &&
      permanentAddress2 === presentAddress2 &&
      permanentCity === presentCity &&
      permanentCountry === presentCountry &&
      permanentPincode === presentPincode &&
      permanentStateId === presentStateId;

    setSameAsBilling(isSame);
  }, [
    permanentAddress1,
    permanentAddress2,
    permanentCity,
    permanentCountry,
    permanentPincode,
    permanentStateId,
    presentAddress1,
    presentAddress2,
    presentCity,
    presentCountry,
    presentPincode,
    presentStateId,
  ]);

  const handelDelete = async (e) => {
    e.preventDefault();
    const isConfirmed = window.confirm(
      "Are you sure you want to Permanent delete this helpdesk?"
    );
    if (!isConfirmed) return;
    try {
      const response = await fetch(
        environment.apiUrl + `helpdesk/delete/${helpdeskId}`,
        {
          method: "DELETE",
          headers: {
            "Content-Type": "application/json",
          },
        }
      );
      if (response.ok) {
        toast.success("Help Desk Permanent Delete Successfully");
        navigate("/helpdesk-list");
      } else {
        console.error("Failed to delete bank from the server");
      }
    } catch (error) {
      console.log(error);
    }
  };
  const handelStatus = async (e) => {
    e.preventDefault();
    const isConfirmed = window.confirm(
      `Are you sure you want to ${
        isActive === true ? "DeActive" : "Active"
      } this helpdesk?`
    );
    if (!isConfirmed) return;
    try {
      const response = await fetch(
        environment.apiUrl + `helpdesk/status/${helpdeskId}`,
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
          },
        }
      );
      if (response.ok) {
        fetchHelpdeskData(helpdeskId);
        toast.success(
          `Help Desk ${isActive === true ? "DeActive" : "Active"} Successfully`
        );
      } else {
        console.error("Failed to delete bank from the server");
      }
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <Layout>
      <Container>
        <div
          className={`${
            userType === "Admin" ? "flex" : "hidden"
          } flex-row items-center gap-4 justify-end px-2 md:px-5 py-3`}
        >
          <button
            onClick={(e) => handelStatus(e)}
            className={`px-6 py-2 text-white ${
              isActive === true ? "bg-red-600" : "bg-green-600"
            } outline-none rounded-md font-semibold`}
          >
            {isActive === true ? "DeActive" : "Active"}
          </button>
          <button
            onClick={(e) => handelDelete(e)}
            className="px-6 py-2 text-white bg-red-600 outline-none rounded-md font-semibold"
          >
            Delete
          </button>
        </div>
        <div className="flex flex-wrap justify-around">
          <div className="flex flex-wrap gap-3 md:w-[70%]">
            <Dropdown
              options={salutionData}
              onChange={setSelected}
              defaultValue={selected}
              readOnly={true}
            />
            <Input
              label="Full Name"
              type="text"
              placeholder="Name"
              value={fullName}
              onChange={setFullName}
              readOnly={true}
            />
            <Input
              label="Helpdesk Email"
              type="email"
              placeholder="email"
              value={email}
              onChange={setEmail}
              readOnly={true}
            />
            <Input
              label="Helpdesk phone"
              type="text"
              placeholder="phone"
              value={mobile}
              onChange={setMobile}
              readOnly={true}
            />
            <Input
              label="Password"
              type="text"
              placeholder="passwords"
              value={password}
              onChange={setPassword}
              readOnly={true}
            />
          </div>
          <div className="md:w-[30%]">
            <ImageUploads redOnly={true} value={isImage} onChange={setImages} />
          </div>
        </div>
        <div className="w-full py-2">
          <div className="bg-teal-100 py-4 px-2">
            <H2>Address</H2>
          </div>
          <div className="flex flex-wrap py-4 justify-around gap-5 w-full">
            <div className="w-full md:w-[45%]">
              <H3>Permanent Address</H3>
              <Input
                value={permanentAddress1}
                onChange={setPermanentAddress1}
                placeholder="Permanent Address 1"
                readOnly={true}
              />
              <Input
                value={permanentAddress2}
                onChange={setPermanentAddress2}
                placeholder="Permanent Address 2"
                readOnly={true}
              />
              <StateDropdown
                options={isState}
                onChange={setPermanentStateId}
                readOnly={true}
                defaultValue={permanentStateId}
              />
              <Input
                value={permanentCity}
                onChange={setPermanentCity}
                placeholder="Permanent City"
                readOnly={true}
              />
              <Input
                value={permanentPincode}
                onChange={setPermanentPincode}
                placeholder="Permanent Pincode"
                readOnly={true}
              />
              <Input
                value={permanentCountry}
                onChange={setPermanentCountry}
                placeholder="Permanent Country"
                readOnly={true}
              />
            </div>
            <div className="w-full md:w-[45%]">
              <H3>
                Present Address{" "}
                <span className="px-4">
                  <input
                    type="checkbox"
                    checked={sameAsBilling}
                    className="w-4 h-4"
                  />
                </span>
                <span>Same as Permanent Address</span>
              </H3>
              <Input
                value={presentAddress1}
                onChange={setPresentAddress1}
                placeholder="Present Address 1"
                readOnly={true}
              />
              <Input
                value={presentAddress2}
                onChange={setPresentAddress2}
                placeholder="Present Address 2"
                readOnly={true}
              />
              <StateDropdown
                options={isState}
                onChange={setPresentStateId}
                readOnly={true}
                defaultValue={presentStateId}
              />
              <Input
                value={presentCity}
                onChange={setPresentCity}
                placeholder="Present City"
                readOnly={true}
              />
              <Input
                value={presentPincode}
                onChange={setPresentPincode}
                placeholder="Present Pincode"
                readOnly={true}
              />
              <Input
                value={presentCountry}
                onChange={setPresentCountry}
                placeholder="Present Country"
                readOnly={true}
              />
            </div>
          </div>
        </div>
        <div className="w-full py-2">
          <div className="bg-teal-100 py-4 px-2">
            <H2>Bank Details</H2>
          </div>
          <div className="">
            <div className="flex flex-row gap-2 py-4">
              <Input
                label="Account Holder Name"
                type="text"
                placeholder="Account Holder Name"
                value={accountHolder}
                onChange={setAccountHolderName}
                readOnly={true}
              />
              <Input
                label="Bank Name"
                type="text"
                placeholder="Bank Name"
                value={bankName}
                onChange={setBankName}
                readOnly={true}
              />
              <Input
                label="Account Number"
                type="text"
                placeholder="Account Number"
                value={accountNumber}
                onChange={setAccountNumber}
                readOnly={true}
              />
              <Input
                label="IFSC Code"
                type="text"
                placeholder="IFSC Code"
                value={ifscCode}
                onChange={setIfscCode}
                readOnly={true}
              />
            </div>
          </div>
        </div>
        <div className="w-full py-2">
          <div className="bg-teal-100 py-4 px-2">
            <H2>Other Details(Documents)</H2>
          </div>
          <div className="">
            <div className="flex flex-row gap-2 py-4 justify-between">
              <Input
                label="Pan Number"
                type="text"
                placeholder="Pan Number"
                value={panNumber}
                onChange={setPanNumber}
                readOnly={true}
              />
              <ImageUploads
                redOnly={true}
                value={panImage}
                onChange={setPanImage}
              />
            </div>
          </div>
          <div className="">
            <div className="flex flex-row gap-2 py-4 justify-between">
              <div className="flex flex-wrap gap-4">
                <Input
                  label="Aadhar Number"
                  type="text"
                  placeholder="Aadhar Number"
                  value={aadharNumber}
                  onChange={setAadharNumber}
                  readOnly={true}
                />
              </div>
              <ImageUploads
                redOnly={true}
                value={aadharImage}
                onChange={setAadharImage}
              />
            </div>
          </div>
        </div>
      </Container>
    </Layout>
  );
};

export default HelpdeskView;
