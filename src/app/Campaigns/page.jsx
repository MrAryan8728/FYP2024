"use client";
import React, { useState, useEffect } from "react";
import Card from "@/components/Card";
import Shimmer from "@/components/Shimmer";
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
  return (
    <div className=" grid grid-cols-4 gap-3">
      {data.length === 0 ? (
        <div className=" col-span-4">
        <Shimmer/>
        </div>
      ) : 
        data.map((dataItem) => (
          <div key={dataItem.id}>
            <Link href={`/campaign/${dataItem.id}`}>
              <Card name={dataItem.title} desc={dataItem.body} />
            </Link>
          </div>
        ))
      }
    </div>
  );
};

export default page;
