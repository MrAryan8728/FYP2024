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

  const timeDiff = (deadline) => {
    const date = new Date().getTime();
    let diff = parseInt(deadline) - date;
    return diff;
  };

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
    <div className="my-12">
      <h1 className=" text-center font-semibold text-3xl text-gray-500 my-12">
        Our Recent <span className="font-bold text-primary">Campaigns</span>
      </h1>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 max-w-[75rem] mx-auto">
        {data.length === 0 ? (
          <div className=" col-span-4">
            <Shimmer />
          </div>
        ) : (
          // timeDiff(val.args.deadline) > 0 &&
          data.map((val, index) => {
            if (index < 6) {
              return (
                <Link
                  href={`/campaign/${val.args.campaignAddress}`}
                  key={index}
                >
                  <Card
                    name={val.args.title}
                    desc={val.args.desc}
                    imgURI={val.args.imgURI}
                    deadline={val.args.deadline}
                  />
                </Link>
              );
            }
          })
        )}
      </div>
      <a href="/Campaigns" target="_blank">
        <h1 className=" text-center font-bold mt-5 text-gray-600">
          See More...
        </h1>
      </a>
    </div>
  );
};

export default CardContainer;
