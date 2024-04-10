import React from 'react';

const oneCard = () => {
  return (
    <div className="w-[23%] h-[30rem] relative rounded-md bg-gray-200 overflow-hidden">
      <div className="shimmer"></div>
      <div className="p-0">
        <div className="h-[10rem] bg-gray-300 rounded-md mb-4 animate-pulse"></div>
        <div className="h-10  bg-gray-300 rounded-md my-2 animate-pulse"></div>
        <div className="h-36  bg-gray-300 rounded-md my-2 animate-pulse"></div>
        <div className="h-10  bg-gray-300 rounded-md my-2 animate-pulse"></div>
        <button className="bg-gray-300 px-4 h-8 mt-5 py-2 animate-pulse rounded-md max-w-[70%] mx-auto block"></button>
      </div>
    </div>
  );
}

const Shimmer = () => {
  return (
    <>
      <div className=' flex flex-wrap gap-7'>
        {oneCard()}
        {oneCard()}
        {oneCard()}
        {oneCard()}
        {oneCard()}
        {oneCard()}
        {oneCard()}
        {oneCard()}
      </div>
    </>
  );
};

export default Shimmer;
