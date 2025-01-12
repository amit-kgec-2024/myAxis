import React, { useEffect, useState } from "react";

const CategoryDrop = ({
  options = [],
  label = "",
  onChange,
  readOnly = false,
  defaultValue = {},
}) => {
  const [isOpen, setIsOpen] = useState(false);
  const [selectedOption, setSelectedOption] = useState(
    defaultValue.parentCategoryName || ""
  );

  useEffect(() => {
    if (defaultValue && defaultValue.parentCategoryName) {
      setSelectedOption(defaultValue.parentCategoryName);
    }
  }, [defaultValue]);

  const toggleDropdown = () => {
    setIsOpen(!isOpen);
  };

  const handleOptionClick = (option) => {
    setSelectedOption(option.parentCategoryName);
    setIsOpen(false);
    if (onChange) {
      onChange(option.id);
    }
  };

  return (
    <div className="relative w-54">
      <label className="font-semibold text-gray-700 py-4">{label}</label>
      <button
        type="button"
        aria-haspopup="listbox"
        aria-expanded={isOpen}
        className="flex justify-between items-center w-full px-4 py-2 border rounded bg-white shadow focus:outline-none"
        onClick={toggleDropdown}
        disabled={readOnly}
      >
        {selectedOption || `Select ${label}`}
        <span
          className={`ml-2 transform transition-transform ${
            isOpen ? "rotate-180" : "rotate-0"
          }`}
        >
          ▼
        </span>
      </button>
      {isOpen && !readOnly && (
        <ul
          className="absolute left-0 right-0 overflow-y-auto max-h-44 mt-1 bg-white border rounded shadow-md z-10"
          role="listbox"
        >
          {options.map((option, index) => (
            <li
              key={index}
              role="option"
              aria-selected={selectedOption === option}
              className="px-4 py-2 hover:bg-gray-100 cursor-pointer"
              onClick={() => handleOptionClick(option)}
            >
              {option.parentCategoryName}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default CategoryDrop;
