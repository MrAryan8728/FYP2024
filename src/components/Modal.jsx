import Link from "next/link";
import React, { useState, useEffect } from "react";

const Modal = ({ setIsClicked, targetAmt, amtraised }) => {
  const [amount, setAmount] = useState(0);
  const [error, setError] = useState("");

  const handleChange = (e) => {
    const val = e.target.value;
    console.log(val+" "+amtraised+" "+targetAmt);
    if (val + amtraised > targetAmt) {
      setError("Target amount exceeded");
      // return;
    } else {
      setAmount(val);
      setError("");
    }
  };

  const sendTxn = async (e) => {
    e.preventDefault();
    setIsClicked(false);
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
                min={0}
                onChange={handleChange}
              />
              {error!==""}<p>{error}</p>
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
