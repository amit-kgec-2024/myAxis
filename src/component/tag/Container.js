import React from "react";

const Container = ({ children, className = "" }) => {
  return (
    <div className={`px-4 md:px-8 py-2 md:py-4 w-full ${className}`}>
      {children}
    </div>
  );
};

export default Container;
