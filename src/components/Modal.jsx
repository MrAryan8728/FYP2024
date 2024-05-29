import Link from "next/link";
import React, { useState, useEffect } from "react";

const Modal = ({ purpose, setIsClicked }) => {
  const [seconds, setSeconds] = useState(30);
  const [Show, setShow] = useState(true);

  useEffect(() => {
    const timer = setInterval(() => {
      setSeconds((prevSeconds) => {
        if (prevSeconds === 0) {
          clearInterval(timer);
          setShow(false);
          return prevSeconds;
        }
        return prevSeconds - 1;
      });
    }, 1000);

    return () => clearInterval(timer);
  }, []);

  const handleClick = (e) => {
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
          <form id="otp">
            <div className="w-[80%] mx-auto">
              <input
                type="text"
                required
                className="w-full px-4 py-3 text-black border-slate-500 border-2 rounded-md"
              ></input>
            </div>
            <div className="w-[6rem] mx-auto">
              <button
                className=" mt-4 w-full rounded-md p-2 mb-5 text-white font-bold bg-blue-700 hover:bg-blue-400"
                onClick={handleClick}
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
