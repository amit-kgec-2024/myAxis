import React from "react";

const Textarea = ({
  placeholder = "",
  label = "",
  id = "",
  name = "",
  value = "",
  onChange = () => {},
  className = "",
  className2 = "",
  readOnly = false,
  rows = 4,
  cols = 30,
}) => {
  return (
    <div className={`flex flex-col gap-1 mb-4 ${className2}`}>
      {label && (
        <label htmlFor={id} className="font-semibold text-gray-700">
          {label}
        </label>
      )}
      <textarea
        id={id}
        name={name}
        value={value}
        onChange={(e) => onChange(e.target.value)}
        placeholder={`${placeholder}...`}
        readOnly={readOnly}
        rows={rows}
        cols={cols}
        className={`outline-none px-4 w-full py-2 border border-gray-300 rounded-md transition focus:border-teal-500 focus:ring-2 focus:ring-teal-300 ${className}`}
      />
    </div>
  );
};

export default Textarea;
