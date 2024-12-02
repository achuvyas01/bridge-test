'use client';
import { cn } from '@/lib/utils';
import React from 'react';
import RoundedImg from './rounded-img';
import Image from 'next/image';
import { TokenItemProps } from '@/types/global';

const WalletTokenItem: React.FC<TokenItemProps> = ({
  name,
  logo,
  amount,
  className,
  symbol,
  price,
}) => {
  return (
    <div
      className={cn(
        'flex  rounded-lg',
        'w-full h-[52px] max-w-full',
        ' items-center justify-between px-[10px] rounded-[4px] py-[5px]',
        className
      )}
    >
      <div className='flex items-center '>
        <div className='relative mr-[12px]'>
          <div className='w-[36px] h-[36px] rounded-full bg-primary flex items-center justify-center'>
            {logo ? (
              <Image
                alt='bot'
                className='w-[28px] h-[28px]'
                height={32}
                src={logo}
                width={32}
              />
            ) : (
              <RoundedImg
                alt='currency'
                className='w-[36px] h-[36px]'
                src='/img/empty-token-logo.png'
              />
            )}
          </div>
        </div>
        <span className='text-xs font-bold max-w-[125px] truncate'>{name}</span>
      </div>

      <div className='relative flex flex-col text-right'>
        <span className='text-sm font-bold max-w-[125px]'>
          {amount.toString().includes('.')
            ? amount.toString().split('.')[0] +
              '.' +
              amount.toString().split('.')[1]?.slice(0, 3)
            : amount.toString()}{' '}
          {symbol?.slice(0, 3)}
        </span>

        <span className='font-normal text-xs text-muted-foreground'>
          ≈{' $'}
          {((amount * price) as number).toFixed(3)}
        </span>
      </div>
    </div>
  );
};

export default WalletTokenItem;
