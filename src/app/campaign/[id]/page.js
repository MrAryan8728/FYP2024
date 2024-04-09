"use client"
import React from 'react';
import { useParams } from 'next/navigation';

const page = () => {
  const data = useParams();
  return (
    <div>
      {data.id}
    </div>
  )
}

export default page