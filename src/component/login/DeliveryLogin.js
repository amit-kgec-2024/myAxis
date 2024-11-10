import React, { useState } from "react";
import Input from "../Input";
import Button from "../Button";
import { useNavigate } from "react-router-dom";
import { RxCross1 } from "react-icons/rx";
import { environment } from "../../enviroment/enviroment";
import { toast } from "react-toastify";

const DeliveryLogin = ({ setIsToggle, handelToggle }) => {
  const [regNo, setRegNo] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();

    const payload = { regNo, password };

    try {
      const response = await fetch(environment.apiUrl + "delivery/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(payload),
      });

      const data = await response.json();

      if (response.ok) {
        toast.success("Login successful!");
        localStorage.setItem("token", data.token);
        localStorage.setItem("userType", data.user.userType);
        sessionStorage.setItem("deliveryId", data.user?.deliveryId);
        navigate("/delivery-dashboard");
      } else {
        toast.error(data.message || "Login failed");
      }
    } catch (error) {
      toast.error("An error occurred during login.", error);
    }
  };
  return (
    <div className="flex h-screen justify-center items-start absolute top-0 left-0 w-full p-5 bg-white bg-opacity-55">
      <div className="border rounded shadow-2xl bg-white text-white w-[600px] flex flex-col items-center">
        <div className="bg-blue-500 w-full p-3 flex flex-row items-center justify-between">
          <h2 className="text-md font-semibold uppercase">
            Delivery Partner Portal Login
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
              onClick={() => handelToggle("delivery")}
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

export default DeliveryLogin;