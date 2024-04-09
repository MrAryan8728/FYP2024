"use client";
import React, { useState, useEffect } from "react";
import Card from "@/components/Card";
import Loader from "@/components/Loader";
import Link from 'next/link'

const page = () => {
  const [data, setData] = useState([]);
  useEffect(() => {
    DataLoader();
  }, []);

  const DataLoader = async () => {
    const data = await fetch("https://jsonplaceholder.typicode.com/posts");
    const json = await data.json();
    setData(json);
  };
  {(data.length == 0)&&<Loader/>}
  return (
    <div className=" grid grid-cols-4 gap-3">
      {data.map((data) => {
        return <Link href={`/campaign/${data.id}`}><Card key={data.id} name={data.title} desc={data.body}/></Link>;
      })}
    </div>
  );
};

export default page;
