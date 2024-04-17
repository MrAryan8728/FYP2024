"use client";
import React, { useState, useEffect } from "react";
import Card from "../../components/Card";
import Shimmer from "../../components/Shimmer";
import Link from "next/link";
import CampaignFactory from "../../../artifacts/contracts/Campaign.sol/CampaignFactory.json";
import { Contract, JsonRpcProvider } from "ethers";

const page = () => {
  const RPC = process.env.NEXT_PUBLIC_RPC_URL;
  const provider = new JsonRpcProvider(RPC);
  const contractAddress = process.env.NEXT_PUBLIC_CONTRACT_ADDRESS;
  const contract = new Contract(contractAddress, CampaignFactory.abi, provider);
  const [data, setData] = useState([]);
  useEffect(() => {
    DataLoader();
  }, []); 

  const DataLoader = async () => {
    // const data = await fetch("https://jsonplaceholder.typicode.com/posts");
    // const json = await data.json();
    // setData(json);

    const getAllCampaigns = contract.filters.campaignCreated();
    const allCamps = await contract.queryFilter(getAllCampaigns);
    // console.log(allCamps);
    // allCamps.map((e) => console.log(e.args.title));
    setData(allCamps);
    // console.log(allCamps);
    // console.log(contract);
  };
  return (
    <div className=" grid grid-cols-4 gap-3">
      {data.length === 0 ? (
        <div className=" col-span-4">
          <Shimmer />
        </div>
      ) : (
        data.map((val, index) => {
          return (
            <Link href={`/campaign/${val.args.campaignAddress}`} key={index}>
              <Card
                name={val.args.title}
                desc={val.args.desc}
                imgURI={val.args.imgURI}
              />
            </Link>
          );
        })
      )}
    </div>
  );
};

export default page;
