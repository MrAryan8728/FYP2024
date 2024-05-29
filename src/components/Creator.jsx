import React from "react";
import Image from "next/image";

const Creator = ({ name, position, source }) => {
  return (
    <div className="flex flex-col mx-5 bg-gray-200 rounded-md p-5 justify-center items-center">
      <div
        className="relative rounded-full overflow-hidden bg-gray-100"
        style={{ width: "200px", height: "200px" }}
      >
        <Image
          src={source}
          alt="imageofweb"
          className="rounded-full"
          fill={true}
        />
      </div>
      <h1 className="font-bold text-slate-600 text-2xl my-1">{name}</h1>
      <button className="bg-primary text-white font-semibold mt-6 px-4 py-2 rounded-full">
        {position}
      </button>
    </div>
  );
};

export default Creator;
