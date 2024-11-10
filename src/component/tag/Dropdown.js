import React, { useEffect, useState } from "react";

const Dropdown = ({
  options = [],
  label = "Age",
  onChange,
  readOnly = false,
  defaultValue = "",
}) => {
  const [isOpen, setIsOpen] = useState(false);
  const [selectedOption, setSelectedOption] = useState(defaultValue);
  useEffect(() => {
    setSelectedOption(defaultValue);
  }, [defaultValue]);

  const toggleDropdown = () => {
    setIsOpen(!isOpen);
  };

  const handleOptionClick = (option) => {
    setSelectedOption(option);
    setIsOpen(false);
    if (onChange) {
      onChange(option);
    }
  };

  return (
    <div className="relative w-54">
      <label className="font-semibold text-gray-700 py-4">Salution</label>
      <button
        className="flex justify-between items-center w-full px-4 py-2 border rounded bg-white shadow"
        onClick={toggleDropdown}
        disabled={readOnly}
      >
        {selectedOption || label}
        <span className={`ml-2 ${isOpen ? "rotate-180" : ""}`}>▼</span>
      </button>
      {isOpen && !readOnly && (
        <div className="absolute left-0 right-0 overflow-y-auto h-44 mt-1 bg-white border rounded shadow-md z-10">
          {options.map((option, index) => (
            <div
              key={index}
              className="px-4 py-2 hover:bg-gray-100 cursor-pointer"
              onClick={() => handleOptionClick(option)}
            >
              {option}
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default Dropdown;
