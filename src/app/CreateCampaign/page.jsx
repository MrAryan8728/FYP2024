"use client";
import React, { useState } from "react";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
// import CampaignFactory from "../../artifacts/contracts/Campaign.sol/CampaignFactory.json";
import CampaignFactory from "../../../artifacts/contracts/Campaign.sol/CampaignFactory.json";
import { useRouter } from "next/navigation";
const {
  ethers,
  JsonRpcProvider,
  Contract,
  BrowserProvider,
} = require("ethers");

const InitCamp = () => {
  const [firstInstallment, setFirstInstallment] = useState();
  const [secondInstallment, setSecondInstallment] = useState();
  const [file, setFile] = useState("");
  const [cid, setCid] = useState("");
  const [uploading, setUploading] = useState(false);
  const [formData, setFormData] = useState({
    title: "",
    desc: "",
    target: 1,
    imgURI: "",
    category: "",
    country: "",
    deadline: 1,
    threshold: 1,
    firstInstallment: 10,
    secondInstallment: 10,
    thirdInstallment: 80
  });

  const contractAddress = process.env.NEXT_PUBLIC_CONTRACT_ADDRESS;
  const RPC = process.env.NEXT_PUBLIC_RPC_URL;
  const router = useRouter();

  const uploadFile = async (fileToUpload) => {
    try {
      setUploading(true);
      const data = new FormData();
      data.set("file", fileToUpload);
      const res = await fetch("/api/files", {
        method: "POST",
        body: data,
      });
      const resData = await res.json();
      toast.success("Uploaded Successfully !");
      const ipfsHash = await resData.IpfsHash;
      console.log(ipfsHash);
      // setCid(resData.IpfsHash);
      setUploading(false);
      setFormData((prevState) => ({
        ...prevState,
        imgURI: ipfsHash,
      }));
    } catch (e) {
      console.log(e);
      setUploading(false);
      toast.error("Trouble uploading file");
    }
  };

  const handleFirstInstallmentChange = (e) => {
    let value = parseInt(e.target.value);
    setFirstInstallment(value);
    if (value >= 10 && value <= 30) {
      setFirstInstallment(value);
      toast.info("Updated");
    } else {
      toast.error("Value can be between 10 and 30 inclusive")
    }
  };

  const handleSecondInstallmentChange = (e) => {
    let value = parseInt(e.target.value);
    setSecondInstallment(value);
    if (value >= 10 && value <= 30) {
      setSecondInstallment(value);
      toast.info("Updated");
    } else {
      toast.error("Value can be between 10 and 30 inclusive")
    }
  };

  const thirdInstallment = 100 - firstInstallment - secondInstallment;

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      let ethereum;
      if (typeof window !== undefined) ethereum = window.ethereum;
      const walletProvider = new BrowserProvider(ethereum);
      const signer = await walletProvider.getSigner();
      const contract = new Contract(
        contractAddress,
        CampaignFactory.abi,
        signer
      );
      const campaignData = await contract.createCampaign(
        formData.title,
        formData.desc,
        parseInt(formData.target),
        formData.imgURI,
        formData.category,
        formData.country,
        parseInt(formData.deadline),
        parseInt(formData.threshold),
        parseInt(formData.firstInstallment),
        parseInt(formData.secondInstallment),
        parseInt(formData.thirdInstallment)
      );
      await campaignData.wait();
      console.log(campaignData.to);
      toast.success("Campaign Started Successfully");
      router.push("/");
    } catch (error) {
      // console.error("Error:", error);
      toast.error(
        "An error occurred while starting the campaign. Try again after some time"
      );
      // setTimeout(() => window.location.reload(), 3000);
    }
  };
  const falseSubmit = () => {
    if (formData.title === "") toast.error("Name must not be empty");
    else if (formData.desc === "") toast.error("Description can't be empty");
    else if (formData.target <= 0)
      toast.error("Target amount must be greater than 0");
    else if (formData.imgURI === "") toast.error("Upload image");
    else if (formData.category === "") toast.error("Enter project category");
    else if (formData.deadline <= 0)
      toast.error("Deadline must be greater than 0");
    else if (formData.threshold <= 0)
      toast.error("Threshold must be greater than 0");
    else toast.error("Enter your country");
  };
  const handleChange = (e) => {
    setFormData((prevState) => ({
      ...prevState,
      [e.target.name]: e.target.value,
    }));
  };
  const ImageChangeHandler = (e) => {
    setFile(e.target.files[0]);
    uploadFile(e.target.files[0]);
  };
  return (
    <div className="container h-[full] w-[60%] mx-auto border-2 shadow-md shadow-primary rounded my-10 p-10 bg-white">
      <h1 className="font-bold text-2xl my-4 text-center text-gray-600 uppercase">
        Enter Campaign Details
      </h1>
      <div className="px-2">
        <div className="mb-4">
          <label htmlFor="title" className="leading-7 text-sm text-slate-600">
            Campaign Name
          </label>
          <input
            onChange={handleChange}
            value={formData.title}
            type="text"
            id="name"
            name="title"
            className="w-full bg-white rounded border border-third focus:border-second focus:ring-2 focus:ring-third text-base outline-none text-second py-1 px-3 leading-8 transition-colors duration-200 ease-in-out"
          />
        </div>
      </div>
      <div className="px-2">
        <div className="mb-4">
          <label htmlFor="text" className="leading-7 text-sm text-gray-600">
            Description
          </label>
          <input
            onChange={handleChange}
            value={formData.desc}
            type="text"
            id="name"
            name="desc"
            className="w-full bg-white rounded border border-third focus:border-third focus:ring-2 focus:ring-indigo-200 text-base outline-none text-second py-1 px-3 leading-8 transition-colors duration-200 ease-in-out"
          />
        </div>
      </div>
      <div className="px-2">
        <div className="mb-4">
          <label htmlFor="target" className="leading-7 text-sm text-gray-600">
            Amount to be raised(Must be Greater than 0)
          </label>
          <div>
            <input
              type="number"
              min={1}
              onChange={handleChange}
              value={formData.target}
              id="amount"
              name="target"
              className="w-[90%] bg-white rounded border border-third focus:border-third focus:ring-2 focus:ring-indigo-200 text-base outline-none text-second py-1 px-3 leading-8 transition-colors duration-200 ease-in-out"
            />
            <span className="font-bold ml-2">wei</span>
          </div>
        </div>
      </div>

      <div className="px-2">
        <div className="mb-4">
          <label htmlFor="imgURI" className="leading-7 text-sm text-gray-600">
            Select project image
          </label>
          <div className=" flex">
            <input
              type="file"
              accept="image/jpg"
              id="imgURI"
              name="imgURI"
              onChange={ImageChangeHandler}
              className="w-[90%] cursor-pointer bg-white rounded border border-third focus:border-third focus:ring-2 focus:ring-indigo-200 text-base outline-none text-second py-1 px-3 leading-8 transition-colors duration-200 ease-in-out"
            />
            {formData.imgURI === "" ? (
              file.length === 0 ? (
                <button
                  className=" bg-primary text-white px-3 ml-3 rounded-md font-bold"
                  onClick={() => {
                    toast.error("Choose an Image");
                  }}
                >
                  Choose
                </button>
              ) : (
                <button
                  className=" bg-primary text-white px-3 ml-3 rounded-md font-bold"
                  onClick={() => {
                    uploadFile(file);
                  }}
                >
                  Upload
                </button>
              )
            ) : (
              <button
                className=" bg-primary text-white px-3 ml-3 rounded-md font-bold"
                onClick={() => toast.info("Already Uploaded !")}
              >
                Uploaded
              </button>
            )}
          </div>
        </div>
      </div>

      <div className="px-2">
        <div className="mb-4">
          <label htmlFor="category" className="leading-7 text-sm text-gray-600">
            Category
          </label>
          <input
            type="text"
            value={formData.category}
            onChange={handleChange}
            id="category"
            name="category"
            className="w-full bg-white rounded border border-third focus:border-third focus:ring-2 focus:ring-indigo-200 text-base outline-none text-second py-1 px-3 leading-8 transition-colors duration-200 ease-in-out"
          />
        </div>
      </div>
      <div className="px-2">
        <div className="mb-4">
          <label htmlFor="country" className="leading-7 text-sm text-gray-600">
            Country of Origin
          </label>
          <input
            type="text"
            onChange={handleChange}
            value={formData.country}
            id="country"
            name="country"
            className="w-full bg-white rounded border border-third focus:border-third focus:ring-2 focus:ring-indigo-200 text-base outline-none text-second py-1 px-3 leading-8 transition-colors duration-200 ease-in-out"
          />
        </div>
      </div>
      <div className="px-2">
        <div className="mb-4">
          <label htmlFor="dealin" className="leading-7 text-sm text-gray-600">
            Deadline
          </label>
          <input
            type="number"
            onChange={handleChange}
            value={formData.deadline}
            id="deadline"
            name="deadline"
            className="w-full bg-white rounded border border-third focus:border-third focus:ring-2 focus:ring-indigo-200 text-base outline-none text-second py-1 px-3 leading-8 transition-colors duration-200 ease-in-out"
          />
        </div>
      </div>
      <div className="px-2">
        <div className="mb-4">
          <label
            htmlFor="threshold"
            className="leading-7 text-sm text-gray-600"
          >
            Threshold
          </label>
          <input
            type="number"
            onChange={handleChange}
            value={formData.threshold}
            id="threshold"
            name="threshold"
            className="w-full bg-white rounded border border-third focus:border-third focus:ring-2 focus:ring-indigo-200 text-base outline-none text-second py-1 px-3 leading-8 transition-colors duration-200 ease-in-out"
          />
        </div>
      </div>
      <div className=" px-2 mb-4 text-center leading-7 font-medium text-gray-600 uppercase">
        <p> Select  Installments  for  Disbursement Process </p>
      </div>
      <div className=" px-2 mb-4">
        <label className="leading-7 text-sm text-gray-600">First Installment: </label>
        <input
          type="number"
          placeholder="eg.(10%)"
          value={firstInstallment}
          onChange={handleFirstInstallmentChange}
          min="10"
          max="30"
          className="w-full bg-white rounded border border-third focus:border-third focus:ring-2 focus:ring-indigo-200 text-base outline-none text-second py-1 px-3 leading-8 transition-colors duration-200 ease-in-out"
        />
      </div>
      <div className=" px-2 mb-4">
        <label className="leading-7 text-sm text-gray-600">Second Installment: </label>
        <input
          type="number"
          placeholder="eg.(10%)"
          value={secondInstallment}
          onChange={handleSecondInstallmentChange}
          min="10"
          max="30"
          className="w-full bg-white rounded border border-third focus:border-third focus:ring-2 focus:ring-indigo-200 text-base outline-none text-second py-1 px-3 leading-8 transition-colors duration-200 ease-in-out"
        />
      </div>
      <div className=" px-2 mb-4">
        <label className="leading-7 text-sm text-gray-600">Third Installment: </label>
        <input
          type="number"
          placeholder="eg.(80%)"
          value={thirdInstallment}
          className="w-full bg-white rounded border border-third focus:border-third focus:ring-2 focus:ring-indigo-200 text-base outline-none text-second py-1 px-3 leading-8 transition-colors duration-200 ease-in-out"
          readOnly
        />
      </div>
      {formData.title === "" ||
        formData.desc === "" ||
        formData.target <= 0 ||
        formData.imgURI === "" ||
        formData.category === "" ||
        formData.country === "" ||
        formData.deadline <= 0 ||
        formData.threshold <= 0 ? (
        <button
          className="bg-primary text-xl uppercase text-white px-8 py-3 max-w-[20%] mx-auto block rounded-md font-bold "
          onClick={falseSubmit}
        >
          Submit
        </button>
      ) : (
        <button
          className="bg-primary text-xl uppercase text-white px-8 py-3 max-w-[20%] mx-auto block rounded-md font-bold "
          onClick={handleSubmit}
        >
          Submit
        </button>
      )}
    </div>
  );
};

export default InitCamp;
