"use client";
import React, { useState, useRef, useEffect } from "react";
import Link from "next/link";
import { MdArrowDropDown, MdArrowDropUp } from "react-icons/md";
import { BrowserProvider } from "ethers";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useRouter } from "next/navigation";

const networks = {
  sepolia: {
    chainId: `0x${Number(11155111).toString(16)}`,
    chainName: "Sepolia Test Network",
    rpcUrls: ["https://rpc.sepolia.org/"],
    nativeCurrency: {
      name: "SepoliaETH",
      symbol: "ETH",
      decimals: 18,
    },
    blockExplorerUrls: ["https://sepolia.etherscan.io/"],
  },
  polygon: {
    chainId: `0x${Number(80002).toString(16)}`,
    chainName: "Polygon Amoy Testnet",
    rpcUrls: ["https://rpc-amoy.polygon.technology/"],
    nativeCurrency: {
      name: "MATIC",
      symbol: "MATIC",
      decimals: 18,
    },
    blockExplorerUrls: ["https://www.oklink.com/amoy"],
  },
  polygonMainnet: {
    chainId: `0x${Number(137).toString(16)}`,
    chainName: "Polygon Mainnet",
    rpcUrls: ["https://polygon-rpc.com/"],
    nativeCurrency: {
      name: "MATIC",
      symbol: "MATIC",
      decimals: 18,
    },
    blockExplorerUrls: ["https://polygonscan.com/"],
  },
};

