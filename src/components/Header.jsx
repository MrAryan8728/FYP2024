"use client"
import React, { useState } from 'react';
import Link from 'next/link';

export const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  return (
    <div className='flex justify-between h-20 items-center sticky top-0 bg-white z-10'>
      {/* for logo */}
      <Link href='/'>
        <div className='text-primary text-4xl font-ysabeau_sc cursor-pointer'>
          CryptoRaise
        </div>
      </Link>

      {/* for options */}
      <div className='hidden lg:flex space-x-5'>
        <Link href='/HIW'>
          <h1 className='hover:text-primary transition-all duration-300 cursor-pointer'>
            How It Works?
          </h1>
        </Link>
        <Link href='/Campaigns'>
          <h1 className='hover:text-primary transition-all duration-300 cursor-pointer'>
            Campaigns
          </h1>
        </Link>
        <Link href='/Contact'>
          <h1 className='hover:text-primary transition-all duration-300 cursor-pointer'>
            Contact Us
          </h1>
        </Link>
        <Link href='/About'>
          <div className='hover:text-primary transition-all duration-300 cursor-pointer'>
            About Us
          </div>
        </Link>
      </div>

      {/* for login */}
      <div className='hidden lg:flex gap-5'>
        <button className='border-2 border-primary px-5 py-2 font-bold text-primary rounded hover:bg-primary hover:text-white'>
          Start a Project
        </button>
        <button className='border-2 border-white font-bold px-5 py-2 text-white bg-primary rounded hover:bg-secondary'>
          Connect Wallet
        </button>
      </div>

      {/* Hamburger icon */}
      <div className='lg:hidden cursor-pointer' onClick={toggleMenu}>
        <svg
          xmlns='http://www.w3.org/2000/svg'
          className='h-6 w-6'
          fill='none'
          viewBox='0 0 24 24'
          stroke='currentColor'
        >
          <path
            strokeLinecap='round'
            strokeLinejoin='round'
            strokeWidth={2}
            d='M4 6h16M4 12h16m-7 6h7'
          />
        </svg>
      </div>

      {/* Mobile Menu */}
      {isMenuOpen && (
        <div className='lg:hidden absolute top-20 left-0 w-full bg-white z-20 flex flex-col items-center'>
          <Link href='/HIW'>
            <h1 className='hover:text-primary transition-all duration-300 cursor-pointer my-2'>
              How It Works?
            </h1>
          </Link>
          <Link href='/Campaigns'>
            <h1 className='hover:text-primary transition-all duration-300 cursor-pointer my-2'>
              Campaigns
            </h1>
          </Link>
          <Link href='/Contact'>
            <h1 className='hover:text-primary transition-all duration-300 cursor-pointer my-2'>
              Contact Us
            </h1>
          </Link>
          <Link href='/About'>
            <div className='hover:text-primary transition-all duration-300 cursor-pointer my-2'>
              About Us
            </div>
          </Link>
          {/* Buttons */}
          <button className='border-2 border-primary px-5 py-2 font-bold text-primary rounded hover:bg-primary hover:text-white my-2'>
            Start a Project
          </button>
          <button className='border-2 border-white font-bold px-5 py-2 text-white bg-primary rounded hover:bg-secondary my-2'>
            Connect Wallet
          </button>
        </div>
      )}
    </div>
  );
};

export default Header;
