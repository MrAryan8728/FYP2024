"use client"
import React, { useState, useEffect } from "react";
import { useParams } from "next/navigation";
import Image from 'next/image';

const Page = () => {
  const [data, setData] = useState({});
  const [Fulldata, setFullData] = useState([]);
  const { id } = useParams();

  useEffect(() => {
    DataLoader();
  }, []);

  useEffect(() => {
    console.log(Fulldata)
  }, [Fulldata]);

  const DataLoader = async () => {
    const res = await fetch("https://jsonplaceholder.typicode.com/posts");
    const json = await res.json();
    setFullData(json);
    console.log(Fulldata);
    const val = json.find(d => d.id === parseInt(id));
    setData(val);
  };

  return (
    <div className="max-w-[70rem] mx-auto h-screen">
      <div className="text-center my-10">
        <h1 className="font-bold text-3xl text-first uppercase my-6">{data.title}</h1>
        <p className="text-lg">{data.body}</p>
      </div>
      <div className="grid grid-cols-3 gap-5">
        {/* For image  */}
        <div className="col-span-2 h-full w-full bg-white relative">
          <Image src='/gareeb.png' alt="Img" layout="fill" objectFit="cover" />
        </div>
        {/* For Other Options*/}
        <div className="border-t-4 border-first">
          <div className="mt-10 p-4">
            <h1 className="font-bold text-2xl  text-first"> US$ 87,604 </h1>
            <h1> lorem ipsum </h1>
          </div>
          <div className="my-7 p-4">
            <h1 className="font-bold text-2xl text-second"> 1304 </h1>
            <h1> backers </h1>
          </div>
          <div className="my-7 p-4">
            <h1 className="font-bold text-2xl text-second"> 52 </h1>
            <h1> days to go  </h1>
          </div>
          <button className="bg-primary text-white text-xl font-bold px-9 w-full py-3 rounded"> Contribute </button>
        </div>
      </div>
    </div>
  );
};

export default Page;