export const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isOpen, setIsOpen] = useState(false);
  const [display, setDisplay] = useState(false);
  const [address, setAddress] = useState("");
  const [isArrowDown, setIsArrowDown] = useState(true);
  const [walletConnecting, setWalletConnecting] = useState(false);
  const dropdownRef = useRef(null);

  const router = useRouter();

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setDisplay(false);
        setIsArrowDown(true);
      }
    };

    if (isOpen || display) {
      document.addEventListener("click", handleClickOutside);
    }

    return () => {
      document.removeEventListener("click", handleClickOutside);
    };
  }, [isOpen, display]);

  let ethereum = useRef(null);

  useEffect(() => {
    if (ethereum.current === null) {
      ethereum.current = window.ethereum;
      // console.log(ethereum);
    }
    const acc = localStorage.getItem("account");
    if (acc === null) {
      setAddress("");
      localStorage.setItem("account", "");
    } else setAddress(acc);
  }, []);

  const toggleMenu = () => {
    setIsOpen(!isOpen);
  };

  const toggleDisplay = () => {
    setDisplay(!display);
  };

  const toggleArrow = () => {
    setIsArrowDown(!isArrowDown);
  };

  const connect = async () => {
    setWalletConnecting(true);
    if (typeof ethereum.current === null) {
      toast.error("Install Metamask first");
    } else {
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
        } else {
          toast.error(e.message);
        }
      }
    }
    setWalletConnecting(false);
  };

  const disconnect = () => {
    setAddress("");
    localStorage.setItem("account", "");
    toast.success("Wallet Disconnected sucessfully");
    setDisplay(false);
    setIsArrowDown(true);
    router.push("/");
  };

  const falseClick = () => {
    toast.warn("Wallet connection request already pending");
  };

  return (
    <div className="flex justify-between h-20 items-center sticky top-0 bg-white z-10">
      {/* for logo */}
      <Link href="/">
        <div className="text-primary text-4xl font-ysabeau_sc cursor-pointer">
          CryptoRaise
        </div>
      </Link>

      {/* for options */}
      <div className="hidden lg:flex space-x-5">
        <Link href="/HIW">
          <h1 className="hover:text-primary transition-all duration-300 cursor-pointer">
            How It Works?
          </h1>
        </Link>
        <Link href="/Campaigns">
          <h1 className="hover:text-primary transition-all duration-300 cursor-pointer">
            Campaigns
          </h1>
        </Link>
        <Link href="/Contact">
          <h1 className="hover:text-primary transition-all duration-300 cursor-pointer">
            Contact Us
          </h1>
        </Link>
        <Link href="/About">
          <div className="hover:text-primary transition-all duration-300 cursor-pointer">
            About Us
          </div>
        </Link>
      </div>

      {/* for login */}
      <div className="hidden lg:flex gap-5">
        <Link href="/CreateCampaign">
          <button className="border-2 border-primary px-5 py-2 font-bold text-primary rounded hover:bg-primary hover:text-white">
            Start a Project
          </button>
        </Link>
        <Link href="/login">
          <button className=" bg-primary text-white px-5 py-2 font-bold rounded-md ">
            Log In
          </button>
        </Link>
        <Link href="/register">
          <button className=" bg-primary text-white px-5 py-2 font-bold rounded-md ">
            Register
          </button>
        </Link>
        {address === "" ? (
          !walletConnecting ? (
            <button
              className="bg-primary font-bold text-white p-2 rounded-md hover:bg-secondary max-[770px]"
              onClick={connect}
            >
              Connect wallet
            </button>
          ) : (
            <button
              className="bg-primary font-bold text-white p-2 rounded-md hover:bg-secondary max-[770px]"
              onClick={falseClick}
            >
              Connect wallet
            </button>
          )
        ) : (
          <div className="flex justify-center items-center" ref={dropdownRef}>
            <div className=" border-2 border-fourth px-4 py-2">
              {address.slice(0, 6)}.......{address.slice(address.length - 4)}
            </div>
            {isArrowDown ? ( // Using isArrowDown state to toggle between dropdown and dropup icons
              <MdArrowDropDown // Displaying MdArrowDropDown icon when isArrowDown is true
                className="text-lg cursor-pointer"
                onClick={() => {
                  toggleArrow();
                  toggleDisplay();
                }}
              />
            ) : (
              <MdArrowDropUp // Displaying MdArrowDropUp icon when isArrowDown is false
                className="text-lg cursor-pointer"
                onClick={() => {
                  toggleArrow();
                  toggleDisplay();
                }}
              />
            )}
            {display && (
              <div className="absolute top-[80%] right-1 flex flex-col bg-gray-300 text-gray-600 p-2 rounded-md">
                <Link href="/dashboard">
                  <div className="pl-2 cursor-pointer hover:font-bold mb-2">
                    Dashboard
                  </div>
                </Link>
                <button
                  className="bg-primary text-white font-bold p-2 rounded-md hover:bg-secondary"
                  onClick={disconnect}
                >
                  Disconnect wallet
                </button>
              </div>
            )}
          </div>
        )}
      </div>

      {/* Hamburger icon */}
      <div className="lg:hidden cursor-pointer" onClick={toggleMenu}>
        <svg
          xmlns="http://www.w3.org/2000/svg"
          className="h-6 w-6"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M4 6h16M4 12h16m-7 6h7"
          />
        </svg>
      </div>

      {/* Mobile Menu */}
      {isMenuOpen && (
        <div className="lg:hidden absolute top-20 left-0 w-full bg-white z-20 flex flex-col items-center">
          <Link href="/HIW">
            <h1 className="hover:text-primary transition-all duration-300 cursor-pointer my-2">
              How It Works?
            </h1>
          </Link>
          <Link href="/Campaigns">
            <h1 className="hover:text-primary transition-all duration-300 cursor-pointer my-2">
              Campaigns
            </h1>
          </Link>
          <Link href="/Contact">
            <h1 className="hover:text-primary transition-all duration-300 cursor-pointer my-2">
              Contact Us
            </h1>
          </Link>
          <Link href="/About">
            <div className="hover:text-primary transition-all duration-300 cursor-pointer my-2">
              About Us
            </div>
          </Link>
          {/* Buttons */}
          <Link href="/CreateCampaign">
            <button className="border-2 border-primary px-5 py-2 font-bold text-primary rounded hover:bg-primary hover:text-white my-2">
              Start a Project
            </button>
          </Link>
          <button className="border-2 border-white font-bold px-5 py-2 text-white bg-primary rounded hover:bg-secondary my-2">
            Connect Wallet
          </button>
        </div>
      )}
    </div>
  );
};

export default Header;
