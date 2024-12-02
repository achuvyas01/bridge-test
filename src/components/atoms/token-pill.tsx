import React from 'react';
import RoundedImg from './rounded-img';

const TokenPill = () => {
  return (
    <div className='w-max min-w-[118px] h-[45px] flex justify-start pl-2.5 items-center gap-x-4 rounded-full hover:bg-accent border border-border cursor-pointer'>
      <div className='relative'>
        <RoundedImg className='w-[28px] h-[28px]' src='/temp/ethereum.png' />
        <RoundedImg
          className='w-[18px] h-[18px] absolute -bottom-1 -right-[10px]'
          src='/temp/chain.png'
        />
      </div>
      <span className='text-white opacity-50 text-sm font-medium'>WBTC</span>
    </div>
  );
};

export default TokenPill;
