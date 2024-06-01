"use client";
import React, { useEffect, useState } from "react";
import Image from "next/image";
import ProgressBar from "@ramonak/react-progress-bar";
import { Contract, JsonRpcProvider } from "ethers";
import Campaign from "../../artifacts/contracts/Campaign.sol/Campaign.json";

const Card = (props) => {
  const [progress, setProgress] = useState(0);
  const campaignAddress = props.campaignAddress;
  const RPC = process.env.NEXT_PUBLIC_RPC_URL;
  const provider = new JsonRpcProvider(RPC);
  const contract = new Contract(campaignAddress, Campaign.abi, provider);

  const update = async () => {
    const amtraised = await contract.amtraised();
    const targetAmt = await contract.targetAmt();
    const percentage = (Number(amtraised) * 100) / Number(targetAmt);
    setProgress(percentage);
  };
  useEffect(() => {
    update();
  }, []);

  const formatDate = (deadline) => {
    const deadlineInMillis = Number(BigInt(deadline) * BigInt(1000));
    const date = new Date(deadlineInMillis);
    return date.toLocaleString("en-IN");
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
          completed={progress}
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
