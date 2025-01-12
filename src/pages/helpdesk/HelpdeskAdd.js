import React, { useEffect, useState } from "react";
import Layout from "../../component/layout/Layout";
import Container from "../../component/tag/Container";
import Input from "../../component/tag/Input";
import ImageUploads from "../../component/tag/ImageUploads";
import H1 from "../../component/tag/H1";
import Dropdown from "../../component/tag/Dropdown";
import { salutionData } from "../../utils/dropdown";
import H3 from "../../component/tag/H3";
import H2 from "../../component/tag/H2";
import { environment } from "../../enviroment/enviroment";
import StateDropdown from "../../component/tag/StateDropdown";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";

const HelpdeskAdd = () => {
  const router = useNavigate();
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

  const [sameState, setSameState] = useState(null);

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

  const [sameAsPermanent, setSameAsPermanent] = useState(false);

  const handleCheckboxChange = () => {
    setSameAsPermanent(!sameAsPermanent);
    if (!sameAsPermanent) {
      setPresentAddress1(permanentAddress1);
      setPresentAddress2(permanentAddress2);
      setPresentStateId(permanentStateId);
      setPresentCity(permanentCity);
      setPresentPincode(permanentPincode);
      setPresentCountry(permanentCountry);
      setSameState(permanentStateId);
    } else {
      setPresentAddress1("");
      setPresentAddress2("");
      setPresentStateId(null);
      setPresentCity("");
      setPresentPincode("");
      setPresentCountry("");
    }
  };

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
  useEffect(() => {
    fetchState();
  }, []);

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
      const response = await fetch(environment.apiUrl + "helpdesk/register", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
      });
      await response.json();
      toast.success("Help Desk Add SuccesFully");
      router("/helpdesk-list");
    } catch (error) {
      console.log(error);
      toast.error("Error Server", error);
    }
  };

  return (
    <Layout>
      <Container>
        <H1>Add Help Desk</H1>
      </Container>
      <Container>
        <div className="flex flex-wrap justify-around">
          <div className="flex flex-wrap gap-3 md:w-[70%]">
            <Dropdown options={salutionData} onChange={setSelected} />
            <Input
              label="Full Name"
              type="text"
              placeholder="Name"
              value={fullName}
              onChange={setFullName}
            />
            <Input
              label="Helpdesk phone"
              type="text"
              placeholder="phone"
              value={mobile}
              onChange={setMobile}
            />
            <Input
              label="Helpdesk Email"
              type="email"
              placeholder="email"
              value={email}
              onChange={setEmail}
            />
            <Input
              label="Password"
              type="password"
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
                placeholder="Permanent Address 1"
              />
              <Input
                value={permanentAddress2}
                onChange={setPermanentAddress2}
                placeholder="Permanent Address 2"
              />
              <StateDropdown options={isState} onChange={setPermanentStateId} />
              <Input
                value={permanentCity}
                onChange={setPermanentCity}
                placeholder="Permanent City"
              />
              <Input
                value={permanentPincode}
                onChange={setPermanentPincode}
                placeholder="Permanent Pincode"
              />
              <Input
                value={permanentCountry}
                onChange={setPermanentCountry}
                placeholder="Permanent Country"
              />
            </div>
            <div className="w-full md:w-[45%]">
              <H3>
                Present Address{" "}
                <span className="px-4">
                  <input
                    type="checkbox"
                    checked={sameAsPermanent}
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
                defaultValue={sameState}
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
            Submit
          </button>
        </div>
      </Container>
    </Layout>
  );
};

export default HelpdeskAdd;
