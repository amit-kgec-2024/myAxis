import React from "react";

const ToggleSwitch = ({ isRight, handleToggle }) => {
  return (
    <label className="inline-flex items-center cursor-pointer">
      <input
        type="checkbox"
        className="hidden"
        checked={isRight}
        onChange={handleToggle}
      />
      <div
        className={`relative w-14 h-6 rounded-full transition-colors duration-300 ${
          isRight ? "bg-green-500" : "bg-gray-300"
        }`}
      >
        <span
          className={`absolute left-1 top-1 w-4 h-4 bg-white rounded-full transition-transform duration-300 ${
            isRight ? "transform translate-x-8" : ""
          }`}
        ></span>
        <span
          className={`absolute inset-0 flex items-center justify-center text-white font-bold text-xs ${
            isRight ? "text-white" : "text-gray-600"
          }`}
        ></span>
      </div>
    </label>
  );
};

export default ToggleSwitch;
