"use client";
import React, { useEffect } from "react";
import Image from "next/image";
import ProgressBar from "@ramonak/react-progress-bar";

const Card = (props) => {
  useEffect(() => {
    const date = new Date().getTime();
    let timeDiff = getDeadline(props.deadline) - date;
    timeDiff /= 1000;
    const daysRemaining = timeDiff / (24 * 60 * 60);
    const hoursRemaining = timeDiff / (60 * 60);
    console.log(daysRemaining);
    console.log(hoursRemaining);
  }, []);

  const formatDate = (deadline) => {
    const date = new Date(getDeadline(deadline));
    return date.toLocaleString();
  };

  const getDeadline = (deadline) => {
    return Number(BigInt(deadline) * BigInt(1000));
  };

  const truncateText = (text, maxLen) => {
    if (text.length === "") return text;
    if (text.length <= maxLen) return text;
    return text.slice(0, maxLen) + "...";
  };
  return (
    <div className="w-[90%] rounded-md p-1 h-[500px] bg-gray-200 text-gray-600 hover:shadow-primary hover:shadow-xl hover:-translate-y-4 hover:transition-all hover:duration-500 flex-row box-border">
      <div className="w-[100%] h-[40%] bg-[#OOFFFFFF] overflow-hidden relative rounded-2xl">
        <Image
          src={`https://ipfs.io/ipfs/${props.imgURI}`}
          alt="Campaign Image"
          fill={true}
        />
      </div>
      <div className="px-5">
        <h1 className=" text-xl font-bold text-center mb-3">
          {truncateText(props.name, 20)}
        </h1>
        <p className=" font-normal text-md mb-8">
          {truncateText(props.desc, 100)}
        </p>
        <ProgressBar
          completed={60}
          bgColor="#3437eb"
          animateOnRender={true}
          baseBgColor="#ffffff"
          borderRadius="5px"
        />
        <div>Deadline : {formatDate(props.deadline)}</div>
        <div className=" flex justify-center items-center">
          <button className=" font-bold text-xl bg-primary px-5 py-2 text-white rounded-lg my-3 hover:bg-secondary">
            Contribute
          </button>
        </div>
      </div>
    </div>
  );
};

export default Card;
