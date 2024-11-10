import React, { useState, useEffect, useRef } from "react";
import Input from "./Input";
import { environment } from "../enviroment/enviroment";

const ForgetPassword = ({ isToggle, setIsToggle }) => {
  const [email, setEmail] = useState("");
  const [mobile, setMobile] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [message, setMessage] = useState("");
  const [isError, setIsError] = useState(false);
  const timeoutRef = useRef(null);

  const handleChangePassword = async () => {
    if (newPassword !== confirmPassword) {
      setMessage("Passwords do not match");
      setIsError(true);
      setAutoClearMessage();
      return;
    }

    try {
      const response = await fetch(
        environment.apiUrl + `api/${isToggle}/change/password`,
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ email, mobile, newPassword }),
        }
      );
      await response.json();
      setIsError(false);
      setIsToggle(false);
    } catch (error) {
      setMessage(
        error.response ? error.response.data.message : "Error changing password"
      );
      setIsError(true);
    }
    setAutoClearMessage();
  };

  const setAutoClearMessage = () => {
    clearTimeout(timeoutRef.current);
    timeoutRef.current = setTimeout(() => {
      setMessage("");
    }, 5000);
  };

  useEffect(() => {
    return () => clearTimeout(timeoutRef.current);
  }, []);

  return (
    <div className="p-5 flex justify-center">
      <div className="flex flex-col justify-center items-center border p-4 shadow-lg w-[20%]">
        <h2 className="py-3 font-bold">Change Password {isToggle}</h2>
        <Input
          type="email"
          label="Email"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
        <Input
          type="text"
          label="Mobile"
          placeholder="Mobile"
          value={mobile}
          onChange={(e) => setMobile(e.target.value)}
        />
        <Input
          type="password"
          label="New Password"
          placeholder="New Password"
          value={newPassword}
          onChange={(e) => setNewPassword(e.target.value)}
        />
        <Input
          type="password"
          label="Confirm Password"
          placeholder="Confirm Password"
          value={confirmPassword}
          onChange={(e) => setConfirmPassword(e.target.value)}
        />
        {message && (
          <p className={isError ? "text-red-500" : "text-blue-500"}>
            {message}
          </p>
        )}
        <button
          onClick={handleChangePassword}
          className="px-5 py-1 bg-blue-500 text-white shadow-md"
        >
          Change Password
        </button>
        <div className="w-full text-end py-2">
          <button className="text-blue-500" onClick={() => setIsToggle(false)}>
            Close
          </button>
        </div>
      </div>
    </div>
  );
};

export default ForgetPassword;
