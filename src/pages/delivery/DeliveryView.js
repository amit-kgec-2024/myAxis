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
import { gstTypeData, salutionData } from "../../utils/dropdown";
import GstDropdown from "../../component/tag/GstDropdown";
import { toast } from "react-toastify";

const DeliveryView = () => {
  const navigate = useNavigate();
  const [deliveryPartnerId, setDeliveryId] = useState("");
  const [isActive, setIsActive] = useState(null);
  const [deliveryData, setDeliveryData] = useState(null);
  const [isImage, setImages] = useState("");
  const [password, setPassword] = useState("");
  const [selected, setSelected] = useState("");
  const [fullName, setFullName] = useState("");
  const [nickName, setNickName] = useState("");
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
  const [contacts, setContacts] = useState([]);
  const [bankDetails, setBankDetails] = useState([]);
  const [deliveryAreas, setDeliveryAreas] = useState([]);

  const [sameAsBilling, setSameAsBilling] = useState(false);
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
  console.log("view------>", deliveryPartnerId);
  useEffect(() => {
    fetchState();
    const deliveryPartnerId = sessionStorage.getItem("deliveryPartnerId");
    setDeliveryId(deliveryPartnerId);
    if (!deliveryPartnerId) {
      navigate("/delivery-list");
    } else {
      fetchDeliveryData(deliveryPartnerId);
    }
  }, []);

  const fetchDeliveryData = async (deliveryPartnerId) => {
    try {
      const response = await fetch(
        environment.apiUrl + `delivery/view/${deliveryPartnerId}`
      );
      if (!response.ok) {
        throw new Error("Failed to fetch Delivery data");
      }
      const data = await response.json();
      setDeliveryData(data);
      setIsActive(data.data?.isActive);
      setFullName(data.data?.fullName);
      setSelected(data.data?.salution);
      setNickName(data.data?.nickName);
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
      setContacts(data.contactDetails);
      setBankDetails(data.bankDetails);
      setDeliveryAreas(data.areaDetails);
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

  const handleChange = (index, field, value) => {
    const updatedContacts = [...contacts];
    updatedContacts[index][field] = value;
    setContacts(updatedContacts);
  };
  const handleInputChange = (index, field, value) => {
    const updatedBankDetails = [...bankDetails];
    updatedBankDetails[index][field] = value;
    setBankDetails(updatedBankDetails);
  };
  const handleChangeAreas = (index, field, value) => {
    const updatedAreas = [...deliveryAreas];
    updatedAreas[index][field] = value;
    setDeliveryAreas(updatedAreas);
  };
  const handelDelete = async (e) => {
    e.preventDefault();
    const isConfirmed = window.confirm(
      "Are you sure you want to Permanent delete this Delivery?"
    );
    if (!isConfirmed) return;
    try {
      const response = await fetch(
        environment.apiUrl + `delivery/delete/${deliveryPartnerId}`,
        {
          method: "DELETE",
          headers: {
            "Content-Type": "application/json",
          },
        }
      );
      if (response.ok) {
        toast.success("Delivery Permanent Delete Successfully");
        navigate("/delivery-list");
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
      } this Delivery?`
    );
    if (!isConfirmed) return;
    try {
      const response = await fetch(
        environment.apiUrl + `delivery/status/${deliveryPartnerId}`,
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
          },
        }
      );
      if (response.ok) {
        fetchDeliveryData(deliveryPartnerId);
        toast.success(
          `Delivery ${isActive === true ? "DeActive" : "Active"} Successfully`
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
        <div className="flex flex-row items-center gap-4 justify-end px-2 md:px-5 py-3">
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
              label="Nick Name"
              type="text"
              placeholder="NickName"
              value={nickName}
              onChange={setNickName}
              readOnly={true}
            />
            <Input
              label="Delivery Email"
              type="email"
              placeholder="email"
              value={email}
              onChange={setEmail}
              readOnly={true}
            />
            <Input
              label="Delivery phone"
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
            <H2>Contact Details</H2>
          </div>
          <div className="">
            {contacts.map((contact, index) => (
              <div className="flex flex-row gap-2 py-4" key={index}>
                <Dropdown
                  options={salutionData}
                  onChange={(value) => handleChange(index, "salution", value)}
                  defaultValue={contact.salution}
                  readOnly={true}
                />
                <Input
                  label="First Name"
                  type="text"
                  placeholder="First Name"
                  value={contact.firstName}
                  onChange={(value) => handleChange(index, "firstName", value)}
                  readOnly={true}
                />
                <Input
                  label="Last Name"
                  type="text"
                  placeholder="Last Name"
                  value={contact.lastName}
                  onChange={(value) => handleChange(index, "lastName", value)}
                  readOnly={true}
                />
                <Input
                  label="Email"
                  type="email"
                  placeholder="Email"
                  value={contact.email}
                  onChange={(value) => handleChange(index, "email", value)}
                  readOnly={true}
                />
                <Input
                  label="Mobile no"
                  type="tel"
                  placeholder="Mobile no"
                  value={contact.mobilNo}
                  onChange={(value) => handleChange(index, "mobilNo", value)}
                  readOnly={true}
                />
                <Input
                  label="Phone no"
                  type="tel"
                  placeholder="Phone no"
                  value={contact.phoneNo}
                  onChange={(value) => handleChange(index, "phoneNo", value)}
                  readOnly={true}
                />
              </div>
            ))}
          </div>
        </div>
        <div className="w-full py-2">
          <div className="bg-teal-100 py-4 px-2">
            <H2>Delivery Areas</H2>
          </div>
          <div className="">
            {deliveryAreas.map((areas, index) => (
              <div className="flex flex-row gap-2 py-4" key={index}>
                <Input
                  label="Address1"
                  type="text"
                  placeholder="Address1"
                  value={areas.address1}
                  onChange={(value) =>
                    handleChangeAreas(index, "address1", value)
                  }
                />
                <Input
                  label="Address2"
                  type="text"
                  placeholder="Address2"
                  value={areas.address2}
                  onChange={(value) =>
                    handleChangeAreas(index, "address2", value)
                  }
                />
                <Input
                  label="Pin Code"
                  type="text"
                  placeholder="Pin Code"
                  value={areas.pincode}
                  onChange={(value) =>
                    handleChangeAreas(index, "pincode", value)
                  }
                />
                <Input
                  label="City"
                  type="tel"
                  placeholder="City"
                  value={areas.city}
                  onChange={(value) => handleChangeAreas(index, "city", value)}
                />
              </div>
            ))}
          </div>
        </div>
        <div className="w-full py-2">
          <div className="bg-teal-100 py-4 px-2">
            <H2>Bank Details</H2>
          </div>
          <div className="">
            {bankDetails.map((detail, index) => (
              <div key={index} className="flex flex-row gap-2 py-4">
                <Input
                  label="Account Holder Name"
                  type="text"
                  placeholder="Account Holder Name"
                  value={detail.accountHolderName}
                  onChange={(value) =>
                    handleInputChange(index, "accountHolderName", value)
                  }
                  readOnly={true}
                />
                <Input
                  label="Bank Name"
                  type="text"
                  placeholder="Bank Name"
                  value={detail.bankName}
                  onChange={(value) =>
                    handleInputChange(index, "bankName", value)
                  }
                  readOnly={true}
                />
                <Input
                  label="Account Number"
                  type="text"
                  placeholder="Account Number"
                  value={detail.accountNumber}
                  onChange={(value) =>
                    handleInputChange(index, "accountNumber", value)
                  }
                  readOnly={true}
                />
                <Input
                  label="IFSC Code"
                  type="text"
                  placeholder="IFSC Code"
                  value={detail.ifscCode}
                  onChange={(value) =>
                    handleInputChange(index, "ifscCode", value)
                  }
                  readOnly={true}
                />
              </div>
            ))}
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

export default DeliveryView;
