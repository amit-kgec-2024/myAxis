import React from "react";

const H3 = ({ children, className = "" }) => {
  return (
    <div>
      <h1 className={`font-semibold text-sm md:text-lg ${className}`}>
        {children}
      </h1>
    </div>
  );
};

export default H3;
