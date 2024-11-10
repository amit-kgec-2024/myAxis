import React, { useEffect, useState } from "react";
import Input from "../../Input";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import "react-dropdown/style.css";
import { environment } from "../../../enviroment/enviroment";
import ImageUpload from "../../ImageUpload";

const RegisterStap1 = ({
  handelSubmitStep1,
  handelSubmitStep2,
  handelSubmitStep3,
  userRegNo,
  setIsProfileImage,
  setIsaadharImage,
  setIspanImage,
  setIsbankImage,
  setFirstname,
  setLastname,
  setPassword,
  setDob,
  setGender,
  setBriefDescription,
  setCommunity,
  setFatherName,
  setHusbandName,
  setBankNumber,
  setPermamentAddress,
  setTemporaryAddress,
  setPin,
  setQualification,
  setStateId,
  setDistrictId,
  firstname,
  lastname,
  password,
  dob,
  gender,
  briefDescription,
  community,
  fatherName,
  husbandName,
  bankNumber,
  permamentAddress,
  pin,
  qualification,
  temporaryAddress,
  isForm,
  handelFrom,
}) => {
  const handleImageUpload = (base64Image) => {
    setIsProfileImage(base64Image);
  };

  const onChangeAadhar = (base64Image) => {
    setIsaadharImage(base64Image);
  };
  const onChangePan = (base64Image) => {
    setIspanImage(base64Image);
  };
  const onChangeBank = (base64Image) => {
    setIsbankImage(base64Image);
  };

  const [isState, setIsState] = useState([]);
  const [selectedState, setSelectedState] = useState("");
  const [isDistrict, setIsDistrict] = useState([]);
  useEffect(() => {
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
    fetchState();
  }, []);
  useEffect(() => {
    if (selectedState) {
      const fetchDistricts = async () => {
        try {
          const response = await fetch(
            environment.apiUrl + `state/district/${selectedState}`
          );
          if (!response.ok) {
            throw new Error("Network response was not ok");
          }
          const dataDist = await response.json();
          setIsDistrict(dataDist);
        } catch (error) {
          console.log(error);
        }
      };
      fetchDistricts();
    }
  }, [selectedState]);

  const handleStateChange = (event) => {
    const stateId = event.target.value;
    setSelectedState(stateId);
    setStateId(stateId);
  };

  // Handle district selection change
  const handleDistrictChange = (event) => {
    const districtId = event.target.value;
    setDistrictId(districtId);
  };

  const handleChange = (setter) => (e) => {
    setter(e.target.value);
  };
  const handleDateChangeDate = (date) => {
    setDob(date);
  };

  return (
    <div className=" p-4 w-full">
      <h1 className="font-bold text-green-500">
        Registration Number is-{" "}
        <span className="text-black">{userRegNo.regNo}</span>
      </h1>
      <div>
        {isForm === "next1" && (
          <form>
            <ImageUpload
              onImageUpload={handleImageUpload}
              initialLabel={"Add Profile Image"}
            />

            <div className="flex flex-row gap-4 py-2">
              <Input
                type="text"
                label="First Name"
                placeholder="firstname.."
                value={firstname}
                onChange={handleChange(setFirstname)}
              />
              <Input
                type="text"
                label="Last Name"
                placeholder="lastname.."
                value={lastname}
                onChange={handleChange(setLastname)}
              />
            </div>
            <div className="flex flex-row gap-4 py-2">
              <Input
                type="text"
                label="Father Name"
                placeholder="Father Name.."
                value={fatherName}
                onChange={handleChange(setFatherName)}
              />
              <Input
                type="text"
                label="Husband Name"
                placeholder="Husband Name.."
                value={husbandName}
                onChange={handleChange(setHusbandName)}
              />
            </div>
            <div className="flex flex-row gap-4 py-2">
              <label htmlFor="date-picker">DOB:</label>
              <DatePicker
                selected={dob}
                onChange={handleDateChangeDate}
                dateFormat="MM/dd/yyyy"
              />
              <label htmlFor="male">Male:</label>
              <input
                id="male"
                type="radio"
                name="genders"
                value="true"
                checked={gender === true}
                onChange={() => setGender(true)}
              />

              <label htmlFor="female">Female:</label>
              <input
                id="female"
                type="radio"
                name="genders"
                value="false"
                checked={gender === false}
                onChange={() => setGender(false)}
              />
            </div>
            <div className="flex flex-row gap-4 py-2">
              <Input
                type="text"
                label="Community"
                placeholder="Community.."
                value={community}
                onChange={handleChange(setCommunity)}
              />
              <Input
                type="text"
                label="Qulification"
                placeholder="Qulification.."
                value={qualification}
                onChange={handleChange(setQualification)}
              />
            </div>
            <div className="flex flex-row justify-end p-2">
              <button
                onClick={(e) => handelSubmitStep1(e)}
                className="px-4 py-1 bg-blue-600 text-white"
              >
                Next
              </button>
            </div>
          </form>
        )}
        {isForm === "next2" && (
          <form>
            <div className="flex flex-col gap-4 py-2">
              <Input
                type="text"
                label="Permament Address"
                placeholder="Enter Details.."
                value={permamentAddress}
                onChange={handleChange(setPermamentAddress)}
              />
              <Input
                type="text"
                label="Temporary Address"
                placeholder="Enter Details.."
                value={temporaryAddress}
                onChange={handleChange(setTemporaryAddress)}
              />
              <div className="flex flex-row justify-between gap-5">
                <div className="w-full">
                  <label htmlFor="state">State</label>
                  <select
                    onChange={handleStateChange}
                    value={selectedState}
                    className="border-gray-400 border outline-none p-2"
                    id="state"
                  >
                    <option value="">Select State</option>
                    {isState.map((state) => (
                      <option key={state._id} value={state.state_id}>
                        {state.state_name}
                      </option>
                    ))}
                  </select>
                </div>
                <div className="w-full flex flex-col">
                  <label htmlFor="district">District</label>
                  <select
                    id="district"
                    onChange={handleDistrictChange}
                    className="border-gray-400 border outline-none p-2"
                  >
                    <option value="">Select District</option>
                    {isDistrict.map((district) => (
                      <option key={district._id} value={district.district_id}>
                        {district.district_name}
                      </option>
                    ))}
                  </select>
                </div>
                <Input
                  type="text"
                  label="Pin"
                  placeholder="Enter Details.."
                  value={pin}
                  onChange={handleChange(setPin)}
                />
              </div>
            </div>
            <div className="flex flex-col gap-4 py-2">
              <label htmlFor="description">Description</label>
              <textarea
                id="description"
                type="text"
                placeholder="Enter Your description.."
                value={briefDescription}
                className="border-2 p-2 outline-none"
                rows={6}
                onChange={handleChange(setBriefDescription)}
              />
            </div>

            <div className="flex flex-row justify-between p-2">
              <button
                onClick={() => handelFrom("next1")}
                className="px-4 py-1 bg-blue-600 text-white"
              >
                Previous
              </button>
              <button
                onClick={(e) => handelSubmitStep2(e)}
                className="px-4 py-1 bg-blue-600 text-white"
              >
                Next
              </button>
            </div>
          </form>
        )}
        {isForm === "next3" && (
          <form>
            <div className="flex flex-row gap-4 py-2 justify-around items-center">
              <Input
                value={userRegNo.aadharNumber}
                label="Aadhar Details"
                className="w-[20rem]"
              />
              <ImageUpload
                onImageUpload={onChangeAadhar}
                initialLabel={"Add Aadhar Image"}
              />
            </div>
            <div className="flex flex-row gap-4 py-2 justify-around items-center">
              <Input
                value={userRegNo.panNumber}
                label="Pan Details"
                className="w-[20rem]"
              />
              <ImageUpload
                onImageUpload={onChangePan}
                initialLabel={"Add Pan Card Image"}
              />
            </div>
            <div className="flex flex-row gap-4 py-2 justify-around items-center">
              <Input
                type="text"
                label="Bank Account Number"
                placeholder="Bank Details.."
                className="w-[20rem]"
                value={bankNumber}
                onChange={handleChange(setBankNumber)}
              />
              <ImageUpload
                onImageUpload={onChangeBank}
                initialLabel={"Add Bank Account Image"}
              />
            </div>
            <div className="flex flex-col gap-4 py-2">
              <Input
                type="password"
                label="Password"
                placeholder="**********"
                value={password}
                onChange={handleChange(setPassword)}
              />
            </div>
            <div className="flex flex-row justify-between p-2">
              <button
                onClick={() => handelFrom("next2")}
                className="px-4 py-1 bg-blue-600 text-white"
              >
                Previous
              </button>
              <button
                onClick={(e) => handelSubmitStep3(e)}
                className="px-4 py-1 bg-blue-600 text-white"
              >
                Submit
              </button>
            </div>
          </form>
        )}
      </div>
    </div>
  );
};

export default RegisterStap1;
