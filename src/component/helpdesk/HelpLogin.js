import React, { useState } from "react";
import Input from "../Input";
import Button from "../Button";
import { useNavigate } from "react-router-dom";
import { RxCross1 } from "react-icons/rx";

const HelpLogin = ({ setIsToggle, handelToggle }) => {
  const [regNo, setRegNo] = useState("");
  const [password, setPassword] = useState("");
  const [message, setMessage] = useState("");
  const [showMessage, setShowMessage] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();

    const payload = { regNo, password };

    try {
      const response = await fetch(
        "https://e-commerce-nu-seven.vercel.app/api/helpdesk/login",
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
          navigate("/helpdesk");
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
      setMessage("An error occurred during login.", error);
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
            Help Desk Portal Login
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
            type="text"
            label="REG NO"
            placeholder="Register Number.."
            className="text-slate-700"
            value={regNo}
            onChange={(e) => setRegNo(e.target.value)}
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
          <div className="text-end w-full py-3">
            <button
              className="text-blue-700"
              onClick={() => handelToggle("helpdesk")}
            >
              Forget Password
            </button>
          </div>
          <div className="gap-4 flex flex-row w-full justify-end">
            <Button type="submit" label="Sign in" />
            <button
              onClick={() => setIsToggle(false)}
              className="px-4 py-1 bg-red-600 rounded-sm"
            >
              Cancel
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default HelpLogin;
