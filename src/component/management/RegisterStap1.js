import React, { useEffect, useState } from "react";
import Input from "../Input";
import Button from "../Button";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import ImageUploading from "react-images-uploading";
import "react-dropdown/style.css";

const RegisterStap1 = ({ handelSubmitStep2, step2, setStep2, userRegNo }) => {
  const [isForm, setIsForm] = useState("next1");
  const handelFrom = (toggleHamdel) => {
    setIsForm(toggleHamdel);
  };

  const onChange = (imageList) => {
    if (imageList.length > 0) {
      setStep2({ ...step2, profImage: imageList[0].dataURL });
    }
  };

  const onChangeAadhar = (imageList) => {
    if (imageList.length > 0) {
      setStep2({ ...step2, aadharImage: imageList[0].dataURL });
    }
  };
  const onChangePan = (imageList) => {
    if (imageList.length > 0) {
      setStep2({ ...step2, panImage: imageList[0].dataURL });
    }
  };

  const [isState, setIsState] = useState([]);
  const [selectedState, setSelectedState] = useState("");
  const [isDistrict, setIsDistrict] = useState([]);
  useEffect(() => {
    const fetchState = async () => {
      try {
        const response = await fetch(
          "https://e-commerce-nu-seven.vercel.app/state/list"
        );
        if (!response.ok) {
          throw new Error("Network response was not ok");
        }
        const step2 = await response.json();
        setIsState(step2);
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
            `https://e-commerce-nu-seven.vercel.app/state/district/${selectedState}`
          );
          if (!response.ok) {
            throw new Error("Network response was not ok");
          }
          const step2 = await response.json();
          setIsDistrict(step2);
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
    setStep2((prevstep2) => ({ ...prevstep2, state_id: stateId }));
  };

  // Handle district selection change
  const handleDistrictChange = (event) => {
    const districtId = event.target.value;
    setStep2((prevstep2) => ({ ...prevstep2, district_id: districtId }));
  };
  // ,,,,,,,,,,,,,,,,,,,,,,,,,,,,
  // const isFormValid1 =
  //   step2.fatherName &&
  //   step2.husbandName &&
  //   step2.gender &&
  //   step2.profImage &&
  //   step2.firstname &&
  //   step2.lastname &&
  //   step2.mobile &&
  //   step2.email &&
  //   step2.dob &&
  //   step2.community &&
  //   step2.qulification !== null;
  return (
    <div className=" p-4 w-full">
      <h1 className="font-bold text-green-500">
        Registration Number is- <span className="text-black">{userRegNo}</span>
      </h1>
      <form onSubmit={handelSubmitStep2}>
        {isForm === "next1" && (
          <div className="">
            <ImageUploading
              single
              value={null}
              onChange={onChange}
              maxNumber={1}
            >
              {({ onImageUpload, dragProps }) => (
                <div className="upload__image-wrapper flex justify-center py-4">
                  <button
                    className="border-2 rounded-full shadow-lg p-2 w-40 h-40"
                    style={{
                      backgroundImage: `url(${step2.profImage})`,
                      backgroundPosition: "center",
                      backgroundSize: "cover",
                    }}
                    onClick={onImageUpload}
                    {...dragProps}
                  >
                    Add Profile Image
                  </button>
                </div>
              )}
            </ImageUploading>

            <div className="flex flex-row gap-4 py-2">
              <Input
                type="text"
                label="First Name"
                placeholder="firstname.."
                value={step2.firstname}
                onChange={(e) =>
                  setStep2({ ...step2, firstname: e.target.value })
                }
              />
              <Input
                type="text"
                label="Last Name"
                placeholder="lastname.."
                value={step2.lastname}
                onChange={(e) =>
                  setStep2({ ...step2, lastname: e.target.value })
                }
              />
            </div>
            <div className="flex flex-row gap-4 py-2">
              <Input
                type="text"
                label="Father Name"
                placeholder="Father Name.."
                value={step2.fatherName}
                onChange={(e) =>
                  setStep2({ ...step2, fatherName: e.target.value })
                }
              />
              <Input
                type="text"
                label="Husband Name"
                placeholder="Husband Name.."
                value={step2.husbandName}
                onChange={(e) =>
                  setStep2({ ...step2, husbandName: e.target.value })
                }
              />
            </div>
            <div className="flex flex-row gap-4 py-2">
              <label htmlFor="date-picker">DOB:</label>
              <DatePicker
                id="date-picker"
                selected={step2.dob}
                onChange={(date) => setStep2({ ...step2, dob: date })}
                className="border-2 ml-3 px-2 outline-none"
              />
              <label htmlFor="male">Male:</label>
              <input
                id="male"
                type="radio"
                name="genders"
                value="true"
                checked={step2.gender === true}
                onChange={() => setStep2({ ...step2, gender: true })}
              />
              <label htmlFor="female">Female:</label>
              <input
                id="female"
                type="radio"
                name="genders"
                value="false"
                checked={step2.gender === false}
                onChange={() => setStep2({ ...step2, gender: false })}
              />
            </div>
            <div className="flex flex-row gap-4 py-2">
              <Input
                type="text"
                label="Community"
                placeholder="Community.."
                value={step2.community}
                onChange={(e) =>
                  setStep2({ ...step2, community: e.target.value })
                }
              />
              <Input
                type="text"
                label="Qulification"
                placeholder="Qulification.."
                value={step2.qulification}
                onChange={(e) =>
                  setStep2({ ...step2, qulification: e.target.value })
                }
              />
            </div>
            <div className="flex flex-row justify-end p-2">
              <button
                onClick={() => handelFrom("next2")}
                // disabled={!isFormValid1}
                className="px-4 py-1 bg-blue-600 text-white"
              >
                Next
              </button>
            </div>
          </div>
        )}
        {isForm === "next2" && (
          <div className="">
            <div className="flex flex-row gap-4 py-2 justify-around">
              <ImageUploading
                single
                value={[]}
                onChange={onChangeAadhar}
                maxNumber={1}
              >
                {({ onImageUpload, dragProps }) => (
                  <div className="upload__image-wrapper">
                    <button
                      className="border-2 text-sm font-bold px-20 py-4"
                      onClick={onImageUpload}
                      {...dragProps}
                    >
                      Upload Images
                    </button>
                    {step2.aadharImage && (
                      <img src={step2.aadharImage} alt="Aadhar" width={200} />
                    )}
                  </div>
                )}
              </ImageUploading>

              <ImageUploading
                single
                value={[]}
                onChange={onChangePan}
                maxNumber={1}
              >
                {({ onImageUpload, dragProps }) => (
                  <div className="upload__image-wrapper">
                    <button
                      className="border-2 text-sm font-bold px-20 py-4"
                      onClick={onImageUpload}
                      {...dragProps}
                    >
                      Upload Images
                    </button>
                    {step2.panImage && (
                      <img src={step2.panImage} alt="" width={200} />
                    )}
                  </div>
                )}
              </ImageUploading>
            </div>
            <div className="flex flex-col gap-4 py-2">
              <Input
                type="text"
                label="Permament Address"
                placeholder="Enter Details.."
                value={step2.permamentAddress}
                onChange={(e) =>
                  setStep2({ ...step2, permamentAddress: e.target.value })
                }
              />
              <Input
                type="text"
                label="Temporary Address"
                placeholder="Enter Details.."
                value={step2.temporaryAddress}
                onChange={(e) =>
                  setStep2({ ...step2, temporaryAddress: e.target.value })
                }
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
                  value={step2.pin}
                  onChange={(e) => setStep2({ ...step2, pin: e.target.value })}
                />
              </div>
            </div>

            <div className="flex flex-row justify-between p-2">
              <button
                onClick={() => handelFrom("next1")}
                className="px-4 py-1 bg-blue-600 text-white"
              >
                Previous
              </button>
              <button
                onClick={() => handelFrom("next3")}
                className="px-4 py-1 bg-blue-600 text-white"
              >
                Next
              </button>
            </div>
          </div>
        )}
        {isForm === "next3" && (
          <div className="">
            <div className="flex flex-col gap-4 py-2">
              <label htmlFor="description">Description</label>
              <textarea
                id="description"
                type="text"
                placeholder="Enter Your description.."
                value={step2.briefDescription}
                className="border-2 p-2 outline-none"
                rows={6}
                onChange={(e) =>
                  setStep2({ ...step2, briefDescription: e.target.value })
                }
              />
              <Input
                type="password"
                label="Password"
                placeholder="**********"
                value={step2.password}
                onChange={(e) =>
                  setStep2({ ...step2, password: e.target.value })
                }
              />
            </div>
            <div className="flex flex-row justify-between p-2">
              <button
                onClick={() => handelFrom("next2")}
                className="px-4 py-1 bg-blue-600 text-white"
              >
                Previous
              </button>
              <Button type="submit" label={"Submit"} />
            </div>
          </div>
        )}
      </form>
    </div>
  );
};

export default RegisterStap1;
