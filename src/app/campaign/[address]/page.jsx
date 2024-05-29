"use client";
import React, { useEffect, useRef, useState } from "react";
import Image from "next/image";
// import Campaign from "../../../artifacts/contracts/Campaign.sol/Campaign.json";
import Campaign from "../../../../artifacts/contracts/Campaign.sol/Campaign.json";
import { Contract, JsonRpcProvider } from "ethers";
import { useRouter } from "next/navigation";
import Modal from "../../../components/Modal"

export default function Page({ params }) {
  const [title, setTitle] = useState("");
  const [desc, setDesc] = useState("");
  const [imgURI, setImgURI] = useState("");
  const [targetAmt, setTargetAmt] = useState();
  const [amtraised, setAmtraised] = useState();
  const [contributors, setContributors] = useState();
  const [owner, setOwner] = useState("");
  const [address, setAddress] = useState("");
  const [isClicked, setIsClicked] = useState(false);

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

  const contribute = async () => {
    setIsClicked(true);
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
                <span className="text-xl">{targetAmt} wei</span>
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
              <h1 className=" font-bold text-2xl text-second"> 52 </h1>
              <h1> days to go </h1>
            </div>
            <button
              className=" bg-primary text-white font-bold px-9 w-full py-3 rounded mb-2"
              onClick={contribute}
            >
              {" "}
              Contribute{" "}
            </button>
            {address !== owner && (
              <button
                className=" bg-primary text-white font-bold px-9 w-full py-3 rounded mb-2"
                onClick={contribute}
              >
                {" "}
                Vote{" "}
              </button>
            )}
            {/* {address === owner && (
              <button
                className=" bg-primary text-white font-bold px-9 w-full py-3 rounded"
                onClick={contribute}
              >
                {" "}
                Claim fund{" "}
              </button>
            )} */}
          </div>
          {isClicked && <Modal setIsClicked={setIsClicked}/>}
        </div>
      </div>
    </div>
  );
}
