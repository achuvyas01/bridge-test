import React from 'react';

const MainTitle = ({ title, caption }: { title: string; caption: string }) => {
  return (
    <div className='flex flex-col gap-y-0.5'>
      <h3 className='text-base lg:text-lg'>{title}</h3>
      <span className='text-xs opacity-50'>{caption}</span>
    </div>
  );
};

export default MainTitle;
