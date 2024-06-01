import React, { useState } from "react";
import { BrowserProvider, Contract, parseUnits } from "ethers";
import { toast } from "react-toastify";
import CampaignFactory from "../../artifacts/contracts/Campaign.sol/Campaign.json";

const Modal = ({ setIsClicked, targetAmt, amtraised, campaignAddress }) => {
  const [amount, setAmount] = useState(1);
  const [error, setError] = useState("");

  const handleChange = (e) => {
    const val = parseInt(e.target.value);
    setAmount(val);
    if (val <= 0) {
      setError("Contribution amount must be greater than 0");
      return;
    }
    if (val + parseInt(amtraised) > parseInt(targetAmt)) {
      setError("Target amount exceeded");
      return;
    } else {
      setError("");
    }
  };

  const sendTxn = async (e) => {
    setIsClicked(false);
    e.preventDefault();
    if (!window.ethereum) {
      toast.error("MetaMask is not installed!");
      return;
    }

    try {
      const walletProvider = new BrowserProvider(window.ethereum);
      await walletProvider.send("eth_requestAccounts", []);
      const signer = await walletProvider.getSigner();
      const contract = new Contract(
        campaignAddress,
        CampaignFactory.abi,
        signer
      );

      // let amt = parseUnits(amount.toString(), 18);
      // console.log(amt);
      let tx = await contract.contribute({ value: amount });
      await tx.wait();

      toast.success("Transaction successful");
      location.reload();
      
    } catch (e) {
      toast.error(e.message || "Transaction failed");
    }
  };
  return (
    <div className=" fixed inset-0 bg-black bg-opacity-30 backdrop-blur-md flex justify-center items-center z-20">
      <div className=" flex flex-col gap-5">
        <div className=" bg-white rounded-xl flex flex-col gap-5 text-slate-500 items-center relative w-[300px]">
          <div
            className="text-right pr-2 w-full text-xl font-extrabold cursor-pointer"
            onClick={() => {
              setIsClicked(false);
            }}
          >
            X
          </div>
          <h1 className=" text-xl">Enter Contribution Amount</h1>
          <form id="amount">
            <div className="w-[80%] mx-auto">
              <input
                type="number"
                required
                className="w-full px-4 py-3 text-black border-slate-500 border-2 rounded-md"
                value={amount}
                min={1}
                onChange={handleChange}
              />
              {error !== ""}
              <p className="text-red-700 text-sm">{error}</p>
            </div>
            <div className="w-[6rem] mx-auto">
              <button
                className=" mt-4 w-full rounded-md p-2 mb-5 text-white font-bold bg-blue-700 hover:bg-blue-400"
                onClick={sendTxn}
              >
                Contribute
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Modal;
