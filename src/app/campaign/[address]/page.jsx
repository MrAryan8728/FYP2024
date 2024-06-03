"use client";
import React, { useEffect, useRef, useState } from "react";
import Image from "next/image";
import Campaign from "../../../../artifacts/contracts/Campaign.sol/Campaign.json";
import { Contract, JsonRpcProvider } from "ethers";
import { useRouter } from "next/navigation";
import Modal from "../../../components/Modal";
// import {remainingHours} from "../../../utils/calculation"

export default function Page({ params }) {
  const [title, setTitle] = useState("");
  const [desc, setDesc] = useState("");
  const [imgURI, setImgURI] = useState("");
  const [targetAmt, setTargetAmt] = useState(0);
  const [amtraised, setAmtraised] = useState(0);
  const [contributors, setContributors] = useState();
  const [owner, setOwner] = useState("");
  const [address, setAddress] = useState("");
  const [isClicked, setIsClicked] = useState(false);
  const [deadline, setDeadline] = useState(0);

  const RPC = process.env.NEXT_PUBLIC_RPC_URL;
  const provider = new JsonRpcProvider(RPC);
  const campaignAddress = params.address;
  const contract = new Contract(campaignAddress, Campaign.abi, provider);
  const router = useRouter();

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
    const ownerAdd = await contract.owner();
    setOwner(ownerAdd);
    const _deadline = await contract.deadline();
    setDeadline(_deadline);
  };

  const getAllEvents = async () => {
    contract.events
      .allEvents()
      .on("data", (event) => {
        console.log("Event:", event.event, event.args);
      })
      .on("error", console.error);

    // Display events in sequential order
    events.forEach((event) => {
      console.log(`${event.event}: ${JSON.stringify(event.args)}`);
    });
  };

  let ethereum = useRef(null);

  const connect = async () => {
    try {
      await ethereum.current.request({ method: "eth_requestAccounts" });
      const provider = new BrowserProvider(ethereum.current);

      if (provider.network !== "sepolia") {
        await ethereum.current.request({
          method: "wallet_addEthereumChain",
          params: [
            {
              ...networks["sepolia"],
            },
          ],
        });
      }

      const account = await provider.getSigner();
      const Address = await account.getAddress();
      // check balance
      setAddress(Address);
      localStorage.setItem("account", Address);
      toast.success("Wallet Connected sucessfully");
    } catch (e) {
      if (e.code === 4001) {
        toast.error("Permissions needed to continue");
        setTimeout(() => router.push("/"), 3000);
      } else {
        toast.error(e.message);
        setTimeout(() => router.push("/"), 3000);
      }
    }
  };

  const contribute = () => {
    setIsClicked(true);
  };

  const timeDiff = (deadline) => {
    const date = BigInt(new Date().getTime());
    let diff = BigInt(date - deadline);
    return parseInt(diff);
  };

  const remainingSeconds = (deadline) => {
    return timeDiff(BigInt(deadline)) / 1000;
  };

  const remainingMinutes = (deadline) => {
    return remainingSeconds(BigInt(deadline)) / 60;
  };

  const remainingHours = (deadline) => {
    return remainingMinutes(BigInt(deadline)) / 60;
  };

  const abs = (n) => (n < 0n ? -n : n);

  const remainingDays = (deadline) => {
    let _deadline = BigInt(deadline) * BigInt(1000);
    const date = BigInt(new Date().getTime());
    let diff = BigInt(date - _deadline) / BigInt(1000);
    return parseInt(abs(diff / BigInt(24 * 3600)));
  };

  useEffect(() => {
    //   if (ethereum.current === null) {
    //     ethereum.current = window.ethereum;
    //   }
    //   const isLoggedIn = sessionStorage.getItem(isLoggedIn);
    //   const acc = localStorage.getItem("account");
    //   if (!isLoggedIn) {
    //     toast.error("Login and connect wallet to continue");
    //     setTimeout(() => router.push("/login"), 3000);
    //   } else if (acc === null) {
    //     if (typeof ethereum.current === null) {
    //       toast.error("Install Metamask first");
    //     } else {
    //       connect();
    //     }
    // } else getCampaignInfo();
    let acc = localStorage.getItem("account");
    if (acc === null) acc = "";
    setAddress(acc);
    getCampaignInfo();
    // getAllEvents();
  }, []);

  return (
    <div>
      <div className=" max-w-[90rem] mx-auto h-[100vh]">
        <div className=" text-center my-10">
          <h1 className=" font-bold text-3xl text-first">{title}</h1>
          <p className=" text-lg">{desc}</p>
          <div>
            <span>
              <span className="font-bold text-2xl  text-first">
                Owner Address :{" "}
              </span>
              <span className="text-lg">{owner}</span>
            </span>
          </div>
          <div>
            <span>
              <span className="font-bold text-2xl  text-first">
                Current Address :{" "}
              </span>
              <span className="text-lg">{address}</span>
            </span>
          </div>
        </div>
        <div className=" grid grid-cols-3 gap-5">
          {/* For image  */}
          <div className="col-span-2 bg-white relative">
            <Image
              src={`https://ipfs.io/ipfs/${imgURI}`}
              alt="Campaign image"
              fill={true}
            />
          </div>
          {/* For Other Options*/}
          <div className=" border-t-4 border-first ">
            <div className=" mt-10 p-4">
              <div>
                <span className="font-bold text-2xl  text-first">
                  Total Target :{" "}
                </span>
                <span className="text-xl">{targetAmt} wei</span>
              </div>
              <div>
                <span className="font-bold text-2xl  text-first">
                  Amount Raised :{" "}
                </span>
                <span className="text-xl">{amtraised} wei</span>
              </div>
            </div>
            <div className=" my-7 p-4">
              <h1 className=" font-bold text-2xl text-second">
                {" "}
                {contributors}{" "}
              </h1>
              <h1> contributors </h1>
            </div>
            <div className=" my-7 p-4">
              <h1 className=" font-bold text-2xl text-second">
                {" "}
                {remainingDays(deadline)}{" "}
              </h1>
              <h1> days to go </h1>
            </div>
            <button
              className=" bg-primary text-white font-bold px-9 w-full py-3 rounded mb-2"
              onClick={contribute}
            >
              {" "}
              Contribute{" "}
            </button>
            {/* {address !== owner && (
              <button
                className=" bg-primary text-white font-bold px-9 w-full py-3 rounded mb-2"
                onClick={contribute}
              >
                {" "}
                Vote{" "}
              </button>
            )} */}
            {/* {address === owner && (
              // <button
                className=" bg-primary text-white font-bold px-9 w-full py-3 rounded"
                onClick={contribute}
              >
                {" "}
                Claim fund{" "}
              </button>
            )} */}
          </div>
          {isClicked && (
            <Modal
              setIsClicked={setIsClicked}
              targetAmt={targetAmt}
              amtraised={amtraised}
              campaignAddress={campaignAddress}
            />
          )}
        </div>
      </div>
    </div>
  );
}
