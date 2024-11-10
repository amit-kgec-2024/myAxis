import React, { useEffect, useState } from "react";
import { environment } from "../../../enviroment/enviroment";
import Input from "../../Input";
import Button from "../../Button";
import ImageUploading from "react-images-uploading";
import DatePicker from "react-datepicker";
import { toast } from "react-toastify";

const AdminEdit = ({ setIsSection, isId, fetchUsers }) => {
  const [isUpdate, setIsUpdate] = useState({});

  useEffect(() => {
    const fetchOneUser = async () => {
      try {
        const response = await fetch(
          environment.apiUrl + `api/admin/boy/${isId}`
        );
        if (response.ok) {
          const data = await response.json();
          setIsUpdate(data);
        }
      } catch (error) {
        console.log(error);
      }
    };

    fetchOneUser();
  }, [isId]);

  const onChange = (imageList) => {
    if (imageList.length > 0) {
      setIsUpdate({ ...isUpdate, profImage: imageList[0].dataURL });
    }
  };

  const onChangeAadhar = (imageList) => {
    if (imageList.length > 0) {
      setIsUpdate({ ...isUpdate, aadharImage: imageList[0].dataURL });
    }
  };
  const onChangePan = (imageList) => {
    if (imageList.length > 0) {
      setIsUpdate({ ...isUpdate, panImage: imageList[0].dataURL });
    }
  };
  const onChangeBank = (imageList) => {
    if (imageList.length > 0) {
      setIsUpdate({ ...isUpdate, bankImage: imageList[0].dataURL });
    }
  };
  const [isState, setIsState] = useState([]);
  const [selectedState, setSelectedState] = useState("");
  const [isDistrict, setIsDistrict] = useState([]);
  useEffect(() => {
    const fetchState = async () => {
      try {
        const response = await fetch(environment.apiUrl + "state/list");
        if (response.ok) {
          const dataState = await response.json();
          setIsState(dataState);
        }
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
          if (response.ok) {
            const dataDist = await response.json();
            setIsDistrict(dataDist);
          }
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
    setIsUpdate((prevstep2) => ({ ...prevstep2, state_id: stateId }));
  };

  // Handle district selection change
  const handleDistrictChange = (event) => {
    const districtId = event.target.value;
    setIsUpdate((prevstep2) => ({ ...prevstep2, district_id: districtId }));
  };

  const handelUpdate = async (e) => {
    e.preventDefault();
    try {
      const res = await fetch(environment.apiUrl + `api/admin/update/${isId}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ ...isUpdate }),
      });
      await res.json();
      toast.success("Data Update Successfully");
      fetchUsers();
      setIsSection(false);
    } catch (error) {
      console.log(error);
      toast.error("Data fetch to failed.");
    }
  };

  return (
    <div className="pb-10">
      <div className="flex flex-row justify-between items-center">
        <h1 className="font-bold text-2xl p-3">Admin Details</h1>
        <button
          onClick={() => setIsSection(false)}
          className="flex items-center text-lg px-5 py-1 bg-red-600 text-white rounded-md"
        >
          Back
        </button>
      </div>
      <form>
        <ImageUploading single value={null} onChange={onChange} maxNumber={1}>
          {({ onImageUpload, dragProps }) => (
            <div className="upload__image-wrapper flex justify-center py-4">
              <button
                className="border-2 font-bold rounded-full shadow-lg p-2 w-40 h-40"
                style={{
                  backgroundImage: `url(${isUpdate.profImage})`,
                  backgroundPosition: "center",
                  backgroundSize: "cover",
                }}
                onClick={onImageUpload}
                {...dragProps}
              >
                update Profile Image
              </button>
            </div>
          )}
        </ImageUploading>
        <Input
          name="regNo"
          value={isUpdate.regNo}
          className="w-[18%]"
          label="Reg No"
        />
        <div className="flex items-center gap-3">
          <Input
            type="text"
            value={isUpdate.firstname}
            onChange={(e) =>
              setIsUpdate({ ...isUpdate, firstname: e.target.value })
            }
            label="First Name"
          />
          <Input
            type="text"
            value={isUpdate.lastname || ""}
            onChange={(e) =>
              setIsUpdate({ ...isUpdate, lastname: e.target.value })
            }
            label="Last Name"
          />
          <Input
            type="text"
            value={isUpdate.fatherName || ""}
            onChange={(e) =>
              setIsUpdate({ ...isUpdate, fatherName: e.target.value })
            }
            label="Father Name"
          />
          <Input
            type="text"
            value={isUpdate.husbandName || ""}
            onChange={(e) =>
              setIsUpdate({ ...isUpdate, husbandName: e.target.value })
            }
            label="Husband Name"
          />
        </div>
        <div className="flex items-center gap-3">
          <Input
            text="email"
            value={isUpdate.email || ""}
            onChange={(e) =>
              setIsUpdate({ ...isUpdate, email: e.target.value })
            }
            label="Email"
          />
          <Input
            type="text"
            value={isUpdate.mobile || ""}
            onChange={(e) =>
              setIsUpdate({ ...isUpdate, mobile: e.target.value })
            }
            label="Mobile"
          />
          <label htmlFor="male">Male:</label>
          <input
            id="male"
            type="radio"
            name="genders"
            value="true"
            checked={isUpdate.gender === true}
            onChange={() => setIsUpdate({ ...isUpdate, gender: true })}
          />
          <label htmlFor="female">Female:</label>
          <input
            id="female"
            type="radio"
            name="genders"
            value="false"
            checked={isUpdate.gender === false}
            onChange={() => setIsUpdate({ ...isUpdate, gender: false })}
          />
        </div>
        <div className="flex items-center gap-3">
          <label htmlFor="date-picker">DOB:</label>
          <DatePicker
            id="date-picker"
            selected={isUpdate.dob ? new Date(isUpdate.dob) : null}
            onChange={(date) => setIsUpdate({ ...isUpdate, dob: date })}
            className="border-2 ml-3 px-2 outline-none"
          />
          <Input
            type="text"
            value={isUpdate.community || ""}
            onChange={(e) =>
              setIsUpdate({ ...isUpdate, community: e.target.value })
            }
            label="Community"
          />
          <Input
            type="text"
            value={isUpdate.qulification || ""}
            onChange={(e) =>
              setIsUpdate({ ...isUpdate, qulification: e.target.value })
            }
            label="Qualification"
          />
        </div>
        <Input
          type="text"
          value={isUpdate.permamentAddress || ""}
          onChange={(e) =>
            setIsUpdate({ ...isUpdate, permamentAddress: e.target.value })
          }
          label="Permanent Address"
        />
        <div className="flex items-center gap-3">
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
                  {state.state_name || isUpdate.state_name}
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
            value={isUpdate.pin || ""}
            onChange={(e) => setIsUpdate({ ...isUpdate, pin: e.target.value })}
            label="Pin"
          />
        </div>
        <Input
          type="text"
          value={isUpdate.temporaryAddress || ""}
          onChange={(e) =>
            setIsUpdate({ ...isUpdate, temporaryAddress: e.target.value })
          }
          label="Temporary Address"
        />
        <label
          htmlFor="textBrif"
          className="block text-black font-bold text-sm mb-2"
        >
          Brief Description
        </label>
        <textarea
          id="textBrif"
          type="text"
          value={isUpdate.briefDescription || ""}
          onChange={(e) =>
            setIsUpdate({ ...isUpdate, briefDescription: e.target.value })
          }
          className="rounded border shadow px-3 outline-none py-2 appearance-none w-full"
        />
        <div className="flex items-center justify-around gap-10 px-6 py-3">
          <Input
            type="text"
            value={isUpdate.panNumber || ""}
            onChange={(e) =>
              setIsUpdate({ ...isUpdate, panNumber: e.target.value })
            }
            label="Pan Details"
          />
          <Input
            type="text"
            value={isUpdate.aadharNumber || ""}
            onChange={(e) =>
              setIsUpdate({ ...isUpdate, aadharNumber: e.target.value })
            }
            label="Aadhar Details"
          />
          <Input
            type="text"
            value={isUpdate.bankNumber || ""}
            onChange={(e) =>
              setIsUpdate({ ...isUpdate, bankNumber: e.target.value })
            }
            label="Bank Details"
          />
        </div>
        <div className="flex flex-row gap-4 py-2 justify-around">
          <ImageUploading
            single
            value={[]}
            onChange={onChangeAadhar}
            maxNumber={1}
            maxFileSize={5242880}
          >
            {({ onImageUpload, dragProps }) => (
              <div className="upload__image-wrapper flex flex-col justify-start items-center">
                <button
                  className="border-2 text-sm font-bold px-20 py-4"
                  onClick={onImageUpload}
                  {...dragProps}
                >
                  Upload Aadhar Card Images
                </button>
                {isUpdate.aadharImage && (
                  <img src={isUpdate.aadharImage} alt="Aadhar" width={200} />
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
              <div className="upload__image-wrapper flex flex-col justify-start items-center">
                <button
                  className="border-2 text-sm font-bold px-20 py-4"
                  onClick={onImageUpload}
                  {...dragProps}
                >
                  Upload Pan Card Images
                </button>
                {isUpdate.panImage && (
                  <img src={isUpdate.panImage} alt="" width={200} />
                )}
              </div>
            )}
          </ImageUploading>
          <ImageUploading
            single
            value={[]}
            onChange={onChangeBank}
            maxNumber={1}
          >
            {({ onImageUpload, dragProps }) => (
              <div className="upload__image-wrapper flex flex-col justify-start items-center">
                <button
                  className="border-2 text-sm font-bold px-20 py-4"
                  onClick={onImageUpload}
                  {...dragProps}
                >
                  Upload Bank Account Images
                </button>
                {isUpdate.bankImage && (
                  <img src={isUpdate.bankImage} alt="" width={200} />
                )}
              </div>
            )}
          </ImageUploading>
        </div>
        <Button onClick={handelUpdate} label="Update" />
      </form>
    </div>
  );
};

export default AdminEdit;
