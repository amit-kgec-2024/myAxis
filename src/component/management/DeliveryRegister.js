import { useEffect, useState } from "react";
import { FaPlus } from "react-icons/fa6";
import UserCard from "./UserCard";
import UserDetails from "./UserDetails";
import RegisterStep2 from "./RegisterStep2";
import RegisterStap1 from "./RegisterStap1";

const DeliveryRegister = () => {
  const [usersData, setUsers] = useState([]);
  const [isId, setIsId] = useState();
  const [isData, setIsData] = useState([]);
  const [isView, setIsView] = useState(false);
  const handelToggle = (toggles, id) => {
    setIsView(toggles);
    setIsId(id);
  };

  useEffect(() => {
    fetchUsers();
  }, []);
  const fetchUsers = async () => {
    try {
      const response = await fetch(
        "https://e-commerce-nu-seven.vercel.app/api/delivery/users"
      );
      if (!response.ok) {
        throw new Error("Network response was not ok");
      }
      const data = await response.json();
      setUsers(data);
    } catch (error) {
      console.loh(error);
    }
  };
  const [userRegNo, setUserRegNo] = useState();
  const [data, setData] = useState({
    email: "",
    aadharNumber: "",
    mobile: "",
    panNumber: "",
  });
  const handelSubmit = async (e) => {
    e.preventDefault(e);
    try {
      const res = await fetch(
        `https://e-commerce-nu-seven.vercel.app/api/delivery/register`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ ...data }),
        }
      );
      const deliveryData = await res.json();
      setUserRegNo(deliveryData);
      setIsView(false);
      handelToggle("registerStep1");
    } catch (error) {
      console.log(error);
    }
  };
  const [step2, setStep2] = useState({
    firstname: "",
    lastname: "",
    password: "",
    profImage: "",
    dob: "",
    gender: "",
    aadharImage: "",
    briefDescription: "",
    community: "",
    fatherName: "",
    husbandName: "",
    panImage: "",
    permamentAddress: "",
    pin: "",
    qulification: "",
    state_id: "",
    district_id: "",
  });
  const handelSubmitStep2 = async (e) => {
    e.preventDefault(e);
    try {
      const res = await fetch(
        `https://e-commerce-nu-seven.vercel.app/api/delivery/register/${userRegNo}`,
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ ...step2 }),
        }
      );
      await res.json();
      fetchUsers();
      setIsView(false);
    } catch (error) {
      console.log(error);
    }
  };
  const handelDelete = async (id) => {
    try {
      const res = await fetch(
        `https://e-commerce-nu-seven.vercel.app/api/delivery/delete/${id}`,
        {
          method: "DELETE",
        }
      );
      fetchUsers();
      if (!res.ok) {
        throw new Error("Network response was not ok");
      }
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    if (isView === "show") {
      const fetchOneUsers = async () => {
        try {
          const response = await fetch(
            `https://e-commerce-nu-seven.vercel.app/api/delivery/boy/${isId}`
          );
          if (!response.ok) {
            throw new Error("Network response was not ok");
          }
          const data = await response.json();
          setIsData(data);
        } catch (error) {
          console.log(error);
        }
      };

      fetchOneUsers();
    }
  }, [isId, isView]);

  return (
    <div className="flex h-screen flex-col items-start">
      <div className="p-2 bg-yellow-300 flex flex-row w-full items-center justify-between">
        <h1>Add Delivery</h1>
        {isView ? (
          <button
            onClick={() => setIsView(false)}
            className="px-6 py-1 flex flex-row items-center gap-2 bg-blue-500 text-white"
          >
            Close
          </button>
        ) : (
          <button
            onClick={() => handelToggle("registerStep2")}
            className="px-6 py-1 flex flex-row items-center gap-2 bg-blue-500 text-white"
          >
            <FaPlus /> New
          </button>
        )}
      </div>
      {isView === "registerStep2" && (
        <RegisterStep2
          handelSubmit={handelSubmit}
          data={data}
          setData={setData}
        />
      )}
      {isView === "registerStep1" && (
        <RegisterStap1
          userRegNo={userRegNo}
          handelSubmitStep2={handelSubmitStep2}
          step2={step2}
          setStep2={setStep2}
        />
      )}
      {!isView && (
        <div className="w-full overflow-hidden">
          {usersData.map((user, index) => (
            <UserCard
              key={index}
              id={user._id}
              regNo={user.regNo}
              mobile={user.mobile}
              firstname={user.firstname}
              lastname={user.lastname}
              username={user.username}
              email={user.email}
              handelToggle={handelToggle}
              setIsView={setIsView}
              isView={isView}
              handelDelete={handelDelete}
            />
          ))}
        </div>
      )}
      {isView === "show" && (
        <div className="">
          <UserDetails
            firstname={isData.firstname}
            regNo={isData.regNo}
            email={isData.email}
            password={isData.password}
            profImage={isData.profImage}
            dob={isData.dob}
            gender={isData.gender}
            aadharImage={isData.aadharImage}
            aadharNumber={isData.aadharNumber}
            briefDescription={isData.briefDescription}
            community={isData.community}
            fatherName={isData.fatherName}
            husbandName={isData.husbandName}
            mobile={isData.mobile}
            panImage={isData.panImage}
            panNumber={isData.panNumber}
            permamentAddress={isData.permamentAddress}
            pin={isData.pin}
            qulification={isData.qulification}
            state_id={isData.state_id}
            district_id={isData.district_id}
            lastname={isData.lastname}
          />
        </div>
      )}
    </div>
  );
};

export default DeliveryRegister;
