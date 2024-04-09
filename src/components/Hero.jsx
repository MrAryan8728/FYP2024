"use client"
import React from 'react';
import Image from 'next/image';
import { Typewriter } from 'react-simple-typewriter';

const Hero = () => {
  return (
    <div className='grid grid-cols-1 lg:grid-cols-2 h-[90vh] bg-gray-200 px-5 lg:px-10'>
      <div className='flex flex-col justify-center lg:mt-0 lg:leading-none'>
        <p className='font-semibold text-4xl lg:text-5xl mb-2 lg:mb-0'>
          Dreams Unchained,
        </p>
        <p className='font-semibold text-4xl lg:text-5xl mb-2 lg:mb-0'>
          Boundary Dissolved :{''}
        </p>
        <p className='text-primary font-bold text-4xl lg:text-5xl mt-2'>
          Crowdfunding
          <span style={{ color: '#0ab8f2', fontWeight: 'semibold' }}>
            <Typewriter
              words={[' Redefined', ' Renewed', ' Innovated', ' Renovated']}
              loop={5}
              cursor
              cursorStyle='|'
              typeSpeed={100}
              deleteSpeed={100}
              delaySpeed={1500}
            />
          </span>
        </p>
        <div className='mt-5'>
          <p>Hello guy I am a paragraph explaining us. How we work and function.</p>
          <div className='flex flex-col lg:flex-row gap-5 items-start lg:items-baseline mt-6 lg:mt-12'>
            <button className='font-bold text-xl lg:text-2xl text-white rounded-md border bg-primary px-6 py-3 hover:bg-secondary'>
              Contribute Now
            </button>
            <button className='font-thin text-xl lg:text-2xl text-gray-600 underline'>
              Become a Campaigner
            </button>
          </div>
        </div>
      </div>

      <div className='flex items-center justify-center'>
        <Image priority src={'/gareeb.png'} width={600} height={500} alt='gareeb' />
      </div>
    </div>
  );
};

export default Hero;
