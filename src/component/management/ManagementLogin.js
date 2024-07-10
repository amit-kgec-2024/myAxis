import React, { useState } from "react";
import { RxCross1 } from "react-icons/rx";
import Input from "../Input";
import Button from "../Button";
import { useNavigate } from "react-router-dom";

const ManagementLogin = ({ setIsToggle }) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [message, setMessage] = useState("");
  const [showMessage, setShowMessage] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const navigate = useNavigate();
  const handleSubmit = async (e) => {
    e.preventDefault();

    const payload = { email, password };

    try {
      const response = await fetch(
        "https://e-commerce-nu-seven.vercel.app/api/management/login",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(payload),
        }
      );

      const data = await response.json();

      if (response.ok) {
        setMessage("Login successful!");
        setShowMessage(true);
        setIsSuccess(true);
        localStorage.setItem("token", data.token);
        setTimeout(() => {
          setShowMessage(false);
          navigate("/management");
        }, 3000);
      } else {
        setMessage(data.message || "Login failed");
        setShowMessage(true);
      }
      // Hide...
      setTimeout(() => {
        setShowMessage(false);
      }, 3000);
    } catch (error) {
      console.error("Error:", error);
      setMessage("An error occurred during login.");
      setShowMessage(true);
      // Hide...
      setTimeout(() => {
        setShowMessage(false);
      }, 3000);
    }
  };
  return (
    <div className="flex h-screen justify-center items-start absolute top-0 left-0 w-full p-5 bg-white bg-opacity-55">
      {showMessage && (
        <div
          className="absolute right-0 top-0 m-12 px-5 py-1 bg-white"
          style={{ color: isSuccess ? "green" : "red" }}
        >
          {message}
        </div>
      )}
      <div className="border rounded shadow-2xl bg-white text-white w-[600px] flex flex-col items-center">
        <div className="bg-blue-500 w-full p-3 flex flex-row items-center justify-between">
          <h2 className="text-md font-semibold uppercase">
            Admin Portal Management
          </h2>
          <button onClick={() => setIsToggle(false)}>
            <RxCross1 />
          </button>
        </div>
        <form
          className="flex flex-col items-center justify-center w-full p-4"
          onSubmit={(e) => handleSubmit(e)}
        >
          <Input
            type="email"
            label="Email"
            placeholder="email.."
            className="text-slate-700"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
          <Input
            type="password"
            label="Password"
            placeholder="password.."
            className="text-slate-700"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
          <input type="text" className="w-full" />
          <div className="gap-4 flex flex-row w-full justify-end">
            <Button type="submit" label="Sign in" />
            <button onClick={()=> setIsToggle(false)} className="px-4 py-1 bg-red-600 rounded-sm">Cancel</button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default ManagementLogin;
