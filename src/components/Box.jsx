import React from "react";

const Box = ({ title, further }) => {
  return (
    <div className="bg-gray text-blue-500 rounded-lg p-4 shadow-md font-roboto font-bold">
      {title}
      <p>{further}</p>
    </div>
  );
};

export default Box;
