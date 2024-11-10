import React, { useState } from "react";
import RegisterStep2 from "./RegisterStep2";
import RegisterStap1 from "./RegisterStap1";
import { environment } from "../../../enviroment/enviroment";
import { toast } from "react-toastify";

const AdminRegister = ({ setIsSection, handelToggle }) => {
  const [errors, setErrors] = useState({});
  const [userRegNo, setUserRegNo] = useState();
  const [profileImage, setIsProfileImage] = useState(null);
  const [aadharImage, setIsaadharImage] = useState(null);
  const [panImage, setIspanImage] = useState(null);
  const [bankImage, setIsbankImage] = useState(null);
  const [firstname, setFirstname] = useState("");
  const [lastname, setLastname] = useState("");
  const [password, setPassword] = useState("");
  const [dob, setDob] = useState(new Date());
  const [gender, setGender] = useState("");
  const [briefDescription, setBriefDescription] = useState("");
  const [community, setCommunity] = useState("");
  const [fatherName, setFatherName] = useState("");
  const [husbandName, setHusbandName] = useState("");
  const [bankNumber, setBankNumber] = useState("");
  const [permamentAddress, setPermamentAddress] = useState("");
  const [temporaryAddress, setTemporaryAddress] = useState("");
  const [pin, setPin] = useState("");
  const [qualification, setQualification] = useState("");
  const [state_id, setStateId] = useState("");
  const [district_id, setDistrictId] = useState("");
  const [isView, setIsView] = useState("registerStep2");
  const toggleView = (toggleS) => {
    setIsView(toggleS);
  };
  const [isForm, setIsForm] = useState("next1");
  const handelFrom = (toggleHamdel) => {
    setIsForm(toggleHamdel);
  };
  const [data, setData] = useState({
    mobile: "",
    email: "",
    aadharNumber: "",
    panNumber: "",
  });
  const handelSubmit = async (e) => {
    e.preventDefault();
    setErrors({});
    try {
      const res = await fetch(environment.apiUrl + `admin/register`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ ...data }),
      });
      const adminData = await res.json();
      toast.success("Register SuccesFully");
      setUserRegNo(adminData);
      toggleView("registerStep1");
    } catch (error) {
      if (error.response && error.response.status === 409) {
        const { field, message } = error.response.data;
        toast.error((prevErrors) => ({ ...prevErrors, [field]: message }));
        setErrors((prevErrors) => ({ ...prevErrors, [field]: message }));
      } else {
        toast.error({ general: "An unexpected error occurred." });
        setErrors({ general: "An unexpected error occurred." });
      }
    }
  };
  const data1 = {
    profImage: profileImage,
    firstname: firstname,
    lastname: lastname,
    dob: dob,
    gender: gender,
    community: community,
    fatherName: fatherName,
    husbandName: husbandName,
    qulification: qualification,
  };
  const handelSubmitStep1 = async (e) => {
    e.preventDefault(e);
    try {
      const res = await fetch(
        environment.apiUrl + `admin/step1/${userRegNo.regNo}`,
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(data1),
        }
      );
      await res.json();
      toast.success("Admin Details Update Step1 SuccesFully");
      handelFrom("next2");
    } catch (error) {
      toast.error("Fetch to Failed");
      console.log(error);
    }
  };
  const data2 = {
    permamentAddress: permamentAddress,
    temporaryAddress: temporaryAddress,
    pin: pin,
    briefDescription: briefDescription,
    state_id: state_id,
    district_id: district_id,
  };
  const handelSubmitStep2 = async (e) => {
    e.preventDefault(e);
    try {
      const res = await fetch(
        environment.apiUrl + `admin/step2/${userRegNo.regNo}`,
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(data2),
        }
      );
      await res.json();
      toast.success("Admin Details Update Step2 SuccesFully");
      handelFrom("next3");
    } catch (error) {
      toast.error("Fetch to Failed");
      console.log(error);
    }
  };

  const data3 = {
    aadharImage: aadharImage,
    panImage: panImage,
    bankImage: bankImage,
    password: password,
    bankNumber: bankNumber,
  };
  const handelSubmitStep3 = async (e) => {
    e.preventDefault(e);
    try {
      const res = await fetch(
        environment.apiUrl + `admin/step3/${userRegNo.regNo}`,
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(data3),
        }
      );
      await res.json();
      toast.success("Admin Details Update Step3 SuccesFully");
      handelToggle("adminList");
    } catch (error) {
      toast.error("Fetch to Failed");
      console.log(error);
    }
  };
  return (
    <div>
      <div className="flex flex-row justify-between items-center">
        <h1 className="font-bold text-2xl p-3">Create Admin</h1>
        <button
          onClick={() => setIsSection(false)}
          className="flex items-center text-lg px-5 py-1 bg-red-600 text-white rounded-md"
        >
          Back
        </button>
      </div>
      {isView === "registerStep2" && (
        <RegisterStep2
          handelSubmit={handelSubmit}
          data={data}
          setData={setData}
          errors={errors}
        />
      )}
      {isView === "registerStep1" && (
        <RegisterStap1
          userRegNo={userRegNo}
          handelSubmitStep1={handelSubmitStep1}
          handelSubmitStep2={handelSubmitStep2}
          handelSubmitStep3={handelSubmitStep3}
          setIsProfileImage={setIsProfileImage}
          setIsaadharImage={setIsaadharImage}
          setIspanImage={setIspanImage}
          setIsbankImage={setIsbankImage}
          setFirstname={setFirstname}
          setLastname={setLastname}
          setPassword={setPassword}
          setDob={setDob}
          setGender={setGender}
          setBriefDescription={setBriefDescription}
          setCommunity={setCommunity}
          setFatherName={setFatherName}
          setTemporaryAddress={setTemporaryAddress}
          setHusbandName={setHusbandName}
          setBankNumber={setBankNumber}
          setPermamentAddress={setPermamentAddress}
          setPin={setPin}
          setQualification={setQualification}
          setStateId={setStateId}
          setDistrictId={setDistrictId}
          firstname={firstname}
          lastname={lastname}
          password={password}
          dob={dob}
          gender={gender}
          briefDescription={briefDescription}
          community={community}
          fatherName={fatherName}
          husbandName={husbandName}
          bankNumber={bankNumber}
          permamentAddress={permamentAddress}
          pin={pin}
          qualification={qualification}
          temporaryAddress={temporaryAddress}
          isForm={isForm}
          handelFrom={handelFrom}
        />
      )}
    </div>
  );
};

export default AdminRegister;
