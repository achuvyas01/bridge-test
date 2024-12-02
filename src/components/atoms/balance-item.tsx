import React from 'react';
import RoundedImg from './rounded-img';

const BalanceItem = () => {
  return (
    <li className='flex items-center justify-between mt-3 hover:bg-accent px-2 py-2 hover:rounded-[10px] first-of-type:mt-0'>
      <div className='flex'>
        <div className='relative'>
          <RoundedImg
            className='w-[40px] h-[40px]'
            quality={100}
            src='/temp/ethereum.png'
          />
          <RoundedImg
            className='w-[20px] h-[20px] absolute -bottom-1 -right-[10px]'
            src='/temp/chain.png'
          />
        </div>
        <div className='flex flex-col justify-between text-lg ml-6 leading-none py-0.5'>
          <span className='font-light text-xs text-muted-foreground'>
            Ethereum
          </span>
          <span className='text-sm font-medium text-foreground'>
            23,345 ETH
          </span>
        </div>
      </div>
    </li>
  );
};

export default BalanceItem;
