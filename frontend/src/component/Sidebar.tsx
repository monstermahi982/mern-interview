import React from "react";

const Sidebar = () => {
  return (
    <div>
      <div className="flex flex-col w-full justify-center gap-10 min-h-screen bg-gray-100">
        <h3 className="text-center">Interview App</h3>
        <h3 className="bg-blue-500 w-fit ms-24 px-3 py-1 rounded-lg">+ New Content</h3>
        <h3 className="text-center">Template</h3>
        <h3 className="text-center">Englist</h3>
      </div>
    </div>
  );
};

export default Sidebar;
