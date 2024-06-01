"use client";
import React, { useState, useEffect } from "react";
import Card from "../../components/Card";
import Shimmer from "../../components/Shimmer";
import Link from "next/link";
import CampaignFactory from "../../../artifacts/contracts/Campaign.sol/CampaignFactory.json";
import { Contract, JsonRpcProvider } from "ethers";

const Page = () => {
  const RPC = process.env.NEXT_PUBLIC_RPC_URL;
  const provider = new JsonRpcProvider(RPC);
  const contractAddress = process.env.NEXT_PUBLIC_CONTRACT_ADDRESS;
  const contract = new Contract(contractAddress, CampaignFactory.abi, provider);
  const [data, setData] = useState([]);
  useEffect(() => {
    DataLoader();
  }, []);

  const DataLoader = async () => {
    const getAllCampaigns = contract.filters.campaignCreated();
    const allCamps = await contract.queryFilter(getAllCampaigns);

    let temp = [];
    allCamps.map((camp) => {
      // if (timeDiff(camp.args.deadline) > 0)
      temp.push(camp);
    });
    setData(temp);
  };

  return (
    <>
      {data.length === 0 && (
        <div className="w-full text-center text-gray-500">
          No campaign to display
        </div>
      )}
      <div className=" grid grid-cols-4 gap-3">
        {data.length > 0 &&
          data.map((val, index) => {
            return (
              <Link
                href={`/campaign/${val.args.details.campaignAddress}`}
                key={index}
              >
                <Card
                  name={val.args.details.title}
                  desc={val.args.details.desc}
                  imgURI={val.args.details.imgURI}
                  deadline={val.args.deadline}
                />
              </Link>
            );
          })}
      </div>
    </>
  );
};

export default Page;
