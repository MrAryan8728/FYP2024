"use client"
import React from "react";
import { FaFacebookF } from "react-icons/fa";
import { AiOutlineInstagram } from "react-icons/ai";
import { BsWhatsapp } from "react-icons/bs";

const Footer = () => {
  return (
    <footer className="px-2 py-8 text-gray-600">
      <hr className="mt-10 mb-8 h-[1px] bg-gray-300" />
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-y-6 max-w-5xl mx-auto">
        <div className="text-center sm:text-left">
          <h1 className="font-bold text-xl uppercase mb-3">About</h1>
          <div className="space-y-1">
            <p>About us</p>
            <p>Our charter</p>
            <p>Stats</p>
            <p>Press</p>
            <p>Jobs</p>
          </div>
        </div>
        <div className="text-center sm:text-left">
          <h1 className="font-bold text-xl uppercase mb-3">Support</h1>
          <div className="space-y-1">
            <p>Help Center</p>
            <p>Our Rules</p>
            <p>Creator Resources</p>
            <p>Forward Funds</p>
            <p>Brand assets</p>
          </div>
        </div>
        <div className="text-center sm:text-left">
          <h1 className="font-bold text-xl uppercase mb-3">
            More from CryptoRaise
          </h1>
          <div className="space-y-1">
            <p>Newsletters</p>
            <p>CryptoRaise Project Updates</p>
            <p>The Creative Independent</p>
            <p>Mobile apps</p>
            <p>Research</p>
          </div>
        </div>
      </div>
      <hr className="mt-8 mb-6 h-[1px] bg-gray-300" />
      <div className="flex flex-col items-center justify-center sm:flex-row sm:justify-between">
        <div className="text-center sm:text-left mb-4 sm:mb-0">
          <p className="text-sm">© 2024 CryptoRaise. All Rights Reserved.</p>
        </div>
        <div className="flex items-center space-x-4">
          <FaFacebookF className="hover:text-primary cursor-pointer w-6 h-6" />
          <AiOutlineInstagram className="hover:text-primary cursor-pointer w-6 h-6" />
          <BsWhatsapp className="hover:text-primary cursor-pointer w-6 h-6" />
        </div>
      </div>
    </footer>
  );
};

export default Footer;
