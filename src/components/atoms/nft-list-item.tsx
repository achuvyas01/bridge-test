import React from 'react';
import RoundedImg from './rounded-img';
import Link from 'next/link';
import { NftListItemProps } from '@/types/global';
import Image from 'next/image';

const NFTListItem: React.FC<NftListItemProps> = ({ nft }) => {
  return (
    <li className='mt-4 first-of-type:mt-0 hover:bg-accent hover:rounded-[10px] '>
      <div className='flex items-center relative'>
        <div className='relative'>
          {nft?.thumbnailUrl ? (
            <Image
              alt='nft-img'
              className='rounded-[5px] w-[100px] h-[100px] lg:w-[119px] lg:h-[115px]'
              height={50}
              quality={100}
              src={nft.thumbnailUrl}
              width={50}
            />
          ) : (
            <RoundedImg
              alt='nft img'
              className='rounded-[5px] w-[100px] h-[100px] lg:w-[119px] lg:h-[115px]'
              quality={100}
              src='/img/empty-nft-logo.png'
            />
          )}

          <div className='absolute -bottom-1 -right-[10px] rounded-full flex-center w-[25px] h-[25px] bg-white'>
            {nft?.chainLogoUrl ? (
              <Image
                alt='nft-img'
                className='w-[13px] h-[13px]'
                height={20}
                quality={100}
                src={nft.chainLogoUrl}
                width={29}
              />
            ) : (
              <RoundedImg
                className='w-[13px] h-[13px]'
                src='/img/empty-nft-logo.png'
              />
            )}
          </div>
        </div>
        <div className='ml-5 py-2.5 h-[100px] lg:h-[115px] flex flex-col items-start justify-between'>
          <span className='text-sm font-semibold opacity-50 leading-none'>
            {nft?.name}
          </span>
          <Link className='text-[#6180FF] text-sm' href={nft?.detailUrl ?? ''}>
            {/* //FIXME - link isnt available */}
            {nft?.contractName}
          </Link>
          <span className='flex-center bg-[#292C32] rounded-full min-w-[40px] h-[25px] text-white/50'>
            {nft?.amount}
          </span>
        </div>
      </div>
    </li>
  );
};

export default NFTListItem;
