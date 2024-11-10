import React from "react";

const H1 = ({ children, className = "" }) => {
  return (
    <div>
      <h1 className={`font-bold text-lg md:text-2xl ${className}`}>
        {children}
      </h1>
    </div>
  );
};

export default H1;
