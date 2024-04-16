"use client";
import React, { useEffect, useState } from "react";
import Image from "next/image";
// import Campaign from "../../../artifacts/contracts/Campaign.sol/Campaign.json";
import Campaign from "../../../../artifacts/contracts/Campaign.sol/Campaign.json";
import { Contract, JsonRpcProvider } from "ethers";

export default function Page({ params }) {
  const [data, setData] = useState([]);

  const RPC = process.env.NEXT_PUBLIC_RPC_URL;
  const provider = new JsonRpcProvider(RPC);
  const campaignAddress = params.address;
  const contract = new Contract(campaignAddress, Campaign.abi, provider);

  const callCamp = async () => {
    // const vote = await contract.vote(0);
    // console.log(vote);
  };
  useEffect(() => {
    // callCamp();
  }, []);

  return (
    <div>
      <div className=" max-w-[70rem] mx-auto h-[100vh]">
        <div className=" text-center my-10">
          <h1 className=" font-bold text-3xl text-first">Hello</h1>
          <p className=" text-lg">Hi</p>
        </div>
        <div className=" grid grid-cols-3 gap-5">
          {/* For image  */}
          <div className=" col-span-2 bg-white">
            <Image alt="Img" width={100} height={100} />
          </div>
          {/* For Other Options*/}
          <div className=" border-t-4 border-first ">
            <div className=" mt-10 p-4">
              <h1 className=" font-bold text-2xl  text-first"> US$ 87,604 </h1>
              <h1> lorem ipsum </h1>
            </div>
            <div className=" my-7 p-4">
              <h1 className=" font-bold text-2xl text-second"> 1304 </h1>
              <h1> backers </h1>
            </div>
            <div className=" my-7 p-4">
              <h1 className=" font-bold text-2xl text-second"> 52 </h1>
              <h1> days to go </h1>
            </div>
            <button className=" bg-first text-fourth font-bold px-9 w-full py-3 rounded">
              {" "}
              Contribute{" "}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
