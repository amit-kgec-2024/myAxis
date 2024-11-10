import React, { useEffect, useState } from "react";
import Layout from "../../component/layout/Layout";
import Container from "../../component/tag/Container";
import Input from "../../component/tag/Input";
import ImageUploads from "../../component/tag/ImageUploads";
import H1 from "../../component/tag/H1";
import Dropdown from "../../component/tag/Dropdown";
import { gstTypeData, salutionData } from "../../utils/dropdown";
import H3 from "../../component/tag/H3";
import H2 from "../../component/tag/H2";
import { environment } from "../../enviroment/enviroment";
import StateDropdown from "../../component/tag/StateDropdown";
import AddButton from "../../component/button/AddButton";
import { FaTrash } from "react-icons/fa";
import GstDropdown from "../../component/tag/GstDropdown";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";

const VendorAdd = () => {
  const router = useNavigate();
  const [isImage, setImages] = useState("");
  const [password, setPassword] = useState("");
  const [selected, setSelected] = useState("");
  const [fullName, setFullName] = useState("");
  const [companyName, setCompanyName] = useState("");
  const [displayName, setDisplayName] = useState("");
  const [email, setEmail] = useState("");
  const [mobile, setMobile] = useState("");
  const [billingAddress1, setBillingAddress1] = useState("");
  const [billingAddress2, setBillingAddress2] = useState("");
  const [billingStateId, setBillingStateId] = useState(null);
  const [billingCity, setBillingCity] = useState("");
  const [billingPincode, setBillingPincode] = useState("");
  const [billingCountry, setBillingCountry] = useState("");

  const [sameState, setSameState] = useState(null);

  const [shippingAddress1, setShippingAddress1] = useState("");
  const [shippingAddress2, setShippingAddress2] = useState("");
  const [shippingStateId, setShippingStateId] = useState(null);
  const [shippingCity, setShippingCity] = useState("");
  const [shippingPincode, setShippingPincode] = useState("");
  const [shippingCountry, setShippingCountry] = useState("");

  const [isState, setIsState] = useState([]);
  const [panNumber, setPanNumber] = useState("");
  const [panImage, setPanImage] = useState("");
  const [gstType, setGstType] = useState("");
  const [gstNumber, setGstNumber] = useState("");
  const [gstImage, setGstImage] = useState("");

  const [sameAsBilling, setSameAsBilling] = useState(false);

  const handleCheckboxChange = () => {
    setSameAsBilling(!sameAsBilling);
    if (!sameAsBilling) {
      setShippingAddress1(billingAddress1);
      setShippingAddress2(billingAddress2);
      setShippingStateId(billingStateId);
      setShippingCity(billingCity);
      setShippingPincode(billingPincode);
      setShippingCountry(billingCountry);
      setSameState(billingStateId);
    } else {
      setShippingAddress1("");
      setShippingAddress2("");
      setShippingStateId(null);
      setShippingCity("");
      setShippingPincode("");
      setShippingCountry("");
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
      companyName: companyName,
      displayName: displayName,
      profileImage: isImage,
      password: password,
      billingAddress1: billingAddress1,
      billingAddress2: billingAddress2,
      billingCity: billingCity,
      billingPincode: billingPincode,
      billingCountry: billingCountry,
      billingStateId: billingStateId,
      shippingAddress1: shippingAddress1,
      shippingAddress2: shippingAddress2,
      shippingCity: shippingCity,
      shippingPincode: shippingPincode,
      shippingCountry: shippingCountry,
      shippingStateId: shippingStateId,
      panImage: panImage,
      gstType: gstType,
      gstNumber: gstNumber,
      gstImage: gstImage,
      panNumber: panNumber,
      contactList: contacts,
      bankList: bankDetails,
    };
    try {
      const response = await fetch(environment.apiUrl + "vendor/register", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
      });
      await response.json();
      toast.success("Vendor Add SuccesFully");
      router("/vendor-list");
    } catch (error) {
      console.log(error);
      toast.error("Error Server", error);
    }
  };

  return (
    <Layout>
      <Container>
        <H1>Add Vendors</H1>
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
              label="Display Name"
              type="text"
              placeholder="Displayname"
              value={displayName}
              onChange={setDisplayName}
            />
            <Input
              label="Company Name"
              type="text"
              placeholder="Companyname"
              value={companyName}
              onChange={setCompanyName}
            />
            <Input
              label="Vendor Email"
              type="email"
              placeholder="email"
              value={email}
              onChange={setEmail}
            />
            <Input
              label="Vendor phone"
              type="text"
              placeholder="phone"
              value={mobile}
              onChange={setMobile}
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
              <H3>Billing Address</H3>
              <Input
                value={billingAddress1}
                onChange={setBillingAddress1}
                placeholder="Billing Address 1"
              />
              <Input
                value={billingAddress2}
                onChange={setBillingAddress2}
                placeholder="Billing Address 2"
              />
              <StateDropdown options={isState} onChange={setBillingStateId} />
              <Input
                value={billingCity}
                onChange={setBillingCity}
                placeholder="Billing City"
              />
              <Input
                value={billingPincode}
                onChange={setBillingPincode}
                placeholder="Billing Pincode"
              />
              <Input
                value={billingCountry}
                onChange={setBillingCountry}
                placeholder="Billing Country"
              />
            </div>
            <div className="w-full md:w-[45%]">
              <H3>
                Shippng Address{" "}
                <span className="px-4">
                  <input
                    type="checkbox"
                    checked={sameAsBilling}
                    onChange={handleCheckboxChange}
                    className="w-4 h-4"
                  />
                </span>
                <span>Same as Billing Address</span>
              </H3>
              <Input
                value={shippingAddress1}
                onChange={setShippingAddress1}
                placeholder="Shipping Address 1"
              />
              <Input
                value={shippingAddress2}
                onChange={setShippingAddress2}
                placeholder="Shipping Address 2"
              />
              <StateDropdown
                options={isState}
                defaultValue={sameState}
                onChange={setShippingStateId}
              />
              <Input
                value={shippingCity}
                onChange={setShippingCity}
                placeholder="Shipping City"
              />
              <Input
                value={shippingPincode}
                onChange={setShippingPincode}
                placeholder="Shipping Pincode"
              />
              <Input
                value={shippingCountry}
                onChange={setShippingCountry}
                placeholder="Shipping Country"
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
                <GstDropdown options={gstTypeData} onChange={setGstType} />
                <Input
                  label="Gst Number"
                  type="text"
                  placeholder="Gst Number"
                  value={gstNumber}
                  onChange={setGstNumber}
                />
              </div>
              <ImageUploads value={gstImage} onChange={setGstImage} />
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

export default VendorAdd;
