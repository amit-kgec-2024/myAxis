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

const HelpdeskEdit = () => {
  const navigate = useNavigate();
  const [helpdeskId, setHelpdeskId] = useState("");
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

  const [sameAspermanent, setSameAspermanent] = useState(false);
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
  console.log("view-d----->", helpdeskData);
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
        throw new Error("Failed to fetch vendor data");
      }
      const data = await response.json();
      setHelpdeskData(data);
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
      console.error("Error fetching vendor data:", error);
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

    setSameAspermanent(isSame);
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

  const handleCheckboxChange = () => {
    if (!sameAspermanent) {
      setPresentAddress1(permanentAddress1);
      setPresentAddress2(permanentAddress2);
      setPresentCity(permanentCity);
      setPresentCountry(permanentCountry);
      setPresentPincode(permanentPincode);
      setPresentStateId(permanentStateId);
    } else {
      setPresentAddress1("");
      setPresentAddress2("");
      setPresentCity("");
      setPresentCountry("");
      setPresentPincode("");
      setPresentStateId("");
    }
    setSameAspermanent(!sameAspermanent);
  };

  const handelSubmit = async (e) => {
    e.preventDefault(e);
    const data = {
      email: email,
      phoneNo: mobile,
      salution: selected,
      fullName: fullName,
      profileImage: isImage,
      password: password,
      permanentAddress1: permanentAddress1,
      permanentAddress2: permanentAddress2,
      permanentCity: permanentCity,
      permanentPincode: permanentPincode,
      permanentCountry: permanentCountry,
      permanentStateId: permanentStateId,
      presentAddress1: presentAddress1,
      presentAddress2: presentAddress2,
      presentCity: presentCity,
      presentPincode: presentPincode,
      presentCountry: presentCountry,
      presentStateId: presentStateId,
      panImage: panImage,
      aadharNumber: aadharNumber,
      aadharImage: aadharImage,
      panNumber: panNumber,
      accountHolder: accountHolder,
      bankName: bankName,
      accountNumber: accountNumber,
      ifscCode: ifscCode,
    };
    try {
      const response = await fetch(
        environment.apiUrl + `helpdesk/update/${helpdeskId}`,
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(data),
        }
      );
      await response.json();
      toast.success("Helpdesk Edit SuccesFully");
      navigate("/helpdesk-list");
    } catch (error) {
      console.log(error);
      toast.error("Error Server", error);
    }
  };
  return (
    <Layout>
      <Container>
        <div className="flex flex-wrap justify-around">
          <div className="flex flex-wrap gap-3 md:w-[70%]">
            <Dropdown
              options={salutionData}
              onChange={setSelected}
              defaultValue={selected}
            />
            <Input
              label="Full Name"
              type="text"
              placeholder="Name"
              value={fullName}
              onChange={setFullName}
            />
            <Input
              label="Delivery Email"
              type="email"
              placeholder="email"
              value={email}
              onChange={setEmail}
            />
            <Input
              label="Delivery phone"
              type="text"
              placeholder="phone"
              value={mobile}
              onChange={setMobile}
            />
            <Input
              label="Password"
              type="text"
              placeholder="passwords"
              value={password}
              onChange={setPassword}
            />
          </div>
          <div className="md:w-[30%]">
            <ImageUploads value={isImage} onChange={setImages} />
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
                placeholder="permanent Address 1"
              />
              <Input
                value={permanentAddress2}
                onChange={setPermanentAddress2}
                placeholder="permanent Address 2"
              />
              <StateDropdown
                options={isState}
                defaultValue={permanentStateId}
                onChange={setPermanentStateId}
              />
              <Input
                value={permanentCity}
                onChange={setPermanentCity}
                placeholder="permanent City"
              />
              <Input
                value={permanentPincode}
                onChange={setPermanentPincode}
                placeholder="permanent Pincode"
              />
              <Input
                value={permanentCountry}
                onChange={setPermanentCountry}
                placeholder="permanent Country"
              />
            </div>
            <div className="w-full md:w-[45%]">
              <H3>
                Present Address{" "}
                <span className="px-4">
                  <input
                    type="checkbox"
                    checked={sameAspermanent}
                    onChange={handleCheckboxChange}
                    className="w-4 h-4"
                  />
                </span>
                <span>Same as Permanent Address</span>
              </H3>
              <Input
                value={presentAddress1}
                onChange={setPresentAddress1}
                placeholder="Present Address 1"
              />
              <Input
                value={presentAddress2}
                onChange={setPresentAddress2}
                placeholder="Present Address 2"
              />
              <StateDropdown
                options={isState}
                defaultValue={presentStateId}
                onChange={setPresentStateId}
              />
              <Input
                value={presentCity}
                onChange={setPresentCity}
                placeholder="Present City"
              />
              <Input
                value={presentPincode}
                onChange={setPresentPincode}
                placeholder="Present Pincode"
              />
              <Input
                value={presentCountry}
                onChange={setPresentCountry}
                placeholder="Present Country"
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
              />
              <Input
                label="Bank Name"
                type="text"
                placeholder="Bank Name"
                value={bankName}
                onChange={setBankName}
              />
              <Input
                label="Account Number"
                type="text"
                placeholder="Account Number"
                value={accountNumber}
                onChange={setAccountNumber}
              />
              <Input
                label="IFSC Code"
                type="text"
                placeholder="IFSC Code"
                value={ifscCode}
                onChange={setIfscCode}
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
              />
              <ImageUploads value={panImage} onChange={setPanImage} />
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
                />
              </div>
              <ImageUploads value={aadharImage} onChange={setAadharImage} />
            </div>
          </div>
        </div>
        <div className="flex justify-end">
          <button
            onClick={(e) => handelSubmit(e)}
            className="text-sm md:text-lg text-white px-6 py-2 rounded-md bg-teal-700"
          >
            Update Now
          </button>
        </div>
      </Container>
    </Layout>
  );
};

export default HelpdeskEdit;
