import React from 'react';
import Card from './Card';
import Link from 'next/link';

const CardContainer = () => {
  return (
    <div className='my-12'>
      <h1 className='font-semibold text-3xl text-gray-500 my-6'>
        Our Recent <span className='font-bold text-primary'>Campaigns</span>
      </h1>
      <div className='grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 max-w-[75rem] mx-auto'>
        <Card />
        <Card />
        <Card />
        <Card />
        <Card />
        <Card />
      </div>
      <a href='/Campaigns' target='_blank'><h1 className=' text-center font-bold mt-5 text-gray-600'>See More...</h1></a>
    </div>
  );
};

export default CardContainer;
