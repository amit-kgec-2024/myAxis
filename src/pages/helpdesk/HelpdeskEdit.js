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
import { FaTrash } from "react-icons/fa";
import AddButton from "../../component/button/AddButton";
import { toast } from "react-toastify";

const HelpdeskEdit = () => {
  const navigate = useNavigate();
  const [vendorId, setVendorId] = useState("");
  const [vendorData, setVendorData] = useState(null);
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
  const [contacts, setContacts] = useState([]);
  const [bankDetails, setBankDetails] = useState([]);

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
  console.log("view------>", vendorData);
  useEffect(() => {
    fetchState();
    const vendorId = sessionStorage.getItem("vendorId");
    setVendorId(vendorId);
    if (!vendorId) {
      navigate("/vendor-list");
    } else {
      fetchVendorData(vendorId);
    }
  }, []);

  const fetchVendorData = async (vendorId) => {
    try {
      const response = await fetch(
        environment.apiUrl + `vendor/view/${vendorId}`
      );
      if (!response.ok) {
        throw new Error("Failed to fetch vendor data");
      }
      const data = await response.json();
      setVendorData(data);
      setFullName(data.data?.fullName);
      setSelected(data.data?.salution);
      setCompanyName(data.data?.companyName);
      setDisplayName(data.data?.displayName);
      setEmail(data.data?.email);
      setMobile(data.data?.phoneNo);
      setPassword(data.data?.passwords);
      setImages(data.data?.profileImage);
      setBillingAddress1(data.data?.billingAddress1);
      setBillingAddress2(data.data?.billingAddress2);
      setBillingCity(data.data?.billingCity);
      setBillingCountry(data.data?.billingCountry);
      setBillingPincode(data.data?.billingPincode);
      setBillingStateId(data.data?.billingStateId);
      setShippingAddress1(data.data?.shippingAddress1);
      setShippingAddress2(data.data?.shippingAddress2);
      setShippingCity(data.data?.shippingCity);
      setShippingCountry(data.data?.shippingCountry);
      setShippingPincode(data.data?.shippingPincode);
      setShippingStateId(data.data?.shippingStateId);
      setGstImage(data.data?.gstImage);
      setGstNumber(data.data?.gstNumber);
      setGstType(data.data?.gstType);
      setPanImage(data.data?.panImage);
      setPanNumber(data.data?.panNumber);
      setContacts(data.contactDetails);
      setBankDetails(data.bankDetails);
    } catch (error) {
      console.error("Error fetching vendor data:", error);
    }
  };
  useEffect(() => {
    const isSame =
      billingAddress1 === shippingAddress1 &&
      billingAddress2 === shippingAddress2 &&
      billingCity === shippingCity &&
      billingCountry === shippingCountry &&
      billingPincode === shippingPincode &&
      billingStateId === shippingStateId;

    setSameAsBilling(isSame);
  }, [
    billingAddress1,
    billingAddress2,
    billingCity,
    billingCountry,
    billingPincode,
    billingStateId,
    shippingAddress1,
    shippingAddress2,
    shippingCity,
    shippingCountry,
    shippingPincode,
    shippingStateId,
  ]);

  const handleCheckboxChange = () => {
    if (!sameAsBilling) {
      setShippingAddress1(billingAddress1);
      setShippingAddress2(billingAddress2);
      setShippingCity(billingCity);
      setShippingCountry(billingCountry);
      setShippingPincode(billingPincode);
      setShippingStateId(billingStateId);
    } else {
      setShippingAddress1("");
      setShippingAddress2("");
      setShippingCity("");
      setShippingCountry("");
      setShippingPincode("");
      setShippingStateId("");
    }
    setSameAsBilling(!sameAsBilling);
  };

  const addContact = () => {
    setContacts([
      ...contacts,
      {
        salution: "",
        firstName: "",
        lastName: "",
        email: "",
        mobilNo: "",
        phoneNo: "",
      },
    ]);
  };
  const deletContact = async (index, id) => {
    const isConfirmed = window.confirm(
      "Are you sure you want to delete this contact?"
    );
    if (!isConfirmed) return;
    try {
      const response = await fetch(
        environment.apiUrl + `vendor/delete/contact/${id}`,
        {
          method: "DELETE",
          headers: {
            "Content-Type": "application/json",
          },
        }
      );
      if (response.ok) {
        setContacts((prevContacts) =>
          prevContacts.filter((_, i) => i !== index)
        );
        fetchVendorData(vendorId);
        toast.success("Vendor Contact Details Deleted Successfully");
      } else {
        console.error("Failed to delete contact from the server");
      }
    } catch (error) {
      console.log(error);
    }
  };
  const handleChange = (index, field, value) => {
    const updatedContacts = [...contacts];
    updatedContacts[index][field] = value;
    setContacts(updatedContacts);
  };
  const addBankDetail = () => {
    setBankDetails([
      ...bankDetails,
      { accountHolderName: "", bankName: "", accountNumber: "", ifscCode: "" },
    ]);
  };

  const removeBankDetail = async (index, id) => {
    const isConfirmed = window.confirm(
      "Are you sure you want to delete this bankDetails?"
    );
    if (!isConfirmed) return;
    try {
      const response = await fetch(
        environment.apiUrl + `vendor/delete/bank/${id}`,
        {
          method: "DELETE",
          headers: {
            "Content-Type": "application/json",
          },
        }
      );
      if (response.ok) {
        setBankDetails(bankDetails.filter((_, i) => i !== index));
        fetchVendorData(vendorId);
        toast.success("Vendor bank Details Deleted Successfully");
      } else {
        console.error("Failed to delete bank from the server");
      }
    } catch (error) {
      console.log(error);
    }
  };
  const handleInputChange = (index, field, value) => {
    const updatedBankDetails = [...bankDetails];
    updatedBankDetails[index][field] = value;
    setBankDetails(updatedBankDetails);
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
      const response = await fetch(
        environment.apiUrl + `vendor/update/${vendorId}`,
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(data),
        }
      );
      await response.json();
      toast.success("Vendor Add SuccesFully");
      navigate("/vendor-list");
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
              <StateDropdown
                options={isState}
                defaultValue={billingStateId}
                onChange={setBillingStateId}
              />
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
                defaultValue={shippingStateId}
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
                  onChange={(value) => handleChange(index, "salution", value)}
                  defaultValue={contact.salution}
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
                  value={contact.mobilNo}
                  onChange={(value) => handleChange(index, "mobilNo", value)}
                />
                <Input
                  label="Phone no"
                  type="tel"
                  placeholder="Phone no"
                  value={contact.phoneNo}
                  onChange={(value) => handleChange(index, "phoneNo", value)}
                />
                <button onClick={() => deletContact(index, contact._id)}>
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
                  value={detail.accountHolderName}
                  onChange={(value) =>
                    handleInputChange(index, "accountHolderName", value)
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
                <button onClick={() => removeBankDetail(index, detail._id)}>
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
                <GstDropdown
                  options={gstTypeData}
                  defaultValue={gstType}
                  onChange={setGstType}
                />
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
            Update Now
          </button>
        </div>
      </Container>
    </Layout>
  );
};

export default HelpdeskEdit;