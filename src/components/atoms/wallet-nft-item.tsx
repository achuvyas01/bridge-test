'use client';
import { cn } from '@/lib/utils';
import React from 'react';
import Image from 'next/image';
import { NftItemProps } from '@/types/global';

const WalletNftItem: React.FC<NftItemProps> = ({
  name,
  logo,
  amount,
  className,
}) => {
  return (
    <div
      className={cn(
        'flex  rounded-lg',
        'w-full h-[80px] max-w-full',
        'items-center justify-between px-[10px] rounded-[4px]',
        className
      )}
    >
      <div className='flex items-center h-full'>
        <div className='relative mr-[12px]'>
          <div className='w-[60px] h-[60px]  flex items-center justify-center'>
            {logo ? (
              <Image
                alt='bot'
                className='w-[60px] h-[60px]'
                height={50}
                src={logo}
                width={50}
              />
            ) : (
              <div className='relative w-[60px] h-[60px] rounded-[5px] bg-transparent flex items-center justify-center'>
                <Image
                  alt='bot'
                  className='absolute inset-0 w-[50px] h-[50px] object-cover'
                  height={50}
                  src='/img/empty-nft-logo.png'
                  width={50}
                />
              </div>
            )}
          </div>
        </div>
        <div className='flex flex-col justify-between h-full py-[20px]'>
          <span className='text-xs font-bold  max-w-[125px] truncate'>
            {name}
          </span>
          <span className='text-xs font-light text-blue-500 max-w-[125px] truncate'>
            {name}
          </span>
        </div>
      </div>

      <div className='relative w-[30px] h-[22px] bg-muted flex items-center justify-center rounded-[10px]'>
        <span className='text-xs font-bold max-w-[125px]'>{amount}</span>
      </div>
    </div>
  );
};

export default WalletNftItem;
