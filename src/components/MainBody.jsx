import React from 'react'
import dynamic from 'next/dynamic';
import Loader from './Loader';
import Hero from './Hero';

// Dynamically import components
const CardContainer = dynamic(() => import('./CardContainer'));
const CreatorContainer = dynamic(() => import('./CreatorContainer'));
const Abovefooter = dynamic(() => import('./Abovefooter'));

// Import Hero component directly

const MainBody = () => {
  return (
    <div>
      <Hero/>
      <React.Suspense fallback=<div><Loader/></div>>
        <CardContainer/>
        <CreatorContainer/>
        <Abovefooter/>
      </React.Suspense>
    </div>
  )
}

export default MainBody
