"use client";
import React, { useState, useEffect } from "react";
import Shimmer from "./Shimmer";
import Card from "./Card";
import Link from "next/link";
import CampaignFactory from "../../artifacts/contracts/Campaign.sol/CampaignFactory.json";
import { Contract, JsonRpcProvider } from "ethers";

const CardContainer = () => {
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
    console.log(allCamps);

    let temp = [];

    allCamps.map((camp) => {
      // if (timeDiff(camp.args.deadline) > 0 && temp.length < 6)
      temp.push(camp);
      // console.log(temp[temp.length - 1].args.details.title);
    });
    setData(temp);
  };
  return (
    <div className="my-12">
      <h1 className=" text-center font-semibold text-3xl text-gray-500 my-12">
        Our Recent <span className="font-bold text-primary">Campaigns</span>
      </h1>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 max-w-[75rem] mx-auto">
        {data.length === 0 ? (
          <div className=" col-span-4">
            <Shimmer size={data.length} />
          </div>
        ) : (
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
                  campaignAddress={val.args.details.campaignAddress}
                />
              </Link>
            );
          })
        )}
      </div>
      {data.length > 4 && (
        <a href="/Campaigns" target="_blank">
          <h1 className=" text-center font-bold mt-5 text-gray-600">
            See More...
          </h1>
        </a>
      )}
    </div>
  );
};

export default CardContainer;
