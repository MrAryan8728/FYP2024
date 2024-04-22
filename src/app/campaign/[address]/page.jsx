"use client";
import React, { useEffect, useState } from "react";
import Image from "next/image";
// import Campaign from "../../../artifacts/contracts/Campaign.sol/Campaign.json";
import Campaign from "../../../../artifacts/contracts/Campaign.sol/Campaign.json";
import { Contract, JsonRpcProvider } from "ethers";

export default function Page({ params }) {
  const [title, setTitle] = useState("");
  const [desc, setDesc] = useState("");
  const [imgURI, setImgURI] = useState("");
  const [targetAmt, setTargetAmt] = useState();
  const [amtraised, setAmtraised] = useState();
  const [contributors, setContributors] = useState();

  const RPC = process.env.NEXT_PUBLIC_RPC_URL;
  const provider = new JsonRpcProvider(RPC);
  const campaignAddress = params.address;
  const contract = new Contract(campaignAddress, Campaign.abi, provider);

  const getCampaignInfo = async () => {
    const campTitle = await contract.title();
    setTitle(campTitle);
    const campDesc = await contract.desc();
    setDesc(campDesc);
    const campImg = await contract.imgURI();
    setImgURI(campImg);
    const campTarget = await contract.targetAmt();
    setTargetAmt(parseInt(campTarget));
    const campRaised = await contract.amtraised();
    setAmtraised(parseInt(campRaised));
    const campContributors = await contract.contributorsCount();
    setContributors(parseInt(campContributors));
  };
  useEffect(() => {
    getCampaignInfo();
  }, []);

  return (
    <div>
      <div className=" max-w-[70rem] mx-auto h-[100vh]">
        <div className=" text-center my-10">
          <h1 className=" font-bold text-3xl text-first">{title}</h1>
          <p className=" text-lg">{desc}</p>
        </div>
        <div className=" grid grid-cols-3 gap-5">
          {/* For image  */}
          <div className=" col-span-2 bg-white">
            <Image
              src={`https://ipfs.io/ipfs/${imgURI}`}
              alt=""
              width="1"
              height="1"
              layout="responsive"
              objectFit="contain"
            />
          </div>
          {/* For Other Options*/}
          <div className=" border-t-4 border-first ">
            <div className=" mt-10 p-4">
              <h1 className="font-bold text-2xl  text-first">
                Total Target : {targetAmt} wei
              </h1>
              <h1 className="font-bold text-2xl  text-first">
                {" "}
                Amount Raised : {amtraised} wei
              </h1>
            </div>
            <div className=" my-7 p-4">
              <h1 className=" font-bold text-2xl text-second">
                {" "}
                {contributors}{" "}
              </h1>
              <h1> contributors </h1>
            </div>
            <div className=" my-7 p-4">
              <h1 className=" font-bold text-2xl text-second"> 52 </h1>
              <h1> days to go </h1>
            </div>
            <button className=" bg-primary text-white font-bold px-9 w-full py-3 rounded">
              {" "}
              Contribute{" "}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
