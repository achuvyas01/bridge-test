import React from 'react';
import RoundedImg from './rounded-img';
import Link from 'next/link';

const NFTBalanceListItem = () => {
  return (
    <li className='mt-4 first-of-type:mt-0'>
      <div className='flex items-center relative'>
        <div className='relative'>
          <RoundedImg
            alt='nft img'
            className='rounded-[5px] w-[119px] h-[115px]'
            quality={100}
            src='/temp/nft.png'
          />
          <div className='absolute -bottom-1 -right-[10px] rounded-full flex-center w-[25px] h-[25px] bg-white'>
            <RoundedImg className='w-[13px] h-[13px]' src='/temp/chain.png' />
          </div>
        </div>
        <div className='ml-5 py-2.5 h-[115px] flex flex-col items-start justify-between'>
          <span className='text-sm font-semibold opacity-50 leading-none'>
            Space Rover
          </span>
          <Link className='text-[#6180FF] text-sm' href={''}>
            Galactic Explorers
          </Link>
          <span className='flex-center bg-[#292C32] rounded-full min-w-[40px] h-[25px] text-white/50'>
            25
          </span>
        </div>
      </div>
    </li>
  );
};

export default NFTBalanceListItem;
