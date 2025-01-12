import React, { useState } from "react";

const NumberInput = ({
  type = "number",
  placeholder = "",
  label = "",
  id = "",
  name = "",
  value = "",
  onChange = () => {},
  className = "",
  className2 = "",
  readOnly = false,
}) => {
  const [isData, setIsData] = useState("");
  const handelChange = (e) => {
    onChange(e.target.value);
    setIsData(e.target.value);
  };
  return (
    <div className={`flex flex-col gap-1 mb-4 ${className2}`}>
      {label && (
        <label htmlFor={id} className="font-semibold text-gray-700">
          {label}
        </label>
      )}
      <div className="relative">
        <span className="absolute inset-y-0 left-3 font-bold flex items-center text-gray-500">
          ₹
        </span>
        <input
          type={type}
          id={id}
          name={name}
          value={value ? value : isData}
          onChange={handelChange}
          placeholder={`${placeholder}...`}
          readOnly={readOnly}
          className={`outline-none px-6 w-full py-2 border border-gray-300 rounded-md transition focus:border-teal-500 focus:ring-2 focus:ring-teal-300 ${className}`}
        />
      </div>
    </div>
  );
};

export default NumberInput;
