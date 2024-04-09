import React from 'react';
import Creator from './Creator';

const CreatorContainer = () => {
  return (
    <div className='my-24 text-center'>
      <h1 className='font-bold text-4xl text-gray-600 border-y-2 border-gray-400 py-5'>Meet Our Exceptional Team</h1>
      <div className='grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 my-8 mx-auto max-w-7xl'>
        <a target='_blank' rel='noreferrer' href="https://www.linkedin.com/in/rishabh-kumar-sharma-11029121b/">
          <Creator name="Rishabh Kumar Sharma" position="Backend Developer" source="/rishabh.jpg" />
        </a>
        <a target='_blank' rel='noreferrer' href='https://www.linkedin.com/in/aryan-tiwari-b1221321b/'>
          <Creator name="Aryan Tiwari" position="Frontend Developer" source="/aryan.jpg" />
        </a>
        <a target='_blank' rel='noreferrer' href='https://www.linkedin.com/in/shivanshu-kumar-maurya-52b5871ba/'>
          <Creator name="Shivanshu Kumar Maurya" position="Full Stack Developer" source="/shivanshu.jpg" />
        </a>
      </div>
    </div>
  );
};

export default CreatorContainer;
