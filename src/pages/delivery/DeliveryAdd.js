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
import AddButton from "../../component/button/AddButton";
import { FaTrash } from "react-icons/fa";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";

const DeliveryAdd = () => {
  const router = useNavigate();
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

  const [contacts, setContacts] = useState([
    {
      salutation: "",
      firstName: "",
      lastName: "",
      email: "",
      mobile: "",
      phone: "",
    },
  ]);

  const addContact = () => {
    setContacts([
      ...contacts,
      {
        salutation: "",
        firstName: "",
        lastName: "",
        email: "",
        mobile: "",
        phone: "",
      },
    ]);
  };

  const deleteContact = (index) => {
    const updatedContacts = contacts.filter((_, i) => i !== index);
    setContacts(updatedContacts);
  };

  const handleChange = (index, field, value) => {
    const updatedContacts = [...contacts];
    updatedContacts[index][field] = value;
    setContacts(updatedContacts);
  };

  const [deliveryAreas, setDeliveryAreas] = useState([
    {
      address1: "",
      address2: "",
      pincode: "",
      city: "",
    },
  ]);

  const addAreas = () => {
    setDeliveryAreas([
      ...deliveryAreas,
      {
        address1: "",
        address2: "",
        pincode: "",
        city: "",
      },
    ]);
  };

  const deleteAreas = (index) => {
    const updatedAreas = deliveryAreas.filter((_, i) => i !== index);
    setDeliveryAreas(updatedAreas);
  };

  const handleChangeAreas = (index, field, value) => {
    const updatedAreas = [...deliveryAreas];
    updatedAreas[index][field] = value;
    setDeliveryAreas(updatedAreas);
  };

  const [bankDetails, setBankDetails] = useState([
    { accountHolder: "", bankName: "", accountNumber: "", ifscCode: "" },
  ]);

  const handleInputChange = (index, field, value) => {
    const updatedBankDetails = [...bankDetails];
    updatedBankDetails[index][field] = value;
    setBankDetails(updatedBankDetails);
  };

  const addBankDetail = () => {
    setBankDetails([
      ...bankDetails,
      { accountHolder: "", bankName: "", accountNumber: "", ifscCode: "" },
    ]);
  };

  const removeBankDetail = (index) => {
    setBankDetails(bankDetails.filter((_, i) => i !== index));
  };

  const handelSubmit = async (e) => {
    e.preventDefault(e);
    const data = {
      email: email,
      phoneNo: mobile,
      salution: selected,
      fullName: fullName,
      nickName: nickName,
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
      contactList: contacts,
      bankList: bankDetails,
      areasList: deliveryAreas,
    };
    try {
      const response = await fetch(environment.apiUrl + "delivery/register", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
      });
      await response.json();
      toast.success("Delivery Partners Add SuccesFully");
      router("/delivery-list");
    } catch (error) {
      console.log(error);
      toast.error("Error Server", error);
    }
  };

  return (
    <Layout>
      <Container>
        <H1>Add Delivery Partners</H1>
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
              label="Nick Name"
              type="text"
              placeholder="Nickname"
              value={nickName}
              onChange={setNickName}
            />
            <Input
              label="Delivery phone"
              type="text"
              placeholder="phone"
              value={mobile}
              onChange={setMobile}
            />
            <Input
              label="Delivery Email"
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
            <H2>Contact Details</H2>
          </div>
          <div className="">
            {contacts.map((contact, index) => (
              <div className="flex flex-row gap-2 py-4" key={index}>
                <Dropdown
                  options={salutionData}
                  onChange={(value) => handleChange(index, "salutation", value)}
                />
                <Input
                  label="First Name"
                  type="text"
                  placeholder="First Name"
                  value={contact.firstName}
                  onChange={(value) => handleChange(index, "firstName", value)}
                />
                <Input
                  label="Last Name"
                  type="text"
                  placeholder="Last Name"
                  value={contact.lastName}
                  onChange={(value) => handleChange(index, "lastName", value)}
                />
                <Input
                  label="Email"
                  type="email"
                  placeholder="Email"
                  value={contact.email}
                  onChange={(value) => handleChange(index, "email", value)}
                />
                <Input
                  label="Mobile no"
                  type="tel"
                  placeholder="Mobile no"
                  value={contact.mobile}
                  onChange={(value) => handleChange(index, "mobile", value)}
                />
                <Input
                  label="Phone no"
                  type="tel"
                  placeholder="Phone no"
                  value={contact.phone}
                  onChange={(value) => handleChange(index, "phone", value)}
                />
                <button onClick={() => deleteContact(index)}>
                  <FaTrash />
                </button>
              </div>
            ))}
            <AddButton onClick={addContact}>Add More</AddButton>
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
                <button onClick={() => deleteAreas(index)}>
                  <FaTrash />
                </button>
              </div>
            ))}
            <AddButton onClick={addAreas}>Add More</AddButton>
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
                  value={detail.accountHolder}
                  onChange={(value) =>
                    handleInputChange(index, "accountHolder", value)
                  }
                />
                <Input
                  label="Bank Name"
                  type="text"
                  placeholder="Bank Name"
                  value={detail.bankName}
                  onChange={(value) =>
                    handleInputChange(index, "bankName", value)
                  }
                />
                <Input
                  label="Account Number"
                  type="text"
                  placeholder="Account Number"
                  value={detail.accountNumber}
                  onChange={(value) =>
                    handleInputChange(index, "accountNumber", value)
                  }
                />
                <Input
                  label="IFSC Code"
                  type="text"
                  placeholder="IFSC Code"
                  value={detail.ifscCode}
                  onChange={(value) =>
                    handleInputChange(index, "ifscCode", value)
                  }
                />
                <button onClick={() => removeBankDetail(index)}>
                  <FaTrash />
                </button>
              </div>
            ))}
            <AddButton onClick={addBankDetail}>Add More</AddButton>
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

export default DeliveryAdd;
