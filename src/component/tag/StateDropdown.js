import React, { useEffect, useState } from "react";
import { environment } from "../../enviroment/enviroment";

const StateDropdown = ({
  options = [],
  label = "Select State",
  onChange,
  readOnly = false,
  defaultValue = "",
}) => {
  const [isOpen, setIsOpen] = useState(false);
  const [selectedState, setSelectedState] = useState("");
  const getStateSingle = async (defaultValue) => {
    try {
      const response = await fetch(
        environment.apiUrl + `state/view/${defaultValue}`
      );
      if (!response.ok) {
        throw new Error("Network response was not ok");
      }
      const dataState = await response.json();
      setSelectedState(dataState.state?.state_name);
    } catch (error) {
      console.log(error);
    }
  };
  useEffect(() => {
    getStateSingle(defaultValue);
  }, [defaultValue]);

  const toggleDropdown = () => {
    setIsOpen(!isOpen);
  };

  const handleStateClick = (state) => {
    setSelectedState(state.state_name);
    setIsOpen(false);
    if (onChange) {
      onChange(state.state_id);
    }
  };

  return (
    <div className="relative w-full py-3">
      {/* <label className="font-semibold text-gray-700 py-4">State</label> */}
      <button
        className="flex justify-between items-center w-full px-4 py-2 border rounded bg-white shadow"
        onClick={toggleDropdown}
        disabled={readOnly}
      >
        {selectedState || label}
        <span className={`ml-2 ${isOpen ? "rotate-180" : ""}`}>▼</span>
      </button>
      {isOpen && !readOnly && (
        <div className="absolute left-0 right-0 mt-1 bg-white border h-52 overflow-y-auto rounded shadow-md z-10">
          {options.map((state) => (
            <div
              key={state.state_id}
              className="px-4 py-2 hover:bg-gray-100 cursor-pointer"
              onClick={() => handleStateClick(state)}
            >
              {state.state_name}
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default StateDropdown;
