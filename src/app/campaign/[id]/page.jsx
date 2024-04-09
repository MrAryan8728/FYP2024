"use client";
import React, { useState, useEffect } from "react";
import { useParams } from "next/navigation";

const page = () => {

  const [data, setData] = useState({});
  const [Fulldata, setFullData] = useState([]);

  useEffect(() => {
    DataLoader();
  }, []);

  useEffect(() => {
    console.log(Fulldata)
  }, [Fulldata]);

  const target = useParams();

  const DataLoader = async () => {
    const res = await fetch("https://jsonplaceholder.typicode.com/posts");
    const json = await res.json();
    setFullData(json);
    console.log(Fulldata);
    const val = json.find(d => (d.id ==target.id));
    setData(val);
  };

  return (
    <div>
      <h1>{data.title}</h1>
    </div>
  );
};

export default page;
