import React from "react";
import Top from "./Top";
import Dashboard from "./Dashboard";

const Layout = ({ children }) => {
  return (
    <div className="flex h-screen">
      <Dashboard />
      <main
        className="flex flex-col w-full overflow-auto"
        style={{ scrollbarWidth: "none" }}
      >
        <Top />
        <div>{children}</div>
      </main>
    </div>
  );
};

export default Layout;
