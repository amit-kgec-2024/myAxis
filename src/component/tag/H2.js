import React from "react";

const H2 = ({ children, className = "" }) => {
  return (
    <div>
      <h1 className={`font-bold text-base md:text-xl ${className}`}>
        {children}
      </h1>
    </div>
  );
};

export default H2;
